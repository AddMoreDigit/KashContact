//import React from 'react'; export default function Placeholder() { return <div>Placeholder</div> }
import { useState } from 'react';
import { ChevronLeft, Share2, Calendar, MapPin, MoreVertical, Plus, X, Users, Star, Target } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { toast } from 'sonner';
import { RemoveContributorDialog } from '../contributors/components/RemoveContributorDialog';
import { ReplaceContributorDialog } from '../contributors/components/ReplaceContributorDialog';
import { RefundContributorDialog } from '../contributors/components/RefundContributorDialog';
import { NavBar } from '../../components/layout/NavBar';
import { getCampaignById, isCampaignAdmin } from '../../utils/campaignStorage';

        //     param($match)
        //     $importPath = $match.Groups[1].Value
        //     # Ensure the path is properly quoted
        //     "import '$importPath';"
        // ;
import svgPaths from '../../imports/svg-4yjhds5xgm';

        //     param($match)
        //     $importPath = $match.Groups[1].Value
        //     # Ensure the path is properly quoted
        //     "import '$importPath';"
        // ;

        //     param($match)
        //     $importPath = $match.Groups[1].Value
        //     # Ensure the path is properly quoted
        //     "import '$importPath';"
        // ;

        //     param($match)
        //     $importPath = $match.Groups[1].Value
        //     # Ensure the path is properly quoted
        //     "import '$importPath';"
        // ;

        //     param($match)
        //     $importPath = $match.Groups[1].Value
        //     # Ensure the path is properly quoted
        //     "import '$importPath';"
        // ;

        //     param($match)
        //     $importPath = $match.Groups[1].Value
        //     # Ensure the path is properly quoted
        //     "import '$importPath';"
        // ;

        //     param($match)
        //     $importPath = $match.Groups[1].Value
        //     # Ensure the path is properly quoted
        //     "import '$importPath';"
        // ;

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail';

interface Member {
  email: string;
  name?: string;
  avatar?: string;
  contributionPercentage?: number;
  contributedAmount?: number;
  goalAmount?: number;
  daysLeft?: number;
  missedPayments?: number;
  status?: 'up-to-date' | 'pending' | 'on-track' | 'completed' | 'critical';
}

interface CartItem {
  id: number;
  type: 'room' | 'food' | 'transport' | 'activity';
  name: string;
  price: string;
  provider?: string;
  image?: string;
  totalPrice?: number;
}

interface Campaign {
  id: number;
  title: string;
  image: string;
  provider: string;
  date: string;
  services: { name: string; type: string }[];
  members: { email: string; name?: string; contributionPercentage?: number; contributedAmount?: number; status?: 'up-to-date' | 'pending' }[];
  memberPerformance?: Member[];
  goal: number;
  contributed: number;
  status: 'contribute' | 'manage';
  category?: string;
  startDate: string;
  endDate: string;
  contributionFrequency?: string;
  cartItems?: CartItem[];
}

interface ViewCampaignPageProps {
  onNavigate: (page: Page) => void;
  campaign?: Campaign | null;
  onUpdateCampaign?: (campaign: Campaign) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
  onBack?: () => void;
}

