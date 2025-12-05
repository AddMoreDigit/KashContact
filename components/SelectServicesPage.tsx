import { useState, useEffect } from 'react';
import { ChevronLeft, SlidersHorizontal, X } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import { FilterSheet } from './FilterSheet';
import { Card } from './ui/card';
import { NavBar } from './layout/NavBar';
import { serviceStorage } from '../utils/serviceStorage';

// Import dashboard images - using the exact same imports as DashboardPage
//import imgRectangle137 from "../../imports/figma/asset/2d90d1ffe99df5817a38c395c08ec5116a7be340.png";
//import imgRectangle143 from "../../imports/figma/asset/e646802d554bb1fa6ce3ceb35bf48236c77c77e1.png";
//import imgRectangle138 from "../../imports/figma/asset/87102388d503206b3b0fb177ad63642a9945094b.png";
//import imgRectangle144 from "../../imports/figma/asset/9f1f8c1da3629502bc71901baf4363bbeeeff080.png";
//import imgRectangle139 from "../../imports/figma/asset/5d9bf658577635a939c9246246e5a8bf87eb8ec2.png";
//import imgRectangle145 from "../../imports/figma/asset/09008cafd958ef228fae370333984be464a418ff.png";

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'createCampaign' | 'selectServices';

interface SelectServicesPageProps {
  onNavigate: (page: Page) => void;
  onSelectService?: (service: ServiceProvider) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
}

interface ServiceProvider {
  id: string;
  businessName: string;
  businessType: string;
  location: string;
  image: string;
  email: string;
  phone: string;
  serviceCount: number;
}

export function SelectServicesPage({ onNavigate, onSelectService, onShowNotifications, hasUnreadNotifications, onShowCart }: SelectServicesPageProps) {
  const [selectedServices, setSelectedServices] = useState<ServiceProvider[]>([]);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [allProviders, setAllProviders] = useState<ReturnType<typeof serviceStorage.getUniqueServiceProviders>>([]);

  useEffect(() => {
    // Get all unique service providers from centralized storage (same as DashboardPage)
    const providers = serviceStorage.getUniqueServiceProviders();
    setAllProviders(providers);
  }, []);

  // Filter service providers based on selected filters
  const filteredProviders = allProviders.filter((provider) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.some((cat) =>
        provider.businessType?.toLowerCase().includes(cat.toLowerCase()) ||
        provider.category?.toLowerCase().includes(cat.toLowerCase())
      );

    const locationMatch =
      selectedLocations.length === 0 ||
      selectedLocations.includes(provider.location);

    return categoryMatch && locationMatch;
  });

  // Apply pagination
  const serviceProviders = filteredProviders.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProviders.length;

  const toggleServiceSelection = (e: React.MouseEvent, provider: ServiceProvider) => {
    e.stopPropagation(); // Prevent card click
    const isSelected = selectedServices.some(s => s.id === provider.id);
    if (isSelected) {
      setSelectedServices(selectedServices.filter(s => s.id !== provider.id));
      toast.success(`${provider.businessName} removed from selection`);
    } else {
      setSelectedServices([...selectedServices, provider]);
      toast.success(`${provider.businessName} added to selection`);
    }
  };

  const removeSelectedService = (providerId: string) => {
    const provider = selectedServices.find(s => s.id === providerId);
    setSelectedServices(selectedServices.filter(s => s.id !== providerId));
    if (provider) {
      toast.success(`${provider.businessName} removed from selection`);
    }
  };

  const isServiceSelected = (providerId: string) => {
    return selectedServices.some(s => s.id === providerId);
  };

  const handleServiceProviderClick = (provider: ServiceProvider) => {
    // Get the provider's services from centralized storage
    const providerServices = serviceStorage.filterServices({
      providerId: provider.id,  // This is the serviceProviderId
      available: true
    });
    
    // If provider has services, select the first one
    if (providerServices.length > 0) {
      const firstService = providerServices[0];
      
      // Convert to ServiceProvider format for compatibility with ServiceDetailPage
      const serviceToView = {
        id: firstService.id,  // This is the numeric service ID
        name: firstService.name,
        location: firstService.location,
        category: firstService.category,
        image: firstService.image,
      };
      
      if (onSelectService) {
        onSelectService(serviceToView as any);
      }
      onNavigate('serviceDetail');
      toast.success(`Viewing ${firstService.name} from ${provider.businessName}`);
    } else {
      toast.error(`${provider.businessName} has no available services`);
    }
  };

  const handleContinue = () => {
    onNavigate('createCampaign');
  };

  const handleSeeAll = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setVisibleCount(allProviders.length);
    toast.success('Showing all service providers');
  };

  const handleFilterBy = () => {
    setShowFilterSheet(true);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredProviders.length));
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    toast.success('Filters cleared');
  };

  const handleApplyFilters = () => {
    setShowFilterSheet(false);
    setVisibleCount(6);
    toast.success('Filters applied');
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        onNavigate={onNavigate} 
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
        showCreateButton={false}
      />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="hover:bg-gray-100 rounded p-2"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <div>
            <h1 className="text-gray-900">Select Services</h1>
            <p className="text-gray-600 text-sm">
              Browse service providers and select the ones you want to include in your campaign
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        {/* Summary of Services - Only show if services are selected */}
        {selectedServices.length > 0 && (
          <div className="mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">Summary of Services</h2>
                <span className="text-purple-600">
                  {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="space-y-3">
                {selectedServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={service.image}
                      alt={service.businessName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-gray-900">{service.businessName}</h3>
                      <p className="text-gray-600 text-sm">
                        {service.location} / {service.businessType}
                      </p>
                    </div>
                    <button
                      onClick={() => removeSelectedService(service.id)}
                      className="text-gray-400 hover:text-red-600 p-2"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button
                  onClick={handleContinue}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Continue to Campaign Details
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Service Provider Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">Service Providers</h2>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={handleFilterBy}
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Filter by
            </Button>

            {/* See all Button - Only show if there are more providers to load */}
            {hasMore && (
              <Button
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
                onClick={handleSeeAll}
              >
                See all
              </Button>
            )}
          </div>
        </div>

        {/* Service Provider Cards - 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {serviceProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow relative"
            >
              {/* Clickable card */}
              <button
                onClick={() => handleServiceProviderClick(provider)}
                className="w-full text-left"
              >
                <div className="h-40 w-full">
                  <img
                    src={provider.image}
                    alt={provider.businessName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-gray-900 mb-1">{provider.businessName}</h3>
                  <p className="text-gray-600">
                    {provider.location} / {provider.businessType}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {serviceProviders.length > 0 && hasMore && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          </div>
        )}

        {/* Show message if no results */}
        {serviceProviders.length === 0 && (
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

      {/* Fixed Bottom Bar */}
      {selectedServices.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-gray-900">
                {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected
              </p>
              <p className="text-gray-600 text-sm">
                Ready to create your campaign
              </p>
            </div>
            <Button
              onClick={handleContinue}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Continue to Campaign Details
            </Button>
          </div>
        </div>
      )}

      {/* Filter Sheet */}
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
    </div>
  );
}

