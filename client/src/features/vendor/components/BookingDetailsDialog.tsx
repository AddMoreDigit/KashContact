import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Edit } from "lucide-react";

interface BookingItem {
  description: string;
  price: string;
}

interface Campaign {
  name: string;
  items: BookingItem[];
}

interface BookingDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: string;
  totalBookings: number;
  totalRevenue: string;
  campaigns: Campaign[];
  onEditBooking?: () => void;
}

export function BookingDetailsDialog({
  open,
  onOpenChange,
  date,
  totalBookings,
  totalRevenue,
  campaigns,
  onEditBooking,
}: BookingDetailsDialogProps) {
  const calculateCampaignTotal = (items: BookingItem[]) => {
    return items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[R,\s]/g, ''));
      return sum + price;
    }, 0);
  };

  const grandTotal = campaigns.reduce((sum, campaign) => {
    return sum + calculateCampaignTotal(campaign.items);
  }, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription className="sr-only">
            View and manage booking details for {date}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-gray-600 text-sm">Total Bookings</p>
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <p className="text-purple-600">{totalRevenue}</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-gray-900">Bookings</h3>

            {campaigns.map((campaign, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-purple-600">{campaign.name}</h4>
                
                <div className="space-y-2">
                  {campaign.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.description}</span>
                      <span className="text-gray-900">{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-purple-600 border-purple-200"
                    onClick={onEditBooking}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit Booking
                  </Button>
                  <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Cancel Booking
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-600">Total revenue: R{grandTotal.toFixed(2)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}