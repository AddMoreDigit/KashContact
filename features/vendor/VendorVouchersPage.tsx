import { useState, useEffect } from 'react';
import { Search, Bell, ShoppingCart, User, ChevronDown, Edit, Trash2, Plus, Eye, Copy, Tag } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import { VendorSidebar } from './components/VendorSidebar';
import { CreateVoucherDialog } from './components/CreateVoucherDialog';
import { DeleteConfirmationDialog } from './components/DeleteConfirmationDialog';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'approveBookingRequest' | 'editBooking' | 'vendorVouchers' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable';

interface VendorVouchersPageProps {
  onNavigate: (page: Page) => void;
}

interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  usedCount: number;
  status: 'active' | 'inactive' | 'expired';
  applicableServices: string[];
  image?: string;
  createdAt: string;
  claimedBy?: { name: string; date: string }[];
}

export function VendorVouchersPage({ onNavigate }: VendorVouchersPageProps) {
  const [activePage, setActivePage] = useState<string>('vouchers');
  const [showCreateVoucherDialog, setShowCreateVoucherDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState<string | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'expired'>('all');

  // Load vouchers from localStorage
  useEffect(() => {
    const loadVouchers = () => {
      const stored = localStorage.getItem('vendorVouchers');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check and update expired vouchers
        const updated = parsed.map((v: Voucher) => {
          if (new Date(v.validUntil) < new Date() && v.status === 'active') {
            return { ...v, status: 'expired' as const };
          }
          return v;
        });
        setVouchers(updated);
        localStorage.setItem('vendorVouchers', JSON.stringify(updated));
      } else {
        // Initialize with sample vouchers
        const sampleVouchers: Voucher[] = [
          {
            id: 'VCH001',
            code: 'STAY15',
            title: '15% Off Accommodation',
            description: 'Get 15% discount on all accommodation bookings',
            discountType: 'percentage',
            discountValue: 15,
            minPurchase: 5000,
            maxDiscount: 2000,
            validFrom: '2024-01-01',
            validUntil: '2025-12-31',
            usageLimit: 100,
            usedCount: 23,
            status: 'active',
            applicableServices: ['Accommodation'],
            image: 'https://images.unsplash.com/photo-1657687380097-88a4a3570bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGFjY29tbW9kYXRpb258ZW58MXx8fHwxNzYyOTU2OTI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
            createdAt: '2024-01-01',
            claimedBy: [
              { name: 'Michael Chen', date: '2024-11-15' },
              { name: 'Sarah Johnson', date: '2024-11-10' },
              { name: 'David Williams', date: '2024-11-05' }
            ]
          },
          {
            id: 'VCH002',
            code: 'FOOD500',
            title: 'R500 Off Food & Dining',
            description: 'Save R500 on food and dining services over R2500',
            discountType: 'fixed',
            discountValue: 500,
            minPurchase: 2500,
            validFrom: '2024-06-01',
            validUntil: '2025-06-30',
            usageLimit: 50,
            usedCount: 12,
            status: 'active',
            applicableServices: ['Food & Dining'],
            image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjI5NTExOTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
            createdAt: '2024-06-01',
            claimedBy: [
              { name: 'Emma Davis', date: '2024-11-18' }
            ]
          },
          {
            id: 'VCH003',
            code: 'TRANSPORT20',
            title: '20% Off Transport',
            description: '20% discount on all transport services',
            discountType: 'percentage',
            discountValue: 20,
            minPurchase: 1000,
            maxDiscount: 1500,
            validFrom: '2024-03-01',
            validUntil: '2024-11-30',
            usageLimit: 30,
            usedCount: 30,
            status: 'expired',
            applicableServices: ['Transport'],
            image: 'https://images.unsplash.com/photo-1662386752917-2c63f23ac578?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc3BvcnQlMjB2ZWhpY2xlfGVufDF8fHx8MTc2MzA1NjkxMXww&ixlib=rb-4.1.0&q=80&w=1080',
            createdAt: '2024-03-01',
            claimedBy: []
          },
          {
            id: 'VCH004',
            code: 'ACTIVITY10',
            title: '10% Off Activities',
            description: 'Get 10% off on all activity bookings',
            discountType: 'percentage',
            discountValue: 10,
            minPurchase: 500,
            maxDiscount: 1000,
            validFrom: '2024-08-01',
            validUntil: '2025-08-31',
            usageLimit: 200,
            usedCount: 45,
            status: 'active',
            applicableServices: ['Activities'],
            image: 'https://images.unsplash.com/photo-1600523314258-0892ccaaef1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpdml0aWVzJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2Mjk1MjY3MXww&ixlib=rb-4.1.0&q=80&w=1080',
            createdAt: '2024-08-01',
            claimedBy: [
              { name: 'John Smith', date: '2024-11-20' }
            ]
          }
        ];
        setVouchers(sampleVouchers);
        localStorage.setItem('vendorVouchers', JSON.stringify(sampleVouchers));
      }
    };

    loadVouchers();
  }, []);

  const handleNavigation = (page: string) => {
    setActivePage(page);
    const pageMap: { [key: string]: Page } = {
      'dashboard': 'vendorDashboard',
      'campaigns': 'vendorCampaigns',
      'services': 'vendorServices',
      'transactions': 'vendorTransactions',
      'profile': 'vendorProfile',
      'overview': 'vendorOverview',
      'draft': 'vendorDrafts',
      'help': 'vendorHelp',
      'vouchers': 'vendorVouchers',
    };
    const mappedPage = pageMap[page] || page;
    onNavigate(mappedPage as Page);
  };

  const handleCreateVoucher = (voucherData: any) => {
    const newVoucher: Voucher = {
      id: `VCH${String(vouchers.length + 1).padStart(3, '0')}`,
      code: voucherData.code,
      title: voucherData.title,
      description: voucherData.description,
      discountType: voucherData.discountType,
      discountValue: voucherData.discountValue,
      minPurchase: voucherData.minPurchase || 0,
      maxDiscount: voucherData.maxDiscount,
      validFrom: voucherData.validFrom,
      validUntil: voucherData.validUntil,
      usageLimit: voucherData.usageLimit,
      usedCount: 0,
      status: 'active',
      applicableServices: voucherData.applicableServices || [],
      image: voucherData.image,
      createdAt: new Date().toISOString().split('T')[0],
      claimedBy: []
    };

    const updatedVouchers = [...vouchers, newVoucher];
    setVouchers(updatedVouchers);
    localStorage.setItem('vendorVouchers', JSON.stringify(updatedVouchers));
    toast.success('Voucher created successfully!');
    setShowCreateVoucherDialog(false);
  };

  const handleToggleStatus = (voucherId: string) => {
    const updatedVouchers = vouchers.map(v => {
      if (v.id === voucherId && v.status !== 'expired') {
        return { ...v, status: v.status === 'active' ? 'inactive' as const : 'active' as const };
      }
      return v;
    });
    setVouchers(updatedVouchers);
    localStorage.setItem('vendorVouchers', JSON.stringify(updatedVouchers));
    toast.success('Voucher status updated');
  };

  const handleDeleteVoucher = (voucherId: string) => {
    const updatedVouchers = vouchers.filter(v => v.id !== voucherId);
    setVouchers(updatedVouchers);
    localStorage.setItem('vendorVouchers', JSON.stringify(updatedVouchers));
    toast.success('Voucher deleted successfully');
  };

  const handleCopyCode = (code: string) => {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code)
        .then(() => {
          toast.success('Voucher code copied to clipboard!');
        })
        .catch(() => {
          // Fallback to older method
          fallbackCopyTextToClipboard(code);
        });
    } else {
      // Use fallback method
      fallbackCopyTextToClipboard(code);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        toast.success('Voucher code copied to clipboard!');
      } else {
        toast.error('Failed to copy voucher code');
      }
    } catch (err) {
      toast.error('Failed to copy voucher code');
    }

    document.body.removeChild(textArea);
  };

  const filteredVouchers = vouchers.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         v.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         v.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || v.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: vouchers.length,
    active: vouchers.filter(v => v.status === 'active').length,
    expired: vouchers.filter(v => v.status === 'expired').length,
    totalClaimed: vouchers.reduce((sum, v) => sum + v.usedCount, 0)
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <VendorSidebar currentPage={activePage} onNavigate={handleNavigation} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vouchers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white">
                V
              </div>
              <div className="text-sm">
                <div className="text-gray-900">Vendor Admin</div>
                <div className="text-gray-500 text-xs">vendor@example.com</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-gray-900 mb-2">Voucher Management</h1>
                  <p className="text-gray-600">Create and manage discount vouchers for your services</p>
                </div>
                <button
                  onClick={() => setShowCreateVoucherDialog(true)}
                  className="bg-[#8363f2] text-white px-6 py-3 rounded-lg hover:bg-[#6f4dd2] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Voucher
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="text-gray-500 text-sm mb-1">Total Vouchers</div>
                  <div className="text-gray-900 text-2xl">{stats.total}</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="text-gray-500 text-sm mb-1">Active Vouchers</div>
                  <div className="text-green-600 text-2xl">{stats.active}</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="text-gray-500 text-sm mb-1">Expired</div>
                  <div className="text-red-600 text-2xl">{stats.expired}</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="text-gray-500 text-sm mb-1">Total Claimed</div>
                  <div className="text-[#8363f2] text-2xl">{stats.totalClaimed}</div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filterStatus === 'all' 
                      ? 'bg-[#8363f2] text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  All Vouchers
                </button>
                <button
                  onClick={() => setFilterStatus('active')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filterStatus === 'active' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilterStatus('inactive')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filterStatus === 'inactive' 
                      ? 'bg-gray-600 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Inactive
                </button>
                <button
                  onClick={() => setFilterStatus('expired')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filterStatus === 'expired' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Expired
                </button>
              </div>
            </div>

            {/* Vouchers Grid */}
            {filteredVouchers.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">No vouchers found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery ? 'Try adjusting your search' : 'Create your first voucher to get started'}
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => setShowCreateVoucherDialog(true)}
                    className="bg-[#8363f2] text-white px-6 py-2 rounded-lg hover:bg-[#6f4dd2] transition-colors"
                  >
                    Create Voucher
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVouchers.map((voucher) => (
                  <div key={voucher.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Voucher Image */}
                    {voucher.image && (
                      <div className="h-40 overflow-hidden relative">
                        <ImageWithFallback
                          src={voucher.image}
                          alt={voucher.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            voucher.status === 'active' ? 'bg-green-100 text-green-800' :
                            voucher.status === 'expired' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {voucher.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-4">
                      {/* Voucher Code */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded">
                          <Tag className="w-4 h-4 text-[#8363f2]" />
                          <span className="text-[#8363f2] font-mono">{voucher.code}</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(voucher.code)}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Copy code"
                        >
                          <Copy className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>

                      {/* Voucher Title & Description */}
                      <h3 className="text-gray-900 mb-2">{voucher.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{voucher.description}</p>

                      {/* Discount Info */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600 text-sm">Discount</span>
                          <span className="text-[#8363f2]">
                            {voucher.discountType === 'percentage' 
                              ? `${voucher.discountValue}%` 
                              : `R${voucher.discountValue}`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600 text-sm">Min. Purchase</span>
                          <span className="text-gray-900 text-sm">R{voucher.minPurchase}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm">Valid Until</span>
                          <span className="text-gray-900 text-sm">
                            {new Date(voucher.validUntil).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Usage Stats */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Usage</span>
                          <span className="text-gray-900">
                            {voucher.usedCount} / {voucher.usageLimit}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#8363f2] h-2 rounded-full transition-all"
                            style={{ width: `${(voucher.usedCount / voucher.usageLimit) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Applicable Services */}
                      <div className="mb-4">
                        <div className="text-gray-600 text-xs mb-1">Applicable to:</div>
                        <div className="flex flex-wrap gap-1">
                          {voucher.applicableServices.map((service, idx) => (
                            <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Claimed By */}
                      {voucher.claimedBy && voucher.claimedBy.length > 0 && (
                        <div className="border-t border-gray-200 pt-3 mb-3">
                          <div className="text-gray-600 text-xs mb-2">Recently claimed by:</div>
                          <div className="space-y-1">
                            {voucher.claimedBy.slice(0, 2).map((claim, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs">
                                <span className="text-gray-700">{claim.name}</span>
                                <span className="text-gray-500">{new Date(claim.date).toLocaleDateString()}</span>
                              </div>
                            ))}
                            {voucher.claimedBy.length > 2 && (
                              <div className="text-xs text-[#8363f2]">
                                +{voucher.claimedBy.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleStatus(voucher.id)}
                          disabled={voucher.status === 'expired'}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                            voucher.status === 'expired'
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : voucher.status === 'active'
                              ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                              : 'bg-green-50 text-green-700 hover:bg-green-100'
                          }`}
                        >
                          {voucher.status === 'expired' ? 'Expired' : voucher.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => {
                            setVoucherToDelete(voucher.id);
                            setShowDeleteDialog(true);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete voucher"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Voucher Dialog */}
      {showCreateVoucherDialog && (
        <CreateVoucherDialog
          onClose={() => setShowCreateVoucherDialog(false)}
          onCreateVoucher={handleCreateVoucher}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && voucherToDelete && (
        <DeleteConfirmationDialog
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={() => {
            handleDeleteVoucher(voucherToDelete);
            setShowDeleteDialog(false);
          }}
          title="Delete Voucher"
          message={`Are you sure you want to delete the voucher "${vouchers.find(v => v.id === voucherToDelete)?.title}"? This action cannot be undone and all voucher data will be permanently removed.`}
          confirmButtonText="Delete Voucher"
        />
      )}
    </div>
  );
}
