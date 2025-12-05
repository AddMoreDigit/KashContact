import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, Download, Eye } from 'lucide-react';

type Page = 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateHelp' | 'corporateDrafts' | 'corporateGoals' | 'corporateTransactions' | 'corporateTransactionsList';

interface CorporateTransactionsTablePageProps {
  onNavigate: (page: Page) => void;
}

const transactions = [
  {
    id: '#100212',
    date: '11 Aug 12',
    endDate: 'Dec 2025',
    campaign: 'Sun City Cabana',
    vendor: 'Seaview Lodge',
    amount: 'R20 000',
    status: 'Unpaid',
    statusColor: 'bg-red-500'
  },
  {
    id: '#100213',
    date: '11 Aug 12',
    endDate: 'Dec 2025',
    campaign: 'Kruger National Park',
    vendor: 'Magalies',
    amount: 'R15 000',
    status: 'Paid',
    statusColor: 'bg-green-500'
  },
  {
    id: '#102156',
    date: '11 Aug 12',
    endDate: 'Dec 2025',
    campaign: 'School uniform Donation',
    vendor: 'Magalies',
    amount: 'R5 000',
    status: 'Paid',
    statusColor: 'bg-green-500'
  },
  {
    id: '#20058',
    date: '11 Aug 12',
    endDate: 'Dec 2025',
    campaign: 'Weekend Team Building @ protea Hotel',
    vendor: 'Magalies',
    amount: 'R10 000',
    status: 'Refund',
    statusColor: 'bg-orange-500'
  },
  {
    id: '#55236',
    date: '11 Aug 12',
    endDate: 'Dec 2025',
    campaign: '',
    vendor: 'Magalies',
    amount: 'R12 000',
    status: 'Paid',
    statusColor: 'bg-green-500'
  }
];

export function CorporateTransactionsTablePage({ onNavigate }: CorporateTransactionsTablePageProps) {
  const [activePage, setActivePage] = useState<string>('transactions');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'today' | 'qr'>('all');

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    onNavigate(page);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <button
            onClick={() => handleNavigation('corporateDashboard')}
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
            onClick={() => handleNavigation('corporateCampaigns')}
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors text-gray-700 hover:bg-gray-100`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[14px]">Vouchers</span>
          </button>

          <button
            onClick={() => handleNavigation('corporateTransactions')}
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
            onClick={() => handleNavigation('corporateProfile')}
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors text-gray-700 hover:bg-gray-100`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-[14px]">Overview</span>
          </button>

          <button
            onClick={() => handleNavigation('corporateDrafts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'drafts' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-[14px]">Draft</span>
          </button>

          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors text-gray-700 hover:bg-gray-100`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[14px]">Verified</span>
          </button>
        </nav>

        {/* Feedback Section */}
        <div className="px-3 pb-3">
          <div className="text-[12px] text-gray-500 mb-2 px-4">Feedback</div>
          <button
            onClick={() => handleNavigation('corporateHelp')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'help' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[14px]">Help</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-[14px]">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-6 py-2 text-[14px] bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create
            </button>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-700" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => handleNavigation('corporateProfile')}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 px-8">
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setActiveTab('all');
                handleNavigation('corporateTransactions');
              }}
              className={`py-3 text-[14px] font-medium border-b-2 transition-colors ${
                activeTab === 'all'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              All Transactions
            </button>
            <button
              onClick={() => {
                setActiveTab('today');
                handleNavigation('corporateTransactionsList');
              }}
              className={`py-3 text-[14px] font-medium border-b-2 transition-colors ${
                activeTab === 'today'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`py-3 text-[14px] font-medium border-b-2 transition-colors ${
                activeTab === 'qr'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              QR Code
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="p-8">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[140px,120px,1fr,140px,120px,120px,120px] bg-purple-600 text-white">
              <div className="px-4 py-3 text-[12px] font-medium">Transaction ID</div>
              <div className="px-4 py-3 text-[12px] font-medium">Date</div>
              <div className="px-4 py-3 text-[12px] font-medium">Campaign name</div>
              <div className="px-4 py-3 text-[12px] font-medium">Vendor name</div>
              <div className="px-4 py-3 text-[12px] font-medium">Amount</div>
              <div className="px-4 py-3 text-[12px] font-medium">Status</div>
              <div className="px-4 py-3 text-[12px] font-medium">Action</div>
            </div>

            {/* Table Body */}
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`grid grid-cols-[140px,120px,1fr,140px,120px,120px,120px] ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } border-b border-gray-200 last:border-b-0`}
              >
                <div className="px-4 py-3 text-[12px] text-gray-900">{transaction.id}</div>
                <div className="px-4 py-3 text-[11px] text-gray-600">
                  {transaction.date}
                  <br />
                  {transaction.endDate}
                </div>
                <div className="px-4 py-3 text-[12px] text-gray-900">{transaction.campaign}</div>
                <div className="px-4 py-3 text-[12px] text-gray-900">{transaction.vendor}</div>
                <div className="px-4 py-3 text-[12px] text-gray-900">{transaction.amount}</div>
                <div className="px-4 py-3">
                  <span className={`px-3 py-1 ${transaction.statusColor} text-white rounded-full text-[11px] font-medium inline-block`}>
                    {transaction.status}
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center gap-3">
                  <button className="flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors">
                    <Eye className="w-4 h-4" />
                    <span className="text-[11px]">View</span>
                  </button>
                  <button className="flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="text-[11px]">Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-[14px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Prev
              </button>
              <button className="px-4 py-2 text-[14px] bg-purple-600 text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 text-[14px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-4 py-2 text-[14px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-[14px] text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                Download CSV
              </button>
              <button className="px-4 py-2 text-[14px] text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

