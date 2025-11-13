import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { VoucherDetailsDialog } from './VoucherDetailsDialog';

interface GenerateVoucherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignName: string;
}

export function GenerateVoucherDialog({ open, onOpenChange, campaignName }: GenerateVoucherDialogProps) {
  const [showVoucherDetails, setShowVoucherDetails] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null);

  const services = [
    {
      id: 1,
      name: 'Seaview Lodge',
      type: 'Hotel Stay',
      icon: '🏨',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-700',
      status: 'Fully Paid',
    },
    {
      id: 2,
      name: 'Tastebites Catering',
      type: 'Restaurant',
      icon: '🍽️',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-700',
      status: 'Fully Paid',
    },
    {
      id: 3,
      name: 'Greenfield Ranch',
      type: 'Horse riding',
      icon: '🐴',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-700',
      status: 'Fully Paid',
    },
    {
      id: 4,
      name: 'Cape town cruises',
      type: 'Boat ride',
      icon: '🚤',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-700',
      status: 'Fully Paid',
    },
    {
      id: 5,
      name: 'City Explorer',
      type: 'City tour',
      icon: '🏙️',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-700',
      status: 'Fully Paid',
    },
  ];

  const handleGenerateVoucher = (service: any) => {
    setSelectedVoucher({
      campaignName,
      serviceName: service.name,
      serviceType: service.type,
    });
    setShowVoucherDetails(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none z-10"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>

          <DialogHeader>
            <DialogTitle>{campaignName}</DialogTitle>
            <DialogDescription>
              Select what you want to redeem
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${service.bgColor} rounded-full flex items-center justify-center text-xl`}>
                    {service.icon}
                  </div>
                  <div>
                    <div className="text-gray-900">{service.name}</div>
                    <div className="text-sm text-gray-600">{service.type}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{service.status}</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleGenerateVoucher(service)}
                  >
                    Generate Voucher
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <VoucherDetailsDialog
        open={showVoucherDetails}
        onOpenChange={setShowVoucherDetails}
        voucher={selectedVoucher}
      />
    </>
  );
}
