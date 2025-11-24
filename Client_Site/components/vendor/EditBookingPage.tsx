import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, Menu } from 'lucide-react';
import imgKcLogoWhite2Transparent1 from 'figma:asset/4b4bad59041302b06eae37218f1d3bd7c64d7d1e.png';
import { toast } from 'sonner@2.0.3';

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

  const handleNavigation = (page: string) => {
    setActivePage(page);
  };

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
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <img src={imgKcLogoWhite2Transparent1} alt="Logo" className="h-10" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <button
            onClick={() => handleNavigation('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'dashboard' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => handleNavigation('campaigns')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'campaigns' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Campaigns</span>
          </button>

          <button
            onClick={() => handleNavigation('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'services' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Services</span>
          </button>

          <button
            onClick={() => handleNavigation('transactions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'transactions' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>Transactions</span>
          </button>

          <button
            onClick={() => handleNavigation('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'profile' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Profile</span>
          </button>

          <button
            onClick={() => handleNavigation('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'overview' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Overview</span>
          </button>

          <button
            onClick={() => handleNavigation('draft')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              activePage === 'draft' ? 'bg-[#8363f2] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>Draft</span>
          </button>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-3 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-gray-700 hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Help</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

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
