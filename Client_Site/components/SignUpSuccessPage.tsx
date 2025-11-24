import { Check } from 'lucide-react';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess';

interface SignUpSuccessPageProps {
  onNavigate: (page: Page) => void;
}

export function SignUpSuccessPage({ onNavigate }: SignUpSuccessPageProps) {
  const handleExploreDashboard = () => {
    onNavigate('dashboard');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Black Top Section */}
      <div className="bg-black py-16 flex flex-col items-center justify-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg">
          <div className="w-20 h-20 bg-[#2AF518] rounded-full flex items-center justify-center">
            <Check size={48} className="text-white" strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-white text-[28px] mb-2">Congratulation</h1>
        <p className="text-white text-[16px]">Your account is set up and ready to go.</p>
      </div>

      {/* White Bottom Section */}
      <div className="bg-white py-12 flex flex-col items-center">
        <div className="max-w-xl px-8">
          <p className="text-black text-[16px] mb-4">You can now:</p>
          
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li className="text-black text-[15px]">Join or create savings campaigns</li>
            <li className="text-black text-[15px]">Track your progress toward your goals</li>
            <li className="text-black text-[15px]">Access vendor services and exclusive vouchers</li>
            <li className="text-black text-[15px]">Connect with your community — stress-free</li>
          </ul>

          {/* Explore Dashboard Button */}
          <div className="flex justify-center">
            <button
              onClick={handleExploreDashboard}
              className="bg-[#8363f2] text-white px-16 py-3 rounded text-[14px] hover:bg-[#7354e1] transition-colors"
            >
              Explore Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}