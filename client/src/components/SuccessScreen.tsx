import { Button } from './ui/button';

interface SuccessScreenProps {
  onExploreDashboard: () => void;
}

export function SuccessScreen({ onExploreDashboard }: SuccessScreenProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Black Header Section */}
        <div className="bg-black text-white py-16 px-12 text-center rounded-t-lg">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 12L18 34L8 24"
                stroke="#22C55E"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-white mb-3">Congratulation</h2>
          <p className="text-white">Your account is set up and ready to go.</p>
        </div>

        {/* White Content Section */}
        <div className="bg-white py-12 px-12 rounded-b-lg border-x border-b border-gray-200">
          <p className="text-gray-900 mb-4">You can now:</p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-gray-900">•</span>
              <span>Join or create savings campaigns</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-gray-900">•</span>
              <span>Track your progress toward your goals</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-gray-900">•</span>
              <span>Access vendor services and exclusive vouchers</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-gray-900">•</span>
              <span>Connect with your community — stress-free</span>
            </li>
          </ul>

          <Button
            onClick={onExploreDashboard}
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-6"
          >
            Explore Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
