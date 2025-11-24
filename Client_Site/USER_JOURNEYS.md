# 🗺️ KEAHCONT SYSTEM - COMPLETE USER JOURNEYS FLOW

## 🎯 System Overview
Multi-page web application with three distinct user types, each with their own journey and capabilities.

---

## 👤 USER TYPES & ACCESS PATHS

```
┌─────────────────────────────────────────────────────────────────┐
│                    LANDING / LOGIN PAGE                          │
│                    Profile Selection                             │
└────────────────┬────────────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │  User Profile   │
        │  (localStorage) │
        └────────┬────────┘
                 │
        ┌────────┴────────┬──────────────────┐
        ↓                 ↓                  ↓
    ┌───────┐        ┌────────┐        ┌──────────┐
    │ USER  │        │ VENDOR │        │ CORPORATE│
    └───┬───┘        └───┬────┘        └────┬─────┘
        │                │                   │
        ↓                ↓                   ↓
   Dashboard        Dashboard           Dashboard
```

---

# 1️⃣ USER JOURNEY (Individual/Group Member)

## 📍 Entry Point: User Dashboard

```
┌──────────────────────────────────────────────────────────────────┐
│                        USER DASHBOARD                             │
│  • Profile Overview (name, email, avatar)                        │
│  • Quick Stats (Active Campaigns, Total Contributions)           │
│  • Notifications Bell (unread count)                             │
│  • Shopping Cart Icon                                            │
│  • Navigation: Campaigns | Vouchers | Transactions | Profile    │
└───────────────────────────┬──────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
   CAMPAIGNS           SERVICES            PROFILE
```

---

## 🎯 USER JOURNEY 1: CREATE & MANAGE GROUP CAMPAIGN

```
START: Dashboard → Click "Create Campaign"
    │
    ↓
┌─────────────────────────────────────────┐
│   CREATE CAMPAIGN WIZARD                │
│                                         │
│ STEP 1: Campaign Type Selection        │
│   ○ Individual Campaign                │
│   ○ Group Campaign ✓                   │
│                                         │
│ STEP 2: Basic Information              │
│   • Campaign Name                      │
│   • Category (vacation/beach/etc)      │
│   • Description                        │
│   • Start Date & End Date              │
│   • Location                           │
│   • Upload Campaign Image              │
│                                         │
│ STEP 3: Add Members                    │
│   • Email invitations                  │
│   • Member avatars                     │
│   • Member names                       │
│   [Michael, Sarah, David, Emma...]     │
│                                         │
│ STEP 4: Browse & Add Services          │
│   ┌─────────────────────────────────┐  │
│   │ SERVICE CATEGORIES:             │  │
│   │ • Accommodation (12 services)   │  │
│   │ • Food & Dining (8 services)    │  │
│   │ • Transport (4 services)        │  │
│   │ • Activities (4 services)       │  │
│   │                                 │  │
│   │ 28 Services across:             │  │
│   │ • Cape Town                     │  │
│   │ • Durban                        │  │
│   │ • Zanzibar                      │  │
│   │                                 │  │
│   │ Service Providers (12 unique):  │  │
│   │ - The Table Bay Hotel           │  │
│   │ - Cape Grace Hotel              │  │
│   │ - Beverly Hills Hotel           │  │
│   │ - Knysna Waterfront Lodge       │  │
│   │ - Bo-Kaap Culinary              │  │
│   │ - Ocean Basket Gourmet          │  │
│   │ - Stellenbosch Wine Tours       │  │
│   │ - Durban Harbour Cruises        │  │
│   │ - Garden Route Car Hire         │  │
│   │ - Zanzibar Beach Resort         │  │
│   │ - Stone Town Restaurant         │  │
│   │ - Zanzibar Spice Tours          │  │
│   └─────────────────────────────────┘  │
│                                         │
│ STEP 5: Service Details & Cart         │
│   • Quantity selection                 │
│   • Date selection (check-in/out)      │
│   • Nights/Duration                    │
│   • Add to cart                        │
│   • Review cart items                  │
│                                         │
│ STEP 6: Contribution Settings          │
│   • Frequency:                         │
│     - Once-off                         │
│     - Weekly                           │
│     - Monthly                          │
│   • Calculate total amount             │
│   • Set campaign goal                  │
│                                         │
│ STEP 7: Review & Submit                │
│   • Preview all details                │
│   • Campaign summary                   │
│   • Total cost breakdown               │
│   • Member list                        │
│   • Service list                       │
│                                         │
│   [Submit for Vendor Approval]         │
└─────────────┬───────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────┐
│   CAMPAIGN SUBMITTED                    │
│   Status: PENDING                       │
│   • Yellow "Pending Approval" badge     │
│   • Waiting for vendor to review        │
│   • Notification sent to vendor          │
│   • Email notification to members       │
└─────────────┬───────────────────────────┘
              │
      ┌───────┴────────┐
      ↓                ↓
  ACCEPTED         DECLINED
      │                │
      ↓                ↓
┌──────────┐    ┌─────────────┐
│ Active   │    │ Inactive    │
│ ✓ Normal │    │ ✗ Greyscale │
│ ✓ 0-100% │    │ ✗ Red badge │
│ ✓ Can    │    │ ✗ Cannot    │
│   contrib│    │   contribute│
└────┬─────┘    └─────────────┘
     │
     ↓
CAMPAIGN ACTIVE
```

---

## 💰 USER JOURNEY 2: CONTRIBUTE TO CAMPAIGN

