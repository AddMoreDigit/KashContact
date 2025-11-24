import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Users, Target, Check } from 'lucide-react';

export interface Notification {
  id: number;
  title: string;
  dateRange: string;
  goal: number;
  members: number;
  read: boolean;
  campaignData?: {
    category: string;
    startDate: string;
    endDate: string;
    image?: string;
  };
}

interface NotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notifications: Notification[];
  onAccept?: (notification: Notification) => void;
  onView?: (notification: Notification) => void;
  onMarkAsRead?: (notificationId: number) => void;
}

export function NotificationsDialog({ 
  open, 
  onOpenChange, 
  notifications,
  onAccept,
  onView,
  onMarkAsRead
}: NotificationsDialogProps) {
  const handleAccept = (notification: Notification) => {
    onAccept?.(notification);
  };

  const handleView = (notification: Notification) => {
    onView?.(notification);
    onMarkAsRead?.(notification.id);
  };

  // Mark all notifications as read when dialog opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && notifications.length > 0) {
      notifications.forEach(notification => {
        if (!notification.read) {
          onMarkAsRead?.(notification.id);
        }
      });
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>
            Review your campaign invitation details and take action.
          </DialogDescription>
        </DialogHeader>
        
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No notifications
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 rounded-lg border ${
                  notification.read ? 'bg-gray-50 border-gray-200' : 'bg-white border-purple-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-gray-900">{notification.title}</h3>
                  {notification.read && (
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 ml-2" />
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">{notification.dateRange}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-700 text-sm">
                    <Target size={16} className="text-purple-600" />
                    <span>Goal: R{notification.goal.toLocaleString()}.00</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 text-sm">
                    <Users size={16} className="text-purple-600" />
                    <span>{notification.members} Members</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => handleView(notification)}
                  >
                    View
                  </Button>
                  <Button 
                    size="sm"
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleAccept(notification)}
                  >
                    Accept
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      onMarkAsRead?.(notification.id);
                    }}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
