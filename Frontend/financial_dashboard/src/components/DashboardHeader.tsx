
import { Search, Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  return (
    <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-slate-300 hover:text-white" />
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-4">
        
        <button className="relative p-2 text-slate-300 hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>
        
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
          <span className="text-slate-900 font-medium text-sm">JD</span>
        </div>
      </div>
    </header>
  );
}
