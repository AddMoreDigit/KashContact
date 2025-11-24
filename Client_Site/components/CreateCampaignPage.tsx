import { useState, useEffect } from 'react';
import { ChevronLeft, Plus, X, Upload, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CampaignSubmittedDialog } from './CampaignSubmittedDialog';
import { Checkbox } from './ui/checkbox';
import { NavBar } from './NavBar';
import { Textarea } from './ui/textarea';
import deluxeRoomImg from 'figma:asset/5e701f29de64216da6107e4941ba5c845fa84015.png';
import { toast } from 'sonner@2.0.3';
import { createCampaignWithStatus, notifyVendorOfNewCampaign } from '../utils/notificationStorage';
import { saveCampaign, extractLocationFromServices, generateItinerary, type CampaignService, type CampaignMember } from '../utils/campaignStorage';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'termsConditions';

interface CartItem {
  id: number;
  type: 'room' | 'food' | 'transport' | 'activity';
  name: string;
  price: string;
  checkIn?: string;
  checkOut?: string;
  location?: string;
  provider?: string;
  image?: string;
  quantity?: number;
  nights?: number;
  totalPrice?: number;
}

interface DraftData {
  id: number;
  name: string;
  category: string;
  goal: string;
  startDate: string;
  endDate: string;
  step: number;
  progress: number;
  services: CartItem[];
  members?: string[];
  contributionFrequency?: string;
  acceptedTerms?: boolean;
  createdAt: string;
}

interface CreateCampaignPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  cartItems?: CartItem[];
  onClearCart?: () => void;
  draftData?: DraftData | null;
  onCreateCampaign?: (campaignData: {
    name: string;
    category: string;
    startDate: string;
    endDate: string;
    members: string[];
    contributionFrequency: string;
    cartItems: CartItem[];
  }) => void;
}

