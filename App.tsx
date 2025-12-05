import React, { useState, useEffect } from 'react';
import { MyCampaignSchedulePage } from './features/user';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { avatars } from './utils/unsplashImages';

// Use real Unsplash images for avatars
const imgEllipse34 = avatars.avatar1;
const imgEllipse35 = avatars.avatar2;
const imgEllipse36 = avatars.avatar3;
const imgEllipse81 = avatars.avatar4;
const imgEllipse95 = avatars.avatar5;
const imgEllipse104 = avatars.avatar6;

import { initializeSeedData } from './utils/seedData';
import { getCampaignById, updateCampaign, getAllCampaigns, saveCampaign } from './utils/campaignStorage';
import { appToStoredCampaign } from './utils/campaignConverters';
import { initializeDefaultProfiles, getCurrentUserProfile, setCurrentUser } from './utils/profileStorage';

// Standard User Components
import { ProfilePage, DashboardPage, UserTransactionsPage, MessageChatPage } from './features/user';
import { OverviewPage } from './components/OverviewPage'; // Keep in components for now
import { 
  CampaignsPage,
  IndividualCampaignPage,
  GroupCampaignPage,
  ManagingCampaignsPage,
  CampaignDetailPage,
  ViewCampaignPage,
  CreateCampaignPage,
  ManageCampaignPage,
  CampaignSchedulePage,
  CampaignsHistoryPage,
  ContributePage,
  ViewCampaignDetailPage,
  CartDialog
} from './features/campaigns';
import { BrowseServiceProvidersPage } from './features/campaigns/BrowseServiceProvidersPage';
import { VouchersPage } from './features/vouchers';
import { HelpSupportPage } from './components/HelpSupportPage';
import { SaveDraftPage } from './components/SaveDraftPage';
import { HowItWorksPage } from './features/auth';
import { MessagingPage } from './features/messaging';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { SelectedServicesPage } from './components/SelectedServicesPage';
import { SelectServicesPage } from './components/SelectServicesPage';
import { ContributorsPage, ContributorDetailPage } from './features/contributors';
import { ServiceProvidersPage } from './features/services';

// Auth Components
import { 
  SignUpPage, 
  VendorSignUpPage, 
  OTPVerificationPage, 
  SignUpSuccessPage, 
  LoginPage, 
  ForgotPasswordPage, 
  CreateNewPasswordPage 
} from './features/auth';
import { SelectUserTypePage } from './components/shared/SelectUserTypePage';

// Vendor Components
import { 
  VendorDashboard,
  VendorProfilePage,
  VendorCampaignsPage,
  VendorCampaignDetailPage,
  VendorServicesPage,
  VendorTransactionsPage,
  VendorOverviewPage,
  VendorDraftsPage,
  VendorHelpPage,
  VendorInvoicePage,
  VendorReportPage,
  ApproveBookingRequestPage,
  EditBookingPage,
  VendorVouchersPage
} from './features/vendor';

// Corporate Components
import { 
  CorporateDashboard,
  CorporateCampaignsPage,
  CorporateProfilePage,
  CorporateCampaignDetailPage,
  CorporateCampaignSchedulePage,
  CorporateTransactionsListPage,
  CorporateTransactionsPage,
  CorporateVouchersPage,
  CorporateOverviewPage,
  CorporateDraftsPage,
  CorporateHelpPage,
  CorporateGoalsTrackerPage,
  CorporateTransactionsTablePage,
  CorporateSelectServicesPage,
  CorporateServiceProvidersPage
} from './features/corporate';

// Shared Components
import { Sidebar } from './components/shared/Sidebar';
import { NotificationsDialog } from './components/NotificationsDialog';
import { SelectCampaignDialog } from './components/SelectCampaignDialog';
import { SearchDialog } from './components/SearchDialog';

// Notification interface
interface Notification {
  id: number;
  title: string;
  dateRange: string;
  goal: number;
  members: number;
  read: boolean;
  campaignData?: {
    category: string;
    startDate: string;
    endDate: string;
    image: string;
    provider?: string;
    services?: Array<{
      name: string;
      type: string;
      provider: string;
    }>;
  };
}

// User Journey Types
export type UserType = 'user' | 'vendor' | 'corporate' | null;

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'browseServiceProviders' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders' | 'signup' | 'vendorSignup' | 'otpVerification' | 'signupSuccess' | 'login' | 'forgotPassword' | 'createNewPassword' | 'selectUserType' | 'vendorDashboard' | 'vendorProfile' | 'vendorCampaigns' | 'vendorServices' | 'vendorTransactions' | 'vendorOverview' | 'vendorDrafts' | 'vendorHelp' | 'vendorInvoice' | 'vendorReport' | 'vendorVouchers' | 'approveBookingRequest' | 'editBooking' | 'corporateDashboard' | 'corporateCampaigns' | 'corporateProfile' | 'corporateCampaignDetail' | 'corporateSchedule' | 'corporateTransactions' | 'corporateVouchers' | 'corporateOverview' | 'corporateDrafts' | 'corporateHelp' | 'corporateGoalsTracker' | 'corporateTransactionsTable' | 'corporateSelectServices' | 'corporateServiceProviders';

interface ServiceProvider {
  id: number;
  name: string;
  location: string;
  category: string;
  image: string;
}

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

