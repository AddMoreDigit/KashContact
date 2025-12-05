import { useState, useEffect } from 'react';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { RoomBookingDialog } from '../features/booking/components/RoomBookingDialog';
import { CartDialog } from '../features/campaigns/components/CartDialog';
import { NavBar } from './layout/NavBar';
import { serviceStorage, ServiceData } from '../utils/serviceStorage';

// Import Figma images
// import imgRectangle115 from "../../imports/figma/asset/0e961f9582aec77a34bf07fab9ef41a1b7c868ad.png";
// import imgRectangle148 from "../../imports/figma/asset/2d90d1ffe99df5817a38c395c08ec5116a7be340.png";
// import imgRectangle150 from "../../imports/figma/asset/50b9941bb18b04433a8da878785acb0358877f72.png";

// Import Food tab images
// import imgRectangle115Food from "../../imports/figma/asset/87102388d503206b3b0fb177ad63642a9945094b.png";
// import imgRectangle612Food from "../../imports/figma/asset/d3d1c2b311cd5ffbc7e046f0234a084279bf69e2.png";
// import imgRectangle150Food from "../../imports/figma/asset/840a8d2b23fcae6efd3c33d28ca3649c5eda74ed.png";

// Import Transport tab images
// import imgRectangle115Transport from "../../imports/figma/asset/fe7de853845217d9c1290dc5830a36edf532801b.png";
// import imgRectangle148Transport from "../../imports/figma/asset/703a3a22134188eeed9837e5755d43d8e16d5f2f.png";
// import imgRectangle150Transport from "../../imports/figma/asset/dcaf59de9dc3fbd4c71a055baaafd59cadfc1096.png";

// Import Activities tab images
// import imgRectangle115Activities from "../../imports/figma/asset/2cd0806b75ceaec4ce1353812cc2f2eb82fde8f2.png";
// import imgRectangle148Activities from "../../imports/figma/asset/6a4cb1a71759404169c3e112082d2c3714560afd.png";
// import imgRectangle150Activities from "../../imports/figma/asset/c7aad628ae96a153d38a7f65ffdeb84cab179b40.png";

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft';

interface ServiceProvider {
  id: number;
  name: string;
  location: string;
  category: string;
  image: string;
}

interface ServiceDetailPageProps {
  onNavigate: (page: Page) => void;
  onShowSelectCampaign?: () => void;
  service?: ServiceProvider | null;
  cartItems?: BookedItem[];
  onUpdateCart?: (items: BookedItem[]) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
}

interface Room {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface ServiceItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface BookedItem {
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

export function ServiceDetailPage({ onNavigate, onShowSelectCampaign, service, cartItems = [], onUpdateCart, onShowNotifications, hasUnreadNotifications, onShowCart }: ServiceDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'rooms' | 'food' | 'transport' | 'activities' | 'terms'>('rooms');
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookedItems, setBookedItems] = useState<BookedItem[]>(cartItems);
  const [showCartDialog, setShowCartDialog] = useState(false);
  
  // Load vendor services
  const [vendorServices, setVendorServices] = useState<{
    rooms: ServiceData[];
    food: ServiceData[];
    transport: ServiceData[];
    activities: ServiceData[];
  }>({
    rooms: [],
    food: [],
    transport: [],
    activities: [],
  });
  
  const [serviceProviderName, setServiceProviderName] = useState<string>('Service Provider');
  const [termsAndConditions, setTermsAndConditions] = useState<string>('');
  const [businessType, setBusinessType] = useState<string>('Hospitality');

