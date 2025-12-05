# 🖼️ Placeholder Images Guide

## Overview

Your application now automatically converts all `figma:asset/` imports to placeholder images, so you don't need the actual Figma assets to run the app!

---

## 🔧 How It Works

### Automatic Conversion (Vite Plugin)

The `vite.config.ts` includes a custom plugin that intercepts all `figma:asset/` imports and converts them to placeholder image URLs.

**Example:**
```typescript
// Your code (no changes needed!)
import imgHero from "figma:asset/bb20e50eb8c9aa1c9fbcd4a99e70b4829d5c24f3.png";

// Automatically becomes:
// https://picsum.photos/800/600?random=456
```

### Deterministic Placeholders

The same Figma asset hash always generates the same placeholder image, ensuring consistency across page reloads.

---

## 📚 Available Placeholder Services

Your app uses three different placeholder services for variety:

### 1. **Picsum Photos** (Real Photos)
```
https://picsum.photos/800/600?random=123
```
- ✅ Beautiful real photos
- ✅ Great for realistic mockups
- ✅ Random variety

### 2. **Placehold.co** (Branded Purple)
```
https://placehold.co/800x600/6366f1/white?text=Image+123
```
- ✅ Matches your purple branding
- ✅ Shows custom text
- ✅ Clean, professional look

### 3. **Placeholder.com** (Simple)
```
https://via.placeholder.com/800x600/6366f1/ffffff?text=Placeholder+123
```
- ✅ Fast loading
- ✅ Reliable
- ✅ Classic style

---

## 🎨 Using Placeholder Utilities

### Import the Utilities

```typescript
import { 
  getCategoryPlaceholder,
  getAvatarPlaceholder,
  getBrandedPlaceholder,
  defaultPlaceholders,
} from '../utils/placeholderImages';
```

### Common Use Cases

#### 1. User Avatars

```typescript
// Generic avatar
const avatar = getAvatarPlaceholder('JD', 200); // "JD" initials

// Pre-defined avatars
const userAvatar = defaultPlaceholders.userAvatar;
const vendorAvatar = defaultPlaceholders.vendorAvatar;
```

#### 2. Campaign Images

```typescript
// Campaign banner
const banner = getCategoryPlaceholder('campaign', 1);

// Campaign thumbnail
const thumbnail = getCategoryPlaceholder('thumbnail', 2);
```

#### 3. Service Provider Images

```typescript
// Pre-defined service images
const hotelImg = defaultPlaceholders.hotelImage;
const restaurantImg = defaultPlaceholders.restaurantImage;
const transportImg = defaultPlaceholders.transportImage;
const activityImg = defaultPlaceholders.activityImage;

// Or generate custom
const serviceImg = getCategoryPlaceholder('service', 'hotel-123');
```

#### 4. Branded Placeholders

```typescript
// Purple-themed placeholder with text
const branded = getBrandedPlaceholder(800, 400, 'My Campaign');

// Pre-defined branded sizes
const square = defaultPlaceholders.brandedSquare;
const wide = defaultPlaceholders.brandedWide;
const tall = defaultPlaceholders.brandedTall;
```

#### 5. Hero Banners

```typescript
const hero = getCategoryPlaceholder('hero', 100);
// Returns: 1920x1080 image
```

---

## 📏 Available Categories

```typescript
type PlaceholderCategory = 
  | 'avatar'      // 200x200 - Profile pictures
  | 'campaign'    // 800x600 - Campaign images
  | 'service'     // 600x400 - Service provider images
  | 'product'     // 400x400 - Product images
  | 'banner'      // 1200x400 - Wide banners
  | 'profile'     // 400x400 - Profile headers
  | 'thumbnail'   // 300x200 - Small previews
  | 'hero';       // 1920x1080 - Hero sections
```

---

## 💡 Examples in Components

### Example 1: Campaign Card

```typescript
import { getCategoryPlaceholder } from '../../utils/placeholderImages';

function CampaignCard({ campaign }) {
  const placeholderImage = getCategoryPlaceholder('campaign', campaign.id);
  
  return (
    <div className="campaign-card">
      <img 
        src={campaign.image || placeholderImage} 
        alt={campaign.name}
        className="campaign-image"
      />
      <h3>{campaign.name}</h3>
    </div>
  );
}
```

### Example 2: User Profile