```
START: Dashboard → Campaigns → Select Campaign
    │
    ↓
┌─────────────────────────────────────────┐
│   CAMPAIGNS PAGE                        │
│                                         │
│ Filter/Sort Options:                   │
│   • Calendar view                      │
│   • History                            │
│   • Sort by (recent/amount/date)       │
│                                         │
│ Campaign Cards Display:                │
│   ┌─────────────────────────────────┐  │
│   │ [Campaign Image]                │  │
│   │                                 │  │
│   │ Status Badges:                  │  │
│   │ • Green border = Accepted       │  │
│   │ • Yellow badge = Pending        │  │
│   │ • Red badge + Grey = Declined   │  │
│   │                                 │  │
│   │ Campaign Name                   │  │
│   │ Service Provider                │  │
│   │ Dates | Services                │  │
│   │ Campaign Members (avatars)      │  │
│   │                                 │  │
│   │ Goal: R45,000                   │  │
│   │ Contributed: R33,300            │  │
│   │ Progress: 74% [████████░░]      │  │
│   │                                 │  │
│   │ [Contribute Button] ←────────┐  │  │
│   └─────────────────────────────┘│  │  │
│                                  │  │  │
│ Click "Contribute" ──────────────┘  │  │
└─────────────────┬───────────────────────┘
                  │
                  ↓
         ┌────────────────┐
         │ Status Check   │
         │ Is Declined?   │
         └────┬──────┬────┘
              │      │
         YES  │      │ NO
              ↓      ↓
        ┌─────────┐  │
        │ BLOCKED │  │
        │ Error   │  │
        │ Toast   │  │
        └─────────┘  │
                     ↓
┌─────────────────────────────────────────┐
│   CONTRIBUTE PAGE                       │
│                                         │
│ Campaign Preview:                      │
│   • Campaign image                     │
│   • Campaign name                      │
│   • Goal & Current amount              │
│   • Progress bar                       │
│                                         │
│ Contribution Amount:                   │
│   Quick Select:                        │
│   ○ R100  ○ R500  ○ R1000             │
│   ○ Custom Amount: [____]             │
│                                         │
│ Payment Method:                        │
│   ○ Debit Card                         │
│   ○ EFT                                │
│   ○ Ewallet Balance                    │
│                                         │
│ ☑ I agree to terms & conditions        │
│                                         │
│ [Cancel]  [Confirm Contribution]       │
└─────────────┬───────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────┐
│   PAYMENT PROCESSING                    │
│   • Update campaign progress            │
│   • Update localStorage                 │
│   • Add transaction record              │
│   • Create notification                 │
│   • Send success toast                  │
└─────────────┬───────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────┐
│   UPDATED CAMPAIGN                      │
│   • New contribution added              │
│   • Progress bar updated                │
│   • Transaction history updated         │
│   • Real-time analytics updated         │
└─────────────────────────────────────────┘
```

---

## 📊 USER JOURNEY 3: MANAGE CAMPAIGN (Organizer)

```
START: Dashboard → Campaigns → Select "My Campaign" → Manage
    │
    ↓
┌─────────────────────────────────────────┐
│   MANAGE CAMPAIGN PAGE                  │
│                                         │
│ Tabs:                                  │
│   • Overview                           │
│   • Members                            │
│   • Schedule                           │
│   • Analytics                          │
│                                         │
│ OVERVIEW TAB:                          │
│   • Campaign details                   │
│   • Total contributions                │
│   • Services booked                    │
│   • Itinerary view                     │
│   • Edit campaign info                 │
│                                         │
│ MEMBERS TAB:                           │
│   ┌─────────────────────────────────┐  │
│   │ MEMBER MANAGEMENT               │  │
│   │                                 │  │
│   │ Member List:                    │  │
│   │ • Michael Chen                  │  │
│   │   Contributed: R5,550 (74%)     │  │
│   │   [View] [Remove] [Refund]      │  │
│   │                                 │  │
│   │ • Sarah Johnson                 │  │
│   │   Contributed: R5,550 (74%)     │  │
│   │   [View] [Remove] [Refund]      │  │
│   │                                 │  │
│   │ • David Williams                │  │
│   │   Contributed: R5,550 (74%)     │  │
│   │   [View] [Remove] [Refund]      │  │
│   │                                 │  │
│   │ Actions:                        │  │
│   │ • Add Member [+]                │  │
│   │ • Remove Member (with reason)   │  │
│   │ • Replace Member                │  │
│   │ • Issue Refund                  │  │
│   │                                 │  │
│   │ All changes persist to          │  │
│   │ localStorage ✓                  │  │
│   └─────────────────────────────────┘  │
│                                         │
│ SCHEDULE TAB:                          │
│   • Contribution schedule              │
│   • Payment milestones                 │
│   • Upcoming payments                  │
│   • Payment history                    │
│                                         │
│ ANALYTICS TAB:                         │
│   • Real-time contribution tracking    │
│   • Member performance charts          │
│   • Progress analytics                 │
│   • Contribution trends                │
└─────────────────────────────────────────┘
```

---

## 👥 USER JOURNEY 4: CONTRIBUTOR VIEW

