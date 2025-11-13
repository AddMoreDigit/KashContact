import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    if (!email) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Please enter a valid email';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      toast.error(emailError);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Verification code sent to your email!');
      console.log('Password reset requested for:', email);
      navigate('/otp-verification');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-white">
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

      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>back</span>
      </button>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl">Forgot password</h1>
            <p className="text-gray-600">Please enter email address to reset password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">User Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter user email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className={`w-full ${error ? 'border-red-500' : ''}`}
              />
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Continue'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
