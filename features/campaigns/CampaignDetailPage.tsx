import { useState } from 'react';
import { ArrowLeft, MoreVertical, Users, Clock, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { CampaignCompletedDialog } from './components/CampaignCompletedDialog';
import { LeaveReviewDialog } from './components/LeaveReviewDialog';
import { NavBar } from '../../components/layout/NavBar';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign';

interface CampaignDetailPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
}

export function CampaignDetailPage({ onNavigate, onShowNotifications, hasUnreadNotifications, onShowCart }: CampaignDetailPageProps) {
  const [showCompletedDialog, setShowCompletedDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  const handleCompleteClick = () => {
    setShowCompletedDialog(true);
  };

  const handleCompletedNext = () => {
    setShowReviewDialog(true);
  };
  const members = [
    {
      name: 'Devrise Bila',
      contribution: 'R0.00',
      amount: 'R0.00 thro R 2000',
      remaining: 'remaining R2000',
      daysLeft: 32,
    },
    {
      name: 'Miles Baloyi',
      contribution: 'R0.00',
      amount: 'R0.00 thro R 2000',
      remaining: 'remaining R2000',
      daysLeft: 32,
    },
    {
      name: 'Johnathan',
      contribution: 'R0.00',
      amount: 'R0.00 thro R 2000',
      remaining: 'remaining R2000',
      daysLeft: 32,
    },
  ];

  const serviceProviders = [
    { name: 'Gold Reef Hotel', icon: 'ðŸ¨' },
    { name: 'Reef City Catering', icon: 'ðŸ½ï¸' },
    { name: 'Reef Casino', icon: 'ðŸŽ°' },
  ];

  const timelineMarkers = [
    { label: 'Nov', value: 0, total: 0 },
    { label: 'Week 1', value: 2000, total: 2000 },
    { label: 'Week 2', value: 4000, total: 4000 },
    { label: 'Week 3', value: 6000, total: 6000 },
    { label: 'Dec', value: 8000, total: 8000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <NavBar 
        onNavigate={onNavigate}
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
        showCreateButton={false}
      />

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-gray-900 mb-6">Group Contribution Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Circular Progress */}
            <div className="flex justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#8b5cf6"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-900">0%</span>
                </div>
              </div>
            </div>

            {/* Goal Info */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                  <span className="text-gray-700">Goal: R 8,000</span>
                </div>
                <div className="text-gray-600 ml-5">32 days to go!</div>
              </div>

              <div>
                <div className="text-gray-700">Payment: weekly</div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div>
                <div className="text-gray-700">Saved R0.00</div>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-600" />
                <span className="text-gray-700">4 Campaign Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-amber-500" />
                <span className="text-amber-700">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invited Members */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-gray-900 mb-6">Invited Members</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-gray-900">{member.name}</div>
                      <div className="text-gray-600">Contribution: {member.contribution}</div>
                    </div>
                  </div>
                  <button className="hover:bg-gray-100 rounded p-1">
                    <MoreVertical size={16} className="text-gray-600" />
                  </button>
                </div>

                <div className="text-gray-600 mb-2">{member.amount} | {member.remaining}</div>
                <div className="text-gray-600">{member.daysLeft} days left</div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Service Providers */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-gray-900 mb-6">Campaign Service Providers</h2>

          <div className="flex flex-wrap gap-4">
            {serviceProviders.map((provider, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                <span>{provider.icon}</span>
                <span className="text-gray-900">{provider.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Tracker */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-gray-900 mb-6">Timeline Tracker</h2>

          <div className="relative pt-4">
            {/* Timeline line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200"></div>
            
            {/* Markers */}
            <div className="relative flex justify-between">
              {timelineMarkers.map((marker, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full mb-2 ${
                    marker.value === 0 ? 'bg-gray-400' : 'bg-purple-600'
                  }`}></div>
                  <div className="text-gray-700 mb-1">{marker.label}</div>
                  <div className="text-gray-600">R {marker.value.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mb-6">
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            Cancel
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Accept
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            Decline
          </Button>
        </div>

        {/* Complete Campaign Button (for demo) */}
        <div className="bg-white rounded-lg p-6">
          <Button
            onClick={handleCompleteClick}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Mark Campaign as Complete
          </Button>
        </div>
      </div>

      {/* Campaign Completed Dialog */}
      <CampaignCompletedDialog
        open={showCompletedDialog}
        onOpenChange={setShowCompletedDialog}
        onNext={handleCompletedNext}
      />

      {/* Leave Review Dialog */}
      <LeaveReviewDialog
        open={showReviewDialog}
        onOpenChange={setShowReviewDialog}
        onNavigate={onNavigate}
      />
    </div>
  );
}