```typescript
import { getAvatarPlaceholder } from '../../utils/placeholderImages';

function UserProfile({ user }) {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
  
  const avatar = getAvatarPlaceholder(initials, 200);
  
  return (
    <div className="profile">
      <img 
        src={user.avatar || avatar} 
        alt={user.name}
        className="profile-avatar"
      />
      <h2>{user.name}</h2>
    </div>
  );
}
```

### Example 3: Service Provider

```typescript
import { defaultPlaceholders } from '../../utils/placeholderImages';

function ServiceCard({ service }) {
  // Use category-specific placeholders
  const placeholders = {
    'Accommodation': defaultPlaceholders.hotelImage,
    'Dining': defaultPlaceholders.restaurantImage,
    'Transport': defaultPlaceholders.transportImage,
    'Activity': defaultPlaceholders.activityImage,
  };
  
  const placeholder = placeholders[service.category] || defaultPlaceholders.productImage;
  
  return (
    <div className="service-card">
      <img src={service.image || placeholder} alt={service.name} />
      <h3>{service.name}</h3>
    </div>
  );
}
```

### Example 4: Dynamic Placeholder

```typescript
import { getBrandedPlaceholder } from '../../utils/placeholderImages';

function DynamicImage({ width, height, title }) {
  const placeholder = getBrandedPlaceholder(width, height, title);
  
  return (
    <img 
      src={placeholder} 
      alt={title}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
}
```

---

## 🔄 Replacing Figma Imports (Optional)

If you want to manually replace Figma imports with placeholders:

### Before:
```typescript
import imgHero from "figma:asset/bb20e50eb8c9aa1c9fbcd4a99e70b4829d5c24f3.png";
```

### After:
```typescript
import { getCategoryPlaceholder } from './utils/placeholderImages';

const imgHero = getCategoryPlaceholder('hero', 1);
```

**Note:** This is optional! The Vite plugin automatically handles figma:asset imports.

---

## 🎯 Default Placeholders Reference

```typescript
import { defaultPlaceholders } from './utils/placeholderImages';

// Available defaults:
defaultPlaceholders.userAvatar          // User profile picture
defaultPlaceholders.vendorAvatar        // Vendor profile picture
defaultPlaceholders.corporateAvatar     // Corporate profile picture
defaultPlaceholders.campaignBanner      // Campaign header image
defaultPlaceholders.campaignThumbnail   // Campaign preview image
defaultPlaceholders.hotelImage          // Hotel/accommodation image
defaultPlaceholders.restaurantImage     // Restaurant/dining image
defaultPlaceholders.transportImage      // Transport/travel image
defaultPlaceholders.activityImage       // Activity/event image
defaultPlaceholders.heroBanner          // Large hero section
defaultPlaceholders.productImage        // Generic product image
defaultPlaceholders.thumbnailImage      // Small thumbnail
defaultPlaceholders.brandedSquare       // Purple branded square
defaultPlaceholders.brandedWide         // Purple branded wide
defaultPlaceholders.brandedTall         // Purple branded tall
```

---

## 🚀 Advanced Usage

### Custom Dimensions

```typescript
import { getPicsumPlaceholder, getPlaceholderWithText } from './utils/placeholderImages';

// Real photo with custom size
const customPhoto = getPicsumPlaceholder(1000, 500, 'unique-seed');

// Custom text and colors
const customBranded = getPlaceholderWithText({
  width: 600,
  height: 400,
  text: 'My Custom Text',
  backgroundColor: 'ff6b6b', // Red
  textColor: '000000',       // Black
});
```

### Random Placeholders

```typescript
import { getRandomPlaceholder } from './utils/placeholderImages';

// Different image each time
const random1 = getRandomPlaceholder(400, 300);
const random2 = getRandomPlaceholder(400, 300);
// random1 !== random2
```

### Unsplash Categories

```typescript
import { getUnsplashPlaceholder } from './utils/placeholderImages';

const natureImg = getUnsplashPlaceholder('nature', 800, 600);
const cityImg = getUnsplashPlaceholder('city', 800, 600);
const peopleImg = getUnsplashPlaceholder('people', 800, 600);
const foodImg = getUnsplashPlaceholder('food', 800, 600);
```

---

## 🌐 Online vs Offline

### Online (Recommended)
All placeholder services require an internet connection. The images load from external URLs.

