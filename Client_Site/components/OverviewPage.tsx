import { useState } from 'react';
import { Calendar, Filter, SlidersHorizontal } from 'lucide-react';
import { NavBar } from './NavBar';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'selectServices' | 'viewCampaignDetail';

interface Campaign {
  id: number;
  title: string;
  image: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  dateRange: string;
  goal: number;
  progress: number;
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

  // Transform created campaigns to Overview format
  const campaigns: Campaign[] = createdCampaigns.length > 0 
    ? createdCampaigns.map(c => {
        const goal = c.goal || 0;
        const contributed = c.contributed || 0;
        const progressPercent = goal > 0 ? Math.round((contributed / goal) * 100) : 0;
        let status: 'Active' | 'Completed' | 'Upcoming' = 'Active';
        
        if (progressPercent >= 100) {
          status = 'Completed';
        } else if (progressPercent === 0) {
          status = 'Upcoming';
        }
        
        return {
          id: c.id,
          title: c.title,
          image: c.image,
          status,
          dateRange: c.date,
          goal: goal,
          progress: progressPercent
        };
      })
    : [];

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
    // Find the full campaign data if available
    const fullCampaign = createdCampaigns.find(c => c.id === campaign.id);
    if (fullCampaign) {
      onSelectCampaign?.(fullCampaign);
      onNavigate('viewCampaign');
    }
  };

  const handleEditCampaign = (campaign: Campaign) => {
    // Find the full campaign data if available
    const fullCampaign = createdCampaigns.find(c => c.id === campaign.id);
    if (fullCampaign) {
      onSelectCampaign?.(fullCampaign);
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

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
            >
              {/* Campaign Image */}
              <div className="relative h-[200px] overflow-hidden">
                <ImageWithFallback
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
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
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8"
          >
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}