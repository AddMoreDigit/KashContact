import { NavBar } from '../../components/layout/NavBar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { getCampaignById, updateCampaignProgress } from '../../utils/campaignStorage';
import { addContribution, getUserCampaignSummary } from '../../utils/contributionStorage';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'viewCampaignDetail';

interface Campaign {
  id: number;
  title: string;
  image: string;
  provider: string;
  date: string;
  services: { name: string; type: string }[];
  members: { email: string; contributedAmount?: number; contributionPercentage?: number }[];
  goal: number;
  contributed: number;
  status: 'contribute' | 'manage';
  category?: string;
  startDate: string;
  endDate: string;
  contributionFrequency?: string;
  cartItems?: any[];
}

interface ContributePageProps {
  onNavigate: (page: Page) => void;
  campaign?: Campaign | null;
  onUpdateCampaign?: (campaign: Campaign) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
}

export function ContributePage({ onNavigate, campaign, onUpdateCampaign, onShowNotifications, hasUnreadNotifications, onShowCart }: ContributePageProps) {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState('debit');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Default campaign if none provided
  const defaultCampaign: Campaign = {
    id: 1,
    title: 'Gold Reef City Weekend',
    image: 'https://via.placeholder.com/400x233.png?text=Gold+Reef+City+Weekend',
    provider: 'Service Provider',
    date: 'Sep 1 â†’ Dec 5, 2025',
    services: [{ name: 'Service Provider', type: 'Event' }],
    members: [{ email: 'michael@keahcont.co.za' }],
    goal: 10000,
    contributed: 3000,
    status: 'contribute',
    startDate: '2025-09-01',
    endDate: '2025-12-05',
  };

  const activeCampaign = campaign || defaultCampaign;
  const progressPercent = Math.round((activeCampaign.contributed / activeCampaign.goal) * 100);

  const quickAmounts = [
    { value: '100', label: 'R100' },
    { value: '500', label: 'R500' },
    { value: '1000', label: 'R1000' },
  ];

  const handleQuickAmount = (value: string) => {
    setSelectedAmount(value);
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmount = () => {
    setSelectedAmount('custom');
    setAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount(value);
  };

  const handleConfirmContribute = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!agreeToTerms) {
      toast.error('Please agree to the terms & conditions');
      return;
    }

    // Check if campaign is stored and verify its status
    const campaignId = `campaign-${activeCampaign.id}`;
    const storedCampaign = getCampaignById(campaignId);
    
    // Prevent contributions to declined campaigns
    if (storedCampaign && storedCampaign.status === 'declined') {
      toast.error('This campaign has been declined and is no longer accepting contributions');
      setTimeout(() => {
        onNavigate('campaigns');
      }, 1500);
      return;
    }

    const contributionAmount = parseFloat(amount);
    
    // Get user email from profile
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const userEmail = userProfile.email || 'user@example.com';
    
    // Add contribution record to tracking system
    const contribution = addContribution(
      campaignId,
      userEmail,
      contributionAmount,
      paymentMethod as 'ewallet' | 'debit' | 'eft'
    );
    
    // Update campaign with new contribution
    const updatedCampaign = {
      ...activeCampaign,
      contributed: activeCampaign.contributed + contributionAmount,
    };

    onUpdateCampaign?.(updatedCampaign);
    
    // Update campaign in centralized storage
    if (storedCampaign) {
      const newTotalAmount = storedCampaign.currentAmount + contributionAmount;
      updateCampaignProgress(campaignId, newTotalAmount);
    }
      
    toast.success(`Successfully contributed R${contributionAmount.toLocaleString()} via ${
      paymentMethod === 'ewallet' ? 'Ewallet Balance' : 
      paymentMethod === 'debit' ? 'Debit Card' : 
      'EFT'
    }. Transaction ID: ${contribution.transactionId}`);
    
    // Navigate back to campaigns
    setTimeout(() => {
      onNavigate('campaigns');
    }, 1000);
  };

  const handleCancel = () => {
    onNavigate('campaigns');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        onNavigate={onNavigate} 
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
        showCreateButton={false}
      />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-[32px] font-semibold">Contribute</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Campaign Image */}
          <div className="w-full h-[233px] rounded-t-lg overflow-hidden mb-6">
            <ImageWithFallback 
              src={activeCampaign.image} 
              alt={activeCampaign.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Campaign Title */}
          <h2 className="text-[24px] font-medium text-[#1b1b1b] mb-6">
            {activeCampaign.title}
          </h2>

          {/* Goal and Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#8363F2" strokeWidth="2" fill="none"/>
                  <path d="M12 6v6l4 2" stroke="#8363F2" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-[20px] text-[#212020]">
                  Goal R{activeCampaign.goal.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <div className="text-[24px] text-black">
                  Contributed R{activeCampaign.contributed.toLocaleString()}
                </div>
                <div className="text-[20px] font-medium">{progressPercent}%</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-[15px] bg-[#d9d9d9] rounded-[5px] overflow-hidden">
              <div 
                className="h-full bg-[#35c73e] rounded-[5px] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Enter Amount */}
          <div className="mb-8">
            <h3 className="text-[28px] font-medium text-black mb-4">Enter Amount (ZAR)</h3>
            
            {/* Amount Input */}
            <div className="mb-6">
              <Input
                type="number"
                value={selectedAmount === 'custom' ? customAmount : amount}
                onChange={(e) => {
                  if (selectedAmount === 'custom') {
                    handleCustomAmountChange(e.target.value);
                  }
                }}
                placeholder="Enter amount"
                className="h-[56px] text-[20px] border-[#8363f2] focus:ring-[#8363f2]"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="flex gap-4">
              {quickAmounts.map((qa) => (
                <button
                  key={qa.value}
                  onClick={() => handleQuickAmount(qa.value)}
                  className={`h-[56px] w-[144px] rounded-[5px] border-[0.5px] text-[24px] font-medium transition-all ${
                    selectedAmount === qa.value
                      ? 'bg-[#8363f2] text-white border-[#8363f2]'
                      : 'bg-[rgba(131,99,242,0.05)] text-[#2d1b69] border-[rgba(131,99,242,0.1)] hover:bg-[rgba(131,99,242,0.1)]'
                  }`}
                >
                  {qa.label}
                </button>
              ))}
              
              <button
                onClick={handleCustomAmount}
                className={`h-[56px] w-[144px] rounded-[5px] border-[0.5px] text-[24px] font-medium transition-all ${
                  selectedAmount === 'custom'
                    ? 'bg-[#8363f2] text-white border-[#8363f2]'
                    : 'bg-[rgba(131,99,242,0.05)] text-black border-[rgba(131,99,242,0.1)] hover:bg-[rgba(131,99,242,0.1)]'
                }`}
              >
                Custom
              </button>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="text-[28px] font-medium text-black mb-6">Payment Methods</h3>
            
            <div className="flex gap-8">
              {/* Ewallet Balance */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div 
                  onClick={() => setPaymentMethod('ewallet')}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${
                    paymentMethod === 'ewallet' 
                      ? 'border-[#8363f2]' 
                      : 'border-[#908F92]'
                  }`}
                >
                  {paymentMethod === 'ewallet' && (
                    <div className="w-3 h-3 rounded-full bg-[#8363f2]" />
                  )}
                </div>
                <span className="text-[24px] text-black">Ewallent Balance</span>
              </label>

              {/* Debit Card */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div 
                  onClick={() => setPaymentMethod('debit')}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${
                    paymentMethod === 'debit' 
                      ? 'border-[#8363f2]' 
                      : 'border-[#908F92]'
                  }`}
                >
                  {paymentMethod === 'debit' && (
                    <div className="w-3 h-3 rounded-full bg-[#8363f2]" />
                  )}
                </div>
                <span className="text-[24px] text-black">Debit Card</span>
              </label>

              {/* EFT */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div 
                  onClick={() => setPaymentMethod('eft')}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${
                    paymentMethod === 'eft' 
                      ? 'border-[#8363f2]' 
                      : 'border-[#908F92]'
                  }`}
                >
                  {paymentMethod === 'eft' && (
                    <div className="w-3 h-3 rounded-full bg-[#8363f2]" />
                  )}
                </div>
                <span className="text-[24px] text-black">EFT</span>
              </label>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="w-6 h-6 border-[#8363f2]"
              />
              <span className="text-[20px]">
                I agree to campaign{' '}
                <span className="text-[#8363f2] cursor-pointer hover:underline">
                  terms & Conditions
                </span>
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="h-[56px] px-[24px] text-[24px] border-[#8363f2] text-black hover:bg-gray-50"
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleConfirmContribute}
              className="h-[56px] px-[24px] bg-[#8363f2] text-white text-[24px] hover:bg-[#7053e0]"
            >
              Confirm Contribute
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
