import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Award } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CorporateSidebar } from './CorporateSidebar';
import { toast } from 'sonner';
import { Toaster } from '../ui/sonner';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'approveBookingRequest' | 'editBooking' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable';

interface CorporateOverviewPageProps {
  onNavigate: (page: Page) => void;
}

const campaignData = [
  { month: 'Jan', active: 4, completed: 2 },
  { month: 'Feb', active: 6, completed: 3 },
  { month: 'Mar', active: 5, completed: 4 },
  { month: 'Apr', active: 8, completed: 5 },
  { month: 'May', active: 7, completed: 6 },
  { month: 'Jun', active: 9, completed: 7 },
];

const spendingData = [
  { month: 'Jan', amount: 15000 },
  { month: 'Feb', amount: 23000 },
  { month: 'Mar', amount: 18000 },
  { month: 'Apr', amount: 32000 },
  { month: 'May', amount: 28000 },
  { month: 'Jun', amount: 35000 },
];

const categoryData = [
  { name: 'Accommodation', value: 45, color: '#8363f2' },
  { name: 'Transport', value: 25, color: '#14AE5C' },
  { name: 'Food', value: 20, color: '#FF6B6B' },
  { name: 'Activities', value: 10, color: '#FFA500' },
];

const COLORS = ['#8363f2', '#14AE5C', '#FF6B6B', '#FFA500'];

export function CorporateOverviewPage({ onNavigate }: CorporateOverviewPageProps) {
  const [activePage, setActivePage] = useState<string>('overview');
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  const handleNavigation = (page: Page) => {
    setActivePage(page === 'corporateOverview' ? 'overview' : page);
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <CorporateSidebar
        currentPage={activePage}
        onNavigate={handleNavigation}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[32px] text-gray-900 mb-2">Overview</h1>
              <p className="text-[16px] text-gray-600">Comprehensive view of your corporate impact</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeframe('week')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  timeframe === 'week' ? 'bg-[#8363f2] text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeframe('month')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  timeframe === 'month' ? 'bg-[#8363f2] text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeframe('year')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  timeframe === 'year' ? 'bg-[#8363f2] text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Year
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#8363f2]" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[12px]">+12.5%</span>
                </div>
              </div>
              <p className="text-[14px] text-gray-600 mb-1">Total Spending</p>
              <p className="text-[28px] text-gray-900">R151,000</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[12px]">+8.2%</span>
                </div>
              </div>
              <p className="text-[14px] text-gray-600 mb-1">Active Campaigns</p>
              <p className="text-[28px] text-gray-900">9</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[12px]">+15.3%</span>
                </div>
              </div>
              <p className="text-[14px] text-gray-600 mb-1">Beneficiaries Reached</p>
              <p className="text-[28px] text-gray-900">120</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex items-center gap-1 text-red-600">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-[12px]">-2.1%</span>
                </div>
              </div>
              <p className="text-[14px] text-gray-600 mb-1">Impact Score</p>
              <p className="text-[28px] text-gray-900">87/100</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Campaign Activity Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-[20px] text-gray-900 mb-6">Campaign Activity</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="active" fill="#8363f2" name="Active" />
                  <Bar dataKey="completed" fill="#14AE5C" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Spending Trend Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-[20px] text-gray-900 mb-6">Spending Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#8363f2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-6">
            {/* Category Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 col-span-1">
              <h2 className="text-[20px] text-gray-900 mb-6">Spending by Category</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-[14px] text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-[14px] text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 col-span-2">
              <h2 className="text-[20px] text-gray-900 mb-6">Recent Activities</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#8363f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-gray-900 mb-1">New campaign "Swiss Adventure" created</p>
                    <p className="text-[12px] text-gray-500">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-gray-900 mb-1">Campaign "Cape Town Gateway" reached 75% funding</p>
                    <p className="text-[12px] text-gray-500">5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-gray-900 mb-1">5 new members added to "Durban Beach Escape"</p>
                    <p className="text-[12px] text-gray-500">1 day ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-gray-900 mb-1">Payment of R10,000 processed for "Swiss Adventure"</p>
                    <p className="text-[12px] text-gray-500">2 days ago</p>
                  </div>
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
