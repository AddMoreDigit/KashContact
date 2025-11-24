import { useState } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { Button } from './ui/button';
import { NavBar } from './NavBar';
import { toast } from 'sonner';
import { Toaster } from './ui/sonner';
import { SelectServicesSheet } from './SelectServicesSheet';
import { serviceStorage } from '../utils/serviceStorage';
import { serviceProviderStorage, ServiceProviderProfile } from '../utils/serviceProviderStorage';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail';

interface ServiceProvidersPageProps {
  onNavigate: (page: Page) => void;
  onSelectService?: (service: any) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
}

// Hero image for carousel
const heroImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjU4MzY0MHww&ixlib=rb-4.1.0&q=80&w=1080';

export function ServiceProvidersPage({ onNavigate, onSelectService, onShowNotifications, hasUnreadNotifications = false, onShowCart }: ServiceProvidersPageProps) {
  const [showSelectService, setShowSelectService] = useState(false);
  const [showServiceSelection, setShowServiceSelection] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // Load all service providers
  const allProviders = serviceStorage.getUniqueServiceProviders();
  
  // Filter service providers who have at least one available service
  const allServices = serviceStorage.getAllServiceProviders();
  const hiddenServices = JSON.parse(localStorage.getItem('hiddenServices') || '[]');
  
  // Get unique provider IDs that have available services
  const providerIdsWithAvailableServices = new Set(
    allServices
      .filter(service => service.available === true && !hiddenServices.includes(service.id))
      .map(service => service.serviceProviderId)
  );
  
  // Filter providers to only show those with available services
  const providersWithServices = allProviders.filter(provider => 
    providerIdsWithAvailableServices.has(provider.id)
  );

  // Filter service providers based on selected filters
  const providers = providersWithServices.filter((provider) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.some((cat) =>
        provider.category?.toLowerCase().includes(cat.toLowerCase()) ||
        provider.businessType?.toLowerCase().includes(cat.toLowerCase())
      );

    const locationMatch =
      selectedLocations.length === 0 ||
      selectedLocations.includes(provider.location);

    return categoryMatch && locationMatch;
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, location]);
    } else {
      setSelectedLocations(selectedLocations.filter((l) => l !== location));
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    toast.success('Filters cleared');
  };

  const handleApplyFilters = () => {
    setShowFilterSheet(false);
    const filterCount = selectedCategories.length + selectedLocations.length;
    if (filterCount > 0) {
      toast.success(`${filterCount} filter(s) applied`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        onNavigate={onNavigate}
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
      />

      {/* Main Content */}
      <div className="p-8">
        {/* Hero Carousel */}
        <div className="relative mb-8 rounded-xl overflow-hidden">
          <div className="relative h-80">
            <img 
              src={heroImage}
              alt="Featured property" 
              className="w-full h-full object-cover"
            />
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg">
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg">
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Service Providers Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">Service Providers</h2>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowSelectService(true)}
              className="border-gray-200"
            >
              Quick Select
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilterSheet(true)}
              className="border-gray-200"
            >
              <SlidersHorizontal className="mr-2" size={16} />
              Filter By
            </Button>
            <button className="text-purple-600 hover:text-purple-700">See all</button>
          </div>
        </div>

        {/* Service Cards Grid */}
        {providers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider, index) => {
                // Get provider's first service for navigation
                const providerServices = serviceStorage.filterServices({
                  providerId: provider.id,
                  available: true
                });
                const hasServices = providerServices.length > 0;
                
                return (
                  <div 
                    key={index} 
                    onClick={() => {
                      if (hasServices) {
                        const firstService = providerServices[0];
                        // Navigate to service detail page with proper service data
                        onNavigate('serviceDetail' as any);
                        toast.success(`Viewing ${firstService.name} from ${provider.businessName}`);
                        if (onSelectService) {
                          onSelectService(firstService);
                        }
                      } else {
                        toast.error(`${provider.businessName} has no available services`);
                      }
                    }}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="h-48 overflow-hidden">
                      <ImageWithFallback 
                        src={provider.image || ''} 
                        alt={provider.businessName}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-gray-900 mb-1">{provider.businessName}</h3>
                      <p className="text-gray-600">
                        {provider.location} / {provider.businessType}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More */}
            <div className="mt-8 flex justify-center">
              <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                Load More
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No service providers match your filters</p>
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <SelectServicePanel
        open={showSelectService}
        onOpenChange={setShowSelectService}
        onNavigate={onNavigate}
      />

      <ServiceSelectionPanel
        open={showServiceSelection}
        onOpenChange={setShowServiceSelection}
        onNavigate={onNavigate}
      />

      <FilterSheet
        open={showFilterSheet}
        onOpenChange={setShowFilterSheet}
        selectedCategories={selectedCategories}
        selectedLocations={selectedLocations}
        onCategoryChange={handleCategoryChange}
        onLocationChange={handleLocationChange}
        onClearAll={handleClearFilters}
        onApply={handleApplyFilters}
      />

      <Toaster />
    </div>
  );
}

// Placeholder components - to be implemented
function SelectServicePanel({ open, onOpenChange, onNavigate }: { open: boolean; onOpenChange: (open: boolean) => void; onNavigate: (page: string) => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => onOpenChange(false)}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl mb-4">Quick Select Services</h2>
        <p className="text-gray-600 mb-4">Select your preferred services</p>
        <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700" onClick={() => onOpenChange(false)}>Close</button>
      </div>
    </div>
  );
}

function ServiceSelectionPanel({ open, onOpenChange, onNavigate }: { open: boolean; onOpenChange: (open: boolean) => void; onNavigate: (page: string) => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => onOpenChange(false)}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl mb-4">Service Selection</h2>
        <p className="text-gray-600 mb-4">View service details</p>
        <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700" onClick={() => onOpenChange(false)}>Close</button>
      </div>
    </div>
  );
}

function FilterSheet({ open, onOpenChange, selectedCategories, selectedLocations, onCategoryChange, onLocationChange, onClearAll, onApply }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategories: string[];
  selectedLocations: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
  onLocationChange: (location: string, checked: boolean) => void;
  onClearAll: () => void;
  onApply: () => void;
}) {
  if (!open) return null;
  
  // Get categories and locations from centralized data
  const categories = serviceStorage.getUniqueCategories();
  const locations = serviceStorage.getUniqueLocations();
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => onOpenChange(false)}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl">Filters</h2>
          <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-3">Categories</h3>
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={(e) => onCategoryChange(category, e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-3">Locations</h3>
          {locations.map((location) => (
            <label key={location} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={selectedLocations.includes(location)}
                onChange={(e) => onLocationChange(location, e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{location}</span>
            </label>
          ))}
        </div>
        
        <div className="flex gap-3">
          <button onClick={onClearAll} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">Clear All</button>
          <button onClick={onApply} className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">Apply</button>
        </div>
      </div>
    </div>
  );
}