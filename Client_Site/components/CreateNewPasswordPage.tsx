import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import svgPaths from '../imports/svg-exyywquc7r';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword';

interface CreateNewPasswordPageProps {
  onNavigate: (page: Page) => void;
}

export function CreateNewPasswordPage({ onNavigate }: CreateNewPasswordPageProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleContinue = () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    toast.success('Password reset successfully!');
    setTimeout(() => {
      onNavigate('login');
    }, 1500);
  };

  const handleBack = () => {
    onNavigate('otpVerification');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleContinue();
    }
  };

  return (
    <div className="bg-white relative size-full min-h-screen">
      {/* Back Button */}
      <div className="absolute left-[calc(8.33%-16px)] top-[44px]">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="size-[35px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
              <g>
                <path clipRule="evenodd" d={svgPaths.p208ff700} fill="black" fillRule="evenodd" />
                <circle cx="17.5" cy="17.5" r="17" stroke="black" fill="none" />
              </g>
            </svg>
          </div>
          <span className="font-['Be_Vietnam_Pro',sans-serif] leading-[50px] text-[20px] text-black tracking-[-0.32px]">
            back
          </span>
        </button>
      </div>

      {/* Title */}
      <p className="absolute font-['Inter',sans-serif] font-medium leading-[21px] left-1/2 text-[32px] text-black text-center text-nowrap top-[215px] tracking-[-0.32px] translate-x-[-50%]">
        Create new password
      </p>

      {/* Subtitle */}
      <p className="absolute font-['Inter',sans-serif] font-normal leading-[65px] left-[calc(45.83%+48px)] text-[20px] text-black text-center top-[241px] tracking-[-0.32px] translate-x-[-50%] w-[564px]">
        Please enter email address to rest password
      </p>

      {/* Enter New Password Field */}
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-1/2 top-[355px] translate-x-[-50%] w-[420px]">
        <p className="font-['Nunito_Sans',sans-serif] font-semibold leading-[normal] text-[#555555] text-[14px]">
          Enter new Password
        </p>
        <div className="relative w-full">
          <input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter  password"
            className="box-border w-full flex gap-[13px] items-center px-[10px] py-[13px] rounded-[5px] border border-[#565555] font-['Nunito_Sans',sans-serif] font-normal text-[#555555] text-[14px] outline-none focus:border-[#8363f2] transition-colors pr-12"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
          >
            {showNewPassword ? (
              <EyeOff size={18} className="text-gray-600" />
            ) : (
              <Eye size={18} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Confirm New Password Field */}
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-1/2 top-[459px] translate-x-[-50%] w-[420px]">
        <p className="font-['Nunito_Sans',sans-serif] font-semibold leading-[normal] text-[#555555] text-[14px] w-[221px]">
          Confirm new Password
        </p>
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter  password"
            className="box-border w-full flex gap-[13px] items-center px-[10px] py-[13px] rounded-[5px] border border-[#565555] font-['Nunito_Sans',sans-serif] font-normal text-[#555555] text-[14px] outline-none focus:border-[#8363f2] transition-colors pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
          >
            {showConfirmPassword ? (
              <EyeOff size={18} className="text-gray-600" />
            ) : (
              <Eye size={18} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="absolute bg-[#8363f2] content-stretch flex gap-[13px] items-center justify-center left-1/2 pb-[12px] pt-[13px] px-[10px] rounded-[6px] top-[581px] translate-x-[-50%] w-[420px] hover:bg-[#7354e1] transition-colors"
      >
        <p className="font-['Nunito_Sans',sans-serif] font-extrabold leading-[normal] text-[18px] text-nowrap text-white">
          Continue
        </p>
      </button>
    </div>
  );
}