import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'signup' | 'vendorSignup' | 'otpVerification';

interface VendorSignUpPageProps {
  onNavigate: (page: Page) => void;
  onSignUp?: (userData: VendorSignUpData) => void;
  accountType?: 'user' | 'vendor' | 'corporate';
}

export interface VendorSignUpData {
  businessName: string;
  businessEmail: string;
  password: string;
  acceptedTerms: boolean;
  accountType: 'user' | 'vendor' | 'corporate';
}

export function VendorSignUpPage({ onNavigate, onSignUp, accountType = 'vendor' }: VendorSignUpPageProps) {
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<{
    businessName?: string;
    businessEmail?: string;
    password?: string;
    terms?: string;
  }>({});

  // Dynamic text based on account type
  const getAccountTypeText = () => {
    switch (accountType) {
      case 'user':
        return 'User';
      case 'vendor':
        return 'Vendor';
      case 'corporate':
        return 'Corporate';
      default:
        return 'Vendor';
    }
  };

  const getNameFieldLabel = () => {
    switch (accountType) {
      case 'user':
        return 'Full Name';
      case 'vendor':
        return 'Business Name';
      case 'corporate':
        return 'Company Name';
      default:
        return 'Business Name';
    }
  };

  const getEmailFieldLabel = () => {
    switch (accountType) {
      case 'user':
        return 'Email Address';
      case 'vendor':
        return 'Business Email Address';
      case 'corporate':
        return 'Corporate Email Address';
      default:
        return 'Business Email Address';
    }
  };

  const getNamePlaceholder = () => {
    switch (accountType) {
      case 'user':
        return 'Enter full name';
      case 'vendor':
        return 'Enter business name';
      case 'corporate':
        return 'Enter company name';
      default:
        return 'Enter business name';
    }
  };

  const getEmailPlaceholder = () => {
    switch (accountType) {
      case 'user':
        return 'Enter email address';
      case 'vendor':
        return 'Enter business email address';
      case 'corporate':
        return 'Enter corporate email address';
      default:
        return 'Enter business email address';
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!businessName.trim()) {
      newErrors.businessName = `${getNameFieldLabel()} is required`;
    }

    if (!businessEmail.trim()) {
      newErrors.businessEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail)) {
      newErrors.businessEmail = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the policy and terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      const userData: VendorSignUpData = {
        businessName,
        businessEmail,
        password,
        acceptedTerms,
        accountType,
      };

      if (onSignUp) {
        onSignUp(userData);
      }

      toast.success('Account created successfully! Please verify your email.');
      // Navigate to OTP verification
      setTimeout(() => {
        onNavigate('otpVerification');
      }, 1000);
    } else {
      toast.error('Please fix the errors in the form');
    }
  };

  const handleBack = () => {
    onNavigate('selectUserType');
  };

  return (
    <div className="bg-white min-h-screen flex relative overflow-hidden">
      {/* Left Section - Purple Background */}
      <div className="w-[49%] bg-[#E5DEFF] relative flex items-center justify-center py-12">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute left-12 top-8 flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center">
            <ArrowLeft size={16} className="text-black" />
          </div>
          <span className="text-black text-sm">back</span>
        </button>

        {/* Black Panel */}
        <div className="bg-black w-[75%] h-[450px] flex flex-col justify-center px-12">
          <h1 className="text-white text-[40px] mb-0">Hi</h1>
          <h1 className="text-white text-[40px] mb-4">Sign up</h1>
          <p className="text-white text-[16px]">
            Please continue signing up as {getAccountTypeText()}
          </p>
        </div>
      </div>

      {/* Right Section - White Background */}
      <div className="w-[51%] bg-white flex items-center justify-center py-12 relative">
        {/* Form Container */}
        <div className="w-[400px]">
          <h2 className="text-[24px] text-black mb-8">Create Account</h2>

          {/* Business Name */}
          <div className="mb-6">
            <label className="text-[#333] text-[12px] mb-2 block">
              {getNameFieldLabel()} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value);
                if (errors.businessName) {
                  setErrors({ ...errors, businessName: undefined });
                }
              }}
              placeholder={getNamePlaceholder()}
              className="w-full px-4 py-3 border border-gray-300 rounded text-[14px] outline-none focus:border-[#8363f2] transition-colors"
            />
            {errors.businessName && (
              <p className="text-red-500 text-[11px] mt-1">{errors.businessName}</p>
            )}
          </div>

          {/* Business Email */}
          <div className="mb-6">
            <label className="text-[#333] text-[12px] mb-2 block">
              {getEmailFieldLabel()} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={businessEmail}
              onChange={(e) => {
                setBusinessEmail(e.target.value);
                if (errors.businessEmail) {
                  setErrors({ ...errors, businessEmail: undefined });
                }
              }}
              placeholder={getEmailPlaceholder()}
              className="w-full px-4 py-3 border border-gray-300 rounded text-[14px] outline-none focus:border-[#8363f2] transition-colors"
            />
            {errors.businessEmail && (
              <p className="text-red-500 text-[11px] mt-1">{errors.businessEmail}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-[#333] text-[12px] mb-2 block">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: undefined });
                  }
                }}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded text-[14px] outline-none focus:border-[#8363f2] transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-600" />
                ) : (
                  <Eye size={18} className="text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-[11px] mt-1">{errors.password}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="mb-6 flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => {
                setAcceptedTerms(e.target.checked);
                if (errors.terms) {
                  setErrors({ ...errors, terms: undefined });
                }
              }}
              className="w-4 h-4 accent-[#8363f2] cursor-pointer"
            />
            <label htmlFor="terms" className="text-[12px] text-black cursor-pointer">
              I accept the policy and terms
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-[11px] -mt-4 mb-4">{errors.terms}</p>
          )}

          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
            className="w-full bg-[#8363f2] text-white py-3 rounded text-[14px] text-center hover:bg-[#7354e1] transition-colors mb-4"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p className="text-center text-[12px] text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-[#8363f2] hover:underline"
            >
              Login here
            </button>
          </p>
        </div>

        {/* Purple Gradient Bottom Right */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[200px] overflow-hidden pointer-events-none">
          <div 
            className="absolute -bottom-20 -right-20 w-[500px] h-[300px]"
            style={{
              background: 'linear-gradient(135deg, #8363f2 0%, #5b3cc4 100%)',
              clipPath: 'polygon(100% 60%, 100% 100%, 0% 100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}