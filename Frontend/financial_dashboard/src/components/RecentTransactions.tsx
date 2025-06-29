import { useEffect, useState } from "react";
import Transaction from "./Transaction";
import { axiosWithToken } from "../utils/axiosWithToken"
import axios from "axios";

export function RecentTransactions() {
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    axiosWithToken().get("http://localhost:5000/api/recentTransactions")
      .then(res => setRecentTransactions(res.data))
      .catch(err => console.error("Error fetching:", err));
  }, []);

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-semibold">Recent Transaction</h3>
        <button className="text-emerald-500 text-sm hover:text-emerald-400 transition-colors">
          See All
        </button>
      </div>
      
      <div className="space-y-4">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-slate-900 font-medium text-sm">
                {transaction.id}
              </div>
              <div>
                <p className="text-white font-medium">{transaction.user_id}</p>
                <p className="text-slate-400 text-sm">{transaction.category}</p>
              </div>
            </div>
            <span className={`font-semibold ${
              transaction.category.startsWith('R') ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
