import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Camera, X } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { toast } from "sonner";

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateCampaign?: (campaign: any) => void;
  onSaveDraft?: (draft: any) => void;
}

export function CreateCampaignDialog({
  open,
  onOpenChange,
  onCreateCampaign,
  onSaveDraft,
}: CreateCampaignDialogProps) {
  const [campaignImage, setCampaignImage] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    terms: "",
    startDate: "",
    endDate: "",
    roomType: "",
    dining: "",
    activities: "",
    dealAmount: "",
    members: "",
    contribution: "",
    visibility: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = () => {
    // Simulate image upload
    const sampleImages = [
      "https://images.unsplash.com/photo-1729605412104-24acd08bd413?w=400",
      "https://images.unsplash.com/photo-1739140019682-05bd100b5a5e?w=400",
      "https://images.unsplash.com/photo-1728676692780-8c75ca9105d8?w=400",
    ];
    setCampaignImage(sampleImages[Math.floor(Math.random() * sampleImages.length)]);
    toast.success("Image uploaded successfully!");
  };

  const validateForm = () => {
    if (!formData.name) {
      toast.error("Please enter a campaign name");
      return false;
    }
    if (!formData.type) {
      toast.error("Please select a campaign type");
      return false;
    }
    if (!formData.startDate || !formData.endDate) {
      toast.error("Please select campaign dates");
      return false;
    }
    if (!formData.dealAmount) {
      toast.error("Please enter deal amount");
      return false;
    }
    return true;
  };

  const handleCreate = () => {
    if (!validateForm()) return;

    const newCampaign = {
      title: formData.name,
      image: campaignImage || "https://images.unsplash.com/photo-1729605412104-24acd08bd413?w=400",
      dateRange: `${formData.startDate} - ${formData.endDate}`,
      budget: parseInt(formData.dealAmount),
      spent: 0,
      saved: 0,
      progress: 0,
      status: "active",
      startDate: formData.startDate,
      endDate: formData.endDate,
      type: formData.type,
      ...formData,
    };

    onCreateCampaign?.(newCampaign);
    resetForm();
    onOpenChange(false);
  };

  const handleSaveDraft = () => {
    const draft = {
      type: "campaign",
      data: { ...formData, image: campaignImage },
      name: formData.name || "Untitled Campaign",
    };

    onSaveDraft?.(draft);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      terms: "",
      startDate: "",
      endDate: "",
      roomType: "",
      dining: "",
      activities: "",
      dealAmount: "",
      members: "",
      contribution: "",
      visibility: "",
    });
    setCampaignImage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <DialogTitle>Create new Campaign</DialogTitle>
          <DialogDescription className="sr-only">Fill in the campaign details to create a new campaign</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Campaign Image */}
          <div className="relative">
            {campaignImage ? (
              <div className="relative">
                <ImageWithFallback
                  src={campaignImage}
                  alt="Campaign"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => setCampaignImage("")}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div 
                className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={handleImageUpload}
              >
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-yellow-500 transition-colors">
                  <Camera className="w-6 h-6 text-gray-800" />
                </div>
              </div>
            )}
          </div>

          {/* Campaign name */}
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign name</Label>
            <Input 
              id="campaign-name" 
              placeholder="Enter campaign name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          {/* Type of Campaign */}
          <div className="space-y-2">
            <Label htmlFor="campaign-type">Type of Campaign</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger id="campaign-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accommodation">Accommodation</SelectItem>
                <SelectItem value="food">Food & Dining</SelectItem>
                <SelectItem value="activities">Activities</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campaign T&CS */}
          <div className="space-y-2">
            <Label htmlFor="campaign-tcs">Campaign T&CS</Label>
            <Textarea 
              id="campaign-tcs" 
              placeholder="Enter terms and conditions"
              className="min-h-[80px]"
              value={formData.terms}
              onChange={(e) => handleInputChange("terms", e.target.value)}
            />
          </div>

          {/* Campaign Dates */}
          <div className="space-y-2">
            <Label>Campaign Dates</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="start-date" className="text-xs text-gray-600">Start Date</Label>
                <Input 
                  id="start-date" 
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="end-date" className="text-xs text-gray-600">End Date</Label>
                <Input 
                  id="end-date" 
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="space-y-2">
            <Label htmlFor="package-details">Package Details</Label>
            <div className="grid grid-cols-2 gap-3">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Room</SelectItem>
                  <SelectItem value="deluxe">Deluxe Room</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Dining Options" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="half-board">Half Board</SelectItem>
                  <SelectItem value="full-board">Full Board</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Activities */}
          <div className="space-y-2">
            <Label htmlFor="activities">Activities</Label>
            <Select>
              <SelectTrigger id="activities">
                <SelectValue placeholder="Select activities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spa">Spa & Wellness</SelectItem>
                <SelectItem value="water">Water Sports</SelectItem>
                <SelectItem value="tours">Guided Tours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campaign Pricing */}
          <div className="space-y-2">
            <Label>Campaign Pricing</Label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="deal-amount" className="text-xs text-gray-600">Deal Amount</Label>
                <Input id="deal-amount" placeholder="Amount" />
              </div>
              <div>
                <Label htmlFor="members" className="text-xs text-gray-600">Members</Label>
                <Input id="members" placeholder="Number" />
              </div>
              <div>
                <Label htmlFor="contribution" className="text-xs text-gray-600">Contribution</Label>
                <Input id="contribution" placeholder="Amount" />
              </div>
            </div>
          </div>

          {/* Visibility */}
          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select>
              <SelectTrigger id="visibility">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="members">Members Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="text-purple-600 border-purple-200"
            >
              Save as Draft
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Create Campaign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}