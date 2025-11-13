import { useState } from 'react';
import { Search, Bell, ShoppingCart, User, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { GenerateVoucherDialog } from './GenerateVoucherDialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { toast } from 'sonner';
import voucher1Img from 'figma:asset/ee616d6f9e7101aa1a41576e2f145522bf96368b.png';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute';

interface VouchersPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
}

export function VouchersPage({ onNavigate, onShowNotifications }: VouchersPageProps) {
  const [showGenerateVoucher, setShowGenerateVoucher] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const vouchers = [
    {
      name: 'Cape town weekend',
      image: voucher1Img,
      savedPercent: 100,
      goal: 15000,
    },
    {
      name: 'Durban beach holiday',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydHxlbnwxfHx8fDE3NjI2MTkxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      savedPercent: 15,
      goal: 35000,
    },
    {
      name: 'Kruger national park',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBsb2RnZXxlbnwxfHx8fDE3NjI2MjExMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      savedPercent: 76,
      goal: 25000,
    },
  ];

  const handleRedeem = (campaignName: string) => {
    setSelectedCampaign(campaignName);
    setShowGenerateVoucher(true);
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            onClick={() => onNavigate('howItWorks')}
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
        {/* Title and Filters */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-gray-900">Vouchers</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-gray-300">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300">
              Sort by
            </Button>
          </div>
        </div>

        {/* Voucher Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {vouchers.map((voucher, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200">
              {/* Voucher Image */}
              <div className="relative h-40">
                <ImageWithFallback
                  src={voucher.image}
                  alt={voucher.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Voucher Info */}
              <div className="p-4">
                <h3 className="text-gray-900 mb-3">{voucher.name}</h3>

                {/* Redeem Button */}
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 mb-3"
                  onClick={() => handleRedeem(voucher.name)}
                >
                  Redeem
                </Button>

                {/* Savings Progress */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="text-gray-700">{voucher.savedPercent}% saved</span>
                  </div>
                  <Progress value={voucher.savedPercent} className="h-2 mb-2" />
                  <div className="text-sm text-gray-700">
                    Goal R{voucher.goal.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <Button variant="outline" className="border-gray-300">
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
