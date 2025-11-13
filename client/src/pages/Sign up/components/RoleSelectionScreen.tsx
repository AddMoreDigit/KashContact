import { ChevronRight, ArrowLeft } from 'lucide-react';

const illustration = "https://via.placeholder.com/400x400?text=Savings+Illustration";

interface RoleSelectionScreenProps {
  onSelectRole: (role: 'user' | 'vendor' | 'corporate') => void;
}

export function RoleSelectionScreen({ onSelectRole }: RoleSelectionScreenProps) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#E8E3F3] p-12 flex flex-col justify-between relative">
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <img 
            src={illustration} 
            alt="Savings illustration" 
            className="w-64 h-64 object-contain mb-8"
          />
          
          <p className="text-center text-gray-700 max-w-xs">
            Start your own savings group or join one. Everyone contributes based on shared rules. Everyone win
          </p>
        </div>

        {/* Pagination dots */}
        <div className="flex gap-2 justify-center">
          <div className="w-10 h-1 bg-[#7C3AED] rounded"></div>
          <div className="w-10 h-1 bg-gray-300 rounded"></div>
          <div className="w-10 h-1 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L20 10L28 12L20 14L16 22L12 14L4 12L12 10L16 2Z" fill="#7C3AED"/>
                <rect x="12" y="20" width="8" height="10" rx="1" fill="#7C3AED"/>
              </svg>
            </div>
            <span className="text-gray-800">Kash Contact</span>
          </div>

          {/* Title */}
          <h1 className="text-gray-900 mb-2">Sign Up</h1>
          <p className="text-gray-500 mb-8">It's easier to sign up now</p>

          {/* Role Options */}
          <div className="space-y-4">
            {/* As User */}
            <button
              onClick={() => onSelectRole('user')}
              className="w-full p-4 rounded-lg border border-gray-200 flex items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#E8E3F3] flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" fill="#7C3AED"/>
                  <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21H4V20Z" fill="#7C3AED"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-gray-900">As User</div>
                <div className="text-gray-500 text-sm">Create or join savings groups to reach your financial goal together.</div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </button>

            {/* As Vendor */}
            <button
              onClick={() => onSelectRole('vendor')}
              className="w-full p-4 rounded-lg bg-[#E8E3F3] flex items-center gap-4 hover:bg-[#ddd4f0] transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="6" width="18" height="14" rx="2" fill="#7C3AED"/>
                  <path d="M3 10H21V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V10Z" fill="#9F7AEA"/>
                  <rect x="7" y="13" width="6" height="3" rx="1" fill="white"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-[#7C3AED]">As Vendor</div>
                <div className="text-[#9F7AEA] text-sm">Offer your services or product to savings groups and get paid securely</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#7C3AED] flex-shrink-0" />
            </button>

            {/* As Corporate */}
            <button
              onClick={() => onSelectRole('corporate')}
              className="w-full p-4 rounded-lg border border-gray-200 flex items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="16" rx="2" fill="white"/>
                  <rect x="8" y="8" width="3" height="3" fill="#1F2937"/>
                  <rect x="13" y="8" width="3" height="3" fill="#1F2937"/>
                  <rect x="8" y="13" width="3" height="3" fill="#1F2937"/>
                  <rect x="13" y="13" width="3" height="3" fill="#1F2937"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-gray-900">As Corporate</div>
                <div className="text-gray-500 text-sm">Manage multiple groups and campaigns with advanced business tool.</div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
