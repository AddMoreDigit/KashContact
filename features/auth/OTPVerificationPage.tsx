import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import svgPaths from '../../imports/svg-0epv1c64i2';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'vendorDashboard' | 'corporateDashboard';

interface OTPVerificationPageProps {
  onNavigate: (page: Page) => void;
  isSignupFlow?: boolean; // Flag to determine if this is signup or password reset
}

export function OTPVerificationPage({ onNavigate, isSignupFlow }: OTPVerificationPageProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60); // 60 seconds countdown
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-focus first input
    inputRefs.current[0]?.focus();

    // Countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus the last filled input or the next empty one
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      toast.error('Please enter all 6 digits');
      return;
    }

    // Simulate verification
    toast.success('OTP verified successfully!');
    
    // Set authentication flag if signup flow
    if (isSignupFlow) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('hasVisitedBefore', 'true');
    }
    
    setTimeout(() => {
      if (isSignupFlow) {
        // Navigate to appropriate dashboard based on user type
        const userType = localStorage.getItem('userType');
        if (userType === 'vendor') {
          onNavigate('vendorDashboard');
        } else if (userType === 'corporate') {
          onNavigate('corporateDashboard');
        } else {
          onNavigate('dashboard');
        }
      } else {
        // Password reset flow
        onNavigate('createNewPassword');
      }
    }, 1000);
  };

  const handleRetry = () => {
    setOtp(['', '', '', '', '', '']);
    setTimer(60);
    inputRefs.current[0]?.focus();
    toast.success('A new code has been sent to your email');
  };

  const handleBack = () => {
    onNavigate('forgotPassword');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
      <p className="absolute font-['Inter',sans-serif] font-semibold leading-[21px] left-1/2 text-[32px] text-black text-center text-nowrap top-[215px] tracking-[-0.32px] translate-x-[-50%]">
        Opt verification
      </p>

      {/* Subtitle */}
      <p className="absolute font-['Inter',sans-serif] font-normal leading-[65px] left-1/2 text-[20px] text-black text-center top-[241px] tracking-[-0.32px] translate-x-[-50%] w-[564px]">
        please enter 6 digits sent to your email to proceed
      </p>

      {/* OTP Input Fields */}
      <div className="absolute content-stretch flex gap-[30px] items-center leading-[0] left-1/2 top-[339px] translate-x-[-50%]">
        {otp.map((digit, index) => (
          <div key={index} className="bg-white h-[56px] rounded-[10px] w-[70px] border border-black border-solid">
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-full h-full text-center text-2xl outline-none bg-transparent"
            />
          </div>
        ))}
      </div>

      {/* Timer and Label */}
      <p className="absolute font-['Inter',sans-serif] font-normal leading-[21px] left-[calc(37.5%+23px)] text-[#2b2929] text-[16px] text-center text-nowrap top-[437px] tracking-[-0.32px] translate-x-[-50%]">
        Enter verification Code
      </p>
      <p className="absolute font-['Be_Vietnam_Pro',sans-serif] font-bold leading-[21px] left-[calc(62.5%-3px)] text-[#2b2929] text-[24px] text-nowrap top-[434px] tracking-[-0.32px]">
        {formatTime(timer)}
      </p>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        className="absolute bg-[#8363f2] content-stretch flex gap-[13px] items-center justify-center left-1/2 pb-[12px] pt-[13px] px-[10px] rounded-[6px] top-[582px] translate-x-[-50%] w-[420px] hover:bg-[#7354e1] transition-colors"
      >
        <p className="font-['Nunito_Sans',sans-serif] font-extrabold leading-[normal] text-[18px] text-nowrap text-white">
          Verify
        </p>
      </button>

      {/* Retry Button */}
      <button
        onClick={handleRetry}
        disabled={timer > 0}
        className={`absolute bg-[#8363f2] content-stretch flex gap-[13px] items-center justify-center left-1/2 pb-[12px] pt-[13px] px-[10px] rounded-[6px] top-[659px] translate-x-[-50%] w-[420px] transition-colors ${
          timer > 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#7354e1]'
        }`}
      >
        <p className="font-['Nunito_Sans',sans-serif] font-extrabold leading-[normal] text-[18px] text-nowrap text-white">
          Retry
        </p>
      </button>
    </div>
  );
}
