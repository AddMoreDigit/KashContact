import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';

interface EditBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking?: {
    campaignDate: string;
    guestNames: string;
    campaignName: string;
    room: string;
    dining: string;
    status: string;
  };
}

export function EditBookingDialog({ open, onOpenChange, booking }: EditBookingDialogProps) {
  const [campaignDate, setCampaignDate] = useState(booking?.campaignDate || '');
  const [guestNames, setGuestNames] = useState(booking?.guestNames || '');
  const [campaignName, setCampaignName] = useState(booking?.campaignName || '');
  const [room, setRoom] = useState(booking?.room || '');
  const [dining, setDining] = useState(booking?.dining || '');
  const [status, setStatus] = useState(booking?.status || '');
  const [notifyMembers, setNotifyMembers] = useState(false);
  const [notifyAdminOnly, setNotifyAdminOnly] = useState(false);

  const handleSaveChanges = () => {
    // Handle booking update logic here
    console.log('Saving booking changes:', {
      campaignDate,
      guestNames,
      campaignName,
      room,
      dining,
      status,
      notifyMembers,
      notifyAdminOnly,
    });
    
    // Close dialog
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setCampaignDate(booking?.campaignDate || '');
    setGuestNames(booking?.guestNames || '');
    setCampaignName(booking?.campaignName || '');
    setRoom(booking?.room || '');
    setDining(booking?.dining || '');
    setStatus(booking?.status || '');
    setNotifyMembers(false);
    setNotifyAdminOnly(false);
    
    // Close dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] p-0">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>
              Update booking details and notify relevant parties of changes.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaignDate">Campaign Date</Label>
              <Input
                id="campaignDate"
                type="date"
                value={campaignDate}
                onChange={(e) => setCampaignDate(e.target.value)}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestNames">Guest Name/Guest Names</Label>
              <Input
                id="guestNames"
                value={guestNames}
                onChange={(e) => setGuestNames(e.target.value)}
                className="h-10"
                placeholder="Enter guest names"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input
                id="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="h-10"
                placeholder="Enter campaign name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="room">Room</Label>
              <Input
                id="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="h-10"
                placeholder="Enter room details"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dining">Dining</Label>
              <Input
                id="dining"
                value={dining}
                onChange={(e) => setDining(e.target.value)}
                className="h-10"
                placeholder="Enter dining details"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="h-10">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notifyMembers"
                  checked={notifyMembers}
                  onCheckedChange={(checked) => setNotifyMembers(checked as boolean)}
                />
                <label
                  htmlFor="notifyMembers"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Notify campaign members for these changes
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notifyAdminOnly"
                  checked={notifyAdminOnly}
                  onCheckedChange={(checked) => setNotifyAdminOnly(checked as boolean)}
                />
                <label
                  htmlFor="notifyAdminOnly"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Notify campaign Admin only for these changes
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="h-9 px-4"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveChanges}
              className="h-9 px-6 bg-purple-600 hover:bg-purple-700"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
