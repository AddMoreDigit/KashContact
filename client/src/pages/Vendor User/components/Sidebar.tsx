import { LayoutDashboard, Megaphone, Briefcase, CreditCard, User, Eye, FileText, HelpCircle, LogOut, MessageSquare, Calendar } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: "dashboard" },
    { icon: Megaphone, label: "Campaigns", page: "campaigns" },
    { icon: Briefcase, label: "Services", page: "services" },
    { icon: CreditCard, label: "Transactions", page: "transactions" },
    { icon: User, label: "Profile", page: "profile" },
    { icon: Eye, label: "Overview", page: "overview" },
    { icon: FileText, label: "Draft", page: "draft" },
    { icon: MessageSquare, label: "Message", page: "message" },
    { icon: Calendar, label: "Schedule", page: "schedule" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          <div className="w-5 h-5 bg-purple-600 rounded" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}></div>
        </div>
        <span className="text-gray-400">K</span>
      </div>

      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onPageChange(item.page)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                currentPage === item.page
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <p className="px-3 text-gray-400 text-xs uppercase tracking-wider mb-2">Favorites</p>
          <button
            onClick={() => onPageChange("help")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              currentPage === "help"
                ? "bg-purple-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </button>
        </div>
      </nav>

      <div className="p-3 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-red-600 rounded-lg hover:bg-red-50">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
