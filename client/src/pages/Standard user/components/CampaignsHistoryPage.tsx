import { Search, Bell, ShoppingCart, User, Calendar, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory';

interface CampaignsHistoryPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
}

export function CampaignsHistoryPage({ onNavigate, onShowNotifications }: CampaignsHistoryPageProps) {
  const campaigns = [
    {
      name: 'Tanzania Trip',
      goal: 40000,
      contributed: 40000,
      startDate: 'Feb 2',
      endDate: 'June 5, 2025',
      members: 5,
      progressColor: 'bg-purple-600',
    },
    {
      name: 'Durban July',
      target: 25000,
      contributed: 21000,
      startDate: 'Feb 2',
      endDate: 'June 5, 2025',
      members: 3,
      progressColor: 'bg-gray-700',
    },
    {
      name: 'Cape town weekend',
      target: 40000,
      contributed: 9000,
      startDate: 'Feb 2',
      endDate: 'June 5, 2025',
      members: 4,
      progressColor: 'bg-gray-700',
    },
  ];

  const getProgressPercentage = (contributed: number, target: number) => {
    return Math.round((contributed / target) * 100);
  };

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
            onClick={() => onNavigate('howItWorks')}
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
        <div className="bg-white rounded-lg p-6">
          {/* Title and History Button */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-gray-900">Campaigns history</h1>
            <Button variant="outline" className="border-gray-300">
              <Calendar className="w-4 h-4 mr-2" />
              History
            </Button>
          </div>

          {/* Campaign Cards */}
          <div className="space-y-6">
            {campaigns.map((campaign, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                {/* Campaign Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">{campaign.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Campaigns members ({campaign.members})</span>
                  </div>
                </div>

                {/* Goal/Target and Contributed */}
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-700">
                    {campaign.goal ? 'Goal' : 'Target'} R{(campaign.goal || campaign.target)?.toLocaleString()}.00
                  </div>
                  <div className="text-gray-700">
                    Contributed R{campaign.contributed.toLocaleString()}.00
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <Progress 
                    value={getProgressPercentage(campaign.contributed, campaign.goal || campaign.target || 0)} 
                    className="h-2"
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-sm text-gray-700">
                      {getProgressPercentage(campaign.contributed, campaign.goal || campaign.target || 0)}%
                    </span>
                  </div>
                </div>

                {/* Date Range */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{campaign.startDate} → {campaign.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
