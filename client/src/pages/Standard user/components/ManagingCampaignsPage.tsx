import { Search, Bell, ShoppingCart, User, SlidersHorizontal, Calendar, Hotel, Utensils, Plane } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns';

interface ManagingCampaignsPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  onShowAddCampaign?: () => void;
}

export function ManagingCampaignsPage({ onNavigate, onShowNotifications, onShowAddCampaign }: ManagingCampaignsPageProps) {
  const campaigns = [
    {
      name: 'Megallies Park weekend team building',
      dateRange: 'Sep 1 - Dec 5, 2025',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrJTIwcmVzb3J0fGVufDF8fHx8MTc2MjYyMzI1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      services: [
        { name: 'Magellies Hotel', icon: Hotel },
        { name: 'Tasteless Catering', icon: Utensils },
        { name: 'Qatar Airways', icon: Plane },
      ],
      goal: 15000,
      contributed: 15000,
      progress: 100,
      role: 'Admin',
    },
    {
      name: 'Swiss Adventure December holidays Trips',
      dateRange: 'Sep 1 - Dec 5, 2025',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbnMlMjBzd2l0emVybGFuZHxlbnwxfHx8fDE3NjI2MjMwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      services: [
        { name: 'Magellies Hotel', icon: Hotel },
        { name: 'Tasteless Catering', icon: Utensils },
        { name: 'Qatar Airways', icon: Plane },
      ],
      goal: 15000,
      contributed: 15000,
      progress: 10,
      role: 'Admin',
    },
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            onClick={onShowAddCampaign}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Create
          </Button>
          <button 
            onClick={onShowNotifications}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg relative"
          >
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg">
            <ShoppingCart size={20} className="text-gray-700" />
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
          >
            <User size={20} className="text-gray-700" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        {/* Title and Filters */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-gray-900">Managing(5)</h1>
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

        {/* Campaign Cards */}
        <div className="space-y-6">
          {campaigns.map((campaign, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200">
              {/* Campaign Image Header */}
              <div className="relative h-24">
                <ImageWithFallback
                  src={campaign.image}
                  alt={campaign.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Campaign Content */}
              <div className="p-6">
                {/* Title and Role */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-gray-900 flex-1">{campaign.name}</h3>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {campaign.role}
                  </Badge>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{campaign.dateRange}</span>
                </div>

                {/* Service Provider */}
                <div className="mb-4">
                  <div className="text-gray-900 mb-2">Service Provider</div>
                  <div className="flex items-center gap-4">
                    {campaign.services.map((service, idx) => {
                      const Icon = service.icon;
                      return (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                            <Icon className="w-4 h-4 text-purple-700" />
                          </div>
                          <span className="text-gray-700">{service.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M6 8L7.5 9.5L10.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Goal R{campaign.goal.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      Contributed:R{campaign.contributed.toLocaleString()}
                      <span className="ml-2">{campaign.progress}%</span>
                    </div>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