export function CreateCampaignPage({ onNavigate, onShowNotifications, hasUnreadNotifications, cartItems = [], onClearCart, draftData, onCreateCampaign }: CreateCampaignPageProps) {
  const [currentStep, setCurrentStep] = useState(draftData?.step || 1);
  const [showSubmittedDialog, setShowSubmittedDialog] = useState(false);
  const [campaignName, setCampaignName] = useState(draftData?.name || '');
  const [campaignCategory, setCampaignCategory] = useState(draftData?.category || '');
  const [startDate, setStartDate] = useState(draftData?.startDate || '');
  const [endDate, setEndDate] = useState(draftData?.endDate || '');
  const [memberEmails, setMemberEmails] = useState<string[]>(draftData?.members || []);
  const [emailInput, setEmailInput] = useState('');
  const [contributionFrequency, setContributionFrequency] = useState(draftData?.contributionFrequency || 'monthly');
  const [acceptedTerms, setAcceptedTerms] = useState(draftData?.acceptedTerms || false);
  
  // T&Cs states
  const [termsMode, setTermsMode] = useState<'default' | 'custom' | 'upload'>('default');
  const [customTerms, setCustomTerms] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Calculate goal amount from cart items
  const calculateGoalAmount = () => {
    return cartItems.reduce((total, item) => {
      // Use totalPrice if available (for rooms with quantity and nights), otherwise parse price string
      if (item.totalPrice) {
        return total + item.totalPrice;
      }
      const price = parseFloat(item.price.replace('R', '').replace(/\s/g, ''));
      return total + price;
    }, 0);
  };

  const goalAmount = calculateGoalAmount();

  const selectedServices = cartItems.length > 0 ? cartItems.map(item => ({
    id: item.id,
    name: item.provider || item.name,
    type: `${item.type.charAt(0).toUpperCase() + item.type.slice(1)}: ${item.name}`,
    image: item.image || deluxeRoomImg,
  })) : [
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

  const handleSaveAsDraft = () => {
    // Save draft to localStorage
    const drafts = JSON.parse(localStorage.getItem('campaignDrafts') || '[]');
    
    const draftToSave = {
      id: draftData?.id || Date.now(), // Use existing ID if editing, otherwise create new
      name: campaignName || 'Untitled Campaign',
      category: campaignCategory || 'Vacation',
      goal: goalAmount > 0 ? `R${goalAmount.toFixed(2)}` : 'R0.00',
      startDate,
      endDate,
      step: currentStep,
      progress: currentStep * 33.33,
      services: cartItems,
      members: memberEmails,
      contributionFrequency,
      acceptedTerms,
      createdAt: draftData?.createdAt || new Date().toISOString(),
    };
    
    // If editing existing draft, replace it; otherwise add new
    if (draftData?.id) {
      const draftIndex = drafts.findIndex(d => d.id === draftData.id);
      if (draftIndex !== -1) {
        drafts[draftIndex] = draftToSave;
      } else {
        drafts.push(draftToSave);
      }
    } else {
      drafts.push(draftToSave);
    }
    
    localStorage.setItem('campaignDrafts', JSON.stringify(drafts));
    
    // Clear cart
    if (onClearCart) {
      onClearCart();
    }
    
    toast.success('Campaign saved as draft!');
    onNavigate('draft');
  };

  const handleLaunchCampaign = () => {
    // Generate unique campaign ID
    const campaignId = `campaign-${Date.now()}`;
    const currentUser = localStorage.getItem('userName') || 'Michael';
    const userEmail = localStorage.getItem('userEmail') || 'michael@example.com';
    const userPhone = localStorage.getItem('userPhone') || '+27 123 456 789';
    
    // Convert cart items to campaign services
    const services: CampaignService[] = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      provider: item.provider || item.name,
      type: item.type,
      cost: item.totalPrice || parseFloat(item.price.replace(/[^0-9.-]+/g, '')),
      details: item.type === 'room' 
        ? `${item.quantity || 1} ${item.quantity === 1 ? 'room' : 'rooms'}${item.nights ? ` - ${item.nights} ${item.nights === 1 ? 'night' : 'nights'}` : ''}`
        : item.name,
      image: item.image,
      quantity: item.quantity,
      nights: item.nights,
      checkIn: item.checkIn,
      checkOut: item.checkOut,
      location: item.location
    }));
    
    // Convert member emails to member objects
    const campaignMembers: CampaignMember[] = memberEmails.map(email => ({
      name: email.split('@')[0], // Use email prefix as name
      email: email,
      avatar: undefined
    }));
    
    // Generate itinerary
    const itinerary = generateItinerary(startDate, endDate);
    
    // Extract location from services
    const location = extractLocationFromServices(services);
    
    // Get first service image for campaign image
    const campaignImage = cartItems.length > 0 && cartItems[0].image 
      ? cartItems[0].image 
      : 'https://images.unsplash.com/photo-1580837119756-563d608dd119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMHRhYmxlJTIwbW91bnRhaW58ZW58MXx8fHwxNzYzMDU3MTAyfDA&ixlib=rb-4.1.0&q=80&w=1080';
    
    // Create campaign with pending status
    createCampaignWithStatus(campaignId, currentUser);
    
    // Save full campaign data
    saveCampaign({
      id: campaignId,
      name: campaignName || 'Untitled Campaign',
      category: campaignCategory || 'vacation',
      organizer: currentUser,
      organizerEmail: userEmail,
      organizerPhone: userPhone,
      description: `Join us for an amazing ${campaignCategory || 'vacation'} experience! This campaign includes ${services.length} service${services.length > 1 ? 's' : ''} from top-rated providers.`,
      startDate: startDate,
      endDate: endDate,
      location: location,
      totalAmount: goalAmount,
      currentAmount: 0,
      progress: 0,
      numberOfMembers: memberEmails.length + 1, // +1 for organizer
      members: campaignMembers,
      servicesBooked: services,
      contributionFrequency: contributionFrequency,
      status: 'pending',
      image: campaignImage,
      itinerary: itinerary,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Get service providers from cart items
    const servicesBooked = cartItems.map(item => item.type.charAt(0).toUpperCase() + item.type.slice(1)).join(', ');
    
    // Notify vendor of new campaign
    notifyVendorOfNewCampaign(
      campaignId,
      campaignName || 'Untitled Campaign',
      currentUser,
      {
        totalAmount: goalAmount,
        dates: startDate && endDate ? `${startDate} to ${endDate}` : undefined,
        servicesBooked: servicesBooked || 'Not specified'
      }
    );
    
    // Clear cart after launching campaign
    if (onClearCart) {
      onClearCart();
    }
    
    toast.success('Campaign created and pending vendor approval!');
    setShowSubmittedDialog(true);

    // Call onCreateCampaign if provided
    if (onCreateCampaign) {
      onCreateCampaign({
        name: campaignName,
        category: campaignCategory,
        startDate: startDate,
        endDate: endDate,
        members: memberEmails,
        contributionFrequency: contributionFrequency,
        cartItems: cartItems,
      });
    }
  };

  const handleAddMember = () => {
    if (emailInput.trim() && !memberEmails.includes(emailInput.trim())) {
      setMemberEmails([...memberEmails, emailInput.trim()]);
      setEmailInput('');
    }
  };

  const handleRemoveMember = (email: string) => {
    setMemberEmails(memberEmails.filter(member => member !== email));
  };

  // Calculate contribution per member based on frequency
  const calculateContributionPerMember = () => {
    if (memberEmails.length === 0) return 0;
    const totalPeople = memberEmails.length + 1; // +1 for campaign creator
    
    const contributionAmounts = {
      weekly: goalAmount / totalPeople / 12, // Assuming 3 months = 12 weeks
      monthly: goalAmount / totalPeople / 3, // Assuming 3 months
      quarterly: goalAmount / totalPeople,
    };
    
    return contributionAmounts[contributionFrequency] || 0;
  };

  const contributionPerMember = calculateContributionPerMember();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        onNavigate={onNavigate} 
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        showCreateButton={false}
      />
      
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
                  <Input
                    id="campaign-name"
                    placeholder="e.g., Team Building Event"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="goal-amount">Goal amount</Label>
                    <Input
                      id="goal-amount"
                      placeholder="R"
                      value={goalAmount > 0 ? `R${goalAmount.toFixed(2)}` : ''}
                      readOnly
                      className={goalAmount > 0 ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="campaign-category">Campaign category</Label>
                    <Select
                      value={campaignCategory}
                      onValueChange={(value) => setCampaignCategory(value)}
                    >
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
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
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
                  <Input
                    id="campaign-name"
                    placeholder="e.g., Team Building Event"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="goal-amount">Goal amount</Label>
                    <Input
                      id="goal-amount"
                      placeholder="R"
                      value={goalAmount > 0 ? `R${goalAmount.toFixed(2)}` : ''}
                      readOnly
                      className={goalAmount > 0 ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="campaign-category">Campaign category</Label>
                    <Select
                      value={campaignCategory}
                      onValueChange={(value) => setCampaignCategory(value)}
                    >
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
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Goal */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-gray-900 mb-4">Financial Goal</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="financial-goal">Goal Amount</Label>
                  <Input
                    id="financial-goal"
                    placeholder="R"
                    value={goalAmount > 0 ? `R${goalAmount.toFixed(2)}` : ''}
                    readOnly
                    className={goalAmount > 0 ? 'bg-gray-50' : ''}
                  />
                </div>
                <div>
                  <Label htmlFor="contribution-frequency">Payment Frequency</Label>
                  <Select
                    value={contributionFrequency}
                    onValueChange={(value) => setContributionFrequency(value)}
                  >
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

            {/* Selected Service Provider */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-gray-900 mb-4">Selected Service Provider</h2>
              <div className="space-y-3">
                {selectedServices.map((service, index) => (
                  <div
                    key={`service-${index}-${service.id}`}
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

            {/* Campaign T&Cs */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-gray-900 mb-4">Campaign T&Cs</h2>
              
              {/* Mode Selection Buttons */}
              <div className="flex items-center gap-3 mb-4">
                <Button
                  variant={termsMode === 'default' ? 'default' : 'outline'}
                  className={termsMode === 'default' ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-300'}
                  onClick={() => setTermsMode('default')}
                >
                  Default T&Cs
                </Button>
                <Button
                  variant={termsMode === 'custom' ? 'default' : 'outline'}
                  className={termsMode === 'custom' ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-300'}
                  onClick={() => setTermsMode('custom')}
                >
                  <FileText size={16} className="mr-2" />
                  Type Custom T&Cs
                </Button>
                <Button
                  variant={termsMode === 'upload' ? 'default' : 'outline'}
                  className={termsMode === 'upload' ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-300'}
                  onClick={() => setTermsMode('upload')}
                >
                  <Upload size={16} className="mr-2" />
                  Upload T&Cs
                </Button>
              </div>

              {/* Default T&Cs View */}
              {termsMode === 'default' && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-48 overflow-y-auto">
                  <p className="text-gray-600 text-sm mb-2">
                    By creating this campaign, you agree to the following terms and conditions:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>All contributions are non-refundable unless campaign is cancelled</li>
                    <li>Campaign creator is responsible for fund management</li>
                    <li>Members can view campaign progress and contribution history</li>
                    <li>Campaign must be completed within the specified timeframe</li>
                    <li>Service providers must deliver agreed-upon services</li>
                  </ul>
                </div>
              )}

              {/* Custom T&Cs Input */}
              {termsMode === 'custom' && (
                <div className="mb-4">
                  <Label htmlFor="custom-terms">Custom Terms & Conditions</Label>
                  <Textarea
                    id="custom-terms"
                    placeholder="Type your custom campaign terms and conditions here..."
                    value={customTerms}
                    onChange={(e) => setCustomTerms(e.target.value)}
                    className="min-h-[200px] mt-2"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-gray-500 text-sm">
                      {customTerms.length} characters
                    </p>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => {
                        if (customTerms.trim()) {
                          toast.success('Custom T&Cs saved successfully');
                        } else {
                          toast.error('Please enter terms and conditions before saving');
                        }
                      }}
                      disabled={!customTerms.trim()}
                    >
                      Save T&Cs
                    </Button>
                  </div>
                </div>
              )}

              {/* Upload T&Cs */}
              {termsMode === 'upload' && (
                <div className="mb-4">
                  <Label htmlFor="upload-terms">Upload Terms & Conditions Document</Label>
                  <div className="mt-2">
                    <input
                      id="upload-terms"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadedFile(file);
                          toast.success(`File "${file.name}" uploaded successfully`);
                        }
                      }}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      className="w-full border-2 border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 h-32"
                      onClick={() => document.getElementById('upload-terms')?.click()}
                    >
                      <div className="text-center">
                        <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-600">
                          {uploadedFile ? `Uploaded: ${uploadedFile.name}` : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          PDF, DOC, DOCX, or TXT (max 5MB)
                        </p>
                      </div>
                    </Button>
                    {uploadedFile && (
                      <>
                        <div className="mt-3 flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText size={20} className="text-purple-600" />
                            <div>
                              <p className="text-gray-900 text-sm">{uploadedFile.name}</p>
                              <p className="text-gray-500 text-xs">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              setUploadedFile(null);
                              toast.info('File removed');
                            }}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                        <div className="flex justify-end mt-3">
                          <Button
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={() => {
                              toast.success(`T&Cs document "${uploadedFile.name}" saved successfully`);
                            }}
                          >
                            Save T&Cs
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Members */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-gray-900 mb-4">Members</h2>
              <div className="flex items-center gap-4 mb-4">
                <Input
                  placeholder="Search by Username or email"
                  className="flex-1"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddMember();
                    }
                  }}
                />
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handleAddMember}
                >
                  <Plus size={16} className="mr-2" />
                  Invite
                </Button>
              </div>
              
              {memberEmails.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    {memberEmails.map((email) => (
                      <Avatar key={email}>
                        <AvatarFallback className="bg-purple-500 text-white">
                          {email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="space-y-2 mb-4">
                    {memberEmails.map((email) => (
                      <div key={email} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-purple-500 text-white">
                              {email.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-gray-900">{email}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveMember(email)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Contribution Calculation */}
                  {goalAmount > 0 && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-900">Total Members:</span>
                        <span className="text-purple-900">{memberEmails.length + 1}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-900">Goal Amount:</span>
                        <span className="text-purple-900">R{goalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-purple-200">
                        <span className="text-purple-900">Contribution per Member ({contributionFrequency}):</span>
                        <span className="text-purple-900">R{contributionPerMember.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {memberEmails.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">
                  No members invited yet. Add members by email to calculate contributions.
                </p>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            {/* Summary of Services */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-gray-900 mb-4">Summary of Services</h2>
              {cartItems.length > 0 ? (
                <>
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
                      {cartItems.map((item, index) => {
                        const itemPrice = item.totalPrice || parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
                        const quantityDisplay = item.type === 'room' 
                          ? `${item.quantity || 1} ${item.quantity === 1 ? 'room' : 'rooms'}${item.nights ? ` × ${item.nights} ${item.nights === 1 ? 'night' : 'nights'}` : ''}`
                          : '1';
                        
                        return (
                          <tr key={`cart-item-${index}-${item.id}`} className={index < cartItems.length - 1 ? "border-b border-gray-100" : ""}>
                            <td className="py-4 flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden">
                                <ImageWithFallback
                                  src={item.image || deluxeRoomImg}
                                  alt={item.provider || item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-gray-900">{item.provider || item.name}</span>
                            </td>
                            <td className="py-4 text-gray-700">
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}: {item.name}
                            </td>
                            <td className="py-4 text-gray-700">{quantityDisplay}</td>
                            <td className="py-4 text-right text-gray-900">R{itemPrice.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                    <span className="text-gray-900">Total R{goalAmount.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-center py-8">No services selected yet.</p>
              )}
            </div>

            {/* Campaign Details */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-gray-900 mb-4">Campaigns Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Campaign Name</span>
                  <span className="text-gray-900">{campaignName || 'Not set'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Goal Amount</span>
                  <span className="text-gray-900">R{goalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Start Date</span>
                  <span className="text-gray-900">{startDate ? new Date(startDate).toLocaleDateString('en-ZA', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Not set'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">End Date</span>
                  <span className="text-gray-900">{endDate ? new Date(endDate).toLocaleDateString('en-ZA', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Not set'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Contribution Frequency</span>
                  <span className="text-gray-900">{contributionFrequency.charAt(0).toUpperCase() + contributionFrequency.slice(1)}</span>
                </div>
                {memberEmails.length > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Total Members</span>
                    <span className="text-gray-900">{memberEmails.length + 1}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => currentStep === 1 ? onNavigate('campaigns') : handleBack()}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-gray-300"
              onClick={handleSaveAsDraft}
            >
              Save as Draft
            </Button>
            {currentStep === 3 ? (
              <Button
                onClick={handleLaunchCampaign}
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