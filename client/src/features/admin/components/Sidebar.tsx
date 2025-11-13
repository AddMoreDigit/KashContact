import { LayoutDashboard, Megaphone, Building2, Users, User, Share2, FileText, LogOut, Ticket, Receipt, BarChart3 } from 'lucide-react';
import { ViewType } from '../App';

interface SidebarProps {
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const menuItems: { icon: any; label: string; view: ViewType }[] = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
    { icon: Megaphone, label: 'Campaigns', view: 'campaigns' },
    { icon: Ticket, label: 'Vouchers', view: 'vouchers' },
    { icon: Receipt, label: 'Transactions', view: 'transactions' },
    { icon: Building2, label: 'Vendors', view: 'vendors' },
    { icon: Users, label: 'Members', view: 'members' },
    { icon: BarChart3, label: 'Reports', view: 'reports' },
    { icon: User, label: 'Profile', view: 'profile' },
    { icon: Share2, label: 'Social', view: 'social' },
    { icon: FileText, label: 'Draft', view: 'draft' },
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white rounded"></div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // If viewing campaign detail, highlight Campaigns menu item
          const isActive = activeView === item.view || 
            (activeView === 'campaign-detail' && item.view === 'campaigns');
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.view)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-4">
        <button className="w-full flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors rounded-lg">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
