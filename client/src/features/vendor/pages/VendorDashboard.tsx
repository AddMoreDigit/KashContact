import { useState, useMemo, createContext, useContext } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { CampaignCard } from "../components/CampaignCard";
import { VoucherCard } from "../components/VoucherCard";
import { BookingDetailsDialog } from "../components/BookingDetailsDialog";
import { CampaignCancellationDialog } from "../components/CampaignCancellationDialog";
import { CreateMenuDialog } from "../components/CreateMenuDialog";
import { CreateCampaignDialog } from "../components/CreateCampaignDialog";
import { CreateVoucherDialog } from "../components/CreateVoucherDialog";
import { CreateServiceDialog } from "../components/CreateServiceDialog";
import { CreateSubAdminDialog } from "../components/CreateSubAdminDialog";
import { EditBookingDialog } from "../components/EditBookingDialog";
import { ApproveBookingPage } from "../components/ApproveBookingPage";
import { MyServicesPage } from "../components/MyServicesPage";
import { ReportPage } from "../components/ReportPage";
import { MessageChatPage } from "../components/MessageChatPage";
import { CampaignSchedulePage } from "../components/CampaignSchedulePage";
import { CampaignSummaryDialog } from "../components/CampaignSummaryDialog";
import { HelpSupportPage } from "../components/HelpSupportPage";
import { DraftPage } from "../components/DraftPage";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, DollarSign, Package, Users } from "lucide-react";
import { toast } from "sonner";

