import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../../../components/ui/dialog';
import svgPaths from '../../../imports/svg-6b47b979bs';

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
    console.log('Share voucher');
  };

  const handleDownload = () => {
    // Create a simple HTML-based PDF download using print
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${voucher.campaignName} - Voucher</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 {
              text-align: center;
              color: #2D1B69;
              border-bottom: 2px solid #2D1B69;
              padding-bottom: 10px;
            }
            .voucher-details {
              margin: 30px 0;
            }
            .detail-row {
              margin: 15px 0;
              display: flex;
            }
            .label {
              font-weight: bold;
              width: 150px;
            }
            .qr-code {
              text-align: center;
              margin: 20px 0;
              padding: 20px;
              border: 2px dashed #ccc;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <h1>${voucher.campaignName}</h1>
          <div class="voucher-details">
            <div class="detail-row">
              <span class="label">Voucher Code:</span>
              <span>VOUCHER-ABC</span>
            </div>
            <div class="detail-row">
              <span class="label">Total Amount:</span>
              <span>R10 000.00</span>
            </div>
            <div class="detail-row">
              <span class="label">Service:</span>
              <span>${voucher.serviceName}</span>
            </div>
            <div class="detail-row">
              <span class="label">Service Type:</span>
              <span>${voucher.serviceType}</span>
            </div>
            <div class="detail-row">
              <span class="label">Issue Date:</span>
              <span>${new Date().toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <span class="label">Expiry Date:</span>
              <span>${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <span class="label">Description:</span>
              <span>Weekend gateway including Rooms, meal, Transport and Activities also Flights tickets</span>
            </div>
          </div>
          <div class="qr-code">
            <p>[QR Code]</p>
          </div>
          <div class="footer">
            <p>Thank you for your booking!</p>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const handleSave = () => {
    console.log('Save voucher');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 bg-white rounded-[8px] [&>button]:hidden max-w-[530px] w-[530px] overflow-hidden">
        {/* Hidden accessibility title and description */}
        <DialogTitle className="sr-only">
          {voucher.campaignName} Voucher Details
        </DialogTitle>
        <DialogDescription className="sr-only">
          View and manage your voucher with QR code, voucher code, amount, and expiry information
        </DialogDescription>
        
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 z-10 w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Campaign Title */}
          <div className="pt-6 pb-6 px-8 border-b border-gray-200">
            <h3 className="text-[18px] font-medium text-black" aria-hidden="true">
              {voucher.campaignName}
            </h3>
          </div>

          <div className="px-8 py-6">
            {/* QR Code */}
            <div className="flex justify-center mb-4">
              <div className="w-[120px] h-[120px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 234 234">
                  <g id="Group 79">
                    <path d={svgPaths.p1d936600} fill="var(--fill-0, #2D1B69)" id="Vector" />
                    <path d={svgPaths.p3d5e9700} fill="var(--fill-0, #2D1B69)" id="Vector_2" />
                    <path d={svgPaths.p36db9af0} fill="var(--fill-0, #2D1B69)" id="Vector_3" />
                    <path d={svgPaths.p6600600} fill="var(--fill-0, #2D1B69)" id="Vector_4" />
                    <g id="Group">
                      <path d={svgPaths.p325dcd40} fill="var(--fill-0, #2D1B69)" id="Vector_5" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            {/* Voucher Code */}
            <p className="text-center text-[14px] text-black mb-1">
              VOUCHER-ABC
            </p>

            {/* Total Amount */}
            <p className="text-center text-[14px] font-medium text-black mb-6">
              Tatol Amount R10 000.00
            </p>

            {/* Issue Date */}
            <div className="mb-3">
              <p className="text-[14px] text-black">
                Issue date
              </p>
            </div>

            {/* Expiry Date */}
            <div className="mb-4">
              <p className="text-[14px] text-black">
                Expiry date
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-[14px] text-black leading-[20px]">
                <span className="font-semibold">Description:</span>Weekend gataway inclunding Rooms ,meal,Transport and Activities also Flights tickets
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 px-8 pb-6">
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="bg-white border border-gray-300 rounded-[6px] h-[40px] px-6 flex items-center justify-center hover:bg-gray-50 transition-colors text-[14px] text-black"
            >
              Share
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="bg-white border border-gray-300 rounded-[6px] h-[40px] px-6 flex items-center justify-center hover:bg-gray-50 transition-colors text-[14px] text-black"
            >
              Download
            </button>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="bg-[#8363f2] border border-[#8363f2] rounded-[6px] h-[40px] px-6 flex items-center justify-center hover:bg-[#7050e0] transition-colors text-[14px] text-white"
            >
              Save
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}