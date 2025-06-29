const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Models
const Transaction = require('./model/Transaction/transactions');
const User = require('./model/User/user'); // ✅ New User model
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_jwt_secret"; // Use .env in real apps

// Middleware
app.use(cors());
app.use(express.json());



// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/data', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

app.use('/api/auth', authRoutes);

// Protect routes below
app.use('/api/transactions', authMiddleware);
app.use('/api/recentTransactions', authMiddleware);
app.use('/api/summary', authMiddleware);
app.use('/api/chartdata', authMiddleware);

// ✅ JWT Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalid" });
    req.user = user;
    next();
  });
}

app.get('/api/transactions', authenticateToken, async (req, res) => {
  try {
    const { search = "", sortBy = "date", sortOrder = "desc" } = req.query;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Simple search on category, status or user_id
    const searchQuery = {
      $or: [
        { category: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
        { user_id: { $regex: search, $options: "i" } },
      ],
    };

    const transactions = await Transaction.find(searchQuery).sort(sortOptions);

    res.json(transactions);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: 'Server Error' });
  }
});



// GET 3 recent transactions
app.get('/api/recentTransactions', authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 }).limit(3);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET transaction summary
app.get('/api/summary', authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.find();

    let balance = 0, revenue = 0, expenses = 0;
    transactions.forEach((t) => {
      if (t.category === 'Revenue') {
        revenue += t.amount;
        balance += t.amount;
      } else {
        expenses += t.amount;
        balance -= t.amount;
      }
    });

    res.json({ balance, revenue, expenses, savings: balance * 0.2 });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

// Chart data API (same logic, protected)
app.get('/api/chartdata', authenticateToken, async (req, res) => {
  const range = req.query.range || "monthly";
  try {
    const latestTransaction = await Transaction.findOne().sort({ date: -1 });
    if (!latestTransaction) return res.json([]);

    const latestDate = new Date(latestTransaction.date);
    const startOfYear = new Date(latestDate.getFullYear(), 0, 1);
    const last7Days = new Date(latestDate);
    last7Days.setDate(latestDate.getDate() - 6);
    const fiveYearsAgo = new Date(latestDate.getFullYear() - 4, 0, 1);

    let match = {}, groupId = {}, sortId = {}, formatLabel = () => '', fillMissingDates = false;

    if (range === 'monthly') {
      match = { date: { $gte: startOfYear.toISOString(), $lte: latestDate.toISOString() } };
      groupId = { month: { $month: { $toDate: "$date" } } };
      sortId = { "_id.month": 1 };
      formatLabel = ({ month }) => ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1];
    } else if (range === 'weekly') {
      const fromDateStr = last7Days.toISOString().slice(0, 10);
      const toDateStr = latestDate.toISOString().slice(0, 10);
      match = {
        $expr: {
          $and: [
            { $gte: [{ $substrBytes: ["$date", 0, 10] }, fromDateStr] },
            { $lte: [{ $substrBytes: ["$date", 0, 10] }, toDateStr] }
          ]
        }
      };
      groupId = { date: { $substrBytes: ["$date", 0, 10] } };
      sortId = { "_id.date": 1 };
      fillMissingDates = true;
      formatLabel = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getUTCDate()} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getUTCMonth()]}`;
      };
    } else if (range === 'yearly') {
      match = { date: { $gte: fiveYearsAgo.toISOString(), $lte: latestDate.toISOString() } };
      groupId = { year: { $year: { $toDate: "$date" } } };
      sortId = { "_id.year": 1 };
      formatLabel = ({ year }) => `${year}`;
    }

    const result = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: groupId,
          revenue: {
            $sum: { $cond: [{ $eq: ["$category", "Revenue"] }, "$amount", 0] }
          },
          expenses: {
            $sum: { $cond: [{ $ne: ["$category", "Revenue"] }, "$amount", 0] }
          }
        }
      },
      { $sort: sortId }
    ]);

    let response = result.map(item => {
      let dateKey = range === 'weekly' ? item._id.date : null;
      return {
        name: range === 'weekly' ? formatLabel(dateKey) : formatLabel(item._id),
        dateKey,
        revenue: item.revenue,
        expenses: item.expenses
      };
    });

    if (range === 'weekly' && fillMissingDates) {
      const completeWeek = [];
      const map = new Map(response.map(item => [item.dateKey, item]));

      for (let i = 6; i >= 0; i--) {
        const date = new Date(latestDate);
        date.setDate(date.getDate() - i);
        const key = date.toISOString().slice(0, 10);
        const label = formatLabel(key);

        if (map.has(key)) {
          completeWeek.push({ name: label, ...map.get(key) });
        } else {
          completeWeek.push({ name: label, revenue: 0, expenses: 0 });
        }
      }

      response = completeWeek;
    }

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Aggregation error", details: err.message });
  }
});

// 🟢 Server listen
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
