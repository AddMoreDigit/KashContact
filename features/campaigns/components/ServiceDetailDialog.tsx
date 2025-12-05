import { useState } from 'react';
import { X, Plus, Minus, Calendar } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../../components/ui/dialog';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { toast } from 'sonner';

interface ServiceDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: {
    id: number;
    name: string;
    category: string;
    location: string;
    price: string;
    priceRate?: string;
    priceUnit?: string;
    image: string;
    description?: string;
    termsAndConditions?: string;
  } | null;
  onAddToCart: (item: {
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
  }) => void;
}

export function ServiceDetailDialog({
  open,
  onOpenChange,
  service,
  onAddToCart,
}: ServiceDetailDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectingDate, setSelectingDate] = useState<'checkIn' | 'checkOut'>('checkIn');

  if (!service) return null;

  const isAccommodation = service.category.toLowerCase() === 'accommodation';
  const isTransport = service.category.toLowerCase() === 'transport';
  
  const getServiceType = (): 'room' | 'food' | 'transport' | 'activity' => {
    const category = service.category.toLowerCase();
    if (category === 'accommodation') return 'room';
    if (category === 'food & dining') return 'food';
    if (category === 'transport') return 'transport';
    return 'activity';
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotalPrice = () => {
    const basePrice = parseFloat(service.priceRate || service.price.replace(/[^0-9.]/g, ''));
    if (isAccommodation) {
      const nights = calculateNights();
      return basePrice * nights * quantity;
    }
    return basePrice * quantity;
  };

  const handleAddService = () => {
    if (isAccommodation && (!checkInDate || !checkOutDate)) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    const nights = isAccommodation ? calculateNights() : undefined;
    const totalPrice = calculateTotalPrice();

    const cartItem = {
      id: Date.now(),
      type: getServiceType(),
      name: service.name,
      price: service.priceRate || service.price,
      checkIn: checkInDate || undefined,
      checkOut: checkOutDate || undefined,
      location: service.location,
      provider: service.name,
      image: service.image,
      quantity,
      nights,
      totalPrice,
    };

    onAddToCart(cartItem);
    toast.success(`${service.name} added to campaign!`);
    
    setQuantity(1);
    setCheckInDate('');
    setCheckOutDate('');
    onOpenChange(false);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMinCheckOutDate = () => {
    if (!checkInDate) return getMinDate();
    const checkIn = new Date(checkInDate);
    checkIn.setDate(checkIn.getDate() + 1);
    return checkIn.toISOString().split('T')[0];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>{service.name}</DialogTitle>
          <DialogDescription>
            {service.category} in {service.location}. Select dates and quantity to add to your campaign.
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <div className="w-full h-64 relative">
            <ImageWithFallback
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>

          <div className="p-6">
            <div className="mb-4">
              <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm mb-2">
                {service.category}
              </span>
              <h2 className="text-gray-900 mb-2">{service.name}</h2>
              <p className="text-gray-600 text-sm mb-1">ðŸ“ {service.location}</p>
              <p className="text-purple-600">
                {service.price || `R${service.priceRate}`}
                {service.priceUnit && <span className="text-gray-500 text-sm"> {service.priceUnit}</span>}
              </p>
            </div>

            {service.description && (
              <div className="mb-6">
                <h3 className="text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            )}

            {isAccommodation && (
              <div className="mb-6">
                <h3 className="text-gray-900 mb-3">Select Dates</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      <Calendar size={16} className="inline mr-1" />
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => {
                        setCheckInDate(e.target.value);
                        if (checkOutDate && e.target.value >= checkOutDate) {
                          setCheckOutDate('');
                        }
                      }}
                      min={getMinDate()}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      <Calendar size={16} className="inline mr-1" />
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={getMinCheckOutDate()}
                      disabled={!checkInDate}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
                {checkInDate && checkOutDate && (
                  <p className="text-sm text-gray-600 mt-2">
                    {calculateNights()} {calculateNights() === 1 ? 'night' : 'nights'}
                  </p>
                )}
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-gray-900 mb-3">
                {isAccommodation ? 'Number of Rooms' : 'Quantity'}
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="text-gray-900 min-w-[2rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {(isAccommodation ? (checkInDate && checkOutDate) : true) && (
              <div className="bg-purple-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Base Price:</span>
                  <span className="text-gray-900">
                    R{parseFloat(service.priceRate || service.price.replace(/[^0-9.]/g, '')).toFixed(2)}
                    {service.priceUnit && <span className="text-sm text-gray-500"> {service.priceUnit}</span>}
                  </span>
                </div>
                {isAccommodation && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Nights:</span>
                    <span className="text-gray-900">{calculateNights()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">
                    {isAccommodation ? 'Rooms' : 'Quantity'}:
                  </span>
                  <span className="text-gray-900">{quantity}</span>
                </div>
                <div className="border-t border-purple-200 pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-purple-600">
                      R{calculateTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            {service.termsAndConditions && (
              <div className="mb-6">
                <h3 className="text-gray-900 mb-2">Terms & Conditions</h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {service.termsAndConditions}
                </p>
              </div>
            )}

            <Button
              onClick={handleAddService}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Add to Campaign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
