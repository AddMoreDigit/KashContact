import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { NavBar } from './NavBar';
import { GenerateVoucherDialog } from './GenerateVoucherDialog';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute';

interface VouchersPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  createdCampaigns?: any[];
  onShowCart?: () => void;
}

export function VouchersPage({ onNavigate, onShowNotifications, hasUnreadNotifications = false, createdCampaigns = [], onShowCart }: VouchersPageProps) {
  const [showGenerateVoucher, setShowGenerateVoucher] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  // Transform created campaigns into voucher format
  const vouchers = createdCampaigns.map(campaign => {
    const goal = campaign.goal || 0;
    const contributed = campaign.contributed || 0;
    const savedPercent = goal > 0 ? Math.round((contributed / goal) * 100) : 0;
    
    return {
      name: campaign.title,
      image: campaign.image,
      savedPercent: savedPercent,
      goal: goal,
    };
  });

  const handleRedeem = (campaignName: string) => {
    setSelectedCampaign(campaignName);
    setShowGenerateVoucher(true);
  };

  return (
    <div className="flex-1 bg-[#f5f5f7]">
      <NavBar 
        onNavigate={onNavigate}
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
      />

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Title and Filters */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[28px] font-semibold text-black">
            Vouchers
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border border-gray-300 bg-white text-gray-700 text-sm h-10 px-4 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>

            <Button
              variant="outline"
              className="border border-gray-300 bg-white text-gray-700 text-sm h-10 px-4 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 18">
                <path d="M3 9C3 9.55228 2.55228 10 2 10C1.44772 10 1 9.55228 1 9C1 8.44772 1.44772 8 2 8C2.55228 8 3 8.44772 3 9ZM6 10C5.44772 10 5 9.55228 5 9C5 8.44772 5.44772 8 6 8H22C22.5523 8 23 8.44772 23 9C23 9.55228 22.5523 10 22 10H6ZM3 1C3 1.55228 2.55228 2 2 2C1.44772 2 1 1.55228 1 1C1 0.447715 1.44772 0 2 0C2.55228 0 3 0.447715 3 1ZM6 2C5.44772 2 5 1.55228 5 1C5 0.447715 5.44772 0 6 0H22C22.5523 0 23 0.447715 23 1C23 1.55228 22.5523 2 22 2H6ZM3 17C3 17.5523 2.55228 18 2 18C1.44772 18 1 17.5523 1 17C1 16.4477 1.44772 16 2 16C2.55228 16 3 16.4477 3 17ZM6 18C5.44772 18 5 17.5523 5 17C5 16.4477 5.44772 16 6 16H22C22.5523 16 23 16.4477 23 17C23 17.5523 22.5523 18 22 18H6Z" />
              </svg>
              Sort by
            </Button>
          </div>
        </div>

        {/* Voucher Cards Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {vouchers.map((voucher, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Voucher Image */}
              <div className="relative h-[160px]">
                <img
                  src={voucher.image}
                  alt={voucher.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Voucher Info */}
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {voucher.name}
                </h3>

                {/* Redeem Button */}
                <button
                  className="w-full bg-[#8363f2] text-white text-base font-medium h-11 rounded-lg mb-3 hover:bg-[#7050e0] transition-colors"
                  onClick={() => handleRedeem(voucher.name)}
                >
                  Redeem
                </button>

                {/* Savings Info */}
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-gray-900">
                    {voucher.savedPercent}% saved
                  </p>
                  <p className="text-sm text-gray-600">
                    Goal R{voucher.goal.toLocaleString().replace(',', ' ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            className="border border-gray-300 bg-white text-gray-600 text-sm h-10 px-6 rounded-lg hover:bg-gray-50"
          >
            Load More
          </Button>
        </div>
      </div>

      <GenerateVoucherDialog
        open={showGenerateVoucher}
        onOpenChange={setShowGenerateVoucher}
        campaignName={selectedCampaign || ''}
      />
    </div>
  );
}