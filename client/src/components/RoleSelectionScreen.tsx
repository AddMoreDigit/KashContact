import { ChevronRight, ArrowLeft } from 'lucide-react';
import { SavingsIllustration } from './SavingsIllustration';

interface RoleSelectionScreenProps {
  onSelectRole: (role: 'user' | 'vendor' | 'corporate') => void;
}

export function RoleSelectionScreen({ onSelectRole }: RoleSelectionScreenProps) {
  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#F3F0F9] p-12 flex flex-col justify-between relative rounded-r-3xl">
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <SavingsIllustration />
          
          <h2 className="text-xl font-medium text-gray-700 text-center max-w-sm mt-8">
            Start your own savings group or join one. Everyone contributes based on shared rules. Everyone win
          </h2>
        </div>

        {/* Pagination dashes */}
        <div className="flex gap-2 justify-center">
          <div className="w-8 h-1.5 bg-kash-purple-default rounded-sm"></div>
          <div className="w-8 h-1.5 bg-gray-300 rounded-sm"></div>
          <div className="w-8 h-1.5 bg-gray-300 rounded-sm"></div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 13.2L33.6 6H14.4L24 13.2Z" fill="url(#logo-gradient)"/>
                <path d="M12 10.8V34.8L24 42L36 34.8V10.8L24 18L12 10.8Z" fill="url(#logo-gradient)"/>
                <defs>
                  <linearGradient id="logo-gradient" x1="24" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A855F7"/>
                    <stop offset="1" stopColor="#6D28D9"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-3xl font-bold text-gray-800">
              Kash Contact
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sign Up</h1>
          <p className="text-gray-500 mb-10 text-lg">it's easier to sign up now</p>

          {/* Role Options */}
          <div className="space-y-4">
            {/* As User */}
            <button
              onClick={() => onSelectRole('user')}
              className="w-full p-5 rounded-2xl border-2 border-gray-200 flex items-center gap-5 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
            >
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" fill="#7C3AED"/>
                  <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21H4V20Z" fill="#7C3AED"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-lg font-semibold text-gray-800">As User</div>
                <div className="text-base text-gray-500">Create or join savings groups to reach your financial goal together.</div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-purple-500" />
            </button>

            {/* As Vendor - Highlighted */}
            <button
              onClick={() => onSelectRole('vendor')}
              className="w-full p-5 rounded-2xl bg-kash-purple-light border-2 border-transparent flex items-center gap-5 transition-all duration-200 group"
            >
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9.5L12 4L21 9.5V20H3V9.5Z" fill="#A78BFA"/>
                  <path d="M19 20H5V10L12 6L19 10V20Z" stroke="#7C3AED" strokeWidth="1.5"/>
                  <path d="M10 14H14V18H10V14Z" fill="white"/>
                  <path d="M12 12V16" stroke="#7C3AED" strokeWidth="1.5"/>
                  <path d="M10 14H14" stroke="#7C3AED" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-lg font-semibold text-purple-800">As Vendor</div>
                <div className="text-base text-purple-600">Offer your services or product to savings groups and get paid securely.</div>
              </div>
              <ChevronRight className="w-6 h-6 text-purple-500 flex-shrink-0" />
            </button>

            {/* As Corporate */}
            <button
              onClick={() => onSelectRole('corporate')}
              className="w-full p-5 rounded-2xl border-2 border-gray-200 flex items-center gap-5 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
            >
              <div className="w-14 h-14 rounded-xl bg-gray-800 flex items-center justify-center flex-shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="16" rx="2" fill="white"/>
                  <rect x="8" y="8" width="2" height="2" fill="#1F2937"/>
                  <rect x="14" y="8" width="2" height="2" fill="#1F2937"/>
                  <rect x="8" y="12" width="2" height="2" fill="#1F2937"/>
                  <rect x="14" y="12" width="2" height="2" fill="#1F2937"/>
                  <rect x="8" y="16" width="8" height="2" fill="#1F2937"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-lg font-semibold text-gray-800">As Corporate</div>
                <div className="text-base text-gray-500">Manage multiples group and campaigns with advanced business tool.</div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