```
START: Dashboard → Campaigns → View Campaign Detail
    │
    ↓
┌─────────────────────────────────────────┐
│   VIEW CAMPAIGN DETAIL PAGE             │
│                                         │
│ Campaign Information:                  │
│   • Hero image                         │
│   • Campaign name & description        │
│   • Organizer info                     │
│   • Dates & location                   │
│   • Category                           │
│                                         │
│ Contribution Overview:                 │
│   • Your contributions                 │
│   • Total contributed                  │
│   • Remaining amount                   │
│   • Next payment due                   │
│   • Payment frequency                  │
│                                         │
│ Services Booked:                       │
│   • Service images & details           │
│   • Provider info                      │
│   • Star ratings (3★)                  │
│   • Cost breakdown                     │
│                                         │
│ Members:                               │
│   • All member avatars                 │
│   • Member names                       │
│   • Individual contributions           │
│   • Performance indicators             │
│                                         │
│ Itinerary:                             │
│   • Day-by-day schedule                │
│   • Activities planned                 │
│   • Timings                            │
│                                         │
│ Actions:                               │
│   [Contribute More]                    │
│   [View Transactions]                  │
│   [Share Campaign]                     │
│   [Contact Organizer]                  │
└─────────────────────────────────────────┘
```

---

## 🛒 USER JOURNEY 5: BROWSE & BOOK SERVICES

```
START: Dashboard → Browse Services
    │
    ↓
┌─────────────────────────────────────────┐
│   SERVICES MARKETPLACE                  │
│                                         │
│ Filters:                               │
│   • Location (Cape Town/Durban/etc)    │
│   • Category (Accommodation/Food/etc)  │
│   • Price range                        │
│   • Rating                             │
│   • Availability                       │
│                                         │
│ Service Grid (28 Services):            │
│   ┌─────────────────────────────────┐  │
│   │ ACCOMMODATION (12)              │  │
│   │ • Deluxe Ocean View Room        │  │
│   │   The Table Bay Hotel           │  │
│   │   R8,500/night                  │  │
│   │   Cape Town                     │  │
│   │   [View Details] [Add to Cart]  │  │
│   │                                 │  │
│   │ • Executive Conference Room     │  │
│   │   Cape Grace Hotel              │  │
│   │   R6,500/night                  │  │
│   │   [View Details] [Add to Cart]  │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ FOOD & DINING (8)               │  │
│   │ • Cape Malay Cooking Class      │  │
│   │   Bo-Kaap Culinary              │  │
│   │   R2,500/person                 │  │
│   │   [View Details] [Add to Cart]  │  │
│   │                                 │  │
│   │ • Seafood Platter Experience    │  │
│   │   Ocean Basket Gourmet          │  │
│   │   R1,600/person                 │  │
│   │   [View Details] [Add to Cart]  │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ TRANSPORT (4)                   │  │
│   │ • Luxury SUV Rental             │  │
│   │   Garden Route Car Hire         │  │
│   │   R8,500/7 days                 │  │
│   │   [View Details] [Add to Cart]  │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ ACTIVITIES (4)                  │  │
│   │ • Private Wine Tour             │  │
│   │   Stellenbosch Wine Tours       │  │
│   │   R3,500/person                 │  │
│   │   [View Details] [Add to Cart]  │  │
│   │                                 │  │
│   │ • Sunset Cruise                 │  │
│   │   Durban Harbour Cruises        │  │
│   │   R1,800/person                 │  │
│   │   [View Details] [Add to Cart]  │  │
│   └─────────────────────────────────┘  │
└─────────────┬───────────────────────────┘
              │
              ↓ Click "View Details"
┌─────────────────────────────────────────┐
│   SERVICE DETAIL PAGE                   │
│                                         │
│   • Large service images                │
│   • Provider information                │
│   • Detailed description                │
│   • Amenities/Features                  │
│   • Reviews & ratings                   │
│   • Availability calendar               │
│   • Pricing details                     │
│   • Location map                        │
│                                         │
│   Booking Options:                     │
│   • Check-in/out dates                 │
│   • Number of guests                   │
│   • Special requests                   │
│                                         │
│   [Add to Cart] [Book Now]             │
└─────────────┬───────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────┐
│   SHOPPING CART                         │
│   (Accessible via cart icon in navbar)  │
│                                         │
│   Cart Items:                          │
│   • Service image & name               │
│   • Provider                           │
│   • Quantity                           │
│   • Dates                              │
│   • Price                              │
│   • [Remove] button                    │
│                                         │
│   Subtotal: R23,400                    │
│   Tax: R0                              │
│   Total: R23,400                       │
│                                         │
│   [Continue Shopping]                  │
│   [Proceed to Checkout]                │
│                                         │
│   Options:                             │
│   • Add to existing campaign           │
│   • Create new campaign                │
│   • Book directly (no campaign)        │
└─────────────────────────────────────────┘
```

---

## 💬 USER JOURNEY 6: MESSAGING

