import { useState } from 'react';
import { ChevronLeft, Plus, ShoppingCart, Search } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { NavBar } from '../../components/layout/NavBar';
import { toast } from 'sonner';
import { serviceStorage } from '../../utils/serviceStorage';
import { ServiceDetailDialog } from './components/ServiceDetailDialog';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'termsConditions';

interface CartItem {
  id: number;
  type: 'room' | 'food' | 'transport' | 'activity';
  name: string;
  price: string;
  checkIn?: string;
  checkOut?: string;
  location?: string;
  provider?: string;
  image?: string;
  quantity?: number;
  nights?: number;
  totalPrice?: number;
}

interface ServiceProvider {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  price: string;
  priceRate?: string;
  description?: string;
  amenities?: string[];
}

interface BrowseServiceProvidersPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  cartItems?: CartItem[];
  onAddToCart?: (item: CartItem) => void;
  onBackToCampaign?: () => void;
}

export function BrowseServiceProvidersPage({ 
  onNavigate, 
  onShowNotifications, 
  hasUnreadNotifications,
  cartItems = [],
  onAddToCart,
  onBackToCampaign
}: BrowseServiceProvidersPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  // Get all service providers from storage
  const allProviders = serviceStorage.getAllServiceProviders();

  // Transform to include rating and reviews
  const providersWithRatings = allProviders.map(provider => ({
    ...provider,
    rating: parseFloat((4.5 + Math.random() * 0.5).toFixed(1)), // Random rating between 4.5-5.0
    reviews: Math.floor(Math.random() * 100) + 10, // Random reviews between 10-110
    price: provider.price || provider.priceRate || 'R0.00', // Ensure price exists
  }));

  // Filter providers based on category, location, and search
  const filteredProviders = providersWithRatings.filter(provider => {
    const matchesCategory = selectedCategory === 'all' || provider.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesLocation = selectedLocation === 'all' || provider.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesSearch = searchQuery === '' || 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesLocation && matchesSearch;
  });

  // Get unique locations for filter
  const locations = Array.from(new Set(allProviders.map(p => p.location)));

  const handleAddService = (provider: ServiceProvider) => {
    // Open dialog to show service details and allow date/quantity selection
    setSelectedService(provider);
    setShowServiceDialog(true);
  };

  const handleAddToCartFromDialog = (item: CartItem) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  const handleContinueToCampaign = () => {
    if (onBackToCampaign) {
      onBackToCampaign();
    } else {
      onNavigate('createCampaign');
    }
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'activities', label: 'Activities' },
    { value: 'transport', label: 'Transport' },
    { value: 'food & dining', label: 'Food & Dining' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        onNavigate={onNavigate} 
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        showCreateButton={false}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={handleContinueToCampaign}
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                <ChevronLeft size={20} className="mr-1" />
                Back to Campaign
              </Button>
              <div>
                <h1 className="text-gray-900">Browse Service Providers</h1>
                <p className="text-gray-600 text-sm mt-1">
                  Add services to your campaign. All selections will be saved automatically.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg flex items-center gap-2">
                <ShoppingCart size={20} />
                <span>{cartItems.length} {cartItems.length === 1 ? 'service' : 'services'} selected</span>
              </div>
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={handleContinueToCampaign}
              >
                Continue to Campaign
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-3 gap-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search providers, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Service Providers Grid */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {filteredProviders.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProviders.length} {filteredProviders.length === 1 ? 'provider' : 'providers'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200"
                >
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-sm">
                      â­ {provider.rating} ({provider.reviews})
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1">{provider.name}</h3>
                        <p className="text-gray-600 text-sm">{provider.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {provider.category}
                      </span>
                    </div>
                    {provider.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {provider.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-gray-500 text-xs">Starting from</p>
                        <p className="text-gray-900">{provider.priceRate || provider.price}</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleAddService(provider)}
                      >
                        <Plus size={16} className="mr-1" />
                        Add Service
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No providers found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLocation('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Floating Continue Button (Mobile) */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 lg:hidden">
          <Button
            className="bg-purple-600 hover:bg-purple-700 shadow-lg"
            onClick={handleContinueToCampaign}
          >
            <ShoppingCart size={20} className="mr-2" />
            Continue ({cartItems.length})
          </Button>
        </div>
      )}

      {/* Service Detail Dialog */}
      <ServiceDetailDialog
        open={showServiceDialog}
        onOpenChange={setShowServiceDialog}
        service={selectedService}
        onAddToCart={handleAddToCartFromDialog}
      />
    </div>
  );
}
