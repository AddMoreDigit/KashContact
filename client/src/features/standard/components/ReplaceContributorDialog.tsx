import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';
const replaceContributorImg = "https://via.placeholder.com/400x300?text=Image";

interface ReplaceContributorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReplaceContributorDialog({ open, onOpenChange }: ReplaceContributorDialogProps) {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleReplace = () => {
    // Handle replace logic
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
          <DialogTitle>Replace Contributor</DialogTitle>
          <DialogDescription className="sr-only">
            Replace contributor with a new member
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Info Message */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-purple-900 font-medium mb-1">
              💡 Select a new Contributor to replace Devine Bila and keep the campaign on track.
            </p>
            <p className="text-purple-700 text-sm">
              This action will restrict their access until reactivated.
            </p>
          </div>

          {/* Details */}
          <div className="text-gray-700">
            Devine Bila Has Missed 2 Payment, Putting the campaign at Risk
          </div>

          {/* Add Member Section */}
          <div>
            <label className="block text-gray-900 mb-2">Add member</label>
            <div className="flex gap-2">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Search by Username or email"
                className="flex-1"
              />
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-1" />
                Invite
              </Button>
            </div>
          </div>

          {/* Reason Field */}
          <div>
            <label className="block text-gray-700 mb-2">Reason</label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for replacement"
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
            onClick={handleReplace}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Yes Replace
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
