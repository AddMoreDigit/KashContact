import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { AlertTriangle } from 'lucide-react';

interface RemoveContributorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contributorName: string;
  contributorEmail?: string;
  missedPayments?: number;
  onConfirm: (reason: string) => void;
}

export function RemoveContributorDialog({ 
  open, 
  onOpenChange, 
  contributorName,
  contributorEmail,
  missedPayments = 0,
  onConfirm 
}: RemoveContributorDialogProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(reason);
    setReason('');
  };

  const handleCancel = () => {
    setReason('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <DialogTitle className="text-xl">Remove Contributor</DialogTitle>
        </div>
        
        <DialogDescription className="sr-only">
          Remove a contributor from the campaign. This action will restrict their access until reactivated.
        </DialogDescription>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Warning Banner */}
          <div className="bg-red-100 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <p className="text-gray-900">
                Are you sure you want to remove this member?
              </p>
              <p className="text-gray-700 text-sm mt-1">
                This action will restrict their access until reactivated
              </p>
            </div>
          </div>

          {/* Member Info */}
          <div>
            <p className="text-gray-900">
              {contributorName} {missedPayments > 0 && `Has Missed ${missedPayments} Payment${missedPayments > 1 ? 's' : ''}, Putting the campaign at Risk`}
            </p>
          </div>

          {/* Reason Input */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for removal"
              className="w-full"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="px-8 bg-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="px-8 bg-red-600 hover:bg-red-700 text-white"
          >
            Yes,Remove
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
