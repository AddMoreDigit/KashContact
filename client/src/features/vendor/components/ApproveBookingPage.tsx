import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, CheckCircle, XCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const initialBookingRequests = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1729605412104-24acd08bd413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGhvdGVsfGVufDF8fHx8MTc2MTM5ODIxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Cape town Seaview Lodge Weekend",
    admin: "Sarah M, Mzinze",
    dateRange: "Dec,10 2025-Dec 12,2025",
    price: "R10 000.00",
    status: "pending",
    guests: 4,
    rooms: 2,
    services: ["Breakfast", "Spa", "Airport Pickup"]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1739140019682-05bd100b5a5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWFjaGZyb250JTIwcHJvcGVydHl8ZW58MXx8fHwxNzYxNDY2MDAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Durban Beach Escape",
    admin: "Bonwise,N,Baloyi",
    dateRange: "Dec,10 2025-Dec 12,2025",
    price: "R8 000.00",
    status: "pending",
    guests: 2,
    rooms: 1,
    services: ["Breakfast", "Dinner"]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1728676692780-8c75ca9105d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwaG90ZWwlMjBvY2VhbnxlbnwxfHx8fDE3NjE1MDA5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Zanzibar Gateway Weekend",
    admin: "Sarah M, Mzinze",
    dateRange: "Dec,10 2025-Dec 12,2025",
    price: "R10 000.00",
    status: "pending",
    guests: 6,
    rooms: 3,
    services: ["All-inclusive", "Water Sports"]
  },
];

export function ApproveBookingPage() {
  const [bookingRequests, setBookingRequests] = useState(initialBookingRequests);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const itemsPerPage = 10;

  const handleAccept = (id: number) => {
    setBookingRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status: "accepted" } : req)
    );
    toast.success("Booking accepted successfully!");
  };

  const handleCancel = (id: number) => {
    setBookingRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status: "cancelled" } : req)
    );
    toast.success("Booking cancelled successfully!");
  };

  const handleView = (booking: any) => {
    setSelectedBooking(booking);
    setViewDialogOpen(true);
  };

  const paginatedRequests = bookingRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(bookingRequests.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Approve Booking Request</h1>
          <p className="text-gray-500 mt-1">{bookingRequests.filter(r => r.status === 'pending').length} pending requests</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {paginatedRequests.map((request) => (
          <Card key={request.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <img
                src={request.image}
                alt={request.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-gray-900">{request.name}</h3>
                    <p className="text-sm text-gray-600">
                      Campaign Admin - {request.admin}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{request.dateRange}</span>
                    </div>
                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                      <span>{request.guests} Guests</span>
                      <span>•</span>
                      <span>{request.rooms} Rooms</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-gray-900">{request.price}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                      request.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-700'
                        : request.status === 'accepted'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleView(request)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                {request.status === 'pending' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCancel(request.id)}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Decline
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleAccept(request.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <Button 
            variant="ghost" 
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Prev
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant="ghost"
              size="sm"
              className={currentPage === i + 1 ? "bg-purple-100 text-purple-600" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button 
            variant="ghost" 
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* View Booking Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Review booking information before approving
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <img
                  src={selectedBooking.image}
                  alt={selectedBooking.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-gray-900">{selectedBooking.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Admin: {selectedBooking.admin}</p>
                  <p className="text-sm text-gray-600">{selectedBooking.dateRange}</p>
                  <p className="text-purple-600 mt-2">{selectedBooking.price}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="text-gray-900">{selectedBooking.guests}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rooms</p>
                  <p className="text-gray-900">{selectedBooking.rooms}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Services Included</p>
                <div className="flex flex-wrap gap-2">
                  {selectedBooking.services.map((service: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {selectedBooking.status === 'pending' && (
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      handleCancel(selectedBooking.id);
                      setViewDialogOpen(false);
                    }}
                  >
                    Decline Booking
                  </Button>
                  <Button 
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => {
                      handleAccept(selectedBooking.id);
                      setViewDialogOpen(false);
                    }}
                  >
                    Accept Booking
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
