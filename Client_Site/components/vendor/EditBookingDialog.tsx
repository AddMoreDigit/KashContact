import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { VendorSidebar } from './VendorSidebar';

interface EditBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (page: any) => void;
  booking?: BookingData | null;
}

export interface BookingData {
  id: number;
  campaignDate: string;
  guestNames: string;
  campaignName: string;
  room: string;
  dining: string;
  status: string;
}

export function EditBookingDialog({ open, onOpenChange, onNavigate, booking }: EditBookingDialogProps) {
  const [campaignDate, setCampaignDate] = useState(booking?.campaignDate || '');
  const [guestNames, setGuestNames] = useState(booking?.guestNames || '');
  const [campaignName, setCampaignName] = useState(booking?.campaignName || '');
  const [room, setRoom] = useState(booking?.room || '');
  const [dining, setDining] = useState(booking?.dining || '');
  const [status, setStatus] = useState(booking?.status || '');
  const [notifyMembers, setNotifyMembers] = useState(false);
  const [notifyDateOnly, setNotifyDateOnly] = useState(false);

  if (!open) return null;

  const handleSaveChanges = () => {
    toast.success('Booking updated successfully!');
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex">
      {/* Sidebar */}
      <VendorSidebar currentPage="dashboard" onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <h2 className="text-black">Edit Booking</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6 max-w-2xl">
          {/* Campaign Date */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Campaign Date
            </label>
            <input
              type="date"
              value={campaignDate}
              onChange={(e) => setCampaignDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Guest Name/Best Names */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Guest Name/Best Names
            </label>
            <input
              type="text"
              value={guestNames}
              onChange={(e) => setGuestNames(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
              placeholder=""
            />
          </div>

          {/* Campaign Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Campaign Name
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
              placeholder=""
            />
          </div>

          {/* Room */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Room
            </label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
              placeholder=""
            />
          </div>

          {/* Dining */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Dining
            </label>
            <input
              type="text"
              value={dining}
              onChange={(e) => setDining(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
              placeholder=""
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Status
            </label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
              placeholder=""
            />
          </div>

          {/* Notification Checkboxes */}
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notifyMembers"
                checked={notifyMembers}
                onChange={(e) => setNotifyMembers(e.target.checked)}
                className="w-4 h-4 accent-purple-600"
              />
              <label htmlFor="notifyMembers" className="text-sm text-gray-700 cursor-pointer">
                Notify campaign members for these changes
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notifyDateOnly"
                checked={notifyDateOnly}
                onChange={(e) => setNotifyDateOnly(e.target.checked)}
                className="w-4 h-4 accent-purple-600"
              />
              <label htmlFor="notifyDateOnly" className="text-sm text-gray-700 cursor-pointer">
                Notify campaign date only for these changes
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => onOpenChange(false)}
              className="px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-6 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
