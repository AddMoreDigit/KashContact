import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Megaphone, Ticket, Briefcase, UserPlus, ChevronRight, X } from "lucide-react";

interface CreateMenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (option: string) => void;
}

export function CreateMenuDialog({
  open,
  onOpenChange,
  onSelect,
}: CreateMenuDialogProps) {
  const menuItems = [
    {
      id: "campaign",
      icon: Megaphone,
      label: "Create New Campaigns",
      hasArrow: true,
    },
    {
      id: "voucher",
      icon: Ticket,
      label: "Create New Voucher",
      hasArrow: false,
    },
    {
      id: "service",
      icon: Briefcase,
      label: "Create New Service",
      hasArrow: true,
    },
    {
      id: "user",
      icon: UserPlus,
      label: "New - User",
      hasArrow: true,
    },
  ];

  const handleSelect = (id: string) => {
    onSelect(id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
          <DialogDescription>Please select option to proceed</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-gray-700" />
                <span className="text-gray-900">{item.label}</span>
              </div>
              {item.hasArrow && <ChevronRight className="w-5 h-5 text-gray-400" />}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}