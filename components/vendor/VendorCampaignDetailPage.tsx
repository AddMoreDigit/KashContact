import { useState, useEffect } from 'react';
import { Search, Bell, User, ArrowLeft, Calendar, Users, MapPin, DollarSign, CheckCircle, XCircle, TrendingUp, CreditCard } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';
import { Toaster } from '../ui/sonner';
import { VendorSidebar } from './VendorSidebar';
import { updateCampaignStatusOnly, type Campaign } from '../../utils/campaignStorage';
import { updateCampaignStatus, notifyUserOfStatusChange } from '../../utils/notificationStorage';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'approveBookingRequest' | 'editBooking' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable' | 'vendorCampaignDetail';

interface VendorCampaignDetailPageProps {
  onNavigate: (page: Page) => void;
  campaign?: Campaign | null;
  onClose?: () => void;
}

interface Transaction {
  id: string;
  member: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  method: string;
}

interface MemberContribution {
  name: string;
  email: string;
  avatar?: string;
  totalContributed: number;
  contributionPercentage: number;
  lastPaymentDate: string;
  status: 'on-track' | 'behind' | 'completed';
}

export function VendorCampaignDetailPage({ onNavigate, campaign, onClose }: VendorCampaignDetailPageProps) {
  const [activePage] = useState<string>('campaigns');
  const [campaignStatus, setCampaignStatus] = useState<string>(
    campaign?.status === 'pending' ? 'Pending Approval' : 
    campaign?.status === 'accepted' ? 'Accepted' : 
    'Declined'
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'members'>('overview');

  // Generate realistic transactions based on campaign data
  const generateTransactions = (): Transaction[] => {
    if (!campaign) return [];
    
    const transactions: Transaction[] = [];
    const statuses: Array<'completed' | 'pending' | 'failed'> = ['completed', 'completed', 'completed', 'pending'];
    const methods = ['Card Payment', 'Bank Transfer', 'Card Payment', 'EFT'];
    
    campaign.members.forEach((member, idx) => {
      const memberShare = campaign.totalAmount / campaign.numberOfMembers;
      const contributionPercentage = campaign.progress / campaign.numberOfMembers;
      const amountPaid = (memberShare * contributionPercentage) / 100;
      
      // Generate 2-3 transactions per member
      const numTransactions = Math.floor(Math.random() * 2) + 2;
      const amountPerTransaction = amountPaid / numTransactions;
      
      for (let i = 0; i < numTransactions; i++) {
        const daysAgo = Math.floor(Math.random() * 30) + (i * 15);
        const transactionDate = new Date();
        transactionDate.setDate(transactionDate.getDate() - daysAgo);
        
        transactions.push({
          id: `TXN-${Date.now()}-${idx}-${i}`,
          member: member.name,
          amount: amountPerTransaction,
          date: transactionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: statuses[i % statuses.length],
          method: methods[i % methods.length]
        });
      }
    });
    
    // Sort by date (most recent first)
    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  // Generate member contributions
  const generateMemberContributions = (): MemberContribution[] => {
    if (!campaign) return [];
    
    const memberShare = campaign.totalAmount / campaign.numberOfMembers;
    const statuses: Array<'on-track' | 'behind' | 'completed'> = ['on-track', 'on-track', 'completed', 'behind', 'on-track'];
    
    return campaign.members.map((member, idx) => {
      const contributionPercentage = 20 + Math.floor(Math.random() * 80); // 20-100%
      const totalContributed = (memberShare * contributionPercentage) / 100;
      
      const lastPaymentDate = new Date();
      lastPaymentDate.setDate(lastPaymentDate.getDate() - Math.floor(Math.random() * 15));
      
      return {
        name: member.name,
        email: member.email,
        avatar: member.avatar,
        totalContributed,
        contributionPercentage,
        lastPaymentDate: lastPaymentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: statuses[idx % statuses.length]
      };
    });
  };

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [memberContributions, setMemberContributions] = useState<MemberContribution[]>([]);

  useEffect(() => {
    if (campaign) {
      setTransactions(generateTransactions());
      setMemberContributions(generateMemberContributions());
      setCampaignStatus(
        campaign.status === 'pending' ? 'Pending Approval' : 
        campaign.status === 'accepted' ? 'Accepted' : 
        'Declined'
      );
    }
  }, [campaign]);

  const handleAcceptCampaign = () => {
    if (!campaign) return;
    
    const vendorName = localStorage.getItem('vendorName') || 'Vendor';
    
    setCampaignStatus('Accepted');
    toast.success(`Campaign "${campaign.name}" accepted successfully!`);
    
    // Update campaign status in storage
    updateCampaignStatusOnly(campaign.id, 'accepted');
    updateCampaignStatus(campaign.id, 'accepted', vendorName);
    
    // Notify user of status change
    notifyUserOfStatusChange(
      campaign.id,
      campaign.name,
      'accepted',
      campaign.organizer,
      vendorName
    );
    
    setTimeout(() => {
      onNavigate('vendorCampaigns');
    }, 1500);
  };

  const handleDeclineCampaign = () => {
    if (!campaign) return;
    
    const vendorName = localStorage.getItem('vendorName') || 'Vendor';
    
    setCampaignStatus('Declined');
    toast.error(`Campaign "${campaign.name}" declined.`);
    
    // Update campaign status in storage
    updateCampaignStatusOnly(campaign.id, 'declined');
    updateCampaignStatus(campaign.id, 'declined', vendorName);
    
    // Notify user of status change
    notifyUserOfStatusChange(
      campaign.id,
      campaign.name,
      'declined',
      campaign.organizer,
      vendorName
    );
    
    setTimeout(() => {
      onNavigate('vendorCampaigns');
    }, 1500);
  };

  if (!campaign) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">No campaign selected</p>
      </div>
    );
  }

  const formattedDates = campaign.startDate && campaign.endDate 
    ? `${new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(campaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    : 'Dates not set';

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <VendorSidebar currentPage={activePage} onNavigate={onNavigate} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button 
              onClick={() => onClose ? onClose() : onNavigate('vendorCampaigns')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Campaigns</span>
            </button>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Campaign Header */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
            <div className="relative h-80">
              <ImageWithFallback
                src={campaign.image || 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=1080'}
                alt={campaign.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  campaignStatus === 'Accepted' 
                    ? 'bg-green-100 text-green-700' 
                    : campaignStatus === 'Declined'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {campaignStatus}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h1 className="text-3xl mb-4">{campaign.name}</h1>
              
              {/* Key Info Grid */}
              <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Dates</p>
                    <p className="text-sm font-medium">{formattedDates}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Members</p>
                    <p className="text-sm font-medium">{campaign.numberOfMembers} People</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium">{campaign.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Value</p>
                    <p className="text-sm font-medium">R{campaign.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Campaign Organizer Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500 mb-2">Campaign Organizer</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">ðŸ‘¤</span>
                    </div>
                    <div>
                      <p className="font-medium">{campaign.organizer}</p>
                      <p className="text-sm text-gray-500">{campaign.organizerEmail}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="text-sm font-medium">{campaign.organizerPhone}</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Campaign Funding Progress</p>
                  <p className="text-sm font-medium">R{campaign.currentAmount.toLocaleString()} / R{campaign.totalAmount.toLocaleString()}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                  <div
                    className="bg-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 text-right">{campaign.progress}% funded</p>
              </div>

              {/* Action Buttons (only show if pending) */}
              {campaignStatus === 'Pending Approval' && (
                <div className="flex gap-4">
                  <button 
                    onClick={handleAcceptCampaign}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Accept Campaign
                  </button>
                  <button 
                    onClick={handleDeclineCampaign}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                    Decline Campaign
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tabs (only show if accepted) */}
          {campaignStatus === 'Accepted' && (
            <>
              <div className="bg-white rounded-lg border border-gray-200 mb-6">
                <div className="border-b border-gray-200">
                  <div className="flex gap-8 px-6">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`py-4 border-b-2 transition-colors ${
                        activeTab === 'overview'
                          ? 'border-purple-600 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('transactions')}
                      className={`py-4 border-b-2 transition-colors ${
                        activeTab === 'transactions'
                          ? 'border-purple-600 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Transactions
                    </button>
                    <button
                      onClick={() => setActiveTab('members')}
                      className={`py-4 border-b-2 transition-colors ${
                        activeTab === 'members'
                          ? 'border-purple-600 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Members
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div>
                      {/* Services Booked */}
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">Services Booked</h3>
                        <div className="space-y-3">
                          {campaign.servicesBooked.map((service, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium">{service.name}</p>
                                <p className="text-sm text-gray-500">{service.provider}</p>
                                <p className="text-xs text-gray-400">{service.details}</p>
                              </div>
                              <p className="font-medium text-lg">R{(service.cost || 0).toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      {campaign.description && (
                        <div className="mb-6">
                          <h3 className="text-lg font-medium mb-4">Description</h3>
                          <p className="text-gray-600 leading-relaxed">{campaign.description}</p>
                        </div>
                      )}

                      {/* Itinerary */}
                      {campaign.itinerary && campaign.itinerary.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium mb-4">Itinerary</h3>
                          <div className="space-y-3">
                            {campaign.itinerary.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-sm font-medium text-purple-600">{idx + 1}</span>
                                </div>
                                <div>
                                  <p className="font-medium">{item.day}</p>
                                  <p className="text-sm text-gray-600">{item.activity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Transactions Tab */}
                  {activeTab === 'transactions' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-medium">Payment Transactions</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <TrendingUp className="w-4 h-4" />
                          <span>{transactions.length} Total Transactions</span>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Transaction ID</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Member</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Method</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactions.map((transaction) => (
                              <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-4 px-4 text-sm text-gray-600">{transaction.id}</td>
                                <td className="py-4 px-4 text-sm font-medium">{transaction.member}</td>
                                <td className="py-4 px-4 text-sm font-medium">R{transaction.amount.toFixed(2)}</td>
                                <td className="py-4 px-4 text-sm text-gray-600">{transaction.date}</td>
                                <td className="py-4 px-4 text-sm text-gray-600">{transaction.method}</td>
                                <td className="py-4 px-4">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    transaction.status === 'completed' 
                                      ? 'bg-green-100 text-green-700'
                                      : transaction.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-red-100 text-red-700'
                                  }`}>
                                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Members Tab */}
                  {activeTab === 'members' && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-medium">Member Contributions</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{memberContributions.length} Active Members</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {memberContributions.map((member, idx) => (
                          <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                              {member.avatar ? (
                                <ImageWithFallback
                                  src={member.avatar}
                                  alt={member.name}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                  <span className="text-lg">ðŸ‘¤</span>
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-xs text-gray-500">{member.email}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Total Contributed</span>
                                <span className="font-medium">R{member.totalContributed.toFixed(2)}</span>
                              </div>
                              
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-500 h-2 rounded-full"
                                  style={{ width: `${member.contributionPercentage}%` }}
                                ></div>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500">{member.contributionPercentage}% Complete</span>
                                <span className={`px-2 py-1 rounded-full font-medium ${
                                  member.status === 'completed'
                                    ? 'bg-green-100 text-green-700'
                                    : member.status === 'on-track'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                  {member.status === 'on-track' ? 'On Track' : member.status === 'completed' ? 'Completed' : 'Behind'}
                                </span>
                              </div>
                              
                              <div className="text-xs text-gray-500">
                                Last Payment: {member.lastPaymentDate}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      <Toaster />
    </div>
  );
}

