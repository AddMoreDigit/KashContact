import { Home, Menu, Users, CreditCard, FileText, User, BarChart3, FileCheck, CheckCircle, LogOut, HelpCircle, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'campaigns', label: 'Campaigns', icon: Menu },
    { id: 'vouchers', label: 'Vouchers', icon: CreditCard },
    { id: 'transactions', label: 'Transactions', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'draft', label: 'Drafts', icon: FileCheck },
    { id: 'verified', label: 'Verified', icon: CheckCircle },
    { id: 'goals', label: 'Goals', icon: Target },
  ];

  const feedbackItems = [
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white rounded" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        <div className="mt-8">
          <p className="px-3 text-xs text-gray-400 mb-2">Feedback</p>
          {feedbackItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