```
START: Dashboard → Messages Icon (Navbar)
    │
    ↓
┌─────────────────────────────────────────┐
│   MESSAGING PAGE                        │
│                                         │
│ Layout: Two-Column                     │
│                                         │
│ LEFT COLUMN: Conversations List        │
│   ┌─────────────────────────────────┐  │
│   │ Search conversations            │  │
│   │ [____________________]          │  │
│   │                                 │  │
│   │ • Cape Town Adventure 2025      │  │
│   │   Last: "See you there!"        │  │
│   │   3 unread                      │  │
│   │                                 │  │
│   │ • Durban Beach Holiday          │  │
│   │   Last: "Great idea!"           │  │
│   │                                 │  │
│   │ • Zanzibar Island Escape        │  │
│   │   Last: "Confirmed"             │  │
│   │   1 unread                      │  │
│   │                                 │  │
│   │ • Team Building Retreat         │  │
│   │   Last: "Thanks!"               │  │
│   └─────────────────────────────────┘  │
│                                         │
│ RIGHT COLUMN: Active Chat              │
│   ┌─────────────────────────────────┐  │
│   │ Cape Town Adventure 2025        │  │
│   │ 6 members                       │  │
│   │ ─────────────────────────────── │  │
│   │                                 │  │
│   │ Michael Chen (9:00 AM)          │  │
│   │ "Looking forward to this trip!" │  │
│   │                                 │  │
│   │          Sarah Johnson (9:15 AM)│  │
│   │          "Me too! Can't wait!"  │  │
│   │                                 │  │
│   │ David Williams (9:30 AM)        │  │
│   │ "Should we book extra wine tour"│  │
│   │                                 │  │
│   │          Emma Davis (10:00 AM)  │  │
│   │          "Yes! Great idea!"     │  │
│   │                                 │  │
│   │ ─────────────────────────────── │  │
│   │ Type a message...               │  │
│   │ [📎] [____________________] [➤] │  │
│   └─────────────────────────────────┘  │
│                                         │
│ Features:                              │
│   • Real-time messaging                │
│   • Group chats per campaign           │
│   • Unread message indicators          │
│   • Message timestamps                 │
│   • Campaign context                   │
│   • Member list sidebar                │
└─────────────────────────────────────────┘
```

---

## 🔔 USER JOURNEY 7: NOTIFICATIONS

```
START: Dashboard → Bell Icon (Navbar)
    │
    ↓
┌─────────────────────────────────────────┐
│   NOTIFICATIONS PANEL                   │
│   (Slide-out from right)                │
│                                         │
│   Notifications (Unread: 3)            │
│   ───────────────────────────────────   │
│                                         │
│   🎉 Campaign Accepted                 │
│   Your "Cape Town Adventure" has been  │
│   approved by the vendor               │
│   2 hours ago                          │
│   [Mark as Read] [View Campaign]       │
│                                         │
│   💰 New Contribution                  │
│   Sarah Johnson contributed R1,000     │
│   to "Durban Beach Holiday"            │
│   5 hours ago                          │
│   [Mark as Read]                       │
│                                         │
│   ⚠️ Payment Reminder                  │
│   Your next contribution of R750 is    │
│   due in 3 days for "Zanzibar Escape"  │
│   1 day ago                            │
│   [Pay Now] [Dismiss]                  │
│                                         │
│   ✅ Booking Confirmed                 │
│   Your booking at The Table Bay Hotel  │
│   has been confirmed                   │
│   2 days ago                           │
│   [View Details]                       │
│                                         │
│   📧 New Member Added                  │
│   John Smith joined "Team Building"    │
│   3 days ago                           │
│                                         │
│   [Mark All as Read]                   │
│   [Clear All]                          │
└─────────────────────────────────────────┘
```

---

## 💳 USER JOURNEY 8: TRANSACTIONS & HISTORY

```
START: Dashboard → Transactions (Navbar)
    │
    ↓
┌─────────────────────────────────────────┐
│   TRANSACTIONS PAGE                     │
│                                         │
│ Filters:                               │
│   • Date range                         │
│   • Campaign                           │
│   • Transaction type                   │
│   • Amount range                       │
│                                         │
│ Transaction List:                      │
│   ┌─────────────────────────────────┐  │
│   │ Date       | Description | Amt  │  │
│   │─────────────────────────────────│  │
│   │ 2024-11-20 | Contribution  │     │  │
│   │            | Cape Town     │     │  │
│   │            | Adventure     │     │  │
│   │            | Debit Card    │R1,000│  │
│   │            | [View Receipt]│     │  │
│   │                                 │  │
│   │ 2024-11-18 | Contribution  │     │  │
│   │            | Durban Beach  │     │  │
│   │            | EFT           │R500 │  │
│   │            | [View Receipt]│     │  │
│   │                                 │  │
│   │ 2024-11-15 | Service Booking│    │  │
│   │            | Wine Tour     │     │  │
│   │            | Ewallet       │R3,500│  │
│   │            | [View Receipt]│     │  │
│   │                                 │  │
│   │ 2024-11-10 | Refund        │     │  │
│   │            | Golf Getaway  │     │  │
│   │            | (Cancelled)   │-R800│  │
│   │            | [View Details]│     │  │
│   └─────────────────────────────────┘  │
│                                         │
│ Summary:                               │
│   Total Contributions: R45,550         │
│   Total Bookings: R12,300              │
│   Total Refunds: R800                  │
│   Net Spent: R57,050                   │
│                                         │
│   [Export to PDF] [Download CSV]       │
└─────────────────────────────────────────┘
```

---

## 🎟️ USER JOURNEY 9: VOUCHERS

```
START: Dashboard → Vouchers (Navbar)
    │
    ↓
┌─────────────────────────────────────────┐
│   VOUCHERS PAGE                         │
│                                         │
│ Available Vouchers:                    │
│   ┌─────────────────────────────────┐  │
│   │ 15% OFF                         │  │
│   │ Wine Tours in Stellenbosch      │  │
│   │ Code: WINE15                    │  │
│   │ Expires: 2025-12-31             │  │
│   │ [Apply to Cart]                 │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ R500 OFF                        │  │
│   │ Accommodation bookings >R5000   │  │
│   │ Code: STAY500                   │  │
│   │ Expires: 2025-11-30             │  │
│   │ [Apply to Cart]                 │  │
│   └─────────────────────────────────┘  │
│                                         │
│ My Vouchers (Saved):                  │
│   • 10% Group Discount (Active)        │
│   • Early Bird Special (Used)          │
│   • Loyalty Reward (Pending)           │
│                                         │
│ Redeem Voucher:                        │
│   [Enter Voucher Code]                 │
│   [__________________] [Redeem]        │
└─────────────────────────────────────────┘
```