interface Campaign {
  id: number;
  title: string;
  image: string;
  provider: string;
  date: string;
  services: { name: string; type: string }[];
  members: { email: string; name?: string }[];
  memberPerformance?: Member[];
  goal: number;
  contributed: number;
  status: 'contribute' | 'manage';
  category: string;
  startDate: string;
  endDate: string;
  contributionFrequency: string;
  cartItems: CartItem[];
}

interface Member {
  email: string;
  name?: string;
  avatar?: string;
  contributionPercentage: number;
  contributedAmount: number;
  goalAmount: number;
  daysLeft: number;
  missedPayments: number;
  status: 'on-track' | 'completed' | 'critical';
}

interface UserProfile {
  fullNames: string;
  surname: string;
  email: string;
  phoneNumber: string;
  address: string;
  photo?: string;
  bankDetails?: {
    accountHolder: string;
    accountNumber: string;
    bankName: string;
  };
}

export default function App() {
  // Check if user is authenticated (has logged in before)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [currentPage, setCurrentPage] = useState<Page>('selectUserType');
  const [navigationHistory, setNavigationHistory] = useState<Page[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFirstTime, setShowFirstTime] = useState(true);
  const [showServiceProvidersHero, setShowServiceProvidersHero] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [editingDraft, setEditingDraft] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<ServiceProvider | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showSelectCampaign, setShowSelectCampaign] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedVendorCampaign, setSelectedVendorCampaign] = useState<any>(null);
  
  // Search state
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // User Type State - determines user journey
  const [userType, setUserType] = useState<UserType>(() => {
    const savedUserType = localStorage.getItem('userType');
    return (savedUserType as UserType) || null;
  });
  
  // Selected account type during signup flow
  const [selectedAccountType, setSelectedAccountType] = useState<'user' | 'vendor' | 'corporate'>('user');

  // Initialize profile storage on mount
  useEffect(() => {
    initializeDefaultProfiles();
  }, []);

  // Persist user type to localStorage
  useEffect(() => {
    if (userType) {
      localStorage.setItem('userType', userType);
    }
  }, [userType]);

  // Navigation with history tracking
  const handleNavigate = (page: Page) => {
    // Add current page to history before navigating
    if (currentPage && currentPage !== page) {
      setNavigationHistory(prev => [...prev, currentPage]);
    }
    setCurrentPage(page);
  };

  // Go back to previous page
  const handleGoBack = () => {
    if (navigationHistory.length > 0) {
      const previousPage = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      setCurrentPage(previousPage);
    } else {
      // Fallback to dashboard if no history
      const defaultPage = userType === 'vendor' ? 'vendorDashboard' : 
                         userType === 'corporate' ? 'corporateDashboard' : 
                         'dashboard';
      setCurrentPage(defaultPage);
    }
  };

  // Handle signup - set user type and navigate
  const handleSignUp = (type: 'user' | 'vendor' | 'corporate', userData?: any) => {
    setUserType(type);
    
    // Save user profile data from signup
    if (userData) {
      const newProfile: UserProfile = {
        fullNames: userData.businessName || userData.fullName || '',
        surname: '', // Can be extracted if needed
        email: userData.businessEmail || userData.email || '',
        phoneNumber: userData.phoneNumber || userData.phone || '',
        address: userData.address || '',
        photo: userData.photo || '',
        bankDetails: userData.bankDetails || undefined
      };
      setUserProfile(newProfile);
      localStorage.setItem('userProfile', JSON.stringify(newProfile));
    }
    
    // Navigate to appropriate dashboard based on user type
    setCurrentPage('dashboard');
  };

  // Handle login - set user type and navigate appropriately
  const handleLogin = (email: string, password: string, accountType: 'user' | 'vendor' | 'corporate') => {
    setUserType(accountType);
    localStorage.setItem('userType', accountType);
    
    // Try to load existing profile, or create a basic one from email
    const existingProfile = localStorage.getItem('userProfile');
    if (!existingProfile) {
      const emailName = email.split('@')[0];
      const nameParts = emailName.split('.');
      const newProfile: UserProfile = {
        fullNames: nameParts[0]?.charAt(0).toUpperCase() + nameParts[0]?.slice(1) || 'User',
        surname: nameParts[1]?.charAt(0).toUpperCase() + nameParts[1]?.slice(1) || '',
        email: email,
        phoneNumber: '',
        address: ''
      };
      setUserProfile(newProfile);
      localStorage.setItem('userProfile', JSON.stringify(newProfile));
    }
    
    // Navigation is handled by LoginPage component
  };
  
  // Handle account type selection from initial signup page
  const handleAccountTypeSelect = (type: 'user' | 'vendor' | 'corporate') => {
    setSelectedAccountType(type);
    setCurrentPage('vendorSignup');
  };
  
  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return {
      fullNames: 'Vukona revelation',
      surname: 'hlayisi',
      email: 'Vukonahlayisi@gmail.com',
      phoneNumber: '+27 12 345 6789',
      address: '123 Main Street, Johannesburg, 2000'
    };
  });

  // Persist user profile to localStorage
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);
  
  // Helper function to generate consistent member performance data
  const generateMemberPerformance = (campaign: Campaign): Member[] => {
    const avatars = [imgEllipse34, imgEllipse35, imgEllipse36, imgEllipse81, imgEllipse95, imgEllipse104];
    const statuses: Array<'on-track' | 'completed' | 'critical'> = ['on-track', 'completed', 'critical', 'on-track', 'on-track', 'on-track'];
    const percentages = [74, 100, 65, 74, 74, 74];
    
    const today = new Date();
    const endDate = new Date(campaign.endDate);
    const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    
    return campaign.members.map((member, index) => {
      const goalShare = campaign.goal / campaign.members.length;
      const percentage = percentages[index % percentages.length];
      const contributedAmount = (goalShare * percentage) / 100;
      
      // Generate name from email if not provided
      const name = member.name || member.email.split('@')[0]
        .split('.')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
      
      return {
        email: member.email,
        name: name,
        avatar: avatars[index % avatars.length],
        contributionPercentage: percentage,
        contributedAmount: contributedAmount,
        goalAmount: goalShare,
        daysLeft: daysLeft,
        missedPayments: index % 3,
        status: statuses[index % statuses.length],
      };
    });
  };
  
  // Initialize with default campaigns
  const [createdCampaigns, setCreatedCampaigns] = useState<Campaign[]>(() => {
    // Try to load campaigns from seed data first
    const seedCampaigns = getAllCampaigns();
    
    if (seedCampaigns && seedCampaigns.length > 0) {
      // Convert seed campaigns to App campaign format
      return seedCampaigns.map((sc: any) => {
        const campaign: Campaign = {
          id: parseInt(sc.id.replace('campaign-', '')),
          title: sc.title,
          image: sc.image,
          provider: sc.services?.[0]?.serviceProviderName || 'Service Provider',
          date: `${sc.startDate} → ${sc.endDate}`,
          services: sc.services?.map((s: any) => ({
            name: s.serviceProviderName,
            type: `${s.category}: ${s.name}`
          })) || [],
          members: sc.members || [],
          goal: sc.goal,
          contributed: sc.contributed || 0,
          status: sc.status === 'accepted' || sc.status === 'pending' ? 'manage' : 'contribute',
          category: sc.category || 'Event',
          startDate: sc.startDate,
          endDate: sc.endDate,
          contributionFrequency: sc.contributionFrequency,
          cartItems: sc.services?.map((s: any) => ({
            id: parseInt(s.id.replace('service-', '')),
            type: s.category?.toLowerCase() as 'room' | 'food' | 'transport' | 'activity',
            name: s.name,
            price: s.cost?.toString() || '0',
            provider: s.serviceProviderName,
            image: s.image,
            quantity: s.quantity || 1,
            nights: s.nights,
            location: s.location
          })) || []
        };
        
        // Generate member performance
        const memberPerformance = generateMemberPerformance(campaign);
        const totalContributed = memberPerformance.reduce((sum, member) => sum + member.contributedAmount, 0);
        
        return {
          ...campaign,
          memberPerformance,
          contributed: totalContributed
        };
      });
    }
    
    // Fallback to default campaigns if no seed data
    const campaigns = [
      {
        id: 1,
        title: 'Cape Town Gateway Weekend',
        image: 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=1080',
        provider: 'Seaview Lodge',
        date: 'Sep 1 → Dec 5, 2025',
        services: [{ name: 'Tasteless Catering', type: 'Catering' }],
        members: [
          { email: userProfile.email, name: `${userProfile.fullNames} ${userProfile.surname}` },
          { email: 'sarah.johnson@example.com', name: 'Sarah Johnson' },
          { email: 'david.williams@example.com', name: 'David Williams' },
        ],
        goal: 10000,
        contributed: 0,
        status: 'contribute' as const,
        category: 'Weekend Getaway',
        startDate: '2025-09-01',
        endDate: '2025-12-05',
        contributionFrequency: 'monthly',
        cartItems: [],
      },
      {
        id: 2,
        title: 'Durban Beach Escape',
        image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1080',
        provider: 'Seaview Lodge',
        date: 'Sep 1 → Dec 5, 2025',
        services: [{ name: 'TasteBiles Catering', type: 'Catering' }],
        members: [
          { email: userProfile.email, name: `${userProfile.fullNames} ${userProfile.surname}` },
          { email: 'emma.davis@example.com', name: 'Emma Davis' },
        ],
        goal: 20000,
        contributed: 0,
        status: 'manage' as const,
        category: 'Beach Holiday',
        startDate: '2025-09-01',
        endDate: '2025-12-05',
        contributionFrequency: 'monthly',
        cartItems: [],
      },
    ];

    // Generate member performance for each campaign
    return campaigns.map(campaign => {
      const memberPerformance = generateMemberPerformance(campaign);
      // Calculate total contributed from member performance
      const totalContributed = memberPerformance.reduce((sum, member) => sum + member.contributedAmount, 0);
      
      return {
        ...campaign,
        memberPerformance,
        contributed: totalContributed
      };
    });
  });
  
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  
  // Notifications state with sample data
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    // Load notifications from localStorage if available
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      return JSON.parse(savedNotifications);
    }
    // Default notifications if none saved
    return [
      {
        id: 1,
        title: 'Magalies Park weekend team Building',
        dateRange: 'From: 01 september 2025 - 03 september 2025',
        goal: 30000,
        members: 5,
        read: false,
        campaignData: {
          category: 'Team Building',
          startDate: '2025-09-01',
          endDate: '2025-09-03',
          image: 'https://images.unsplash.com/photo-1716801408923-c2149294dad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBwb29sJTIwYWVyaWFsfGVufDF8fHx8MTc2Mzg2OTU5OXww&ixlib=rb-4.1.0&q=80&w=1080',
          provider: 'Magalies Park Resort',
          services: [
            { name: 'Deluxe Conference Room', type: 'Accommodation', provider: 'Magalies Park Resort' },
            { name: 'Team Building Activities Package', type: 'Activities', provider: 'Magalies Park Resort' },
            { name: 'Full Board Catering', type: 'Food & Dining', provider: 'Magalies Park Resort' }
          ]
        }
      },
      {
        id: 2,
        title: 'Company Annual Retreat',
        dateRange: 'From: 15 November 2025 - 18 November 2025',
        goal: 45000,
        members: 8,
        read: false,
        campaignData: {
          category: 'Retreat',
          startDate: '2025-11-15',
          endDate: '2025-11-18',
          image: 'https://images.unsplash.com/photo-1761501989065-7c98a5d1f773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc2MzkwMjIwOXww&ixlib=rb-4.1.0&q=80&w=1080',
          provider: 'The Silo Hotel',
          services: [
            { name: 'Executive Suite', type: 'Accommodation', provider: 'The Silo Hotel' },
            { name: 'Fine Dining Package', type: 'Food & Dining', provider: 'The Silo Hotel' },
            { name: 'Luxury Airport Transfer', type: 'Transport', provider: 'Cape Town Shuttle Services' }
          ]
        }
      }
    ];
  });

  // Persist notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Monitor authentication state changes from localStorage
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    };
    
    // Check on mount and when localStorage changes
    window.addEventListener('storage', checkAuth);
    checkAuth();
    
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Notification toast removed - notifications only shown when user clicks bell icon

  const handleAddToCart = (item: CartItem) => {
    setCartItems([...cartItems, item]);
  };

  const handleRemoveFromCart = (itemId: number) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleUpdateCartQuantity = (itemId: number, quantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const handleShowCart = () => {
    setShowCart(true);
  };

  const handleCartContinue = () => {
    setCurrentPage('createCampaign');
    setShowCart(false);
  };

  const handleCreateCampaign = (campaignData: {
    name: string;
    category: string;
    startDate: string;
    endDate: string;
    members: string[];
    contributionFrequency: string;
    cartItems: CartItem[];
  }) => {
    // Calculate total goal from cart items
    const goalAmount = campaignData.cartItems.reduce((sum, item) => sum + item.price, 0);

    // Add creator as a member if not already in the list
    const creatorEmail = 'michael@keahcont.co.za';
    const allMembers = campaignData.members.includes(creatorEmail) 
      ? campaignData.members 
      : [creatorEmail, ...campaignData.members];

    const newCampaign: Campaign = {
      id: Date.now(),
      title: campaignData.name,
      image: campaignData.cartItems[0]?.image || imgEllipse34,
      provider: campaignData.cartItems[0]?.provider || 'Service Provider',
      date: `${campaignData.startDate} → ${campaignData.endDate}`,
      services: campaignData.cartItems.map(item => ({
        name: item.provider || item.name,
        type: `${item.type.charAt(0).toUpperCase() + item.type.slice(1)}: ${item.name}`,
      })),
      members: allMembers.map(email => ({ email })),
      goal: goalAmount,
      contributed: 0,
      status: 'manage',
      category: campaignData.category,
      startDate: campaignData.startDate,
      endDate: campaignData.endDate,
      contributionFrequency: campaignData.contributionFrequency,
      cartItems: campaignData.cartItems,
    };

    // Generate member performance data for the new campaign
    newCampaign.memberPerformance = generateMemberPerformance(newCampaign);

    setCreatedCampaigns([...createdCampaigns, newCampaign]);
    saveCampaign(appToStoredCampaign(newCampaign));
  };

  const handleUpdateCampaign = (updatedCampaign: Campaign) => {
    // Don't regenerate member performance if it's already provided - just use it
    // This preserves manual updates like contributions, removals, and replacements
    if (!updatedCampaign.memberPerformance || updatedCampaign.memberPerformance.length === 0) {
      updatedCampaign.memberPerformance = generateMemberPerformance(updatedCampaign);
    }
    
    // The contributed amount should already be calculated in the update, but ensure it's set
    if (!updatedCampaign.contributed && updatedCampaign.memberPerformance) {
      updatedCampaign.contributed = updatedCampaign.memberPerformance.reduce((sum, member) => sum + member.contributedAmount, 0);
    }
    
    setCreatedCampaigns(createdCampaigns.map(c => c.id === updatedCampaign.id ? updatedCampaign : c));
    setSelectedCampaign(updatedCampaign);
    saveCampaign(appToStoredCampaign(updatedCampaign));
  };

  // Check if user has visited before
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (hasVisitedBefore === 'true') {
      setShowFirstTime(false);
    } else {
      // Mark as visited after first time
      localStorage.setItem('hasVisitedBefore', 'true');
    }
    
    // Initialize campaign seed data
    initializeSeedData();
    
    // Expose seed data functions for debugging (only in development)
    if (typeof window !== 'undefined') {
      (window as any).forceInitializeSeedData = async () => {
        const { forceInitializeSeedData } = await import('./utils/seedData');
        forceInitializeSeedData();
        window.location.reload();
      };
      (window as any).resetAllData = async () => {
        const { resetAllData } = await import('./utils/seedData');
        resetAllData();
        window.location.reload();
      };
      console.log('💡 Debug commands available:');
      console.log('  - forceInitializeSeedData() - Reset and reload seed data');
      console.log('  - resetAllData() - Clear all data');
    }
  }, []);

  const handleAcceptInvitation = (notification: Notification) => {
    // Create a campaign from the notification
    const newCampaign: Campaign = {
      id: Date.now(),
      title: notification.title,
      image: notification.campaignData?.image || imgEllipse34,
      provider: notification.campaignData?.provider || 'Service Provider',
      date: notification.dateRange.replace('From: ', '').replace(' - ', ' → '),
      services: notification.campaignData?.services || [
        { name: notification.campaignData?.provider || 'Service Provider', type: notification.campaignData?.category || 'Event' }
      ],
      members: Array.from({ length: notification.members }, (_, i) => ({
        email: `member${i + 1}@example.com`
      })),
      goal: notification.goal,
      contributed: 0,
      status: 'contribute',
      category: notification.campaignData?.category || 'Event',
      startDate: notification.campaignData?.startDate || '2025-09-01',
      endDate: notification.campaignData?.endDate || '2025-09-03',
      contributionFrequency: 'monthly',
      cartItems: [],
    };

    setCreatedCampaigns([...createdCampaigns, newCampaign]);
    setSelectedCampaign(newCampaign);
    
    // Save to storage and dispatch event
    saveCampaign(appToStoredCampaign(newCampaign));
    window.dispatchEvent(new Event('campaignsUpdated'));
    
    // Remove the notification from the list once accepted
    const updatedNotifications = notifications.filter(n => n.id !== notification.id);
    setNotifications(updatedNotifications);
    
    // Explicitly save to localStorage to ensure persistence
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    
    toast.success(`Accepted invitation to \"${notification.title}\"`);
  };

  const handleViewNotification = (notification: Notification) => {
    // Mark the notification as read when viewed
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    ));
    
    // Find if the campaign already exists in created campaigns
    const existingCampaign = createdCampaigns.find(c => c.title === notification.title);
    
    if (existingCampaign) {
      setSelectedCampaign(existingCampaign);
      setCurrentPage('viewCampaignDetail');
    } else {
      setCurrentPage('campaignDetail');
    }
  };

  const handleMarkAsRead = (notificationId: number) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  // Handle member removal from campaign
  const handleRemoveMember = (campaignId: number, memberEmail: string) => {
    // Update localStorage storage
    const storageCampaign = getCampaignById(`campaign-${campaignId}`);
    if (storageCampaign) {
      updateCampaign(`campaign-${campaignId}`, {
        members: storageCampaign.members.filter(m => m.email !== memberEmail)
      });
    }
    
    // Update state
    setCreatedCampaigns(createdCampaigns.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          members: campaign.members.filter(m => m.email !== memberEmail)
        };
      }
      return campaign;
    }));
    
    // Update selected campaign if it's the one being modified
    if (selectedCampaign && selectedCampaign.id === campaignId) {
      setSelectedCampaign({
        ...selectedCampaign,
        members: selectedCampaign.members.filter(m => m.email !== memberEmail)
      });
    }
  };

  // Handle member replacement in campaign
  const handleReplaceMember = (campaignId: number, oldMemberEmail: string, newMemberEmail: string) => {
    // Update localStorage storage
    const storageCampaign = getCampaignById(`campaign-${campaignId}`);
    if (storageCampaign) {
      const updatedMembers = storageCampaign.members.filter(m => m.email !== oldMemberEmail);
      if (newMemberEmail) {
        updatedMembers.push({ email: newMemberEmail, name: newMemberEmail.split('@')[0] });
      }
      updateCampaign(`campaign-${campaignId}`, {
        members: updatedMembers
      });
    }
    
    // Update state
    setCreatedCampaigns(createdCampaigns.map(campaign => {
      if (campaign.id === campaignId) {
        const updatedMembers = campaign.members.filter(m => m.email !== oldMemberEmail);
        if (newMemberEmail) {
          updatedMembers.push({ email: newMemberEmail });
        }
        return {
          ...campaign,
          members: updatedMembers
        };
      }
      return campaign;
    }));
    
    // Update selected campaign if it's the one being modified
    if (selectedCampaign && selectedCampaign.id === campaignId) {
      const updatedMembers = selectedCampaign.members.filter(m => m.email !== oldMemberEmail);
      if (newMemberEmail) {
        updatedMembers.push({ email: newMemberEmail });
      }
      setSelectedCampaign({
        ...selectedCampaign,
        members: updatedMembers
      });
    }
  };

  // Handle member refund
  const handleRefundMember = (campaignId: number, memberEmail: string, amount: number) => {
    // Update localStorage storage
    const storageCampaign = getCampaignById(`campaign-${campaignId}`);
    if (storageCampaign) {
      updateCampaign(`campaign-${campaignId}`, {
        currentAmount: Math.max(0, storageCampaign.currentAmount - amount)
      });
    }
    
    // In a real app, this would process the refund and update the member's contribution
    // For now, we'll just keep the member but could mark them as refunded
    setCreatedCampaigns(createdCampaigns.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          contributed: Math.max(0, campaign.contributed - amount)
        };
      }
      return campaign;
    }));
    
    // Update selected campaign if it's the one being modified
    if (selectedCampaign && selectedCampaign.id === campaignId) {
      setSelectedCampaign({
        ...selectedCampaign,
        contributed: Math.max(0, selectedCampaign.contributed - amount)
      });
    }
  };

  // Check if there are unread notifications
  const hasUnreadNotifications = notifications.some(n => !n.read);

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage userProfile={userProfile} onUpdateProfile={setUserProfile} />;
      case 'overview':
        return <OverviewPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} createdCampaigns={createdCampaigns} onSelectCampaign={setSelectedCampaign} onShowCart={handleShowCart} />;
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} onShowSelectCampaign={() => setShowSelectCampaign(true)} isFirstTimeUser={showFirstTime} onSelectService={setSelectedService} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} onSearch={setSearchQuery} onSearchFocus={() => setShowSearch(true)} onSelectProvider={(provider) => {
          setSelectedService({
            id: parseInt(provider.id),
            name: provider.businessName,
            location: provider.location,
            category: provider.businessType,
            image: provider.image || ''
          });
        }} />;
      case 'transactions':
        return <UserTransactionsPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} onShowSelectCampaign={() => setShowSelectCampaign(true)} hasUnreadNotifications={hasUnreadNotifications} createdCampaigns={createdCampaigns} onShowCart={handleShowCart} />;
      case 'campaigns':
        return <CampaignsPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} createdCampaigns={createdCampaigns} onSelectCampaign={setSelectedCampaign} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} />;
      case 'vouchers':
        return <VouchersPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} createdCampaigns={createdCampaigns} onShowCart={handleShowCart} />;
      case 'individualCampaign':
        return <IndividualCampaignPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} createdCampaigns={createdCampaigns} onSelectCampaign={setSelectedCampaign} onShowCart={handleShowCart} />;
      case 'groupCampaign':
        return <GroupCampaignPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} createdCampaigns={createdCampaigns} onSelectCampaign={setSelectedCampaign} onShowCart={handleShowCart} />;
      case 'managingCampaigns':
        return <ManagingCampaignsPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} createdCampaigns={createdCampaigns} onSelectCampaign={setSelectedCampaign} onShowCart={handleShowCart} />;
      case 'helpSupport':
        return <HelpSupportPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} />;
      case 'draft':
        return <SaveDraftPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onEditDraft={setEditingDraft} onShowCart={handleShowCart} />;
      case 'saveDraft':
        return <SaveDraftPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onEditDraft={setEditingDraft} onShowCart={handleShowCart} />;
      case 'howItWorks':
        return <HowItWorksPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} />;
      case 'campaignDetail':
        return <CampaignDetailPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} />;
      case 'viewCampaign':
        return <ViewCampaignPage onNavigate={setCurrentPage} campaign={selectedCampaign} onUpdateCampaign={handleUpdateCampaign} onShowCart={handleShowCart} />;
      case 'messaging':
        return <MessagingPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} />;
      case 'messageChat':
        return <MessageChatPage onShowCart={handleShowCart} />;
      case 'serviceDetail':
        return <ServiceDetailPage onNavigate={setCurrentPage} service={selectedService} cartItems={cartItems} onUpdateCart={setCartItems} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} />;
      case 'selectedServices':
        return <SelectedServicesPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} />;
      case 'selectServices':
        return <SelectServicesPage onNavigate={setCurrentPage} onSelectService={setSelectedService} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} />;
      case 'createCampaign':
        return <CreateCampaignPage onNavigate={setCurrentPage} cartItems={cartItems} onClearCart={() => { setCartItems([]); setEditingDraft(null); }} draftData={editingDraft} onCreateCampaign={handleCreateCampaign} onRemoveFromCart={handleRemoveFromCart} onSelectService={setSelectedService} />;
      case 'browseServiceProviders':
        return <BrowseServiceProvidersPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} cartItems={cartItems} onAddToCart={handleAddToCart} onBackToCampaign={() => setCurrentPage('createCampaign')} />;
      case 'manageCampaign':
        return <ManageCampaignPage onNavigate={setCurrentPage} campaign={selectedCampaign} onUpdateCampaign={handleUpdateCampaign} />;
      case 'contributors':
        return <ContributorsPage 
          onNavigate={setCurrentPage} 
          campaign={selectedCampaign} 
          onSelectMember={setSelectedMember}
          onRemoveMember={(memberEmail) => selectedCampaign && handleRemoveMember(selectedCampaign.id, memberEmail)}
          onReplaceMember={(oldEmail, newEmail) => selectedCampaign && handleReplaceMember(selectedCampaign.id, oldEmail, newEmail)}
          onRefundMember={(memberEmail, amount) => selectedCampaign && handleRefundMember(selectedCampaign.id, memberEmail, amount)}
        />;
      case 'contributorDetail':
        return <ContributorDetailPage 
          onNavigate={setCurrentPage} 
          member={selectedMember}
          campaign={selectedCampaign}
          onRemoveMember={(memberEmail) => selectedCampaign && handleRemoveMember(selectedCampaign.id, memberEmail)}
          onReplaceMember={(oldEmail, newEmail) => selectedCampaign && handleReplaceMember(selectedCampaign.id, oldEmail, newEmail)}
          onRefundMember={(memberEmail, amount) => selectedCampaign && handleRefundMember(selectedCampaign.id, memberEmail, amount)}
        />;
      case 'campaignSchedule':
        return <CampaignSchedulePage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} />;
      case 'myCampaignSchedule':
        return <MyCampaignSchedulePage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} />;
      case 'campaignsHistory':
        return <CampaignsHistoryPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} />;
      case 'contribute':
        return <ContributePage onNavigate={setCurrentPage} campaign={selectedCampaign} onUpdateCampaign={handleUpdateCampaign} />;
      case 'viewCampaignDetail':
        return <ViewCampaignDetailPage onNavigate={setCurrentPage} campaign={selectedCampaign} onUpdateCampaign={(updatedCampaign) => {
          setCreatedCampaigns(createdCampaigns.map(c => c.id === updatedCampaign.id ? updatedCampaign : c));
          setSelectedCampaign(updatedCampaign);
        }} />;
      case 'signup':
        return <SignUpPage onNavigate={setCurrentPage} onSignUp={handleAccountTypeSelect} />;
      case 'vendorSignup':
        return <VendorSignUpPage onNavigate={setCurrentPage} onSignUp={(userData) => handleSignUp(userData.accountType, userData)} accountType={selectedAccountType} />;
      case 'otpVerification':
        return <OTPVerificationPage onNavigate={setCurrentPage} isSignupFlow={true} />;
      case 'signupSuccess':
        return <SignUpSuccessPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} accountType={selectedAccountType} onLogin={handleLogin} />;
      case 'forgotPassword':
        return <ForgotPasswordPage onNavigate={setCurrentPage} />;
      case 'createNewPassword':
        return <CreateNewPasswordPage onNavigate={setCurrentPage} />;
      case 'selectUserType':
        return <SelectUserTypePage onNavigate={setCurrentPage} onSelectUserType={setSelectedAccountType} />;
      case 'vendorDashboard':
        return <VendorDashboard onNavigate={setCurrentPage} />;
      case 'vendorProfile':
        return <VendorProfilePage onNavigate={setCurrentPage} />;
      case 'vendorCampaigns':
        return <VendorCampaignsPage onNavigate={setCurrentPage} onSelectCampaign={setSelectedVendorCampaign} />;
      case 'vendorCampaignDetail':
        return <VendorCampaignDetailPage onNavigate={setCurrentPage} campaign={selectedVendorCampaign} onClose={() => setCurrentPage('vendorCampaigns')} />;
      case 'vendorServices':
        return <VendorServicesPage onNavigate={setCurrentPage} />;
      case 'vendorTransactions':
        return <VendorTransactionsPage onNavigate={setCurrentPage} />;
      case 'vendorOverview':
        return <VendorOverviewPage onNavigate={setCurrentPage} />;
      case 'vendorDrafts':
        return <VendorDraftsPage onNavigate={setCurrentPage} />;
      case 'vendorHelp':
        return <VendorHelpPage onNavigate={setCurrentPage} />;
      case 'vendorInvoice':
        return <VendorInvoicePage onNavigate={setCurrentPage} />;
      case 'vendorReport':
        return <VendorReportPage onNavigate={setCurrentPage} />;
      case 'vendorVouchers':
        return <VendorVouchersPage onNavigate={setCurrentPage} />;
      case 'approveBookingRequest':
        return <ApproveBookingRequestPage onNavigate={setCurrentPage} />;
      case 'editBooking':
        return <EditBookingPage onNavigate={setCurrentPage} />;
      case 'corporateDashboard':
        return <CorporateDashboard onNavigate={setCurrentPage} />;
      case 'corporateCampaigns':
        return <CorporateCampaignsPage onNavigate={setCurrentPage} />;
      case 'corporateProfile':
        return <CorporateProfilePage onNavigate={setCurrentPage} />;
      case 'corporateCampaignDetail':
        return <CorporateCampaignDetailPage onNavigate={setCurrentPage} onClose={() => setCurrentPage('corporateCampaigns')} />;
      case 'corporateSchedule':
        return <CorporateCampaignSchedulePage onNavigate={setCurrentPage} />;
      case 'corporateTransactions':
        return <CorporateTransactionsPage onNavigate={setCurrentPage} />;
      case 'corporateVouchers':
        return <CorporateVouchersPage onNavigate={setCurrentPage} />;
      case 'corporateOverview':
        return <CorporateOverviewPage onNavigate={setCurrentPage} />;
      case 'corporateDrafts':
        return <CorporateDraftsPage onNavigate={setCurrentPage} />;
      case 'corporateHelp':
        return <CorporateHelpPage onNavigate={setCurrentPage} />;
      case 'corporateGoalsTracker':
        return <CorporateGoalsTrackerPage onNavigate={setCurrentPage} />;
      case 'corporateTransactionsTable':
        return <CorporateTransactionsTablePage onNavigate={setCurrentPage} />;
      case 'corporateSelectServices':
        return <CorporateSelectServicesPage onNavigate={setCurrentPage} onSelectService={setSelectedService} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} />;
      case 'corporateServiceProviders':
        return <CorporateServiceProvidersPage onNavigate={setCurrentPage} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} />;
      case 'serviceProviders':
        return <ServiceProvidersPage onNavigate={setCurrentPage} onSelectService={setSelectedService} onShowNotifications={() => setShowNotifications(true)} hasUnreadNotifications={hasUnreadNotifications} onShowCart={handleShowCart} />;
      default:
        return <LoginPage onNavigate={setCurrentPage} />;
    }
  };

  // Messaging page and full-width pages have their own layouts
  if (currentPage === 'messaging' || currentPage === 'serviceProviders') {
    return (
      <>
        {renderPage()}
        <NotificationsDialog 
          open={showNotifications} 
          onOpenChange={setShowNotifications}
          notifications={notifications}
          onAccept={handleAcceptInvitation}
          onView={handleViewNotification}
          onMarkAsRead={handleMarkAsRead}
        />
        <SearchDialog
          open={showSearch}
          onOpenChange={setShowSearch}
          searchQuery={searchQuery}
          onNavigate={setCurrentPage}
          onSelectProvider={(provider) => {
            setSelectedService({
              id: parseInt(provider.id),
              name: provider.businessName,
              location: provider.location,
              category: provider.businessType,
              image: provider.image || ''
            });
          }}
          onSelectService={setSelectedService}
        />
        <CartDialog
          open={showCart}
          onOpenChange={setShowCart}
          items={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onContinue={handleCartContinue}
        />
        <Toaster />
      </>
    );
  }

  // Full-width pages without sidebar
  if (currentPage === 'createCampaign' || currentPage === 'browseServiceProviders' || currentPage === 'serviceDetail' || currentPage === 'manageCampaign' || currentPage === 'contributors' || currentPage === 'contributorDetail' || currentPage === 'contribute' || currentPage === 'signup' || currentPage === 'vendorSignup' || currentPage === 'otpVerification' || currentPage === 'signupSuccess' || currentPage === 'login' || currentPage === 'forgotPassword' || currentPage === 'createNewPassword' || currentPage === 'selectUserType' || currentPage === 'vendorDashboard' || currentPage === 'vendorProfile' || currentPage === 'vendorCampaigns' || currentPage === 'vendorCampaignDetail' || currentPage === 'vendorServices' || currentPage === 'vendorTransactions' || currentPage === 'vendorOverview' || currentPage === 'vendorDrafts' || currentPage === 'vendorHelp' || currentPage === 'vendorInvoice' || currentPage === 'vendorReport' || currentPage === 'vendorVouchers' || currentPage === 'approveBookingRequest' || currentPage === 'editBooking' || currentPage === 'corporateDashboard' || currentPage === 'corporateCampaigns' || currentPage === 'corporateProfile' || currentPage === 'corporateCampaignDetail' || currentPage === 'corporateSchedule' || currentPage === 'corporateTransactions' || currentPage === 'corporateVouchers' || currentPage === 'corporateOverview' || currentPage === 'corporateDrafts' || currentPage === 'corporateHelp' || currentPage === 'corporateGoalsTracker' || currentPage === 'corporateTransactionsTable' || currentPage === 'corporateSelectServices' || currentPage === 'corporateServiceProviders') {
    return (
      <>
        {renderPage()}
        <NotificationsDialog 
          open={showNotifications} 
          onOpenChange={setShowNotifications}
          notifications={notifications}
          onAccept={handleAcceptInvitation}
          onView={handleViewNotification}
          onMarkAsRead={handleMarkAsRead}
        />
        <SearchDialog
          open={showSearch}
          onOpenChange={setShowSearch}
          searchQuery={searchQuery}
          onNavigate={setCurrentPage}
          onSelectProvider={(provider) => {
            setSelectedService({
              id: parseInt(provider.id),
              name: provider.businessName,
              location: provider.location,
              category: provider.businessType,
              image: provider.image || ''
            });
          }}
          onSelectService={setSelectedService}
        />
        <SelectCampaignDialog
          open={showSelectCampaign}
          onOpenChange={setShowSelectCampaign}
          onSelectCampaign={(campaignId) => {
            const campaign = createdCampaigns.find(c => c.id === parseInt(campaignId));
            if (campaign) {
              setSelectedCampaign(campaign);
              setCurrentPage('contribute');
            }
          }}
        />
        <CartDialog
          open={showCart}
          onOpenChange={setShowCart}
          items={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onContinue={handleCartContinue}
        />
        <Toaster />
      </>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} onGoBack={handleGoBack} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <NotificationsDialog 
        open={showNotifications} 
        onOpenChange={setShowNotifications}
        notifications={notifications}
        onAccept={handleAcceptInvitation}
        onView={handleViewNotification}
        onMarkAsRead={handleMarkAsRead}
      />
      <SearchDialog
        open={showSearch}
        onOpenChange={setShowSearch}
        searchQuery={searchQuery}
        onNavigate={setCurrentPage}
        onSelectProvider={(provider) => {
          setSelectedService({
            id: parseInt(provider.id),
            name: provider.businessName,
            location: provider.location,
            category: provider.businessType,
            image: provider.image || ''
          });
        }}
        onSelectService={setSelectedService}
      />
      <SelectCampaignDialog
        open={showSelectCampaign}
        onOpenChange={setShowSelectCampaign}
        onSelectCampaign={(campaignId) => {
          const campaign = createdCampaigns.find(c => c.id === parseInt(campaignId));
          if (campaign) {
            setSelectedCampaign(campaign);
            setCurrentPage('contribute');
          }
        }}
      />
      <CartDialog
        open={showCart}
        onOpenChange={setShowCart}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onContinue={handleCartContinue}
      />
      <Toaster />
    </div>
  );
}