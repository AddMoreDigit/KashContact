import { Search, Bell, ShoppingCart, User, SlidersHorizontal, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { NavBar } from './NavBar';
import { useState, useEffect } from 'react';
import { getCampaignsForMember } from '../utils/campaignStorage';
import type { Campaign as StorageCampaign } from '../utils/campaignStorage';

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

interface IndividualCampaignPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
  createdCampaigns?: Campaign[];
  onSelectCampaign?: (campaign: Campaign) => void;
}

export function IndividualCampaignPage({ onNavigate, onShowNotifications, hasUnreadNotifications = false, onShowCart, createdCampaigns = [], onSelectCampaign }: IndividualCampaignPageProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Load campaigns from storage
  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const userEmail = userProfile.email || '';
    
    // Get campaigns from storage where user is invited (not organizer)
    const storageCampaigns = getCampaignsForMember(userEmail);
    
    // Convert storage campaigns to display format
    const convertedCampaigns: Campaign[] = storageCampaigns
      .filter(c => c.organizerEmail !== userEmail) // Individual campaigns are where user is invited
      .map(sc => ({
        id: parseInt(sc.id.replace('campaign-', '')) || Date.now(),
        title: sc.name,
        image: sc.image || '',
        provider: sc.servicesBooked[0]?.provider || 'Service Provider',
        date: `${sc.startDate} → ${sc.endDate}`,
        services: sc.servicesBooked.map(s => ({
          name: s.provider,
          type: s.name
        })),
        members: sc.members.map(m => ({ email: m.email })),
        goal: sc.totalAmount,
        contributed: sc.currentAmount,
        status: 'contribute' as const,
        category: sc.category,
        startDate: sc.startDate,
        endDate: sc.endDate,
        contributionFrequency: sc.contributionFrequency,
        cartItems: []
      }));
    
    setCampaigns(convertedCampaigns);
  }, []);

  // Filter for individual campaigns (campaigns with status 'contribute')
  const individualCampaigns = campaigns.filter(c => c.status === 'contribute');

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
          <h1 className="text-gray-900">Individual campaign</h1>
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
          {individualCampaigns.map((campaign) => {
            const progressPercentage = Math.round((campaign.contributed / campaign.goal) * 100);
            
            return (
            <div key={campaign.id} className="bg-white rounded-lg overflow-hidden border border-gray-200">
              {/* Campaign Image */}
              <div className="relative h-40">
                <ImageWithFallback
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                    Active
                  </span>
                </div>
              </div>

              {/* Campaign Info */}
              <div className="p-4">
                <h3 className="text-gray-900 mb-3">{campaign.title}</h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{campaign.date}</span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="text-gray-700">Goal R{campaign.goal.toLocaleString()}</span>
                    <span className="text-gray-700">{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => {
                    onSelectCampaign?.(campaign);
                    onNavigate('contribute');
                  }}
                >
                  Contribute
                </Button>
              </div>
            </div>
          );
          })}
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