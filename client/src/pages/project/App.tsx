import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import SignUp from './components/SignUp';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'signup'>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
  };

  if (currentPage === 'signup') {
    return <SignUp onNavigateToLogin={() => setCurrentPage('login')} />;
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 py-8">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg shadow-xl border-4 border-[#E5D4F7]">
        {/* Left Panel */}
        <div className="w-1/2 bg-[#E5D4F7] p-8 flex flex-col relative min-h-[600px]">
          <button 
            onClick={() => setCurrentPage('signup')}
            className="w-8 h-8 rounded-full border-2 border-gray-700 flex items-center justify-center text-gray-700 hover:bg-white/20 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-black text-white p-12 w-full max-w-[320px] min-h-[420px] flex flex-col justify-center">
              <div className="ml-8">
                <h1 className="mb-1">Hi</h1>
                <h2 className="mb-3">Log In</h2>
                <p className="text-sm">Please continue Logging in as Corporate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 bg-white flex flex-col relative overflow-hidden min-h-[600px]">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-sm">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2L21 0L24 2L26 0L28 3L31 4L30 7L33 9L31 12L33 15L30 17L30 20L27 22L24 25L21 23L18 25L15 23L12 25L9 22L6 20L6 17L3 15L5 12L3 9L6 7L5 4L8 3L10 0L12 2L15 0L18 2Z" fill="url(#crownGradient)" />
                  <path d="M18 10L19 8L20 10L21 9L22 11L24 11L23 13L25 14L23 15L25 17L23 18L23 20L21 21L20 23L19 22L18 23L17 22L16 23L15 21L13 20L13 18L11 17L13 15L11 14L13 13L12 11L14 11L15 9L16 10L17 8L18 10Z" fill="white" />
                  <defs>
                    <linearGradient id="crownGradient" x1="18" y1="0" x2="18" y2="25" gradientUnits="userSpaceOnUse">
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

            {/* Form */}
            <div>
              <h3 className="text-center mb-6 text-gray-900">Log In</h3>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-gray-700 text-xs">
                    User Email Address<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter user email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border-gray-300 text-sm h-9 focus:border-[#7C6FE8] focus:ring-[#7C6FE8]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-gray-700 text-xs">
                    Password<span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pr-10 bg-white border-gray-300 text-sm h-9 focus:border-[#7C6FE8] focus:ring-[#7C6FE8]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="text-right pt-1">
                    <button
                      type="button"
                      className="text-xs text-[#7C6FE8] hover:text-[#6B5FD8] hover:underline transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#7C6FE8] hover:bg-[#6B5FD8] text-white h-10 transition-all hover:shadow-lg"
                >
                  Log In
                </Button>

                <p className="text-center text-gray-600 text-xs pt-2">
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => setCurrentPage('signup')}
                    className="text-[#7C6FE8] hover:text-[#6B5FD8] hover:underline transition-colors"
                  >
                    Register here
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Decorative Purple Wave */}
        <div className="absolute bottom-0 right-0 w-full h-40 pointer-events-none">
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
      </div>
      </div>
    </div>
  );
}
