import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, Download } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import { VendorSidebar } from './components/VendorSidebar';

type Page = 'vendorDashboard' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorProfile' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp';

interface VendorTransactionsPageProps {
  onNavigate: (page: Page) => void;
}

interface Transaction {
  id: number;
  date: string;
  campaign: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod: string;
}

export function VendorTransactionsPage({ onNavigate }: VendorTransactionsPageProps) {
  const [activePage, setActivePage] = useState<string>('transactions');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    onNavigate(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('hasVisitedBefore');
    toast.success('Logged out successfully');
    setTimeout(() => {
      onNavigate('login' as Page);
    }, 500);
  };

  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      date: '2024-11-10',
      campaign: 'Cape Town - Seaview Lodge',
      customer: 'Michael',
      amount: 6000,
      status: 'completed',
      paymentMethod: 'Credit Card'
    },
    {
      id: 2,
      date: '2024-11-09',
      campaign: 'Durban Gateway',
      customer: 'Sarah Johnson',
      amount: 8000,
      status: 'completed',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 3,
      date: '2024-11-08',
      campaign: 'Beach Resort Package',
      customer: 'David Williams',
      amount: 10000,
      status: 'pending',
      paymentMethod: 'Credit Card'
    },
    {
      id: 4,
      date: '2024-11-07',
      campaign: 'Mountain Lodge',
      customer: 'Emma Davis',
      amount: 4500,
      status: 'completed',
      paymentMethod: 'Debit Card'
    },
    {
      id: 5,
      date: '2024-11-06',
      campaign: 'Safari Adventure',
      customer: 'Michael',
      amount: 12000,
      status: 'cancelled',
      paymentMethod: 'Bank Transfer'
    },
  ]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || transaction.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleExportTransactions = () => {
    // Create CSV content
    const csvHeaders = ['Date', 'Campaign', 'Customer', 'Amount', 'Payment Method', 'Status'];
    const csvRows = filteredTransactions.map(t => [
      t.date,
      t.campaign,
      t.customer,
      `R${t.amount.toLocaleString()}`,
      t.paymentMethod,
      t.status
    ]);

    // Add summary information
    const completedCount = transactions.filter(t => t.status === 'completed').length;
    const pendingCount = transactions.filter(t => t.status === 'pending').length;
    const cancelledCount = transactions.filter(t => t.status === 'cancelled').length;

    const summaryRows = [
      [],
      ['Transaction Summary'],
      ['Total Revenue (Completed)', `R${totalRevenue.toLocaleString()}`],
      ['Completed Transactions', completedCount.toString()],
      ['Pending Transactions', pendingCount.toString()],
      ['Cancelled Transactions', cancelledCount.toString()],
      ['Total Transactions', transactions.length.toString()]
    ];

    // Combine headers, data, and summary
    const allRows = [csvHeaders, ...csvRows, ...summaryRows];
    
    // Convert to CSV string
    const csvContent = allRows.map(row => row.join(',')).join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `vendor_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Transactions exported successfully!');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <VendorSidebar currentPage={activePage} onNavigate={onNavigate} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[24px] font-medium text-black mb-1">Transactions</h1>
              <p className="text-[14px] text-gray-600">View and manage your transaction history</p>
            </div>
            <button
              className="flex items-center gap-2 bg-[#8363f2] text-white px-4 py-2 rounded-lg hover:bg-[#6c4ab6] transition-colors"
              onClick={handleExportTransactions}
            >
              <Download className="w-4 h-4" />
              <span className="text-[14px]">Export</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-[14px] text-gray-600 mb-2">Total Revenue</div>
              <div className="text-[32px] font-medium text-black">R{totalRevenue.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-[14px] text-gray-600 mb-2">Completed</div>
              <div className="text-[32px] font-medium text-black">{transactions.filter(t => t.status === 'completed').length}</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-[14px] text-gray-600 mb-2">Pending</div>
              <div className="text-[32px] font-medium text-black">{transactions.filter(t => t.status === 'pending').length}</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-[14px] text-gray-600 mb-2">Cancelled</div>
              <div className="text-[32px] font-medium text-black">{transactions.filter(t => t.status === 'cancelled').length}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] text-[14px]"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg text-[14px] transition-colors ${
                    filterStatus === 'all' ? 'bg-[#8363f2] text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus('completed')}
                  className={`px-4 py-2 rounded-lg text-[14px] transition-colors ${
                    filterStatus === 'completed' ? 'bg-[#8363f2] text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-4 py-2 rounded-lg text-[14px] transition-colors ${
                    filterStatus === 'pending' ? 'bg-[#8363f2] text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilterStatus('cancelled')}
                  className={`px-4 py-2 rounded-lg text-[14px] transition-colors ${
                    filterStatus === 'cancelled' ? 'bg-[#8363f2] text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Cancelled
                </button>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 uppercase tracking-wider whitespace-nowrap">Date</th>
                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 uppercase tracking-wider">Campaign</th>
                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 uppercase tracking-wider whitespace-nowrap">Customer</th>
                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 uppercase tracking-wider whitespace-nowrap">Amount</th>
                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 uppercase tracking-wider whitespace-nowrap">Payment Method</th>
                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 uppercase tracking-wider whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 uppercase tracking-wider whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-[13px] text-gray-900 whitespace-nowrap">{transaction.date}</td>
                      <td className="px-4 py-3 text-[13px] text-gray-900">{transaction.campaign}</td>
                      <td className="px-4 py-3 text-[13px] text-gray-900 whitespace-nowrap">{transaction.customer}</td>
                      <td className="px-4 py-3 text-[13px] text-gray-900 whitespace-nowrap">R{transaction.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-[13px] text-gray-500 whitespace-nowrap">{transaction.paymentMethod}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-[11px] rounded-full capitalize ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-700' :
                          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          className="text-[13px] text-[#8363f2] hover:text-[#6c4ab6] transition-colors"
                          onClick={() => toast.info(`Viewing transaction #${transaction.id}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 mt-6">
              <p className="text-[14px] text-gray-600">No transactions found</p>
            </div>
          )}
        </div>
      </div>

      <Toaster />
    </div>
  );
}
