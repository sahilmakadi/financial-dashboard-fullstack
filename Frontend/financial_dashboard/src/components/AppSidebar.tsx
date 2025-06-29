
import { Home, CreditCard, Wallet, BarChart3, User, MessageSquare, Settings, LogOut } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../utils/storeToken";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { transactionsRef, walletRef, analyticsRef } from "../utils/scrollRefs";
import { useDashboardSection } from "../context/useDashboardSection";


export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const isCollapsed = state === "collapsed";
  const { setActiveSection } = useDashboardSection();

  const items = [
    {
      title: "Dashboard",
      icon: Home,
      onClick: () => {
        setActiveSection(null); // Show all content
      },
    },
    {
      title: "Transactions",
      icon: CreditCard,
      onClick: () => {
        setActiveSection("transactions");
      },
    },
    {
      title: "Wallet",
      icon: Wallet,
      onClick: () => {
        setActiveSection("wallet");
      },
    },
    {
      title: "Analytics",
      icon: BarChart3,
      onClick: () => {
        setActiveSection("analytics");
      },
    },
    {
      title: "Personal",
      icon: User,
      onClick: () => {
        setActiveSection("profile");
      },
    },
    { title: "Message", url: "/message", icon: MessageSquare },
    { title: "Settings", url: "/setting", icon: Settings },
    { title: "Log out", isLogout: true, icon: LogOut },
  ];

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} bg-slate-800 border-slate-700`} collapsible="icon">
      <SidebarContent className="bg-slate-800">
        <div className="p-4">
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-slate-900 font-bold">
              P
            </div>
            {!isCollapsed && <span>Penta</span>}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.isLogout ? (
                      <button
                        onClick={() => {
                          logout();
                          navigate("/login");
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg mx-2 text-left w-full text-white hover:bg-emerald-500"
                      >
                        <item.icon className="h-5 w-5" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </button>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-2 w-full text-white hover:bg-emerald-500`}
                      >
                        <item.icon className="h-5 w-5" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </button>

                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
