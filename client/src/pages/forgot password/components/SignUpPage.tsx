import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Store, Building2, ChevronRight, Shield } from 'lucide-react';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { toast } from 'sonner';
import savingsIllustration from 'figma:asset/238390907324721c9582de56923f7daee483538d.png';

export default function SignUpPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const userTypes = [
    {
      icon: User,
      title: 'As User',
      description: 'Create or join savings groups to reach your financial goal together.',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: Store,
      title: 'As Vendor',
      description: 'Offer your services or product to savings groups and get paid securely.',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: Building2,
      title: 'As Corporate',
      description: 'Manage multiple groups and campaigns with advanced business tool.',
      color: 'bg-purple-900',
      iconColor: 'text-white',
      textColor: 'text-white',
    },
  ];

  return (
    <div className="min-h-screen flex relative overflow-x-hidden bg-white">
      {/* Decorative Purple Wave */}
      <div className="absolute bottom-0 left-0 w-full h-96 pointer-events-none">
        <svg
          viewBox="0 0 800 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 250L0 250C150 200 300 220 450 180C600 140 700 120 800 100L800 250L0 250Z"
            fill="url(#waveGradient)"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="100" x2="800" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9B7FED" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Left Section - Purple with Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-200 to-purple-300 p-12 relative">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </div>
        </button>

        <div className="m-auto text-center max-w-md space-y-6">
          <ImageWithFallback 
            src={savingsIllustration} 
            alt="Savings illustration"
            className="w-full max-w-sm mx-auto"
          />
          <p className="text-gray-800">
            Start your own savings group or join one. Everyone contributes based on shared rules. Everyone win
          </p>
          
          {/* Progress dots */}
          <div className="flex justify-center gap-2 pt-4">
            <div className="w-16 h-1 bg-purple-600 rounded"></div>
            <div className="w-16 h-1 bg-gray-400 rounded"></div>
            <div className="w-16 h-1 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>

      {/* Right Section - Sign Up Options */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        {/* Mobile back button */}
        <button 
          onClick={() => navigate(-1)}
          className="lg:hidden absolute top-8 left-8 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </div>
        </button>

        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Shield className="w-8 h-8 text-purple-600" />
            <span className="text-2xl text-purple-600">Kash Contact</span>
          </div>

          {/* Sign Up Header */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl">Sign Up</h1>
            <p className="text-gray-600">It's easier to sign up now</p>
          </div>

          {/* User Type Options */}
          <div className="space-y-4">
            {userTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    toast.success(`Selected ${type.title}! Redirecting to login...`);
                    console.log(`Selected: ${type.title}`);
                    setTimeout(() => navigate('/'), 1000);
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`w-full p-4 rounded-lg flex items-center gap-4 transition-all hover:shadow-lg hover:scale-[1.02] ${type.color}`}
                >
                  <div className={`p-3 rounded-lg ${type.color}`}>
                    <Icon className={`w-6 h-6 ${type.iconColor}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`${type.textColor || 'text-gray-900'}`}>{type.title}</h3>
                    <p className={`text-sm ${type.textColor ? 'text-purple-100' : 'text-gray-600'}`}>
                      {type.description}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${hoveredIndex === index ? 'translate-x-1' : ''} ${type.textColor || 'text-gray-400'}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
