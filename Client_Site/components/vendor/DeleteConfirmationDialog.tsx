import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmButtonText?: string;
}

export function DeleteConfirmationDialog({ 
  open, 
  onOpenChange, 
  onClose,
  onConfirm, 
  title = 'Delete Voucher', 
  message,
  confirmButtonText = 'Delete'
}: DeleteConfirmationDialogProps) {
  const isOpen = open !== undefined ? open : true;

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    if (onOpenChange) onOpenChange(false);
    if (onClose) onClose();
  };

  const handleCancel = () => {
    if (onOpenChange) onOpenChange(false);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[450px] overflow-hidden shadow-xl">
        {/* Header with Icon */}
        <div className="px-6 py-5 bg-red-50 border-b border-red-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-red-900">{title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-gray-700 text-sm leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}