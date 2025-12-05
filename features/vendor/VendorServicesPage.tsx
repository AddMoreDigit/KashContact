import { useState, useEffect } from 'react';
import { Search, Bell, ShoppingCart, User, ChevronDown, Edit, Trash2 } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import { CreateOptionsDialog } from './components/CreateOptionsDialog';
import { CreateServiceDialog, ServiceData } from './components/CreateServiceDialog';
import { EditServiceDialog } from './components/EditServiceDialog';
import { ServiceDetailsDialog } from './components/ServiceDetailsDialog';
import { DeleteConfirmationDialog } from './components/DeleteConfirmationDialog';
import { CreateVoucherDialog } from './components/CreateVoucherDialog';
import { CreateVoucherPage } from './CreateVoucherPage';
import { CreateCampaignDialog } from './components/CreateCampaignDialog';
import { CreateSubAdminDialog } from './components/CreateSubAdminDialog';
import { EditBookingDialog } from './components/EditBookingDialog';
import { VendorSidebar } from './components/VendorSidebar';
import { serviceStorage } from '../../utils/serviceStorage';
import { serviceProviderStorage } from '../../utils/serviceProviderStorage';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'approveBookingRequest' | 'editBooking' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable';

interface VendorServicesPageProps {
  onNavigate: (page: Page) => void;
}

