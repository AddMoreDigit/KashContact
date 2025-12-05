import { useState } from 'react';
import { X, Upload, Calendar as CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';

interface CreateCampaignWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}

type Step = 'Campaign Details' | 'Assign Packages' | 'Add members' | 'Review';

export function CreateCampaignWizard({ isOpen, onClose, onCreate }: CreateCampaignWizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>('Campaign Details');
  const [campaignName, setCampaignName] = useState('');
  const [description, setDescription] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bannerImage, setBannerImage] = useState<File | null>(null);

  const steps: Step[] = ['Campaign Details', 'Assign Packages', 'Add members', 'Review'];
  const currentStepIndex = steps.indexOf(currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    } else {
      onCreate();
      onClose();
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    } else {
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px] p-0 gap-0">
        <DialogTitle className="sr-only">Create new campaign</DialogTitle>
        <DialogDescription className="sr-only">
          Set up your corporate campaign, assign packages, and invite members
        </DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-[18px] font-medium text-black">Create new campaign</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Subtitle */}
        <div className="px-6 pt-4">
          <p className="text-[14px] text-gray-600">
            Set up your corporate campaign,assign package ,invite members
          </p>
        </div>

        {/* Step Indicator */}
        <div className="px-6 pt-4 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-full h-1 ${
                      index <= currentStepIndex ? 'bg-purple-600' : 'bg-gray-200'
                    } ${index === 0 ? 'rounded-l' : ''} ${index === steps.length - 1 ? 'rounded-r' : ''}`}
                  />
                  <div className="text-[12px] text-gray-600 mt-2">{step}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-4 h-1 ${index < currentStepIndex ? 'bg-purple-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-h-[500px] overflow-y-auto">
          {currentStep === 'Campaign Details' && (
            <div className="space-y-4">
              {/* Campaign Name */}
              <div>
                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                  Campaign name
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Campaign Description */}
              <div>
                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                  Campaign Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Campaign T&Cs */}
              <div>
                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                  Campaign T&Cs
                </label>
                <textarea
                  value={termsAndConditions}
                  onChange={(e) => setTermsAndConditions(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Goal Amount and End Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-gray-900 mb-2">
                    Goal Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-gray-600">
                      R
                    </span>
                    <input
                      type="text"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-gray-900 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 text-[14px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Upload Banner Image */}
              <div>
                <label className="block text-[14px] font-medium text-gray-900 mb-2">
                  Upload Banner image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-[14px] text-gray-600 mb-1">Drop image here or upload</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="banner-upload"
                    />
                    <label
                      htmlFor="banner-upload"
                      className="text-[14px] text-purple-600 hover:underline cursor-pointer"
                    >
                      Browse files
                    </label>
                    {bannerImage && (
                      <p className="text-[12px] text-gray-600 mt-2">{bannerImage.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'Assign Packages' && (
            <div className="text-center py-12">
              <p className="text-[14px] text-gray-600">Assign Packages content will go here</p>
            </div>
          )}

          {currentStep === 'Add members' && (
            <div className="text-center py-12">
              <p className="text-[14px] text-gray-600">Add members content will go here</p>
            </div>
          )}

          {currentStep === 'Review' && (
            <div className="text-center py-12">
              <p className="text-[14px] text-gray-600">Review content will go here</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={handleBack}
            className="px-6 py-2 text-[14px] text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 text-[14px] bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {currentStepIndex === steps.length - 1 ? 'Create Campaign' : 'Next'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
