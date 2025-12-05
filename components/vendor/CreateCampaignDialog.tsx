import { X, Upload, ChevronDown, Camera } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateCampaign?: (campaignData: CampaignFormData) => void;
}

export interface CampaignFormData {
  bannerImage: string | null;
  campaignName: string;
  typeOfCampaign: string;
  campaignTnC: string;
  startDate: string;
  endDate: string;
  bonusVenue: string;
  diningVehicles: string;
  activities: string;
  totalAmount: string;
  members: string;
  contribution: string;
  visibility: string;
}

export function CreateCampaignDialog({ open, onOpenChange, onCreateCampaign }: CreateCampaignDialogProps) {
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [campaignName, setCampaignName] = useState('');
  const [typeOfCampaign, setTypeOfCampaign] = useState('');
  const [campaignTnC, setCampaignTnC] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bonusVenue, setBonusVenue] = useState('');
  const [diningVehicles, setDiningVehicles] = useState('');
  const [activities, setActivities] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [members, setMembers] = useState('');
  const [contribution, setContribution] = useState('');
  const [visibility, setVisibility] = useState('');

  if (!open) return null;

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBannerImage(url);
      toast.success('Banner uploaded successfully');
    }
  };

  const handleCreateCampaign = () => {
    if (!campaignName.trim()) {
      toast.error('Please enter a campaign name');
      return;
    }

    if (!typeOfCampaign) {
      toast.error('Please select campaign type');
      return;
    }

    const campaignData: CampaignFormData = {
      bannerImage,
      campaignName,
      typeOfCampaign,
      campaignTnC,
      startDate,
      endDate,
      bonusVenue,
      diningVehicles,
      activities,
      totalAmount,
      members,
      contribution,
      visibility,
    };

    if (onCreateCampaign) {
      onCreateCampaign(campaignData);
    }

    toast.success('Campaign created successfully!');
    onOpenChange(false);
  };

  const handleSaveDraft = () => {
    toast.success('Campaign saved as draft');
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[520px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-black">Create new Campaign</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Banner Upload */}
          <div className="mb-4">
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                className="hidden"
              />
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-purple-500 transition-colors bg-gray-50 h-32">
                {bannerImage ? (
                  <img
                    src={bannerImage}
                    alt="Campaign banner"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto bg-yellow-400 rounded-full flex items-center justify-center mb-2">
                        <Camera size={24} className="text-white" />
                      </div>
                      <p className="text-sm text-gray-500">Upload campaign banner</p>
                    </div>
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Campaign Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Campaign name
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
              placeholder=""
            />
          </div>

          {/* Type of Campaign */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Type of Campaign
            </label>
            <div className="relative">
              <select
                value={typeOfCampaign}
                onChange={(e) => setTypeOfCampaign(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors appearance-none bg-white"
              >
                <option value=""></option>
                <option value="individual">Individual</option>
                <option value="group">Group</option>
                <option value="corporate">Corporate</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Campaign T&CS */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Campaign T&CS
            </label>
            <textarea
              value={campaignTnC}
              onChange={(e) => setCampaignTnC(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors resize-none"
              rows={3}
              placeholder=""
            />
          </div>

          {/* Campaign Dates */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Campaign Dates
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-500 text-xs mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-xs mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Package Details
            </label>
            <div className="relative">
              <select
                value={bonusVenue}
                onChange={(e) => setBonusVenue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors appearance-none bg-white mb-2"
              >
                <option value="">Bonus Venue</option>
                <option value="hotel">Hotel</option>
                <option value="resort">Resort</option>
                <option value="lodge">Lodge</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Dining Vehicles */}
          <div className="mb-4">
            <div className="relative">
              <select
                value={diningVehicles}
                onChange={(e) => setDiningVehicles(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors appearance-none bg-white"
              >
                <option value="">Dining Vehicles</option>
                <option value="breakfast">Breakfast Included</option>
                <option value="half-board">Half Board</option>
                <option value="full-board">Full Board</option>
                <option value="all-inclusive">All Inclusive</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Activities */}
          <div className="mb-4">
            <div className="relative">
              <select
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors appearance-none bg-white"
              >
                <option value="">Activities</option>
                <option value="safari">Safari Tour</option>
                <option value="city-tour">City Tour</option>
                <option value="beach">Beach Activities</option>
                <option value="adventure">Adventure Sports</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Campaign Pricing */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Campaign Pricing
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-gray-500 text-xs mb-1">Total Amount</label>
                <input
                  type="text"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-gray-500 text-xs mb-1">Members</label>
                <input
                  type="text"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-gray-500 text-xs mb-1">Contribution</label>
                <input
                  type="text"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          {/* Visibility */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">
              Visibility
            </label>
            <div className="relative">
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors appearance-none bg-white"
              >
                <option value=""></option>
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handleSaveDraft}
              className="px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              Save as Draft
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenChange(false)}
                className="px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                className="px-6 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

