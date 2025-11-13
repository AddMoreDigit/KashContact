import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CancelCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: any;
}

export function CancelCampaignDialog({ open, onOpenChange, campaign }: CancelCampaignDialogProps) {
  if (!campaign) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Cancel Campaign</DialogTitle>
            <button 
              onClick={() => onOpenChange(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <DialogDescription>
            You are about to cancel cape town trip this action cannot be undone
          </DialogDescription>
        </DialogHeader>

        {/* Campaign Summary */}
        <div className="mb-6">
          <h3 className="mb-4">Campaign Summary</h3>
          
          <div className="space-y-3 mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Name</p>
              <p>{campaign.title}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Dates</p>
              <p>Nov 01,20 To Feb 10,2025</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Goal</p>
              <p>{campaign.goal}</p>
            </div>
          </div>

          {/* Contribution */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-gray-600">Contribution</p>
                <p className="text-lg">R10 000 Raised (70%)</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Progress</p>
              <Progress value={70} className="h-2" />
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm text-purple-900">
            Cancelling will notify Sponsor, Vendors and campaign member ,refund may apply
          </div>
        </div>

        {/* Cancellation Detail */}
        <div className="mb-6">
          <h3 className="mb-4">Cancellation Detail</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">Reason For Cancellation</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget constraints</SelectItem>
                  <SelectItem value="timeline">Timeline issues</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm mb-2 block">Notes (Optional)</label>
              <Textarea 
                className="min-h-[100px]"
                placeholder="Add any additional notes"
              />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="notify" />
              <label htmlFor="notify" className="text-sm">
                I understand participants will notify
              </label>
            </div>

            <div>
              <label className="text-sm mb-2 block">Type CANCEL to Confirm</label>
              <Input placeholder="Type CANCEL" />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button 
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Back
          </Button>
          <Button variant="destructive">
            Confirm Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