  // Load vendor services when service changes
  useEffect(() => {
    if (service?.id) {
      const allServices = serviceStorage.getAllServiceProviders();
      
      // Find the full service data
      const fullServiceData = allServices.find(s => s.id === service.id);
      
      if (fullServiceData) {
        setServiceProviderName(fullServiceData.serviceProviderName || 'Service Provider');
        setTermsAndConditions(fullServiceData.termsAndConditions || '');
        
        // Get all services from the same provider
        const providerServices = allServices.filter(
          s => s.serviceProviderId === fullServiceData.serviceProviderId
        );
        
        // Determine business type from categories
        const categories = [...new Set(providerServices.map(s => s.category))];
        let determinedBusinessType = 'Hospitality';
        if (categories.some(cat => cat.toLowerCase().includes('accommodation'))) {
          determinedBusinessType = 'Accommodation';
        } else if (categories.some(cat => cat.toLowerCase().includes('food'))) {
          determinedBusinessType = 'Food Service';
        } else if (categories.some(cat => cat.toLowerCase().includes('transport'))) {
          determinedBusinessType = 'Transportation';
        } else if (categories.some(cat => cat.toLowerCase().includes('tour') || cat.toLowerCase().includes('activity'))) {
          determinedBusinessType = 'Tours & Activities';
        }
        setBusinessType(determinedBusinessType);
        
        // Categorize services
        setVendorServices({
          rooms: providerServices.filter(s => 
            s.category.toLowerCase().includes('accommodation') || 
            s.category.toLowerCase().includes('room')
          ),
          food: providerServices.filter(s => 
            s.category.toLowerCase().includes('food') || 
            s.category.toLowerCase().includes('dining')
          ),
          transport: providerServices.filter(s => 
            s.category.toLowerCase().includes('transport') || 
            s.category.toLowerCase().includes('shuttle') ||
            s.category.toLowerCase().includes('transfer')
          ),
          activities: providerServices.filter(s => 
            s.category.toLowerCase().includes('activity') || 
            s.category.toLowerCase().includes('activities') ||
            s.category.toLowerCase().includes('tour') ||
            s.category.toLowerCase().includes('safari') ||
            s.category.toLowerCase().includes('boat')
          ),
        });
      }
    }
  }, [service]);

  // Load terms acceptance from localStorage
  const [termsAccepted, setTermsAccepted] = useState(() => {
    const saved = localStorage.getItem('termsAccepted');
    return saved === 'true';
  });

  // Sync local state with cart items from parent
  useEffect(() => {
    setBookedItems(cartItems);
  }, [cartItems]);

