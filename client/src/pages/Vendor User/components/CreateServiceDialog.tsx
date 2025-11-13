import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { ImageIcon, Upload, X, Plus, Minus } from "lucide-react";

interface CreateServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateServiceDialog({
  open,
  onOpenChange,
}: CreateServiceDialogProps) {
  const [uploadType, setUploadType] = useState<"input" | "upload">("upload");
  const [galleryCount, setGalleryCount] = useState(0);

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
          <DialogTitle>Create Service</DialogTitle>
          <DialogDescription>Add details about your service to share with potential campaign organizers</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Banner Image Upload */}
          <div className="space-y-2">
            <div className="w-full h-32 bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <ImageIcon className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600">Upload Banner Image</p>
            </div>
          </div>

          {/* Service T&CS */}
          <div className="space-y-2">
            <Label htmlFor="service-tcs">Service T&CS</Label>
            <Textarea 
              id="service-tcs" 
              className="min-h-[60px]"
            />
          </div>

          {/* Service Category */}
          <div className="space-y-2">
            <Label htmlFor="service-category">Service Category</Label>
            <Select>
              <SelectTrigger id="service-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accommodation">Accommodation</SelectItem>
                <SelectItem value="food">Food & Dining</SelectItem>
                <SelectItem value="activities">Activities</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Service Description */}
          <div className="space-y-2">
            <Label htmlFor="service-description">Service Description</Label>
            <Textarea 
              id="service-description" 
              className="min-h-[60px]"
            />
          </div>

          {/* Terms of Use Upload */}
          <div className="space-y-2">
            <Label>Do you want type Terms Of Use / Upload</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setUploadType("input")}
                className={uploadType === "input" ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}
              >
                Input
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setUploadType("upload")}
                className={uploadType === "upload" ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}
              >
                Upload
              </Button>
            </div>
            
            {uploadType === "upload" && (
              <Button
                variant="outline"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Browse
              </Button>
            )}
          </div>

          {/* Price / Rate */}
          <div className="space-y-2">
            <Label htmlFor="price-rate">Price / Rate</Label>
            <Input id="price-rate" />
          </div>

          {/* Gallery */}
          <div className="space-y-2">
            <Label>Gallery</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setGalleryCount(Math.max(0, galleryCount - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setGalleryCount(galleryCount + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="ml-auto"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Image
              </Button>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" />
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
              Save to draft
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Save & Publish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}