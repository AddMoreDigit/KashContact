import { X, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
const accommodationImg = "https://via.placeholder.com/400x300?text=Image";
const mealImg = "https://via.placeholder.com/400x300?text=Image";
const transportImg = "https://via.placeholder.com/400x300?text=Image";
const activitiesImg = "https://via.placeholder.com/400x300?text=Image";

interface AssignPackagesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignPackagesDialog({ open, onOpenChange }: AssignPackagesDialogProps) {
  const packages = [
    {
      id: 1,
      name: 'Accommodation',
      vendor: 'Protea Hotel',
      price: 'R1200.00',
      image: accommodationImg
    },
    {
      id: 2,
      name: 'Meal Voucher',
      vendor: 'Foodie .com',
      price: 'R500.00',
      image: mealImg
    },
    {
      id: 3,
      name: 'G-Transport',
      vendor: 'Transport tour',
      price: 'R1200.00',
      image: transportImg
    },
    {
      id: 4,
      name: 'Activities',
      vendor: 'Extras events',
      price: 'R1200.00',
      image: activitiesImg
    }
  ];

  const selectedPackages = [
    {
      name: 'Accommodation',
      vendor: 'Protea Hotel',
      price: 'R1200.00'
    },
    {
      name: 'Meal Voucher',
      vendor: 'Foodie .com',
      price: 'R500.00'
    },
    {
      name: 'G-Transport',
      vendor: 'Transport tour',
      price: 'R1200.00'
    },
    {
      name: 'Activities',
      vendor: 'Extras events',
      price: 'R1200.00'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Assign Packages</DialogTitle>
            <button 
              onClick={() => onOpenChange(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <DialogDescription>
            Choose vendor packages to attach at this campaign
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-gray-200 mt-4">
          <button className="text-gray-600 hover:text-gray-900 pb-3 px-2">
            Campaign Details
          </button>
          <button className="text-purple-600 border-b-2 border-purple-600 pb-3 px-2">
            Assign Packages
          </button>
          <button className="text-gray-600 hover:text-gray-900 pb-3 px-2">
            Add members
          </button>
          <button className="text-gray-600 hover:text-gray-900 pb-3 px-2">
            Review
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          {/* Left Column - Available Packages */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search Packages" className="pl-9" />
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="sm">
                Filter by
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
                See all
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {packages.map((pkg) => (
                <div key={pkg.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-3">
                    <p className="mb-1">{pkg.name}</p>
                    <p className="text-sm text-gray-600 mb-1">{pkg.vendor}</p>
                    <p className="mb-3">{pkg.price}</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                      Add to campaign
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Selected Packages */}
          <div>
            <h3 className="mb-4">Selected Packages</h3>
            
            <div className="space-y-3">
              {selectedPackages.map((pkg, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="mb-1">{pkg.name}</p>
                    <p className="text-sm text-gray-600">{pkg.vendor}</p>
                  </div>
                  <p>{pkg.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between gap-3 pt-4 border-t mt-6">
          <Button variant="outline">Back</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Next</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
