
import { BalanceCard } from "@/components/BalanceCard";
import { OverviewChart } from "@/components/OverviewChart";
import { RecentTransactions } from "@/components/RecentTransactions";
import { TransactionsTable } from "@/components/TransactionsTable";
import { useEffect, useRef, useState } from "react";
import { axiosWithToken } from "../utils/axiosWithToken"
import { useNavigate } from "react-router-dom";
import { useDashboardSection } from "../context/useDashboardSection";
import UserProfile from "@/components/UserProfile";


const Index = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    balance: 0,
    revenue: 0,
    expenses: 0,
    savings: 0,
  });
  const { activeSection } = useDashboardSection();

  useEffect(() => {
    axiosWithToken().get("/summary")
      .then((res) => setSummary(res.data))
      .catch((err) => {
        console.error("Unauthorized or error fetching summary:", err);
        if (err.response && err.response.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, []);

  return (
    <div className="space-y-6">
      {activeSection === null && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BalanceCard title="Balance" amount={`$${summary.balance.toFixed(2)}`} type="balance" />
            <BalanceCard title="Revenue" amount={`$${summary.revenue.toFixed(2)}`} type="revenue" trend="up" />
            <BalanceCard title="Expenses" amount={`$${summary.expenses.toFixed(2)}`} type="expenses" trend="down" />
            <BalanceCard title="Savings" amount={`$${summary.savings.toFixed(2)}`} type="savings" />
          </div>

          {/* Chart and recent transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <OverviewChart />
            </div>
            <div>
              <RecentTransactions />
            </div>
          </div>

          {/* Transactions Table */}
          <TransactionsTable />
        </>
      )}

      {activeSection === "transactions" && <TransactionsTable />}

      {activeSection === "wallet" && (
        <div className="flex justify-center">
          <div className="bg-gray-700  shadow-lg rounded-xl p-8 w-full max-w-5xl space-y-8">
            <h2 className="text-3xl font-bold text-red-600 flex items-center gap-2 justify-center">
              💼 Wallet Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BalanceCard
                title="Balance"
                amount={`$${summary.balance.toFixed(2)}`}
                type="balance"
              />
              <BalanceCard
                title="Savings"
                amount={`$${summary.savings.toFixed(2)}`}
                type="savings"
              />
            </div>

            <div className="text-center text-sm text-red-300 mt-4">
              <p>💡 Tip: Track your revenue and expenses regularly to increase savings!</p>
            </div>
          </div>
        </div>
      )}



      {activeSection === "analytics" && (
        <div className="p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Analytics Overview</h2>
          <OverviewChart />
        </div>
      )}

      {activeSection === "profile" && (
        <div className="p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Your Profile</h2>
          <UserProfile />
        </div>
      )}
    </div>
  );
};
export default Index;
