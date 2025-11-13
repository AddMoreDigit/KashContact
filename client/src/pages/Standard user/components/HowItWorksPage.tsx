import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, ChevronRight, SlidersHorizontal, FileText, PlusCircle, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { SelectServicePanel } from './SelectServicePanel';
import { ServiceSelectionPanel } from './ServiceSelectionPanel';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail';

interface HowItWorksPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
}

export function HowItWorksPage({ onNavigate, onShowNotifications }: HowItWorksPageProps) {
  const [showSelectService, setShowSelectService] = useState(false);
  const [showServiceSelection, setShowServiceSelection] = useState(false);
  const steps = [
    {
      icon: FileText,
      label: 'Pick service provider',
      color: 'text-purple-600',
    },
    {
      icon: PlusCircle,
      label: 'Create Campaign',
      color: 'text-purple-600',
    },
    {
      icon: DollarSign,
      label: 'Contribute',
      color: 'text-purple-600',
    },
  ];

  const services = [
    {
      name: 'Blue Water Hotel',
      location: 'Durban',
      category: 'Accommodation',
      image: 'https://images.unsplash.com/photo-1723465308831-29da05e011f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjU4MzY0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Lekkeslaap',
      location: 'Durban',
      category: 'Hotel service & Motel',
      image: 'https://images.unsplash.com/photo-1558117338-aa433feb1c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMHRyb3BpY2FsfGVufDF8fHx8MTc2MjU2MDg3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Cape town Beach',
      location: 'Cape town',
      category: 'Accommodation',
      image: 'https://images.unsplash.com/photo-1548766255-344f0e8085c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjI2MTcwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Seaview Lodge',
      location: 'Cape town',
      category: 'Accommodation',
      image: 'https://images.unsplash.com/photo-1662841540530-2f04bb3291e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjI2MTcwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Tastebites catering',
      location: 'Durban',
      category: 'Food service',
      image: 'https://images.unsplash.com/photo-1720443000468-89d509202615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGJ1ZmZldHxlbnwxfHx8fDE3NjI2MTcwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Island paradise',
      location: 'Zanzibar',
      category: 'Accommodation',
      image: 'https://images.unsplash.com/photo-1722409195473-d322e99621e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBwb29sfGVufDF8fHx8MTc2MjU4NjA2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <ChevronRight size={20} />
          <span>K</span>
        </div>

        <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            onClick={() => onNavigate('campaignDetail')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Create
          </Button>
          <button 
            onClick={onShowNotifications}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg relative"
          >
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg">
            <ShoppingCart size={20} className="text-gray-700" />
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
          >
            <User size={20} className="text-gray-700" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8">
        {/* How it works Section */}
        <div className="mb-12">
          <h2 className="text-gray-900 text-center mb-8">How it works</h2>

          <div className="flex justify-center items-center gap-8 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-center gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-lg bg-purple-50 flex items-center justify-center mb-3">
                      <Icon size={32} className={step.color} />
                    </div>
                    <span className="text-gray-700">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight size={24} className="text-gray-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Service Providers Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">Service Providers</h2>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowSelectService(true)}
              className="border-gray-200"
            >
              Quick Select
            </Button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50">
              <SlidersHorizontal size={16} className="text-gray-700" />
              <span className="text-gray-700">Filter By</span>
            </button>
            <button className="text-purple-600 hover:text-purple-700">See all</button>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              onClick={() => setShowServiceSelection(true)}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="h-48 overflow-hidden">
                <ImageWithFallback 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-gray-900 mb-1">{service.name}</h3>
                <p className="text-gray-600">
                  {service.location} / {service.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Create Campaign Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => onNavigate('campaignDetail')}
            className="bg-purple-600 hover:bg-purple-700 px-8"
          >
            Create Your First Campaign
          </Button>
        </div>
      </div>

      <SelectServicePanel
        open={showSelectService}
        onOpenChange={setShowSelectService}
        onNavigate={onNavigate}
      />

      <ServiceSelectionPanel
        open={showServiceSelection}
        onOpenChange={setShowServiceSelection}
        onNavigate={onNavigate}
      />
    </div>
  );
}
