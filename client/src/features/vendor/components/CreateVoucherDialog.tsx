import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, X } from "lucide-react";

interface CreateVoucherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateVoucherDialog({
  open,
  onOpenChange,
}: CreateVoucherDialogProps) {
  const [uploadType, setUploadType] = useState<"input" | "upload">("upload");

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
          <DialogTitle>Create voucher</DialogTitle>
          <DialogDescription className="sr-only">Fill in the voucher details to create a new voucher</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic info section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-900 mb-1">Basic info</h3>
              <p className="text-sm text-gray-500">Please fill the missing info to continue</p>
            </div>

            {/* Voucher Name */}
            <div className="space-y-2">
              <Label htmlFor="voucher-name">Voucher Name*</Label>
              <Input id="voucher-name" />
            </div>

            {/* T&Cs Upload */}
            <div className="space-y-2">
              <Label>Do you want type T&Cs / Upload</Label>
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
          </div>

          {/* Discount Details */}
          <div className="space-y-4">
            <h3 className="text-gray-900">Discount Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="discount-value">Discount Value*</Label>
              <Input id="discount-value" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expire-date">Expire Date*</Label>
              <Input id="expire-date" type="date" />
            </div>
          </div>

          {/* Voucher Usage */}
          <div className="space-y-4">
            <h3 className="text-gray-900">Voucher Usage</h3>
            
            <div className="space-y-2">
              <Label htmlFor="max-usage">Maximum Usage</Label>
              <Select>
                <SelectTrigger id="max-usage">
                  <SelectValue placeholder="Select maximum usage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 time</SelectItem>
                  <SelectItem value="5">5 times</SelectItem>
                  <SelectItem value="10">10 times</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <RadioGroup defaultValue="no-restrictions">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no-restrictions" id="no-restrictions" />
                <Label htmlFor="no-restrictions" className="cursor-pointer">
                  No Restrictions
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Create Voucher
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}