import { useState } from "react";
import { Search, Bell, ShoppingCart, User, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onCreateClick?: () => void;
  onSearch?: (query: string) => void;
  searchQuery?: string;
  notificationCount?: number;
  cartCount?: number;
}

export function Header({ 
  onCreateClick, 
  onSearch, 
  searchQuery = "", 
  notificationCount = 0,
  cartCount = 0 
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const mockNotifications = [
    { id: 1, title: "New booking received", message: "Cape town - Seaview lodge has a new booking", time: "5 mins ago", read: false },
    { id: 2, title: "Campaign ending soon", message: "Durban gateway campaign ends in 3 days", time: "1 hour ago", read: false },
    { id: 3, title: "Voucher claimed", message: "10k off Accommodation voucher claimed by Jordan", time: "2 hours ago", read: true },
    { id: 4, title: "New review posted", message: "5-star review on Cape town property", time: "3 hours ago", read: true },
  ];

  const mockCartItems = [
    { id: 1, name: "Premium Service Package", price: "R2,500", quantity: 1 },
    { id: 2, name: "Marketing Boost", price: "R1,200", quantity: 2 },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search campaigns, bookings, vouchers..."
            className="pl-10 bg-gray-50 border-gray-200"
            value={searchQuery}
            onChange={(e) => onSearch?.(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => onSearch?.("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-gray-200 rounded-full p-1"
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={onCreateClick}
        >
          Create
        </Button>

        {/* Notifications */}
        <Popover open={showNotifications} onOpenChange={setShowNotifications}>
          <PopoverTrigger asChild>
            <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-gray-700" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-xs">
                  {notificationCount}
                </Badge>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900">Notifications</h3>
                <Button variant="ghost" size="sm" className="text-xs">
                  Mark all read
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[400px]">
              <div className="p-2">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-50 ${
                      !notification.read ? "bg-purple-50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-1"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        {/* Cart */}
        <Popover open={showCart} onOpenChange={setShowCart}>
          <PopoverTrigger asChild>
            <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-purple-600 text-xs">
                  {cartCount}
                </Badge>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <h3 className="text-gray-900">Shopping Cart</h3>
            </div>
            {mockCartItems.length > 0 ? (
              <>
                <ScrollArea className="max-h-[300px]">
                  <div className="p-4 space-y-3">
                    {mockCartItems.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-600 mt-1">Qty: {item.quantity}</p>
                          <p className="text-sm text-purple-600 mt-1">{item.price}</p>
                        </div>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Trash2 className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-700">Total</span>
                    <span className="text-gray-900">R4,900</span>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Checkout
                  </Button>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>Your cart is empty</p>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {/* User Profile */}
        <Popover open={showProfile} onOpenChange={setShowProfile}>
          <PopoverTrigger asChild>
            <button className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gray-800">
              <User className="w-5 h-5 text-white" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="end">
            <div className="px-3 py-2 mb-2">
              <p className="text-gray-900">Vendor Name</p>
              <p className="text-xs text-gray-500">vendor@example.com</p>
            </div>
            <div className="space-y-1">
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">
                Profile Settings
              </button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">
                Account Settings
              </button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">
                Billing
              </button>
              <div className="border-t my-1"></div>
              <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                Sign Out
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}