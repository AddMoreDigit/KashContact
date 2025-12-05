import { useState } from 'react';
import { Search, Download, Filter, Calendar, ChevronDown, Paperclip, RefreshCw, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { CorporateSidebar } from './components/CorporateSidebar';
import { NavBar } from '../../components/NavBar';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'approveBookingRequest' | 'editBooking' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable';

interface CorporateTransactionsPageProps {
  onNavigate: (page: Page) => void;
}

interface Transaction {
  id: number;
  title: string;
  campaign: string;
  date: string;
  status: 'Paid' | 'Pending' | 'Refund' | 'Failed';
  amount: number;
  paymentMethod: string;
  recipient: string;
  hasAttachment: boolean;
}

export function CorporateTransactionsPage({ onNavigate }: CorporateTransactionsPageProps) {
  const [activePage, setActivePage] = useState<string>('transactions');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleNavigation = (page: Page) => {
    setActivePage(page === 'corporateTransactions' ? 'transactions' : page);
    onNavigate(page);
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

  const transactions: Transaction[] = [
    {
      id: 1,
      title: 'Accommodation Payment',
      campaign: 'Swiss Adventure',
      date: 'Nov 14, 2025 at 10:30 AM',
      status: 'Paid',
      amount: -15000,
      paymentMethod: 'Debit Order',
      recipient: 'Mogen Hotel',
      hasAttachment: true,
    },
    {
      id: 2,
      title: 'Transport Service',
      campaign: 'Cape Town Gateway',
      date: 'Nov 13, 2025 at 03:45 PM',
      status: 'Paid',
      amount: -5000,
      paymentMethod: 'Credit Card',
      recipient: 'Seaview Transport',
      hasAttachment: false,
    },
    {
      id: 3,
      title: 'Food & Catering',
      campaign: 'Durban Beach Escape',
      date: 'Nov 12, 2025 at 09:15 AM',
      status: 'Pending',
      amount: -8000,
      paymentMethod: 'EFT',
      recipient: 'Oceanview Dining',
      hasAttachment: true,
    },
    {
      id: 4,
      title: 'Campaign Refund',
      campaign: 'Garden Route Adventure',
      date: 'Nov 11, 2025 at 02:20 PM',
      status: 'Refund',
      amount: 3000,
      paymentMethod: 'FNB Ewallet',
      recipient: 'Member: Michael',
      hasAttachment: false,
    },
    {
      id: 5,
      title: 'Activities Package',
      campaign: 'Swiss Adventure',
      date: 'Nov 10, 2025 at 11:00 AM',
      status: 'Paid',
      amount: -12000,
      paymentMethod: 'Debit Order',
      recipient: 'Adventure Tours SA',
      hasAttachment: true,
    },
    {
      id: 6,
      title: 'Accommodation Deposit',
      campaign: 'Cape Town Gateway',
      date: 'Nov 09, 2025 at 08:30 AM',
      status: 'Failed',
      amount: -7000,
      paymentMethod: 'Credit Card',
      recipient: 'Seaview Lodge',
      hasAttachment: false,
    },
    {
      id: 7,
      title: 'Transport Booking',
      campaign: 'Durban Beach Escape',
      date: 'Nov 08, 2025 at 04:15 PM',
      status: 'Paid',
      amount: -4500,
      paymentMethod: 'Debit Order',
      recipient: 'Coastal Transfers',
      hasAttachment: true,
    },
    {
      id: 8,
      title: 'Voucher Redemption',
      campaign: 'Garden Route Adventure',
      date: 'Nov 07, 2025 at 01:45 PM',
      status: 'Paid',
      amount: -2000,
      paymentMethod: 'Voucher',
      recipient: 'Mountain Lodge',
      hasAttachment: false,
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.campaign.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || transaction.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleExport = () => {
    toast.success('Transactions exported successfully');
  };

  const totalSpent = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalRefunded = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const pendingAmount = transactions
    .filter((t) => t.status === 'Pending')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <CorporateSidebar
        currentPage={activePage}
        onNavigate={handleNavigation}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* NavBar */}
        <NavBar 
          onNavigate={handleNavigation}
          userType="corporate"
        />
        
        <div className="p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[32px] text-gray-900 mb-2">Transactions</h1>
              <p className="text-[16px] text-gray-600">Track all your campaign payments and refunds</p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <p className="text-[14px] text-gray-600 mb-1">Total Spent</p>
              <p className="text-[28px] text-gray-900">R{totalSpent.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-[14px] text-gray-600 mb-1">Total Refunded</p>
              <p className="text-[28px] text-gray-900">R{totalRefunded.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-[14px] text-gray-600 mb-1">Pending Amount</p>
              <p className="text-[28px] text-gray-900">R{pendingAmount.toLocaleString()}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Refund">Refund</option>
                <option value="Failed">Failed</option>
              </select>

              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="w-5 h-5" />
                <span>Date Range</span>
              </button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-[14px] text-gray-600">Transaction</th>
                  <th className="text-left px-6 py-4 text-[14px] text-gray-600">Campaign</th>
                  <th className="text-left px-6 py-4 text-[14px] text-gray-600">Date</th>
                  <th className="text-left px-6 py-4 text-[14px] text-gray-600">Status</th>
                  <th className="text-left px-6 py-4 text-[14px] text-gray-600">Payment Method</th>
                  <th className="text-right px-6 py-4 text-[14px] text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-[14px] text-gray-900">{transaction.title}</p>
                          <p className="text-[12px] text-gray-500">{transaction.recipient}</p>
                        </div>
                        {transaction.hasAttachment && (
                          <Paperclip className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[14px] text-gray-700">{transaction.campaign}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[14px] text-gray-700">{transaction.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] ${
                          transaction.status === 'Paid'
                            ? 'bg-green-100 text-green-700'
                            : transaction.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : transaction.status === 'Refund'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {transaction.status === 'Refund' && <RefreshCw className="w-3 h-3" />}
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[14px] text-gray-700">{transaction.paymentMethod}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p
                        className={`text-[14px] ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {transaction.amount > 0 ? '+' : ''}R{Math.abs(transaction.amount).toLocaleString()}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredTransactions.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-500">No transactions found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
