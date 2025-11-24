import { Search, Bell, ShoppingCart, User, SlidersHorizontal, Calendar, Hotel, Utensils, Plane } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { NavBar } from './NavBar';

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

interface ManagingCampaignsPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
  createdCampaigns?: Campaign[];
  onSelectCampaign?: (campaign: Campaign) => void;
}

export function ManagingCampaignsPage({ onNavigate, onShowNotifications, hasUnreadNotifications = false, onShowCart, createdCampaigns = [], onSelectCampaign }: ManagingCampaignsPageProps) {
  // Filter for managing campaigns (campaigns with status 'manage')
  const managingCampaigns = createdCampaigns.filter(c => c.status === 'manage');

  const getServiceIcon = (serviceType: string) => {
    if (serviceType.toLowerCase().includes('accommodation') || serviceType.toLowerCase().includes('room')) {
      return <Hotel className="w-4 h-4" />;
    } else if (serviceType.toLowerCase().includes('food')) {
      return <Utensils className="w-4 h-4" />;
    } else if (serviceType.toLowerCase().includes('transport')) {
      return <Plane className="w-4 h-4" />;
    }
    return <Hotel className="w-4 h-4" />;
  };

  return (
    <div className="flex-1 bg-gray-50">
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
          <h1 className="text-gray-900">Managing Campaigns</h1>
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
          {managingCampaigns.map((campaign) => {
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
                  <h3 className="text-gray-900 mb-2">{campaign.title}</h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{campaign.date}</span>
                  </div>

                  {/* Services */}
                  {campaign.services && campaign.services.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {campaign.services.slice(0, 3).map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {getServiceIcon(service.type)}
                          <span className="ml-1">{service.name}</span>
                        </Badge>
                      ))}
                      {campaign.services.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{campaign.services.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span className="text-gray-700">Goal R{campaign.goal.toLocaleString()}</span>
                      <span className="text-gray-700">{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      onClick={() => {
                        if (onSelectCampaign) onSelectCampaign(campaign);
                        onNavigate('manageCampaign');
                      }}
                    >
                      Manage
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-300"
                      onClick={() => {
                        if (onSelectCampaign) onSelectCampaign(campaign);
                        onNavigate('viewCampaignDetail');
                      }}
                    >
                      View
                    </Button>
                  </div>
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