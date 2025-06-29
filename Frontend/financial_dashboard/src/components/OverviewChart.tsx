import { useEffect, useState } from "react";  
import { axiosWithToken } from "../utils/axiosWithToken"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip
} from "recharts";

export function OverviewChart() {
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState("monthly");

  useEffect(() => {
  axiosWithToken().get(`http://localhost:5000/api/chartdata?range=${range}`)
    .then((res) => {
      console.log("Chart data response:", res.data); // Debug line
      setChartData(Array.isArray(res.data) ? res.data : []);
    })
    .catch((err) => console.error("Failed to fetch chart data:", err));
}, [range]);

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-semibold">Overview</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-slate-400 text-sm">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-slate-400 text-sm">Expenses</span>
          </div>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="bg-slate-700 border border-slate-600 text-white text-sm rounded px-3 py-1"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#F59E0B"
              strokeWidth={3}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
