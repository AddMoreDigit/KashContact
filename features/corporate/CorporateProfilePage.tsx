import { useState } from 'react';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { CorporateSidebar } from './components/CorporateSidebar';
import { NavBar } from '../../components/NavBar';
import { calculateCorporateProfileCompletion } from '../../utils/profileCompletion';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'approveBookingRequest' | 'editBooking' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable';

interface CorporateProfilePageProps {
  onNavigate: (page: Page) => void;
}

export function CorporateProfilePage({ onNavigate }: CorporateProfilePageProps) {
  const [activePage, setActivePage] = useState<string>('profile');
  const [showEditInfoDialog, setShowEditInfoDialog] = useState(false);
  const [showEditSecurityDialog, setShowEditSecurityDialog] = useState(false);

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    onNavigate(page);
  };

  const [corporateInfo, setCorporateInfo] = useState({
    fullNames: 'Add more Digital',
    email: 'contact@addmoredigital.com',
    phoneNumber: '+27 11 234 5678',
    address: '456 Business Ave, Johannesburg, 2000',
  });

  const [editInfo, setEditInfo] = useState(corporateInfo);

  const [securityInfo, setSecurityInfo] = useState({
    password: 'â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢',
    twoFactorAuth: 'Off',
    recoveryEmail: 'Vukonahlayisi@gmail.com',
  });

  const [editSecurity, setEditSecurity] = useState(securityInfo);

  const handleSaveInfo = () => {
    setCorporateInfo(editInfo);
    setShowEditInfoDialog(false);
    toast.success('Corporate information updated successfully');
  };

  const handleSaveSecurity = () => {
    setSecurityInfo(editSecurity);
    setShowEditSecurityDialog(false);
    toast.success('Security settings updated successfully');
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

  const profileCompletion = calculateCorporateProfileCompletion(corporateInfo, securityInfo);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <CorporateSidebar
        currentPage="profile"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-[900px] mx-auto px-8 py-8">
          {/* Header Banner */}
          <div className="relative mb-8 rounded-2xl overflow-hidden h-[200px]">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1722596627369-a743837c7176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBkaWdpdGFsJTIwdGVjaHxlbnwxfHx8fDE3NjMwODk4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Corporate Banner" 
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Company Name and Edit Button */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-[24px] font-semibold text-black mb-1">Add more Digital</h1>
              <p className="text-[14px] text-gray-600">Primary User</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-[14px] text-[#8363f2] hover:bg-purple-50 rounded-lg transition-colors">
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>

          {/* Corporate Information Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-medium text-black">Corporate information</h2>
              <button className="text-[#8363f2] hover:underline text-[14px]" onClick={() => setShowEditInfoDialog(true)}>
                Edit
              </button>
            </div>
            
            <div className="space-y-3 text-[14px]">
              <div className="text-gray-600">Full names: {corporateInfo.fullNames}</div>
              <div className="text-gray-600">Email: {corporateInfo.email}</div>
              <div className="text-gray-600">Phone number: {corporateInfo.phoneNumber}</div>
              <div className="text-gray-600">Address: {corporateInfo.address}</div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-[18px] font-medium text-black mb-6">Security</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-gray-800">Password</span>
                <span className="text-[14px] text-gray-800">{securityInfo.password}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-gray-800">Two-Factor Authentication</span>
                <span className="text-[14px] text-gray-800">{securityInfo.twoFactorAuth}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-gray-800">Recovery Email</span>
                <span className="text-[14px] text-gray-800">{securityInfo.recoveryEmail}</span>
              </div>
            </div>
          </div>

          {/* Complete Your Profile Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-[18px] font-medium text-black mb-6">Complete Your Profile</h2>
            
            <div className="flex items-start justify-between">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${profileCompletion.setupAccount.completed ? 'bg-[#14AE5C]' : 'bg-gray-300'}`}>
                    {profileCompletion.setupAccount.completed && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4.5L4.5 8L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-[14px] text-gray-800">Setup Account <span className="text-gray-400">{profileCompletion.setupAccount.percentage}%</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${profileCompletion.uploadPhoto.completed ? 'bg-[#14AE5C]' : 'bg-gray-300'}`}>
                    {profileCompletion.uploadPhoto.completed && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4.5L4.5 8L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-[14px] text-gray-800">Upload your photo <span className="text-gray-400">{profileCompletion.uploadPhoto.percentage}%</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${profileCompletion.personalInformation.completed ? 'bg-[#14AE5C]' : 'bg-gray-300'}`}>
                    {profileCompletion.personalInformation.completed && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4.5L4.5 8L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-[14px] text-gray-800">Personal information <span className="text-gray-400">{profileCompletion.personalInformation.percentage}%</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-300">
                  </div>
                  <span className="text-[14px] text-gray-800">Location <span className="text-gray-400">0%</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${profileCompletion.bankDetails.completed ? 'bg-[#14AE5C]' : 'bg-gray-300'}`}>
                    {profileCompletion.bankDetails.completed && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4.5L4.5 8L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-[14px] text-gray-800">Bank Details <span className="text-gray-400">{profileCompletion.bankDetails.percentage}%</span></span>
                </div>
              </div>

              {/* Progress Circle */}
              <div className="relative w-[120px] h-[120px] flex-shrink-0">
                {/* Background Circle */}
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="10"
                  />
                </svg>
                {/* Progress Circle */}
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#8363f2"
                    strokeWidth="10"
                    strokeDasharray={`${(profileCompletion.total / 100) * 314} 314`}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Percentage Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[28px] font-semibold text-black">{profileCompletion.total}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Info Dialog */}
      <Dialog open={showEditInfoDialog} onOpenChange={setShowEditInfoDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Edit Corporate Information</DialogTitle>
          <DialogDescription>
            Update your corporate information here.
          </DialogDescription>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullNames">Full Names</Label>
              <Input
                id="fullNames"
                value={editInfo.fullNames}
                onChange={(e) => setEditInfo({ ...editInfo, fullNames: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={editInfo.email}
                onChange={(e) => setEditInfo({ ...editInfo, email: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={editInfo.phoneNumber}
                onChange={(e) => setEditInfo({ ...editInfo, phoneNumber: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={editInfo.address}
                onChange={(e) => setEditInfo({ ...editInfo, address: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="text-sm text-gray-500 hover:underline"
              onClick={() => setShowEditInfoDialog(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="text-sm bg-[#8363f2] text-white hover:bg-[#6c4ab6] rounded-lg px-4 py-2"
              onClick={handleSaveInfo}
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Security Dialog */}
      <Dialog open={showEditSecurityDialog} onOpenChange={setShowEditSecurityDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Edit Security Settings</DialogTitle>
          <DialogDescription>
            Update your security settings here.
          </DialogDescription>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={editSecurity.password}
                onChange={(e) => setEditSecurity({ ...editSecurity, password: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
              <Input
                id="twoFactorAuth"
                value={editSecurity.twoFactorAuth}
                onChange={(e) => setEditSecurity({ ...editSecurity, twoFactorAuth: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recoveryEmail">Recovery Email</Label>
              <Input
                id="recoveryEmail"
                value={editSecurity.recoveryEmail}
                onChange={(e) => setEditSecurity({ ...editSecurity, recoveryEmail: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="text-sm text-gray-500 hover:underline"
              onClick={() => setShowEditSecurityDialog(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="text-sm bg-[#8363f2] text-white hover:bg-[#6c4ab6] rounded-lg px-4 py-2"
              onClick={handleSaveSecurity}
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toaster */}
      <Toaster />
    </div>
  );
}
