import { useState } from 'react';
import { Star, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { BookingDialog } from './BookingDialog';
import heroImage from 'figma:asset/eded76b0816dec0ad7f1dddbeaf9aa2dfcb13f08.png';
import transportHero from 'figma:asset/724157749a9f42305dc76c4abfaa2cd3b408f406.png';
import activitiesHero from 'figma:asset/8f342e421018cdfcdde48be2b8b9badba169144b.png';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign';

interface ServiceDetailPageProps {
  onNavigate: (page: Page) => void;
}

export function ServiceDetailPage({ onNavigate }: ServiceDetailPageProps) {
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{ name: string; price: string } | null>(null);
  const [currentTab, setCurrentTab] = useState('rooms');

  // Change hero image based on active tab
  const getHeroImage = () => {
    if (currentTab === 'transport') return transportHero;
    if (currentTab === 'activities' || currentTab === 'terms') return activitiesHero;
    return heroImage;
  };

  const rooms = [
    {
      name: 'Standard Room',
      description: 'Spacious Double room with garden view',
      price: 'R1 500',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzYyNjE3Mjk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Deluxe Room',
      description: 'Spacious Double room with garden view',
      price: 'R2 500',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyNjE3MzA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const foodItems = [
    {
      name: 'Standard Room',
      description: 'Spacious Double room with garden view',
      price: 'R1 500',
      image: 'https://images.unsplash.com/photo-1737141499770-cd5eda86410d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwZm9vZCUyMHBsYXR0ZXJ8ZW58MXx8fHwxNzYyNjE4MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Deluxe Room',
      description: 'Spacious Double room with garden view',
      price: 'R2 500',
      image: 'https://images.unsplash.com/photo-1722477936580-84aa10762b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJyZWFrZmFzdCUyMGJ1ZmZldHxlbnwxfHx8fDE3NjI2MTgxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const transportOptions = [
    {
      name: 'Standard Room',
      description: 'Spacious Double room with garden view',
      price: 'R1 500',
      image: 'https://images.unsplash.com/photo-1745516755240-31c7aa6e7bb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2YW4lMjBzaHV0dGxlfGVufDF8fHx8MTc2MjYxODU1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Deluxe Room',
      description: 'Spacious Double room with garden view',
      price: 'R2 500',
      image: 'https://images.unsplash.com/photo-1745516755240-31c7aa6e7bb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2YW4lMjBzaHV0dGxlfGVufDF8fHx8MTc2MjYxODU1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const activities = [
    {
      name: 'Standard Room',
      description: 'Spacious Double room with garden view',
      price: 'R1 500',
      image: 'https://images.unsplash.com/photo-1542762002-45279e010961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFkJTIwYmlrZSUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NjI2MTg1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Deluxe Room',
      description: 'Spacious Double room with garden view',
      price: 'R2 500',
      image: 'https://images.unsplash.com/photo-1645976443265-b707c8f87203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHZvbGxleWJhbGwlMjBnYW1lfGVufDF8fHx8MTc2MjYxODU1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const handleBookRoom = (room: { name: string; price: string }) => {
    setSelectedRoom(room);
    setShowBookingDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h1 className="text-gray-900">Select Services</h1>
        <button className="hover:bg-gray-100 rounded p-2">
          <MoreVertical size={20} className="text-gray-700" />
        </button>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Hero Image */}
        <div className="mb-6 rounded-lg overflow-hidden">
          <ImageWithFallback 
            src={getHeroImage()}
            alt="Cape Town Gateway Weekend"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Service Info */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-gray-900 mb-2">Cape Town Gateway Weekend</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <Star size={16} className="text-gray-300" />
                </div>
                <span className="text-gray-600">(12 Reviews)</span>
              </div>
              <p className="text-gray-600 mb-2">Cape Town | Accommodation</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            Nestled in the heart of Cape Town with breathtaking views of the ocean and Table Mountain, 
            Cape Town Gateway offers an unforgettable experience for couples and families. With 
            elegantly furnished rooms, private balconies, an outdoor pool, and World-class hospitality. 
            Whether you're here for a relaxing getaway at a bustling city, Seaview Lodge offers a memorable 
            stay with easy access to the beach, local attractions, and fine dining.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="rooms" value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
          </TabsList>

          <TabsContent value="rooms" className="space-y-6">
            {rooms.map((room, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden flex gap-4 p-4">
                <div className="w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <ImageWithFallback 
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-900 mb-2">{room.name}</h3>
                    <p className="text-gray-600">{room.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-gray-600">From </span>
                      <span className="text-gray-900">{room.price}</span>
                    </div>
                    <Button 
                      onClick={() => handleBookRoom(room)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="food" className="space-y-6">
            {foodItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden flex gap-4 p-4">
                <div className="w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <ImageWithFallback 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-gray-600">From </span>
                      <span className="text-gray-900">{item.price}</span>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="transport" className="space-y-6">
            {transportOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden flex gap-4 p-4">
                <div className="w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <ImageWithFallback 
                    src={option.image}
                    alt={option.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-900 mb-2">{option.name}</h3>
                    <p className="text-gray-600">{option.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-gray-600">From </span>
                      <span className="text-gray-900">{option.price}</span>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Book
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-4">
              <Button 
                onClick={() => onNavigate('selectedServices')}
                className="bg-white hover:bg-gray-50 text-purple-600 border border-purple-600"
                variant="outline"
              >
                <span className="mr-2">🛒</span> Campaigns
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            {activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden flex gap-4 p-4">
                <div className="w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <ImageWithFallback 
                    src={activity.image}
                    alt={activity.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-900 mb-2">{activity.name}</h3>
                    <p className="text-gray-600">{activity.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-gray-600">From </span>
                      <span className="text-gray-900">{activity.price}</span>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Book
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-4">
              <Button 
                onClick={() => onNavigate('selectedServices')}
                className="bg-white hover:bg-gray-50 text-purple-600 border border-purple-600"
                variant="outline"
              >
                <span className="mr-2">🛒</span> Campaigns
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="terms">
            <div className="bg-white rounded-lg p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nestled in the heart of Cape Town with breathtaking views of the ocean and Table Mountain, 
                  Seaview Lodge offers premium comfort and modern amenities for couples and families. Guests can enjoy 
                  elegantly furnished rooms, private balconies, an outdoor pool, and world-class hospitality. 
                  Whether you're here for a relaxing getaway or a business trip, Seaview Lodge ensures a memorable 
                  stay with easy access to the beach, local attractions, and fine dining.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <input type="checkbox" id="terms-agree" className="w-4 h-4 text-purple-600 border-gray-300 rounded" />
                  <label htmlFor="terms-agree" className="text-gray-700">I agree with terms and services T&Cs</label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom Action */}
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={() => onNavigate('selectedServices')}
            className="bg-purple-600 hover:bg-purple-700 px-8"
          >
            Add to Campaigns
          </Button>
        </div>
      </div>

      {/* Booking Dialog */}
      {selectedRoom && (
        <BookingDialog
          open={showBookingDialog}
          onOpenChange={setShowBookingDialog}
          roomName={selectedRoom.name}
          price={selectedRoom.price}
          onConfirm={() => {
            // Handle booking confirmation
            console.log('Booking confirmed for', selectedRoom.name);
          }}
        />
      )}
    </div>
  );
}
