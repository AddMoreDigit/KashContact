import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, ChevronDown, Paperclip, RefreshCw } from 'lucide-react';
import { CorporateSidebar } from './components/CorporateSidebar';
import { NavBar } from '../../components/NavBar';

type Page = 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateHelp' | 'corporateDrafts' | 'corporateGoals' | 'corporateTransactions' | 'corporateTransactionsList';

interface CorporateTransactionsListPageProps {
  onNavigate: (page: Page) => void;
}

const transactions = {
  newest: [
    {
      id: 1,
      title: 'Gold Reef City theme park',
      date: '',
      status: 'Recurring',
      statusIcon: <RefreshCw className="w-4 h-4" />,
      statusColor: 'text-gray-600',
      amount: '+R1000.00',
      amountColor: 'text-green-600',
      subtitle: 'Campaign',
      hasAttachment: true
    },
    {
      id: 2,
      title: 'Cape Trip-Seaview Lodge',
      date: '12 Sept 2025 at 08:47 PM',
      status: 'Refund',
      statusIcon: <RefreshCw className="w-4 h-4" />,
      statusColor: 'text-red-600',
      amount: '-R1000.00',
      amountColor: 'text-red-600',
      subtitle: 'FNB Ewallet',
      hasAttachment: true
    }
  ],
  yesterday: [
    {
      id: 3,
      title: 'Swiss Adventure - Mogen Hotel',
      date: '11 Sept 2025 at 08:47 PM',
      status: 'Paid',
      statusIcon: null,
      statusColor: 'text-green-600',
      amount: '+R1000.00',
      amountColor: 'text-green-600',
      subtitle: 'Debit Order',
      hasAttachment: true
    },
    {
      id: 4,
      title: 'Sun city - Sun city cabana',
      date: '11 Sept 2025 at 08:47 PM',
      status: 'Recurring',
      statusIcon: <RefreshCw className="w-4 h-4" />,
      statusColor: 'text-gray-600',
      amount: '+R1000.00',
      amountColor: 'text-green-600',
      subtitle: 'Debit Order',
      hasAttachment: true
    },
    {
      id: 5,
      title: 'Sun city - Sun city cabana',
      date: '11 Sept 2025 at 08:47 PM',
      status: 'Paid',
      statusIcon: null,
      statusColor: 'text-green-600',
      amount: '+R1000.00',
      amountColor: 'text-green-600',
      subtitle: 'Debit Order',
      hasAttachment: true
    }
  ],
  august25: [
    {
      id: 6,
      title: 'Magalies Park',
      date: '11 Aug 2025 at 08:47 PM',
      status: 'Refund',
      statusIcon: <RefreshCw className="w-4 h-4" />,
      statusColor: 'text-red-600',
      amount: '-R2000.00',
      amountColor: 'text-red-600',
      subtitle: 'EFT',
      hasAttachment: true
    },
    {
      id: 7,
      title: 'Magalies Park',
      date: '11 Aug 2025 at 08:47 PM',
      status: 'Refund',
      statusIcon: <RefreshCw className="w-4 h-4" />,
      statusColor: 'text-red-600',
      amount: '-R600.00',
      amountColor: 'text-red-600',
      subtitle: 'Ewallet',
      hasAttachment: true
    }
  ]
};

export function CorporateTransactionsListPage({ onNavigate }: CorporateTransactionsListPageProps) {
  const [activePage, setActivePage] = useState<string>('transactions');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'today' | 'qr'>('today');
  const [filterDropdown, setFilterDropdown] = useState<string>('Today');
  const [paymentsDropdown, setPaymentsDropdown] = useState<string>('Payments');

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    onNavigate(page);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <CorporateSidebar
        currentPage={activePage}
        onNavigate={handleNavigation}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {/* NavBar */}
        <NavBar 
          onNavigate={handleNavigation}
          userType="corporate"
        />

        {/* Tabs and Filters */}
        <div className="bg-white border-b border-gray-200 px-8">
          <div className="flex items-center justify-between">
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

            {/* Dropdown Filters */}
            <div className="flex items-center gap-3 py-2">
              <button className="flex items-center gap-2 px-3 py-1.5 text-[14px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <span>{filterDropdown}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 text-[14px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <span>{paymentsDropdown}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="p-8">
          {/* Newest Section */}
          <div className="mb-6">
            <button className="flex items-center gap-2 text-[14px] font-medium text-gray-900 mb-4">
              <span>Newest</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <div className="space-y-3">
              {transactions.newest.map((transaction) => (
                <div key={transaction.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.statusColor === 'text-red-600' ? 'bg-red-100' : 'bg-green-100'
                      }`}>
                        <svg className={`w-5 h-5 ${transaction.statusColor === 'text-red-600' ? 'text-red-600' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-gray-900">{transaction.title}</div>
                        {transaction.date && (
                          <div className="text-[12px] text-gray-500">{transaction.date}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-1.5 ${transaction.statusColor}`}>
                        {transaction.statusIcon}
                        <span className="text-[13px] font-medium">{transaction.status}</span>
                      </div>
                      {transaction.hasAttachment && (
                        <Paperclip className="w-4 h-4 text-gray-400" />
                      )}
                      <div className={`text-[14px] font-semibold ${transaction.amountColor} min-w-[100px] text-right`}>
                        {transaction.amount}
                        <div className="text-[11px] text-gray-500 font-normal">{transaction.subtitle}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Yesterday Section */}
          <div className="mb-6">
            <button className="flex items-center gap-2 text-[14px] font-medium text-gray-900 mb-4">
              <span>Yesterday</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <div className="space-y-3">
              {transactions.yesterday.map((transaction) => (
                <div key={transaction.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-gray-900">{transaction.title}</div>
                        <div className="text-[12px] text-gray-500">{transaction.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-1.5 ${transaction.statusColor}`}>
                        {transaction.statusIcon}
                        <span className="text-[13px] font-medium">{transaction.status}</span>
                      </div>
                      {transaction.hasAttachment && (
                        <Paperclip className="w-4 h-4 text-gray-400" />
                      )}
                      <div className={`text-[14px] font-semibold ${transaction.amountColor} min-w-[100px] text-right`}>
                        {transaction.amount}
                        <div className="text-[11px] text-gray-500 font-normal">{transaction.subtitle}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 25 Aug 2025 Section */}
          <div>
            <button className="flex items-center gap-2 text-[14px] font-medium text-gray-900 mb-4">
              <span>25 Aug 2025</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <div className="space-y-3">
              {transactions.august25.map((transaction) => (
                <div key={transaction.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-gray-900">{transaction.title}</div>
                        <div className="text-[12px] text-gray-500">{transaction.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-1.5 ${transaction.statusColor}`}>
                        {transaction.statusIcon}
                        <span className="text-[13px] font-medium">{transaction.status}</span>
                      </div>
                      {transaction.hasAttachment && (
                        <Paperclip className="w-4 h-4 text-gray-400" />
                      )}
                      <div className={`text-[14px] font-semibold ${transaction.amountColor} min-w-[100px] text-right`}>
                        {transaction.amount}
                        <div className="text-[11px] text-gray-500 font-normal">{transaction.subtitle}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
