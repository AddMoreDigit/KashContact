import { toast } from 'sonner';
import imgKcLogoIcon from "../../imports/figma/asset/"20514febabe210d132062fb91794813c92ae6472.png';

type Page = 'dashboard' | 'campaigns' | 'services' | 'transactions' | 'profile' | 'overview' | 'draft' | 'help' | 'vouchers' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'vendorVouchers' | 'approveBookingRequest' | 'editBooking';

interface VendorSidebarProps {
  currentPage: string;
  onNavigate: (page: any) => void;
}

export function VendorSidebar({ currentPage, onNavigate }: VendorSidebarProps) {
  const activePage = currentPage;

  const handleNavigation = (page: string) => {
    // Map generic names to specific vendor page names
    const pageMap: { [key: string]: any } = {
      'dashboard': 'vendorDashboard',
      'campaigns': 'vendorCampaigns',
      'services': 'vendorServices',
      'transactions': 'vendorTransactions',
      'profile': 'vendorProfile',
      'overview': 'vendorOverview',
      'draft': 'vendorDrafts',
      'help': 'vendorHelp',
      'vouchers': 'vendorVouchers',
    };
    const mappedPage = pageMap[page] || page;
    onNavigate(mappedPage);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('hasVisitedBefore');
    toast.success('Logged out successfully');
    setTimeout(() => {
      onNavigate('login');
    }, 500);
  };

  return (
    <div className="w-48 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center gap-3">
        <img src={imgKcLogoIcon} alt="Kash Contact Logo" className="w-10 h-10" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 pt-4">
        <button
          onClick={() => handleNavigation('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
            activePage === 'dashboard' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="text-[14px]">Dashboard</span>
        </button>

        <button
          onClick={() => handleNavigation('campaigns')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
            activePage === 'campaigns' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-[14px]">Campaigns</span>
        </button>

        <button
          onClick={() => handleNavigation('services')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
            activePage === 'services' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-[14px]">Services</span>
        </button>

        <button
          onClick={() => handleNavigation('vouchers')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
            activePage === 'vouchers' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span className="text-[14px]">Vouchers</span>
        </button>

        <button
          onClick={() => handleNavigation('transactions')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
            activePage === 'transactions' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span className="text-[14px]">Transactions</span>
        </button>

        <button
          onClick={() => handleNavigation('profile')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
            activePage === 'profile' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[14px]">Profile</span>
        </button>

        <button
          onClick={() => handleNavigation('overview')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
            activePage === 'overview' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-[14px]">Overview</span>
        </button>

        <button
          onClick={() => handleNavigation('draft')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
            activePage === 'drafts' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span className="text-[14px]">Drafts</span>
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-gray-700 hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[14px]">Verified</span>
        </button>
      </nav>

      {/* Bottom Navigation */}
      <div className="px-2 pb-3 border-t border-gray-200 pt-3">
        <p className="text-gray-500 text-[13px] px-3 mb-2">Feedback</p>
        
        <button
          onClick={() => handleNavigation('help')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[14px]">Help</span>
        </button>

        <button 
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          onClick={handleLogout}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="text-[14px]">Logout</span>
        </button>
      </div>
    </div>
  );
}

