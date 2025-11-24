import { useState } from 'react';
import { ChevronLeft, SlidersHorizontal, Calendar, AlertCircle, Info } from 'lucide-react';
import { Button } from './ui/button';
import { NavBar } from './NavBar';
import svgPaths from '../imports/svg-ktuy58qgj2';
import imgRectangle139 from 'figma:asset/5d9bf658577635a939c9246246e5a8bf87eb8ec2.png';
import imgRectangle402 from 'figma:asset/4b2fcb19385f460858dcd1b2c22dc6c1a96c0506.png';
import imgRectangle407 from 'figma:asset/c3da0b093907ae1f1f073f5b5b081f4b60182725.png';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory';

interface CampaignsHistoryPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
}

interface HistoryCampaign {
  id: number;
  title: string;
  status: 'completed' | 'ongoing' | 'cancelled';
  goal: number;
  contributed: number;
  members: number;
  startDate: string;
  endDate: string;
  icon: 'campaign' | 'warning' | 'info';
  iconColor: string;
  image: string;
}

export function CampaignsHistoryPage({ onNavigate, onShowNotifications, hasUnreadNotifications, onShowCart }: CampaignsHistoryPageProps) {
  const [sortBy, setSortBy] = useState('recent');

  const campaigns: HistoryCampaign[] = [
    {
      id: 1,
      title: 'Tanzania Trip',
      status: 'completed',
      goal: 40000,
      contributed: 40000,
      members: 5,
      startDate: 'Feb 2',
      endDate: 'June 5, 2025',
      icon: 'campaign',
      iconColor: '#455A64',
      image: 'https://images.unsplash.com/photo-1580145575237-75fec2a0320b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHNhZmFyaXxlbnwxfHx8fDE3NjMxMTk4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Durban July',
      status: 'ongoing',
      goal: 25000,
      contributed: 21000,
      members: 3,
      startDate: 'Feb 2',
      endDate: 'June 5, 2025',
      icon: 'warning',
      iconColor: '#E3990F',
      image: 'https://images.unsplash.com/photo-1675277064786-54a171a89a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJiYW4lMjBiZWFjaGZyb250fGVufDF8fHx8MTc2MzExOTgwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'Cape town weekend',
      status: 'ongoing',
      goal: 40000,
      contributed: 9000,
      members: 4,
      startDate: 'Feb 2',
      endDate: 'June 5, 2025',
      icon: 'info',
      iconColor: '#0082FB',
      image: 'https://images.unsplash.com/photo-1712850256111-bfd1677f7f5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMHdhdGVyZnJvbnR8ZW58MXx8fHwxNzYzMTE5ODA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const getProgressPercentage = (contributed: number, goal: number) => {
    return Math.round((contributed / goal) * 100);
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-purple-600';
      case 'ongoing':
        return 'bg-[#455a64]';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="flex-1 bg-white">
      <NavBar 
        onNavigate={onNavigate} 
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
        showCreateButton={false}
      />
      
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-900">Campaigns history</h1>
          <Button variant="outline" className="border-purple-600 text-black hover:bg-gray-50">
            <SlidersHorizontal className="mr-2 h-5 w-5" />
            History
          </Button>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="px-8 py-6">
        <div className="space-y-6">
          {campaigns.map((campaign) => {
            const progressPercentage = getProgressPercentage(campaign.contributed, campaign.goal);
            
            return (
              <div
                key={campaign.id}
                className="bg-white rounded-2xl shadow-[0px_1px_3px_1px_rgba(0,0,0,0.25)] p-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-gray-900">{campaign.title}</h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                      <mask height="24" id={`mask_${campaign.id}`} maskUnits="userSpaceOnUse" width="24" x="0" y="0">
                        <rect fill={campaign.iconColor} height="24" width="24" />
                      </mask>
                      <g mask={`url(#mask_${campaign.id})`}>
                        <path d={svgPaths.p215dba80} fill={campaign.iconColor} />
                      </g>
                    </svg>
                    <span>Campaigns members ({campaign.members})</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-gray-700 mb-1">
                      <span className="text-gray-600">
                        {campaign.status === 'completed' ? 'Goal' : 'Target'}
                      </span>
                      <span className="ml-2">R{campaign.goal.toLocaleString()}.00</span>
                    </p>
                    <div className="flex items-center gap-2 text-gray-900">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 20 18">
                        <path d={svgPaths.p5ee8000} fill="#8363F2" />
                      </svg>
                      <span>{campaign.startDate} → {campaign.endDate}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-700">
                      <span className="text-gray-600">Contributed</span>
                      <span className="ml-2">R{campaign.contributed.toLocaleString()}.00</span>
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-2">
                  <div className="w-full h-4 bg-gray-300 rounded-lg overflow-hidden">
                    <div 
                      className={`h-full rounded-lg ${getProgressColor(campaign.status)}`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Percentage */}
                <div className="flex justify-end">
                  <span className="text-gray-900">{progressPercentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}