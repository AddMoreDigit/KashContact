import { useState } from 'react';
import { X, Search, SlidersHorizontal, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import imgRectangle115 from 'figma:asset/0e961f9582aec77a34bf07fab9ef41a1b7c868ad.png';
import imgRectangle120 from 'figma:asset/61798ab28bf7b93c89df5d8aaefacc49a0f1de1d.png';
import imgRectangle419 from 'figma:asset/d0a1d565ca7d389fe520806f04bd1d36c78ceae3.png';

interface Campaign {
  id: string;
  title: string;
  serviceProvider: string;
  image: string;
  goal: number;
  contributed: number;
  dateRange: string;
  status: 'Active' | 'Completed' | 'Upcoming';
}

interface SelectCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectCampaign: (campaignId: string) => void;
}

export function SelectCampaignDialog({
  open,
  onOpenChange,
  onSelectCampaign,
}: SelectCampaignDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('');

  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'Cape town gateway weekend',
      serviceProvider: 'Seaview Lodge',
      image: imgRectangle115,
      goal: 10000,
      contributed: 3000,
      dateRange: 'Sep 1-Dec 5, 2025',
      status: 'Active',
    },
    {
      id: '2',
      title: 'Magelies weekend Team Building',
      serviceProvider: 'Magalies Park Dr, Hartbeespoort, 0216',
      image: imgRectangle120,
      goal: 10000,
      contributed: 3000,
      dateRange: 'Sep 1-Dec 5, 2025',
      status: 'Completed',
    },
    {
      id: '3',
      title: 'Magelies weekend Team Building',
      serviceProvider: 'Magalies Park Dr, Hartbeespoort, 0216',
      image: imgRectangle419,
      goal: 10000,
      contributed: 3000,
      dateRange: 'Sep 1-Dec 5, 2025',
      status: 'Upcoming',
    },
  ];

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.serviceProvider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProceed = () => {
    if (selectedCampaignId) {
      onSelectCampaign(selectedCampaignId);
      onOpenChange(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Completed':
        return 'bg-purple-100 text-purple-700';
      case 'Upcoming':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-gray-900 text-2xl">
              Select Campaign to Contribute On
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <DialogDescription className="sr-only">
            Select a campaign to make a contribution
          </DialogDescription>
        </DialogHeader>

        {/* Search and Filter */}
        <div className="flex gap-3 py-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search campaigns by name or service provider"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="border-purple-600">
            <SlidersHorizontal className="mr-2 h-5 w-5" />
            Filters
          </Button>
        </div>

        {/* Campaign List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          <RadioGroup value={selectedCampaignId} onValueChange={setSelectedCampaignId}>
            {filteredCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedCampaignId === campaign.id
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => setSelectedCampaignId(campaign.id)}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem
                    value={campaign.id}
                    id={campaign.id}
                    className="mt-1"
                  />
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 mb-1">{campaign.title}</h3>
                        <p className="text-gray-600 text-sm">{campaign.serviceProvider}</p>
                      </div>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-purple-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>Goal-R{campaign.goal.toLocaleString()}.00</span>
                      </div>
                      <div className="text-gray-900">
                        Contributed -R{campaign.contributed.toLocaleString()}.00
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>{campaign.dateRange}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleProceed}
            disabled={!selectedCampaignId}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
