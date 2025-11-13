import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login successful!');
      // Simulate successful login - in real app, navigate after actual authentication
      console.log('Login attempted', { email, password });
    }, 1500);
  };

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

      {/* Left Section - Purple with Black Card */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-200 to-purple-300 p-12 relative">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>back</span>
        </button>

        <div className="m-auto bg-black text-white p-12 rounded-lg shadow-2xl max-w-md h-[420px] flex flex-col justify-center items-start">
          <h1 className="text-5xl mb-2">Hi</h1>
          <h2 className="text-4xl mb-4">Log In</h2>
          <p className="text-sm">Please continue Logging in as Corporate</p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        {/* Mobile back button */}
        <button 
          onClick={() => navigate(-1)}
          className="lg:hidden absolute top-8 left-8 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>back</span>
        </button>

        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <Shield className="w-8 h-8 text-purple-600" />
            <span className="text-2xl text-purple-600">Kash Contact</span>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <h2 className="text-center text-3xl">Log In</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">User Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter user email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    className={`w-full pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-purple-600 hover:text-purple-700 block"
                >
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-600 hover:text-purple-700">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