### Offline Alternative
If you need offline placeholders, consider:

1. **Generate and download images:**
   ```bash
   # Download placeholders to /public/placeholders/
   wget https://picsum.photos/400/300 -O public/placeholders/default-400x300.jpg
   ```

2. **Use data URIs:**
   ```typescript
   const placeholder = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%236366f1" width="400" height="300"/></svg>';
   ```

3. **SVG placeholders:**
   ```typescript
   const svgPlaceholder = `data:image/svg+xml;base64,${btoa(`
     <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
       <rect fill="#6366f1" width="400" height="300"/>
       <text x="50%" y="50%" fill="#fff" text-anchor="middle">Placeholder</text>
     </svg>
   `)}`;
   ```

---

## 📊 Performance Considerations

### Caching
All placeholder services support browser caching, so images load faster after the first request.

### Loading States
Consider adding loading states for placeholder images:

```typescript
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { getCategoryPlaceholder } from './utils/placeholderImages';

function MyComponent() {
  const placeholder = getCategoryPlaceholder('campaign', 1);
  
  return (
    <ImageWithFallback
      src={placeholder}
      alt="Campaign"
      className="campaign-image"
    />
  );
}
```

---

## 🎨 Customization

### Change Default Colors

Edit `/utils/placeholderImages.ts`:

```typescript
// Change from purple to your brand color
backgroundColor: 'ff6b6b', // Red instead of purple
textColor: 'ffffff',       // White text
```

### Add New Categories

```typescript
// In placeholderImages.ts
export type PlaceholderCategory = 
  | 'avatar'
  | 'campaign'
  | 'myNewCategory'; // Add your category

// Then in getCategoryPlaceholder:
const presets = {
  avatar: { width: 200, height: 200 },
  campaign: { width: 800, height: 600 },
  myNewCategory: { width: 1000, height: 500 }, // Add preset
};
```

---

## ✅ Testing

### Test All Placeholders

```typescript
import * as placeholders from './utils/placeholderImages';

// Test each function
console.log('Avatar:', placeholders.getAvatarPlaceholder('AB', 200));
console.log('Campaign:', placeholders.getCategoryPlaceholder('campaign', 1));
console.log('Branded:', placeholders.getBrandedPlaceholder(400, 300, 'Test'));
console.log('Defaults:', placeholders.defaultPlaceholders);
```

### Visual Test Page

Create a test page to see all placeholders:

```typescript
import { defaultPlaceholders } from './utils/placeholderImages';

function PlaceholderTestPage() {
  return (
    <div className="placeholder-test">
      <h1>Placeholder Gallery</h1>
      {Object.entries(defaultPlaceholders).map(([key, url]) => (
        <div key={key} className="placeholder-item">
          <h3>{key}</h3>
          <img src={url} alt={key} />
        </div>
      ))}
    </div>
  );
}
```

---

## 🔍 Troubleshooting

### Images Not Loading?

1. **Check internet connection** - Placeholder services are online
2. **Check browser console** - Look for CORS or network errors
3. **Try different service** - Switch between picsum, placehold.co, and placeholder.com

### Same Images Everywhere?

This is by design! The same hash generates the same placeholder for consistency.

To get different images, use different seeds:
```typescript
getCategoryPlaceholder('campaign', 1);  // Image A
getCategoryPlaceholder('campaign', 2);  // Image B
getCategoryPlaceholder('campaign', 3);  // Image C
```

### Images Too Large/Small?

Adjust dimensions:
```typescript
getPicsumPlaceholder(800, 600);  // Larger
getPicsumPlaceholder(200, 150);  // Smaller
```

---

## 📝 Summary

✅ **Automatic** - Figma assets automatically become placeholders  
✅ **No Changes Needed** - Your existing code works as-is  
✅ **Utilities Available** - Use helper functions for new images  
✅ **Branded** - Purple theme matches your app  
✅ **Consistent** - Same hash = same image  
✅ **Variety** - Multiple placeholder services  
✅ **Flexible** - Easy to customize  

**Your app now works without any Figma assets!** 🎉

---

## 🚀 Quick Start

```bash
# Just run your app - placeholders work automatically!
npm run dev

# No additional setup needed!
```

All your `figma:asset/` imports will automatically become beautiful placeholder images! 🖼️✨