---

## 👤 USER JOURNEY 10: PROFILE MANAGEMENT

```
START: Dashboard → Profile (Navbar)
    │
    ↓
┌─────────────────────────────────────────┐
│   PROFILE PAGE                          │
│                                         │
│ Profile Picture:                       │
│   [Avatar Image]                       │
│   [Change Picture]                     │
│                                         │
│ Personal Information:                  │
│   • Full Name: Michael Chen            │
│   • Email: michael@keahcont.co.za      │
│   • Phone: +27 82 345 6789             │
│   • Account Type: User                 │
│                                         │
│ Account Settings:                      │
│   • Password: ••••••••• [Change]       │
│   • Email Notifications: ☑ ON          │
│   • SMS Notifications: ☑ ON            │
│   • Push Notifications: ☑ ON           │
│                                         │
│ Payment Methods:                       │
│   • Debit Card (****1234) [Default]    │
│   • EFT Banking Details                │
│   • Ewallet Balance: R2,450            │
│   [Add Payment Method]                 │
│                                         │
│ Statistics:                            │
│   • Total Campaigns: 6                 │
│   • Active Campaigns: 4                │
│   • Total Contributed: R45,550         │
│   • Member Since: Jan 2024             │
│                                         │
│ Actions:                               │
│   [Edit Profile]                       │
│   [Change Account Type]                │
│   [Download Data]                      │
│   [Delete Account]                     │
│   [Logout]                             │
└─────────────────────────────────────────┘
```

---

# 2️⃣ VENDOR JOURNEY (Service Provider)

## 📍 Entry Point: Vendor Dashboard

```
┌──────────────────────────────────────────────────────────────────┐
│                      VENDOR DASHBOARD                             │
│  • Vendor Profile (Company name, logo)                           │
│  • Quick Stats (Pending Campaigns, Active Bookings, Revenue)     │
│  • Notifications Bell                                            │
│  • Navigation: Campaigns | Services | Bookings | Transactions    │
└───────────────────────────┬──────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
   CAMPAIGNS          MY SERVICES         BOOKINGS
```

---

## 🎯 VENDOR JOURNEY 1: MANAGE SERVICES

```
START: Vendor Dashboard → My Services
    │
    ↓
┌─────────────────────────────────────────┐
│   VENDOR SERVICES PAGE                  │
│                                         │
│ My Services (12 listings):             │
│   ┌─────────────────────────────────┐  │
│   │ Deluxe Ocean View Room          │  │
│   │ The Table Bay Hotel             │  │
│   │ R8,500/night                    │  │
│   │ Status: Active                  │  │
│   │ Bookings: 15 (this month)       │  │
│   │ Rating: 4.8★                    │  │
│   │ [Edit] [Deactivate] [Stats]     │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ Executive Conference Room       │  │
│   │ Cape Grace Hotel                │  │
│   │ R6,500/night                    │  │
│   │ Status: Active                  │  │
│   │ Bookings: 8 (this month)        │  │
│   │ Rating: 4.9★                    │  │
│   │ [Edit] [Deactivate] [Stats]     │  │
│   └─────────────────────────────────┘  │
│                                         │
│ [+ Create New Service]                 │
│                                         │
│ Service Categories:                    │
│   • Accommodation (5 services)         │
│   • Food & Dining (4 services)         │
│   • Activities (3 services)            │
└─────────────┬───────────────────────────┘
              │
              ↓ Click "Create New Service"
┌─────────────────────────────────────────┐
│   CREATE SERVICE FORM                   │
│                                         │
│   Service Information:                 │
│   • Service Name                       │
│   • Category (dropdown)                │
│   • Description (rich text)            │
│   • Upload Images (up to 10)           │
│   • Location                           │
│   • Address                            │
│                                         │
│   Pricing:                             │
│   • Base Price                         │
│   • Pricing Type (per night/person/etc)│
│   • Seasonal Pricing (optional)        │
│   • Group Discounts (optional)         │
│                                         │
│   Availability:                        │
│   • Calendar management                │
│   • Blackout dates                     │
│   • Maximum capacity                   │
│   • Minimum booking                    │
│                                         │
│   Features & Amenities:                │
│   ☑ WiFi  ☑ Parking  ☑ Breakfast      │
│   ☑ Pool  ☑ Gym  ☑ Sea View           │
│                                         │
│   Terms & Conditions:                  │
│   • Cancellation policy                │
│   • Payment terms                      │
│   • House rules                        │
│                                         │
│   [Save as Draft] [Publish]            │
└─────────────────────────────────────────┘
```

---

## ✅ VENDOR JOURNEY 2: REVIEW & APPROVE CAMPAIGNS

