import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Button } from '../ui/button';
import { NavBar } from '../NavBar';
import { ChevronLeft, ChevronRight, Home, Bed, SlidersHorizontal } from 'lucide-react';
import svgPaths from '../../imports/svg-v7bnpyv673';
import { FilterSheet } from '../FilterSheet';
import { toast } from 'sonner';
import { serviceStorage } from '../../utils/serviceStorage';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices';

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  onShowSelectCampaign?: () => void;
  isFirstTimeUser?: boolean;
  onSelectService?: (service: ServiceProvider) => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
  onSearch?: (query: string) => void;
  onSearchFocus?: () => void;
  onSelectProvider?: (provider: any) => void;
}

interface ServiceProvider {
  id: number;
  name: string;
  location: string;
  category: string;
  image: string;
}

export function DashboardPage({ onNavigate, onShowNotifications, isFirstTimeUser = false, onSelectService, hasUnreadNotifications = false, onShowCart, onSearch, onSearchFocus, onSelectProvider }: DashboardPageProps) {
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const [allProviders, setAllProviders] = useState<ReturnType<typeof serviceStorage.getUniqueServiceProviders>>([]);

  // Hero carousel images with associated service providers
  const heroSlides = useMemo(() => {
    // Get top featured service providers from seed data
    const providers = serviceStorage.getUniqueServiceProviders();
    
    // Select featured providers for the hero carousel
    const featured = providers.slice(0, 6).map(provider => ({
      image: provider.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1080',
      providerId: provider.id,
      name: provider.businessName,
      location: provider.location,
      businessType: provider.businessType
    }));
    
    return featured.length > 0 ? featured : [
      { 
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1080', 
        providerId: 'sp_001', 
        name: 'Blue Water Hospitality Group',
        location: 'Cape Town',
        businessType: 'Accommodation'
      }
    ];
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!isFirstTimeUser) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isFirstTimeUser, heroSlides.length]);

  useEffect(() => {
    // Get all unique service providers from centralized storage
    const providers = serviceStorage.getUniqueServiceProviders();
    console.log('DashboardPage: Loaded providers:', providers);
    console.log('DashboardPage: Total providers:', providers.length);
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

  const handleCreateCampaign = () => {
    onNavigate('createCampaign');
    toast.success('Starting campaign creation');
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

  const handleServiceProviderClick = (provider: any) => {
    // Get the provider's services from centralized storage
    // provider.id is actually the serviceProviderId (e.g., 'vendor_001')
    const providerServices = serviceStorage.filterServices({
      providerId: provider.id,  // This is the serviceProviderId
      available: true
    });
    
    console.log('Provider clicked:', provider);
    console.log('Provider services found:', providerServices);
    
    // If provider has services, select the first one
    if (providerServices.length > 0) {
      const firstService = providerServices[0];
      
      console.log('First service:', firstService);
      
      // Convert to ServiceProvider format for compatibility with ServiceDetailPage
      const serviceToView: ServiceProvider = {
        id: firstService.id,  // This is already a number
        name: firstService.name,
        location: firstService.location,
        category: firstService.category,
        image: firstService.image,
      };
      
      if (onSelectService) {
        onSelectService(serviceToView);
      }
      onNavigate('serviceDetail');
      toast.success(`Viewing ${firstService.name} from ${provider.businessName}`);
    } else {
      toast.error(`${provider.businessName} has no available services`);
    }
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
    setVisibleCount(6); // Reset pagination
    toast.success('Filters cleared');
  };

  const handleApplyFilters = () => {
    setShowFilterSheet(false);
    setVisibleCount(6); // Reset pagination when filters change
    const filterCount = selectedCategories.length + selectedLocations.length;
    if (filterCount > 0) {
      toast.success(`${filterCount} filter(s) applied`);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredProviders.length));
    toast.success('Loading more providers...');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleHeroClick = () => {
    const currentHero = heroSlides[currentSlide];
    // Find the service provider that matches the hero slide
    const provider = allProviders.find(p => p.id === currentHero.providerId);
    
    if (provider) {
      // Get the provider's services from centralized storage
      const providerServices = serviceStorage.filterServices({
        providerId: provider.id,  // This is the serviceProviderId
        available: true
      });
      
      // If provider has services, select the first one
      if (providerServices.length > 0) {
        const firstService = providerServices[0];
        
        // Convert to ServiceProvider format for compatibility with ServiceDetailPage
        const serviceToView: ServiceProvider = {
          id: firstService.id,  // This is the numeric service ID
          name: firstService.name,
          location: firstService.location,
          category: firstService.category,
          image: firstService.image,
        };
        
        if (onSelectService) {
          onSelectService(serviceToView);
        }
        onNavigate('serviceDetail');
        toast.success(`Viewing ${firstService.name} from ${provider.businessName}`);
      } else {
        toast.error(`${provider.businessName} has no available services`);
      }
    } else {
      toast.error('Service provider not found');
    }
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering hero click
    prevSlide();
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering hero click
    nextSlide();
  };

  const handleSlideIndicatorClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // Prevent triggering hero click
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <NavBar 
        onNavigate={onNavigate}
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
        onSearch={onSearch}
        onSearchFocus={onSearchFocus}
        onSelectProvider={onSelectProvider}
        onSelectService={onSelectService}
      />

      {/* Main Content */}
      <div className="p-8">
        {/* Hero Carousel - Only for returning users */}
        {!isFirstTimeUser && (
          <div className="relative mb-8 rounded-xl overflow-hidden">
            <div 
              onClick={handleHeroClick}
              className="relative h-80 w-full cursor-pointer group"
            >
              <img
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-700/60 hover:bg-gray-700/80 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            <button 
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-700/60 hover:bg-gray-700/80 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight size={24} className="text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => handleSlideIndicatorClick(e, index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-white w-6' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* How it works Section - Only for first time users */}
        {isFirstTimeUser && (
          <div className="mb-12 bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-gray-900 mb-8 text-center">How it works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <button 
                onClick={() => onNavigate('overview')}
                className="flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-900">Browse</p>
              </button>

              {/* Step 2 */}
              <button 
                onClick={() => onNavigate('overview')}
                className="flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <Bed className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-900">Select</p>
              </button>

              {/* Step 3 */}
              <button 
                onClick={() => onNavigate('overview')}
                className="flex flex-col items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-900">Contribute</p>
              </button>
            </div>
          </div>
        )}

        {/* Service Providers Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">Service Providers</h2>
          
          <div className="flex items-center gap-3">
            {/* Filter By Button */}
            <Button
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
              onClick={handleFilterBy}
            >
              <SlidersHorizontal className="mr-2" size={18} />
              Filter By
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
            <button
              key={provider.id}
              onClick={() => handleServiceProviderClick(provider)}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow text-left"
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
          ))}
        </div>

        {/* Create Your First Campaign Button - Only for first time users */}
        {isFirstTimeUser ? (
          <div className="flex justify-center">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white px-8"
              onClick={handleCreateCampaign}
            >
              Create Your First Campaign
            </Button>
          </div>
        ) : (
          /* Load More Button - Only for returning users */
          serviceProviders.length > 0 && hasMore && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={handleLoadMore}
              >
                Load More
              </Button>
            </div>
          )
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