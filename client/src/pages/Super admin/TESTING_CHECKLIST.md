# Campaign Management Dashboard - Testing Checklist

## Navigation Tests

### Sidebar Navigation
- [ ] Click Dashboard - should show Admin Overview
- [ ] Click Campaigns - should show Campaigns Management
- [ ] Click Vouchers - should show Voucher Management
- [ ] Click Transactions - should show Transaction Management
- [ ] Click Vendors - should show "Coming soon" message
- [ ] Click Members - should show User Management
- [ ] Click Reports - should show Reports & Analytics
- [ ] Click Profile - should show User Profile
- [ ] Click Social - should show "Coming soon" message
- [ ] Click Draft - should show "Coming soon" message

### Active State
- [ ] Active menu item is highlighted in indigo
- [ ] Inactive menu items are gray
- [ ] When viewing campaign detail, Campaigns is highlighted

## Screen-Specific Tests

### Admin Overview (Dashboard)
- [ ] Shows 4 stat cards (Users, Campaigns, Vendors, Corporate)
- [ ] Bar chart renders correctly
- [ ] Pie chart with 32% active campaigns
- [ ] QR code displays
- [ ] Download QR button present
- [ ] Recent activity list shows 4 items
- [ ] All icons display correctly

### Campaigns Management
- [ ] Shows 4 stat cards with correct numbers
- [ ] Campaign table displays all 5 campaigns
- [ ] Each campaign shows image, name, owner, vendors, goal/raised, status, date
- [ ] Status badges show correct colors (Active=green, Pending=yellow, etc.)
- [ ] Clicking campaign row opens Campaign Dashboard
- [ ] Sort by button present
- [ ] Tab shows "All"

### Campaign Dashboard (Detail View)
- [ ] Shows campaign header with title
- [ ] Close button (X) returns to campaigns list
- [ ] Header image displays
- [ ] 4 stats cards: Budget, Contributions, Members, Activities
- [ ] Vendors table with 5 vendors
- [ ] Status badges (Fulfilled=green, For Fill=yellow)
- [ ] Contributors section with progress bars
- [ ] Pause Campaign button opens dialog
- [ ] Delete Campaign button opens dialog
- [ ] Dialogs have notification checkboxes

### Voucher Management
- [ ] Shows 4 stat cards
- [ ] Voucher table displays correctly
- [ ] Status badges show correct colors
- [ ] View voucher button opens dialog with QR code
- [ ] Edit voucher button opens edit dialog
- [ ] Delete voucher button present
- [ ] All voucher details editable in edit dialog

### Transaction Management
- [ ] Shows transaction table
- [ ] Status badges display (Completed, Pending, Failed, Refund)
- [ ] View details button opens transaction detail dialog
- [ ] Edit button opens edit dialog
- [ ] Delete button opens confirmation dialog
- [ ] Filter and sort buttons present

### Reports & Analytics
- [ ] Shows tab for "Latest"
- [ ] Stat cards display correctly
- [ ] Contribution trend chart renders
- [ ] Campaign performance chart renders
- [ ] Pie chart for vendor distribution
- [ ] Top performers section with avatars and ratings
- [ ] Reports table with download/schedule buttons

### User Management
- [ ] Shows 4 stat cards
- [ ] User table displays all users
- [ ] Status badges (Active=green, Suspended=red)
- [ ] Filter dropdown works
- [ ] All user data displays correctly

### User Profile
- [ ] Shows user details
- [ ] Edit user button opens edit dialog
- [ ] Suspend user button opens suspend dialog
- [ ] Delete user button opens delete dialog
- [ ] All dialogs have proper forms and validations
- [ ] Close button returns to previous screen

## Layout & Header Tests

### Shared Header
- [ ] Search bar present on all screens
- [ ] Create button present (except on detail views)
- [ ] Notification bell icon with badge
- [ ] User icon present
- [ ] Header is consistent across all screens

### Responsive Behavior
- [ ] Sidebar stays fixed on left
- [ ] Content area scrolls independently
- [ ] No layout breaking on different content sizes

## Data & State Tests

### Data Display
- [ ] All mock data displays correctly
- [ ] Numbers format properly (R1,000 format)
- [ ] Dates display correctly
- [ ] Status colors match status values

### State Management
- [ ] Navigation state persists correctly
- [ ] Campaign selection works
- [ ] Dialog open/close states work
- [ ] Form inputs update correctly

## Dialog/Modal Tests

### Campaign Dialogs
- [ ] Pause dialog has notification options
- [ ] Delete dialog has notification options
- [ ] Both dialogs can be closed

### Voucher Dialogs
- [ ] View voucher shows all details + QR code
- [ ] Edit voucher has all form fields
- [ ] Forms are pre-populated with current values

### Transaction Dialogs
- [ ] View details shows complete transaction info
- [ ] Edit transaction has editable fields
- [ ] Delete confirmation dialog works

### User Dialogs
- [ ] Edit user dialog has all fields
- [ ] Suspend dialog has warning and reason field
- [ ] Delete dialog has confirmation warning

## Visual Tests

### Colors & Styling
- [ ] Indigo theme consistent throughout
- [ ] Status badge colors correct
- [ ] Hover states work on buttons
- [ ] Cards have proper shadows/borders
- [ ] Typography is consistent

### Icons
- [ ] All lucide-react icons render
- [ ] Icon sizes are consistent
- [ ] Icons align properly with text

## Edge Cases

### Empty States
- [ ] Handle missing images gracefully (ImageWithFallback)
- [ ] Empty tables display properly
- [ ] Coming soon screens show message

### Interactions
- [ ] Multiple rapid clicks don't break navigation
- [ ] Dialog close on backdrop click works
- [ ] All buttons have proper hover states
- [ ] No console errors during navigation

## Performance

- [ ] Initial load is fast
- [ ] Navigation transitions are smooth
- [ ] No unnecessary re-renders
- [ ] Images load properly

## Accessibility

- [ ] Dialog titles present (screen reader friendly)
- [ ] Buttons have proper labels
- [ ] Color contrast is sufficient
- [ ] Keyboard navigation works (Tab, Enter, Esc)

## Code Quality

- [ ] No TypeScript errors
- [ ] No console errors or warnings
- [ ] Components are properly typed
- [ ] Imports are clean and organized
