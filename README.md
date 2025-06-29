🧾 Project Overview
The Financial Dashboard is a full-stack web application that allows authenticated users to manage and monitor financial data, including transactions, wallet balances, and analytics. It provides a clean UI, real-time updates, filtering, sorting, and responsive charts.

🛠️ Tech Stack
Frontend: React, Tailwind CSS, TypeScript, Lucide Icons, Axios, Vite

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JWT-based

State Management: React Context API

Deployment: (Optional) Vercel / Render / MongoDB Atlas

📦 Features-

🧾 Login and register functionality (JWT)

📊 Dashboard with real-time financial summary cards

📉 Expense vs Revenue analytics chart

📋 Transaction Table with:

Pagination

Sorting (amount, date, category, etc.)

Filtering by date, category, status

Real-time search

🔐 Protected routes

👤 User profile with dynamic username fetch

Setup Instructions-

Prerequisites
Node.js and npm

MongoDB instance (local or MongoDB Atlas)

📁 1. Clone the Repository

git clone https://github.com/sahilmakadi/financial-dashboard.git
cd financial-dashboard

⚙️ 2. Setup Backend

cd backend

npm install express mongoose cors dotenv jsonwebtoken bcryptjs


in server.js

replace 'your_mongodb_connection_string' with your mongodb connection string
mongoose.connect('your_mongodb_connection_string')

create two collections in mongodb
1) transactions - in this collection load transaction json object having transaction information 
2) users - for storing user information after registering and authentication while login

Start backend:

npm run dev
runs on port 5000

💻 3. Setup Frontend

cd frontend

npm create vite@6 
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
npm install

npm run dev
Open browser at http://localhost:5173.

🔌 API Documentation

📍 Base URL
bash
Copy
Edit
http://localhost:5000/api

🔐 Auth Endpoints
### 🔐 Authentication APIs

| Endpoint          | Method | Description                   | Body Parameters         |
|-------------------|--------|-------------------------------|--------------------------|
| `/api/auth/register` | POST   | Register new user             | `username`, `password`   |
| `/api/auth/login`    | POST   | Login user, returns JWT token | `username`, `password`   |

**Register Example**
```json
POST /api/auth/register
{
  "username": "sahil123",
  "password": "securePass"
}

Login response-

{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}

Protected Routes
All below require Authorization: Bearer <token> in headers.

💸 /api/transactions

Query   Params	Type	     Description
search	string	Search       by category, status, user_id
sortBy	string	Field        to sort (amount, date, etc.)
sortOrder	    string	         asc or desc

Example

GET /api/transactions?search=revenue&sortBy=amount&sortOrder=desc

Response-
[
  {
    "_id": "660ecf...",
    "user_id": "sahil123",
    "amount": 2300,
    "category": "Revenue",
    "status": "Paid",
    "date": "2024-12-01T09:45:00.000Z"
  }
]

/api/chartdata?range=monthly|weekly|yearly
Param	Values	Description
range	weekly, monthly, yearly	Aggregates expenses/revenue

Example-
GET /api/chartdata?range=weekly

Response-
[
  {
    "name": "23 Jun",
    "revenue": 1500,
    "expenses": 600
  },
  ...
]

🧾 /api/recentTransactions

Returns latest 3 transactions.

example-
GET /api/recentTransactions-

📈 /api/summary-

Returns financial summary:

{
    balance
    revenue
    expenses
    savings (20% of balance)
}

example-

{
  "balance": 12000,
  "revenue": 20000,
  "expenses": 8000,
  "savings": 2400
}

🔐 Token Usage-

All secure routes require headers like:

Authorization: Bearer <your_jwt_token>



💡 Future Enhancements
Transaction editing & deletion

Graph filters by time range

Export reports (PDF, CSV)

Dark mode toggle

🙌 Author
Created by Sahil Makadi.
