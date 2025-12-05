import { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../../../components/ui/dialog';

interface CancelCampaignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  campaignName?: string;
  campaignDates?: string;
  campaignGoal?: string;
  campaignProgress?: number;
  campaignRaised?: number;
  campaignTotal?: number;
}

export function CancelCampaignDialog({
  isOpen,
  onClose,
  onConfirm,
  campaignName = 'Cape town Trip',
  campaignDates = 'Nov 01,20  To  Feb 10,2025',
  campaignGoal = 'R10 000',
  campaignProgress = 70,
  campaignRaised = 10000,
  campaignTotal = 25000
}: CancelCampaignDialogProps) {
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [notifyParticipants, setNotifyParticipants] = useState(true);

  const canConfirm = confirmText.toUpperCase() === 'CANCEL';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[550px] p-0 gap-0">
        <DialogTitle className="sr-only">Cancel Campaign</DialogTitle>
        <DialogDescription className="sr-only">
          Cancel your campaign and provide a reason for cancellation
        </DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-[18px] font-semibold text-black">Cancel Campaign</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-h-[600px] overflow-y-auto">
          <p className="text-[14px] text-gray-600 mb-6">
            you are about to cancel cape town trip,this action cannot be undone
          </p>

          {/* Campaign Summary */}
          <div className="mb-6">
            <h3 className="text-[16px] font-semibold text-black mb-4">Campaign Summary</h3>
            
            <div className="space-y-3">
              <div>
                <div className="text-[12px] text-gray-600 mb-1">Name</div>
                <div className="text-[14px] text-gray-900">{campaignName}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[12px] text-gray-600 mb-1">Dates</div>
                  <div className="text-[14px] text-gray-900">{campaignDates}</div>
                </div>
                <div>
                  <div className="text-[12px] text-gray-600 mb-1">Contribution:</div>
                  <div className="text-[14px] font-medium text-purple-600">
                    R{campaignRaised.toLocaleString()} Raised ({campaignProgress}%)
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[12px] text-gray-600 mb-1">Goal</div>
                <div className="text-[14px] text-gray-900">{campaignGoal}</div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="text-[12px] font-medium text-purple-600 mb-2">Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${campaignProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-6">
            <p className="text-[12px] text-purple-900 text-center">
              Cancelling will notify Sponsor, Vendors and campaign member ,refund may apply
            </p>
          </div>

          {/* Cancellation Detail */}
          <div>
            <h3 className="text-[16px] font-semibold text-black mb-4">Cancellation Detail</h3>

            {/* Reason */}
            <div className="mb-4">
              <label className="block text-[14px] text-gray-900 mb-2">Reason For Cancellation</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select a reason</option>
                <option value="insufficient_funds">Insufficient Funds</option>
                <option value="change_of_plans">Change of Plans</option>
                <option value="vendor_issues">Vendor Issues</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="block text-[14px] text-gray-900 mb-2">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Confirmation Input */}
            <div className="mb-4">
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type CANCEL to Confirm"
                className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Notify Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notifyParticipants"
                checked={notifyParticipants}
                onChange={(e) => setNotifyParticipants(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="notifyParticipants" className="text-[14px] text-gray-700">
                I understand participants will notify
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-[14px] text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => {
              if (canConfirm) {
                onConfirm();
                onClose();
              }
            }}
            disabled={!canConfirm}
            className={`px-6 py-2 text-[14px] rounded-lg transition-colors ${
              canConfirm
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirm Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
