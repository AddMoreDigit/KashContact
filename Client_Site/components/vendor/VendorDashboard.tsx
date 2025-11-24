import { useState, useEffect } from 'react';
import { Search, Bell, ShoppingCart, User, ChevronDown, Calendar, DollarSign, TrendingUp, Users, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';
import { Toaster } from '../ui/sonner';
import { VendorSidebar } from './VendorSidebar';
import { BookingDetailsDialog } from './BookingDetailsDialog';
import { CampaignCancellationDialog } from './CampaignCancellationDialog';
import { CreateOptionsDialog } from './CreateOptionsDialog';
import { CreateVoucherDialog } from './CreateVoucherDialog';
import { CreateServiceDialog } from './CreateServiceDialog';
import { CreateCampaignDialog } from './CreateCampaignDialog';
import { serviceProviderStorage } from '../../utils/serviceProviderStorage';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'approveBookingRequest' | 'editBooking' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable';

interface VendorDashboardProps {
  onNavigate: (page: Page) => void;
}

const revenueData = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 3500 },
  { month: 'Mar', revenue: 2800 },
  { month: 'Apr', revenue: 4200 },
  { month: 'May', revenue: 3900 },
  { month: 'June', revenue: 5100 },
  { month: 'Jul', revenue: 4800 },
  { month: 'Aug', revenue: 6200 },
  { month: 'Sep', revenue: 5800 },
  { month: 'Oct', revenue: 7100 },
  { month: 'Nov', revenue: 8500 },
];

