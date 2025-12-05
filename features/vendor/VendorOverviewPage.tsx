import { useState } from 'react';
import { Search, Bell, ShoppingCart, User } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import { VendorSidebar } from './components/VendorSidebar';

type Page = 'vendorDashboard' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorProfile' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp';

interface VendorOverviewPageProps {
  onNavigate: (page: Page) => void;
}

const revenueData = [
  { month: 'Jan', revenue: 2000, bookings: 12 },
  { month: 'Feb', revenue: 3500, bookings: 18 },
  { month: 'Mar', revenue: 2800, bookings: 15 },
  { month: 'Apr', revenue: 4200, bookings: 22 },
  { month: 'May', revenue: 3900, bookings: 20 },
  { month: 'Jun', revenue: 5100, bookings: 28 },
];

const serviceData = [
  { name: 'Accommodation', value: 45, revenue: 28000 },
  { name: 'Transport', value: 25, revenue: 15000 },
  { name: 'Activities', value: 20, revenue: 12000 },
  { name: 'Food', value: 10, revenue: 6000 },
];

const COLORS = ['#8363f2', '#14AE5C', '#FF6B6B', '#FFA500'];

export function VendorOverviewPage({ onNavigate }: VendorOverviewPageProps) {
  const [activePage, setActivePage] = useState<string>('overview');
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <VendorSidebar currentPage={activePage} onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[24px] font-medium text-black mb-1">Business Overview</h1>
              <p className="text-[14px] text-gray-600">Comprehensive analytics and insights</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTimeframe('week')}
                className={`px-4 py-2 rounded-lg text-[14px] transition-colors ${
                  timeframe === 'week' ? 'bg-[#8363f2] text-white' : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeframe('month')}
                className={`px-4 py-2 rounded-lg text-[14px] transition-colors ${
                  timeframe === 'month' ? 'bg-[#8363f2] text-white' : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeframe('year')}
                className={`px-4 py-2 rounded-lg text-[14px] transition-colors ${
                  timeframe === 'year' ? 'bg-[#8363f2] text-white' : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Year
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-[14px] text-gray-600 mb-2">Total Revenue</div>
              <div className="text-[32px] font-medium text-black">R61k</div>
              <div className="text-[12px] text-green-600 mt-2">+24% from last month</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-[14px] text-gray-600 mb-2">Total Bookings</div>
              <div className="text-[32px] font-medium text-black">115</div>
              <div className="text-[12px] text-green-600 mt-2">+18% from last month</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-[14px] text-gray-600 mb-2">Active Campaigns</div>
              <div className="text-[32px] font-medium text-black">12</div>
              <div className="text-[12px] text-green-600 mt-2">+3 this month</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-[14px] text-gray-600 mb-2">Avg. Rating</div>
              <div className="text-[32px] font-medium text-black">4.8</div>
              <div className="text-[12px] text-green-600 mt-2">+0.2 from last month</div>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-[18px] font-medium text-black mb-6">Revenue & Bookings Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8363f2" strokeWidth={2} name="Revenue (R)" />
                  <Line type="monotone" dataKey="bookings" stroke="#14AE5C" strokeWidth={2} name="Bookings" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-[18px] font-medium text-black mb-6">Revenue by Service</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Service Performance Table */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-[18px] font-medium text-black mb-6">Service Performance</h2>
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-[12px] font-medium text-gray-600 uppercase">Service</th>
                  <th className="px-4 py-3 text-left text-[12px] font-medium text-gray-600 uppercase">Bookings</th>
                  <th className="px-4 py-3 text-left text-[12px] font-medium text-gray-600 uppercase">Revenue</th>
                  <th className="px-4 py-3 text-left text-[12px] font-medium text-gray-600 uppercase">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {serviceData.map((service, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 text-[14px] text-gray-900">{service.name}</td>
                    <td className="px-4 py-4 text-[14px] text-gray-900">{service.value}</td>
                    <td className="px-4 py-4 text-[14px] text-gray-900">R{service.revenue.toLocaleString()}</td>
                    <td className="px-4 py-4 text-[14px] text-green-600">+{Math.floor(Math.random() * 20 + 5)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-[18px] font-medium text-black mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                <div className="w-2 h-2 bg-[#8363f2] rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="text-[14px] text-black">New booking from Michael - Cape Town Lodge</div>
                  <div className="text-[12px] text-gray-600">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                <div className="w-2 h-2 bg-[#14AE5C] rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="text-[14px] text-black">Payment received from Sarah Johnson - R8,000</div>
                  <div className="text-[12px] text-gray-600">5 hours ago</div>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                <div className="w-2 h-2 bg-[#8363f2] rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="text-[14px] text-black">Review received from David Williams - 5 stars</div>
                  <div className="text-[12px] text-gray-600">1 day ago</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#8363f2] rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="text-[14px] text-black">New voucher claimed by Emma Davis</div>
                  <div className="text-[12px] text-gray-600">2 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
