import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getCurrentUserProfile } from '../../utils/profileStorage';

interface ProfileAvatarProps {
  userId?: string;
  email?: string;
  src?: string;
  alt?: string;
  className?: string;
  fallbackClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function ProfileAvatar({ 
  userId, 
  email, 
  src, 
  alt = 'Profile', 
  className,
  fallbackClassName,
  size = 'md'
}: ProfileAvatarProps) {
  const [photoUrl, setPhotoUrl] = useState(src || '');
  const [refreshKey, setRefreshKey] = useState(Date.now());

  useEffect(() => {
    // If no src provided, try to get from storage
    if (!src && (userId || email)) {
      const profile = getCurrentUserProfile();
      if (profile) {
        setPhotoUrl(profile.photo || '');
      }
    } else {
      setPhotoUrl(src || '');
    }
  }, [src, userId, email]);

  // Listen for profile photo updates
  useEffect(() => {
    const handlePhotoUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      const updatedUserId = customEvent.detail?.userId;
      
      // If this is the user whose photo was updated, refresh
      if (!userId || userId === updatedUserId) {
        setRefreshKey(Date.now());
        
        // Re-fetch the photo URL
        const profile = getCurrentUserProfile();
        if (profile) {
          setPhotoUrl(profile.photo || '');
        }
      }
    };

    const handleProfileUpdate = () => {
      setRefreshKey(Date.now());
      
      // Re-fetch the photo URL
      const profile = getCurrentUserProfile();
      if (profile) {
        setPhotoUrl(profile.photo || '');
      }
    };

    window.addEventListener('profilePhotoUpdated', handlePhotoUpdate);
    window.addEventListener('profileUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('profilePhotoUpdated', handlePhotoUpdate);
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, [userId]);

  const getInitials = (name?: string): string => {
    if (!name) return '??';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <Avatar className={className || sizeClasses[size]}>
      {photoUrl && (
        <AvatarImage 
          key={`${refreshKey}-${photoUrl}`}
          src={photoUrl} 
          alt={alt}
        />
      )}
      <AvatarFallback className={fallbackClassName || 'bg-purple-500 text-white'}>
        {getInitials(alt)}
      </AvatarFallback>
    </Avatar>
  );
}
