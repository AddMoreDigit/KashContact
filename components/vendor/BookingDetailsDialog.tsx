import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { VisuallyHidden } from '../ui/visually-hidden';

interface BookingItem {
  name: string;
  price: string;
}

interface Campaign {
  id: number;
  name: string;
  items: BookingItem[];
}

interface BookingDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancelBooking: (campaignId: number) => void;
}

export function BookingDetailsDialog({ open, onOpenChange, onCancelBooking }: BookingDetailsDialogProps) {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 12)); // March 12, 2025

  const campaigns: Campaign[] = [
    {
      id: 1,
      name: 'Campaign 1',
      items: [
        { name: '2X Deluxe Rooms', price: 'R3 000.00' },
        { name: '2X Room service', price: 'R500.00' },
        { name: '2X Launch', price: 'R300.00' },
        { name: '2X Dinner Buffet', price: 'R300.00' },
        { name: 'Spa Day', price: 'R700.00' },
        { name: 'Airport Pickup', price: 'R150.00' },
      ]
    },
    {
      id: 2,
      name: 'Campaign 2',
      items: [
        { name: '2X Deluxe Rooms', price: 'R3500.00' },
        { name: '2X Dinner Buffet', price: 'R500.00' },
        { name: 'Airport Pickup', price: 'R150.00' },
        { name: '2X Room service', price: 'R300.00' },
      ]
    }
  ];

  const calculateCampaignTotal = (campaign: Campaign): number => {
    return campaign.items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('R', '').replace(/\s/g, '').replace(',', ''));
      return sum + price;
    }, 0);
  };

  const totalBookings = campaigns.length;
  const totalRevenue = campaigns.reduce((sum, campaign) => sum + calculateCampaignTotal(campaign), 0);

  const formatCurrency = (amount: number): string => {
    return `R${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 bg-white">
        <VisuallyHidden>
          <DialogTitle>Booking Details for {formatDate(selectedDate)}</DialogTitle>
          <DialogDescription>
            View and manage your bookings for the selected date
          </DialogDescription>
        </VisuallyHidden>
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="18" height="15" rx="2" stroke="#8B5CF6" strokeWidth="2"/>
                <path d="M3 10H21" stroke="#8B5CF6" strokeWidth="2"/>
                <path d="M8 3V6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 3V6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <button onClick={handlePrevDay} className="hover:opacity-70">
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm min-w-[140px] text-center">{formatDate(selectedDate)}</span>
              <button onClick={handleNextDay} className="hover:opacity-70">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <button onClick={() => onOpenChange(false)} className="hover:opacity-70">
            <X size={20} />
          </button>
        </div>

        {/* Stats */}
        <div className="px-6 pb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Total Bookings</span>
            <span className="text-sm">{totalBookings}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Revenue</span>
            <span className="text-sm">{formatCurrency(totalRevenue)}</span>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="px-6 pb-6 max-h-[500px] overflow-y-auto">
          <h3 className="text-lg mb-4">Bookings</h3>
          
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="mb-6 last:mb-0">
              <h4 className="text-sm mb-3">{campaign.name}</h4>
              
              {/* Items List */}
              <div className="space-y-2 mb-3">
                {campaign.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name}</span>
                    <span>{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg text-sm hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.5C18.8978 2.1022 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.1022 21.5 2.5C21.8978 2.8978 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.1022 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Edit Booking
                </button>
                <button 
                  onClick={() => onCancelBooking(campaign.id)}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-sm">Total Revenue</span>
            <span className="text-sm">{formatCurrency(totalRevenue)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
