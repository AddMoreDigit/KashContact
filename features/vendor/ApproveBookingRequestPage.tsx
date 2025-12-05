import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { VendorSidebar } from './components/VendorSidebar';

type Page = 'dashboard' | 'campaigns' | 'services' | 'transactions' | 'profile' | 'overview' | 'draft' | 'editBooking' | 'approveBooking';

interface ApproveBookingRequestPageProps {
  onNavigate: (page: Page) => void;
}

const bookingRequests = [
  {
    id: 1,
    name: 'Cape town Seaview Lodge Weekend',
    admin: 'Campaigns Admin - Sarah,M .Mkhize',
    dates: 'Dec,10 2025-Dec 12,2025',
    price: 'R10 000.00',
    image: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMHRhYmxlJTIwbW91bnRhaW58ZW58MXx8fHwxNzYzMDU3MTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Durban Beach Escape',
    admin: 'Campaigns Admin - Bornwise,N.Baloyi',
    dates: 'Dec,10 2025-Dec 12,2025',
    price: 'R8 000.00',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJiYW4lMjBiZWFjaCUyMHBhbG18ZW58MXx8fHwxNzYzMDU3MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Zanzibar Gateway Weekend',
    admin: 'Campaigns Admin - Sarah,M .Mkhize',
    dates: 'Dec,10 2025-Dec 12,2025',
    price: 'R10 000.00',
    image: 'https://images.unsplash.com/photo-1505881502353-a1986add3762?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6YW56aWJhciUyMGJlYWNofGVufDF8fHx8MTc2MzA1NzEwNnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function ApproveBookingRequestPage({ onNavigate }: ApproveBookingRequestPageProps) {
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const handleView = (requestId: number) => {
    const request = bookingRequests.find(r => r.id === requestId);
    if (request) {
      toast.info(`Viewing ${request.name}`);
    }
  };

  const handleCancel = (requestId: number) => {
    const request = bookingRequests.find(r => r.id === requestId);
    if (request) {
      toast.error(`Cancelled ${request.name}`);
    }
  };

  const handleAccept = (requestId: number) => {
    const request = bookingRequests.find(r => r.id === requestId);
    if (request) {
      toast.success(`Accepted ${request.name}`);
    }
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

        {/* Content */}
        <div className="p-8">
          <h1 className="text-2xl mb-8">Approve Booking Request</h1>

          {/* Booking Requests List */}
          <div className="space-y-6">
            {bookingRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-6">
                  {/* Campaign Image */}
                  <ImageWithFallback
                    src={request.image}
                    alt={request.name}
                    className="w-32 h-24 object-cover rounded-lg"
                  />

                  {/* Campaign Details */}
                  <div className="flex-1">
                    <h2 className="text-lg mb-2">{request.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{request.admin}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{request.dates}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right mr-8">
                    <p className="text-xl">{request.price}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleView(request.id)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleCancel(request.id)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleAccept(request.id)}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Accept Campaign
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded transition-colors ${
                  currentPage === page
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
