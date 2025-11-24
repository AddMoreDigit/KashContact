import { Search, Bell, ShoppingCart, User, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { NetflixSearch } from './NetflixSearch';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'selectServices' | 'helpSupport' | 'saveDraft' | 'serviceProviders' | 'corporateSelectServices' | 'corporateServiceProviders';

interface NavBarProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
  showCreateButton?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  onSearch?: (query: string) => void;
  onSearchFocus?: () => void;
  onSelectProvider?: (provider: any) => void;
  onSelectService?: (service: any) => void;
  userType?: 'user' | 'vendor' | 'corporate';
}

export function NavBar({ 
  onNavigate, 
  onShowNotifications, 
  hasUnreadNotifications = false, 
  onShowCart,
  showCreateButton = true,
  showBackButton = false,
  onBack,
  onSearch,
  onSearchFocus,
  onSelectProvider,
  onSelectService,
  userType = 'user'
}: NavBarProps) {
  const handleServiceSelect = (service: any) => {
    // Convert service to the format expected by ServiceDetailPage
    const serviceProvider = {
      id: service.id,
      name: service.name,
      location: service.location,
      category: service.category,
      image: service.image
    };
    
    if (onSelectService) {
      onSelectService(serviceProvider);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        {showBackButton && (
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        {showCreateButton && (
          <Button 
            onClick={() => onNavigate(userType === 'corporate' ? 'corporateSelectServices' : 'selectServices')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Create
          </Button>
        )}
        <NetflixSearch
          onNavigate={onNavigate}
          onSelectProvider={onSelectProvider}
          onSelectService={handleServiceSelect}
        />
        <button 
          onClick={onShowNotifications}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg relative"
        >
          <Bell size={20} className="text-gray-700" />
          {hasUnreadNotifications && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>}
        </button>
        <button 
          onClick={onShowCart}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
        >
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
  );
}