export function VendorServicesPage({ onNavigate }: VendorServicesPageProps) {
  const [activePage, setActivePage] = useState<string>('services');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showCreateServiceDialog, setShowCreateServiceDialog] = useState(false);
  const [showEditServiceDialog, setShowEditServiceDialog] = useState(false);
  const [showServiceDetailsDialog, setShowServiceDetailsDialog] = useState(false);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [showCreateVoucherDialog, setShowCreateVoucherDialog] = useState(false);
  const [showCreateVoucherPage, setShowCreateVoucherPage] = useState(false);
  const [showCreateCampaignDialog, setShowCreateCampaignDialog] = useState(false);
  const [showCreateSubAdminDialog, setShowCreateSubAdminDialog] = useState(false);
  const [showEditBookingDialog, setShowEditBookingDialog] = useState(false);
  const [vendorServices, setVendorServices] = useState<ServiceData[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  // Load vendor-created services on mount
  useEffect(() => {
    const allServices = serviceStorage.getAllServiceProviders();
    const hiddenServices = JSON.parse(localStorage.getItem('hiddenServices') || '[]');
    const visibleServices = allServices.filter(s => !hiddenServices.includes(s.id));
    // Only show services from the current vendor
    const currentVendorId = 'vendor_001'; // In a real app, this would come from auth context
    const vendorFilteredServices = visibleServices.filter(s => s.serviceProviderId === currentVendorId);
    setVendorServices(vendorFilteredServices);
  }, []);

  const handleNavigation = (page: string) => {
    setActivePage(page);
    // Map generic names to specific vendor page names
    const pageMap: { [key: string]: Page } = {
      'dashboard': 'vendorDashboard',
      'campaigns': 'vendorCampaigns',
      'services': 'vendorServices',
      'transactions': 'vendorTransactions',
      'profile': 'vendorProfile',
      'overview': 'vendorOverview',
      'draft': 'vendorDrafts',
      'help': 'vendorHelp',
    };
    const mappedPage = pageMap[page] || page;
    onNavigate(mappedPage as Page);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('hasVisitedBefore');
    toast.success('Logged out successfully');
    setTimeout(() => {
      onNavigate('login');
    }, 500);
  };

  const handleCreateOption = (optionId: string) => {
    switch (optionId) {
      case 'campaign':
        setShowCreateCampaignDialog(true);
        break;
      case 'voucher':
        setShowCreateVoucherDialog(true);
        break;
      case 'service':
        setShowCreateServiceDialog(true);
        break;
      case 'user':
        toast.info('User creation coming soon!');
        break;
    }
  };

  const handleEditService = (serviceId: number) => {
    const service = vendorServices.find((s) => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      setShowEditServiceDialog(true);
    }
  };

  const handleDeleteService = (serviceId: number) => {
    const service = vendorServices.find((s) => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      setShowDeleteConfirmationDialog(true);
    }
  };

  const confirmDeleteService = () => {
    if (selectedService) {
      const isDefaultService = selectedService.id < 1000;
      
      if (isDefaultService) {
        // For default services, mark as hidden
        const hiddenServices = JSON.parse(localStorage.getItem('hiddenServices') || '[]');
        hiddenServices.push(selectedService.id);
        localStorage.setItem('hiddenServices', JSON.stringify(hiddenServices));
      } else {
        // For vendor-created services, delete from storage
        serviceStorage.delete(selectedService.id);
      }
      
      // Reload services
      const allServices = serviceStorage.getAllServiceProviders();
      const hiddenServices = JSON.parse(localStorage.getItem('hiddenServices') || '[]');
      const visibleServices = allServices.filter(s => !hiddenServices.includes(s.id));
      const currentVendorId = 'vendor_001';
      const vendorFilteredServices = visibleServices.filter(s => s.serviceProviderId === currentVendorId);
      setVendorServices(vendorFilteredServices);
      
      toast.success('Service deleted successfully');
      setSelectedService(null);
    }
  };

  const handleServiceCreated = (newService: ServiceData) => {
    serviceStorage.add(newService);
    // Reload services
    const allServices = serviceStorage.getAllServiceProviders();
    const hiddenServices = JSON.parse(localStorage.getItem('hiddenServices') || '[]');
    const visibleServices = allServices.filter(s => !hiddenServices.includes(s.id));
    const currentVendorId = 'vendor_001';
    const vendorFilteredServices = visibleServices.filter(s => s.serviceProviderId === currentVendorId);
    setVendorServices(vendorFilteredServices);
  };

  const handleServiceEdited = (editedService: ServiceData) => {
    // Check if it's a default service (id < 1000) or vendor-created (id >= Date.now())
    const isDefaultService = editedService.id < 1000;
    
    if (isDefaultService) {
      // For default services, save the edited version to localStorage with a new ID
      const newServiceWithNewId = {
        ...editedService,
        id: Date.now(), // Give it a new unique ID
        originalId: editedService.id, // Keep reference to original
      };
      serviceStorage.add(newServiceWithNewId);
      
      // Mark the original service as hidden
      const hiddenServices = JSON.parse(localStorage.getItem('hiddenServices') || '[]');
      hiddenServices.push(editedService.id);
      localStorage.setItem('hiddenServices', JSON.stringify(hiddenServices));
    } else {
      // For vendor-created services, update normally
      serviceStorage.update(editedService);
    }
    
    // Reload services
    const allServices = serviceStorage.getAllServiceProviders();
    const hiddenServices = JSON.parse(localStorage.getItem('hiddenServices') || '[]');
    const visibleServices = allServices.filter(s => !hiddenServices.includes(s.id));
    const currentVendorId = 'vendor_001';
    const vendorFilteredServices = visibleServices.filter(s => s.serviceProviderId === currentVendorId);
    setVendorServices(vendorFilteredServices);
  };

  const handleViewServiceDetails = (service: ServiceData) => {
    setSelectedService(service);
    setShowServiceDetailsDialog(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <VendorSidebar currentPage={activePage} onNavigate={onNavigate} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8363f2] focus:border-transparent"
              />
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              <button className="px-6 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors" onClick={() => setShowCreateDialog(true)}>
                Create
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Header with Title and Filters */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl">My Services</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm">Filter by</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span className="text-sm">Sort by</span>
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-3 gap-6">
            {vendorServices.filter(service => service.available === true).map((service) => (
              <div key={service.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Service Image */}
                <div 
                  className="relative h-40 cursor-pointer"
                  onClick={() => handleViewServiceDetails(service)}
                >
                  <ImageWithFallback
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs rounded-full">
                    Available
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-4">
                  <h3 
                    className="mb-1 cursor-pointer hover:text-purple-600 transition-colors"
                    onClick={() => handleViewServiceDetails(service)}
                  >
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">ðŸ“ {service.category}</p>
                  
                  {/* Service Provider Info */}
                  {service.serviceProviderName && (
                    <p className="text-xs text-purple-600 mb-2">
                      Provider: {service.serviceProviderName}
                    </p>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      {service.priceRate ? (
                        <p className="text-sm">R{service.priceRate}</p>
                      ) : service.price ? (
                        <p className="text-sm">{service.price} <span className="text-gray-500">{service.priceUnit}</span></p>
                      ) : (
                        <p className="text-sm">Price not set</p>
                      )}
                    </div>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditService(service.id);
                        }}
                        className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        title="Edit service"
                      >
                        <Edit className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteService(service.id);
                        }}
                        className="p-1.5 border border-gray-300 rounded hover:bg-red-50 transition-colors"
                        title="Delete service"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">{service.bookings || 'No bookings Yet'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <CreateOptionsDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSelectOption={handleCreateOption}
      />
      
      <CreateServiceDialog
        open={showCreateServiceDialog}
        onOpenChange={setShowCreateServiceDialog}
        onServiceCreated={handleServiceCreated}
      />
      
      <EditServiceDialog
        open={showEditServiceDialog}
        onOpenChange={setShowEditServiceDialog}
        onServiceEdited={handleServiceEdited}
        service={selectedService}
      />
      
      <ServiceDetailsDialog
        open={showServiceDetailsDialog}
        onOpenChange={setShowServiceDetailsDialog}
        service={selectedService}
        onEdit={(service) => {
          handleEditService(service.id);
        }}
      />
      
      <DeleteConfirmationDialog
        open={showDeleteConfirmationDialog}
        onOpenChange={setShowDeleteConfirmationDialog}
        onConfirm={confirmDeleteService}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone and the service will be permanently removed from your listings."
      />
      
      <CreateVoucherDialog
        open={showCreateVoucherDialog}
        onOpenChange={setShowCreateVoucherDialog}
      />

      <CreateVoucherPage
        open={showCreateVoucherPage}
        onOpenChange={setShowCreateVoucherPage}
        onNavigate={onNavigate}
      />

      <CreateCampaignDialog
        open={showCreateCampaignDialog}
        onOpenChange={setShowCreateCampaignDialog}
      />

      <CreateSubAdminDialog
        open={showCreateSubAdminDialog}
        onOpenChange={setShowCreateSubAdminDialog}
        onNavigate={onNavigate}
      />

      <EditBookingDialog
        open={showEditBookingDialog}
        onOpenChange={setShowEditBookingDialog}
        onNavigate={onNavigate}
      />

      <Toaster />
    </div>
  );
}
