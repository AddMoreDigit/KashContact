# User Profile Workflow Documentation

## Overview

The User Profile Workflow provides a comprehensive system for managing user profiles with real-time updates, profile completion tracking, and immediate UI refresh when profile photos are changed.

## Features

### 1. **Profile Management**
- View and edit personal information (name, email, phone, address)
- Update security settings (password, 2FA, recovery email)
- Manage bank details for payments
- Upload and crop profile photos
- Track profile completion percentage

### 2. **Real-Time Updates**
- Immediate UI refresh when profile photo is updated
- Automatic cache clearing to ensure new images are displayed
- Event-driven updates across all components
- Toast notifications for successful updates

### 3. **Profile Completion Tracking**
- Dynamic calculation based on filled fields
- Visual progress indicators
- Weighted percentages for each section:
  - Setup Account: 25%
  - Upload Photo: 25%
  - Personal Information: 25%
  - Bank Details: 25%

### 4. **Storage System**
- LocalStorage-based profile management
- Multiple user profile support
- Current user session tracking
- Profile history and activity logging

## File Structure

```
/utils/
  ├── profileStorage.ts          # Profile data management
  └── profileCompletion.ts        # Completion calculation logic

/components/
  ├── common/
  │   ├── ProfileAvatar.tsx       # Reusable avatar component
  │   └── ProfileCompletionCard.tsx # Completion tracking UI
  └── user/
      ├── ProfilePage.tsx         # Main profile page
      ├── ProfileSettings.tsx     # Tabbed settings interface
      └── ProfileActivityTimeline.tsx # Recent activity display
```

## Usage Guide

### Viewing Profile

1. Navigate to the Profile page
2. View your profile information organized in tabs:
   - **Personal Info**: Name, email, phone, address
   - **Security**: Password, 2FA, recovery email
   - **Banking**: Bank account details
   - **Notifications**: Preference settings

### Updating Profile Photo

1. Hover over the profile picture
2. Click the edit icon
3. Select a new image file
4. Use the cropper to adjust the image
5. Click "Apply Crop" to preview
6. Click "Save Photo" to update
7. **The new photo appears immediately without page refresh**

### Editing Personal Information

1. Click "Edit" on the Personal Info tab
2. Update any fields as needed
3. Click "Save Changes"
4. Receive a success notification
5. Profile completion percentage updates automatically

### Adding Bank Details

1. Navigate to the Banking tab
2. Click "Add Bank Details" (or "Edit" if already added)
3. Enter:
   - Account Holder Name
   - Account Number
   - Bank Name
4. Click "Save Changes"
5. Bank details are securely stored

### Updating Security Settings

1. Go to the Security tab
2. Click "Edit"
3. Update:
   - Password
   - Two-Factor Authentication toggle
   - Recovery Email
4. Save changes
5. Security settings updated immediately

## Profile Completion

### Calculation Logic

The profile completion percentage is calculated dynamically based on:

```typescript
Setup Account (25%):
  - Email exists ✓

Upload Photo (25%):
  - Profile photo uploaded ✓

Personal Information (25%):
  - Full Names filled ✓
  - Surname filled ✓
  - Phone Number filled ✓
  - Address filled ✓

Bank Details (25%):
  - Account Holder filled ✓
  - Account Number filled ✓
  - Bank Name filled ✓
```

### For Corporate Users

Corporate profiles use a different weighting (no bank details required):
- Setup Account: 33.33%
- Upload Photo: 33.33%
- Personal Information: 33.33%

### For Vendor Users

Vendors use the standard calculation (same as regular users).

## Technical Implementation

### Profile Storage

```typescript
import { 
  getCurrentUserProfile,
  updateProfile,
  updateProfilePhoto,
  updateBankDetails,
  updateSecurityInfo
} from './utils/profileStorage';

// Get current user profile
const profile = getCurrentUserProfile();

// Update profile
updateProfile(userId, { fullNames: 'John', surname: 'Doe' });

// Update profile photo with automatic cache clearing
updateProfilePhoto(userId, photoDataUrl);
```

### Event System

The system uses custom events for real-time updates:

```typescript
// Profile photo updated event
window.dispatchEvent(new CustomEvent('profilePhotoUpdated', { 
  detail: { userId } 
}));

// General profile updated event
window.dispatchEvent(new Event('profileUpdated'));
```

### Components Listen for Updates

```typescript
useEffect(() => {
  const handleProfileUpdate = () => {
    setProfilePhotoKey(Date.now()); // Force re-render
  };

  window.addEventListener('profilePhotoUpdated', handleProfileUpdate);
  window.addEventListener('profileUpdated', handleProfileUpdate);

  return () => {
    window.removeEventListener('profilePhotoUpdated', handleProfileUpdate);
    window.removeEventListener('profileUpdated', handleProfileUpdate);
  };
}, []);
```

### Image Caching Solution

