import { NavBar } from './NavBar';
import { Button } from './ui/button';
import { Search, ChevronDown, ChevronUp, Calendar, SlidersHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import svgPaths from '../imports/svg-v7bnpyv673';
import { getCampaignsForMember } from '../utils/campaignStorage';
import { storedToAppCampaign, generateMemberPerformance } from '../utils/campaignConverters';
import { getUserCampaignSummary } from '../utils/contributionStorage';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contribute' | 'campaignSchedule' | 'campaignsHistory' | 'viewCampaignDetail';

interface CampaignsPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  createdCampaigns?: Campaign[];
  onSelectCampaign?: (campaign: Campaign) => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
}

interface Campaign {
  id: number;
  title: string;
  image: string;
  provider: string;
  date: string;
  services: { name: string; type: string }[];
  members: { email: string; name?: string; avatar?: string }[];
  memberPerformance?: { email: string; name?: string; avatar?: string }[];
  goal: number;
  contributed: number;
  status: 'contribute' | 'manage';
}

export function CampaignsPage({ onNavigate, onShowNotifications, createdCampaigns = [], onSelectCampaign, hasUnreadNotifications, onShowCart }: CampaignsPageProps) {
  const [sortBy, setSortBy] = useState('recent');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const loadCampaigns = () => {
      // Get user email from profile
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const email = userProfile.email || 'user@example.com';
      setUserEmail(email);
      
      // Load campaigns from storage
      const storedCampaigns = getCampaignsForMember(email);
      
      // Convert to app format
      const appCampaigns = storedCampaigns.map(storedToAppCampaign);
      
      // Add member performance data
      const campaignsWithPerformance = appCampaigns.map(campaign => ({
        ...campaign,
        memberPerformance: generateMemberPerformance(campaign),
        // Store the original storage status for checking
        storageStatus: storedCampaigns.find(sc => `campaign-${campaign.id}` === sc.id)?.status
      }));
      
      setCampaigns(campaignsWithPerformance);
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

  const handleViewCampaign = (campaignId: number) => {
    onNavigate('viewCampaign');
  };

  const handleContribute = (campaignId: number) => {
    // Check if campaign is declined before allowing contribution
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign && (campaign as any).storageStatus === 'declined') {
      return; // Do nothing if campaign is declined
    }
    onNavigate('contribute');
  };

  const handleManage = (campaignId: number) => {
    onNavigate('manageCampaign');
  };

  const getProgressPercentage = (contributed: number, goal: number) => {
    return Math.round((contributed / goal) * 100);
  };

  return (
    <div className="flex-1 bg-white">
      <NavBar 
        onNavigate={onNavigate} 
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
      />
      
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-gray-900 mb-1">Campaigns</h1>
            <p className="text-gray-600 text-sm">Here are your ongoing campaigns</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Calendar Button */}
            <Button
              variant="outline"
              className="border-purple-600 text-black hover:bg-gray-50"
              onClick={() => onNavigate('campaignSchedule')}
            >
              <Calendar className="mr-2 h-5 w-5" />
            </Button>

            {/* History Button */}
            <Button
              variant="outline"
              className="border-purple-600 text-black hover:bg-gray-50"
              onClick={() => onNavigate('campaignsHistory')}
            >
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              History
            </Button>

            {/* Sort By */}
            <Button
              variant="outline"
              className="border-purple-600 text-black hover:bg-gray-50"
            >
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              Sort by
            </Button>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="px-8 py-6">
        <div className="space-y-6">
          {campaigns.map((campaign) => {
            const progressPercentage = getProgressPercentage(campaign.contributed, campaign.goal);
            const storageStatus = (campaign as any).storageStatus;
            const isDeclined = storageStatus === 'declined';
            const isPending = storageStatus === 'pending';
            
            // Get user's contribution summary for this campaign
            const campaignId = `campaign-${campaign.id}`;
            const userContribution = getUserCampaignSummary(campaignId, userEmail);
            const contributionPercentage = campaign.goal > 0 ? Math.round((userContribution.totalContributed / campaign.goal) * 100) : 0;
            
            return (
              <div
                key={campaign.id}
                className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative ${
                  isDeclined ? 'opacity-60' : ''
                }`}
              >
                {/* Status Badge for Pending/Declined */}
                {(isPending || isDeclined) && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      isDeclined 
                        ? 'bg-red-100 text-red-700 border border-red-300' 
                        : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                    }`}>
                      {isDeclined ? 'Declined' : 'Pending Approval'}
                    </span>
                  </div>
                )}
                
                {/* Campaign Image */}
                <div className="relative h-64">
                  <ImageWithFallback
                    src={campaign.image}
                    alt={campaign.title}
                    className={`w-full h-full object-cover ${isDeclined ? 'grayscale' : ''}`}
                  />
                  {/* Contribute/Manage Button - Hide for declined */}
                  {!isDeclined && (
                    <div className="absolute top-4 right-8">
                      {campaign.status === 'contribute' ? (
                        <Button
                          onClick={() => {
                            onSelectCampaign?.(campaign);
                            handleContribute(campaign.id);
                          }}
                          className="bg-[#2d1b69] hover:bg-[#2d1b69]/90 text-white px-6 py-3 h-auto"
                        >
                          Contribute
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            onSelectCampaign?.(campaign);
                            handleManage(campaign.id);
                          }}
                          className="bg-[#2d1b69] hover:bg-[#2d1b69]/90 text-white px-6 py-3 h-auto"
                        >
                          Manage
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {/* Campaign Details */}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-gray-900 mb-2">{campaign.title}</h2>
                  <p className="text-gray-900 mb-6">Service Provider</p>

                  {/* Provider and Services */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex gap-16">
                      {/* Provider Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {/* Building Icon */}
                          <div className="w-6 h-6 relative">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                              <path d={svgPaths.p9b08d00} fill="#2D1B69" />
                            </svg>
                          </div>
                          <span className="text-gray-900">{campaign.provider}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-8">
                          {/* Calendar Icon */}
                          <div className="w-3.5 h-3 relative">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 11">
                              <path d={svgPaths.p335c8380} fill="#8363F2" />
                            </svg>
                          </div>
                          <span className="text-gray-900 text-sm">{campaign.date}</span>
                        </div>
                      </div>

                      {/* Additional Services */}
                      <div>
                        {campaign.services.map((service, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {/* Food Icon */}
                            <div className="w-6 h-6 relative">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                                <path d={svgPaths.p3c999bf0} fill="#2D1B69" />
                              </svg>
                            </div>
                            <span className="text-gray-900">{service.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Campaign Members */}
                    <div>
                      <p className="text-gray-900 mb-3">Campaign Members</p>
                      <div className="flex gap-2">
                        {(campaign.memberPerformance || campaign.members).slice(0, 4).map((member, index) => (
                          <div 
                            key={index} 
                            className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center text-white"
                          >
                            {member.avatar ? (
                              <img src={member.avatar} alt={member.name || member.email} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-purple-500 flex items-center justify-center">
                                {member.email.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        ))}
                        {(campaign.memberPerformance || campaign.members).length > 4 && (
                          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-sm">
                            +{(campaign.memberPerformance || campaign.members).length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-300 mb-6" />

                  {/* Goal and Progress */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-8">
                        <span className="text-gray-900">
                          <span className="text-gray-600">Goal</span>-R{campaign.goal.toLocaleString()}.00
                        </span>
                        <span className="text-gray-900">
                          Contributed -R{campaign.contributed.toLocaleString()}.00
                        </span>
                      </div>
                      <span className="text-[#2d1b69]">{progressPercentage}%</span>
                    </div>
                    <div className="relative">
                      <div className="w-full h-5 bg-gray-300 rounded-lg overflow-hidden">
                        <div 
                          className={`h-full rounded-lg ${campaign.status === 'contribute' ? 'bg-[#8363f2]' : 'bg-[#f8b02a]'}`}
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* User Contribution */}
                  {userContribution.contributionCount > 0 && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-900 font-medium">My Contribution</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">
                            {userContribution.contributionCount} {userContribution.contributionCount === 1 ? 'payment' : 'payments'}
                          </span>
                          <span className="text-[#2d1b69] font-semibold">
                            R{userContribution.totalContributed.toLocaleString()}.00
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#8363f2] to-[#a78bfa] rounded-full"
                            style={{ width: `${contributionPercentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">
                          {contributionPercentage}% of goal
                        </span>
                        {userContribution.lastContributionDate && (
                          <span className="text-xs text-gray-500">
                            Last: {new Date(userContribution.lastContributionDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* View or Manage Button */}
                  <div className="flex gap-2">
                    {campaign.status === 'manage' ? (
                      <>
                        <Button
                          onClick={() => {
                            onSelectCampaign?.(campaign);
                            onNavigate('viewCampaignDetail');
                          }}
                          className="flex-1 bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                        >
                          View Campaign
                        </Button>
                        <Button
                          onClick={() => {
                            onSelectCampaign?.(campaign);
                            onNavigate('manageCampaign');
                          }}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          Manage
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          onSelectCampaign?.(campaign);
                          onNavigate('contribute');
                        }}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Contribute
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}