# Campaign Management App

A comprehensive multi-page web application for managing group campaigns, contributions, bookings, and vouchers with purple branding and sidebar navigation.

## Features

- **User Profile Management** - Edit personal info, security settings, profile completion tracking
- **Campaign Management** - Create, manage, and contribute to group campaigns
- **Service Providers** - Browse accommodations, catering, transport, and activities
- **Cart & Booking** - Complete room booking and service selection
- **Messaging System** - Full chat functionality with contributors
- **Notifications** - Real-time campaign invitations and updates
- **Vouchers** - View and manage campaign vouchers with QR codes
- **Contributors Management** - Track member performance, contributions, refunds
- **Campaign Analytics** - Real-time data flow across all pages
- **Transactions Dashboard** - View all campaign transactions
- **Campaign History** - Track completed and ongoing campaigns

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS v4** for styling
- **Vite** for build tooling
- **Shadcn/ui** component library
- **Lucide React** for icons
- **Recharts** for data visualization
- **Sonner** for toast notifications
- **LocalStorage** for data persistence

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **VS Code** - [Download here](https://code.visualstudio.com/)

## Setup Instructions

### 1. Clone or Download the Project

If you have the project files, navigate to the project directory in your terminal.

### 2. Install Dependencies

Open the terminal in VS Code (Terminal → New Terminal) and run:

```bash
npm install
```

Or if you use yarn:

```bash
yarn install
```

### 3. Start the Development Server

Run the following command:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

### 4. Open in Browser

The app will start on `http://localhost:5173` (or another port if 5173 is busy).

Open your browser and navigate to the URL shown in the terminal.

## VS Code Setup

### Recommended Extensions

Install these VS Code extensions for the best development experience:

1. **ES7+ React/Redux/React-Native snippets** - Code snippets
2. **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
3. **TypeScript Vue Plugin (Volar)** - TypeScript support
4. **Prettier - Code formatter** - Code formatting
5. **ESLint** - Code linting

### VS Code Settings

Create a `.vscode/settings.json` file with:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## Project Structure

```
/
├── App.tsx                          # Main app component with routing
├── components/
│   ├── ui/                          # Shadcn UI components
│   ├── Sidebar.tsx                  # Navigation sidebar
│   ├── ProfilePage.tsx              # User profile management
│   ├── DashboardPage.tsx            # Main dashboard
│   ├── CampaignsPage.tsx            # Campaign listing
│   ├── VouchersPage.tsx             # Voucher management
│   ├── TransactionsPage.tsx         # Transaction history
│   ├── MessagingPage.tsx            # Chat functionality
│   ├── ContributePage.tsx           # Contribution flow
│   ├── CreateCampaignPage.tsx       # Campaign creation
│   ├── ManageCampaignPage.tsx       # Campaign management
│   ├── ContributorsPage.tsx         # Contributor management
│   ├── ServiceDetailPage.tsx        # Service details
│   ├── NotificationsDialog.tsx      # Notification system
│   └── ...                          # Other components
├── imports/                         # Figma imported assets
│   ├── svg-*.ts                     # SVG paths
│   └── ...
├── styles/
│   └── globals.css                  # Global styles and Tailwind config
└── package.json                     # Dependencies

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Features & Usage

### Profile Management
1. Click "Profile" in the sidebar
2. Edit personal information, security settings
3. Track profile completion progress
4. Your profile name appears throughout the app in campaigns

### Creating a Campaign
1. Navigate to "How it Works" or Dashboard
2. Click "Create Campaign"
3. Select services (rooms, catering, transport, activities)
4. Add to cart and proceed to campaign creation
5. Add members via email
6. Set dates and contribution frequency
7. Review and create campaign

### Managing Campaigns
1. Go to "Campaigns" page
2. View "Contributing" or "Managing" campaigns
3. Click a campaign to see details
4. Track contributions, manage members, view analytics

### Contributing to Campaigns
1. Select a campaign you're contributing to
2. Click "Contribute Now"
3. Choose payment method
4. Make one-time or recurring contributions

### Messaging
1. Navigate to "Messages" in sidebar
2. Select a contact or campaign group
3. Send messages with real-time updates

### Vouchers
1. Go to "Vouchers" page
2. View vouchers for completed campaigns
3. Click to see QR code, voucher details
4. Share, download, or save vouchers

## Data Persistence

The app uses **localStorage** to persist:
- User profile information
- Created campaigns
- Notifications
- Cart items (session-based)

## Customization

### Colors
The app uses a purple theme (`#8363f2`). To change:
1. Update colors in `styles/globals.css`
2. Search and replace hex color codes in components

### User Profile
Default profile data is in `App.tsx`. Modify the initial `userProfile` state:

```typescript
const [userProfile, setUserProfile] = useState<UserProfile>({
  fullNames: 'Your Name',
  surname: 'Your Surname',
  email: 'your.email@example.com',
  phoneNumber: '+27 XX XXX XXXX',
  address: 'Your Address'
});
```

### Sample Campaigns
Default campaigns are defined in `App.tsx` in the `createdCampaigns` state.

## Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port. Check the terminal output.

### Module Not Found Errors
Run `npm install` again to ensure all dependencies are installed.

### Tailwind Styles Not Working
1. Make sure `styles/globals.css` is imported in your entry file
2. Check that Tailwind CSS IntelliSense extension is installed

### Images Not Loading
The app uses Figma asset imports (`figma:asset/...`). In a local environment, these may need to be replaced with actual image URLs or local image files.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Known Limitations

- **Figma Assets**: Images imported from Figma (`figma:asset/...`) work in Figma Make but may need conversion for local development
- **Authentication**: No real authentication implemented (uses mock user data)
- **API Integration**: No backend API (all data stored in localStorage)

## Future Enhancements

- Backend API integration
- Real authentication system
- Payment gateway integration
- Email notifications
- Mobile responsive improvements
- Progressive Web App (PWA) support

## Support

For issues or questions:
1. Check this README
2. Review component code comments
3. Check browser console for errors

## License

This project is for educational/demonstration purposes.

---

**Built with React, TypeScript, and Tailwind CSS**
