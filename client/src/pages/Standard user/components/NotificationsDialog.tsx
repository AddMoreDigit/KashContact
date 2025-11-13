import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Users, Target } from 'lucide-react';

interface NotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept?: () => void;
}

export function NotificationsDialog({ open, onOpenChange, onAccept }: NotificationsDialogProps) {
  const handleAccept = () => {
    onAccept?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>
            Review your campaign invitation details and take action.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-gray-900 mb-2">Magalies Park weekend team Building</h3>
            <p className="text-gray-600 mb-4">From: 01 september 2025 - 03 september 2025</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Target size={16} className="text-purple-600" />
                <span>Goal: R30 000.00</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Users size={16} className="text-purple-600" />
                <span>5 Members</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => onOpenChange(false)}
            >
              View
            </Button>
            <Button 
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              onClick={handleAccept}
            >
              Accept
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