```
START: Vendor Dashboard → Campaigns
    │
    ↓
┌─────────────────────────────────────────┐
│   VENDOR CAMPAIGNS PAGE                 │
│                                         │
│ Filters:                               │
│   • Pending Approval (3) ⚠️            │
│   • Accepted (15)                      │
│   • Declined (2)                       │
│   • All Campaigns                      │
│                                         │
│ PENDING CAMPAIGNS:                     │
│   ┌─────────────────────────────────┐  │
│   │ 🟡 PENDING APPROVAL             │  │
│   │                                 │  │
│   │ Zanzibar Island Escape          │  │
│   │ Organizer: David Williams       │  │
│   │ Dates: Jan 20-27, 2026          │  │
│   │ Members: 5 people               │  │
│   │ Total Value: R58,000            │  │
│   │                                 │  │
│   │ Services Requested:             │  │
│   │ • Ocean View Villa (2 villas)   │  │
│   │   R12,000 × 2 × 7 nights        │  │
│   │ • Spice Tour (5 people)         │  │
│   │   R1,500 × 5                    │  │
│   │ • Swahili Feast (5 people)      │  │
│   │   R2,800 × 5                    │  │
│   │                                 │  │
│   │ Customer Info:                  │  │
│   │ David Williams                  │  │
│   │ david.williams@keahcont.co.za   │  │
│   │ +27 84 567 8901                 │  │
│   │                                 │  │
│   │ [View Full Details]             │  │
│   │ [✓ Accept] [✗ Decline]          │  │
│   └─────────────────────────────────┘  │
│                                         │
│   Click "Accept" or "Decline" ↓        │
└─────────────┬───────────────────────────┘
              │
      ┌───────┴────────┐
      ↓                ↓
  ACCEPT           DECLINE
      │                │
      ↓                ↓
┌──────────────┐ ┌─────────────────┐
│ ACCEPTANCE   │ │ DECLINE REASON  │
│              │ │                 │
│ • Campaign   │ │ ○ Dates not     │
│   activated  │ │   available     │
│ • Customer   │ │ ○ Capacity full │
│   notified   │ │ ○ Service       │
│ • Booking    │ │   discontinued  │
│   confirmed  │ │ ○ Other:        │
│ • Added to   │ │   [_________]   │
│   vendor     │ │                 │
│   bookings   │ │ [Submit]        │
│ • Status:    │ │                 │
│   ACCEPTED   │ │ ↓               │
│              │ │                 │
│ ✓ Can see    │ │ • Campaign      │
│   customer   │ │   marked        │
│   trans-     │ │   DECLINED      │
│   actions    │ │ • Customer      │
│              │ │   notified      │
│              │ │ • No trans-     │
│              │ │   actions       │
│              │ │ • Greyed out    │
└──────────────┘ └─────────────────┘
```

---

## 💰 VENDOR JOURNEY 3: VIEW CUSTOMER TRANSACTIONS

```
START: Vendor Dashboard → Campaigns → View Accepted Campaign
    │
    ↓
┌─────────────────────────────────────────┐
│   CAMPAIGN TRANSACTION VIEW             │
│   (Vendor sees when customers book      │
│    their services)                      │
│                                         │
│ Campaign: Cape Town Adventure 2025     │
│ Status: ✓ ACCEPTED                     │
│ Organizer: Michael Chen                │
│                                         │
│ My Services in this Campaign:          │
│   ┌─────────────────────────────────┐  │
│   │ Deluxe Ocean View Room          │  │
│   │ Quantity: 3 rooms               │  │
│   │ Nights: 5                       │  │
│   │ Rate: R8,500/night              │  │
│   │ Total: R127,500                 │  │
│   │ Check-in: Dec 15, 2025          │  │
│   │ Check-out: Dec 20, 2025         │  │
│   └─────────────────────────────────┘  │
│                                         │
│ Customer Contributions (for my services):│
│   ┌─────────────────────────────────┐  │
│   │ Date       | Customer  | Amount │  │
│   │────────────────────────────────│  │
│   │ 2024-11-20 | Michael C | R10,000│  │
│   │ 2024-11-18 | Sarah J   | R8,500 │  │
│   │ 2024-11-15 | David W   | R7,200 │  │
│   │ 2024-11-10 | Emma D    | R6,300 │  │
│   │                                 │  │
│   │ Total Collected: R32,000        │  │
│   │ Remaining: R95,500              │  │
│   │ Progress: 25%                   │  │
│   └─────────────────────────────────┘  │
│                                         │
│ Payment Status:                        │
│   • Deposit Required: R38,250 (30%)    │
│   • Deposit Received: R32,000          │
│   • Outstanding: R6,250                │
│   • Full Payment Due: Dec 1, 2025      │
│                                         │
│ Actions:                               │
│   [Send Payment Reminder]              │
│   [View Full Campaign]                 │
│   [Download Invoice]                   │
│   [Contact Organizer]                  │
└─────────────────────────────────────────┘
```

---

## 📊 VENDOR JOURNEY 4: ANALYTICS & REPORTS

```
START: Vendor Dashboard → Reports/Analytics
    │
    ↓
┌─────────────────────────────────────────┐
│   VENDOR ANALYTICS DASHBOARD            │
│                                         │
│ Time Period: [Last 30 Days ▼]          │
│                                         │
│ Key Metrics:                           │
│   ┌─────────┬─────────┬─────────────┐  │
│   │ Revenue │ Bookings│ Occupancy   │  │
│   │ R456,000│   42    │    78%      │  │
│   │ ↑ 12%   │ ↑ 8%    │ ↑ 5%        │  │
│   └─────────┴─────────┴─────────────┘  │
│                                         │
│ Revenue Chart:                         │
│   [Line graph showing daily revenue]   │
│                                         │
│ Top Services:                          │
│   1. Deluxe Ocean View Room - R127,500 │
│   2. Executive Conference - R89,500    │
│   3. Private Wine Tour - R52,500       │
│                                         │
│ Campaign Performance:                  │
│   • Active Campaigns: 15               │
│   • Pending Approval: 3                │
│   • Completed: 28                      │
│   • Average Campaign Value: R45,000    │
│                                         │
│ Customer Insights:                     │
│   • Repeat Customers: 32%              │
│   • Average Group Size: 5.2            │
│   • Most Popular Dates: Dec-Jan        │
│                                         │
│ [Export Report] [Schedule Email]       │
└─────────────────────────────────────────┘
```

