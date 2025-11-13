import { Search, Bell, ShoppingCart, User, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
const campaign1Img = "https://via.placeholder.com/400x300?text=Image";

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute';

interface OverviewPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  onShowAddCampaign?: () => void;
}

export function OverviewPage({ onNavigate, onShowNotifications, onShowAddCampaign }: OverviewPageProps) {
  const campaigns = [
    {
      name: 'Gold Reef City Weekend',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700',
      dateRange: 'Sep 1 - Dec 5, 2025',
      goal: 10000,
      progress: 5,
      image: campaign1Img,
    },
    {
      name: 'Protea Hotel weekend',
      status: 'Completed',
      statusColor: 'bg-purple-100 text-purple-700',
      dateRange: 'Sep 1 - Dec 5, 2025',
      goal: 45000,
      progress: 100,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MjYxNzI5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Durban South Beach Trip',
      status: 'Upcoming',
      statusColor: 'bg-red-100 text-red-700',
      dateRange: 'Sep 1 - Dec 5, 2025',
      goal: 10000,
      progress: 0,
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
          <h1 className="text-gray-900">Overview</h1>
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

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M11.0833 2.33334H2.91667C2.27233 2.33334 1.75 2.85567 1.75 3.50001V11.6667C1.75 12.311 2.27233 12.8333 2.91667 12.8333H11.0833C11.7277 12.8333 12.25 12.311 12.25 11.6667V3.50001C12.25 2.85567 11.7277 2.33334 11.0833 2.33334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.33333 1.16666V3.49999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.66667 1.16666V3.49999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.75 5.83334H12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{campaign.dateRange}</span>
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
                    size="sm"
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => onNavigate('campaignDetail')}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
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
