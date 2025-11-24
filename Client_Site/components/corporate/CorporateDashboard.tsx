import { Calendar, TrendingUp, Users, DollarSign, Bell, ShoppingCart, User as UserIcon, Download, Share2 } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CorporateSidebar } from './CorporateSidebar';
import { NavBar } from '../NavBar';
import { toast } from 'sonner@2.0.3';
import { Toaster } from '../ui/sonner';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'approveBookingRequest' | 'editBooking' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable';

interface CorporateDashboardProps {
  onNavigate: (page: Page) => void;
}

const contributionData = [
  { month: 'Jan', amount: 2000 },
  { month: 'Feb', amount: 5000 },
  { month: 'Mar', amount: 3500 },
  { month: 'Apr', amount: 7000 },
  { month: 'May', amount: 6000 },
  { month: 'Jun', amount: 8500 },
  { month: 'Jul', amount: 7500 },
  { month: 'Aug', amount: 9000 },
  { month: 'Sep', amount: 8000 },
  { month: 'Oct', amount: 11000 },
  { month: 'Nov', amount: 12000 },
];

export function CorporateDashboard({ onNavigate }: CorporateDashboardProps) {
  const [activePage, setActivePage] = useState<string>('dashboard');

  const handleNavigation = (page: Page) => {
    setActivePage(page === 'corporateDashboard' ? 'dashboard' : 
                   page === 'corporateCampaigns' ? 'campaigns' :
                   page === 'corporateVouchers' ? 'vouchers' :
                   page === 'corporateTransactions' ? 'transactions' :
                   page === 'corporateProfile' ? 'profile' :
                   page === 'corporateOverview' ? 'overview' :
                   page === 'corporateDrafts' ? 'drafts' :
                   page === 'corporateHelp' ? 'help' : page);
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

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.text('Corporate Dashboard Report', 10, 10);
    doc.text('Total Contribution: R42 000.00', 10, 20);
    doc.text('Campaigns Sponsored: 5', 10, 30);
    doc.text('Beneficiaries Supported: 120', 10, 40);
    doc.text('Vendors Involved: 3', 10, 50);
    doc.save('corporate_dashboard_report.pdf');
    toast.success('Report downloaded successfully');
  };

  const handleShareImpact = () => {
    toast.success('Impact report shared successfully');
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
        
        {/* Welcome Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[18px] text-gray-900">Welcome back/addmore digital</h1>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleDownloadReport}
                className="flex items-center gap-2 px-4 py-2 text-[14px] border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
              <button 
                onClick={handleShareImpact}
                className="flex items-center gap-2 px-4 py-2 text-[14px] border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Impact</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {/* Total Contribution */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-[14px] text-gray-600 mb-2">Total contribution</div>
              <div className="text-[24px] font-semibold text-black mb-1">R42 000.00</div>
              <div className="text-[12px] text-green-600">+73% vs last month</div>
            </div>

            {/* Campaigns Sponsored */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-[14px] text-gray-600 mb-2">Campaigns Sponsored</div>
              <div className="text-[24px] font-semibold text-black mb-1">5</div>
              <div className="text-[12px] text-purple-600">75% towards goal</div>
            </div>

            {/* Beneficiaries Supported */}
            <div className="bg-[#7c3aed] rounded-lg p-6 text-white">
              <div className="text-[14px] mb-2">Beneficiaries Supported</div>
              <div className="text-[48px] font-semibold leading-none">120</div>
            </div>

            {/* Vendors Involved */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="text-[14px] text-gray-600 mb-2">Vendors Involved</div>
              <div className="text-[24px] font-semibold text-black">3</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Impact Cards */}
              <div>
                <h2 className="text-[16px] font-medium text-black mb-4">Impact</h2>
                <div className="grid grid-cols-2 gap-4">
                  {/* Trips Funded */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[12px] text-gray-600">Trips Funded</div>
                        <div className="text-[20px] font-semibold text-black">5</div>
                      </div>
                    </div>
                  </div>

                  {/* Nights Sponsored */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[12px] text-gray-600">Nights Sponsored</div>
                        <div className="text-[20px] font-semibold text-black">150</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contribution Over Time */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-[16px] font-medium text-black mb-4">Contribution Over Time</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={contributionData}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      formatter={(value) => [`R${value}`, 'Amount']}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                      fill="url(#colorAmount)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Column - Contribution Distribution */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-[16px] font-medium text-black mb-6">Contribution Distribution</h3>
              
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-64 h-64">
                  <svg width="256" height="256" viewBox="0 0 256 256">
                    {/* Accommodation - 45% (Dark Purple) */}
                    <circle
                      cx="128"
                      cy="128"
                      r="100"
                      fill="none"
                      stroke="#5B21B6"
                      strokeWidth="24"
                      strokeDasharray={`${2 * Math.PI * 100 * 0.45} ${2 * Math.PI * 100}`}
                      strokeDashoffset="0"
                      transform="rotate(-90 128 128)"
                    />
                    
                    {/* Transport - 30% (Medium Purple) */}
                    <circle
                      cx="128"
                      cy="128"
                      r="100"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="24"
                      strokeDasharray={`${2 * Math.PI * 100 * 0.30} ${2 * Math.PI * 100}`}
                      strokeDashoffset={`-${2 * Math.PI * 100 * 0.45}`}
                      transform="rotate(-90 128 128)"
                    />
                    
                    {/* Foods - 25% (Light Purple) */}
                    <circle
                      cx="128"
                      cy="128"
                      r="100"
                      fill="none"
                      stroke="#A78BFA"
                      strokeWidth="24"
                      strokeDasharray={`${2 * Math.PI * 100 * 0.25} ${2 * Math.PI * 100}`}
                      strokeDashoffset={`-${2 * Math.PI * 100 * 0.75}`}
                      transform="rotate(-90 128 128)"
                    />
                  </svg>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
                    alt="Accommodation"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#5B21B6]"></div>
                    <span className="text-[14px] text-gray-700">Accommodation</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
                    alt="Transport"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#8B5CF6]"></div>
                    <span className="text-[14px] text-gray-700">Transport</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
                    alt="Foods"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#A78BFA]"></div>
                    <span className="text-[14px] text-gray-700">Foods</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}