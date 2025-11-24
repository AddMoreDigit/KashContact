import { useState } from 'react';
import { Button } from './ui/button';
import { X, Calendar, Target, Wallet, TrendingUp, AlertTriangle } from 'lucide-react';
import { RemoveContributorDialog } from './RemoveContributorDialog';
import { ReplaceContributorDialog } from './ReplaceContributorDialog';
import { RefundContributorDialog } from './RefundContributorDialog';
import { toast } from 'sonner@2.0.3';
import { NavBar } from './NavBar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import imgEllipse34 from 'figma:asset/e44d5cd688ebcf29969455cdd422abc0ede80023.png';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail';

interface Member {
  email: string;
  name?: string;
  avatar?: string;
  contributionPercentage: number;
  contributedAmount: number;
  goalAmount: number;
  daysLeft: number;
  missedPayments: number;
  status: 'on-track' | 'completed' | 'critical';
}

interface Campaign {
  id: number;
  title: string;
  goal: number;
  contributed: number;
  members: any[];
  startDate: string;
  endDate: string;
}

interface ContributorDetailPageProps {
  onNavigate: (page: Page) => void;
  member?: Member | null;
  campaign?: Campaign | null;
  onRemoveMember?: (memberEmail: string) => void;
  onReplaceMember?: (oldMemberEmail: string, newMemberEmail: string) => void;
  onRefundMember?: (memberEmail: string, amount: number) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
}