// Global App Context for state management
interface AppContextType {
  campaigns: any[];
  vouchers: any[];
  services: any[];
  bookings: any[];
  drafts: any[];
  messages: any[];
  notifications: any[];
  addCampaign: (campaign: any) => void;
  updateCampaign: (id: number, data: any) => void;
  deleteCampaign: (id: number) => void;
  addVoucher: (voucher: any) => void;
  addService: (service: any) => void;
  addBooking: (booking: any) => void;
  updateBooking: (id: number, data: any) => void;
  addDraft: (draft: any) => void;
  deleteDraft: (id: number) => void;
  addNotification: (notification: any) => void;
  markNotificationRead: (id: number) => void;
  cartItems: any[];
  addToCart: (item: any) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

const initialRevenueData = [
  { month: "Jan", value: 3500 },
  { month: "Feb", value: 4000 },
  { month: "Mar", value: 3800 },
  { month: "Apr", value: 5000 },
  { month: "May", value: 4500 },
  { month: "Jun", value: 6000 },
  { month: "Jul", value: 5500 },
  { month: "Aug", value: 7000 },
  { month: "Sep", value: 6500 },
  { month: "Oct", value: 8000 },
  { month: "Nov", value: 9000 },
];

const initialCampaigns = [
  {
    id: 1,
    title: "Cape town - Seaview lodge",
    dateRange: "R20 000 - Saved: R8 000",
    saved: "R8 000",
    spent: "R12 000",
    budget: 20000,
    progress: 66,
    status: "active",
    startDate: "2025-01-15",
    endDate: "2025-06-30",
    image: "https://images.unsplash.com/photo-1729605412104-24acd08bd413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGhvdGVsfGVufDF8fHx8MTc2MTM5ODIxNnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Durban gateway - front beach",
    dateRange: "R20 000 - Saved: R8 000",
    saved: "R8 000",
    spent: "R12 000",
    budget: 20000,
    progress: 66,
    status: "active",
    startDate: "2025-02-01",
    endDate: "2025-07-31",
    image: "https://images.unsplash.com/photo-1739140019682-05bd100b5a5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWFjaGZyb250JTIwcHJvcGVydHl8ZW58MXx8fHwxNzYxNDY2MDAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Durban - south coast",
    dateRange: "R20 000 - Saved: R8 000",
    saved: "R8 000",
    spent: "R12 000",
    budget: 20000,
    progress: 66,
    status: "active",
    startDate: "2025-03-01",
    endDate: "2025-08-31",
    image: "https://images.unsplash.com/photo-1728676692780-8c75ca9105d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwaG90ZWwlMjBvY2VhbnxlbnwxfHx8fDE3NjE1MDA5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const initialVouchers = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1697618009092-01b24159a55a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGFjY29tbW9kYXRpb24lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE1MDA5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "10k off Accommodation",
    date: "Aug 24, 2025 | Claimed: 25",
    claimedBy: "Jordan",
    claimedCount: 25,
    totalAvailable: 100,
    discount: 10000,
    type: "fixed",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600555379885-08a02224726d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMG1lYWx8ZW58MXx8fHwxNzYxNDQxNjgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "5% Off Food",
    date: "Aug 24, 2025 | Claimed by Jordan",
    claimedBy: "Jordan",
    claimedCount: 18,
    totalAvailable: 50,
    discount: 5,
    type: "percentage",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1759882608768-168d4c3a91c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyJTIwYnVzJTIwdHJhbnNwb3J0fGVufDF8fHx8MTc2MTUwMDk0OXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "5% Off Transport",
    date: "Aug 24, 2025 | Claimed by Jordan",
    claimedBy: "Jordan",
    claimedCount: 12,
    totalAvailable: 30,
    discount: 5,
    type: "percentage",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1726499219666-d3f18b37c473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpdml0aWVzJTIwYWR2ZW50dXJlJTIwdHJhdmVsfGVufDF8fHx8MTc2MTUwMDk1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "5% Off Activities",
    date: "Aug 24, 2025 | Claimed by Jordan",
    claimedBy: "Jordan",
    claimedCount: 8,
    totalAvailable: 40,
    discount: 5,
    type: "percentage",
  },
];

// Calendar with special dates
const specialDates = [
  { date: new Date(2025, 2, 3), color: "bg-red-500" },
  { date: new Date(2025, 2, 4), color: "bg-purple-500" },
  { date: new Date(2025, 2, 5), color: "bg-blue-500" },
  { date: new Date(2025, 2, 10), color: "bg-blue-500" },
  { date: new Date(2025, 2, 11), color: "bg-orange-500" },
  { date: new Date(2025, 2, 12), color: "bg-yellow-500" },
  { date: new Date(2025, 2, 17), color: "bg-blue-500" },
  { date: new Date(2025, 2, 18), color: "bg-orange-500" },
  { date: new Date(2025, 2, 19), color: "bg-yellow-500" },
  { date: new Date(2025, 2, 24), color: "bg-blue-500" },
  { date: new Date(2025, 2, 25), color: "bg-orange-500" },
  { date: new Date(2025, 2, 26), color: "bg-yellow-500" },
];

export function VendorDashboard() {
  // Page navigation
  const [currentPage, setCurrentPage] = useState("dashboard");
  
  // Data state
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [vouchers, setVouchers] = useState(initialVouchers);
  const [services, setServices] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [messages] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, title: "New booking received", message: "Cape town - Seaview lodge has a new booking", time: "5 mins ago", read: false },
    { id: 2, title: "Campaign ending soon", message: "Durban gateway campaign ends in 3 days", time: "1 hour ago", read: false },
    { id: 3, title: "Voucher claimed", message: "10k off Accommodation voucher claimed by Jordan", time: "2 hours ago", read: true },
  ]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  // UI state
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2, 1));
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  const [createMenuDialogOpen, setCreateMenuDialogOpen] = useState(false);
  const [createCampaignDialogOpen, setCreateCampaignDialogOpen] = useState(false);
  const [createVoucherDialogOpen, setCreateVoucherDialogOpen] = useState(false);
  const [createServiceDialogOpen, setCreateServiceDialogOpen] = useState(false);
  const [createSubAdminDialogOpen, setCreateSubAdminDialogOpen] = useState(false);
  const [editBookingDialogOpen, setEditBookingDialogOpen] = useState(false);
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [campaignSortBy, setCampaignSortBy] = useState("recent");
  const [voucherSortBy, setVoucherSortBy] = useState("recent");
  const [revenueFilter, setRevenueFilter] = useState("all");

  // Context value for child components
  const contextValue: AppContextType = {
    campaigns,
    vouchers,
    services,
    bookings,
    drafts,
    messages,
    notifications,
    addCampaign: (campaign) => {
      const newCampaign = { ...campaign, id: Date.now() };
      setCampaigns(prev => [newCampaign, ...prev]);
      toast.success("Campaign created successfully!");
    },
    updateCampaign: (id, data) => {
      setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
      toast.success("Campaign updated successfully!");
    },
    deleteCampaign: (id) => {
      setCampaigns(prev => prev.filter(c => c.id !== id));
      toast.success("Campaign deleted successfully!");
    },
    addVoucher: (voucher) => {
      const newVoucher = { ...voucher, id: Date.now(), claimedCount: 0 };
      setVouchers(prev => [newVoucher, ...prev]);
      toast.success("Voucher created successfully!");
    },
    addService: (service) => {
      const newService = { ...service, id: Date.now() };
      setServices(prev => [newService, ...prev]);
      toast.success("Service added successfully!");
    },
    addBooking: (booking) => {
      const newBooking = { ...booking, id: Date.now() };
      setBookings(prev => [newBooking, ...prev]);
      toast.success("Booking added successfully!");
    },
    updateBooking: (id, data) => {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
      toast.success("Booking updated successfully!");
    },
    addDraft: (draft) => {
      const newDraft = { ...draft, id: Date.now(), savedAt: new Date().toISOString() };
      setDrafts(prev => [newDraft, ...prev]);
      toast.success("Draft saved successfully!");
    },
    deleteDraft: (id) => {
      setDrafts(prev => prev.filter(d => d.id !== id));
      toast.success("Draft deleted successfully!");
    },
    addNotification: (notification) => {
      const newNotification = { ...notification, id: Date.now(), read: false, time: "Just now" };
      setNotifications(prev => [newNotification, ...prev]);
    },
    markNotificationRead: (id) => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    },
    cartItems,
    addToCart: (item) => {
      setCartItems(prev => [...prev, { ...item, cartId: Date.now() }]);
      toast.success("Added to cart!");
    },
    removeFromCart: (id) => {
      setCartItems(prev => prev.filter(item => item.cartId !== id));
      toast.success("Removed from cart!");
    },
    clearCart: () => {
      setCartItems([]);
      toast.success("Cart cleared!");
    },
  };

  const handleDateClick = (dayNum: number) => {
    const specialDate = specialDates.find(sd => sd.date.getDate() === dayNum);
    if (specialDate) {
      setBookingDialogOpen(true);
    }
  };

  const handleCampaignCancel = (campaignId: number) => {
    setSelectedCampaignId(campaignId);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancellation = () => {
    if (selectedCampaignId) {
      contextValue.deleteCampaign(selectedCampaignId);
      setCancelDialogOpen(false);
      setSelectedCampaignId(null);
    }
  };

  const handleCreateMenuSelect = (option: string) => {
    switch (option) {
      case "campaign":
        setCreateCampaignDialogOpen(true);
        break;
      case "voucher":
        setCreateVoucherDialogOpen(true);
        break;
      case "service":
        setCreateServiceDialogOpen(true);
        break;
      case "user":
        setCreateSubAdminDialogOpen(true);
        break;
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filtered and sorted data
  const filteredCampaigns = useMemo(() => {
    let filtered = campaigns.filter(c => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    switch (campaignSortBy) {
      case "recent":
        return filtered.sort((a, b) => b.id - a.id);
      case "oldest":
        return filtered.sort((a, b) => a.id - b.id);
      case "progress":
        return filtered.sort((a, b) => b.progress - a.progress);
      case "budget":
        return filtered.sort((a, b) => b.budget - a.budget);
      default:
        return filtered;
    }
  }, [campaigns, searchQuery, campaignSortBy]);

  const filteredVouchers = useMemo(() => {
    let filtered = vouchers.filter(v => 
      v.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    switch (voucherSortBy) {
      case "recent":
        return filtered.sort((a, b) => b.id - a.id);
      case "claimed":
        return filtered.sort((a, b) => b.claimedCount - a.claimedCount);
      case "available":
        return filtered.sort((a, b) => 
          (b.totalAvailable - b.claimedCount) - (a.totalAvailable - a.claimedCount)
        );
      default:
        return filtered;
    }
  }, [vouchers, searchQuery, voucherSortBy]);

  const filteredRevenueData = useMemo(() => {
    if (revenueFilter === "all") return initialRevenueData;
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    
    switch (revenueFilter) {
      case "quarter":
        const quarterStart = Math.floor(currentMonth / 3) * 3;
        return initialRevenueData.slice(quarterStart, quarterStart + 3);
      case "year":
        return initialRevenueData.slice(0, currentMonth + 1);
      default:
        return initialRevenueData;
    }
  }, [revenueFilter]);

  const totalRevenue = useMemo(() => {
    return filteredRevenueData.reduce((sum, item) => sum + item.value, 0);
  }, [filteredRevenueData]);

  const revenueChange = useMemo(() => {
    if (filteredRevenueData.length < 2) return "0";
    const current = filteredRevenueData[filteredRevenueData.length - 1].value;
    const previous = filteredRevenueData[filteredRevenueData.length - 2].value;
    return ((current - previous) / previous * 100).toFixed(1);
  }, [filteredRevenueData]);

  const bookingData = {
    date: "March 12, 2025",
    totalBookings: 8,
    totalRevenue: "R30 000.00",
    campaigns: [
      {
        name: "Campaign 1",
        items: [
          { description: "2X Deluxe Rooms", price: "R3 000.00" },
          { description: "2X Dinner service", price: "R300.00" },
          { description: "2X Launch", price: "R300.00" },
          { description: "2X Dinner Buffet", price: "R300.00" },
          { description: "Spa Day", price: "R700.00" },
          { description: "Airport Pickup", price: "R150.00" },
        ],
      },
      {
        name: "Campaign 2",
        items: [
          { description: "2X Deluxe Rooms", price: "R3500.00" },
          { description: "2X Dinner service", price: "R300.00" },
          { description: "Airport Pickup", price: "R150.00" },
          { description: "2X Room service", price: "R300.00" },
        ],
      },
    ],
  };

  const renderPage = () => {
    switch (currentPage) {
      case "campaigns":
        return <ApproveBookingPage />;
      case "services":
        return <MyServicesPage />;
      case "transactions":
        return <ReportPage />;
      case "message":
        return <MessageChatPage />;
      case "schedule":
        return <CampaignSchedulePage />;
      case "help":
        return <HelpSupportPage />;
      case "draft":
        return <DraftPage />;
      case "dashboard":
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      <div className="mb-6">
        <h1 className="text-gray-900">Welcome, Vendor name</h1>
        <p className="text-gray-500">This is your vendor's dashboard</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-gray-900 mt-1">R {totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {parseFloat(revenueChange) >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-sm ${parseFloat(revenueChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {revenueChange}%
            </span>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Campaigns</p>
              <h3 className="text-gray-900 mt-1">{campaigns.filter(c => c.status === 'active').length}</h3>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Out of {campaigns.length} total</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <h3 className="text-gray-900 mt-1">42</h3>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Vouchers Claimed</p>
              <h3 className="text-gray-900 mt-1">{vouchers.reduce((sum, v) => sum + v.claimedCount, 0)}</h3>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Out of {vouchers.reduce((sum, v) => sum + v.totalAvailable, 0)} available</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Campaigns Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Campaigns Overview</h2>
            <select 
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white cursor-pointer hover:bg-gray-50"
              value={campaignSortBy}
              onChange={(e) => setCampaignSortBy(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="progress">By Progress</option>
              <option value="budget">By Budget</option>
            </select>
          </div>
          
          <div className="space-y-6">
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="flex gap-4 group">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-24 h-20 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSummaryDialogOpen(true)}
                  />
                  <div className="flex-1">
                    <CampaignCard {...campaign} imageUrl={campaign.image} onCancel={() => handleCampaignCancel(campaign.id)} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No campaigns found</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => setCreateCampaignDialogOpen(true)}
                >
                  Create Campaign
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Monthly Revenue */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-gray-900">Monthly revenue</h2>
              <p className="text-purple-600">Total = R{totalRevenue.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">{filteredRevenueData.length} months</p>
            </div>
            <select 
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white cursor-pointer hover:bg-gray-50"
              value={revenueFilter}
              onChange={(e) => setRevenueFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={filteredRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <YAxis hide />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#7c3aed" 
                strokeWidth={2}
                dot={{ fill: "#7c3aed", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claimed Vouchers */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Claimed Vouchers</h2>
            <select 
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white cursor-pointer hover:bg-gray-50"
              value={voucherSortBy}
              onChange={(e) => setVoucherSortBy(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="claimed">Most Claimed</option>
              <option value="available">Most Available</option>
            </select>
          </div>
          
          <div className="space-y-3">
            {filteredVouchers.length > 0 ? (
              filteredVouchers.map((voucher) => (
                <VoucherCard key={voucher.id} {...voucher} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No vouchers found</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => setCreateVoucherDialogOpen(true)}
                >
                  Create Voucher
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Booking Calendar */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Booking Calendar</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-700">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={handlePrevMonth}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={handleNextMonth}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div key={i} className="text-gray-500 p-2">{day}</div>
              ))}
              
              {/* Calendar days */}
              {[...Array(31)].map((_, i) => {
                const dayNum = i + 1;
                const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNum);
                const specialDate = specialDates.find(
                  sd => sd.date.getDate() === dayNum && sd.date.getMonth() === currentMonth.getMonth()
                );
                const isToday = currentDate.toDateString() === new Date().toDateString();
                
                return (
                  <div
                    key={i}
                    className={`p-2 rounded-lg cursor-pointer transition-all ${
                      specialDate 
                        ? `${specialDate.color} text-white hover:opacity-90` 
                        : isToday
                        ? "bg-purple-50 text-purple-700 hover:bg-purple-100"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleDateClick(dayNum)}
                  >
                    {dayNum}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-2">
              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-xs text-gray-600">Confirmed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span className="text-xs text-gray-600">Pending</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span className="text-xs text-gray-600">Tentative</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-xs text-gray-600">Cancelled</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Total Booking: 42</p>
              <p className="text-sm text-gray-600">Total revenue: R12 568.00</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );

  return (
    <AppContext.Provider value={contextValue}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            onCreateClick={() => setCreateMenuDialogOpen(true)}
            onSearch={handleSearch}
            searchQuery={searchQuery}
            notificationCount={notifications.filter(n => !n.read).length}
            cartCount={cartItems.length}
          />
          
          <main className="flex-1 overflow-auto p-6">
            {renderPage()}
          </main>
        </div>

        {/* Booking Details Dialog */}
        <BookingDetailsDialog
          open={bookingDialogOpen}
          onOpenChange={setBookingDialogOpen}
          date={bookingData.date}
          totalBookings={bookingData.totalBookings}
          totalRevenue={bookingData.totalRevenue}
          campaigns={bookingData.campaigns}
          onEditBooking={() => {
            setBookingDialogOpen(false);
            setEditBookingDialogOpen(true);
          }}
        />

        {/* Campaign Cancellation Dialog */}
        <CampaignCancellationDialog
          open={cancelDialogOpen}
          onOpenChange={setCancelDialogOpen}
          onConfirm={handleConfirmCancellation}
        />

        {/* Create Menu Dialog */}
        <CreateMenuDialog
          open={createMenuDialogOpen}
          onOpenChange={setCreateMenuDialogOpen}
          onSelect={handleCreateMenuSelect}
        />

        {/* Create Campaign Dialog */}
        <CreateCampaignDialog
          open={createCampaignDialogOpen}
          onOpenChange={setCreateCampaignDialogOpen}
        />

        {/* Create Voucher Dialog */}
        <CreateVoucherDialog
          open={createVoucherDialogOpen}
          onOpenChange={setCreateVoucherDialogOpen}
        />

        {/* Create Service Dialog */}
        <CreateServiceDialog
          open={createServiceDialogOpen}
          onOpenChange={setCreateServiceDialogOpen}
        />

        {/* Create Sub Admin Dialog */}
        <CreateSubAdminDialog
          open={createSubAdminDialogOpen}
          onOpenChange={setCreateSubAdminDialogOpen}
        />

        {/* Campaign Summary Dialog */}
        <CampaignSummaryDialog
          open={summaryDialogOpen}
          onOpenChange={setSummaryDialogOpen}
        />

        {/* Edit Booking Dialog */}
        <EditBookingDialog
          open={editBookingDialogOpen}
          onOpenChange={setEditBookingDialogOpen}
        />
      </div>
    </AppContext.Provider>
  );
}
