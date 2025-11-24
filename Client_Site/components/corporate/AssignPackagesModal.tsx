import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface AssignPackagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
}

interface Package {
  id: number;
  name: string;
  vendor: string;
  price: string;
  image: string;
  selected: boolean;
}

const allPackages: Package[] = [
  {
    id: 1,
    name: 'Accommodation',
    vendor: 'Protea Hotel',
    price: 'R1200.00',
    image: 'https://images.unsplash.com/photo-1648766378129-11c3d8d0da05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzYzMDA2NDI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    selected: false
  },
  {
    id: 2,
    name: 'Meal Voucher',
    vendor: 'Foodie .com',
    price: 'R500.00',
    image: 'https://images.unsplash.com/photo-1600555379885-08a02224726d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMG1lYWx8ZW58MXx8fHwxNzYzMDE5MzUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    selected: false
  },
  {
    id: 3,
    name: 'G-Transport',
    vendor: 'Transport tour',
    price: 'R1200.00',
    image: 'https://images.unsplash.com/photo-1760657798485-0ddaec03929b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc3BvcnQlMjB2YW4lMjB0b3VyfGVufDF8fHx8MTc2MzA5MTQxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    selected: false
  },
  {
    id: 4,
    name: 'Activities',
    vendor: 'Extras events',
    price: 'R1200.00',
    image: 'https://images.unsplash.com/photo-1713314197527-f837d723b210?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpdml0aWVzJTIwZW50ZXJ0YWlubWVudCUyMGV2ZW50c3xlbnwxfHx8fDE3NjMwOTE0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    selected: false
  }
];

export function AssignPackagesModal({ isOpen, onClose, onNext, onBack }: AssignPackagesModalProps) {
  const [packages, setPackages] = useState<Package[]>(allPackages);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStep, setActiveStep] = useState(1);

  const steps = ['Campaign Details', 'Assign Packages', 'Add members', 'Review'];

  const selectedPackages = packages.filter(p => p.selected);

  const togglePackage = (id: number) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, selected: !pkg.selected } : pkg
    ));
  };

  const totalAmount = selectedPackages.reduce((sum, pkg) => {
    return sum + parseFloat(pkg.price.replace('R', '').replace(',', ''));
  }, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] p-0 gap-0">
        <DialogTitle className="sr-only">Assign Packages</DialogTitle>
        <DialogDescription className="sr-only">
          Choose vendor packages to attach to this campaign
        </DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-[18px] font-semibold text-black">Assign Packages</h2>
            <p className="text-[12px] text-gray-600 mt-0.5">
              Choose vendor packages to attach at this campaign
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Step Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          {steps.map((step, index) => (
            <button
              key={step}
              className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${
                index === activeStep
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600'
              }`}
            >
              {step}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex">
          {/* Left Panel - Package Selection */}
          <div className="flex-1 p-6 border-r border-gray-200">
            {/* Search and Filter */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search Packages"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-[13px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="px-4 py-2 text-[13px] text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Filter by
              </button>
              <button className="px-4 py-2 text-[13px] bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                See all
              </button>
            </div>

            {/* Package Grid */}
            <div className="grid grid-cols-2 gap-4">
              {packages.map((pkg) => (
                <div key={pkg.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="text-[14px] font-medium text-black mb-1">{pkg.name}</h4>
                    <p className="text-[12px] text-gray-600 mb-2">{pkg.vendor}</p>
                    <p className="text-[14px] font-semibold text-black mb-3">{pkg.price}</p>
                    <button
                      onClick={() => togglePackage(pkg.id)}
                      className={`w-full py-2 text-[13px] rounded-lg transition-colors ${
                        pkg.selected
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {pkg.selected ? 'Remove' : 'Add to campaign'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Selected Packages */}
          <div className="w-[320px] p-6">
            <h3 className="text-[16px] font-semibold text-black mb-4">Selected Packages</h3>
            
            {selectedPackages.length > 0 ? (
              <div className="space-y-4">
                {selectedPackages.map((pkg) => (
                  <div key={pkg.id} className="pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-[14px] font-medium text-black">{pkg.name}</h4>
                      <span className="text-[14px] font-semibold text-black">{pkg.price}</span>
                    </div>
                    <p className="text-[12px] text-gray-600">{pkg.vendor}</p>
                  </div>
                ))}
                
                {/* Total */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-black">Total</span>
                    <span className="text-[16px] font-bold text-black">
                      R{totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-[13px] text-gray-500 text-center mt-8">
                No packages selected yet
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onBack}
            className="px-6 py-2 text-[14px] text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="px-6 py-2 text-[14px] bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Next
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}