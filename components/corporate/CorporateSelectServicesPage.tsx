import { useState, useEffect } from 'react';
import { ChevronLeft, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner';
import { FilterSheet } from '../FilterSheet';
import { Card } from '../ui/card';
import { CorporateSidebar } from './CorporateSidebar';
import { NavBar } from '../layout/NavBar';
import { serviceStorage } from '../../utils/serviceStorage';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'approveBookingRequest' | 'editBooking' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable' | 'corporateSelectServices' | 'corporateServiceProviders';

interface CorporateSelectServicesPageProps {
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

export function CorporateSelectServicesPage({ onNavigate, onSelectService, onShowNotifications, hasUnreadNotifications, onShowCart }: CorporateSelectServicesPageProps) {
  const [activePage, setActivePage] = useState<string>('selectServices');
  const [selectedServices, setSelectedServices] = useState<ServiceProvider[]>([]);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [allProviders, setAllProviders] = useState<ReturnType<typeof serviceStorage.getUniqueServiceProviders>>([]);

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    onNavigate(page);
  };

  useEffect(() => {
    // Get all unique service providers from centralized storage
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
    if (onSelectService) {
      onSelectService(provider);
    }
    onNavigate('serviceDetail');
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <CorporateSidebar
        currentPage={activePage}
        onNavigate={handleNavigation}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* NavBar */}
        <NavBar 
          onNavigate={handleNavigation}
          showCreateButton={false}
          userType="corporate"
        />

        <div className="p-8">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('corporateCampaigns')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-[14px]">Back</span>
              </button>
              <h1 className="text-[28px] text-gray-900">Select Services</h1>
            </div>
            <button
              onClick={() => setShowFilterSheet(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-[14px]">Filters</span>
              {(selectedCategories.length > 0 || selectedLocations.length > 0) && (
                <span className="px-2 py-0.5 bg-purple-600 text-white text-[12px] rounded-full">
                  {selectedCategories.length + selectedLocations.length}
                </span>
              )}
            </button>
          </div>

          {/* Selected Services Pills */}
          {selectedServices.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {selectedServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-full"
                >
                  <span className="text-[14px]">{service.businessName}</span>
                  <button
                    onClick={() => removeSelectedService(service.id)}
                    className="hover:bg-purple-200 rounded-full p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Service Providers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {serviceProviders.map((provider) => (
              <Card
                key={provider.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative"
                onClick={() => handleServiceProviderClick(provider)}
              >
                {/* Checkbox Overlay */}
                <div
                  className="absolute top-4 right-4 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    checked={isServiceSelected(provider.id)}
                    onCheckedChange={(checked) => {
                      const event = { stopPropagation: () => {} } as React.MouseEvent;
                      toggleServiceSelection(event, provider);
                    }}
                    className="w-6 h-6 bg-white border-2 border-gray-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                </div>

                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={provider.image}
                    alt={provider.businessName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-[18px] text-gray-900 mb-2">{provider.businessName}</h3>
                  <p className="text-[14px] text-gray-600 mb-1">{provider.businessType}</p>
                  <p className="text-[14px] text-gray-500">{provider.location}</p>
                  <p className="text-[14px] text-purple-600 mt-2">{provider.serviceCount} services available</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center">
              <Button
                onClick={() => setVisibleCount(visibleCount + 6)}
                variant="outline"
                className="px-8"
              >
                Load More
              </Button>
            </div>
          )}

          {/* No Results */}
          {serviceProviders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-[16px]">No service providers found</p>
              {(selectedCategories.length > 0 || selectedLocations.length > 0) && (
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}

          {/* Continue Button */}
          {selectedServices.length > 0 && (
            <div className="fixed bottom-8 right-8">
              <Button
                onClick={() => onNavigate('createCampaign')}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-6 text-[16px]"
              >
                Continue with {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Sheet */}
      <FilterSheet
        open={showFilterSheet}
        onClose={() => setShowFilterSheet(false)}
        selectedCategories={selectedCategories}
        selectedLocations={selectedLocations}
        onCategoryChange={handleCategoryChange}
        onLocationChange={handleLocationChange}
        onClearFilters={handleClearFilters}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
}
