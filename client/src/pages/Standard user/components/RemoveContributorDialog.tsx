import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { AlertTriangle, X } from 'lucide-react';
import removeContributorImg from 'figma:asset/52d394c8d2bb6ef5c062cd41efb8042e24b00b84.png';

interface RemoveContributorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReplace?: () => void;
}

export function RemoveContributorDialog({ open, onOpenChange, onReplace }: RemoveContributorDialogProps) {
  const [reason, setReason] = useState('');

  const handleRemove = () => {
    // Handle remove logic
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <DialogTitle>Remove Contributor</DialogTitle>
          <DialogDescription className="sr-only">
            Remove contributor from campaign
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-900 font-medium mb-1">
                Are you sure you want to remove this member?
              </p>
              <p className="text-red-700 text-sm">
                This action will restrict their access until reactivated
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="text-gray-700">
            Devine Bila Has Missed 2 Payment, Putting the campaign at Risk
          </div>

          {/* Reason Field */}
          <div>
            <label className="block text-gray-700 mb-2">Reason</label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for removal"
              className="min-h-[120px]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleRemove}
            className="bg-red-600 hover:bg-red-700"
          >
            Yes Remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