  // Save terms acceptance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('termsAccepted', termsAccepted.toString());
  }, [termsAccepted]);

  // Use service data or default values
  const serviceName = service?.name || 'Cape Town Gateway Weekend';
  const serviceLocation = service?.location || 'Cape Town';
  const serviceCategory = service?.category || 'Accommodation';
  
  // Hero images for each tab
  const getHeroImage = () => {
    switch (activeTab) {
      case 'food':
        return "/asset/87102388d503206b3b0fb177ad63642a9945094b.png";
      case 'transport':
        return "/asset/fe7de853845217d9c1290dc5830a36edf532801b.png";
      case 'activities':
        return "/asset/2cd0806b75ceaec4ce1353812cc2f2eb82fde8f2.png";
      default:
        return service?.image || "/asset/0e961f9582aec77a34bf07fab9ef41a1b7c868ad.png";
    }
  };
  
  const serviceImage = getHeroImage();

  const rooms: Room[] = [
    {
      id: 1,
      name: 'Standard Room',
      description: 'Spacious Double room\nwith garden view',
      price: 'R1 500',
      image: "/asset/2d90d1ffe99df5817a38c395c08ec5116a7be340.png",
    },
    {
      id: 2,
      name: 'Deluxe Room',
      description: 'Spacious Double room\nwith garden view',
      price: 'R2 500',
      image: "/asset/50b9941bb18b04433a8da878785acb0358877f72.png",
    },
  ];

  const foodOptions: ServiceItem[] = [
    {
      id: 1,
      name: 'Standard Room',
      description: 'Spacious Double room\nwith garden view',
      price: 'R1 500',
      image: "/asset/d3d1c2b311cd5ffbc7e046f0234a084279bf69e2.png",
    },
    {
      id: 2,
      name: 'Deluxe Room',
      description: 'Spacious Double room\nwith garden view',
      price: 'R2 500',
      image: "/asset/840a8d2b23fcae6efd3c33d28ca3649c5eda74ed.png",
    },
  ];

  const transportOptions: ServiceItem[] = [
    {
      id: 1,
      name: 'Standard Room',
      description: 'Spacious Double room\nwith garden view',
      price: 'R1 500',
      image: "/asset/703a3a22134188eeed9837e5755d43d8e16d5f2f.png",
    },
    {
      id: 2,
      name: 'Deluxe Room',
      description: 'Spacious Double room\nwith garden view',
      price: 'R2 500',
      image: "/asset/dcaf59de9dc3fbd4c71a055baaafd59cadfc1096.png",
    },
  ];

  const activitiesOptions: ServiceItem[] = [
    {
      id: 1,
      name: 'Standard Room',
      description: 'Spacious Double room\nwith garden view',
      price: 'R1 500',
      image: "/asset/6a4cb1a71759404169c3e112082d2c3714560afd.png",
    },
    {
      id: 2,
      name: 'Deluxe Room',
      description: 'Spacious Double room\nwith garden view',
      price: 'R2 500',
      image: "/asset/c7aad628ae96a153d38a7f65ffdeb84cab179b40.png",
    },
  ];

  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room);
    setShowBookingDialog(true);
  };

  const handleBookServiceItem = (item: ServiceItem, type: 'food' | 'transport' | 'activity') => {
    // For non-room items, book directly without the dialog
    const newBooking: BookedItem = {
      id: Date.now(), // Use unique timestamp-based ID to prevent duplicates across categories
      type: type,
      name: item.name,
      price: item.priceRate ? `R${item.priceRate}` : (item.price || 'R0'),
      provider: service?.name || 'Service Provider',
      image: item.image,
      quantity: 1,
    };
    const updatedItems = [...bookedItems, newBooking];
    setBookedItems(updatedItems);
    if (onUpdateCart) {
      onUpdateCart(updatedItems);
    }
    toast.success(`${item.name} added to your selection!`);
  };

  const handleBookingComplete = (checkIn?: string, checkOut?: string, quantity?: number) => {
    if (selectedRoom && checkIn && checkOut) {
      // Calculate nights between check-in and check-out
      const checkInParts = checkIn.split(' ');
      const checkOutParts = checkOut.split(' ');
      const checkInDay = parseInt(checkInParts[1].replace(',', ''));
      const checkOutDay = parseInt(checkOutParts[1].replace(',', ''));
      const nights = checkOutDay - checkInDay;
      
      // Calculate total price: price per night × nights × quantity
      const pricePerNight = parseFloat(selectedRoom.price.replace(/[^0-9.-]+/g, ''));
      const totalPrice = pricePerNight * nights * (quantity || 1);
      
      const newBooking: BookedItem = {
        id: Date.now(), // Use unique timestamp-based ID to allow multiple bookings of same room
        type: 'room',
        name: selectedRoom.name,
        price: selectedRoom.price,
        checkIn,
        checkOut,
        location: serviceLocation,
        provider: serviceName,
        image: selectedRoom.image,
        quantity: quantity || 1,
        nights: nights,
        totalPrice: totalPrice,
      };
      const updatedItems = [...bookedItems, newBooking];
      setBookedItems(updatedItems);
      if (onUpdateCart) {
        onUpdateCart(updatedItems);
      }
      toast.success(`${selectedRoom.name} ${quantity && quantity > 1 ? `(${quantity} rooms)` : ''} booked successfully!`);
    }
    setShowBookingDialog(false);
    setSelectedRoom(null);
  };

  const isItemBooked = (id: number, type: 'room' | 'food' | 'transport' | 'activity') => {
    // For rooms, check by type and name since we allow multiple bookings
    // For other services, just check if any item of that type exists
    if (type === 'room') {
      return false; // Allow multiple room bookings
    }
    // For food, transport, activities - check if already added
    const item = type === 'food' ? foodOptions.find(o => o.id === id) :
                 type === 'transport' ? transportOptions.find(o => o.id === id) :
                 activitiesOptions.find(o => o.id === id);
    if (!item) return false;
    return bookedItems.some(booked => booked.type === type && booked.name === item.name);
  };

  const handleRemoveBooking = (id: number, type: 'room' | 'food' | 'transport' | 'activity') => {
    // For rooms, remove by exact ID
    // For others, remove by name match since they have unique timestamp IDs
    const updatedItems = bookedItems.filter(item => {
      if (type === 'room') {
        return item.id !== id;
      }
      // For other types, find the matching item by original ID and remove by name
      const originalItem = type === 'food' ? foodOptions.find(o => o.id === id) :
                          type === 'transport' ? transportOptions.find(o => o.id === id) :
                          activitiesOptions.find(o => o.id === id);
      if (!originalItem) return true;
      return !(item.type === type && item.name === originalItem.name);
    });
    setBookedItems(updatedItems);
    if (onUpdateCart) {
      onUpdateCart(updatedItems);
    }
    toast.success('Booking removed');
  };

  const handleAddToCampaign = () => {
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    if (bookedItems.length === 0) {
      toast.error('Please book at least one service');
      return;
    }
    // Navigate to create campaign page (don't clear items - they're needed in CreateCampaignPage)
    onNavigate('createCampaign');
  };

  const handleCampaigns = () => {
    setShowCartDialog(true);
  };

  const handleCartContinue = () => {
    // Navigate to create campaign page (don't clear items - they're needed in CreateCampaignPage)
    onNavigate('createCampaign');
    setShowCartDialog(false);
  };

  const handleCartRemoveItem = (itemId: number) => {
    const updatedItems = bookedItems.filter(item => item.id !== itemId);
    setBookedItems(updatedItems);
    if (onUpdateCart) {
      onUpdateCart(updatedItems);
    }
  };

  const handleBackToHome = () => {
    onNavigate('dashboard');
  };

  const handleNavigateToTerms = () => {
    setActiveTab('terms');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavBar 
        onNavigate={onNavigate}
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
        showCreateButton={false}
        showBackButton={true}
        onBack={handleBackToHome}
      />

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Hero Image */}
        <div className="mb-6 rounded-lg overflow-hidden shadow-md">
          <img
            src={serviceImage}
            alt={serviceName}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Service Title and Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-gray-900">{serviceProviderName}</h2>
            <div className="flex items-center gap-1">
              <Star size={20} className="fill-amber-400 text-amber-400" />
              <Star size={20} className="fill-amber-400 text-amber-400" />
              <Star size={20} className="fill-amber-400 text-amber-400" />
              <Star size={20} className="text-gray-300" />
              <span className="ml-2 text-gray-600">&#123;12 Reviews&#125;</span>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{serviceLocation} / {businessType}</p>

          <p className="text-gray-700 leading-relaxed">
            Nestled in the heart of {serviceLocation} with breathtaking views of the ocean and Table Mountain,
            {serviceProviderName} offers premium comfort and modern amenities for travelers. Guests can enjoy
            elegantly furnished rooms, private balconies, an outdoor pool, and world-class hospitality.
            Whether you're here for a relaxing getaway or a business trip, {serviceProviderName} ensures a memorable
            stay with easy access to the beach, local attractions, and fine dining.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`pb-3 relative ${
                activeTab === 'rooms'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Rooms
              {activeTab === 'rooms' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`pb-3 relative ${
                activeTab === 'food'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Food
              {activeTab === 'food' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('transport')}
              className={`pb-3 relative ${
                activeTab === 'transport'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Transport
              {activeTab === 'transport' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`pb-3 relative ${
                activeTab === 'activities'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Activities
              {activeTab === 'activities' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`pb-3 relative ${
                activeTab === 'terms'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Terms & Conditions
              {activeTab === 'terms' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content - Rooms */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            {vendorServices.rooms.length > 0 ? (
              vendorServices.rooms.map((room) => {
                const isBooked = isItemBooked(room.id, 'room');
                return (
                  <div
                    key={room.id}
                    className={`bg-white rounded-lg shadow-md overflow-hidden flex w-[70%] relative ${
                      isBooked ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                    }`}
                  >
                    {isBooked && (
                      <div className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full z-10 flex items-center gap-2">
                        <span>✓ Booked</span>
                        <button
                          onClick={() => handleRemoveBooking(room.id, 'room')}
                          className="ml-2 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    <div className="w-80 h-64 flex-shrink-0">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-gray-900 mb-3">{room.name}</h3>
                        <p className="text-purple-600 text-sm mb-2">{room.category}</p>
                        <p className="text-gray-600 whitespace-pre-line">
                          {room.description || 'Spacious and comfortable accommodation'}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-900">From </span>
                          <span className="text-gray-900">R{room.priceRate || room.price}</span>
                          {room.priceUnit && <span className="text-gray-600 text-sm ml-1">{room.priceUnit}</span>}
                        </div>
                        <Button
                          onClick={() => handleBookRoom({
                            id: room.id,
                            name: room.name,
                            description: room.description || '',
                            price: room.priceRate ? `R${room.priceRate}` : (room.price || 'R0'),
                            image: room.image
                          })}
                          disabled={isBooked}
                          className={`px-8 ${
                            isBooked
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-purple-600 hover:bg-purple-700'
                          }`}
                        >
                          {isBooked ? 'Booked' : 'Book'}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No accommodation services available from {serviceProviderName}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab Content - Food */}
        {activeTab === 'food' && (
          <div className="space-y-6">
            {vendorServices.food.length > 0 ? (
              vendorServices.food.map((item) => {
                const isBooked = isItemBooked(item.id, 'food');
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-lg shadow-md overflow-hidden flex w-[70%] relative ${
                      isBooked ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                    }`}
                  >
                    {isBooked && (
                      <div className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full z-10 flex items-center gap-2">
                        <span>✓ Added</span>
                        <button
                          onClick={() => handleRemoveBooking(item.id, 'food')}
                          className="ml-2 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    <div className="w-80 h-64 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-gray-900 mb-3">{item.name}</h3>
                        <p className="text-purple-600 text-sm mb-2">{item.category}</p>
                        <p className="text-gray-600 whitespace-pre-line">
                          {item.description || 'Delicious food and dining options'}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-900">From </span>
                          <span className="text-gray-900">R{item.priceRate || item.price}</span>
                          {item.priceUnit && <span className="text-gray-600 text-sm ml-1">{item.priceUnit}</span>}
                        </div>
                        <Button
                          onClick={() => handleBookServiceItem({
                            id: item.id,
                            name: item.name,
                            description: item.description || '',
                            price: item.priceRate ? `R${item.priceRate}` : (item.price || 'R0'),
                            image: item.image
                          }, 'food')}
                          disabled={isBooked}
                          className={`px-8 ${
                            isBooked
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-purple-600 hover:bg-purple-700'
                          }`}
                        >
                          {isBooked ? 'Added' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No food services available from {serviceProviderName}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab Content - Transport */}
        {activeTab === 'transport' && (
          <div className="space-y-6">
            {vendorServices.transport.length > 0 ? (
              vendorServices.transport.map((item) => {
                const isBooked = isItemBooked(item.id, 'transport');
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-lg shadow-md overflow-hidden flex w-[70%] relative ${
                      isBooked ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                    }`}
                  >
                    {isBooked && (
                      <div className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full z-10 flex items-center gap-2">
                        <span>✓ Added</span>
                        <button
                          onClick={() => handleRemoveBooking(item.id, 'transport')}
                          className="ml-2 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    <div className="w-80 h-64 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-gray-900 mb-3">{item.name}</h3>
                        <p className="text-purple-600 text-sm mb-2">{item.category}</p>
                        <p className="text-gray-600 whitespace-pre-line">
                          {item.description || 'Comfortable and reliable transportation'}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-900">From </span>
                          <span className="text-gray-900">R{item.priceRate || item.price}</span>
                          {item.priceUnit && <span className="text-gray-600 text-sm ml-1">{item.priceUnit}</span>}
                        </div>
                        <Button
                          onClick={() => handleBookServiceItem({
                            id: item.id,
                            name: item.name,
                            description: item.description || '',
                            price: `R${item.priceRate || item.price}`,
                            image: item.image
                          }, 'transport')}
                          disabled={isBooked}
                          className={`px-8 ${
                            isBooked
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-purple-600 hover:bg-purple-700'
                          }`}
                        >
                          {isBooked ? 'Added' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No transport services available from {serviceProviderName}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab Content - Activities */}
        {activeTab === 'activities' && (
          <div className="space-y-6">
            {vendorServices.activities.length > 0 ? (
              vendorServices.activities.map((item) => {
                const isBooked = isItemBooked(item.id, 'activity');
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-lg shadow-md overflow-hidden flex w-[70%] relative ${
                      isBooked ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                    }`}
                  >
                    {isBooked && (
                      <div className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full z-10 flex items-center gap-2">
                        <span>✓ Added</span>
                        <button
                          onClick={() => handleRemoveBooking(item.id, 'activity')}
                          className="ml-2 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    <div className="w-80 h-64 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-gray-900 mb-3">{item.name}</h3>
                        <p className="text-purple-600 text-sm mb-2">{item.category}</p>
                        <p className="text-gray-600 whitespace-pre-line">
                          {item.description || 'Exciting activities and experiences'}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-900">From </span>
                          <span className="text-gray-900">R{item.priceRate || item.price}</span>
                          {item.priceUnit && <span className="text-gray-600 text-sm ml-1">{item.priceUnit}</span>}
                        </div>
                        <Button
                          onClick={() => handleBookServiceItem({
                            id: item.id,
                            name: item.name,
                            description: item.description || '',
                            price: `R${item.priceRate || item.price}`,
                            image: item.image
                          }, 'activity')}
                          disabled={isBooked}
                          className={`px-8 ${
                            isBooked
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-purple-600 hover:bg-purple-700'
                          }`}
                        >
                          {isBooked ? 'Added' : 'Add'}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No activities available from {serviceProviderName}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab Content - Terms & Conditions */}
        {activeTab === 'terms' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8 w-[70%]">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {termsAndConditions || 'No terms and conditions available for this service provider.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Campaigns Button */}
      <div className="fixed bottom-8 right-8">
        <Button
          onClick={handleCampaigns}
          className="bg-purple-100 hover:bg-purple-200 text-gray-900 shadow-lg rounded-full px-8 py-6 flex items-center gap-2 relative"
        >
          <ShoppingCart size={20} />
          Campaigns
          {bookedItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
              {bookedItems.length}
            </span>
          )}
        </Button>
      </div>

      {/* Room Booking Dialog */}
      {selectedRoom && (
        <RoomBookingDialog
          open={showBookingDialog}
          onOpenChange={setShowBookingDialog}
          roomName={selectedRoom.name}
          roomPrice={selectedRoom.price}
          onBookingComplete={handleBookingComplete}
          bookingType="room"
        />
      )}

      {/* Cart Dialog */}
      <CartDialog
        open={showCartDialog}
        onOpenChange={setShowCartDialog}
        items={bookedItems}
        onRemoveItem={handleCartRemoveItem}
        onContinue={handleCartContinue}
        onNavigateToTerms={handleNavigateToTerms}
      />
    </div>
  );
}

