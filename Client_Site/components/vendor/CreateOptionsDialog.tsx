import { X, ChevronRight, Megaphone, Ticket, Sparkles, UserPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';

interface CreateOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  hasArrow?: boolean;
}

interface CreateOptionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectOption: (optionId: string) => void;
}

export function CreateOptionsDialog({ 
  open, 
  onOpenChange, 
  onSelectOption 
}: CreateOptionsDialogProps) {
  const options: CreateOption[] = [
    {
      id: 'voucher',
      label: 'Create New Voucher',
      icon: <Ticket size={20} />,
      hasArrow: false,
    },
    {
      id: 'service',
      label: 'Create New Service',
      icon: <Sparkles size={20} />,
      hasArrow: true,
    },
    {
      id: 'user',
      label: 'New - User',
      icon: <UserPlus size={20} />,
      hasArrow: true,
    },
  ];

  const handleOptionClick = (optionId: string) => {
    if (onSelectOption) {
      onSelectOption(optionId);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
          <div className="flex-1" />
          <button 
            onClick={() => onOpenChange(false)} 
            className="hover:opacity-70 transition-opacity"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <div className="text-center mb-6">
            <DialogTitle className="text-2xl mb-2">Create</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">Please select option to proceed</DialogDescription>
          </div>

          {/* Options List */}
          <div className="space-y-2">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center group-hover:border-purple-600 group-hover:bg-white transition-colors">
                    <div className="text-gray-700 group-hover:text-purple-600 transition-colors">
                      {option.icon}
                    </div>
                  </div>
                  <span className="text-sm text-gray-900">{option.label}</span>
                </div>
                
                {option.hasArrow && (
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
                )}
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}