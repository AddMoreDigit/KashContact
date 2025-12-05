import { useState } from 'react';
import { X, Edit2, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ReviewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onLaunch: () => void;
}

interface Vendor {
  id: number;
  name: string;
  type: string;
  icon: 'accommodation' | 'food';
  amount: string;
}

export function ReviewCampaignModal({ isOpen, onClose, onBack, onSaveDraft, onLaunch }: ReviewCampaignModalProps) {
  const [activeStep] = useState(3);

  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: 1,
      name: 'Seaview Lodge',
      type: 'Accommodation',
      icon: 'accommodation',
      amount: 'R8 000.00'
    },
    {
      id: 2,
      name: 'Tastebites Catering',
      type: 'Food Dining',
      icon: 'food',
      amount: 'R4 000.00'
    }
  ]);

  const steps = ['Campaign Details', 'Assign Packages', 'Add members', 'Review'];

  const members = [
    { id: 1, name: 'Member 1' },
    { id: 2, name: 'Member 2' },
    { id: 3, name: 'Member 3' },
    { id: 4, name: 'Member 4' }
  ];

  const removeVendor = (id: number) => {
    setVendors(vendors.filter(v => v.id !== id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] p-0 gap-0">
        <DialogTitle className="sr-only">Review & Confirm</DialogTitle>
        <DialogDescription className="sr-only">
          Check all your details before launching your Campaign
        </DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-[18px] font-semibold text-black">Review & Confirm</h2>
            <p className="text-[12px] text-gray-600 mt-0.5">
              Check all your details before launching your Campaign
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Step Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          {steps.map((step, index) => (
            <button
              key={step}
              className={`px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${
                index === activeStep
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600'
              }`}
            >
              {step}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Panel - Campaign Overview */}
            <div>
              <h3 className="text-[18px] font-semibold text-black mb-6">Campaign Overview</h3>
              
              {/* Campaign Details */}
              <div className="mb-6">
                <h4 className="text-[16px] font-semibold text-black mb-2">Corporate Campaign</h4>
                <p className="text-[13px] text-gray-600 mb-4">
                  Helping our stuff members with their cape town getaway weekend
                </p>

                <div className="mb-3">
                  <div className="text-[14px] font-semibold text-black mb-1">Goal target</div>
                  <div className="text-[16px] font-bold text-black">R20 000.00</div>
                </div>

                <div className="text-[13px] text-gray-900 mb-4">Aug 11, -Dec 8,2025</div>

                <div>
                  <div className="text-[14px] font-semibold text-black mb-2">Campaign Members</div>
                  <div className="flex items-center gap-2">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Image & Selected Vendors */}
            <div>
              {/* Campaign Image */}
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1614506660579-c6c478e2f349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBwb29sJTIwdmFjYXRpb258ZW58MXx8fHwxNzYzMDkxODEwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Resort pool"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              {/* Selected Vendors */}
              <h4 className="text-[14px] font-semibold text-black mb-3">Selected Vendors</h4>
              <div className="space-y-3">
                {vendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        {vendor.icon === 'accommodation' ? (
                          <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-[14px] font-medium text-black">{vendor.name}</div>
                        <div className="flex items-center gap-1.5 text-[12px] text-gray-600">
                          {vendor.icon === 'accommodation' ? (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          ) : (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          )}
                          <span>{vendor.type}</span>
                        </div>
                      </div>
                      <div className="text-[14px] font-semibold text-black">{vendor.amount}</div>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => removeVendor(vendor.id)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <button
            onClick={onBack}
            className="px-6 py-2 text-[14px] text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onSaveDraft}
              className="px-6 py-2 text-[14px] text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Save as draft
            </button>
            <button
              onClick={onLaunch}
              className="px-6 py-2 text-[14px] bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Launch Campaign
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

