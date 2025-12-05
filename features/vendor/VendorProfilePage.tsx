import { useState, useEffect } from 'react';
import { Camera, Mail, Phone, MapPin, Edit2 } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import { VendorSidebar } from './components/VendorSidebar';
import { serviceProviderStorage } from '../../utils/serviceProviderStorage';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'approveBookingRequest' | 'editBooking' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable';

interface VendorProfilePageProps {
  onNavigate: (page: Page) => void;
}

export function VendorProfilePage({ onNavigate }: VendorProfilePageProps) {
  const [activePage] = useState<string>('profile');
  const [vendorProfile, setVendorProfile] = useState(serviceProviderStorage.get());
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);
  
  // Editable form state
  const [formData, setFormData] = useState({
    businessName: vendorProfile.businessName,
    name: vendorProfile.name,
    surname: '',
    email: vendorProfile.email,
    phone: vendorProfile.phone,
    location: vendorProfile.location,
    profilePhoto: vendorProfile.image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzMDU3MTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    password: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: true,
    recoveryEmail: vendorProfile.email,
  });
  
  // Load vendor profile on mount
  useEffect(() => {
    serviceProviderStorage.initialize();
    const profile = serviceProviderStorage.get();
    setVendorProfile(profile);
    setFormData({
      businessName: profile.businessName,
      name: profile.name,
      surname: '',
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      profilePhoto: profile.image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzMDU3MTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      password: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorAuth: true,
      recoveryEmail: profile.email,
    });
  }, []);
  
  // Calculate dynamic profile completion
  const calculateProfileCompletion = () => {
    let setupAccount = 100; // Always complete if logged in
    let uploadPhoto = vendorProfile.image ? 100 : 0;
    let personalInfo = 0;
    if (vendorProfile.name) personalInfo += 25;
    if (vendorProfile.email) personalInfo += 25;
    if (vendorProfile.phone) personalInfo += 25;
    if (formData.surname) personalInfo += 25;
    
    let location = vendorProfile.location ? 100 : 0;
    let bankDetails = 100; // Assuming always complete for vendors
    
    const overall = Math.round((setupAccount + uploadPhoto + personalInfo + location + bankDetails) / 5);
    
    return {
      overall,
      setupAccount,
      uploadPhoto,
      personalInfo,
      location,
      bankDetails,
    };
  };
  
  const profileCompletion = calculateProfileCompletion();

  const handleNavigation = (page: Page) => {
    onNavigate(page);
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

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleEditPersonalInfo = () => {
    setIsEditingPersonalInfo(true);
  };
  
  const handleEditSecurity = () => {
    setIsEditingSecurity(true);
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePhoto: reader.result as string });
        toast.success('Photo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Update vendor profile with form data
    const updatedProfile = {
      ...vendorProfile,
      businessName: formData.businessName,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      image: formData.profilePhoto,
    };
    serviceProviderStorage.update(updatedProfile);
    setVendorProfile(updatedProfile);
    setIsEditingProfile(false);
    setIsEditingPersonalInfo(false);
    toast.success('Profile updated successfully');
  };

  const handleCancelEdit = () => {
    // Reset form data to original profile values
    setFormData({
      businessName: vendorProfile.businessName,
      name: vendorProfile.name,
      surname: '',
      email: vendorProfile.email,
      phone: vendorProfile.phone,
      location: vendorProfile.location,
      profilePhoto: vendorProfile.image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzMDU3MTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      password: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorAuth: true,
      recoveryEmail: vendorProfile.email,
    });
    setIsEditingProfile(false);
    setIsEditingPersonalInfo(false);
    setIsEditingSecurity(false);
  };

  // Profile data structure to match UI
  const profileData = {
    hotelName: vendorProfile.businessName,
    userType: 'Vendor Account',
    personalInfo: {
      fullNames: vendorProfile.name,
      surname: '', // Can be extracted if needed
      email: vendorProfile.email,
      phoneNumber: vendorProfile.phone,
      address: vendorProfile.location,
    },
    security: {
      password: 'â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢',
      twoFactorAuth: formData.twoFactorAuth ? 'Enabled' : 'Disabled',
      recoveryEmail: formData.recoveryEmail,
    },
    profileCompletion: profileCompletion,
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <VendorSidebar currentPage={activePage} onNavigate={onNavigate} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {/* Profile Content */}
        <div className="p-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-[24px] font-medium text-black mb-1">Profile</h1>
            <p className="text-[14px] text-gray-600">Manage your vendor account information</p>
          </div>

          {/* Hero Image */}
          <div className="mb-6">
            <div className="relative">
              <ImageWithFallback 
                src={formData.profilePhoto}
                alt="Hotel Room" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <label className="mt-4 inline-flex items-center gap-2 bg-[#8363f2] hover:bg-[#7354e1] text-white px-4 py-2 rounded-lg cursor-pointer transition-colors text-[14px]">
              <Camera className="w-4 h-4" />
              <span>Change Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Hotel Name and User Type */}
          <div className="flex items-center justify-between mb-8 bg-white rounded-lg border border-gray-200 p-6">
            {isEditingProfile ? (
              <div className="flex-1 mr-4">
                <label className="block text-[14px] text-gray-600 mb-1">Business Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-[20px] font-medium"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-[20px] font-medium text-black mb-1">{profileData.hotelName}</h2>
                <p className="text-[14px] text-gray-600">{profileData.userType}</p>
              </div>
            )}
            {isEditingProfile ? (
              <div className="flex gap-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-[14px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors text-[14px]"
                >
                  Save
                </button>
              </div>
            ) : (
              <button 
                onClick={handleEditProfile}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[14px]"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            )}
          </div>

          {/* Personal Information */}
          <div className="mb-6 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-medium text-black">Personal Information</h2>
              {isEditingPersonalInfo ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-[14px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors text-[14px]"
                  >
                    Save
                  </button>
                </div>
              ) : !isEditingProfile && (
                <button 
                  onClick={handleEditPersonalInfo}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[14px]"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] text-gray-600 mb-1">Full names</label>
                <input
                  type="text"
                  value={isEditingPersonalInfo ? formData.name : profileData.personalInfo.fullNames}
                  readOnly={!isEditingPersonalInfo}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg text-[14px] ${
                    isEditingPersonalInfo 
                      ? 'border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white' 
                      : 'border-gray-300 bg-gray-50'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[14px] text-gray-600 mb-1">Surname</label>
                <input
                  type="text"
                  value={isEditingPersonalInfo ? formData.surname : profileData.personalInfo.surname}
                  readOnly={!isEditingPersonalInfo}
                  onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg text-[14px] ${
                    isEditingPersonalInfo 
                      ? 'border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white' 
                      : 'border-gray-300 bg-gray-50'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[14px] text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={(isEditingProfile || isEditingPersonalInfo) ? formData.email : profileData.personalInfo.email}
                  readOnly={!(isEditingProfile || isEditingPersonalInfo)}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg text-[14px] ${
                    (isEditingProfile || isEditingPersonalInfo)
                      ? 'border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white' 
                      : 'border-gray-300 bg-gray-50'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[14px] text-gray-600 mb-1">Phone number</label>
                <input
                  type="tel"
                  value={(isEditingProfile || isEditingPersonalInfo) ? formData.phone : profileData.personalInfo.phoneNumber}
                  readOnly={!(isEditingProfile || isEditingPersonalInfo)}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg text-[14px] ${
                    (isEditingProfile || isEditingPersonalInfo)
                      ? 'border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white' 
                      : 'border-gray-300 bg-gray-50'
                  }`}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[14px] text-gray-600 mb-1">Address</label>
                <input
                  type="text"
                  value={(isEditingProfile || isEditingPersonalInfo) ? formData.location : profileData.personalInfo.address}
                  readOnly={!(isEditingProfile || isEditingPersonalInfo)}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg text-[14px] ${
                    (isEditingProfile || isEditingPersonalInfo)
                      ? 'border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white' 
                      : 'border-gray-300 bg-gray-50'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="mb-6 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-medium text-black">Security</h2>
              {isEditingSecurity ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-[14px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (formData.newPassword && formData.newPassword === formData.confirmPassword) {
                        toast.success('Security settings updated successfully');
                        setIsEditingSecurity(false);
                      } else if (formData.newPassword !== formData.confirmPassword) {
                        toast.error('Passwords do not match');
                      } else {
                        toast.success('Security settings updated successfully');
                        setIsEditingSecurity(false);
                      }
                    }}
                    className="px-4 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors text-[14px]"
                  >
                    Save
                  </button>
                </div>
              ) : !isEditingProfile && !isEditingPersonalInfo && (
                <button 
                  onClick={handleEditSecurity}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[14px]"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {isEditingSecurity ? (
                <>
                  <div>
                    <label className="block text-[14px] text-gray-600 mb-1">Current Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter current password"
                      className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-[14px] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] text-gray-600 mb-1">New Password</label>
                    <input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-[14px] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] text-gray-600 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-[14px] bg-white"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-[14px] text-gray-600 mb-1">Password</label>
                  <input
                    type="password"
                    value={profileData.security.password}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-[14px]"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-[14px] text-gray-900">Two-Factor Authentication</span>
                {isEditingSecurity ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.twoFactorAuth}
                      onChange={(e) => setFormData({ ...formData, twoFactorAuth: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8363f2]"></div>
                  </label>
                ) : (
                  <span className={`text-[14px] px-3 py-1 rounded-full ${formData.twoFactorAuth ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {profileData.security.twoFactorAuth}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between py-3">
                <span className="text-[14px] text-gray-900">Recovery Email</span>
                {isEditingSecurity ? (
                  <input
                    type="email"
                    value={formData.recoveryEmail}
                    onChange={(e) => setFormData({ ...formData, recoveryEmail: e.target.value })}
                    className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-[14px] bg-white"
                  />
                ) : (
                  <span className="text-[14px] text-gray-600">{profileData.security.recoveryEmail}</span>
                )}
              </div>
            </div>
          </div>

          {/* Complete Your Profile */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-[18px] font-medium text-black mb-6">Profile Completion</h2>

            <div className="flex items-start gap-8">
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[14px] text-gray-900">Setup Account</span>
                  </div>
                  <span className="text-[14px] text-gray-600">{profileData.profileCompletion.setupAccount}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[14px] text-gray-900">Upload your photo</span>
                  </div>
                  <span className="text-[14px] text-gray-600">{profileData.profileCompletion.uploadPhoto}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[14px] text-gray-900">Personal Information</span>
                  </div>
                  <span className="text-[14px] text-gray-600">{profileData.profileCompletion.personalInfo}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[14px] text-gray-900">Location</span>
                  </div>
                  <span className="text-[14px] text-gray-600">{profileData.profileCompletion.location}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[14px] text-gray-900">Bank Details</span>
                  </div>
                  <span className="text-[14px] text-gray-600">{profileData.profileCompletion.bankDetails}%</span>
                </div>
              </div>

              {/* Circular Progress */}
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#8363f2"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - profileData.profileCompletion.overall / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-[28px] font-medium text-black">{profileData.profileCompletion.overall}%</span>
                  <span className="text-[12px] text-gray-600">Complete</span>
                </div>
              </div>
            </div>
          </div>

          {/* Save or Cancel Edit */}
          {(isEditingProfile || isEditingPersonalInfo) && (
            <div className="mt-6 flex justify-end gap-3 bg-white rounded-lg border border-gray-200 p-6">
              <button
                onClick={handleCancelEdit}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-[14px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7354e1] transition-colors text-[14px]"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      <Toaster />
    </div>
  );
}
