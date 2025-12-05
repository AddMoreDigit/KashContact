import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { CheckCircle2, X, Clock } from 'lucide-react';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign';

interface CampaignSubmittedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (page: Page) => void;
}

export function CampaignSubmittedDialog({ open, onOpenChange, onNavigate }: CampaignSubmittedDialogProps) {
  const handleGotIt = () => {
    onOpenChange(false);
    onNavigate('campaigns');
  };

  const handleBackToDashboard = () => {
    onOpenChange(false);
    onNavigate('dashboard');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500 z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
          {/* Success Icon */}
          <div className="mb-6 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>

          {/* Title & Description */}
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-gray-900">Campaign Created Successfully!</DialogTitle>
            <DialogDescription className="text-gray-600 text-sm max-w-xs">
              Your campaign is now <strong>pending vendor approval</strong>. We've notified the service providers. Once approved, you and your members can start contributing!
            </DialogDescription>
          </DialogHeader>

          {/* Status Badge */}
          <div className="mt-6 px-6 py-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-yellow-800">Status: Pending Approval</p>
              <p className="text-xs text-yellow-700">You'll be notified once the vendor responds</p>
            </div>
          </div>

          {/* Got it Button */}
          <Button
            onClick={handleGotIt}
            className="w-full bg-purple-600 hover:bg-purple-700 mt-8 mb-3"
          >
            Got it
          </Button>

          {/* Back to Dashboard Link */}
          <button
            onClick={handleBackToDashboard}
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            Back to dashboard
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
