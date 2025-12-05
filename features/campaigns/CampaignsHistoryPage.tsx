import { useState, useEffect } from 'react';
import { ChevronDown, Calendar, Star, Filter } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { NavBar } from '../../components/layout/NavBar';
import svgPaths from '../../imports/svg-ktuy58qgj2';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { getCampaignsForMember, getCampaignById } from '../../utils/campaignStorage';
import { getUserCampaignSummary } from '../../utils/contributionStorage';
import { storedToAppCampaign, generateMemberPerformance } from '../../utils/campaignConverters';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contribute' | 'campaignSchedule' | 'campaignsHistory' | 'viewCampaignDetail';

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
  const [campaigns, setCampaigns] = useState<HistoryCampaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const storedCampaigns = await getCampaignsForMember();
      const appCampaigns = storedCampaigns.map(storedToAppCampaign);
      setCampaigns(appCampaigns);
    };

    fetchCampaigns();
  }, []);

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
            <Filter className="mr-2 h-5 w-5" />
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
                      <span>{campaign.startDate} â†’ {campaign.endDate}</span>
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
