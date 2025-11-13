import { Search, Bell, ShoppingCart, User, SlidersHorizontal, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns';

interface GroupCampaignPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  onShowAddCampaign?: () => void;
}

export function GroupCampaignPage({ onNavigate, onShowNotifications, onShowAddCampaign }: GroupCampaignPageProps) {
  const campaigns = [
    {
      name: 'Team Building Houston',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700',
      dateRange: 'Sep 1 - Dec 5, 2025',
      goal: 10000,
      progress: 5,
      members: 10,
      memberColors: ['bg-orange-500', 'bg-blue-500', 'bg-purple-500'],
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwY2VudGVyfGVufDF8fHx8MTc2MjYyMzAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Swiss adventure trip',
      status: 'Completed',
      statusColor: 'bg-purple-100 text-purple-700',
      dateRange: 'Sep 1 - Dec 5, 2025',
      goal: 45000,
      progress: 89,
      members: 16,
      memberColors: ['bg-orange-500', 'bg-red-500', 'bg-blue-500'],
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbnMlMjBzd2l0emVybGFuZHxlbnwxfHx8fDE3NjI2MjMwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Durban South Beach Trip',
      status: 'Upcoming',
      statusColor: 'bg-red-100 text-red-700',
      dateRange: 'Sep 1 - Dec 5, 2025',
      goal: 10000,
      progress: 0,
      members: 16,
      memberColors: ['bg-orange-500', 'bg-blue-500', 'bg-green-500'],
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydHxlbnwxfHx8fDE3NjI2MTkxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
          {campaigns.map((campaign, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200">
              {/* Campaign Image */}
              <div className="relative h-40">
                <ImageWithFallback
                  src={campaign.image}
                  alt={campaign.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${campaign.statusColor}`}>
                    {campaign.status}
                  </span>
                </div>
              </div>

              {/* Campaign Info */}
              <div className="p-4">
                <h3 className="text-gray-900 mb-3">{campaign.name}</h3>

                {/* Members */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-2">
                    {campaign.memberColors.map((color, idx) => (
                      <Avatar key={idx} className="w-6 h-6 border-2 border-white">
                        <AvatarFallback className={color}></AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">+{campaign.members} Members</span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="text-gray-700">Goal R{campaign.goal.toLocaleString()}</span>
                    <span className="text-gray-700">{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => onNavigate('manageCampaign')}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-300"
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
