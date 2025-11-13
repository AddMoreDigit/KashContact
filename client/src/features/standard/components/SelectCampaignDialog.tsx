import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Search, SlidersHorizontal } from 'lucide-react';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
const campaignImg1 = "https://via.placeholder.com/400x300?text=Image";

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute';

interface SelectCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (page: Page) => void;
}

export function SelectCampaignDialog({ open, onOpenChange, onNavigate }: SelectCampaignDialogProps) {
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);

  const campaigns = [
    {
      id: 1,
      name: 'Cape town gateway weekend',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-700',
      contributor: 'Kay Lee',
      contributorRole: 'Campaign Admin',
      contributed: 'R9 000.00',
      date: 'Sep 1-Dec 5, 2025',
      image: campaignImg1,
    },
    {
      id: 2,
      name: 'Magolisa weekend Team Building',
      status: 'Completed',
      statusColor: 'bg-purple-100 text-purple-700',
      contributor: 'Kay Lee',
      contributorRole: 'Contributor',
      contributed: 'R9 000.00',
      date: 'Sep 1-Dec 5, 2025',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MjYxNzI5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      name: 'Magolisa weekend Team Building',
      status: 'Upcoming',
      statusColor: 'bg-red-100 text-red-700',
      contributor: 'Kay Lee',
      contributorRole: 'Contributor',
      contributed: 'R9 000.00',
      date: 'Sep 1-Dec 5, 2025',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MjYxNzI5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const handleProceed = () => {
    if (selectedCampaign) {
      onOpenChange(false);
      onNavigate('contribute');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500 z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <DialogTitle>Select Campaign to Contribute On</DialogTitle>
          <DialogDescription>
            Choose a campaign to make your contribution
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search campaign by name or start/end date"
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon" className="border-gray-300">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Campaign List */}
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => setSelectedCampaign(campaign.id)}
                className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedCampaign === campaign.id
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Radio Button */}
                <div className="flex items-center pt-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedCampaign === campaign.id
                        ? 'border-purple-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedCampaign === campaign.id && (
                      <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                    )}
                  </div>
                </div>

                {/* Campaign Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={campaign.image}
                    alt={campaign.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Campaign Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-gray-900">{campaign.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs whitespace-nowrap ${campaign.statusColor}`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <span>{campaign.contributor}</span>
                    <span>•</span>
                    <span>{campaign.contributorRole}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Contributed: {campaign.contributed}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {campaign.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleProceed}
            disabled={!selectedCampaign}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          >
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
