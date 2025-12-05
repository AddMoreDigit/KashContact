import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../../components/ui/dialog';

interface CampaignCancellationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (notifyMembers: boolean, notifyAdminOnly: boolean) => void;
}

export function CampaignCancellationDialog({ 
  open, 
  onOpenChange, 
  onConfirm 
}: CampaignCancellationDialogProps) {
  const [notifyMembers, setNotifyMembers] = useState(false);
  const [notifyAdminOnly, setNotifyAdminOnly] = useState(false);

  const handleConfirm = () => {
    onConfirm(notifyMembers, notifyAdminOnly);
    onOpenChange(false);
    // Reset checkboxes
    setNotifyMembers(false);
    setNotifyAdminOnly(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset checkboxes
    setNotifyMembers(false);
    setNotifyAdminOnly(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 bg-white">
        {/* Header */}
        <DialogHeader className="flex items-center justify-between p-6 pb-0">
          <div className="flex-1" />
          <button 
            onClick={handleCancel} 
            className="hover:opacity-70 transition-opacity"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </DialogHeader>

        {/* Content */}
        <div className="px-6 py-8 text-center">
          {/* Warning Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
          </div>

          {/* Title */}
          <DialogTitle className="text-xl mb-3">Campaign cancellations</DialogTitle>

          {/* Description */}
          <DialogDescription className="text-sm text-gray-600 mb-6">
            This action cannot be undone. are you sure you want to cancel this campaign
          </DialogDescription>

          {/* Checkboxes */}
          <div className="space-y-3 mb-8">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={notifyMembers}
                  onChange={(e) => setNotifyMembers(e.target.checked)}
                  className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer appearance-none checked:bg-purple-600 checked:border-purple-600 transition-colors"
                />
                {notifyMembers && (
                  <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-700">
                Notify campaign members for these changes
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={notifyAdminOnly}
                  onChange={(e) => setNotifyAdminOnly(e.target.checked)}
                  className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer appearance-none checked:bg-purple-600 checked:border-purple-600 transition-colors"
                />
                {notifyAdminOnly && (
                  <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-700">
                Notify campaign Admin only for these changes
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
