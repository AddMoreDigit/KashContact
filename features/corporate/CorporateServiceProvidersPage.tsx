import { useState } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import { SelectServicesSheet } from '../../components/SelectServicesSheet';
import { serviceStorage } from '../../utils/serviceStorage';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { CorporateSidebar } from './components/CorporateSidebar';
import { NavBar } from '../../components/NavBar';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'approveBookingRequest' | 'editBooking' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable' | 'corporateSelectServices' | 'corporateServiceProviders';

interface CorporateServiceProvidersPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
}

// Hero image for carousel
const heroImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjU4MzY0MHww&ixlib=rb-4.1.0&q=80&w=1080';

export function CorporateServiceProvidersPage({ onNavigate, onShowNotifications, hasUnreadNotifications = false, onShowCart }: CorporateServiceProvidersPageProps) {
  const [activePage, setActivePage] = useState<string>('serviceProviders');
  const [showSelectService, setShowSelectService] = useState(false);
  const [showServiceSelection, setShowServiceSelection] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    onNavigate(page);
  };

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
          userType="corporate"
        />

        <div className="min-h-screen bg-gray-50">
          {/* Hero Section with Carousel */}
          <div className="relative h-[500px] bg-gray-900 mb-8">
            <ImageWithFallback
              src={heroImage}
              alt="Service Providers"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex items-center">
              <div className="container mx-auto px-8">
                <h1 className="text-[48px] text-white mb-4">Explore Service Providers</h1>
                <p className="text-[20px] text-white/90 mb-8 max-w-2xl">
                  Discover exceptional service providers for your corporate campaigns
                </p>
                <Button
                  onClick={() => onNavigate('corporateSelectServices')}
                  className="bg-purple-600 hover:bg-purple-700 px-8 py-6 text-[16px]"
                >
                  Browse All Services
                </Button>
              </div>
            </div>
          </div>

          {/* Filters and Content */}
          <div className="container mx-auto px-8 pb-12">
            {/* Filter Bar */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-[28px] text-gray-900 mb-2">Service Providers</h2>
                <p className="text-[16px] text-gray-600">
                  {providers.length} provider{providers.length !== 1 ? 's' : ''} available
                </p>
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

            {/* Active Filters */}
            {(selectedCategories.length > 0 || selectedLocations.length > 0) && (
              <div className="mb-6 flex flex-wrap gap-2 items-center">
                <span className="text-[14px] text-gray-600">Active filters:</span>
                {selectedCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full"
                  >
                    <span className="text-[14px]">{category}</span>
                    <button
                      onClick={() => handleCategoryChange(category, false)}
                      className="hover:bg-purple-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {selectedLocations.map((location) => (
                  <div
                    key={location}
                    className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full"
                  >
                    <span className="text-[14px]">{location}</span>
                    <button
                      onClick={() => handleLocationChange(location, false)}
                      className="hover:bg-purple-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleClearFilters}
                  className="text-[14px] text-purple-600 hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Service Providers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    // Store selected provider and navigate
                    localStorage.setItem('selectedProvider', JSON.stringify(provider));
                    onNavigate('serviceDetail');
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={provider.image}
                      alt={provider.businessName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[18px] text-gray-900 mb-2">{provider.businessName}</h3>
                    <p className="text-[14px] text-gray-600 mb-1">{provider.businessType}</p>
                    <p className="text-[14px] text-gray-500 mb-3">{provider.location}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] text-purple-600">{provider.serviceCount} services</span>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          localStorage.setItem('selectedProvider', JSON.stringify(provider));
                          onNavigate('serviceDetail');
                        }}
                        variant="outline"
                        size="sm"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {providers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-[16px] mb-4">No service providers found</p>
                {(selectedCategories.length > 0 || selectedLocations.length > 0) && (
                  <Button
                    onClick={handleClearFilters}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Sheet */}
      <SelectServicesSheet
        open={showFilterSheet}
        onClose={() => setShowFilterSheet(false)}
        selectedCategories={selectedCategories}
        selectedLocations={selectedLocations}
        onCategoryChange={handleCategoryChange}
        onLocationChange={handleLocationChange}
        onClearFilters={handleClearFilters}
        onApplyFilters={handleApplyFilters}
      />

      <Toaster />
    </div>
  );
}
