import { Search, Bell, ShoppingCart, User as UserIcon, ChevronDown, Paperclip } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

export function TransactionsList() {
  const transactions = {
    today: [
      {
        id: 1,
        name: 'Gold Reef City theme park',
        date: '12 Sept 2025 at 06:47 PM',
        status: 'Recurring',
        statusColor: 'text-purple-600',
        statusIcon: '🔄',
        amount: '+R1000.00',
        amountColor: 'text-green-600',
        subtext: 'FNB Cheque'
      },
      {
        id: 2,
        name: 'Cape Trip-Seaview Lodge',
        date: '12 Sept 2025 at 06:47 PM',
        status: 'Refund',
        statusColor: 'text-red-600',
        statusIcon: '↩️',
        amount: '-R1000.00',
        amountColor: 'text-red-600',
        subtext: 'FNB Ewaltet'
      }
    ],
    yesterday: [
      {
        id: 3,
        name: 'Swiss Adventure - Mogen Hotel',
        date: '11 Sept 2025 at 06:47 PM',
        status: 'Paid',
        statusColor: 'text-green-600',
        statusIcon: '✓',
        amount: '+R1000.00',
        amountColor: 'text-green-600',
        subtext: 'Debit Order'
      },
      {
        id: 4,
        name: 'Sun city -Sun city cabana',
        date: '11 Sept 2025 at 06:47 PM',
        status: 'Recurring',
        statusColor: 'text-purple-600',
        statusIcon: '🔄',
        amount: '+R1000.00',
        amountColor: 'text-green-600',
        subtext: 'Debit Order'
      },
      {
        id: 5,
        name: 'Sun city -Sun city cabana',
        date: '11 Sept 2025 at 06:47 PM',
        status: 'Paid',
        statusColor: 'text-green-600',
        statusIcon: '✓',
        amount: '+R1000.00',
        amountColor: 'text-green-600',
        subtext: 'Debit Order'
      }
    ],
    august25: [
      {
        id: 6,
        name: 'Magalies Park',
        date: '11 Aug 2025 at 06:47 PM',
        status: 'Refund',
        statusColor: 'text-red-600',
        statusIcon: '↩️',
        amount: '-R2000.00',
        amountColor: 'text-red-600',
        subtext: 'EFT'
      },
      {
        id: 7,
        name: 'Magalies Park',
        date: '11 Aug 2025 at 06:47 PM',
        status: 'Refund',
        statusColor: 'text-red-600',
        statusIcon: '↩️',
        amount: '-R800.00',
        amountColor: 'text-red-600',
        subtext: 'EFT Payfast'
      }
    ]
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search" className="pl-10 w-64" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700">Create</Button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <UserIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Tabs */}
          <div className="flex items-center gap-6 mb-6">
            <button className="text-gray-600 hover:text-gray-900 pb-2">
              All Transactions
            </button>
            <button className="text-purple-600 border-b-2 border-purple-600 pb-2">
              Today
            </button>
            <button className="text-gray-600 hover:text-gray-900 pb-2">
              Payments <ChevronDown className="w-4 h-4 inline ml-1" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-6">
            <Button variant="outline" size="sm">
              Newest <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Transaction List */}
          <div className="bg-white rounded-xl border border-gray-200">
            {/* Today */}
            <div className="border-b border-gray-200">
              <div className="px-6 py-3 bg-gray-50">
                <h3 className="text-sm">Today</h3>
              </div>
              {transactions.today.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.status === 'Paid' ? 'bg-green-100' : 
                      transaction.status === 'Recurring' ? 'bg-purple-100' : 
                      'bg-red-100'
                    }`}>
                      <span className="text-lg">{transaction.statusIcon}</span>
                    </div>
                    <div>
                      <p>{transaction.name}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className={transaction.statusColor}>{transaction.status}</span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                    </button>
                    <div className="text-right">
                      <p className={transaction.amountColor}>{transaction.amount}</p>
                      <p className="text-sm text-gray-500">{transaction.subtext}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Yesterday */}
            <div className="border-b border-gray-200">
              <div className="px-6 py-3 bg-gray-50 flex items-center justify-between">
                <h3 className="text-sm">Yesterday</h3>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              {transactions.yesterday.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.status === 'Paid' ? 'bg-green-100' : 
                      transaction.status === 'Recurring' ? 'bg-purple-100' : 
                      'bg-red-100'
                    }`}>
                      <span className="text-lg">{transaction.statusIcon}</span>
                    </div>
                    <div>
                      <p>{transaction.name}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className={transaction.statusColor}>{transaction.status}</span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                    </button>
                    <div className="text-right">
                      <p className={transaction.amountColor}>{transaction.amount}</p>
                      <p className="text-sm text-gray-500">{transaction.subtext}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 25 Aug 2025 */}
            <div>
              <div className="px-6 py-3 bg-gray-50 flex items-center justify-between">
                <h3 className="text-sm">25 Aug 2025</h3>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              {transactions.august25.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.status === 'Paid' ? 'bg-green-100' : 
                      transaction.status === 'Recurring' ? 'bg-purple-100' : 
                      'bg-red-100'
                    }`}>
                      <span className="text-lg">{transaction.statusIcon}</span>
                    </div>
                    <div>
                      <p>{transaction.name}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className={transaction.statusColor}>{transaction.status}</span>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Paperclip className="w-4 h-4 text-gray-400" />
                    </button>
                    <div className="text-right">
                      <p className={transaction.amountColor}>{transaction.amount}</p>
                      <p className="text-sm text-gray-500">{transaction.subtext}</p>
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
