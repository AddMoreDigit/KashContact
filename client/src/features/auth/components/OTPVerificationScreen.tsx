import { ArrowLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface OTPVerificationScreenProps {
  onBack: () => void;
  onVerify: (otp: string) => void;
  email: string;
}

export function OTPVerificationScreen({ onBack, onVerify, email }: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length === 5) {
      onVerify(otpString);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel */}
      <div className="w-5/12 bg-[#E8E3F3] p-12 flex flex-col relative">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-700 mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>back</span>
        </button>

        <div className="flex-1 flex items-center justify-center">
          <div className="bg-black p-12 rounded-lg max-w-sm">
            <h1 className="text-white mb-4">Verification</h1>
            <p className="text-white">Please enter the 6 digits sent to your email.</p>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-full h-24">
          <svg
            viewBox="0 0 400 100"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 100 L400 100 L400 50 Q300 20 200 40 Q100 60 0 30 Z"
              fill="#7C3AED"
            />
          </svg>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-7/12 p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-gray-900 mb-2">Opt verification</h2>
          <p className="text-gray-500 mb-8">
            an opt has been sent to join **********{email}
          </p>

          {/* OTP Input */}
          <div className="flex gap-3 mb-6">
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
                className="w-14 h-14 border-2 border-gray-300 rounded-lg text-center focus:border-[#7C3AED] focus:outline-none"
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-gray-900 mb-8">0:{timer.toString().padStart(2, '0')}</div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={otp.join('').length !== 5}
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
          >
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
}