To ensure profile photos update immediately:

1. **Key-based Re-rendering**: Each image has a unique key that changes on update
   ```tsx
   <img 
     key={`${profilePhotoKey}-${userProfile.photo}`} 
     src={userProfile.photo} 
   />
   ```

2. **Event-Driven Refresh**: Components listen for update events
3. **Storage Sync**: Updates are immediately saved to localStorage
4. **Toast Notifications**: User receives confirmation of successful updates

## ProfileAvatar Component

A reusable avatar component that automatically updates across the app:

```tsx
import { ProfileAvatar } from './components/common/ProfileAvatar';

// Basic usage
<ProfileAvatar 
  src={userProfile.photo} 
  alt="User Name"
  size="md"
/>

// Auto-fetch from storage
<ProfileAvatar 
  userId={currentUserId}
  size="lg"
/>
```

Features:
- Automatic refresh on profile photo updates
- Fallback to initials if no photo
- Multiple size variants (sm, md, lg, xl)
- Customizable styling

## API Reference

### Profile Storage Functions

#### `initializeDefaultProfiles()`
Initializes default user profiles in localStorage.

#### `getAllProfiles(): UserProfile[]`
Returns all user profiles.

#### `getProfileById(userId: string): UserProfile | null`
Gets a specific user profile by ID.

#### `getCurrentUserProfile(): UserProfile | null`
Gets the current logged-in user's profile.

#### `updateProfile(userId: string, updates: Partial<UserProfile>): UserProfile | null`
Updates a user profile with partial data.

#### `updateProfilePhoto(userId: string, photoUrl: string): UserProfile | null`
Updates profile photo and triggers UI refresh events.

#### `updateBankDetails(userId: string, bankDetails: BankDetails): UserProfile | null`
Updates banking information.

#### `updateSecurityInfo(userId: string, securityInfo: SecurityInfo): UserProfile | null`
Updates security settings.

### Profile Completion Functions

#### `calculateProfileCompletion(data: ProfileCompletionData): ProfileCompletionResult`
Calculates profile completion for regular users and vendors.

#### `calculateCorporateProfileCompletion(data: ProfileCompletionData): ProfileCompletionResult`
Calculates profile completion for corporate users (no bank details).

#### `calculateVendorProfileCompletion(data: ProfileCompletionData): ProfileCompletionResult`
Calculates profile completion for vendors (includes bank details).

## Best Practices

### 1. **Always Use Profile Storage**
Instead of managing state manually, use the centralized storage:

```typescript
// ✅ Good
const profile = getCurrentUserProfile();
updateProfile(profile.id, { fullNames: 'John' });

// ❌ Bad
localStorage.setItem('userProfile', JSON.stringify(profile));
```

### 2. **Handle Updates Properly**
Always notify users and update the UI:

```typescript
// ✅ Good
updateProfilePhoto(userId, photoUrl);
toast.success('Profile photo updated successfully');

// ❌ Bad
// Silent updates without feedback
```

### 3. **Listen for Events**
Components displaying profile data should listen for updates:

```typescript
useEffect(() => {
  const handleUpdate = () => {
    // Refresh local state
  };
  
  window.addEventListener('profileUpdated', handleUpdate);
  return () => window.removeEventListener('profileUpdated', handleUpdate);
}, []);
```

### 4. **Use ProfileAvatar Component**
For consistent avatar display across the app:

```typescript
// ✅ Good
<ProfileAvatar userId={currentUserId} size="md" />

// ❌ Bad
<img src={userProfile.photo} />
```

## Troubleshooting

### Profile Photo Not Updating

1. Check if `profilePhotoKey` is being updated
2. Verify event listeners are attached
3. Ensure `updateProfilePhoto` is being called (not just `updateProfile`)
4. Check browser console for errors

### Profile Completion Not Calculating

1. Verify all required fields are being passed
2. Check if using correct calculation function (user vs corporate vs vendor)
3. Ensure data structure matches `ProfileCompletionData` interface

### Updates Not Persisting

1. Check localStorage is enabled
2. Verify `userId` is correct
3. Ensure `updateProfile` returns a non-null value
4. Check for JavaScript errors in console

## Future Enhancements

- [ ] Server-side profile storage integration
- [ ] Profile photo upload to cloud storage (e.g., S3, Cloudinary)
- [ ] Profile verification system
- [ ] Activity log with detailed history
- [ ] Profile export functionality
- [ ] Multi-language support for profile fields
- [ ] Profile privacy settings
- [ ] Profile sharing capabilities

## Related Documentation

- [Campaign Workflow](/docs/CAMPAIGN_WORKFLOW.md)
- [Authentication System](/docs/AUTH_SYSTEM.md)
- [Storage Utilities](/docs/STORAGE_UTILITIES.md)

---

**Last Updated**: November 28, 2025  
**Version**: 1.0.0
