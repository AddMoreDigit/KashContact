import { useState } from 'react';
import { Search, Bell, ShoppingCart, User } from 'lucide-react';
import imgKcLogoWhite2Transparent1 from 'figma:asset/4b4bad59041302b06eae37218f1d3bd7c64d7d1e.png';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

type Page = 'dashboard' | 'campaigns' | 'services' | 'transactions' | 'profile' | 'overview' | 'draft';

interface VendorInvoicePageProps {
  onNavigate: (page: Page) => void;
}

const campaignMembers = [
  {
    name: 'Chibuko Moonde',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
  },
  {
    name: 'Silius Moloi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  },
  {
    name: 'David Baloyi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  },
  {
    name: 'Nthuselo Sihuane',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
  },
];

export function VendorInvoicePage({ onNavigate }: VendorInvoicePageProps) {
  const [activePage, setActivePage] = useState<string>('dashboard');

  const handleNavigation = (page: string) => {
    setActivePage(page);
  };

  const handleDownloadReport = () => {
    toast.success('Downloading report...');
  };

  const handlePrint = () => {
    toast.success('Printing invoice...');
  };

  const handleCancel = () => {
    onNavigate('dashboard');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-48 bg-white border-r border-gray-200 flex flex-col">
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

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
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
            {/* Search Bar */}
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
              />
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

        {/* Invoice Content */}
        <div className="p-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Summary Header */}
            <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
              <h1 className="text-xl">Summary</h1>
              <div className="text-right">
                <p className="text-sm text-gray-300">INV No: 100002975</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="p-6">
              {/* Header with Image and Title */}
              <div className="flex gap-6 mb-6">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" 
                      alt="Gold Reef City" 
                      className="w-24 h-24 object-contain"
                    />
                    <div>
                      <h2 className="text-xl mb-2">Gold Reef City theme park</h2>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="text-orange-500">Costumer</p>
                        <p>Chibuko Moonde</p>
                        <p>ChibukoMoonde@icloud.org</p>
                        <p>+27 123456789</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Campaign Date</p>
                    <p className="text-sm">11 Aug-12 December 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Issue Date</p>
                    <p className="text-sm">10 November 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1"># Campaign Members</p>
                    <p className="text-sm">4</p>
                  </div>
                </div>
              </div>

              {/* Three Column Layout */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                {/* Campaign Members */}
                <div>
                  <h3 className="mb-3">Campaign members</h3>
                  <div className="space-y-2">
                    {campaignMembers.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <ImageWithFallback
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm">{member.name} {member.role && <span className="text-orange-500">({member.role})</span>}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h3 className="mb-3">Services</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <img 
                        src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=100" 
                        alt="Accommodation" 
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="text-sm">
                        <p>Accommodation-Reef Hotel</p>
                        <p className="text-gray-600">5 Stars hotel - 5 nights</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <img 
                        src="https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=100" 
                        alt="Dining" 
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="text-sm">
                        <p>Gold reef Dining</p>
                        <p className="text-gray-600">5 Stars Dining - 5 nights</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <h3 className="mb-3">Activities</h3>
                  <div className="text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      <p>Horse riding</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      <p>Bike riding</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      <p>City tour</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Column Layout - Financial and Itinerary */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Financial Breakdown and Payments */}
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-3">Financial Breakdown</h3>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Member number R4 000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Extra services(Meals ,Games & Etc)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Campaign R16 000</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3">Payments status</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Payment Status</span>
                        <span className="px-3 py-1 bg-red-500 text-white text-xs rounded-full">Expired</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Order Status</span>
                        <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Itinerary */}
                <div>
                  <h3 className="mb-3">Itinerary</h3>
                  <div className="text-sm space-y-2">
                    <p>Day 1 - Arrival/Check in</p>
                    <p>Day 2 - Horse riding</p>
                    <p>Day 3 - Bike riding</p>
                    <p>Day 4 - City Tour</p>
                    <p>Day 5 - Checkout</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDownloadReport}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Download Report
                </button>
                <button
                  onClick={handlePrint}
                  className="px-8 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}