# 🚀 Local Development Setup Guide

This guide will help you set up and run the Campaign Management Application locally on VS Code.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager (comes with Node.js)
- **VS Code** - [Download here](https://code.visualstudio.com/)
- **Git** (optional) - [Download here](https://git-scm.com/)

---

## 🛠️ Installation Steps

### 1️⃣ Open Project in VS Code

```bash
# Navigate to your project directory
cd path/to/your/project

# Open in VS Code
code .
```

### 2️⃣ Install Dependencies

Open the integrated terminal in VS Code (`Ctrl + ~` or `Cmd + ~` on Mac) and run:

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

This will install all the required packages including:
- React, React Router
- Bootstrap
- Lucide Icons
- Recharts (for charts)
- Supabase Client
- And all other dependencies

### 3️⃣ Configure Environment Variables (Optional)

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

The Supabase credentials are already configured, but you can customize if needed.

### 4️⃣ Start Development Server

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

The application will automatically open in your default browser at:
```
http://localhost:3000
```

---

## 🎯 Available Scripts

### Development
```bash
npm run dev        # Start development server with hot reload
```

### Build
```bash
npm run build      # Build for production
```

### Preview
```bash
npm run preview    # Preview production build locally
```

### Lint
```bash
npm run lint       # Run ESLint to check code quality
```

---

## 📁 Project Structure

```
/
├── components/           # Reusable UI components
│   ├── corporate/       # Corporate user components
│   ├── user/            # Regular user components
│   ├── vendor/          # Vendor user components
│   └── ui/              # Base UI components
├── features/            # Feature-based organization (120+ files)
│   ├── auth/            # Authentication pages
│   ├── campaigns/       # Campaign management
│   ├── contributors/    # Contributor management
│   ├── messaging/       # Messaging system
│   └── ...
├── utils/               # Utility functions
│   ├── hybridStorage.ts # Hybrid localStorage + Supabase
│   ├── serviceStorage.ts # Service provider data
│   └── ...
├── styles/              # Global CSS styles
├── supabase/            # Backend server code
│   └── functions/
│       └── server/
│           └── index.tsx # API routes
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.html           # HTML template
```

---

## 🔥 Key Features Enabled

### ✅ Hybrid Storage System
- **localStorage**: Fast offline access and caching
- **Supabase**: Persistent cloud storage and cross-device sync
- Automatic background synchronization

### ✅ Backend API
- REST API endpoints for campaigns, profiles, transactions
- Bulk sync operations
- Error handling and logging

### ✅ Multi-User Support
- **User**: Personal campaigns and bookings
- **Vendor**: Service provider dashboard
- **Corporate**: Team management and bulk operations

### ✅ Feature-Rich Application
- Campaign management
- Service provider selection
- Transaction tracking
- Messaging system
- Notifications
- Voucher management
- Analytics and reporting

---

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or specify a different port
npm run dev -- --port 3001
```

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Supabase Connection Issues
- Check your internet connection
- Verify Supabase credentials in `/utils/supabase/info.tsx`
- The app will fallback to localStorage if Supabase is unavailable

### Build Errors
```bash
# Clear build cache
rm -rf dist
npm run build
```

---

## 🔌 Recommended VS Code Extensions

The following extensions will be recommended when you open the project:

1. **ESLint** - Code linting
2. **Prettier** - Code formatting
3. **Tailwind CSS IntelliSense** - CSS class suggestions
4. **Auto Rename Tag** - Automatically rename paired HTML/JSX tags
5. **ES7+ React/Redux/React-Native snippets** - Code snippets
6. **Path Intellisense** - File path autocomplete
7. **HTML CSS Class Completion** - CSS class name completion

Install them by clicking "Install" when prompted, or manually from the Extensions panel.

---

## 🌐 Accessing the Application

### Default Routes

**Authentication:**
- `/` - User type selection
- `/login` - Login page
- `/signup` - Sign up page
- `/forgot-password` - Password recovery

**User Dashboard:**
- `/user/dashboard` - User home
- `/user/campaigns` - View campaigns
- `/user/profile` - User profile

**Vendor Dashboard:**
- `/vendor/dashboard` - Vendor home
- `/vendor/services` - Manage services
- `/vendor/bookings` - View bookings

**Corporate Dashboard:**
- `/corporate/dashboard` - Corporate home
- `/corporate/campaigns` - Team campaigns
- `/corporate/members` - Member management

---

## 💾 Data Persistence

### How It Works

1. **Read Data**: 
   - Checks localStorage first (instant)
   - Falls back to Supabase if not cached

2. **Write Data**: 
   - Updates localStorage immediately (instant UI)
   - Syncs to Supabase in background

3. **Offline Mode**: 
   - Full functionality with localStorage
   - Syncs to cloud when back online

### Testing Storage

Open browser console and run:
```javascript
// Check localStorage
console.log(localStorage.getItem('campaigns'));

// Check if Supabase is connected
fetch('https://nzfmijbcuwnlkdglsmus.supabase.co/functions/v1/make-server-5eb0ec17/health')
  .then(r => r.json())
  .then(console.log);
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The optimized production build will be created in the `/dist` folder.

### Deploy to Hosting
You can deploy the `/dist` folder to any static hosting service:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `/dist` folder
- **GitHub Pages**: Push to `gh-pages` branch
- **Firebase Hosting**: `firebase deploy`

---

## 🆘 Getting Help

If you encounter any issues:

1. Check the troubleshooting section above
2. Review error messages in the browser console
3. Check the network tab for API call failures
4. Verify all dependencies are installed correctly
5. Ensure Node.js version is 18 or higher

---

## 📝 Notes

- The application uses **Bootstrap 5** for styling (CSS converted from Tailwind)
- All data is stored with user-specific keys
- Background sync runs every 30 seconds when online
- Service provider data is centralized in `serviceStorage.ts`

---

## ✨ Happy Coding!

Your development environment is now ready. Start building amazing features! 🎉

For questions about specific features, check the documentation files in `/docs/` and `/guidelines/`.
