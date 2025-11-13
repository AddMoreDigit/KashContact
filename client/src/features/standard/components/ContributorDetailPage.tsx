import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RemoveContributorDialog } from './RemoveContributorDialog';
import { ReplaceContributorDialog } from './ReplaceContributorDialog';
import { RefundContributorDialog } from './RefundContributorDialog';
const contributorImg = "https://via.placeholder.com/400x300?text=Image";

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory';

interface ContributorDetailPageProps {
  onNavigate: (page: Page) => void;
}

export function ContributorDetailPage({ onNavigate }: ContributorDetailPageProps) {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [timelineValue, setTimelineValue] = useState([50]);

  const contributionData = [
    { month: 'Aug', amount: 600, status: 'paid', color: 'bg-green-500' },
    { month: 'Sept', amount: 600, status: 'paid', color: 'bg-green-500' },
    { month: 'Oct', amount: 600, status: 'missed', color: 'bg-red-500' },
    { month: 'Nov', amount: 0, status: 'pending', color: 'bg-gray-300' },
    { month: 'Dec', amount: 0, status: 'pending', color: 'bg-gray-300' },
  ];

  const maxAmount = 1000;

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Overview Card */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-gray-900">Profile Overview Preformance</h2>
            <button
              onClick={() => onNavigate('contributors')}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-purple-100 text-purple-700">DB</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-gray-900 mb-1">Devine Bila</h3>
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                  Behind Schedule
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-900 text-2xl mb-1">30%</div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div>
              <div className="text-gray-600 text-sm mb-1">Joined</div>
              <div className="text-gray-900">1 August 2025</div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-1">Split Goal</div>
              <div className="text-gray-900">R3500.00</div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-1">Contributed</div>
              <div className="text-gray-900">R2000.00</div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-1">Payment missed</div>
              <div className="text-gray-900">1 September 2025</div>
            </div>
            <div>
              <div className="text-gray-600 text-sm mb-1">Days left</div>
              <div className="text-gray-900">21 days</div>
            </div>
          </div>

          {/* Business Prediction */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <p className="text-gray-700">
              <span className="font-medium">Business</span>
              <br />
              Prediction: "If Devine Bila continues at this pace, he will complete only 80% 
              of his target by deadline."
            </p>
          </div>

          {/* Suggestions */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-gray-700">Suggestions:</span>
            <Button variant="outline" size="sm" className="border-gray-300">
              Send Reminder
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Message
            </Button>
          </div>

          {/* Contribution History */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-4">Contribution History</h3>
            
            <div className="flex items-end justify-between h-64 mb-2">
              {contributionData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="flex-1 flex items-end w-full px-2">
                    <div
                      className={`w-full ${data.color} rounded-t`}
                      style={{ height: `${(data.amount / maxAmount) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-gray-700 mt-2">{data.month}</div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-600">Paid</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-600">Missed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                <span className="text-gray-600">Pending</span>
              </div>
            </div>

            <div className="text-center text-gray-700 mt-2">21 days Left</div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-6">
            <Button
              variant="outline"
              className="border-gray-300"
              onClick={() => setShowRefundDialog(true)}
            >
              Refund Contribution
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-red-600 hover:text-red-700"
              onClick={() => setShowRemoveDialog(true)}
            >
              Remove from Campaign
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Message Members
            </Button>
          </div>

          {/* Timeline Slider */}
          <div>
            <h3 className="text-gray-900 mb-4">Action</h3>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2 text-sm text-gray-700">
                <span>Sept</span>
                <span>Dec</span>
              </div>
              <Slider
                value={timelineValue}
                onValueChange={setTimelineValue}
                max={100}
                step={1}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>September</span>
                <span>October</span>
                <span>November</span>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                className="border-gray-300"
                onClick={() => onNavigate('contributors')}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>

      <RemoveContributorDialog
        open={showRemoveDialog}
        onOpenChange={setShowRemoveDialog}
        onReplace={() => {
          setShowRemoveDialog(false);
          setShowReplaceDialog(true);
        }}
      />

      <ReplaceContributorDialog
        open={showReplaceDialog}
        onOpenChange={setShowReplaceDialog}
      />

      <RefundContributorDialog
        open={showRefundDialog}
        onOpenChange={setShowRefundDialog}
      />
    </div>
  );
}
