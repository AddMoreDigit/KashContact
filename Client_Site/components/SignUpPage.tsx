import { useState } from 'react';
import { ArrowLeft, User, Store, Building2, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'signup' | 'vendorSignup';

interface SignUpPageProps {
  onNavigate: (page: Page) => void;
  onSignUp?: (accountType: 'user' | 'vendor' | 'corporate') => void;
}

export function SignUpPage({ onNavigate, onSignUp }: SignUpPageProps) {
  const [selectedType, setSelectedType] = useState<'user' | 'vendor' | 'corporate' | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSelectType = (type: 'user' | 'vendor' | 'corporate') => {
    setSelectedType(type);
    // Navigate to detailed signup page for all account types
    setTimeout(() => {
      onSignUp(type);
    }, 300);
  };

  const slides = [
    {
      title: 'Start your own savings group or join one. Everyone contributes based on shared rules. Everyone win'
    },
    {
      title: 'Reach your financial goals together with your community'
    },
    {
      title: 'Get paid securely for your services from savings groups'
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Purple Background with Illustration */}
      <div className="w-1/2 bg-[#E8D9F5] relative flex flex-col items-center justify-between p-12 py-16">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('selectUserType')}
          className="absolute top-8 left-8 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-300"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </button>

        {/* Illustration */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-sm">
            <img
              src="https://images.unsplash.com/photo-1658574255676-2b8326e23fa0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjM0ODg0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Financial planning illustration"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full max-w-md text-center px-4">
          <p className="text-gray-800 text-sm mb-8 leading-relaxed">
            {slides[currentSlide].title}
          </p>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-12 bg-purple-600'
                    : 'w-12 bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - White Background with Options */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-12">
        {/* Logo */}
        <div className="mb-8">
          <Logo className="h-10" />
        </div>

        {/* Sign Up Heading */}
        <div className="text-center mb-10">
          <h1 className="text-2xl text-gray-900 mb-1">Sign Up</h1>
          <p className="text-sm text-gray-600">it's easier to sign up now</p>
        </div>

        {/* Account Type Options */}
        <div className="w-full max-w-md space-y-3">
          {/* As User */}
          <button
            onClick={() => handleSelectType('user')}
            className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between group hover:border-purple-400 hover:shadow-md ${
              selectedType === 'user' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selectedType === 'user' ? 'bg-purple-100' : 'bg-purple-100'
              }`}>
                <User size={24} className="text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="text-base text-gray-900 mb-0.5">As User</h3>
                <p className="text-xs text-gray-600">
                  Create or join savings groups to reach your financial goal together.
                </p>
              </div>
            </div>
            <ChevronRight
              size={20}
              className={`transition-colors ${
                selectedType === 'user' ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-600'
              }`}
            />
          </button>

          {/* As Vendor - HIGHLIGHTED */}
          <button
            onClick={() => handleSelectType('vendor')}
            className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between group hover:shadow-md ${
              selectedType === 'vendor' ? 'border-purple-600 bg-purple-50' : 'border-purple-200 bg-purple-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Store size={24} className="text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="text-base text-purple-600 mb-0.5">As Vendor</h3>
                <p className="text-xs text-purple-600">
                  Offer your services or product to savings groups and get paid securely.
                </p>
              </div>
            </div>
            <ChevronRight size={20} className="text-purple-600" />
          </button>

          {/* As Corporate */}
          <button
            onClick={() => handleSelectType('corporate')}
            className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between group hover:border-purple-400 hover:shadow-md ${
              selectedType === 'corporate' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selectedType === 'corporate' ? 'bg-purple-100' : 'bg-gray-900'
              }`}>
                <Building2 size={24} className={selectedType === 'corporate' ? 'text-purple-600' : 'text-white'} />
              </div>
              <div className="text-left">
                <h3 className="text-base text-gray-900 mb-0.5">As Corporate</h3>
                <p className="text-xs text-gray-600">
                  Manage multiples group and campaigns with advanced business tool.
                </p>
              </div>
            </div>
            <ChevronRight
              size={20}
              className={`transition-colors ${
                selectedType === 'corporate' ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-600'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}