import { useState, useEffect } from 'react';
import { Calendar, Filter, SlidersHorizontal } from 'lucide-react';
import { NavBar } from './layout/NavBar';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getCampaignsForMember, Campaign as StoredCampaign } from '../utils/campaignStorage';
import { getCampaignTotalContributed } from '../utils/contributionStorage';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'selectServices' | 'viewCampaignDetail';

interface Campaign {
  id: string;
  title: string;
  image: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  dateRange: string;
  goal: number;
  progress: number;
  storageStatus?: string;
}

interface OverviewPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  createdCampaigns?: any[];
  onSelectCampaign?: (campaign: any) => void;
  onShowCart?: () => void;
}

export function OverviewPage({ 
  onNavigate, 
  onShowNotifications,
  hasUnreadNotifications,
  createdCampaigns = [],
  onSelectCampaign,
  onShowCart
}: OverviewPageProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [showSortBy, setShowSortBy] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [storedCampaigns, setStoredCampaigns] = useState<StoredCampaign[]>([]);

  useEffect(() => {
    const loadCampaigns = () => {
      // Get user email from profile
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const userEmail = userProfile.email || 'user@example.com';
      
      // Get all campaigns where user is a member or organizer
      const userCampaigns = getCampaignsForMember(userEmail);
      
      // Store the full campaigns for later use
      setStoredCampaigns(userCampaigns);
      
      // Transform campaigns to UI format
      const transformedCampaigns: Campaign[] = userCampaigns.map(storedCampaign => {
        const goal = storedCampaign.totalAmount || 0;
        
        // Get contributed amount from contributionStorage
        const contributed = getCampaignTotalContributed(storedCampaign.id) || storedCampaign.currentAmount || 0;
        
        const progressPercent = goal > 0 ? Math.round((contributed / goal) * 100) : 0;
        
        // Determine status based on approval status and dates
        let status: 'Active' | 'Completed' | 'Upcoming' = 'Upcoming';
        
        const now = new Date();
        const startDate = new Date(storedCampaign.startDate);
        const endDate = new Date(storedCampaign.endDate);
        
        // If pending approval, it's Upcoming
        if (storedCampaign.status === 'pending') {
          status = 'Upcoming';
        } 
        // If approved
        else if (storedCampaign.status === 'accepted') {
          // Check if campaign has ended or reached 100%
          if (progressPercent >= 100 || now > endDate) {
            status = 'Completed';
          } else {
            status = 'Active';
          }
        }
        // If declined, treat as completed (ended)
        else if (storedCampaign.status === 'declined') {
          status = 'Completed';
        }
        
        // Format date range
        const dateRange = `${new Date(storedCampaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(storedCampaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
        
        return {
          id: storedCampaign.id,
          title: storedCampaign.name,
          image: storedCampaign.image || storedCampaign.servicesBooked[0]?.image || '',
          status,
          dateRange,
          goal,
          progress: progressPercent,
          storageStatus: storedCampaign.status
        };
      });
      
      setCampaigns(transformedCampaigns);
    };

    // Load campaigns initially
    loadCampaigns();

    // Listen for storage changes (when campaigns are added/updated)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'campaigns_data') {
        loadCampaigns();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom event for same-window updates
    const handleCampaignUpdate = () => {
      loadCampaigns();
    };

    window.addEventListener('campaignsUpdated', handleCampaignUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('campaignsUpdated', handleCampaignUpdate);
    };
  }, []);

  // Separate campaigns into present (Active/Upcoming) and past (Completed)
  const presentCampaigns = campaigns.filter(c => c.status === 'Active' || c.status === 'Upcoming');
  const pastCampaigns = campaigns.filter(c => c.status === 'Completed');

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-[#e8f5e9] text-[#4caf50]';
      case 'Completed':
        return 'bg-[#f3e5f5] text-[#9c27b0]';
      case 'Upcoming':
        return 'bg-[#ffebee] text-[#f44336]';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleViewCampaign = (campaign: Campaign) => {
    // Find the full campaign data from localStorage
    const fullCampaign = storedCampaigns.find(c => c.id === campaign.id);
    if (fullCampaign) {
      // Get actual contributions from storage
      const actualContributed = getCampaignTotalContributed(fullCampaign.id) || fullCampaign.currentAmount || 0;
      
      // Transform the campaign to match the expected format for ViewCampaignPage
      const transformedCampaign = {
        id: parseInt(fullCampaign.id.replace('campaign-', '')),
        title: fullCampaign.name,
        image: fullCampaign.image || fullCampaign.servicesBooked[0]?.image || '',
        provider: fullCampaign.servicesBooked[0]?.provider || '',
        date: `${new Date(fullCampaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} â†’ ${new Date(fullCampaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
        startDate: fullCampaign.startDate,
        endDate: fullCampaign.endDate,
        services: fullCampaign.servicesBooked.map(service => ({
          name: service.name,
          type: service.type
        })),
        members: fullCampaign.members.map(member => ({
          email: member.email,
          name: member.name,
          avatar: member.avatar,
          contributionPercentage: 0,
          contributedAmount: 0,
          status: 'pending' as const
        })),
        memberPerformance: fullCampaign.members.map(member => ({
          email: member.email,
          name: member.name,
          avatar: member.avatar,
          contributionPercentage: 0,
          contributedAmount: 0,
          goalAmount: fullCampaign.totalAmount / fullCampaign.members.length,
          status: 'pending' as const
        })),
        goal: fullCampaign.totalAmount,
        contributed: actualContributed,
        status: 'manage' as const,
        category: fullCampaign.category,
        contributionFrequency: fullCampaign.contributionFrequency,
        cartItems: fullCampaign.servicesBooked.map(service => ({
          id: service.id,
          type: service.type,
          name: service.name,
          price: `R${service.cost}`,
          provider: service.provider,
          image: service.image,
          totalPrice: service.cost
        }))
      };
      onSelectCampaign?.(transformedCampaign);
      onNavigate('viewCampaign');
    }
  };

  const handleEditCampaign = (campaign: Campaign) => {
    // Find the full campaign data from localStorage
    const fullCampaign = storedCampaigns.find(c => c.id === campaign.id);
    if (fullCampaign) {
      // Check if campaign is declined before allowing edit
      if (fullCampaign.status === 'declined') {
        return; // Do nothing if campaign is declined
      }
      
      // Get actual contributions from storage
      const actualContributed = getCampaignTotalContributed(fullCampaign.id) || fullCampaign.currentAmount || 0;
      
      // Transform the campaign to match the expected format for ManageCampaignPage
      const transformedCampaign = {
        id: parseInt(fullCampaign.id.replace('campaign-', '')),
        title: fullCampaign.name,
        image: fullCampaign.image || fullCampaign.servicesBooked[0]?.image || '',
        provider: fullCampaign.servicesBooked[0]?.provider || '',
        date: `${new Date(fullCampaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} â†’ ${new Date(fullCampaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
        startDate: fullCampaign.startDate,
        endDate: fullCampaign.endDate,
        services: fullCampaign.servicesBooked.map(service => ({
          name: service.name,
          type: service.type
        })),
        members: fullCampaign.members.map(member => ({
          email: member.email,
          name: member.name,
          avatar: member.avatar,
          contributionPercentage: 0,
          contributedAmount: 0,
          status: 'pending' as const
        })),
        memberPerformance: fullCampaign.members.map(member => ({
          email: member.email,
          name: member.name,
          avatar: member.avatar,
          contributionPercentage: 0,
          contributedAmount: 0,
          goalAmount: fullCampaign.totalAmount / fullCampaign.members.length,
          status: 'pending' as const
        })),
        goal: fullCampaign.totalAmount,
        contributed: actualContributed,
        status: 'manage' as const,
        category: fullCampaign.category,
        contributionFrequency: fullCampaign.contributionFrequency,
        cartItems: fullCampaign.servicesBooked.map(service => ({
          id: service.id,
          type: service.type,
          name: service.name,
          price: `R${service.cost}`,
          provider: service.provider,
          image: service.image,
          totalPrice: service.cost
        }))
      };
      onSelectCampaign?.(transformedCampaign);
      onNavigate('manageCampaign');
    }
  };

  return (
    <div className="flex-1 bg-white">
      <NavBar 
        onNavigate={onNavigate} 
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
      />
      
      <div className="p-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-gray-900">Overview</h1>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>

            <Button
              onClick={() => setShowSortBy(!showSortBy)}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Sort by
            </Button>
          </div>
        </div>

        {/* Present Campaigns Section */}
        {presentCampaigns.length > 0 && (
          <>
            <h2 className="text-gray-900 text-xl mb-6">Present Campaigns</h2>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {presentCampaigns.map((campaign) => {
                const isDeclined = campaign.storageStatus === 'declined';
                const isPending = campaign.storageStatus === 'pending';
                
                return (
                  <div
                    key={campaign.id}
                    className={`bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm ${
                      isDeclined ? 'opacity-60' : ''
                    }`}
                  >
                    {/* Campaign Image */}
                    <div className="relative h-[200px] overflow-hidden">
                      <ImageWithFallback
                        src={campaign.image}
                        alt={campaign.title}
                        className={`w-full h-full object-cover ${isDeclined ? 'grayscale' : ''}`}
                      />
                      
                      {/* Status Badge */}
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded text-sm ${getStatusStyles(campaign.status)}`}>
                        {campaign.status}
                      </div>
                    </div>

                    {/* Campaign Details */}
                    <div className="p-6">
                      {/* Title */}
                      <h3 className="text-gray-900 mb-4">
                        {campaign.title}
                      </h3>

                      {/* Date Range */}
                      <div className="flex items-center gap-2 mb-4 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{campaign.dateRange}</span>
                      </div>

                      {/* Goal and Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2 text-sm">
                          <span className="text-gray-600">Goal R{campaign.goal.toLocaleString()}</span>
                          <span className="text-gray-900">{campaign.progress}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              campaign.status === 'Completed' || campaign.status === 'Active'
                                ? 'bg-green-500' 
                                : 'bg-gray-300'
                            }`}
                            style={{ width: `${campaign.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleViewCampaign(campaign)}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => handleEditCampaign(campaign)}
                          variant="outline"
                          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                          disabled={isDeclined}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Past Campaigns Section */}
        {pastCampaigns.length > 0 && (
          <>
            <h2 className="text-gray-900 text-xl mb-6 mt-12">Past Campaigns</h2>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {pastCampaigns.map((campaign) => {
                const isDeclined = campaign.storageStatus === 'declined';
                
                return (
                  <div
                    key={campaign.id}
                    className={`bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm ${
                      isDeclined ? 'opacity-60' : ''
                    }`}
                  >
                    {/* Campaign Image */}
                    <div className="relative h-[200px] overflow-hidden">
                      <ImageWithFallback
                        src={campaign.image}
                        alt={campaign.title}
                        className={`w-full h-full object-cover ${isDeclined ? 'grayscale' : ''}`}
                      />
                      
                      {/* Status Badge */}
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded text-sm ${getStatusStyles(campaign.status)}`}>
                        {campaign.status}
                      </div>
                    </div>

                    {/* Campaign Details */}
                    <div className="p-6">
                      {/* Title */}
                      <h3 className="text-gray-900 mb-4">
                        {campaign.title}
                      </h3>

                      {/* Date Range */}
                      <div className="flex items-center gap-2 mb-4 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{campaign.dateRange}</span>
                      </div>

                      {/* Goal and Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2 text-sm">
                          <span className="text-gray-600">Goal R{campaign.goal.toLocaleString()}</span>
                          <span className="text-gray-900">{campaign.progress}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              campaign.status === 'Completed' || campaign.status === 'Active'
                                ? 'bg-green-500' 
                                : 'bg-gray-300'
                            }`}
                            style={{ width: `${campaign.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleViewCampaign(campaign)}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => handleEditCampaign(campaign)}
                          variant="outline"
                          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                          disabled={isDeclined}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Empty State */}
        {campaigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No campaigns found</p>
            <Button
              onClick={() => onNavigate('createCampaign')}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Create Your First Campaign
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {campaigns.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
