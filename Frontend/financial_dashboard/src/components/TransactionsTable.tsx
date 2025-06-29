import { useEffect, useState } from "react";
import { axiosWithToken } from "../utils/axiosWithToken";

export function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchTransactions();
  }, [searchTerm, sortBy, sortOrder]);

  const fetchTransactions = async () => {
    try {
      const res = await axiosWithToken().get("http://localhost:5000/api/transactions", {
        params: {
          search: searchTerm,
          sortBy,
          sortOrder,
        },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return "↕";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  const formatDate = (dateString) => new Date(dateString).toDateString();
  const formatAmount = (amount) => `$${amount.toFixed(2)}`;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Transactions</h3>
        <input
          type="text"
          placeholder="Search transactions..."
          className="px-3 py-1 rounded bg-slate-700 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400 text-left">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("date")}>
                Date {getSortIcon("date")}
              </th>
              <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("amount")}>
                Amount {getSortIcon("amount")}
              </th>
              <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("category")}>
                Category {getSortIcon("category")}
              </th>
              <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("status")}>
                Status {getSortIcon("status")}
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t._id}
                className="border-b border-slate-700/50 hover:bg-slate-700/50 transition-colors"
              >
                <td className="py-4 px-4 text-white font-medium">{t.user_id}</td>
                <td className="py-4 px-4 text-slate-300">{formatDate(t.date)}</td>
                <td className="py-4 px-4 text-emerald-500 font-semibold">
                  {formatAmount(t.amount)}
                </td>
                <td className="py-4 px-4 text-slate-300">{t.category}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      t.status === "Paid"
                        ? "bg-emerald-500/20 text-emerald-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
