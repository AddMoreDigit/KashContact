import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, Bed, UtensilsCrossed, Car, Camera, MapPin, Waves, Edit, MoreVertical } from "lucide-react";

const services = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1631049035115-f96132761a38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE1MDcwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Deluxe Suite Stay",
    category: "Accommodation",
    icon: Bed,
    price: "R1 200.00",
    unit: "Per night",
    bookings: "12 Bookings this Month",
    available: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1695606452803-6708a37d3836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcGxhdHRlciUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYxNTQ0MDMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Seafood Platter",
    category: "Food",
    icon: UtensilsCrossed,
    price: "R1 200.00",
    unit: "Per day",
    bookings: "12 Bookings this Month",
    available: true,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1601330318521-f1bf921234bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBhaXJwb3J0fGVufDF8fHx8MTc2MTU5MjA2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Airport Shuttle",
    category: "Transport",
    icon: Car,
    price: "R150.00",
    unit: "per ride",
    bookings: "12 Bookings today",
    available: true,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1545510120-66374ff70e4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMGNpdHl8ZW58MXx8fHwxNzYxNTkyMDY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Cape town city tour",
    category: "sight seeing/game reserve tour",
    icon: MapPin,
    price: "R200.00",
    unit: "per city tour",
    bookings: "12 Bookings this Month",
    available: false,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1647828953688-c9a466bc6c1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBhbmltYWxzJTIwd2lsZGxpZmV8ZW58MXx8fHwxNzYxNTkyMDcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Safari Animals tour",
    category: "sight seeing/game reserve tour",
    icon: Camera,
    price: "R250.00",
    unit: "per tour",
    bookings: "Full Booked this month",
    available: false,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1657689808834-88973a6bab9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVlZCUyMGJvYXQlMjBvY2VhbnxlbnwxfHx8fDE3NjE1OTIwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "South coast boat tour",
    category: "Activities",
    icon: Waves,
    price: "R250.00",
    unit: "per tour",
    bookings: "Full Booked today",
    available: true,
  },
];

export function MyServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-900">My Services</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filter By
          </Button>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Sort by
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <Card key={service.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-40 object-cover"
                />
                <Badge
                  className={`absolute top-2 right-2 ${
                    service.available
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {service.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
              
              <div className="p-4 space-y-3">
                <h3 className="text-gray-900">{service.name}</h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <IconComponent className="w-4 h-4" />
                  <span>{service.category}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">{service.price}</p>
                    <p className="text-sm text-gray-500">{service.unit}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600">{service.bookings}</p>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
