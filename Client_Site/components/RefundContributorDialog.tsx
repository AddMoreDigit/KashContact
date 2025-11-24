import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { DollarSign } from 'lucide-react';

interface RefundContributorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contributorName: string;
  refundAmount: number;
  onConfirm: (data: { reason: string; date: string; time: string }) => void;
}

export function RefundContributorDialog({ 
  open, 
  onOpenChange, 
  contributorName,
  refundAmount,
  onConfirm 
}: RefundContributorDialogProps) {
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleConfirm = () => {
    onConfirm({ reason, date, time });
    // Reset form
    setReason('');
    setDate('');
    setTime('');
  };

  const handleCancel = () => {
    setReason('');
    setDate('');
    setTime('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <DialogTitle className="text-xl">Refund Contributor</DialogTitle>
        </div>
        
        <DialogDescription className="sr-only">
          Issue a refund to a contributor. This action will restrict their access until reactivated.
        </DialogDescription>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Banner */}
          <div className="bg-purple-100 rounded-lg p-4 flex items-start gap-3">
            <DollarSign className="text-purple-600 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <p className="text-gray-900">
                You're about to issue a refund to {contributorName}
              </p>
              <p className="text-gray-700 text-sm mt-1">
                This action will restrict their access until reactivated.
              </p>
            </div>
          </div>

          {/* Refund Amount */}
          <div>
            <p className="text-gray-900">
              You about to refund R{refundAmount.toFixed(2)}
            </p>
          </div>

          {/* Reason Input */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Refund</Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for refund"
              className="w-full"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full"
              />
            </div>
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
            className="px-8 bg-green-600 hover:bg-green-700 text-white"
          >
            Yes,Refund
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}