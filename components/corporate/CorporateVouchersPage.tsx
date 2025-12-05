import { useState } from 'react';
import { Plus, Search, Gift, Calendar, Users } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CorporateSidebar } from './CorporateSidebar';
import { NavBar } from '../layout/NavBar';
import { toast } from 'sonner';
import { Toaster } from '../ui/sonner';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'approveBookingRequest' | 'editBooking' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable';

interface CorporateVouchersPageProps {
  onNavigate: (page: Page) => void;
}

interface Voucher {
  id: number;
  title: string;
  discount: string;
  validUntil: string;
  usedBy: string[];
  totalClaims: number;
  maxClaims: number;
  status: 'active' | 'expired';
  image: string;
  category: string;
}

export function CorporateVouchersPage({ onNavigate }: CorporateVouchersPageProps) {
  const [activePage, setActivePage] = useState<string>('vouchers');
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigation = (page: Page) => {
    setActivePage(page === 'corporateVouchers' ? 'vouchers' : page);
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

  const [vouchers] = useState<Voucher[]>([
    {
      id: 1,
      title: '10% Off Accommodation',
      discount: '10%',
      validUntil: 'Dec 31, 2025',
      usedBy: ['Michael', 'Sarah Johnson', 'David Williams'],
      totalClaims: 3,
      maxClaims: 50,
      status: 'active',
      category: 'Accommodation',
      image: 'https://images.unsplash.com/photo-1657687380097-88a4a3570bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGFjY29tbW9kYXRpb258ZW58MXx8fHwxNzYyOTU2OTI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: '5% Off Food & Dining',
      discount: '5%',
      validUntil: 'Dec 31, 2025',
      usedBy: ['Emma Davis', 'Michael'],
      totalClaims: 2,
      maxClaims: 50,
      status: 'active',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjI5NTExOTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'R500 Off Transport',
      discount: 'R500',
      validUntil: 'Nov 30, 2025',
      usedBy: ['Sarah Johnson'],
      totalClaims: 1,
      maxClaims: 30,
      status: 'active',
      category: 'Transport',
      image: 'https://images.unsplash.com/photo-1662386752917-2c63f23ac578?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc3BvcnQlMjB2ZWhpY2xlfGVufDF8fHx8MTc2MzA1NjkxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 4,
      title: '15% Off Activities',
      discount: '15%',
      validUntil: 'Dec 31, 2025',
      usedBy: ['David Williams', 'Emma Davis', 'Michael', 'Sarah Johnson'],
      totalClaims: 4,
      maxClaims: 50,
      status: 'active',
      category: 'Activities',
      image: 'https://images.unsplash.com/photo-1600523314258-0892ccaaef1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpdml0aWVzJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2Mjk1MjY3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 5,
      title: 'R1000 Off Cape Town Tour',
      discount: 'R1000',
      validUntil: 'Jan 15, 2026',
      usedBy: ['Michael', 'Emma Davis'],
      totalClaims: 2,
      maxClaims: 25,
      status: 'active',
      category: 'Tours',
      image: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    },
    {
      id: 6,
      title: '20% Off Safari Experience',
      discount: '20%',
      validUntil: 'Mar 31, 2026',
      usedBy: ['Sarah Johnson', 'David Williams', 'Emma Davis'],
      totalClaims: 3,
      maxClaims: 20,
      status: 'active',
      category: 'Activities',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    },
  ]);

  const filteredVouchers = vouchers.filter(voucher =>
    voucher.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateVoucher = () => {
    toast.info('Create voucher functionality coming soon');
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
        {/* NavBar */}
        <NavBar 
          onNavigate={handleNavigation}
          userType="corporate"
        />
        
        <div className="p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[32px] text-gray-900 mb-2">Vouchers</h1>
              <p className="text-[16px] text-gray-600">Manage and track your campaign vouchers</p>
            </div>
            <button
              onClick={handleCreateVoucher}
              className="flex items-center gap-2 px-6 py-3 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Voucher
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search vouchers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Gift className="w-6 h-6 text-[#8363f2]" />
                </div>
              </div>
              <p className="text-[14px] text-gray-600 mb-1">Total Vouchers</p>
              <p className="text-[28px] text-gray-900">{vouchers.length}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-[14px] text-gray-600 mb-1">Active Vouchers</p>
              <p className="text-[28px] text-gray-900">{vouchers.filter(v => v.status === 'active').length}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-[14px] text-gray-600 mb-1">Total Claims</p>
              <p className="text-[28px] text-gray-900">{vouchers.reduce((sum, v) => sum + v.totalClaims, 0)}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-[14px] text-gray-600 mb-1">Expiring Soon</p>
              <p className="text-[28px] text-gray-900">0</p>
            </div>
          </div>

          {/* Vouchers Grid */}
          <div className="grid grid-cols-3 gap-6">
            {filteredVouchers.map((voucher) => (
              <div key={voucher.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Voucher Image */}
                <div className="relative h-48">
                  <ImageWithFallback
                    src={voucher.image}
                    alt={voucher.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-[12px] rounded-full">
                    {voucher.status === 'active' ? 'Active' : 'Expired'}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-[20px]">{voucher.discount}</p>
                  </div>
                </div>

                {/* Voucher Details */}
                <div className="p-5">
                  <h3 className="text-[18px] text-gray-900 mb-2">{voucher.title}</h3>
                  <p className="text-[14px] text-gray-600 mb-4">Category: {voucher.category}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <p className="text-[14px] text-gray-600">Valid until {voucher.validUntil}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-gray-500" />
                    <p className="text-[14px] text-gray-600">{voucher.totalClaims} / {voucher.maxClaims} claimed</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#8363f2] h-full rounded-full transition-all"
                        style={{ width: `${(voucher.totalClaims / voucher.maxClaims) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Used By */}
                  <div className="mb-4">
                    <p className="text-[12px] text-gray-500 mb-2">Used by:</p>
                    <div className="flex flex-wrap gap-1">
                      {voucher.usedBy.slice(0, 3).map((user, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-50 text-[#8363f2] text-[11px] rounded">
                          {user}
                        </span>
                      ))}
                      {voucher.usedBy.length > 3 && (
                        <span className="px-2 py-1 bg-purple-50 text-[#8363f2] text-[11px] rounded">
                          +{voucher.usedBy.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="w-full py-2 border border-[#8363f2] text-[#8363f2] rounded-lg hover:bg-purple-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
