import { X, Upload, ChevronDown, Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { serviceProviderStorage } from '../../utils/serviceProviderStorage';

interface CreateServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onServiceCreated?: (serviceData: ServiceData) => void;
}

export interface ServiceData {
  id: number;
  name: string;
  location: string;
  category: string;
  image: string;
  description?: string;
  priceRate?: string;
  termsAndConditions?: string;
  gallery?: string[];
  available?: boolean;
  serviceProviderId?: string;
  serviceProviderName?: string;
  serviceProviderEmail?: string;
  serviceProviderPhone?: string;
  price?: string;
  priceUnit?: string;
  bookings?: string;
}

export function CreateServiceDialog({ open, onOpenChange, onServiceCreated }: CreateServiceDialogProps) {
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [serviceName, setServiceName] = useState('');
  const [serviceTnC, setServiceTnC] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [termsOption, setTermsOption] = useState<'read' | 'upload'>('read');
  const [termsFile, setTermsFile] = useState<string | null>(null);
  const [priceRate, setPriceRate] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryCount, setGalleryCount] = useState(0);
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState<boolean>(true);
  const [serviceProviderInfo, setServiceProviderInfo] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
  });

  // Load service provider info when dialog opens
  useEffect(() => {
    if (open) {
      const profile = serviceProviderStorage.get();
      setServiceProviderInfo({
        id: profile.id,
        name: profile.businessName,
        email: profile.email,
        phone: profile.phone,
      });
    }
  }, [open]);

  if (!open) return null;

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBannerImage(url);
    }
  };

  const handleTermsFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTermsFile(url);
      toast.success('Terms file uploaded successfully');
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setGalleryImages([...galleryImages, ...newImages]);
    }
  };

  const incrementGallery = () => {
    setGalleryCount(prev => prev + 1);
  };

  const decrementGallery = () => {
    setGalleryCount(prev => Math.max(0, prev - 1));
  };

  const handleSaveAndPublish = () => {
    if (!bannerImage) {
      toast.error('Please upload a banner image');
      return;
    }
    if (!serviceName.trim()) {
      toast.error('Please enter a service name');
      return;
    }
    if (!serviceCategory) {
      toast.error('Please select a service category');
      return;
    }
    if (!location.trim()) {
      toast.error('Please enter a location');
      return;
    }

    const serviceData: ServiceData = {
      id: Date.now(), // Generate a unique ID based on timestamp
      name: serviceName,
      location,
      category: serviceCategory,
      image: bannerImage,
      description: serviceDescription,
      priceRate,
      termsAndConditions: termsOption === 'upload' ? (termsFile || serviceTnC) : serviceTnC,
      gallery: galleryImages,
      available: availability,
      serviceProviderId: serviceProviderInfo.id,
      serviceProviderName: serviceProviderInfo.name,
      serviceProviderEmail: serviceProviderInfo.email,
      serviceProviderPhone: serviceProviderInfo.phone,
    };

    if (onServiceCreated) {
      onServiceCreated(serviceData);
    }

    toast.success('Service published successfully!');
    onOpenChange(false);
  };

  const handleSaveToDraft = () => {
    toast.success('Service saved to draft');
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[480px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-black">Create Service</h2>
            <p className="text-gray-500 text-xs mt-1">Add details about your service to share with potential campaign organizers</p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Banner Image Upload */}
          <div className="mb-4">
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-purple-500 transition-colors bg-gray-50">
                {bannerImage ? (
                  <img
                    src={bannerImage}
                    alt="Banner preview"
                    className="w-full h-32 object-cover rounded"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Upload size={24} className="text-gray-400" />
                    </div>
                    <span className="text-sm">Upload Banner Image</span>
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Service Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Service Name
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
              placeholder="Enter service name"
            />
          </div>

          {/* Service T&CS */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Service T&CS
            </label>
            <input
              type="text"
              value={serviceTnC}
              onChange={(e) => setServiceTnC(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
              placeholder=""
            />
          </div>

          {/* Service Category */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Service Category
            </label>
            <div className="relative">
              <select
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors appearance-none bg-white"
              >
                <option value=""></option>
                <option value="accommodation">Accommodation</option>
                <option value="transport">Transport</option>
                <option value="activities">Activities</option>
                <option value="food">Food & Dining</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Service Description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Service Description
            </label>
            <textarea
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors resize-none"
              rows={3}
              placeholder=""
            />
          </div>

          {/* Terms of Use */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Do you want free Terms Of Use / Upload
            </label>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setTermsOption('read')}
                className={`px-4 py-1.5 text-sm rounded transition-colors ${
                  termsOption === 'read'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Read
              </button>
              <button
                onClick={() => setTermsOption('upload')}
                className={`px-4 py-1.5 text-sm rounded transition-colors ${
                  termsOption === 'upload'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Upload
              </button>
            </div>
            {termsOption === 'upload' && (
              <div className="bg-gray-100 border border-gray-300 rounded-md p-3">
                <label className="cursor-pointer flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleTermsFileUpload}
                    className="hidden"
                  />
                  <Upload size={16} />
                  <span>Browse</span>
                  {termsFile && <span className="text-green-600">âœ“ File uploaded</span>}
                </label>
              </div>
            )}
          </div>

          {/* Price / Rate */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Price / Rate
            </label>
            <input
              type="text"
              value={priceRate}
              onChange={(e) => setPriceRate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
              placeholder="Enter price (e.g., 1200.00)"
            />
          </div>

          {/* Gallery */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Gallery
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={decrementGallery}
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-sm text-gray-700 w-8 text-center">{galleryCount}</span>
              <button
                onClick={incrementGallery}
                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <Plus size={16} />
              </button>
              <label className="ml-4 cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  className="hidden"
                />
                <span className="text-sm text-purple-600 hover:text-purple-700">+ Add Image</span>
              </label>
            </div>
            {galleryImages.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {galleryImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
              placeholder=""
            />
          </div>

          {/* Availability */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">
              Availability
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setAvailability(true)}
                className={`flex-1 px-4 py-2 text-sm rounded-md border transition-colors ${
                  availability
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Available
              </button>
              <button
                type="button"
                onClick={() => setAvailability(false)}
                className={`flex-1 px-4 py-2 text-sm rounded-md border transition-colors ${
                  !availability
                    ? 'bg-orange-50 border-orange-500 text-orange-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Unavailable
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleSaveToDraft}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              Save to draft
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAndPublish}
              className="px-6 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Save & Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
