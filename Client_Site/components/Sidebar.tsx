import { toast } from 'sonner@2.0.3';
import imgKcLogoIcon from 'figma:asset/20514febabe210d132062fb91794813c92ae6472.png';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'messaging' | 'notifications' | 'cart' | 'login' | 'helpSupport' | 'overview' | 'draft';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const activePage = currentPage;

  const handleNavigation = (page: Page) => {
    onNavigate(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('hasVisitedBefore');
    localStorage.removeItem('isAuthenticated');
    toast.success('Logged out successfully');
    setTimeout(() => onNavigate('login'), 1000);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <img src={imgKcLogoIcon} alt="Kash Contact Logo" className="w-10 h-10" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-6">
        <button
          onClick={() => handleNavigation('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
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
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
            activePage === 'campaigns' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-[14px]">Campaigns</span>
        </button>

        <button
          onClick={() => handleNavigation('vouchers')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
            activePage === 'vouchers' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[14px]">Vouchers</span>
        </button>

        <button
          onClick={() => handleNavigation('transactions')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
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
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
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
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
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
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
            activePage === 'draft' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span className="text-[14px]">Drafts</span>
        </button>

        <button
          onClick={() => handleNavigation('messaging')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
            activePage === 'messaging' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-[14px]">Messaging</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-700 hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[14px]">Verified</span>
        </button>
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 pb-3 border-t border-gray-200 pt-3">
        <p className="text-[#8363f2] text-[13px] px-4 mb-2">Feedback</p>
        
        <button
          onClick={() => handleNavigation('helpSupport')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[14px]">Help</span>
        </button>

        <button 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
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
