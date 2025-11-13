import { useState } from 'react';
import { X, ChevronRight, User, Store, Building2 } from 'lucide-react';
const exampleImage = "https://via.placeholder.com/400x300?text=Image";

interface SignUpProps {
  onNavigateToLogin: () => void;
}

export default function SignUp({ onNavigateToLogin }: SignUpProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTypeSelection = (type: string) => {
    setSelectedType(type);
    // Simulate navigation or registration flow
    setTimeout(() => {
      console.log(`Selected user type: ${type}`);
    }, 300);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 py-8">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-lg shadow-xl border-4 border-[#E5D4F7]">
        {/* Left Panel */}
        <div className="w-1/2 bg-[#E5D4F7] p-8 flex flex-col relative min-h-[600px]">
          <button 
            onClick={onNavigateToLogin}
            className="w-8 h-8 rounded-full border-2 border-gray-700 flex items-center justify-center text-gray-700 hover:bg-white/20 transition-colors mb-8"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto">
            <img 
              src={exampleImage} 
              alt="Savings illustration" 
              className="w-56 h-56 object-contain mb-6"
            />
            
            <p className="text-center text-gray-800 mb-10 text-sm">
              Start your own savings group or join one. Everyone contributes based on shared rules. Everyone win
            </p>
            
            {/* Progress Dots */}
            <div className="flex gap-2">
              <div className="w-12 h-1 bg-[#7C6FE8] rounded-full"></div>
              <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 bg-white flex flex-col items-center justify-center p-8 min-h-[600px]">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2L21 0L24 2L26 0L28 3L31 4L30 7L33 9L31 12L33 15L30 17L30 20L27 22L24 25L21 23L18 25L15 23L12 25L9 22L6 20L6 17L3 15L5 12L3 9L6 7L5 4L8 3L10 0L12 2L15 0L18 2Z" fill="url(#crownGradient2)" />
                  <path d="M18 10L19 8L20 10L21 9L22 11L24 11L23 13L25 14L23 15L25 17L23 18L23 20L21 21L20 23L19 22L18 23L17 22L16 23L15 21L13 20L13 18L11 17L13 15L11 14L13 13L12 11L14 11L15 9L16 10L17 8L18 10Z" fill="white" />
                  <defs>
                    <linearGradient id="crownGradient2" x1="18" y1="0" x2="18" y2="25" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9B7FED" />
                      <stop offset="1" stopColor="#6366F1" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="bg-gradient-to-r from-[#9B7FED] to-[#7C6FE8] bg-clip-text text-transparent">
                  Kash Contact
                </span>
              </div>
            </div>

            {/* Sign Up Content */}
            <div className="text-center mb-6">
              <h1 className="text-gray-900 mb-1">Sign Up</h1>
              <p className="text-gray-500 text-sm">it's easier to sign up now</p>
            </div>

            {/* Sign Up Options */}
            <div className="space-y-3">
              {/* As User */}
              <button 
                onClick={() => handleTypeSelection('user')}
                className={`w-full bg-[#E5D4F7] hover:bg-[#D5C4E7] rounded-lg p-4 flex items-center gap-3 transition-all group ${
                  selectedType === 'user' ? 'ring-2 ring-[#7C6FE8] shadow-lg' : ''
                }`}
              >
                <div className="w-11 h-11 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-[#7C6FE8]" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-gray-900 mb-0.5 text-sm">As User</h3>
                  <p className="text-xs text-gray-600">Create or join savings groups to reach your financial goal together.</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0 transition-colors" />
              </button>

              {/* As Vendor */}
              <button 
                onClick={() => handleTypeSelection('vendor')}
                className={`w-full bg-white hover:bg-gray-50 rounded-lg p-4 flex items-center gap-3 border border-gray-200 transition-all group ${
                  selectedType === 'vendor' ? 'ring-2 ring-[#7C6FE8] shadow-lg' : ''
                }`}
              >
                <div className="w-11 h-11 bg-[#E5D4F7] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Store className="w-5 h-5 text-[#7C6FE8]" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-gray-900 mb-0.5 text-sm">As Vendor</h3>
                  <p className="text-xs text-gray-600">Offer your services or product to savings groups and get paid securely.</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0 transition-colors" />
              </button>

              {/* As Corporate */}
              <button 
                onClick={() => handleTypeSelection('corporate')}
                className={`w-full bg-[#2D1B4E] hover:bg-[#3D2B5E] rounded-lg p-4 flex items-center gap-3 transition-all group ${
                  selectedType === 'corporate' ? 'ring-2 ring-[#7C6FE8] shadow-lg' : ''
                }`}
              >
                <div className="w-11 h-11 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-[#7C6FE8]" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white mb-0.5 text-sm">As Corporate</h3>
                  <p className="text-xs text-gray-300">Manage multiples group and campaigns with advanced business tool.</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white flex-shrink-0 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
