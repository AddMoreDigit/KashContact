import { LayoutDashboard, Megaphone, Ticket, CreditCard, User, Eye, FileText, HelpCircle, LogOut, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'campaigns' as Page, label: 'Campaigns', icon: Megaphone },
    { id: 'vouchers' as Page, label: 'Vouchers', icon: Ticket },
    { id: 'transactions' as Page, label: 'Transactions', icon: CreditCard },
    { id: 'messaging' as Page, label: 'Messages', icon: MessageSquare },
    { id: 'profile' as Page, label: 'Profile', icon: User },
    { id: 'overview' as Page, label: 'Overview', icon: Eye },
    { id: 'draft' as Page, label: 'Draft', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2L3 7V13L10 18L17 13V7L10 2Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-gray-200 py-4">
        <button 
          onClick={() => onNavigate('helpSupport')}
          className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
            currentPage === 'helpSupport'
              ? 'bg-purple-100 text-purple-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <HelpCircle size={20} />
          <span>Help</span>
        </button>
        <button 
          onClick={() => {
            toast.success('Logged out successfully');
            setTimeout(() => onNavigate('dashboard'), 1000);
          }}
          className="w-full flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-gray-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