const campaigns = [
  {
    id: 1,
    name: 'Cape Town - Seaview lodge',
    goal: 20000,
    saved: 6000,
    image: 'https://images.unsplash.com/photo-1706539473665-26d6c25cd2d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMHNlYXZpZXd8ZW58MXx8fHwxNzYzMDU2OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    name: 'Durban gateway - front beach',
    goal: 25000,
    saved: 5000,
    image: 'https://images.unsplash.com/photo-1675277064786-54a171a89a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJiYW4lMjBiZWFjaHxlbnwxfHx8fDE3NjI5NTEzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    name: 'Durban - south coast',
    goal: 20000,
    saved: 16000,
    image: 'https://images.unsplash.com/photo-1675277064786-54a171a89a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJiYW4lMjBiZWFjaHxlbnwxfHx8fDE3NjI5NTEzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

const vouchers = [
  {
    id: 1,
    title: '10k Off Accommodation',
    claimedBy: 'Jayden',
    date: 'August 16, 2024',
    image: 'https://images.unsplash.com/photo-1657687380097-88a4a3570bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGFjY29tbW9kYXRpb258ZW58MXx8fHwxNzYyOTU2OTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: '5% Off Food',
    claimedBy: 'Jayden',
    date: 'August 16, 2024',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjI5NTExOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    title: '5% Off Transport',
    claimedBy: 'Jayden',
    date: 'August 16, 2024',
    image: 'https://images.unsplash.com/photo-1662386752917-2c63f23ac578?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc3BvcnQlMjB2ZWhpY2xlfGVufDF8fHx8MTc2MzA1NjkxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    title: '5% Off Activities',
    claimedBy: 'Jayden',
    date: 'August 16, 2024',
    image: 'https://images.unsplash.com/photo-1600523314258-0892ccaaef1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpdml0aWVzJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2Mjk1MjY3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function VendorDashboard({ onNavigate }: VendorDashboardProps) {
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2, 1)); // March 2025
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showCreateVoucherDialog, setShowCreateVoucherDialog] = useState(false);
  const [showCreateServiceDialog, setShowCreateServiceDialog] = useState(false);
  const [showCreateCampaignDialog, setShowCreateCampaignDialog] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  
  // Get vendor profile
  const vendorProfile = serviceProviderStorage.get();

  // Initialize service provider profile on first load
  useEffect(() => {
    serviceProviderStorage.initialize();
  }, []);

  const handleNavigation = (page: string) => {
    setActivePage(page);
    // Map generic names to specific vendor page names
    const pageMap: { [key: string]: Page } = {
      'dashboard': 'vendorDashboard',
      'campaigns': 'vendorCampaigns',
      'services': 'vendorServices',
      'transactions': 'vendorTransactions',
      'profile': 'vendorProfile',
      'overview': 'vendorOverview',
      'draft': 'vendorDrafts',
      'help': 'vendorHelp',
    };
    const mappedPage = pageMap[page] || page;
    onNavigate(mappedPage as Page);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  const bookedDates = [1, 5, 9, 13, 14, 19, 21, 25];
  const highlightedDates = [3, 7, 11, 15, 17, 23, 27];

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleCancelBooking = (campaignId: number) => {
    setSelectedCampaignId(campaignId);
    setShowBookingDetails(false);
    setShowCancelDialog(true);
  };

  const handleConfirmCancellation = (notifyMembers: boolean, notifyAdminOnly: boolean) => {
    if (selectedCampaignId) {
      toast.success('Campaign booking cancelled successfully');
      if (notifyMembers) {
        toast.info('Campaign members have been notified');
      }
      if (notifyAdminOnly) {
        toast.info('Campaign admin has been notified');
      }
    }
  };

  const handleCreateOption = (optionId: string) => {
    switch (optionId) {
      case 'campaign':
        setShowCreateDialog(false);
        setShowCreateCampaignDialog(true);
        break;
      case 'voucher':
        setShowCreateVoucherDialog(true);
        break;
      case 'service':
        setShowCreateServiceDialog(true);
        break;
      case 'user':
        toast.info('User creation coming soon!');
        break;
    }
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
      <VendorSidebar currentPage={activePage} onNavigate={onNavigate} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
              />
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowCreateDialog(true)}
                className="px-6 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors"
              >
                Create
              </button>
              <button 
                onClick={() => setShowBookingDetails(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-[24px] mb-1">Welcome, {vendorProfile.name}</h1>
            <p className="text-[14px] text-gray-500">This is your overview of {vendorProfile.businessName}</p>
          </div>

          {/* Main Grid */}
          <div className="flex gap-5">
            {/* Left Column - Campaigns and Vouchers */}
            <div className="w-[60%] space-y-5">
              {/* Campaigns Overview */}
              <div className="bg-white rounded-lg p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[16px]">Campaigns Overview</h2>
                  <button className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-gray-900">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    Sort by
                  </button>
                </div>

                <div className="space-y-3.5">
                  {campaigns.map((campaign) => {
                    const percentage = (campaign.saved / campaign.goal) * 100;
                    return (
                      <div key={campaign.id} className="flex items-center gap-3.5">
                        <ImageWithFallback
                          src={campaign.image}
                          alt={campaign.name}
                          className="w-20 h-14 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-[14px] mb-1">{campaign.name}</h3>
                          <p className="text-[13px] text-gray-600 mb-1.5">
                            Goal R{campaign.goal.toLocaleString()} - Saved R{campaign.saved.toLocaleString()}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-[#8363f2] h-1.5 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-[12px] text-gray-600 mt-1">{Math.round(percentage)}%</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Claimed Vouchers */}
              <div className="bg-white rounded-lg p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[16px]">Claimed Vouchers</h2>
                  <button className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-gray-900">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    Sort by
                  </button>
                </div>

                <div className="space-y-3">
                  {vouchers.map((voucher) => (
                    <div key={voucher.id} className="flex items-center gap-3.5">
                      <ImageWithFallback
                        src={voucher.image}
                        alt={voucher.title}
                        className="w-14 h-11 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-[14px] mb-0.5">{voucher.title}</h3>
                        <p className="text-[12px] text-gray-600">
                          {voucher.date} | Claimed by {voucher.claimedBy}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Revenue and Calendar */}
            <div className="flex-1 space-y-5">
              {/* Monthly Revenue */}
              <div className="bg-white rounded-lg p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-[16px] mb-1">Monthly revenue</h2>
                    <p className="text-[20px] text-[#8363f2]">Total = R12 563.00</p>
                    <p className="text-[12px] text-gray-500">30 000</p>
                  </div>
                  <button className="text-[13px] text-gray-600 hover:text-gray-900">Filter by</button>
                </div>

                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#8363f2" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Booking Calendar */}
              <div className="bg-white rounded-lg p-5 border border-gray-200">
                <h2 className="text-[16px] mb-3">Booking Calendar</h2>

                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-3">
                  <button onClick={previousMonth} className="p-1 hover:bg-gray-100 rounded">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[13px]">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1.5 mb-3">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} className="text-center text-[11px] text-gray-500">
                      {day}
                    </div>
                  ))}

                  {Array.from({ length: firstDay }, (_, i) => (
                    <div key={`empty-${i}`} />
                  ))}

                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const isBooked = bookedDates.includes(day);
                    const isHighlighted = highlightedDates.includes(day);

                    return (
                      <div
                        key={day}
                        className={`text-center text-[11px] py-1.5 rounded ${
                          isBooked
                            ? 'bg-[#8363f2] text-white'
                            : isHighlighted
                            ? 'bg-orange-400 text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>

                {/* Stats */}
                <div className="space-y-1.5">
                  <p className="text-[13px]">Total Booking : 42</p>
                  <p className="text-[13px]">Total revenue : R12 580.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <BookingDetailsDialog
        open={showBookingDetails}
        onOpenChange={setShowBookingDetails}
        onCancelBooking={handleCancelBooking}
      />
      
      <CampaignCancellationDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        onConfirm={handleConfirmCancellation}
      />
      
      <CreateOptionsDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSelectOption={handleCreateOption}
      />
      
      <CreateVoucherDialog
        open={showCreateVoucherDialog}
        onOpenChange={setShowCreateVoucherDialog}
      />
      
      <CreateServiceDialog
        open={showCreateServiceDialog}
        onOpenChange={setShowCreateServiceDialog}
      />
      
      <CreateCampaignDialog
        open={showCreateCampaignDialog}
        onOpenChange={setShowCreateCampaignDialog}
      />
      
      <Toaster />
    </div>
  );
}