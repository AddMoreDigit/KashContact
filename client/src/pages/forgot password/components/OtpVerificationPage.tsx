import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length < 5) {
      toast.error('Please enter all 5 digits');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('OTP verified successfully!');
      console.log('OTP:', otpCode);
      navigate('/create-password');
    }, 1500);
  };

  const handleRetry = () => {
    if (timer > 0) {
      toast.info('Please wait for the timer to expire');
      return;
    }
    
    setOtp(['', '', '', '', '']);
    setTimer(60); // Reset timer to 60 seconds
    inputRefs.current[0]?.focus();
    toast.success('New code sent to your email!');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
        <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span>back</span>
      </button>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl">Opt verification</h1>
            <p className="text-gray-600">please enter 6 digits sent to your email to proceed</p>
          </div>

          <div className="space-y-6">
            {/* OTP Input Boxes */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
                />
              ))}
            </div>

            {/* Label and Timer */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Enter verification Code</span>
              <span className="text-gray-900">{formatTime(timer)}</span>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleVerify}
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>
              <Button 
                onClick={handleRetry}
                variant="outline"
                disabled={timer > 0}
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {timer > 0 ? `Retry in ${formatTime(timer)}` : 'Retry'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
