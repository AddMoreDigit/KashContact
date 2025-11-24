import { Search, Bell, ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { NavBar } from './NavBar';
import deluxeRoomImg from 'figma:asset/5e701f29de64216da6107e4941ba5c845fa84015.png';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors';

interface SelectedServicesPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
}

export function SelectedServicesPage({ onNavigate, onShowNotifications, hasUnreadNotifications = false, onShowCart }: SelectedServicesPageProps) {
  const selectedServices = [
    {
      id: 1,
      name: 'Deluxe Room',
      location: 'Cape Town | Seaview lodge',
      category: 'Accommodation',
      price: 'R2500.00',
      image: deluxeRoomImg,
    },
    {
      id: 2,
      name: 'Deluxe Super',
      location: 'Cape Town | Tastebites catering',
      category: 'Food',
      price: 'R750.00',
      image: 'https://images.unsplash.com/photo-1722477936580-84aa10762b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJyZWFrZmFzdCUyMGJ1ZmZldHxlbnwxfHx8fDE3NjI2MTgxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      name: '16 Sitter mini bus',
      location: 'Cape Town | Ride Africa Trans',
      category: 'Transport',
      price: 'R3750.00',
      image: 'https://images.unsplash.com/photo-1745516755240-31c7aa6e7bb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2YW4lMjBzaHV0dGxlfGVufDF8fHx8MTc2MjYxODU1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Accommodation':
        return 'bg-purple-100 text-purple-700';
      case 'Food':
        return 'bg-blue-100 text-blue-700';
      case 'Transport':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50">
      <NavBar 
        onNavigate={onNavigate}
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
      />

      {/* Main Content */}
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Selected Services</h1>
          <p className="text-gray-600">
            Selected from our trusted partners for accommodation ,food,actives and more
          </p>
        </div>
        <div className="space-y-4">
          {selectedServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg p-6 flex items-center gap-6"
            >
              {/* Service Image */}
              <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Service Details */}
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-2">
                  <h3 className="text-gray-900">{service.name}</h3>
                  <button className="text-purple-600 hover:text-purple-700">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.333 2L14 4.667L5.333 13.333H2.667V10.667L11.333 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin size={14} />
                  <span className="text-sm">{service.location}</span>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs ${getCategoryColor(
                    service.category
                  )}`}
                >
                  {service.category}
                </span>
              </div>

              {/* Price and Remove */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-gray-900">{service.price}</p>
                </div>
                <Button
                  variant="ghost"
                  size="lg"
                  className="flex flex-col items-center gap-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50 h-auto py-3 px-6"
                >
                  <Trash2 size={20} />
                  <span className="text-xs">Remove</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={() => onNavigate('createCampaign')}
            className="bg-purple-600 hover:bg-purple-700 px-8"
          >
            Continue
          </Button>
        </div>
        </div>
      </div>
  );
}