---

# 3️⃣ CORPORATE JOURNEY

## 📍 Entry Point: Corporate Dashboard

```
┌──────────────────────────────────────────────────────────────────┐
│                    CORPORATE DASHBOARD                            │
│  • Company Profile                                               │
│  • Department Management                                         │
│  • Budget Tracking                                               │
│  • Employee Campaign Access                                      │
│  • Bulk Bookings                                                 │
│  • Corporate Reports                                             │
└───────────────────────────┬──────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
   TEAM EVENTS        BULK BOOKINGS       BUDGET MGMT
```

---

## 🏢 CORPORATE JOURNEY 1: CREATE TEAM EVENT

```
START: Corporate Dashboard → Create Team Event
    │
    ↓
┌─────────────────────────────────────────┐
│   CORPORATE EVENT CREATION              │
│                                         │
│ Event Type:                            │
│   ○ Team Building                      │
│   ○ Conference                         │
│   ○ Corporate Retreat                  │
│   ○ Client Entertainment               │
│   ○ Training Session                   │
│                                         │
│ Event Details:                         │
│   • Event Name                         │
│   • Department                         │
│   • Budget Code                        │
│   • Cost Center                        │
│   • Approval Required: Yes/No          │
│                                         │
│ Participants:                          │
│   • Import from employee directory     │
│   • Add external guests                │
│   • Set participant limit              │
│   • RSVP deadline                      │
│                                         │
│ Services Selection:                    │
│   • Venue (conference rooms)           │
│   • Accommodation (group rates)        │
│   • Catering (per person)              │
│   • Transport (shuttle services)       │
│   • Activities (team building)         │
│                                         │
│ Budget Allocation:                     │
│   Total Budget: R50,000                │
│   Allocated: R28,000                   │
│   Remaining: R22,000                   │
│                                         │
│ Payment Method:                        │
│   ○ Company Account                    │
│   ○ Purchase Order                     │
│   ○ Corporate Card                     │
│                                         │
│ [Submit for Approval]                  │
└─────────────────────────────────────────┘
```

---

## 💼 CORPORATE JOURNEY 2: MANAGE DEPARTMENT BUDGETS

```
START: Corporate Dashboard → Budget Management
    │
    ↓
┌─────────────────────────────────────────┐
│   BUDGET MANAGEMENT                     │
│                                         │
│ Department Budgets:                    │
│   ┌─────────────────────────────────┐  │
│   │ Sales Department                │  │
│   │ Annual Budget: R500,000         │  │
│   │ Spent: R287,500 (58%)           │  │
│   │ Active Campaigns: 3             │  │
│   │ Pending: 1                      │  │
│   │ [View Details] [Adjust Budget]  │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ Marketing Department            │  │
│   │ Annual Budget: R750,000         │  │
│   │ Spent: R425,000 (57%)           │  │
│   │ Active Campaigns: 5             │  │
│   │ Pending: 2                      │  │
│   │ [View Details] [Adjust Budget]  │  │
│   └─────────────────────────────────┘  │
│                                         │
│ Budget Alerts:                         │
│   ⚠️ HR Dept approaching limit (85%)   │
│   ✓ IT Dept on track                   │
│   ⚠️ Finance Dept needs approval       │
│                                         │
│ Approval Queue:                        │
│   • Team Building Retreat - R28,000    │
│     (Sales Dept) [Approve] [Deny]      │
│                                         │
│   • Conference Trip - R45,000          │
│     (Marketing) [Approve] [Deny]       │
└─────────────────────────────────────────┘
```

---

# 📊 DATA FLOW & STORAGE

```
┌────────────────────────────────────────────────────────────┐
│                  CENTRALIZED DATA STORAGE                  │
│                      (localStorage)                        │
└─────────────────────┬──────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┬──────────────┐
        ↓             ↓             ↓              ↓
┌──────────────┐ ┌─────────┐ ┌──────────┐ ┌────────────┐
│ campaignStorage│ │ service │ │notification│ │ userProfile│
│              │ │ Storage │ │ Storage  │ │  Storage   │
│ • campaigns  │ │         │ │          │ │            │
│ • members    │ │ • 28    │ │ • unread │ │ • name     │
│ • services   │ │   services│ • read   │ │ • email    │
│ • progress   │ │ • 12    │ │ • types  │ │ • phone    │
│ • status     │ │   providers│         │ │ • avatar   │
│ • transactions│ │ • 3     │ │         │ │ • type     │
└──────────────┘ │   locations│         │ │            │
                 └─────────┘ └──────────┘ └────────────┘

All components read/write to centralized storage
No duplicate data sources
Real-time synchronization across all pages
```

---

# 🔄 KEY INTERACTION FLOWS

## Campaign Status Lifecycle

