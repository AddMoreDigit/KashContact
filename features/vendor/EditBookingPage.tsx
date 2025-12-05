import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, Menu } from 'lucide-react';
import { toast } from 'sonner';
import { VendorSidebar } from './components/VendorSidebar';

type Page = 'dashboard' | 'campaigns' | 'services' | 'transactions' | 'profile' | 'overview' | 'draft' | 'editBooking' | 'approveBooking';

interface EditBookingPageProps {
  onNavigate: (page: Page) => void;
}

export function EditBookingPage({ onNavigate }: EditBookingPageProps) {
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [campaignDate, setCampaignDate] = useState('');
  const [guestNames, setGuestNames] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [room, setRoom] = useState('');
  const [dining, setDining] = useState('');
  const [status, setStatus] = useState('');
  const [notifyCampaignMembers, setNotifyCampaignMembers] = useState(false);
  const [notifyAdminOnly, setNotifyAdminOnly] = useState(false);

  const handleSaveChanges = () => {
    if (!campaignDate || !guestNames || !campaignName) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Booking updated successfully!');
    if (notifyCampaignMembers) {
      toast.info('Campaign members have been notified');
    }
    if (notifyAdminOnly) {
      toast.info('Campaign admin has been notified');
    }
  };

  const handleCancel = () => {
    onNavigate('dashboard');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <VendorSidebar currentPage={activePage} onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Menu and Search */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu className="w-5 h-5 text-gray-700" />
              </button>
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              <button className="px-6 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors">
                Create
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 max-w-2xl">
          <h1 className="text-2xl mb-8">Edit Booking</h1>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            {/* Campaign Date */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Campaign Date</label>
              <input
                type="text"
                value={campaignDate}
                onChange={(e) => setCampaignDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-purple-500 transition-colors"
                placeholder=""
              />
            </div>

            {/* Guest Names/Best Names */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Guest Names/Best Names</label>
              <input
                type="text"
                value={guestNames}
                onChange={(e) => setGuestNames(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-purple-500 transition-colors"
                placeholder=""
              />
            </div>

            {/* Campaign Name */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Campaign Name</label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-purple-500 transition-colors"
                placeholder=""
              />
            </div>

            {/* Room */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Room</label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-purple-500 transition-colors"
                placeholder=""
              />
            </div>

            {/* Dining */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Dining</label>
              <input
                type="text"
                value={dining}
                onChange={(e) => setDining(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-purple-500 transition-colors"
                placeholder=""
              />
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Status</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-purple-500 transition-colors"
                placeholder=""
              />
            </div>

            {/* Checkboxes */}
            <div className="mb-6 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyCampaignMembers}
                  onChange={(e) => setNotifyCampaignMembers(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Notify campaign members for these changes</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyAdminOnly}
                  onChange={(e) => setNotifyAdminOnly(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Notify campaign Admin only for these changes</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

