import { useState, useEffect, useMemo } from 'react';
import svgPaths from '../../imports/svg-ejiwwlo8jx';
//import imgRectangle107 from "../../imports/figma/asset/5cc2416480b57fac2281fb4125aa155e57a479ee.png";
//import imgEllipse45 from "../../imports/figma/asset/1a2305dbf685fe839ddb89accfcb91ad8e3ec824.png";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Edit2, Upload, X, Eye, EyeOff } from 'lucide-react';
import { calculateProfileCompletion } from '../../utils/profileCompletion';
import { 
  getCurrentUserProfile, 
  updateProfile, 
  updateProfilePhoto,
  updateBankDetails as updateBankDetailsStorage,
  updateSecurityInfo as updateSecurityInfoStorage
} from '../../utils/profileStorage';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop';
import { toast } from 'sonner';
import { Toaster } from '../ui/sonner';

interface ProfilePageProps {
  className?: string;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

interface PersonalInfo {
  fullNames: string;
  surname: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface UserProfile {
  fullNames: string;
  surname: string;
  email: string;
  phoneNumber: string;
  address: string;
  photo?: string;
  billingDetails?: {
    cardholderName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

interface SecurityInfo {
  password: string;
  twoFactorAuth: boolean;
  recoveryEmail: string;
}

export function ProfilePage({ className, userProfile, onUpdateProfile }: ProfilePageProps) {
  const [showEditPersonalInfo, setShowEditPersonalInfo] = useState(false);
  const [showEditSecurity, setShowEditSecurity] = useState(false);
  const [showUploadPhoto, setShowUploadPhoto] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [profilePhotoKey, setProfilePhotoKey] = useState(Date.now());
  const [currentPhoto, setCurrentPhoto] = useState(userProfile.photo);
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(userProfile);

  const [securityInfo, setSecurityInfo] = useState<SecurityInfo>({
    password: '**********',
    twoFactorAuth: false,
    recoveryEmail: userProfile.email
  });

  // Sync current photo with userProfile prop
  useEffect(() => {
    setCurrentPhoto(userProfile.photo);
  }, [userProfile.photo]);

  // Listen for profile updates and force re-render
  useEffect(() => {
    const handleProfileUpdate = () => {
      setProfilePhotoKey(Date.now());
      const profile = getCurrentUserProfile();
      if (profile && profile.photo) {
        setCurrentPhoto(profile.photo);
      }
    };

    window.addEventListener('profilePhotoUpdated', handleProfileUpdate);
    window.addEventListener('profileUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('profilePhotoUpdated', handleProfileUpdate);
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  const [editPersonalInfo, setEditPersonalInfo] = useState<PersonalInfo>(userProfile);
  const [editSecurityInfo, setEditSecurityInfo] = useState<SecurityInfo>(securityInfo);
  const [photoPreview, setPhotoPreview] = useState('');
  const [croppedImage, setCroppedImage] = useState('');
  const [editBankDetails, setEditBankDetails] = useState(userProfile.billingDetails || {
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Calculate profile completion based on current state
  const profileCompletion = useMemo(() => {
    const currentProfile = {
      ...userProfile,
      photo: currentPhoto,
    };
    return calculateProfileCompletion(currentProfile);
  }, [userProfile, currentPhoto]);

  const handleSavePersonalInfo = () => {
    setPersonalInfo(editPersonalInfo);
    
    // Get current user from storage
    const currentProfile = getCurrentUserProfile();
    if (currentProfile) {
      updateProfile(currentProfile.id, editPersonalInfo);
      toast.success('Personal information updated successfully');
    }
    
    onUpdateProfile(editPersonalInfo);
    setShowEditPersonalInfo(false);
  };

  const handleSaveSecurity = () => {
    setSecurityInfo(editSecurityInfo);
    
    // Get current user from storage
    const currentProfile = getCurrentUserProfile();
    if (currentProfile) {
      updateSecurityInfoStorage(currentProfile.id, editSecurityInfo);
      toast.success('Security settings updated successfully');
    }
    
    setShowEditSecurity(false);
  };

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('📁 File selected:', file.name, file.type, file.size);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        console.log('✅ File read complete. Data URL length:', result.length);
        console.log('📸 Data URL prefix:', result.substring(0, 50));
        setPhotoPreview(result);
        setCroppedImage('');
      };
      reader.onerror = (error) => {
        console.error('❌ FileReader error:', error);
        toast.error('Failed to read file');
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const createCroppedImage = async () => {
    if (!photoPreview || !croppedAreaPixels) return;

    const image = new Image();
    image.src = photoPreview;
    
    return new Promise<string>((resolve) => {
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) return;

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        canvas.toBlob((blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(blob);
          }
        }, 'image/jpeg', 0.95);
      };
    });
  };

  const handleApplyCrop = async () => {
    console.log('🔄 Applying crop...');
    const cropped = await createCroppedImage();
    console.log('✂️ Cropped image result:', cropped ? `${cropped.substring(0, 50)}... (length: ${cropped.length})` : 'null');
    if (cropped) {
      setCroppedImage(cropped);
      console.log('✅ Cropped image state updated');
    } else {
      console.error('❌ Failed to create cropped image');
      toast.error('Failed to crop image');
    }
  };

  const handleSavePhoto = () => {
    const finalPhotoUrl = croppedImage || photoPreview;
    console.log('handleSavePhoto called');
    console.log('croppedImage:', croppedImage ? 'exists' : 'empty');
    console.log('photoPreview:', photoPreview ? 'exists' : 'empty');
    console.log('finalPhotoUrl:', finalPhotoUrl ? finalPhotoUrl.substring(0, 100) : 'empty');
    
    if (finalPhotoUrl) {
      // Update local state immediately
      setCurrentPhoto(finalPhotoUrl);
      console.log('Updated currentPhoto state');
      
      // Get current user from storage and update photo in profileStorage
      const currentProfile = getCurrentUserProfile();
      if (currentProfile) {
        updateProfilePhoto(currentProfile.id, finalPhotoUrl);
      }
      
      // Update the userProfile in App.tsx through onUpdateProfile
      const updatedProfile = { ...userProfile, photo: finalPhotoUrl };
      onUpdateProfile(updatedProfile);
      
      // Also update localStorage directly to ensure sync
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        profileData.photo = finalPhotoUrl;
        localStorage.setItem('userProfile', JSON.stringify(profileData));
      }
      
      toast.success('Profile photo updated successfully');
      
      // Force immediate UI refresh
      setProfilePhotoKey(Date.now());
      
      // Close dialog and reset states
      setShowUploadPhoto(false);
      setPhotoPreview('');
      setCroppedImage('');
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    } else {
      console.error('No photo to save!');
      toast.error('Please select a photo first');
    }
  };

  const handleCancelPhotoUpload = () => {
    setShowUploadPhoto(false);
    setPhotoPreview('');
    setCroppedImage('');
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleSaveBankDetails = () => {
    // Get current user from storage
    const currentProfile = getCurrentUserProfile();
    if (currentProfile) {
      updateBankDetailsStorage(currentProfile.id, editBankDetails);
      toast.success('Billing details updated successfully');
    }
    
    const updatedProfile = { ...userProfile, billingDetails: editBankDetails };
    onUpdateProfile(updatedProfile);
    setShowBankDetails(false);
  };

  return (
    <div className={`bg-[#f5f5f5] min-h-screen pb-20 ${className || ''}`}>
      {/* Header with Cover Image */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-[200px] bg-gray-200 relative overflow-hidden">
          <img 
            src={"/asset/5cc2416480b57fac2281fb4125aa155e57a479ee.png"} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          {/* Edit Cover Button */}
          <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
            <Edit2 className="w-4 h-4 text-[#8363f2]" />
          </button>
        </div>

        {/* Profile Picture */}
        <div className="absolute left-8 -bottom-16 w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
          <img 
            key={profilePhotoKey} 
            src={currentPhoto || "/asset/1a2305dbf685fe839ddb89accfcb91ad8e3ec824.png"} 
            alt="Profile" 
            className="w-full h-full object-cover"
            onLoad={() => console.log('Profile image loaded:', (currentPhoto || "/asset/1a2305dbf685fe839ddb89accfcb91ad8e3ec824.png".substring(0, 100)))}
            onError={(e) => {
              console.error('Profile image failed to load');
              console.error('Attempted src:', currentPhoto);
              // Fallback to default image
              e.currentTarget.src = "/asset/1a2305dbf685fe839ddb89accfcb91ad8e3ec824.png";
            }}
          />
          {/* Edit Profile Photo Button */}
          <button 
            onClick={() => setShowUploadPhoto(true)}
            className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 flex items-center justify-center transition-all duration-200 group"
          >
            <Edit2 className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="pt-20 px-8 max-w-[1400px] mx-auto">
        {/* User Name and Edit Button */}
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-[24px] font-medium text-black">
            {personalInfo.fullNames} {personalInfo.surname}
          </h1>
          <button 
            onClick={() => setShowEditPersonalInfo(true)}
            className="text-[#8363f2] hover:underline flex items-center gap-1"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[18px] font-medium text-black">Personal Information</h2>
            <button 
              onClick={() => setShowEditPersonalInfo(true)}
              className="text-[#8363f2] hover:underline text-[14px] flex items-center gap-1"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>
          
          <div className="space-y-3 text-[14px]">
            <div>
              <div className="text-gray-500 mb-1">Full names</div>
              <div className="text-black">{personalInfo.fullNames || 'Not set'}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Surname</div>
              <div className="text-black">{personalInfo.surname || 'Not set'}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Email</div>
              <div className="text-black">{personalInfo.email || 'Not set'}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Phone number</div>
              <div className="text-black">{personalInfo.phoneNumber || 'Not set'}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Address</div>
              <div className="text-black">{personalInfo.address || 'Not set'}</div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[18px] font-medium text-black">Security</h2>
            <button
              onClick={() => {
                setEditSecurityInfo(securityInfo);
                setShowEditSecurity(true);
              }}
              className="flex items-center gap-2 text-[#8363f2] hover:text-[#7050e0] transition-colors"
            >
              <Edit2 size={16} />
              <span className="text-sm">Edit</span>
            </button>
          </div>
          
          <div className="space-y-4 text-[14px]">
            <div className="flex items-center justify-between">
              <span className="text-gray-800">Password</span>
              <span className="text-gray-800">••••••••••</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-800">Two-Factor Authentication</span>
              <span className="text-gray-800">{securityInfo.twoFactorAuth ? 'On' : 'Off'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-800">Recovery Email</span>
              <span className="text-gray-800">{securityInfo.recoveryEmail}</span>
            </div>
          </div>
        </div>

        {/* Billing Details Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[18px] font-medium text-black">Billing Details</h2>
            <button
              onClick={() => {
                setEditBankDetails(userProfile.billingDetails || {
                  cardholderName: '',
                  cardNumber: '',
                  expiryDate: '',
                  cvv: ''
                });
                setShowBankDetails(true);
              }}
              className="flex items-center gap-2 text-[#8363f2] hover:text-[#7050e0] transition-colors"
            >
              <Edit2 size={16} />
              <span className="text-sm">{userProfile.billingDetails ? 'Edit' : 'Add'}</span>
            </button>
          </div>
          
          {userProfile.billingDetails ? (
            <div className="space-y-4 text-[14px]">
              <div className="flex items-center justify-between">
                <span className="text-gray-800">Cardholder Name</span>
                <span className="text-gray-800">{userProfile.billingDetails.cardholderName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-800">Card Number</span>
                <span className="text-gray-800">•••• •••• •••• {userProfile.billingDetails.cardNumber.slice(-4)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-800">Expiry Date</span>
                <span className="text-gray-800">{userProfile.billingDetails.expiryDate}</span>
              </div>
            </div>
          ) : (
            <div className="text-[14px] text-gray-500">
              No billing details added yet. Click "Add" to add your payment information.
            </div>
          )}
        </div>

        {/* Complete Your Profile Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-[18px] font-medium text-black mb-6">Complete Your Profile</h2>
          
          <div className="flex items-start justify-between">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 21 15" fill="none">
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d={svgPaths.pe8c9400} 
                    fill={profileCompletion.setupAccount.completed ? "#14AE5C" : "#D1D5DB"} 
                  />
                </svg>
                <span className="text-[14px] text-gray-800">Setup Account <span className="text-gray-400">{profileCompletion.setupAccount.percentage}%</span></span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 21 15" fill="none">
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d={svgPaths.p279dbf40} 
                    fill={profileCompletion.uploadPhoto.completed ? "#14AE5C" : "#D1D5DB"} 
                  />
                </svg>
                <span className="text-[14px] text-gray-800">Upload your photo <span className="text-gray-400">{profileCompletion.uploadPhoto.percentage}%</span></span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 21 15" fill="none">
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d={svgPaths.p6586100} 
                    fill={profileCompletion.personalInformation.completed ? "#14AE5C" : "#D1D5DB"} 
                  />
                </svg>
                <span className="text-[14px] text-gray-800">Personal information <span className="text-gray-400">{profileCompletion.personalInformation.percentage}%</span></span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 21 15" fill="none">
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d={svgPaths.pe8c9400} 
                    fill={profileCompletion.bankDetails.completed ? "#14AE5C" : "#D1D5DB"} 
                  />
                </svg>
                <span className="text-[14px] text-gray-800">Billing Details <span className="text-gray-400">{profileCompletion.bankDetails.percentage}%</span></span>
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

      {/* Edit Personal Information Dialog */}
      <Dialog open={showEditPersonalInfo} onOpenChange={setShowEditPersonalInfo}>
        <DialogContent className="max-w-[600px]">
          <DialogTitle>Edit Personal Information</DialogTitle>
          <DialogDescription>Update your personal details below</DialogDescription>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullNames">Full Names</Label>
              <Input
                id="fullNames"
                value={editPersonalInfo.fullNames}
                onChange={(e) => setEditPersonalInfo({ ...editPersonalInfo, fullNames: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="surname">Surname</Label>
              <Input
                id="surname"
                value={editPersonalInfo.surname}
                onChange={(e) => setEditPersonalInfo({ ...editPersonalInfo, surname: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editPersonalInfo.email}
                onChange={(e) => setEditPersonalInfo({ ...editPersonalInfo, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={editPersonalInfo.phoneNumber}
                onChange={(e) => setEditPersonalInfo({ ...editPersonalInfo, phoneNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={editPersonalInfo.address}
                onChange={(e) => setEditPersonalInfo({ ...editPersonalInfo, address: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowEditPersonalInfo(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePersonalInfo}
              className="px-6 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7050e0]"
            >
              Save Changes
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Security Dialog */}
      <Dialog open={showEditSecurity} onOpenChange={setShowEditSecurity}>
        <DialogContent className="max-w-[600px]">
          <DialogTitle>Edit Security Settings</DialogTitle>
          <DialogDescription>Update your security preferences below</DialogDescription>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={editSecurityInfo.password}
                  onChange={(e) => setEditSecurityInfo({ ...editSecurityInfo, password: e.target.value })}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-gray-500 mb-3">Add an extra layer of security to your account</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditSecurityInfo({ ...editSecurityInfo, twoFactorAuth: true })}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    editSecurityInfo.twoFactorAuth
                      ? 'bg-[#8363f2] text-white border-[#8363f2]'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  On
                </button>
                <button
                  type="button"
                  onClick={() => setEditSecurityInfo({ ...editSecurityInfo, twoFactorAuth: false })}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    !editSecurityInfo.twoFactorAuth
                      ? 'bg-[#8363f2] text-white border-[#8363f2]'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Off
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recoveryEmail">Recovery Email</Label>
              <Input
                id="recoveryEmail"
                type="email"
                value={editSecurityInfo.recoveryEmail}
                onChange={(e) => setEditSecurityInfo({ ...editSecurityInfo, recoveryEmail: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowEditSecurity(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSecurity}
              className="px-6 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7050e0]"
            >
              Save Changes
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Photo Dialog */}
      <Dialog open={showUploadPhoto} onOpenChange={setShowUploadPhoto}>
        <DialogContent className="max-w-[700px]">
          <DialogTitle>Upload Profile Photo</DialogTitle>
          <DialogDescription>Choose a photo and adjust the crop area</DialogDescription>
          
          <div className="space-y-6 py-4">
            {/* File Upload Button */}
            {!photoPreview && (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-[#8363f2] transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <label htmlFor="photoFile" className="cursor-pointer">
                  <span className="px-6 py-3 bg-[#8363f2] text-white rounded-lg hover:bg-[#7050e0] inline-block">
                    Choose Photo
                  </span>
                  <input
                    id="photoFile"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-3">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
            
            {/* Crop Area */}
            {photoPreview && !croppedImage && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Adjust Crop Area</Label>
                  <button
                    onClick={() => {
                      setPhotoPreview('');
                      setCrop({ x: 0, y: 0 });
                      setZoom(1);
                    }}
                    className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Remove
                  </button>
                </div>
                <div className="relative w-full h-[400px] bg-gray-900 rounded-lg overflow-hidden">
                  <Cropper
                    image={photoPreview}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zoom">Zoom</Label>
                  <input
                    id="zoom"
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <button
                  onClick={handleApplyCrop}
                  className="w-full px-6 py-3 bg-[#8363f2] text-white rounded-lg hover:bg-[#7050e0]"
                >
                  Apply Crop
                </button>
              </div>
            )}

            {/* Cropped Preview */}
            {croppedImage && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Cropped Photo Preview</Label>
                  <button
                    onClick={() => {
                      setCroppedImage('');
                    }}
                    className="text-sm text-[#8363f2] hover:underline"
                  >
                    Adjust Crop
                  </button>
                </div>
                <div className="flex justify-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200">
                    <img 
                      src={croppedImage} 
                      alt="Cropped Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancelPhotoUpload}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePhoto}
              disabled={!croppedImage}
              className="px-6 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7050e0] disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Save Photo
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Bank Details Dialog */}
      <Dialog open={showBankDetails} onOpenChange={setShowBankDetails}>
        <DialogContent className="max-w-[600px]">
          <DialogTitle>Edit Billing Details</DialogTitle>
          <DialogDescription>Add or update your payment card information</DialogDescription>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                value={editBankDetails.cardholderName}
                onChange={(e) => setEditBankDetails({ ...editBankDetails, cardholderName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                value={editBankDetails.cardNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                  setEditBankDetails({ ...editBankDetails, cardNumber: value });
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={editBankDetails.expiryDate}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length >= 2) {
                      value = value.slice(0, 2) + '/' + value.slice(2, 4);
                    }
                    setEditBankDetails({ ...editBankDetails, expiryDate: value });
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder="123"
                  maxLength={3}
                  value={editBankDetails.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setEditBankDetails({ ...editBankDetails, cvv: value });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowBankDetails(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveBankDetails}
              className="px-6 py-2 bg-[#8363f2] text-white rounded-lg hover:bg-[#7050e0]"
            >
              Save Changes
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

