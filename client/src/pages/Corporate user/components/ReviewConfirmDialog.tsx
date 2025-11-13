import { X, User, Pencil, Trash2, UtensilsCrossed, Home } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import campaignImage from 'figma:asset/1a571718085435eb1487724aca75bc194fc71d57.png';

interface ReviewConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewConfirmDialog({ open, onOpenChange }: ReviewConfirmDialogProps) {
  const members = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
  ];

  const vendors = [
    {
      name: 'Seaview Lodge',
      type: 'Accommodation',
      icon: Home,
      price: 'R8 000.00'
    },
    {
      name: 'Tastebites Catering',
      type: 'Food Dining',
      icon: UtensilsCrossed,
      price: 'R4 000.00'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review & Confirm</DialogTitle>
          <DialogDescription>
            Check all your details before launching your Campaign
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-gray-200 mt-4">
          <button className="text-gray-600 hover:text-gray-900 pb-3 px-2">
            Campaign Details
          </button>
          <button className="text-gray-600 hover:text-gray-900 pb-3 px-2">
            Assign Packages
          </button>
          <button className="text-gray-600 hover:text-gray-900 pb-3 px-2">
            Add members
          </button>
          <button className="text-purple-600 border-b-2 border-purple-600 pb-3 px-2">
            Review
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          {/* Left Column - Campaign Overview */}
          <div>
            <h3 className="mb-4">Campaign Overview</h3>
            
            <div className="space-y-4">
              <div>
                <h4>Corporate Campaign</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Helping our staff members with their cape town getaway weekend
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Goal target</p>
                <p>R20 000.00</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Aug 11 - Dec 8, 2025</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Campaign Members</p>
                <div className="flex items-center gap-1">
                  {members.map((member) => (
                    <div 
                      key={member.id} 
                      className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
                    >
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image and Vendors */}
          <div className="space-y-4">
            {/* Campaign Banner */}
            <div className="rounded-lg overflow-hidden">
              <img 
                src={campaignImage} 
                alt="Campaign banner"
                className="w-full h-32 object-cover"
              />
            </div>

            {/* Selected Vendors */}
            <div>
              <h3 className="mb-3">Selected Vendors</h3>
              <div className="space-y-2">
                {vendors.map((vendor, idx) => {
                  const Icon = vendor.icon;
                  return (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p>{vendor.name}</p>
                          <p className="text-sm text-gray-600">{vendor.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p>{vendor.price}</p>
                        <div className="flex items-center gap-1">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Pencil className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between gap-3 pt-4 border-t mt-6">
          <Button variant="outline">Back</Button>
          <div className="flex gap-2">
            <Button variant="outline">Save as draft</Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Launch Campaign</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
