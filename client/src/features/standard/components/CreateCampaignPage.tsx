import { useState } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { CampaignSubmittedDialog } from './CampaignSubmittedDialog';
const deluxeRoomImg = "https://via.placeholder.com/400x300?text=Image";

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign';

interface CreateCampaignPageProps {
  onNavigate: (page: Page) => void;
}

export function CreateCampaignPage({ onNavigate }: CreateCampaignPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSubmittedDialog, setShowSubmittedDialog] = useState(false);

  const selectedServices = [
    {
      id: 1,
      name: 'Seaview Lodge Cape Town',
      type: 'Accommodation: Standard Room',
      image: deluxeRoomImg,
    },
    {
      id: 2,
      name: 'Water Boat Tour Cape town',
      type: 'Boat: Boat Tour',
      image: 'https://images.unsplash.com/photo-1687755012083-9eba77d3cd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2F0JTIwdG91ciUyMG9jZWFufGVufDF8fHx8MTc2MjYxODkwOXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      name: 'Safari Car Tour Cape Town',
      type: 'Game Reserve | Mission cape',
      image: 'https://images.unsplash.com/photo-1759129669580-e1e9ae3c078b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB0b3VyJTIwdmVoaWNsZXxlbnwxfHx8fDE3NjI2MTg5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const members = [
    { id: 1, name: 'Alice', initials: 'A', color: 'bg-blue-500' },
    { id: 2, name: 'John', initials: 'J', color: 'bg-green-500' },
    { id: 3, name: 'Mitchell', initials: 'M', color: 'bg-purple-500' },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('selectedServices')}
            className="hover:bg-gray-100 rounded p-2"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <div>
            <h1 className="text-gray-900">Create a new campaign</h1>
            <p className="text-gray-600 text-sm">
              Fill in the form to create your next rewards
            </p>
          </div>
        </div>
        <button className="hover:bg-gray-100 rounded p-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="5" r="1.5" fill="currentColor" />
            <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            <circle cx="10" cy="15" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step === currentStep
                        ? 'bg-purple-600 text-white'
                        : step < currentStep
                        ? 'bg-purple-200 text-purple-700'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                  <span
                    className={`${
                      step === currentStep
                        ? 'text-gray-900'
                        : 'text-gray-500'
                    }`}
                  >
                    {step === 1 && 'Campaign Details'}
                    {step === 2 && 'Plan Contributions'}
                    {step === 3 && 'Review & Confirm'}
                  </span>
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      step < currentStep ? 'bg-purple-200' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Campaign Details */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-gray-900 mb-4">Campaign Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input id="campaign-name" placeholder="e.g., Team Building Event" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="goal-amount">Goal amount</Label>
                    <Input id="goal-amount" placeholder="R" />
                  </div>
                  <div>
                    <Label htmlFor="campaign-category">Campaign category</Label>
                    <Select>
                      <SelectTrigger id="campaign-category">
                        <SelectValue placeholder="Vacation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vacation">Vacation</SelectItem>
                        <SelectItem value="team-building">Team Building</SelectItem>
                        <SelectItem value="celebration">Celebration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Campaign Details */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-gray-900 mb-4">Campaign Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input id="campaign-name" placeholder="e.g., Team Building Event" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="goal-amount">Goal amount</Label>
                    <Input id="goal-amount" placeholder="R" />
                  </div>
                  <div>
                    <Label htmlFor="campaign-category">Campaign category</Label>
                    <Select>
                      <SelectTrigger id="campaign-category">
                        <SelectValue placeholder="Vacation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vacation">Vacation</SelectItem>
                        <SelectItem value="team-building">Team Building</SelectItem>
                        <SelectItem value="celebration">Celebration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Service Provider */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-gray-900 mb-4">Selected Service Provider</h2>
              <div className="space-y-3">
                {selectedServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-gray-900 text-sm">{service.name}</p>
                        <p className="text-gray-500 text-xs">{service.type}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Goal */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-gray-900 mb-4">Financial Goal</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="target-amount">Target Amount</Label>
                  <Input id="target-amount" placeholder="R" />
                </div>
                <div>
                  <Label htmlFor="contribution-frequency">Contribution Frequency</Label>
                  <Select>
                    <SelectTrigger id="contribution-frequency">
                      <SelectValue placeholder="Monthly" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Campaign T&Cs */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-gray-900 mb-4">Campaign T&Cs</h2>
              <p className="text-gray-600 text-sm">
                Terms and conditions content will appear here...
              </p>
            </div>

            {/* Members */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-gray-900 mb-4">Members</h2>
              <div className="flex items-center gap-4 mb-4">
                <Input placeholder="Search by Username or email" className="flex-1" />
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus size={16} className="mr-2" />
                  Invite
                </Button>
              </div>
              <div className="flex items-center gap-2">
                {members.map((member) => (
                  <Avatar key={member.id}>
                    <AvatarFallback className={member.color}>
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            {/* Summary of Services */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-gray-900 mb-4">Summary of Services</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-gray-600 text-sm">Vendors</th>
                    <th className="text-left py-3 text-gray-600 text-sm">Category</th>
                    <th className="text-left py-3 text-gray-600 text-sm">Quantity/Unit</th>
                    <th className="text-right py-3 text-gray-600 text-sm">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={deluxeRoomImg}
                          alt="Service Lodge"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-gray-900">Service Lodge</span>
                    </td>
                    <td className="py-4 text-gray-700">Accommodation</td>
                    <td className="py-4 text-gray-700">2</td>
                    <td className="py-4 text-right text-gray-900">R5000.00</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1687755012083-9eba77d3cd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2F0JTIwdG91ciUyMG9jZWFufGVufDF8fHx8MTc2MjYxODkwOXww&ixlib=rb-4.1.0&q=80&w=1080"
                          alt="Water Boat Tour"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-gray-900">Water Boat Tour</span>
                    </td>
                    <td className="py-4 text-gray-700">Activity</td>
                    <td className="py-4 text-gray-700">2</td>
                    <td className="py-4 text-right text-gray-900">R1500.00</td>
                  </tr>
                  <tr>
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1759129669580-e1e9ae3c078b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB0b3VyJTIwdmVoaWNsZXxlbnwxfHx8fDE3NjI2MTg5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                          alt="Safari Car Tour"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-gray-900">Safari Car Tour</span>
                    </td>
                    <td className="py-4 text-gray-700">Activity</td>
                    <td className="py-4 text-gray-700">2</td>
                    <td className="py-4 text-right text-gray-900">R2000.00</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                <span className="text-gray-900">Total R8500.00</span>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-gray-900 mb-4">Campaigns Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Goal Amount</span>
                  <span className="text-gray-900">R8500.00</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Start Date</span>
                  <span className="text-gray-900">01 September 2025</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">End Date</span>
                  <span className="text-gray-900">16 December 2025</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Contribution Frequency</span>
                  <span className="text-gray-900">Monthly</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => currentStep === 1 ? onNavigate('selectedServices') : handleBack()}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-gray-300"
            >
              Save as Draft
            </Button>
            {currentStep === 3 ? (
              <Button
                onClick={() => setShowSubmittedDialog(true)}
                className="bg-purple-600 hover:bg-purple-700 px-8"
              >
                Launch Campaign
              </Button>
            ) : currentStep === 1 ? (
              <Button
                onClick={handleNext}
                className="bg-purple-600 hover:bg-purple-700 px-8"
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-purple-600 hover:bg-purple-700 px-8"
              >
                Create Campaign
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Campaign Submitted Dialog */}
      <CampaignSubmittedDialog
        open={showSubmittedDialog}
        onOpenChange={setShowSubmittedDialog}
        onNavigate={onNavigate}
      />
    </div>
  );
}
