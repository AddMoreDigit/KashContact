import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Calendar } from '../../../components/ui/calendar';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomName: string;
  price: string;
  onConfirm?: () => void;
}

export function BookingDialog({ open, onOpenChange, roomName, price, onConfirm }: BookingDialogProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  // Mock data for booked/reserved dates
  const bookedDates = [2, 9, 16, 23];
  const reservedDates = [10, 17, 24];
  const availableDates = [3, 4, 11, 18, 25];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Seaview Suite-Standard</DialogTitle>
          <DialogDescription>
            R1 500.00 Per Night
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-gray-600 mb-2">March 2025</p>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded"></div>
              <span className="text-gray-600">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-300 rounded"></div>
              <span className="text-gray-600">Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-100 rounded"></div>
              <span className="text-gray-600">Available</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-4">
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={handleConfirm}
            >
              Confirm Booking
            </Button>
            <Button 
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}