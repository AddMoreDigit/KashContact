import { Search, Bell, ShoppingCart, User, SlidersHorizontal, Calendar, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { NavBar } from '../../components/layout';
import { useState, useEffect } from 'react';
import { getCampaignsCreatedByUser } from '../../utils/campaignStorage';
//import type { Campaign as StorageCampaign } from '../../utils/campaignStorage';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'selectServices';

interface Campaign {
  id: number;
  title: string;
  image: string;
  provider: string;
  date: string;
  services: { name: string; type: string }[];
  members: { email: string }[];
  goal: number;
  contributed: number;
  status: 'contribute' | 'manage';
  category?: string;
  startDate: string;
  endDate: string;
  contributionFrequency?: string;
  cartItems?: any[];
}

interface GroupCampaignPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
  createdCampaigns?: Campaign[];
  onSelectCampaign?: (campaign: Campaign) => void;
}

export function GroupCampaignPage({ onNavigate, onShowNotifications, hasUnreadNotifications = false, onShowCart, createdCampaigns = [], onSelectCampaign }: GroupCampaignPageProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Load campaigns from storage
  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const userEmail = userProfile.email || '';
    
    // Get campaigns created by user (group campaigns are ones they organize)
    const storageCampaigns = getCampaignsCreatedByUser(userEmail);
    
    // Convert storage campaigns to display format
    const convertedCampaigns: Campaign[] = storageCampaigns.map(sc => ({
      id: parseInt(sc.id.replace('campaign-', '')) || Date.now(),
      title: sc.name,
      image: sc.image || '',
      provider: sc.servicesBooked[0]?.provider || 'Service Provider',
      date: `${sc.startDate} â†’ ${sc.endDate}`,
      services: sc.servicesBooked.map(s => ({
        name: s.provider,
        type: s.name
      })),
      members: sc.members.map(m => ({ email: m.email })),
      goal: sc.totalAmount,
      contributed: sc.currentAmount,
      status: 'manage' as const,
      category: sc.category,
      startDate: sc.startDate,
      endDate: sc.endDate,
      contributionFrequency: sc.contributionFrequency,
      cartItems: []
    }));
    
    setCampaigns(convertedCampaigns);
  }, []);

  // Filter for group campaigns (campaigns with status 'manage')
  const groupCampaigns = campaigns.filter(c => c.status === 'manage');

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <NavBar 
        onNavigate={onNavigate}
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
      />

      {/* Main Content */}
      <div className="p-8">
        {/* Title and Filters */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-gray-900">Group campaign</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-gray-300">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300">
              Sort by
            </Button>
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {groupCampaigns.map((campaign, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200">
              {/* Campaign Image */}
              <div className="relative h-40">
                <ImageWithFallback
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${campaign.status === 'manage' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {campaign.status === 'manage' ? 'Active' : 'Upcoming'}
                  </span>
                </div>
              </div>

              {/* Campaign Info */}
              <div className="p-4">
                <h3 className="text-gray-900 mb-3">{campaign.title}</h3>

                {/* Members */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-2">
                    {campaign.members.map((member, idx) => (
                      <Avatar key={idx} className="w-6 h-6 border-2 border-white">
                        <AvatarFallback className="bg-gray-500"></AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">+{campaign.members.length} Members</span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="text-gray-700">Goal R{campaign.goal.toLocaleString()}</span>
                    <span className="text-gray-700">{Math.round((campaign.contributed / campaign.goal) * 100)}%</span>
                  </div>
                  <Progress value={Math.round((campaign.contributed / campaign.goal) * 100)} className="h-2" />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => {
                      onSelectCampaign?.(campaign);
                      onNavigate('viewCampaignDetail');
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-300"
                    onClick={() => {
                      onSelectCampaign?.(campaign);
                      onNavigate('manageCampaign');
                    }}
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
          <Button variant="outline" className="border-gray-300">
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}
