import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, Download, Eye } from 'lucide-react';
import { CorporateSidebar } from './components/CorporateSidebar';
import { NavBar } from '../../components/NavBar';

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
