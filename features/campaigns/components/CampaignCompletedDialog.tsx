import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { CheckCircle2, X } from 'lucide-react';

interface CampaignCompletedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: () => void;
}

export function CampaignCompletedDialog({ open, onOpenChange, onNext }: CampaignCompletedDialogProps) {
  const handleNext = () => {
    onOpenChange(false);
    onNext();
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
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-gray-900">Great Job</DialogTitle>
            <DialogDescription className="text-gray-600">
              Your Campaign is Completed
            </DialogDescription>
          </DialogHeader>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            className="w-full bg-purple-600 hover:bg-purple-700 mt-8"
          >
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
