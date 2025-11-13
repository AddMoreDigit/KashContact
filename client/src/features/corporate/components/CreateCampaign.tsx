import { X, Upload, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function CreateCampaign() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ['Campaign Details', 'Assign Packages', 'Add members', 'Review'];

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl">Create new campaign</h1>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-8">
          Set up your corporate campaign,assign package, invite members
        </p>

        {/* Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    idx === currentStep
                      ? 'bg-purple-600 text-white'
                      : idx < currentStep
                      ? 'bg-purple-200 text-purple-600'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="text-xs mt-2">{step}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-0.5 flex-1 ${idx < currentStep ? 'bg-purple-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="campaign-name" className="mb-2 block">Campaign name</Label>
              <Input id="campaign-name" placeholder="Enter campaign name" />
            </div>

            <div>
              <Label htmlFor="campaign-description" className="mb-2 block">Campaign Description</Label>
              <Textarea 
                id="campaign-description"
                placeholder="Enter campaign description"
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="campaign-terms" className="mb-2 block">Campaign T&Cs</Label>
              <Textarea 
                id="campaign-terms"
                placeholder="Enter terms and conditions"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="goal-amount" className="mb-2 block">Goal Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R</span>
                  <Input id="goal-amount" className="pl-7" placeholder="0" />
                </div>
              </div>

              <div>
                <Label htmlFor="end-date" className="mb-2 block">End Date</Label>
                <div className="relative">
                  <Input id="end-date" type="date" />
                  <CalendarIcon className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Upload Banner Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-purple-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Drop image here or upload</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
          <Button variant="outline" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>
            Back
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
