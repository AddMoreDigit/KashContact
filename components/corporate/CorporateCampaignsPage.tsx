import { useState } from 'react';
import { Search, Calendar, Users, MapPin, Bell, ShoppingCart, User as UserIcon } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CorporateSidebar } from './CorporateSidebar';
import { NavBar } from '../layout/NavBar';
import { toast } from 'sonner';
import { Toaster } from '../ui/sonner';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'approveBookingRequest' | 'editBooking' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable';

interface CorporateCampaignsPageProps {
  onNavigate: (page: Page) => void;
}

const campaigns = [
  {
    id: 1,
    title: 'Swiss Adventure',
    image: 'https://images.unsplash.com/photo-1607552351758-c39d62acb258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMG1vdW50YWlucyUyMGxha2UlMjB0ZW50fGVufDF8fHx8MTc2MzA5MDQ1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Active',
    progress: 70,
    goal: 825000,
    contributed: 577500,
    vendors: ['Blue Hotel', 'Best\'s Dining', 'Sky Games'],
    impactMonths: 3,
    impactBeneficiaries: 6,
    beneficiaries: 150,
    duration: '3 Months',
    timeline: 'Nov 15, 2025-Feb 10, 2025'
  },
  {
    id: 2,
    title: 'Cape Town Trip',
    image: 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb218ZW58MXx8fHwxNzYzMDU1OTA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Active',
    progress: 70,
    goal: 825000,
    contributed: 577500,
    vendors: ['Blue Hotel', 'Best\'s Dining', 'Sky Games'],
    impactMonths: 3,
    impactBeneficiaries: 0,
    beneficiaries: 150,
    duration: '3 Months',
    timeline: 'Nov 15, 2025-Feb 10, 2025'
  },
  {
    id: 3,
    title: 'Durban South Coast',
    image: 'https://images.unsplash.com/photo-1549109783-6be1845ed596?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBwb29sJTIwcGFsbSUyMHRyZWVzfGVufDF8fHx8MTc2MzA5MDQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Active',
    progress: 70,
    goal: 825000,
    contributed: 577500,
    vendors: ['Blue Hotel', 'Best\'s Dining', 'Sky Games'],
    impactMonths: 3,
    impactBeneficiaries: 9,
    beneficiaries: 150,
    duration: '3 Months',
    timeline: 'Nov 15, 2025-Feb 10, 2025'
  }
];

export function CorporateCampaignsPage({ onNavigate }: CorporateCampaignsPageProps) {
  const [activePage, setActivePage] = useState<string>('campaigns');
  const [selectedFilter, setSelectedFilter] = useState<string>('Active Campaigns');
  const [searchQuery, setSearchQuery] = useState('');

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

        {/* Campaigns Content */}
        <div className="p-8">
          {/* Filter Bar */}
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-[18px] font-semibold text-black">Active Campaigns</h1>
            
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Members</option>
              <option>Active Campaigns</option>
              <option>Completed</option>
            </select>

            <select className="px-4 py-2 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Date Range</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>

            <select className="px-4 py-2 text-[14px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Category</option>
              <option>Team Building</option>
              <option>Conference</option>
            </select>
          </div>

          {/* Campaign Cards Grid */}
          <div className="grid grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Campaign Image */}
                <div className="relative h-40">
                  <ImageWithFallback
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                    </svg>
                  </div>
                </div>

                {/* Campaign Info */}
                <div className="p-4">
                  {/* Title and Status */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-[16px] font-semibold text-black">{campaign.title}</h3>
                    <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-medium">
                      {campaign.status}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] text-gray-600">
                        R{(campaign.contributed / 1000).toFixed(0)} 000/ R{(campaign.goal / 1000).toFixed(0)} 000
                      </span>
                      <span className="text-[12px] font-medium text-black">{campaign.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-green-500 h-1.5 rounded-full"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Vendors Involved */}
                  <div className="mb-4">
                    <div className="text-[12px] font-medium text-gray-900 mb-2">Vendors Involved</div>
                    <div className="space-y-1">
                      {campaign.vendors.map((vendor, index) => (
                        <div key={index} className="text-[11px] text-gray-600">{vendor}</div>
                      ))}
                    </div>
                  </div>

                  {/* Details and Impact */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-[12px] font-medium text-gray-900 mb-2">Details</div>
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        <span className="text-[11px] text-gray-600">{campaign.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-gray-500" />
                        <span className="text-[11px] text-gray-600">{campaign.beneficiaries}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[12px] font-medium text-gray-900 mb-2">Impact</div>
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        <span className="text-[11px] text-gray-600">{campaign.impactMonths}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-gray-500" />
                        <span className="text-[11px] text-gray-600">{campaign.impactBeneficiaries}</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mb-4">
                    <div className="text-[12px] font-medium text-gray-900 mb-2">Timeline</div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      <span className="text-[11px] text-gray-600">{campaign.timeline}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleNavigation('corporateCampaignDetail')}
                      className="flex-1 py-2 text-[12px] text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleNavigation('corporateCampaignDetail')}
                      className="flex-1 py-2 text-[12px] bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Edit Campaign
                    </button>
                  </div>
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
