
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react";

interface BalanceCardProps {
  title: string;
  amount: string;
  type: "balance" | "revenue" | "expenses" | "savings";
  trend?: "up" | "down";
}

export function BalanceCard({ title, amount, type, trend }: BalanceCardProps) {
  const getIcon = () => {
    switch (type) {
      case "balance":
        return <DollarSign className="h-6 w-6" />;
      case "revenue":
        return <TrendingUp className="h-6 w-6" />;
      case "expenses":
        return <CreditCard className="h-6 w-6" />;
      case "savings":
        return <TrendingDown className="h-6 w-6" />;
      default:
        return <DollarSign className="h-6 w-6" />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case "balance":
        return "bg-orange-500";
      case "revenue":
        return "bg-emerald-500";
      case "expenses":
        return "bg-blue-500";
      case "savings":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-cyan-500 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getIconBg()} text-white`}>
          {getIcon()}
        </div>
        {trend && (
          <div className={`p-1 rounded-full ${trend === "up" ? "bg-emerald-500/20" : "bg-red-500/20"}`}>
            <div className={`w-2 h-2 rounded-full ${trend === "up" ? "bg-emerald-500" : "bg-red-500"}`}></div>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-blue-1000 text-sm mb-1">{title}</p>
        <p className="text-white text-2xl font-bold">{amount}</p>
      </div>
    </div>
  );
}
