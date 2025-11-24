import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { Logo } from './Logo';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword';

interface ForgotPasswordPageProps {
  onNavigate: (page: Page) => void;
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    toast.success('Verification code sent to your email!');
    setTimeout(() => {
      onNavigate('otpVerification');
    }, 1500);
  };

  const handleBack = () => {
    onNavigate('login');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleContinue();
    }
  };

  return (
    <div className="bg-white flex items-center justify-center min-h-screen py-12 px-8">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full border border-black flex items-center justify-center">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path d="M9 1L1 9L9 17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-black text-base">back</span>
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo className="h-16" />
        </div>

        {/* Title */}
        <h2 className="text-3xl text-black mb-4 text-center">Forgot password</h2>
        <p className="text-base text-gray-700 mb-12 text-center">
          Please enter email address to reset password
        </p>

        {/* Form */}
        <div className="w-full max-w-md mx-auto">
          {/* Email Field */}
          <div className="mb-8">
            <label className="text-sm text-gray-700 mb-2 block">
              User Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter user email address"
              className="w-full px-4 py-3 border border-gray-400 rounded-md text-sm outline-none focus:border-[#8363f2] transition-colors"
            />
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full bg-[#8363f2] text-white py-3 rounded-md text-base text-center hover:bg-[#7354e1] transition-colors"
          >
            Continue
          </button>
        </div>

        {/* Purple Gradient Bottom Right */}
        <div className="fixed bottom-0 right-0 w-full h-64 pointer-events-none overflow-hidden -z-10">
          <svg 
            viewBox="0 0 624 330" 
            fill="none" 
            className="absolute -bottom-10 -right-20 w-[800px] h-auto"
            preserveAspectRatio="none"
          >
            <path 
              d="M4 400.181C4 364.45 27.6277 333.026 61.953 323.103L132 302.855L272.5 260.855L1257.13 4.98589C1310.06 -8.76888 1366.32 6.38745 1405.18 44.8692L1439.55 78.9141C1442.4 81.7313 1444 85.5687 1444 89.5723V508.355H4V400.181Z" 
              fill="url(#gradient)"
            />
            <defs>
              <linearGradient id="gradient" x1="4" y1="268" x2="1444" y2="268" gradientUnits="userSpaceOnUse">
                <stop offset="0.474" stopColor="#7954FB" />
                <stop offset="1" stopColor="#2D1B69" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}