export function ViewCampaignPage({ onNavigate, campaign, onUpdateCampaign, onShowNotifications, hasUnreadNotifications, onShowCart, onBack }: ViewCampaignPageProps) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [showContributors, setShowContributors] = useState(false);
  const [addContributionDialog, setAddContributionDialog] = useState(false);
  const [selectedMemberEmail, setSelectedMemberEmail] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [showMemberMenu, setShowMemberMenu] = useState<string | null>(null);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);
  const [memberToReplace, setMemberToReplace] = useState<string | null>(null);
  const [memberToRefund, setMemberToRefund] = useState<string | null>(null);
  const [replacementEmail, setReplacementEmail] = useState('');
  const [refundAmount, setRefundAmount] = useState('');

  // Default campaign for fallback
  const defaultCampaign: Campaign = {
    id: 1,
    title: 'Cape Town Gateway Weekend',
    image: imgRectangle115,
    provider: 'Seaview Lodge',
    date: 'Sep 1 â†’ Dec 5, 2025',
    startDate: '2025-09-01',
    endDate: '2025-12-05',
    services: [
      { name: 'Seaview Lodge', type: 'Accommodation' },
      { name: 'TasteBites Catering', type: 'Food' },
    ],
    members: [
      { email: 'alice@example.com', name: 'Alice', contributionPercentage: 75, contributedAmount: 2625, status: 'up-to-date' },
      { email: 'john@example.com', name: 'John', contributionPercentage: 100, contributedAmount: 2000, status: 'up-to-date' },
      { email: 'jabulani@example.com', name: 'Jabulani', contributionPercentage: 0, contributedAmount: 0, status: 'pending' },
    ],
    goal: 10000,
    contributed: 4625,
    status: 'contribute',
  };

  const activeCampaign = campaign || defaultCampaign;
  const progressPercent = Math.round(((activeCampaign.contributed || 0) / (activeCampaign.goal || 1)) * 100);
  
  // Get current user email and check admin status
  const currentUserEmail = localStorage.getItem('userEmail') || 'michael@example.com';
  
  // Check if current user is an admin
  const checkIsAdmin = (): boolean => {
    if (!campaign || !campaign.id) return false; // Default campaign - no admin check
    
    try {
      const storedCampaign = getCampaignById(campaign.id.toString());
      if (storedCampaign && storedCampaign.adminEmails) {
        return isCampaignAdmin(storedCampaign, currentUserEmail);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
    
    return false;
  };
  
  const isUserAdmin = checkIsAdmin();

  // Ensure services array exists (fallback to empty array)
  const campaignServices = activeCampaign.services || [];

  // Use memberPerformance if available, otherwise use members
  const displayMembers: Member[] = activeCampaign.memberPerformance && activeCampaign.memberPerformance.length > 0
    ? activeCampaign.memberPerformance
    : (activeCampaign.members || []) as Member[];

  const getMemberInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const getMemberName = (email: string) => {
    return email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
  };

  const handleInvite = () => {
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
  };

  const handlePauseCampaign = () => {
    setIsPaused(!isPaused);
    toast.success(isPaused ? 'Campaign resumed' : 'Campaign paused');
  };

  const handleViewPerformance = () => {
    setShowContributors(true);
  };

  const handleAddContribution = (email: string) => {
    setSelectedMemberEmail(email);
    setAddContributionDialog(true);
  };

  const handleRemoveMember = (email: string) => {
    setMemberToRemove(email);
    setShowRemoveDialog(true);
  };

  const handleReplaceMember = (email: string) => {
    setMemberToReplace(email);
    setShowReplaceDialog(true);
  };

  const handleRefundMember = (email: string) => {
    setMemberToRefund(email);
    setShowRefundDialog(true);
  };

  const handleContributionSubmit = () => {
    if (!contributionAmount) {
      toast.error('Please enter a contribution amount');
      return;
    }
    const amount = parseFloat(contributionAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid contribution amount');
      return;
    }
    
    const memberIndex = displayMembers.findIndex((member) => member.email === selectedMemberEmail);
    if (memberIndex !== -1) {
      const currentContributed = displayMembers[memberIndex].contributedAmount || 0;
      const newContributed = currentContributed + amount;
      const memberGoal = displayMembers[memberIndex].goalAmount || (activeCampaign.goal / displayMembers.length);
      const newPercentage = Math.min(100, Math.round((newContributed / memberGoal) * 100));
      
      const updatedMember = {
        ...displayMembers[memberIndex],
        contributedAmount: newContributed,
        contributionPercentage: newPercentage,
        status: (newPercentage >= 100 ? 'completed' : newPercentage > 0 ? 'on-track' : 'pending') as Member['status'],
      };
      
      const updatedMembers = [...displayMembers];
      updatedMembers[memberIndex] = updatedMember;
      
      // Calculate total contributed from all members
      const totalContributed = updatedMembers.reduce((sum, member) => sum + (member.contributedAmount || 0), 0);
      
      const updatedCampaign = {
        ...activeCampaign,
        memberPerformance: updatedMembers,
        members: updatedMembers.map(m => ({
          email: m.email,
          name: m.name,
          contributionPercentage: m.contributionPercentage,
          contributedAmount: m.contributedAmount,
          status: (m.status === 'completed' || m.status === 'on-track' ? 'up-to-date' : 'pending') as 'up-to-date' | 'pending',
        })),
        contributed: totalContributed,
      };
      
      onUpdateCampaign?.(updatedCampaign);
      toast.success(`Added R${amount.toLocaleString()} to ${updatedMember.name || selectedMemberEmail}`);
      setAddContributionDialog(false);
      setContributionAmount('');
    }
  };

  const handleRemoveMemberSubmit = () => {
    if (!memberToRemove) {
      toast.error('No member selected to remove');
      return;
    }
    
    const updatedMembers = displayMembers.filter((member) => member.email !== memberToRemove);
    
    // Recalculate total contributed from remaining members
    const totalContributed = updatedMembers.reduce((sum, member) => sum + (member.contributedAmount || 0), 0);
    
    const updatedCampaign = {
      ...activeCampaign,
      memberPerformance: updatedMembers,
      members: updatedMembers.map(m => ({
        email: m.email,
        name: m.name,
        contributionPercentage: m.contributionPercentage,
        contributedAmount: m.contributedAmount,
        status: (m.status === 'completed' || m.status === 'on-track' ? 'up-to-date' : 'pending') as 'up-to-date' | 'pending',
      })),
      contributed: totalContributed,
    };
    
    onUpdateCampaign?.(updatedCampaign);
    
    const removedMember = displayMembers.find(m => m.email === memberToRemove);
    toast.success(`Removed ${removedMember?.name || memberToRemove}`);
    setShowRemoveDialog(false);
    setMemberToRemove(null);
    setShowMemberMenu(null);
  };

  const handleReplaceMemberSubmit = () => {
    if (!memberToReplace || !replacementEmail) {
      toast.error('Please select a member to replace and enter a replacement email');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replacementEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    const updatedMembers = displayMembers.map((member) => {
      if (member.email === memberToReplace) {
        return {
          ...member,
          email: replacementEmail,
          name: getMemberName(replacementEmail),
          contributionPercentage: 0,
          contributedAmount: 0,
          status: 'pending' as Member['status'],
        };
      }
      return member;
    });
    
    // Recalculate total contributed (replacement member starts at 0)
    const totalContributed = updatedMembers.reduce((sum, member) => sum + (member.contributedAmount || 0), 0);
    
    const updatedCampaign = {
      ...activeCampaign,
      memberPerformance: updatedMembers,
      members: updatedMembers.map(m => ({
        email: m.email,
        name: m.name,
        contributionPercentage: m.contributionPercentage,
        contributedAmount: m.contributedAmount,
        status: (m.status === 'completed' || m.status === 'on-track' ? 'up-to-date' : 'pending') as 'up-to-date' | 'pending',
      })),
      contributed: totalContributed,
    };
    
    onUpdateCampaign?.(updatedCampaign);
    
    const oldMember = displayMembers.find(m => m.email === memberToReplace);
    toast.success(`Replaced ${oldMember?.name || memberToReplace} with ${getMemberName(replacementEmail)}`);
    setShowReplaceDialog(false);
    setMemberToReplace(null);
    setReplacementEmail('');
    setShowMemberMenu(null);
  };

  const handleRefundMemberSubmit = () => {
    if (!memberToRefund || !refundAmount) {
      toast.error('Please select a member to refund and enter a refund amount');
      return;
    }
    
    const amount = parseFloat(refundAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid refund amount');
      return;
    }
    
    const memberIndex = displayMembers.findIndex((member) => member.email === memberToRefund);
    if (memberIndex !== -1) {
      const currentContributed = displayMembers[memberIndex].contributedAmount || 0;
      const newContributed = currentContributed - amount;
      const memberGoal = displayMembers[memberIndex].goalAmount || (activeCampaign.goal / displayMembers.length);
      const newPercentage = Math.min(100, Math.round((newContributed / memberGoal) * 100));
      
      const updatedMember = {
        ...displayMembers[memberIndex],
        contributedAmount: newContributed,
        contributionPercentage: newPercentage,
        status: (newPercentage >= 100 ? 'completed' : newPercentage > 0 ? 'on-track' : 'pending') as Member['status'],
      };
      
      const updatedMembers = [...displayMembers];
      updatedMembers[memberIndex] = updatedMember;
      
      // Calculate total contributed from all members
      const totalContributed = updatedMembers.reduce((sum, member) => sum + (member.contributedAmount || 0), 0);
      
      const updatedCampaign = {
        ...activeCampaign,
        memberPerformance: updatedMembers,
        members: updatedMembers.map(m => ({
          email: m.email,
          name: m.name,
          contributionPercentage: m.contributionPercentage,
          contributedAmount: m.contributedAmount,
          status: (m.status === 'completed' || m.status === 'on-track' ? 'up-to-date' : 'pending') as 'up-to-date' | 'pending',
        })),
        contributed: totalContributed,
      };
      
      onUpdateCampaign?.(updatedCampaign);
      toast.success(`Refunded R${amount.toLocaleString()} from ${updatedMember.name || memberToRefund}`);
      setShowRefundDialog(false);
      setMemberToRefund(null);
      setRefundAmount('');
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
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        {/* Campaign Card */}
        <div className="bg-white rounded-lg shadow-[0px_1px_3px_2px_rgba(0,0,0,0.25)] overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64">
            <img
              src={activeCampaign.image}
              alt={activeCampaign.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            {/* Service Provider Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Service Provider</h2>
                <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 26 26">
                    <path d={svgPaths.p111a8b00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d={svgPaths.p149f2980} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                  <span>Edit</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {campaignServices.map((service, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={index === 0 ? imgRectangle140 : imgRectangle141}
                      alt={service.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-900">{service.name}</h3>
                        <div className="flex items-center">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-gray-600 text-sm ml-1">(24 Reviews)</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Cape Town | {service.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Goal Section */}
            <div className="mb-8">
              <h2 className="text-gray-900 mb-6">Campaign Goal</h2>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-900">Goal-R{(activeCampaign.goal || 0).toLocaleString()}.00</span>
                </div>
                <span className="text-gray-900 ml-auto mr-4">
                  Contributed -R{(activeCampaign.contributed || 0).toLocaleString()}.00
                </span>
                <span className="text-purple-600">{progressPercent}%</span>
              </div>

              <div className="relative mb-4">
                <div className="w-full h-5 bg-gray-300 rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-purple-600 rounded-lg"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-900">
                <Calendar className="w-5 h-5" />
                <span>{activeCampaign.startDate} â†’ {activeCampaign.endDate}</span>
              </div>
            </div>

            {/* Members Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Members</h2>
                <Button
                  onClick={handleViewPerformance}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Campaign performance
                </Button>
              </div>

              <div className="space-y-4">
                {displayMembers.map((member) => (
                  <div key={member.email} className="flex items-center gap-4">
                    <Avatar className="w-15 h-15 rounded-full object-cover">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name || getMemberName(member.email)} className="w-full h-full object-cover" />
                      ) : (
                        <AvatarFallback className="bg-gray-300 text-gray-600">
                          {getMemberInitials(member.email)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-gray-900">{member.name || getMemberName(member.email)}</h3>
                            {(() => {
                              try {
                                const storedCampaign = getCampaignById(campaign?.id?.toString() || '');
                                if (storedCampaign && storedCampaign.adminEmails) {
                                  const isAdmin = storedCampaign.adminEmails.includes(member.email);
                                  const isCreator = storedCampaign.creatorEmail === member.email;
                                  if (isCreator) {
                                    return <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Creator</span>;
                                  } else if (isAdmin) {
                                    return <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Co-Admin</span>;
                                  }
                                }
                              } catch (error) {
                                // Ignore errors
                              }
                              return null;
                            })()}
                          </div>
                          <p className="text-gray-600 text-sm">
                            {member.status === 'up-to-date' || member.status === 'completed' ? 'Up to date' : 'Pending'} â€¢ Target: R{Math.round(member.goalAmount || (activeCampaign.goal / displayMembers.length)).toLocaleString()} â€¢ Contributed: R{Math.round(member.contributedAmount || 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-purple-600">{member.contributionPercentage || 0}%</span>
                          {isUserAdmin && (
                            <button className="text-purple-600 hover:text-purple-700">Edit</button>
                          )}
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-full h-5 bg-gray-300 rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-purple-600 rounded-lg"
                            style={{ width: `${member.contributionPercentage || 0}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        className="absolute top-0 right-0 bg-gray-300 text-gray-600 rounded-full p-1"
                        onClick={() => setShowMemberMenu(member.email)}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </button>
                      {showMemberMenu === member.email && (
                        <div className="absolute top-6 right-0 bg-white border border-gray-300 rounded shadow-md z-10">
                          <button
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                            onClick={() => handleAddContribution(member.email)}
                          >
                            Add Contribution
                          </button>
                          <button
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                            onClick={() => handleRemoveMember(member.email)}
                          >
                            Remove Member
                          </button>
                          <button
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                            onClick={() => handleReplaceMember(member.email)}
                          >
                            Replace Member
                          </button>
                          <button
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                            onClick={() => handleRefundMember(member.email)}
                          >
                            Refund Member
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Invite Members Section */}
            <div className="mb-8">
              <h2 className="text-gray-900 mb-4">Invites Members</h2>
              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Search by Username or email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-300"
                >
                  <Plus className="h-5 w-5" />
                </Button>
                <Button
                  onClick={handleInvite}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Invite
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={onBack || (() => onNavigate('campaigns'))}
                className="border-gray-300"
              >
                Back
              </Button>
              <Button
                onClick={handlePauseCampaign}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isPaused ? 'Resume Campaign' : 'Pause Campaign'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contributors Dialog */}
      <Dialog open={showContributors} onOpenChange={setShowContributors}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contributors</DialogTitle>
            <DialogDescription>View and manage all contributors for this campaign</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {displayMembers.map((member) => {
              const memberGoal = member.goalAmount || (activeCampaign.goal / displayMembers.length);
              const contributionPercent = member.contributionPercentage || 0;
              const contributedAmount = member.contributedAmount || 0;
              
              return (
                <div key={member.email} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar} alt={member.name || member.email} />
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {getMemberInitials(member.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-gray-900">{member.name || member.email}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-gray-900">R{contributedAmount.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">of R{memberGoal.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-900">{contributionPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 transition-all"
                        style={{ width: `${Math.min(contributionPercent, 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className={`px-2 py-1 rounded ${
                      member.status === 'up-to-date' || member.status === 'completed' || member.status === 'on-track'
                        ? 'bg-green-100 text-green-700'
                        : member.status === 'critical'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {member.status === 'up-to-date' || member.status === 'on-track' ? 'On Track' : 
                       member.status === 'completed' ? 'Completed' :
                       member.status === 'critical' ? 'Critical' : 'Pending'}
                    </span>
                    
                    {isUserAdmin && (
                      <Button
                        onClick={() => {
                          setSelectedMemberEmail(member.email);
                          setShowContributors(false);
                          setAddContributionDialog(true);
                        }}
                        size="sm"
                        variant="outline"
                        className="text-purple-600 border-purple-600 hover:bg-purple-50"
                      >
                        Add Contribution
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t mt-4">
            <div>
              <div className="text-sm text-gray-600">Total Contributors</div>
              <div className="text-gray-900">{displayMembers.length} members</div>
            </div>
            <Button onClick={() => {
              setShowContributors(false);
              onNavigate('contributors');
            }} className="bg-purple-600 hover:bg-purple-700 text-white">
              View Full Contributors Page
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Contribution Dialog */}
      <Dialog open={addContributionDialog} onOpenChange={setAddContributionDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Contribution</DialogTitle>
            <DialogDescription>Add a contribution to {selectedMemberEmail}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Enter contribution amount"
              value={contributionAmount}
              onChange={(e) => setContributionAmount(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleContributionSubmit}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Add Contribution
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Remove Member Dialog */}
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Remove Member</DialogTitle>
            <DialogDescription>Are you sure you want to remove {memberToRemove} from the campaign?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              onClick={handleRemoveMemberSubmit}
              className="bg-red-600 hover:bg-red-700"
            >
              Remove Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Replace Member Dialog */}
      <Dialog open={showReplaceDialog} onOpenChange={setShowReplaceDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Replace Member</DialogTitle>
            <DialogDescription>Enter the email of the new member to replace {memberToReplace}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter new member email"
              value={replacementEmail}
              onChange={(e) => setReplacementEmail(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleReplaceMemberSubmit}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Replace Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Refund Member Dialog */}
      <Dialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Refund Member</DialogTitle>
            <DialogDescription>Enter the refund amount for {memberToRefund}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Enter refund amount"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleRefundMemberSubmit}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Refund Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


