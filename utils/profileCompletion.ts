// Profile completion calculation utility

export interface ProfileCompletionData {
  fullNames?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  photo?: string;
  billingDetails?: {
    cardholderName?: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
  };
  twoFactorAuth?: boolean;
  recoveryEmail?: string;
}

export interface ProfileCompletionResult {
  setupAccount: { completed: boolean; percentage: number };
  uploadPhoto: { completed: boolean; percentage: number };
  personalInformation: { completed: boolean; percentage: number };
  bankDetails: { completed: boolean; percentage: number };
  total: number;
}

/**
 * Calculate profile completion percentage dynamically
 * @param data - Profile data to evaluate
 * @returns Profile completion breakdown
 */
export function calculateProfileCompletion(data: ProfileCompletionData): ProfileCompletionResult {
  // Setup Account (25%) - Based on having email and password (assumed if account exists)
  const setupAccountCompleted = !!data.email;
  const setupAccountPercentage = setupAccountCompleted ? 25 : 0;

  // Upload Photo (25%) - Based on having a profile photo
  const uploadPhotoCompleted = !!data.photo;
  const uploadPhotoPercentage = uploadPhotoCompleted ? 25 : 0;

  // Personal Information (25%) - Based on having name, phone, and address
  const hasFullNames = !!data.fullNames && data.fullNames.trim() !== '';
  const hasSurname = !!data.surname && data.surname.trim() !== '';
  const hasPhone = !!data.phoneNumber && data.phoneNumber.trim() !== '';
  const hasAddress = !!data.address && data.address.trim() !== '';
  
  const personalInfoFields = [hasFullNames, hasSurname, hasPhone, hasAddress];
  const personalInfoFilledCount = personalInfoFields.filter(Boolean).length;
  const personalInfoCompleted = personalInfoFilledCount === personalInfoFields.length;
  const personalInfoPercentage = (personalInfoFilledCount / personalInfoFields.length) * 25;

  // Bank Details (25%) - Based on having complete credit card information
  const hasCardholderName = !!data.billingDetails?.cardholderName && data.billingDetails.cardholderName.trim() !== '';
  const hasCardNumber = !!data.billingDetails?.cardNumber && data.billingDetails.cardNumber.trim() !== '';
  const hasExpiryDate = !!data.billingDetails?.expiryDate && data.billingDetails.expiryDate.trim() !== '';
  
  const bankDetailsFields = [hasCardholderName, hasCardNumber, hasExpiryDate];
  const bankDetailsFilledCount = bankDetailsFields.filter(Boolean).length;
  const bankDetailsCompleted = bankDetailsFilledCount === bankDetailsFields.length;
  const bankDetailsPercentage = (bankDetailsFilledCount / bankDetailsFields.length) * 25;

  // Total completion percentage
  const total = Math.round(
    setupAccountPercentage + 
    uploadPhotoPercentage + 
    personalInfoPercentage + 
    bankDetailsPercentage
  );

  return {
    setupAccount: { 
      completed: setupAccountCompleted, 
      percentage: Math.round(setupAccountPercentage) 
    },
    uploadPhoto: { 
      completed: uploadPhotoCompleted, 
      percentage: Math.round(uploadPhotoPercentage) 
    },
    personalInformation: { 
      completed: personalInfoCompleted, 
      percentage: Math.round(personalInfoPercentage) 
    },
    bankDetails: { 
      completed: bankDetailsCompleted, 
      percentage: Math.round(bankDetailsPercentage) 
    },
    total
  };
}

/**
 * Calculate corporate profile completion
 * Corporate profiles don't need bank details, so we redistribute the weight
 */
export function calculateCorporateProfileCompletion(data: ProfileCompletionData): ProfileCompletionResult {
  // Setup Account (33.33%)
  const setupAccountCompleted = !!data.email;
  const setupAccountPercentage = setupAccountCompleted ? 33.33 : 0;

  // Upload Photo (33.33%)
  const uploadPhotoCompleted = !!data.photo;
  const uploadPhotoPercentage = uploadPhotoCompleted ? 33.33 : 0;

  // Personal Information (33.33%) - For corporate: company name, email, phone, address
  const hasFullNames = !!data.fullNames && data.fullNames.trim() !== '';
  const hasPhone = !!data.phoneNumber && data.phoneNumber.trim() !== '';
  const hasAddress = !!data.address && data.address.trim() !== '';
  
  const personalInfoFields = [hasFullNames, hasPhone, hasAddress];
  const personalInfoFilledCount = personalInfoFields.filter(Boolean).length;
  const personalInfoCompleted = personalInfoFilledCount === personalInfoFields.length;
  const personalInfoPercentage = (personalInfoFilledCount / personalInfoFields.length) * 33.33;

  // Total completion percentage
  const total = Math.round(
    setupAccountPercentage + 
    uploadPhotoPercentage + 
    personalInfoPercentage
  );

  return {
    setupAccount: { 
      completed: setupAccountCompleted, 
      percentage: Math.round(setupAccountPercentage) 
    },
    uploadPhoto: { 
      completed: uploadPhotoCompleted, 
      percentage: Math.round(uploadPhotoPercentage) 
    },
    personalInformation: { 
      completed: personalInfoCompleted, 
      percentage: Math.round(personalInfoPercentage) 
    },
    bankDetails: { 
      completed: false, 
      percentage: 0 
    },
    total
  };
}

/**
 * Calculate vendor profile completion
 * Vendors need all fields including bank details for payments
 */
export function calculateVendorProfileCompletion(data: ProfileCompletionData): ProfileCompletionResult {
  return calculateProfileCompletion(data);
}