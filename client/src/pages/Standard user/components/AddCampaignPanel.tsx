import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Calendar } from 'lucide-react';
import { ServiceSelectionPanel } from './ServiceSelectionPanel';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft';

interface AddCampaignPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate?: (page: Page) => void;
}

export function AddCampaignPanel({ open, onOpenChange, onNavigate }: AddCampaignPanelProps) {
  const [campaignName, setCampaignName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfMembers, setNumberOfMembers] = useState('');
  const [showServiceSelection, setShowServiceSelection] = useState(false);

  const handleCreateCampaign = () => {
    // Open service selection panel
    setShowServiceSelection(true);
  };

  const handleSaveDraft = () => {
    // Handle save as draft
    toast.success('Campaign saved as draft');
    onOpenChange(false);
    if (onNavigate) {
      onNavigate('draft');
    }
  };

  const handleServiceSelected = (data: any) => {
    // Services selected, continue to campaign creation
    setShowServiceSelection(false);
    onOpenChange(false);
    if (onNavigate) {
      onNavigate('createCampaign');
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Campaign</SheetTitle>
          <SheetDescription>
            Create a new campaign by filling out the details below
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Campaign Name */}
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input
              id="campaign-name"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Enter campaign name"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vacation">Vacation</SelectItem>
                <SelectItem value="team-building">Team Building</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="celebration">Celebration</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your campaign..."
              className="min-h-[100px]"
            />
          </div>

          {/* Goal Amount */}
          <div className="space-y-2">
            <Label htmlFor="goal-amount">Goal Amount (ZAR)</Label>
            <Input
              id="goal-amount"
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              placeholder="0"
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <div className="relative">
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <div className="relative">
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Number of Members */}
          <div className="space-y-2">
            <Label htmlFor="members">Number of Members</Label>
            <Input
              id="members"
              type="number"
              value={numberOfMembers}
              onChange={(e) => setNumberOfMembers(e.target.value)}
              placeholder="0"
              min="1"
            />
          </div>

          {/* Privacy & Visibility */}
          <div className="space-y-2">
            <Label htmlFor="visibility">Privacy & Visibility</Label>
            <Select defaultValue="private">
              <SelectTrigger id="visibility">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="invite-only">Invite Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              className="flex-1 border-gray-300"
            >
              Save as Draft
            </Button>
            <Button
              onClick={handleCreateCampaign}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              disabled={!campaignName || !category || !goalAmount}
            >
              Continue
            </Button>
          </div>
        </div>
      </SheetContent>

      <ServiceSelectionPanel
        open={showServiceSelection}
        onOpenChange={setShowServiceSelection}
        onNavigate={onNavigate}
        onServiceSelected={handleServiceSelected}
      />
    </Sheet>
  );
}
