// Profile storage and management utility

export interface UserProfile {
  id: string;
  fullNames: string;
  surname: string;
  email: string;
  phoneNumber: string;
  address: string;
  photo?: string;
  coverPhoto?: string;
  bankDetails?: {
    accountHolder: string;
    accountNumber: string;
    bankName: string;
  };
  securityInfo?: {
    password: string;
    twoFactorAuth: boolean;
    recoveryEmail: string;
  };
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    marketingEmails: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}

const PROFILE_STORAGE_KEY = 'userProfiles';
const CURRENT_USER_KEY = 'currentUserId';

/**
 * Initialize default profile data in localStorage
 */
export function initializeDefaultProfiles(): void {
  const existingProfiles = localStorage.getItem(PROFILE_STORAGE_KEY);
  
  if (!existingProfiles) {
    const defaultProfiles: UserProfile[] = [
      {
        id: 'user-1',
        fullNames: 'Michael',
        surname: 'Johnson',
        email: 'michael@example.com',
        phoneNumber: '+27 123 456 789',
        address: '123 Main Street, Cape Town, 8001',
        photo: '',
        coverPhoto: '',
        securityInfo: {
          password: 'password123',
          twoFactorAuth: false,
          recoveryEmail: 'michael.recovery@example.com'
        },
        preferences: {
          notifications: true,
          emailUpdates: true,
          marketingEmails: false
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(defaultProfiles));
  }
}

/**
 * Get all user profiles
 */
export function getAllProfiles(): UserProfile[] {
  try {
    const profiles = localStorage.getItem(PROFILE_STORAGE_KEY);
    return profiles ? JSON.parse(profiles) : [];
  } catch (error) {
    console.error('Error getting profiles:', error);
    return [];
  }
}

/**
 * Get user profile by ID
 */
export function getProfileById(userId: string): UserProfile | null {
  try {
    const profiles = getAllProfiles();
    return profiles.find(profile => profile.id === userId) || null;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
}

/**
 * Get user profile by email
 */
export function getProfileByEmail(email: string): UserProfile | null {
  try {
    const profiles = getAllProfiles();
    return profiles.find(profile => profile.email.toLowerCase() === email.toLowerCase()) || null;
  } catch (error) {
    console.error('Error getting profile by email:', error);
    return null;
  }
}

/**
 * Get current user profile
 */
export function getCurrentUserProfile(): UserProfile | null {
  try {
    const currentUserId = localStorage.getItem(CURRENT_USER_KEY);
    const userEmail = localStorage.getItem('userEmail');
    
    if (currentUserId) {
      return getProfileById(currentUserId);
    } else if (userEmail) {
      return getProfileByEmail(userEmail);
    }
    
    return null;
  } catch (error) {
    console.error('Error getting current user profile:', error);
    return null;
  }
}

/**
 * Update user profile
 */
export function updateProfile(userId: string, updates: Partial<UserProfile>): UserProfile | null {
  try {
    const profiles = getAllProfiles();
    const profileIndex = profiles.findIndex(profile => profile.id === userId);
    
    if (profileIndex === -1) {
      console.error('Profile not found');
      return null;
    }
    
    // Update the profile
    const updatedProfile: UserProfile = {
      ...profiles[profileIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    profiles[profileIndex] = updatedProfile;
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles));
    
    // Trigger a storage event to notify other components
    window.dispatchEvent(new Event('profileUpdated'));
    
    return updatedProfile;
  } catch (error) {
    console.error('Error updating profile:', error);
    return null;
  }
}

/**
 * Update profile photo
 */
export function updateProfilePhoto(userId: string, photoUrl: string): UserProfile | null {
  try {
    const profile = updateProfile(userId, { photo: photoUrl });
    
    if (profile) {
      // Clear any cached profile images
      clearProfilePhotoCache(userId);
    }
    
    return profile;
  } catch (error) {
    console.error('Error updating profile photo:', error);
    return null;
  }
}

/**
 * Update cover photo
 */
export function updateCoverPhoto(userId: string, coverPhotoUrl: string): UserProfile | null {
  try {
    return updateProfile(userId, { coverPhoto: coverPhotoUrl });
  } catch (error) {
    console.error('Error updating cover photo:', error);
    return null;
  }
}

/**
 * Clear profile photo cache (force UI refresh)
 */
function clearProfilePhotoCache(userId: string): void {
  // Dispatch custom event to force all components to re-render profile images
  const event = new CustomEvent('profilePhotoUpdated', { 
    detail: { userId } 
  });
  window.dispatchEvent(event);
}

/**
 * Update bank details
 */
export function updateBankDetails(
  userId: string, 
  bankDetails: { accountHolder: string; accountNumber: string; bankName: string }
): UserProfile | null {
  try {
    return updateProfile(userId, { bankDetails });
  } catch (error) {
    console.error('Error updating bank details:', error);
    return null;
  }
}

/**
 * Update security info
 */
export function updateSecurityInfo(
  userId: string,
  securityInfo: { password: string; twoFactorAuth: boolean; recoveryEmail: string }
): UserProfile | null {
  try {
    return updateProfile(userId, { securityInfo });
  } catch (error) {
    console.error('Error updating security info:', error);
    return null;
  }
}

/**
 * Update preferences
 */
export function updatePreferences(
  userId: string,
  preferences: { notifications: boolean; emailUpdates: boolean; marketingEmails: boolean }
): UserProfile | null {
  try {
    return updateProfile(userId, { preferences });
  } catch (error) {
    console.error('Error updating preferences:', error);
    return null;
  }
}

/**
 * Create a new profile
 */
export function createProfile(profileData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): UserProfile | null {
  try {
    const profiles = getAllProfiles();
    
    // Check if email already exists
    const existingProfile = profiles.find(p => p.email.toLowerCase() === profileData.email.toLowerCase());
    if (existingProfile) {
      console.error('Profile with this email already exists');
      return null;
    }
    
    const newProfile: UserProfile = {
      ...profileData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    profiles.push(newProfile);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles));
    
    return newProfile;
  } catch (error) {
    console.error('Error creating profile:', error);
    return null;
  }
}

/**
 * Delete a profile
 */
export function deleteProfile(userId: string): boolean {
  try {
    const profiles = getAllProfiles();
    const filteredProfiles = profiles.filter(profile => profile.id !== userId);
    
    if (filteredProfiles.length === profiles.length) {
      console.error('Profile not found');
      return false;
    }
    
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(filteredProfiles));
    return true;
  } catch (error) {
    console.error('Error deleting profile:', error);
    return false;
  }
}

/**
 * Set current user
 */
export function setCurrentUser(userId: string): void {
  localStorage.setItem(CURRENT_USER_KEY, userId);
}

/**
 * Get current user ID
 */
export function getCurrentUserId(): string | null {
  return localStorage.getItem(CURRENT_USER_KEY);
}

/**
 * Clear current user
 */
export function clearCurrentUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Initialize default profiles on module load
if (typeof window !== 'undefined') {
  initializeDefaultProfiles();
}
