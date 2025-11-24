import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Users, Plus } from 'lucide-react';

interface ReplaceContributorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contributorName: string;
  missedPayments?: number;
  onConfirm: (data: { newMemberEmail: string; reason: string; date: string; time: string }) => void;
}

export function ReplaceContributorDialog({ 
  open, 
  onOpenChange, 
  contributorName,
  missedPayments = 0,
  onConfirm 
}: ReplaceContributorDialogProps) {
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleConfirm = () => {
    onConfirm({ newMemberEmail, reason, date, time });
    // Reset form
    setNewMemberEmail('');
    setReason('');
    setDate('');
    setTime('');
  };

  const handleCancel = () => {
    setNewMemberEmail('');
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
          <DialogTitle className="text-xl">Replace Contributor</DialogTitle>
        </div>
        
        <DialogDescription className="sr-only">
          Replace a contributor with a new member to keep the campaign on track.
        </DialogDescription>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Banner */}
          <div className="bg-purple-100 rounded-lg p-4 flex items-start gap-3">
            <Users className="text-purple-600 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <p className="text-gray-900">
                Select a new Contributor to replace {contributorName} and keep the campaign on track.
              </p>
              <p className="text-gray-700 text-sm mt-1">
                This action will restrict their access until reactivated.
              </p>
            </div>
          </div>

          {/* Member Info */}
          <div>
            <p className="text-gray-900">
              {contributorName} {missedPayments > 0 && `Has Missed ${missedPayments} Payment${missedPayments > 1 ? 's' : ''}, Putting the campaign at Risk`}
            </p>
          </div>

          {/* Add Member Section */}
          <div className="space-y-2">
            <Label>Add member</Label>
            <div className="flex items-center gap-2">
              <Input
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="Search by Username or email"
                className="flex-1"
              />
              <Button 
                variant="outline" 
                size="sm"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <Plus size={16} className="mr-1" />
                Invite
              </Button>
            </div>
          </div>

          {/* Reason Input */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for replacement"
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
            className="px-8 bg-purple-600 hover:bg-purple-700 text-white"
          >
            Yes,Replace
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}