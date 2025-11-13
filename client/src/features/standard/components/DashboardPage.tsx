import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, ChevronDown, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns';

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  onShowSelectCampaign?: () => void;
  onShowAddCampaign?: () => void;
}

export function DashboardPage({ onNavigate, onShowNotifications, onShowSelectCampaign, onShowAddCampaign }: DashboardPageProps) {
  const [sortBy, setSortBy] = useState('Most Recent');
  const transactions = [
    {
      date: '01/06/2025',
      description: 'Fund received for Grace',
      amount: 'R1500.00',
      status: 'Completed',
      paymentMethod: 'Debit Card',
    },
    {
      date: '08/06/2025',
      description: 'Fund received for Paul',
      amount: 'R2000.00',
      status: 'Pending',
      paymentMethod: 'Debit Card',
    },
    {
      date: '10/06/2025',
      description: 'Fund received for Amukelani',
      amount: 'R1000.00',
      status: 'Completed',
      paymentMethod: 'Wallet',
    },
    {
      date: '15/06/2025',
      description: 'Fund received for Blessing',
      amount: 'R800.00',
      status: 'Completed',
      paymentMethod: 'Debit Card',
    },
    {
      date: '20/06/2025',
      description: 'Fund received for Vulkona',
      amount: 'R2500.00',
      status: 'Completed',
      paymentMethod: 'Cash Sent',
    },
    {
      date: '01/07/2025',
      description: 'Fund received for Ndzulamo',
      amount: 'R500.00',
      status: 'Pending',
      paymentMethod: 'Debit Card',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => onNavigate('campaignSchedule')}
            className="border-gray-300"
          >
            Schedule
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate('campaignsHistory')}
            className="border-gray-300"
          >
            History
          </Button>
          <Button 
            onClick={onShowAddCampaign}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Create
          </Button>
          <button 
            onClick={onShowNotifications}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg relative"
          >
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg">
            <ShoppingCart size={20} className="text-gray-700" />
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
          >
            <User size={20} className="text-gray-700" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        {/* Sort By and Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Button
              onClick={onShowSelectCampaign}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Contribute to Campaign
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate('individualCampaign')}
              className="border-gray-300"
            >
              Individual
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate('groupCampaign')}
              className="border-gray-300"
            >
              Group
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate('managingCampaigns')}
              className="border-gray-300"
            >
              Managing
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50">
                <span className="text-gray-700">Sort by: {sortBy}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy('Most Recent')}>
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('Oldest First')}>
                Oldest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('Amount (High to Low)')}>
                Amount (High to Low)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('Amount (Low to High)')}>
                Amount (Low to High)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Spent */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-2">Total spent this month</div>
            <div className="text-gray-900 mb-2">R7500.00</div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={14} />
              <span>This week</span>
            </div>
          </div>

          {/* Total Received */}
          <div className="bg-purple-600 rounded-lg p-6 shadow-sm text-white">
            <div className="mb-2">Total received</div>
            <div className="mb-2">R8500.00</div>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>This week</span>
            </div>
          </div>

          {/* Current Balance */}
          <div className="bg-black rounded-lg p-6 shadow-sm text-white">
            <div className="mb-2">Current Balance</div>
            <div className="mb-2">R13000.00</div>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>This week</span>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-gray-700">Date</th>
                  <th className="text-left px-6 py-4 text-gray-700">Description</th>
                  <th className="text-left px-6 py-4 text-gray-700">Amount</th>
                  <th className="text-left px-6 py-4 text-gray-700">Status</th>
                  <th className="text-left px-6 py-4 text-gray-700">Payment method</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr 
                    key={index} 
                    onClick={() => onNavigate('campaignDetail')}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 text-gray-900">{transaction.date}</td>
                    <td className="px-6 py-4 text-gray-900">{transaction.description}</td>
                    <td className="px-6 py-4 text-gray-900">{transaction.amount}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={transaction.status === 'Completed' ? 'default' : 'secondary'}
                        className={
                          transaction.status === 'Completed'
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                            : 'bg-red-100 text-red-700 hover:bg-red-100'
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{transaction.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Download Button */}
          <div className="p-6 flex justify-end">
            <Button className="bg-purple-600 hover:bg-purple-700">Download page</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
