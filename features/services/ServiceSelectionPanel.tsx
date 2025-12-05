import { useState } from 'react';
import { Sheet, SheetContent } from '../../components/ui/sheet';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Calendar } from '../../components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/dialog';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Star, MapPin, X } from 'lucide-react';
import { toast } from 'sonner';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft';

interface ServiceSelectionPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate?: (page: Page) => void;
  onServiceSelected?: (service: any) => void;
}

export function ServiceSelectionPanel({ open, onOpenChange, onNavigate, onServiceSelected }: ServiceSelectionPanelProps) {
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [showCampaignsButton, setShowCampaignsButton] = useState(true);

  const service = {
    name: 'Cape Town Getaway Weekend',
    location: 'Cape Town',
    category: 'Accommodation',
    rating: 4.8,
    reviews: 12,
    description: 'Nestled in the heart of Cape Town with breathtaking views of the ocean and Table Mountain, Seaview Lodge offers premium comfort and style. Guests can enjoy elegantly furnished rooms, private balconies, an outdoor pool, and world-class hospitality. Whether you\'re here for a relaxing getaway or a business trip, Seaview Lodge ensures a memorable stay with easy access to the beach, local attractions, and fine dining.',
    image: 'https://images.unsplash.com/photo-1548766255-344f0e8085c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjI2MTcwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  };

  const rooms = [
    {
      id: 1,
      name: 'Standard Room',
      description: 'Spacious Double room with garden view',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzYyNjI5NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      name: 'Deluxe Room',
      description: 'Spacious Double room with ocean view',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByb29tfGVufDF8fHx8MTc2MjYyOTUxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const foodItems = [
    {
      id: 1,
      name: 'Standard Meal',
      description: 'Delicious buffet breakfast with variety',
      price: 150,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYnVmZmV0fGVufDF8fHx8MTc2MjYyOTUxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      name: 'Premium Dining',
      description: 'Gourmet 3-course meal experience',
      price: 350,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZHxlbnwxfHx8fDE3NjI2Mjk1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const transportOptions = [
    {
      id: 1,
      name: 'Airport Transfer',
      description: 'Round trip airport shuttle service',
      price: 500,
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwc2h1dHRsZXxlbnwxfHx8fDE3NjI2Mjk1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      name: 'City Tour Bus',
      description: 'Full day city sightseeing tour',
      price: 800,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyJTIwYnVzfGVufDF8fHx8MTc2MjYyOTUxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const activities = [
    {
      id: 1,
      name: 'Table Mountain Hike',
      description: 'Guided hiking tour with stunning views',
      price: 450,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpa2luZ3xlbnwxfHx8fDE3NjI2Mjk1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      name: 'Wine Tasting Tour',
      description: 'Visit local wineries and vineyards',
      price: 650,
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjI2Mjk1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const handleBookRoom = (room: any) => {
    setSelectedRoom(room);
    setShowBookingDialog(true);
  };

  const handleAddItem = (item: any, type: string) => {
    setSelectedItems([...selectedItems, { ...item, type }]);
    toast.success(`${item.name} added to campaign`);
  };

  const confirmBooking = () => {
    if (selectedRoom && selectedDate) {
      setSelectedItems([...selectedItems, { ...selectedRoom, type: 'room', date: selectedDate }]);
      toast.success('Booking confirmed!');
      setShowBookingDialog(false);
      setSelectedRoom(null);
      setSelectedDate(undefined);
    }
  };

  const proceedToCampaign = () => {
    if (onServiceSelected) {
      onServiceSelected({
        service,
        items: selectedItems,
      });
    }
    toast.success('Services added to campaign');
    onOpenChange(false);
    if (onNavigate) {
      onNavigate('createCampaign');
    }
  };

  const totalCost = selectedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-2xl p-0 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-gray-900">Select Services</h2>
            <button 
              onClick={() => onOpenChange(false)}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Service Hero */}
          <div className="relative">
            <div className="h-48 overflow-hidden">
              <ImageWithFallback
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Service Info */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-gray-900">{service.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-700">{service.rating}</span>
                <span className="text-gray-500 text-sm">({service.reviews} Reviews)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <MapPin className="w-4 h-4" />
              <span>{service.location} | {service.category}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="rooms" className="px-6 py-4">
            <TabsList className="grid grid-cols-5 w-full mb-6">
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="food">Food</TabsTrigger>
              <TabsTrigger value="transport">Transport</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
            </TabsList>

            <TabsContent value="rooms" className="space-y-4 mt-0">
              {rooms.map((room) => (
                <div key={room.id} className="flex gap-4 border border-gray-200 rounded-lg p-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{room.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">From R{room.price.toLocaleString()}</span>
                      <Button
                        onClick={() => handleBookRoom(room)}
                        className="bg-purple-600 hover:bg-purple-700"
                        size="sm"
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="food" className="space-y-4 mt-0">
              {foodItems.map((item) => (
                <div key={item.id} className="flex gap-4 border border-gray-200 rounded-lg p-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">From R{item.price.toLocaleString()}</span>
                      <Button
                        onClick={() => handleAddItem(item, 'food')}
                        className="bg-purple-600 hover:bg-purple-700"
                        size="sm"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="transport" className="space-y-4 mt-0">
              {transportOptions.map((item) => (
                <div key={item.id} className="flex gap-4 border border-gray-200 rounded-lg p-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">From R{item.price.toLocaleString()}</span>
                      <Button
                        onClick={() => handleAddItem(item, 'transport')}
                        className="bg-purple-600 hover:bg-purple-700"
                        size="sm"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="activities" className="space-y-4 mt-0">
              {activities.map((item) => (
                <div key={item.id} className="flex gap-4 border border-gray-200 rounded-lg p-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">From R{item.price.toLocaleString()}</span>
                      <Button
                        onClick={() => handleAddItem(item, 'activity')}
                        className="bg-purple-600 hover:bg-purple-700"
                        size="sm"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="terms" className="mt-0">
              <div className="prose prose-sm max-w-none">
                <h4 className="text-gray-900 mb-3">Terms & Conditions</h4>
                <ul className="text-gray-600 space-y-2">
                  <li>Cancellation must be made 48 hours before check-in for full refund</li>
                  <li>Check-in time is 2:00 PM, check-out time is 11:00 AM</li>
                  <li>Valid ID required at check-in</li>
                  <li>Additional charges may apply for extra guests</li>
                  <li>Smoking is not permitted in the rooms</li>
                  <li>Pets are not allowed unless specified</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>

          {/* Floating Campaigns Button */}
          {showCampaignsButton && selectedItems.length === 0 && (
            <div className="fixed bottom-6 right-6 z-50">
              <Button
                onClick={() => onNavigate && onNavigate('campaigns')}
                className="bg-purple-600 hover:bg-purple-700 shadow-lg px-6 py-6 rounded-full flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                <span>Campaigns</span>
              </Button>
            </div>
          )}

          {/* Footer - Selected Items Summary */}
          {selectedItems.length > 0 && (
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Selected Items ({selectedItems.length})</span>
                  <span className="text-gray-900">Total: R{totalCost.toLocaleString()}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.map((item, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-purple-100 text-purple-700">
                      {item.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button
                onClick={proceedToCampaign}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Add to Campaign
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedRoom?.name}</DialogTitle>
            <DialogDescription>
              R{selectedRoom?.price.toLocaleString()} Per Night - Select your check-in date
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="text-gray-600">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Available</span>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={() => setShowBookingDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmBooking}
              disabled={!selectedDate}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
