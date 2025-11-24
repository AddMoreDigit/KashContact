import { useState, useEffect } from 'react';
import { Search, Bell, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';
import { Toaster } from '../ui/sonner';
import { CreateOptionsDialog } from './CreateOptionsDialog';
import { CreateServiceDialog } from './CreateServiceDialog';
import { CreateVoucherDialog } from './CreateVoucherDialog';
import { VendorSidebar } from './VendorSidebar';
import { getAllCampaigns, type Campaign } from '../../utils/campaignStorage';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'approveBookingRequest' | 'editBooking' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable' | 'vendorCampaignDetail';

interface VendorCampaignsPageProps {
  onNavigate: (page: Page) => void;
  onSelectCampaign?: (campaign: Campaign) => void;
}

export function VendorCampaignsPage({ onNavigate, onSelectCampaign }: VendorCampaignsPageProps) {
  const [activePage, setActivePage] = useState<string>('campaigns');
  const [showCreateServiceDialog, setShowCreateServiceDialog] = useState(false);
  const [showCreateOptionsDialog, setShowCreateOptionsDialog] = useState(false);
  const [showCreateVoucherDialog, setShowCreateVoucherDialog] = useState(false);
  const [campaignStatuses, setCampaignStatuses] = useState<{[key: string]: string}>({});
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const storedCampaigns = getAllCampaigns();
    setCampaigns(storedCampaigns);
    const initialStatuses: {[key: string]: string} = {};
    storedCampaigns.forEach(campaign => {
      initialStatuses[campaign.id] = campaign.status === 'pending' ? 'Pending Approval' : campaign.status === 'accepted' ? 'Accepted' : 'Declined';
    });
    setCampaignStatuses(initialStatuses);
  }, []);

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

  const handleCreateOption = (optionId: string) => {
    switch (optionId) {
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
  
  const handleAcceptCampaign = (campaignId: number, campaignName: string) => {
    setCampaignStatuses(prev => ({
      ...prev,
      [campaignId]: 'Accepted'
    }));
    toast.success(`Campaign "${campaignName}" accepted successfully!`);
  };
  
  const handleDeclineCampaign = (campaignId: number, campaignName: string) => {
    setCampaignStatuses(prev => ({
      ...prev,
      [campaignId]: 'Declined'
    }));
    toast.error(`Campaign "${campaignName}" declined.`);
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
                onClick={() => setShowCreateOptionsDialog(true)}
                className="px-6 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors"
              >
                Create
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Header with Title and Sort */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-2xl mb-1">Campaigns</h1>
                <p className="text-gray-500 text-sm">Here are your ongoing campaigns</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-sm">Sort by</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 gap-6">
            {campaigns.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <p className="text-gray-500">No campaigns available yet.</p>
                </div>
            ) : (
              campaigns.map((campaign) => {
                // Format dates
                const formattedDates = campaign.startDate && campaign.endDate 
                  ? `${new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(campaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                  : 'Dates not set';
                
                // Format services
                const servicesText = campaign.servicesBooked && campaign.servicesBooked.length > 0
                  ? campaign.servicesBooked.map(s => s.name).join(', ')
                  : 'No services';
                
                // Get member avatars (placeholder for now)
                const memberAvatars = campaign.members && campaign.members.length > 0
                  ? campaign.members.map(m => m.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100')
                  : ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'];
                
                return (
                  <div key={campaign.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Campaign Image */}
                    <div className="relative h-64">
                      <ImageWithFallback
                        src={campaign.image || 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=1080'}
                        alt={campaign.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Campaign Details */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl">{campaign.name}</h2>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          campaignStatuses[campaign.id] === 'Accepted' 
                            ? 'bg-green-100 text-green-700' 
                            : campaignStatuses[campaign.id] === 'Declined'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {campaignStatuses[campaign.id]}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-6 mb-6">
                        {/* Campaign Organizer */}
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Campaign Organizer</p>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-sm">👤</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{campaign.organizer}</p>
                              <p className="text-xs text-gray-500">{formattedDates}</p>
                            </div>
                          </div>
                        </div>

                        {/* Services Booked */}
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Services Booked</p>
                          <p className="text-sm font-medium">{servicesText}</p>
                        </div>

                        {/* Campaign Members */}
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Campaign Members</p>
                          <div className="flex -space-x-2">
                            {memberAvatars.slice(0, 4).map((avatar, idx) => (
                              <ImageWithFallback
                                key={idx}
                                src={avatar}
                                alt={`Member ${idx + 1}`}
                                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Total Campaign Value - Read Only */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-600">Total Campaign Value</p>
                          <p className="text-sm font-medium">R{campaign.totalAmount.toLocaleString()}.00</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${campaign.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 text-right">{campaign.progress}% funded</p>
                      </div>

                      {/* Action Buttons */}
                      <button 
                        onClick={() => {
                          onNavigate('vendorCampaignDetail' as Page);
                          if (onSelectCampaign) {
                            onSelectCampaign(campaign);
                          }
                        }}
                        className="w-full py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Create Service Dialog */}
      <CreateServiceDialog
        open={showCreateServiceDialog}
        onOpenChange={setShowCreateServiceDialog}
      />
      
      {/* Create Options Dialog */}
      <CreateOptionsDialog
        open={showCreateOptionsDialog}
        onOpenChange={setShowCreateOptionsDialog}
        onSelectOption={handleCreateOption}
      />
      
      {/* Create Voucher Dialog */}
      <CreateVoucherDialog
        open={showCreateVoucherDialog}
        onOpenChange={setShowCreateVoucherDialog}
      />
      
      <Toaster />
    </div>
  );
}