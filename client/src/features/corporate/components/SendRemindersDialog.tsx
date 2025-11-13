import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SendRemindersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SendRemindersDialog({ open, onOpenChange }: SendRemindersDialogProps) {
  const recentReminders = [
    {
      dateSent: 'Aug 10',
      audience: 'Sponsors',
      campaign: 'Cape town Weekend',
      status: 'Sent',
      statusColor: 'bg-green-500'
    },
    {
      dateSent: 'Aug 15',
      audience: 'Vendors',
      campaign: 'Durban oceanview',
      status: 'Scheduled',
      statusColor: 'bg-blue-500'
    },
    {
      dateSent: 'Aug 20',
      audience: 'Members',
      campaign: 'Zanzibar Adventure',
      status: 'Failed',
      statusColor: 'bg-red-500'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Send Reminders</DialogTitle>
            <button 
              onClick={() => onOpenChange(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <DialogDescription>
            Set up your corporate campaign,assign package, invite members
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 mt-4">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <Label className="mb-3 block">Select campaign</Label>
              <Input placeholder="Select a campaign" />
            </div>

            <div>
              <h3 className="mb-3">Reminder Setup</h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="mb-3 block">Audience</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="sponsors" className="data-[state=checked]:bg-purple-600" />
                      <Label htmlFor="sponsors">Sponsors</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="vendors" className="data-[state=checked]:bg-purple-600" />
                      <Label htmlFor="vendors">Vendors</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="members" className="data-[state=checked]:bg-purple-600" />
                      <Label htmlFor="members">Members</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="all" />
                      <Label htmlFor="all">All</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Message</Label>
                  <div className="space-y-2">
                    <div className="p-3 border border-gray-200 rounded bg-gray-50 text-sm">
                      Reminder: Campaign end in 5 days.
                    </div>
                    <div className="p-3 border border-gray-200 rounded bg-gray-50 text-sm">
                      Reminder:Please Confirm your booking
                    </div>
                    <div className="p-3 border border-gray-200 rounded bg-gray-50 text-sm">
                      Reminder: contribution Pending.
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Schedule Reminder</Label>
                  <RadioGroup defaultValue="later">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="later" id="later" />
                      <Label htmlFor="later" className="flex items-center gap-2">
                        Schedule for later
                        <Input 
                          type="datetime-local" 
                          defaultValue="2025-08-12T12:00"
                          className="ml-2 w-48"
                        />
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Reminders */}
          <div>
            <h3 className="mb-3">Recent Reminders</h3>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-2 px-4 py-2 bg-gray-50 text-sm border-b border-gray-200">
                <div>Date sent</div>
                <div>Audience</div>
                <div>Campaign</div>
                <div>Status</div>
              </div>

              {/* Table Rows */}
              {recentReminders.map((reminder, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-2 px-4 py-3 border-b border-gray-100 text-sm last:border-b-0">
                  <div>{reminder.dateSent}</div>
                  <div>{reminder.audience}</div>
                  <div>{reminder.campaign}</div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${reminder.statusColor}`} />
                    <span>{reminder.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t mt-6">
          <Button 
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Back
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