export function ContributorDetailPage({ onNavigate, member, campaign, onRemoveMember, onReplaceMember, onRefundMember, onShowNotifications, hasUnreadNotifications, onShowCart }: ContributorDetailPageProps) {
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);

  // Use passed member data or fallback to default
  const contributorData = member ? {
    name: member.name || 'Member',
    email: member.email,
    avatar: member.avatar || imgEllipse34,
    status: member.status === 'critical' ? 'Behind Schedule' : member.status === 'completed' ? 'Completed' : 'On Track',
    progress: member.contributionPercentage,
    joined: '1 August 2025',
    splitGoal: member.goalAmount,
    contributed: member.contributedAmount,
    paymentMissed: member.missedPayments > 0 ? '1 September 2025' : 'None',
    daysLeft: member.daysLeft,
    prediction: member.status === 'critical' 
      ? `\"If ${member.name} continues at this pace, they will complete only ${member.contributionPercentage}% of their target by deadline.\"`
      : member.status === 'completed'
      ? `\"${member.name} has successfully completed their contribution goal!\"`
      : `\"${member.name} is on track to meet their contribution goal.\"`,
  } : {
    name: 'Devine Bila',
    email: 'example@email.com',
    avatar: imgEllipse34,
    status: 'Behind Schedule',
    progress: 30,
    joined: '1 August 2025',
    splitGoal: 3500.00,
    contributed: 2000.00,
    paymentMissed: '1 September 2025',
    daysLeft: 21,
    prediction: '\"If Devine Bila continues at this pace, he will complete only 80% of his target by deadline.\"',
  };

  const contributionHistory = [
    { month: 'Aug', paid: 700, missed: 0, upcoming: 0 },
    { month: 'Sept', paid: 700, missed: 0, upcoming: 0 },
    { month: 'Oct', paid: 0, missed: 700, upcoming: 0 },
    { month: 'Nov', paid: 0, missed: 0, upcoming: 700 },
    { month: 'Dec', paid: 0, missed: 0, upcoming: 700 },
  ];

  const progressPercentage = Math.round((contributorData.contributed / contributorData.splitGoal) * 100);

  const handleSendReminder = () => {
    toast.success('Reminder sent to ' + contributorData.name);
  };

  const handleMessage = () => {
    onNavigate('messaging');
  };

  const handleRefund = (data: { reason: string; date: string; time: string }) => {
    if (onRefundMember && member) {
      onRefundMember(member.email, contributorData.contributed);
    }
    toast.success(`Refund of R${contributorData.contributed.toFixed(2)} initiated for ${contributorData.name}`);
    setShowRefundDialog(false);
    onNavigate('contributors');
  };

  const handleRemove = (reason: string) => {
    if (onRemoveMember && member) {
      onRemoveMember(member.email);
    }
    toast.success(`${contributorData.name} has been removed from the campaign`);
    setShowRemoveDialog(false);
    onNavigate('contributors');
  };

  const handleReplace = (data: { newMemberEmail: string; reason: string; date: string; time: string }) => {
    if (onReplaceMember && member) {
      onReplaceMember(member.email, data.newMemberEmail);
    }
    toast.success(`${contributorData.name} will be replaced${data.newMemberEmail ? ` with ${data.newMemberEmail}` : ''}`);
    setShowReplaceDialog(false);
    onNavigate('contributors');
  };

  const handleMessageMembers = () => {
    onNavigate('messaging');
  };

  const CircularProgress = ({ percentage }: { percentage: number }) => {
    const radius = 85;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-48 h-48 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="16"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="#2D1B69"
            strokeWidth="16"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl text-[#2D1B69]">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <NavBar 
        onNavigate={onNavigate} 
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
        showCreateButton={false}
      />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-black">Profile Overview Performance</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('contributors')}
            className="rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <p className="text-gray-600 text-sm mt-1">Edit</p>
      </div>

      <div className="px-8 py-6 max-w-6xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img
                src={contributorData.avatar}
                alt={contributorData.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl text-black mb-1">{contributorData.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{contributorData.email}</p>
                <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="text-red-600">{contributorData.status}</span>
                </div>
              </div>
            </div>

            {/* Circular Progress */}
            <CircularProgress percentage={progressPercentage} />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-5 gap-8 mt-8">
            <div>
              <p className="text-gray-600 text-sm mb-1">Joined</p>
              <p className="text-black">{contributorData.joined}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Split Goal</p>
              <p className="text-black">R{contributorData.splitGoal.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Contributed</p>
              <p className="text-black">R{contributorData.contributed.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Payment missed</p>
              <p className="text-black">{contributorData.paymentMissed}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Days left</p>
              <p className="text-black">{contributorData.daysLeft} days</p>
            </div>
          </div>

          {/* Insights */}
          <div className="mt-8">
            <h3 className="text-black mb-2">Insights</h3>
            <p className="text-gray-700 mb-4">
              Prediction: {contributorData.prediction}
            </p>

            <div className="flex items-center gap-4">
              <p className="text-black">Suggestions:</p>
              <Button
                variant="outline"
                onClick={handleSendReminder}
                className="bg-purple-50 border-gray-300 text-gray-700 hover:bg-purple-100"
              >
                Send Reminder
              </Button>
              <Button
                onClick={handleMessage}
                className="bg-[#8363F2] hover:bg-[#6B4FD8] text-white"
              >
                Message
              </Button>
            </div>
          </div>
        </div>

        {/* Contribution History */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl text-black">Contribution History</h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded" />
                <span className="text-sm text-gray-700">Paid</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded" />
                <span className="text-sm text-gray-700">Missed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded" />
                <span className="text-sm text-gray-700">Upcoming</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-4">
            <p className="text-gray-700">{contributorData.daysLeft} days Left</p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contributionHistory}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="paid" stackId="a" fill="#22C55E" radius={[8, 8, 0, 0]} />
              <Bar dataKey="missed" stackId="a" fill="#EF4444" radius={[8, 8, 0, 0]} />
              <Bar dataKey="upcoming" stackId="a" fill="#D1D5DB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Action Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl text-black mb-6">Action</h3>
          
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => setShowRefundDialog(true)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Refund Contribution
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowRemoveDialog(true)}
              className="bg-red-50 border-gray-300 text-gray-700 hover:bg-red-100"
            >
              Remove from Campaign
            </Button>
            <Button
              onClick={handleMessageMembers}
              className="bg-[#8363F2] hover:bg-[#6B4FD8] text-white"
            >
              Message Members
            </Button>
          </div>

          {/* Timeline */}
          <div className="relative mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">Sept</span>
              <span className="text-gray-700">Dec</span>
            </div>
            
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              {/* Progress */}
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 via-[#8363F2] to-gray-300 rounded-full"
                style={{ width: '50%' }}
              />
              
              {/* Markers */}
              <div className="absolute top-1/2 -translate-y-1/2 left-[25%] w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[50%] w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[75%] w-3 h-3 bg-gray-400 rounded-full border-2 border-white" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[100%] -translate-x-full w-3 h-3 bg-gray-400 rounded-full border-2 border-white" />
            </div>

            <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
              <span>September</span>
              <span>October</span>
              <span>November</span>
            </div>
          </div>

          <div className="mt-6 text-right">
            <Button
              onClick={() => onNavigate('contributors')}
              className="bg-[#8363F2] hover:bg-[#6B4FD8] text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* Refund Dialog */}
      <RefundContributorDialog
        open={showRefundDialog}
        onOpenChange={setShowRefundDialog}
        contributorName={contributorData.name}
        refundAmount={contributorData.contributed}
        onConfirm={handleRefund}
      />

      {/* Remove Dialog */}
      <RemoveContributorDialog
        open={showRemoveDialog}
        onOpenChange={setShowRemoveDialog}
        contributorName={contributorData.name}
        contributorEmail={member?.email}
        missedPayments={member?.missedPayments}
        onConfirm={handleRemove}
      />

      {/* Replace Dialog */}
      <ReplaceContributorDialog
        open={showReplaceDialog}
        onOpenChange={setShowReplaceDialog}
        contributorName={contributorData.name}
        missedPayments={member?.missedPayments}
        onConfirm={handleReplace}
      />
    </div>
  );
}