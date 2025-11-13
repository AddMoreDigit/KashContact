import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import qrCodeImg from 'figma:asset/e52f0702e5a08c05445351df92d3ce2bd6628cb3.png';

interface VoucherDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  voucher: {
    campaignName: string;
    serviceName: string;
    serviceType: string;
  } | null;
}

export function VoucherDetailsDialog({ open, onOpenChange, voucher }: VoucherDetailsDialogProps) {
  if (!voucher) return null;

  const handleShare = () => {
    // Handle share logic
    console.log('Share voucher');
  };

  const handleDownload = () => {
    // Handle download logic
    console.log('Download voucher');
  };

  const handleSave = () => {
    // Handle save logic
    console.log('Save voucher');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <DialogTitle>{voucher.campaignName} Weekend</DialogTitle>
          <DialogDescription className="sr-only">
            Voucher details and QR code
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {/* QR Code */}
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 flex items-center justify-center mb-4">
              <img
                src={qrCodeImg}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Voucher Code */}
            <div className="text-center mb-2">
              <div className="text-gray-900">VOUCHER-ABC</div>
            </div>

            {/* Total Amount */}
            <div className="text-center">
              <div className="text-gray-900">Tatol Amount R10 000.00</div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div>
              <div className="text-gray-900 mb-1">Issue date</div>
            </div>

            <div>
              <div className="text-gray-900 mb-1">Expiry date</div>
            </div>

            <div>
              <div className="text-gray-900 mb-1">Description</div>
              <div className="text-gray-700 text-sm">
                Weekend gataway inclunding Rooms ,meal,Tansport and Activities also Flights tickets
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleShare}
            className="flex-1 border-gray-300"
          >
            Share
          </Button>
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex-1 border-gray-300"
          >
            Download
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
