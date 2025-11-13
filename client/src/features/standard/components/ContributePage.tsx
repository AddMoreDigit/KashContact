import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { AddPaymentDialog } from './AddPaymentDialog';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
const campaignImg = "https://via.placeholder.com/400x300?text=Image";

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute';

interface ContributePageProps {
  onNavigate: (page: Page) => void;
}

export function ContributePage({ onNavigate }: ContributePageProps) {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('debit-card');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  const goal = 10000;
  const contributed = 3000;
  const progressPercent = (contributed / goal) * 100;

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleConfirmContribute = () => {
    // Handle contribution confirmation
    console.log('Contributing:', amount);
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-gray-900">Contribute</h1>
          </div>

          {/* Campaign Image */}
          <div className="relative w-full h-48">
            <ImageWithFallback
              src={campaignImg}
              alt="Gold Reef City Weekend"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Campaign Info */}
          <div className="p-6">
            <h2 className="text-gray-900 mb-4">Gold Reef City Weekend</h2>

            {/* Goal and Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z" stroke="#22c55e" strokeWidth="1.5"/>
                    <path d="M6 8L7.5 9.5L10.5 6.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-700">Goal R{goal.toLocaleString()}</span>
                </div>
                <div className="text-gray-700">
                  Contributed R{contributed.toLocaleString()}
                  <span className="ml-2 text-gray-600">{Math.round(progressPercent)}%</span>
                </div>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>

            {/* Enter Amount */}
            <div className="mb-6">
              <label className="block text-gray-900 mb-3">Enter Amount (ZAR)</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="mb-4"
              />

              {/* Quick Amount Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAmount(100)}
                  className="border-gray-300"
                >
                  R100
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAmount(500)}
                  className="border-gray-300"
                >
                  R500
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAmount(1000)}
                  className="border-gray-300"
                >
                  R1000
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300"
                >
                  Custom
                </Button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <label className="block text-gray-900 mb-3">Payment Methods</label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ewallent" id="ewallent" />
                    <Label htmlFor="ewallent" className="text-gray-700">Ewallent Balance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="debit-card" id="debit-card" />
                    <Label htmlFor="debit-card" className="text-gray-700">Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="eft" id="eft" />
                    <Label htmlFor="eft" className="text-gray-700">EFT</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2 mb-6">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-700"
              >
                I agree to campaign{' '}
                <a href="#" className="text-purple-600 underline">
                  terms & Conditions
                </a>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => onNavigate('dashboard')}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmContribute}
                disabled={!amount || !agreedToTerms}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
              >
                Confirm Contribute
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AddPaymentDialog
        open={showAddPayment}
        onOpenChange={setShowAddPayment}
      />
    </div>
  );
}
