/**
 * Placeholder Image Utilities
 * 
 * Provides helper functions to generate placeholder images for development
 * and testing purposes.
 */

export type PlaceholderCategory = 
  | 'avatar' 
  | 'campaign' 
  | 'service' 
  | 'product' 
  | 'banner' 
  | 'profile'
  | 'thumbnail'
  | 'hero';

interface PlaceholderOptions {
  width?: number;
  height?: number;
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  seed?: number | string;
}

/**
 * Generate a placeholder image URL using picsum.photos (real photos)
 */
export function getPicsumPlaceholder(
  width: number = 400,
  height: number = 300,
  seed?: number | string
): string {
  const seedParam = seed ? `?random=${seed}` : '';
  return `https://picsum.photos/${width}/${height}${seedParam}`;
}

/**
 * Generate a placeholder image URL with custom text and colors
 */
export function getPlaceholderWithText(options: PlaceholderOptions): string {
  const {
    width = 400,
    height = 300,
    text = 'Placeholder',
    backgroundColor = '6366f1', // Purple to match your branding
    textColor = 'ffffff',
  } = options;

  const encodedText = encodeURIComponent(text);
  return `https://placehold.co/${width}x${height}/${backgroundColor}/${textColor}?text=${encodedText}`;
}

/**
 * Generate a simple placeholder with just dimensions
 */
export function getSimplePlaceholder(width: number = 400, height: number = 300): string {
  return `https://via.placeholder.com/${width}x${height}`;
}

/**
 * Get a category-specific placeholder image
 */
export function getCategoryPlaceholder(
  category: PlaceholderCategory,
  seed?: number | string
): string {
  const presets = {
    avatar: { width: 200, height: 200 },
    profile: { width: 400, height: 400 },
    campaign: { width: 800, height: 600 },
    service: { width: 600, height: 400 },
    product: { width: 400, height: 400 },
    banner: { width: 1200, height: 400 },
    thumbnail: { width: 300, height: 200 },
    hero: { width: 1920, height: 1080 },
  };

  const { width, height } = presets[category];
  return getPicsumPlaceholder(width, height, seed);
}

/**
 * Get a branded placeholder with purple theme
 */
export function getBrandedPlaceholder(
  width: number = 400,
  height: number = 300,
  text: string = 'Image'
): string {
  return getPlaceholderWithText({
    width,
    height,
    text,
    backgroundColor: '6366f1', // Purple
    textColor: 'ffffff', // White
  });
}

/**
 * Generate an avatar placeholder with initials
 */
export function getAvatarPlaceholder(
  initials: string = 'U',
  size: number = 200
): string {
  return getPlaceholderWithText({
    width: size,
    height: size,
    text: initials.toUpperCase(),
    backgroundColor: '6366f1',
    textColor: 'ffffff',
  });
}

/**
 * Unsplash-style placeholder for specific categories
 * Note: Requires internet connection
 */
export function getUnsplashPlaceholder(
  category: 'nature' | 'city' | 'people' | 'food' | 'travel' | 'business' = 'nature',
  width: number = 400,
  height: number = 300
): string {
  return `https://source.unsplash.com/${width}x${height}/?${category}`;
}

/**
 * Default placeholders for common use cases in the app
 */
export const defaultPlaceholders = {
  // User & Profile
  userAvatar: getAvatarPlaceholder('U', 200),
  vendorAvatar: getAvatarPlaceholder('V', 200),
  corporateAvatar: getAvatarPlaceholder('C', 200),
  
  // Campaigns
  campaignBanner: getCategoryPlaceholder('campaign', 1),
  campaignThumbnail: getCategoryPlaceholder('thumbnail', 2),
  
  // Services
  hotelImage: getPicsumPlaceholder(600, 400, 'hotel'),
  restaurantImage: getPicsumPlaceholder(600, 400, 'restaurant'),
  transportImage: getPicsumPlaceholder(600, 400, 'transport'),
  activityImage: getPicsumPlaceholder(600, 400, 'activity'),
  
  // General
  heroBanner: getCategoryPlaceholder('hero', 100),
  productImage: getCategoryPlaceholder('product', 200),
  thumbnailImage: getCategoryPlaceholder('thumbnail', 300),
  
  // Branded
  brandedSquare: getBrandedPlaceholder(400, 400, 'Your Image'),
  brandedWide: getBrandedPlaceholder(800, 400, 'Banner'),
  brandedTall: getBrandedPlaceholder(400, 800, 'Portrait'),
};

/**
 * Get a random placeholder from a pool
 */
export function getRandomPlaceholder(
  width: number = 400,
  height: number = 300
): string {
  const randomSeed = Math.floor(Math.random() * 1000);
  return getPicsumPlaceholder(width, height, randomSeed);
}

/**
 * Convert existing figma:asset hash to consistent placeholder
 * This ensures the same figma asset always maps to the same placeholder
 */
export function figmaHashToPlaceholder(hash: string): string {
  // Generate deterministic seed from hash
  const hashNum = hash.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const imageId = (hashNum % 1000) + 1;
  
  // Choose dimensions based on hash
  const dimensions = [
    { w: 400, h: 300 },
    { w: 800, h: 600 },
    { w: 1200, h: 800 },
    { w: 600, h: 400 },
    { w: 300, h: 300 },
    { w: 500, h: 500 },
  ];
  
  const dimIndex = hashNum % dimensions.length;
  const { w, h } = dimensions[dimIndex];
  
  return getPicsumPlaceholder(w, h, imageId);
}
