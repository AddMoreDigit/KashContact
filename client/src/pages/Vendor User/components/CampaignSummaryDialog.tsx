import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Download, Printer, Bike, Activity, Bus } from "lucide-react";

interface CampaignSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CampaignSummaryDialog({ open, onOpenChange }: CampaignSummaryDialogProps) {
  const campaignMembers = [
    { name: "Chibulo Monrole", role: "admin", avatar: "", initials: "CM" },
    { name: "Bornwise Nkosi", role: "", avatar: "", initials: "BN" },
    { name: "Davis Balozi", role: "", avatar: "", initials: "DB" },
    { name: "Mhlamulo Shangwa", role: "", avatar: "", initials: "MS" },
  ];

  const services = [
    {
      name: "Accommodation-Reef Hotel",
      description: "5 Stars hotel - 5 nights",
      image: "https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBsdXh1cnl8ZW58MXx8fHwxNzYxNTM0NDM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Gold reef Dining",
      description: "Gold reef Dining - 5 nights",
      image: "https://images.unsplash.com/photo-1757358957218-67e771ec07bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZGluaW5nJTIwZm9vZHxlbnwxfHx8fDE3NjE1OTI1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const activities = [
    { name: "Horse riding", icon: Activity },
    { name: "Bike riding", icon: Bike },
    { name: "City tour", icon: Bus },
  ];

  const itinerary = [
    { day: 1, activity: "Arrival/Check in" },
    { day: 2, activity: "Horse riding" },
    { day: 3, activity: "Bike riding" },
    { day: 4, activity: "City Tour" },
    { day: 5, activity: "Checkout" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Summary</DialogTitle>
            <p className="text-sm text-gray-600">INV No:1000092975</p>
          </div>
          <DialogDescription className="sr-only">
            Campaign invoice summary and breakdown
          </DialogDescription>
        </DialogHeader>

        {/* Header Image */}
        <div className="w-full h-32 rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1627202134235-b24a95e3728d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbXVzZW1lbnQlMjBwYXJrJTIwZmVycmlzJTIwd2hlZWx8ZW58MXx8fHwxNzYxNTkyNTA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Gold Reef City theme park"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          {/* Customer Info and Dates */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm text-gray-900 mb-2">Gold Reef City theme park</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Costumer</p>
                <p>Chibulo Monrole</p>
                <p>ChibuloMonrole@icloud.org</p>
                <p>+27 123456789</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-900 mb-2">Campaign Date</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>17 Aug-12 December 2025</p>
                <p>8 Campaigns days</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-900 mb-2">Issue Date</h3>
              <p className="text-sm text-gray-600">10 November 2025</p>
            </div>
          </div>

          {/* Campaign Members */}
          <div>
            <h3 className="text-sm text-gray-900 mb-3">Campaign members</h3>
            <div className="space-y-2">
              {campaignMembers.map((member, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">
                    {member.name}
                    {member.role && <span className="text-purple-600"> ({member.role})</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Services */}
            <div>
              <h3 className="text-sm text-gray-900 mb-3">Services</h3>
              <div className="space-y-3">
                {services.map((service, idx) => (
                  <div key={idx} className="flex gap-3">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-16 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="text-sm text-gray-900">{service.name}</p>
                      <p className="text-xs text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h3 className="text-sm text-gray-900 mb-3">Activities</h3>
              <div className="space-y-2">
                {activities.map((activity, idx) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">{activity.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Financial Breakdown and Payment Status */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-gray-900 mb-3">Financial Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total member R4 000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Extra services/Meal ,Games &Etc)</span>
                </div>
                <div className="flex justify-between text-gray-900">
                  <span>Total Campaign:</span>
                  <span>R16 000</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-900 mb-3">Payments status</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Payment Status</span>
                  <Badge className="bg-red-500 hover:bg-red-600">Unpaid</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Order Status</span>
                  <Badge className="bg-purple-600 hover:bg-purple-700">Pending</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <h3 className="text-sm text-gray-900 mb-3">Itinerary</h3>
            <div className="space-y-2">
              {itinerary.map((item) => (
                <div key={item.day} className="flex gap-2 text-sm text-gray-600">
                  <span>Day {item.day} -</span>
                  <span>{item.activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