```
┌─────────────────────────────────────────────────────┐
│ USER creates campaign → Status: PENDING             │
└────────────┬────────────────────────────────────────┘
             │
             ↓
┌────────────────────────────────────────────────────┐
│ VENDOR receives notification                       │
│ • Reviews campaign details                         │
│ • Checks availability                              │
│ • Verifies services                                │
└────────────┬──────────────────────────────────────┘
             │
      ┌──────┴──────┐
      ↓             ↓
┌──────────┐  ┌──────────┐
│ ACCEPT   │  │ DECLINE  │
└────┬─────┘  └────┬─────┘
     │             │
     ↓             ↓
┌─────────────┐ ┌─────────────────┐
│ Campaign    │ │ Campaign        │
│ Active      │ │ Inactive        │
│ ✓ Normal    │ │ ✗ Greyscale     │
│ ✓ Can       │ │ ✗ Cannot        │
│   contribute│ │   contribute    │
│ ✓ 0-100%    │ │ ✗ Locked 0%     │
│ ✓ Vendor    │ │ ✗ No vendor     │
│   sees      │ │   tracking      │
│   trans-    │ │                 │
│   actions   │ │                 │
└─────────────┘ └─────────────────┘
```

## Contribution Flow

```
USER selects campaign
    ↓
Check campaign status
    ↓
    ├─ Declined? → Block + Error
    │
    ├─ Pending? → Allow (waiting for acceptance)
    │
    └─ Accepted? → Allow
        ↓
    Enter amount
        ↓
    Select payment method
        ↓
    Confirm terms
        ↓
    Process payment
        ↓
    ┌─────────────────────────────┐
    │ Updates (synchronized):     │
    │ • Campaign progress         │
    │ • localStorage              │
    │ • Transaction history       │
    │ • Member contribution       │
    │ • Vendor view (if accepted) │
    │ • Notifications             │
    │ • Analytics                 │
    └─────────────────────────────┘
```

---

# 🎨 NAVIGATION STRUCTURE

```
┌─────────────────────────────────────────────────────────┐
│                    MAIN NAVIGATION                       │
│  (Consistent across all pages)                          │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┬─────────────┐
        ↓              ↓              ↓             ↓
   Dashboard      Campaigns      Services      Profile
        │              │              │             │
        │              │              │             └─→ Settings
        │              │              │                 Account
        │              │              │                 Payment
        │              │              │                 Logout
        │              │              │
        │              │              └─→ Browse Services
        │              │                  Service Detail
        │              │                  Shopping Cart
        │              │                  Checkout
        │              │
        │              └─→ My Campaigns
        │                  Create Campaign
        │                  Manage Campaign
        │                  View Campaign
        │                  Contribute
        │                  Members
        │                  Schedule
        │                  History
        │
        └─→ Overview
            Quick Stats
            Recent Activity
            Notifications

┌─────────────────────────────────────────────────────────┐
│                  UTILITY NAVIGATION                      │
│  (Icons in navbar - always visible)                     │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┬─────────────┐
        ↓              ↓              ↓             ↓
   Messages      Notifications   Shopping Cart   Profile
  (chat icon)    (bell + badge)  (cart + count)   (avatar)
```

---

# 📱 RESPONSIVE DESIGN CONSIDERATIONS

```
DESKTOP (>1024px)
┌─────────────────────────────────────────┐
│ [NavBar: Full width with all options]  │
├─────────────────────────────────────────┤
│                                         │
│  Main Content (max-width: 7xl)         │
│  • Full campaign cards                 │
│  • Side-by-side layouts                │
│  • Multi-column grids                  │
│                                         │
└─────────────────────────────────────────┘

TABLET (768px - 1023px)
┌─────────────────────────────────────────┐
│ [NavBar: Condensed with dropdowns]     │
├─────────────────────────────────────────┤
│                                         │
│  Main Content                          │
│  • Stacked campaign cards              │
│  • 2-column grids                      │
│  • Collapsible sections                │
│                                         │
└─────────────────────────────────────────┘

MOBILE (<767px)
┌───────────────────────────┐
│ [NavBar: Hamburger menu]  │
├───────────────────────────┤
│                           │
│  Main Content            │
│  • Single column         │
│  • Full-width cards      │
│  • Bottom sheet modals   │
│                           │
└───────────────────────────┘
```

---

# 🎯 KEY FEATURES SUMMARY

## USER Features
✅ Create individual & group campaigns
✅ Browse 28 services across 12 providers
✅ Contribute to campaigns (multiple payment methods)
✅ Manage campaign members
✅ View transaction history
✅ Real-time messaging per campaign
✅ Notifications (push, email, SMS)
✅ Profile management
✅ Voucher system
✅ Shopping cart functionality
✅ Campaign scheduling
✅ Analytics dashboard

## VENDOR Features
✅ Create & manage services
✅ Review & approve/decline campaigns
✅ View customer transactions (for accepted campaigns)
✅ Booking management
✅ Revenue analytics
✅ Availability calendar
✅ Customer communication
✅ Pricing management

## CORPORATE Features
✅ Department budget management
✅ Bulk booking capabilities
✅ Employee directory integration
✅ Approval workflows
✅ Cost center allocation
✅ Corporate reporting
✅ Team event creation

---

# 💾 DATA CONSISTENCY RULES

1. **Single Source of Truth**: localStorage via centralized storage modules
2. **Real-time Sync**: All components use same storage functions
3. **Campaign Status**: Pending → Accepted/Declined (no reversing)
4. **Contribution Rules**: 
   - Declined campaigns: 0% forever
   - Accepted campaigns: 0-100%
   - Pending campaigns: Can receive contributions
5. **Member Management**: All changes persist to localStorage
6. **Service Data**: 28 services from serviceStorage.ts (immutable seed data)
7. **Real Members**: Michael Chen, Sarah Johnson, David Williams, Emma Davis, John Smith, Lisa Anderson

---

**END OF USER JOURNEYS DOCUMENTATION**
