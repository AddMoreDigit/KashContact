import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Info, X } from 'lucide-react';

interface RefundContributorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RefundContributorDialog({ open, onOpenChange }: RefundContributorDialogProps) {
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleRefund = () => {
    // Handle refund logic
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
          <DialogTitle>Refund Contributor</DialogTitle>
          <DialogDescription className="sr-only">
            Issue a refund to contributor
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Info Message */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-purple-900 font-medium mb-1">
                You're about to issue a refund to Devine Bila
              </p>
              <p className="text-purple-700 text-sm">
                This action will restrict their access until reactivated
              </p>
            </div>
          </div>

          {/* Refund Amount */}
          <div className="text-gray-900">
            You about to refund R200.00
          </div>

          {/* Reason Field */}
          <div>
            <label className="block text-gray-700 mb-2">Reason for Refund</label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for refund"
              className="min-h-[80px]"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Time</label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
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
            onClick={handleRefund}
            className="bg-green-600 hover:bg-green-700"
          >
            Yes Refund
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
