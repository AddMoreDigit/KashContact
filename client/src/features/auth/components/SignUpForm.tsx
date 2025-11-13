import { ArrowLeft, Eye } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface SignUpFormProps {
  onBack: () => void;
  onSignUp: (data: SignUpData) => void;
}

export interface SignUpData {
  businessName: string;
  businessEmail: string;
  password: string;
  acceptedTerms: boolean;
}

export function SignUpForm({ onBack, onSignUp }: SignUpFormProps) {
  const [formData, setFormData] = useState<SignUpData>({
    businessName: '',
    businessEmail: '',
    password: '',
    acceptedTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(formData);
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
            <h1 className="text-white mb-4">Hi</h1>
            <h2 className="text-white mb-2">Sign up</h2>
            <p className="text-white">Please continue signing up as Vendor</p>
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
          <h2 className="text-gray-900 mb-8">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label className="block text-gray-700 mb-2">
                Business Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Enter business name"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
                required
              />
            </div>

            {/* Business Email Address */}
            <div>
              <label className="block text-gray-700 mb-2">
                Business Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="Enter business email address"
                value={formData.businessEmail}
                onChange={(e) =>
                  setFormData({ ...formData, businessEmail: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={formData.acceptedTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, acceptedTerms: checked as boolean })
                }
              />
              <label htmlFor="terms" className="text-gray-700 text-sm cursor-pointer">
                I accept the policy and terms
              </label>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
              disabled={!formData.acceptedTerms}
            >
              Sign Up
            </Button>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <a href="#" className="text-[#7C3AED]">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
