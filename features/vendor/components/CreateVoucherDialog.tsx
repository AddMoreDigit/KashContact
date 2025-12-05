import { X, Upload, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { VendorSidebar } from './VendorSidebar';

interface CreateVoucherDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  onCreateVoucher?: (voucherData: VoucherFormData) => void;
  onNavigate?: (page: any) => void;
}

export interface VoucherFormData {
  voucherName: string;
  termsAndConditions: string;
  uploadedFile: File | null;
  discountValue: string;
  expireDate: string;
  maximumUsage: string;
  noRestrictions: boolean;
}

export function CreateVoucherDialog({ open, onOpenChange, onClose, onCreateVoucher, onNavigate }: CreateVoucherDialogProps) {
  const [voucherName, setVoucherName] = useState('');
  const [inputMethod, setInputMethod] = useState<'input' | 'upload'>('input');
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [maximumUsage, setMaximumUsage] = useState('');
  const [noRestrictions, setNoRestrictions] = useState(true);

  // Support both open/onOpenChange and onClose patterns
  const isOpen = open !== undefined ? open : true;

  if (!isOpen) return null;

  const handleClose = () => {
    if (onOpenChange) onOpenChange(false);
    if (onClose) onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      toast.success('File uploaded successfully');
    }
  };

  const handleCreateVoucher = () => {
    if (!voucherName.trim()) {
      toast.error('Please enter a voucher name');
      return;
    }

    if (!discountValue.trim()) {
      toast.error('Please enter a discount value');
      return;
    }

    const voucherData: VoucherFormData = {
      voucherName,
      termsAndConditions,
      uploadedFile: null,
      discountValue,
      expireDate,
      maximumUsage,
      noRestrictions,
    };

    if (onCreateVoucher) {
      onCreateVoucher(voucherData);
    }

    toast.success('Voucher created successfully!');
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[520px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-black">Create voucher</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Basic Info Section */}
          <div className="mb-6">
            <h3 className="text-black mb-1">Basic info</h3>
            <p className="text-gray-500 text-sm mb-4">Please fill the missing info to continue</p>

            {/* Voucher Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Voucher Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={voucherName}
                onChange={(e) => setVoucherName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
                placeholder="Enter voucher name"
              />
            </div>

            {/* T&Cs Input/Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Do you want type T&Cs / Upload
              </label>
              
              {/* Toggle Buttons */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setInputMethod('input')}
                  className={`px-4 py-2 text-sm rounded transition-colors ${
                    inputMethod === 'input'
                      ? 'bg-white text-purple-600 border border-purple-600'
                      : 'bg-gray-100 text-gray-600 border border-gray-300'
                  }`}
                >
                  Input
                </button>
                <button
                  onClick={() => setInputMethod('upload')}
                  className={`px-4 py-2 text-sm rounded transition-colors ${
                    inputMethod === 'upload'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 border border-gray-300'
                  }`}
                >
                  Upload
                </button>
              </div>

              {/* Input Method: Text Area */}
              {inputMethod === 'input' && (
                <textarea
                  value={termsAndConditions}
                  onChange={(e) => setTermsAndConditions(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors resize-none"
                  rows={4}
                  placeholder="Type terms and conditions here..."
                />
              )}

              {/* Upload Method: File Browse */}
              {inputMethod === 'upload' && (
                <div>
                  <label className="block">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center gap-2">
                      <Upload size={18} className="text-gray-600" />
                      <span className="text-gray-600">Browse</span>
                    </div>
                  </label>
                  {uploadedFileName && (
                    <p className="text-sm text-gray-600 mt-2">
                      Uploaded: {uploadedFileName}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Discount Details Section */}
          <div className="mb-6">
            <h3 className="text-black mb-3">Discount Details</h3>

            {/* Discount Value */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Discount Value<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
                placeholder="Enter discount value (e.g., 10% or $50)"
              />
            </div>

            {/* Expire Date */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Expire Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Voucher Usage Section */}
          <div className="mb-6">
            <h3 className="text-black mb-3">Voucher Usage</h3>

            {/* Maximum Usage */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Maximum Usage
              </label>
              <div className="relative">
                <select
                  value={maximumUsage}
                  onChange={(e) => setMaximumUsage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 transition-colors appearance-none bg-white"
                >
                  <option value="">Select maximum usage</option>
                  <option value="1">1 time</option>
                  <option value="5">5 times</option>
                  <option value="10">10 times</option>
                  <option value="unlimited">Unlimited</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* No Restrictions Radio */}
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="noRestrictions"
                checked={noRestrictions}
                onChange={(e) => setNoRestrictions(e.target.checked)}
                className="w-4 h-4 accent-purple-600"
              />
              <label htmlFor="noRestrictions" className="text-sm text-gray-700 cursor-pointer">
                No Restrictions
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={handleClose}
              className="px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateVoucher}
              className="px-6 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Create Voucher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

