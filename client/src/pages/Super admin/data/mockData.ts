// Campaign Data
export const campaigns = [
  {
    id: '1',
    name: 'Trelles Adventure',
    image: 'https://images.unsplash.com/photo-1488908730227-08cfcad46b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NjI2OTMxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    owner: 'Mike Hotel',
    vendorsInvolved: 5,
    goal: 50000,
    raised: 30000,
    status: 'Active',
    date: 'Aug 2, June, 26',
    description: 'A thrilling beach adventure experience',
  },
  {
    id: '2',
    name: 'Cape Town Gateway weekend',
    image: 'https://images.unsplash.com/photo-1712850256111-bfd1677f7f5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93biUyMHdhdGVyZnJvbnR8ZW58MXx8fHwxNzYyNjkyMzE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    owner: 'Seaview Lodge',
    vendorsInvolved: 3,
    goal: 30000,
    raised: 20000,
    status: 'Active',
    date: 'Aug 2, June, 26',
    description: 'Experience the beauty of Cape Town',
  },
  {
    id: '3',
    name: 'Tanzania trip Weekend',
    image: 'https://images.unsplash.com/photo-1580145575237-75fec2a0320b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW56YW5pYSUyMHNhZmFyaXxlbnwxfHx8fDE3NjI2MDA3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    owner: 'Paradise Motel',
    vendorsInvolved: 6,
    goal: 50000,
    raised: 0,
    status: 'Pending',
    date: 'Aug 2, June, 26',
    description: 'Safari adventure in Tanzania',
  },
  {
    id: '4',
    name: 'Durban Weekend',
    image: 'https://images.unsplash.com/photo-1675277064786-54a171a89a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJiYW4lMjBiZWFjaHxlbnwxfHx8fDE3NjI2OTMyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    owner: 'South Beach Hotel',
    vendorsInvolved: 3,
    goal: 50000,
    raised: 50000,
    status: 'Completed',
    date: 'Aug 2, June, 26',
    description: 'Relaxing beach weekend in Durban',
  },
  {
    id: '5',
    name: 'Garden Route Escape',
    image: 'https://images.unsplash.com/photo-1675277064786-54a171a89a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJiYW4lMjBiZWFjaHxlbnwxfHx8fDE3NjI2OTMyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    owner: 'South Beach Hotel',
    vendorsInvolved: 4,
    goal: 50000,
    raised: 50000,
    status: 'Cancelled',
    date: 'Aug 2, June, 26',
    description: 'Scenic Garden Route tour',
  },
];

// User Data
export const users = [
  { 
    id: '1',
    name: 'Joshua Blla', 
    email: 'JoshuaBlla@gamil.com', 
    role: 'User', 
    status: 'Active', 
    lastLogin: '01/08/2025', 
    ratings: 'R1000', 
    comment: 'Great user' 
  },
  { 
    id: '2',
    name: 'John Smith', 
    email: 'JohnSmith@gamil.com', 
    role: 'User', 
    status: 'Active', 
    lastLogin: '11/08/2025', 
    ratings: 'R500', 
    comment: 'Regular user' 
  },
  { 
    id: '3',
    name: 'Sarah Williams', 
    email: 'SarahW@gamil.com', 
    role: 'User', 
    status: 'Suspended', 
    lastLogin: '11/08/2025', 
    ratings: 'R1000', 
    comment: 'Needs review' 
  },
];

// Voucher Data
export const vouchers = [
  { 
    id: '1',
    name: 'Room_aasfhcdchfhbP', 
    vendor: 'Seaview Lodge hotel', 
    discount: '15% OFF', 
    validity: '01 Sept 2025-06 Sept 2025', 
    status: 'Active' 
  },
  { 
    id: '2',
    name: 'Dining_xyz123abc', 
    vendor: 'Tassoletos Cafe', 
    discount: '20% OFF', 
    validity: '01 Sept 2025-30 Sept 2025', 
    status: 'Active' 
  },
  { 
    id: '3',
    name: 'Activity_def456ghi', 
    vendor: 'Greenfield Ranch', 
    discount: 'R500 OFF', 
    validity: '15 Aug 2025-15 Sept 2025', 
    status: 'Expired' 
  },
];

// Transaction Data
export const transactions = [
  { 
    id: '#6252', 
    date: 'Aug 20, 2025', 
    user: 'Manila Mayo', 
    vendor: 'Game', 
    amount: 'R1900.00', 
    status: 'Completed' 
  },
  { 
    id: '#6253', 
    date: 'Aug 21, 2025', 
    user: 'John Doe', 
    vendor: 'Adventure Co', 
    amount: 'R2500.00', 
    status: 'Pending' 
  },
  { 
    id: '#6254', 
    date: 'Aug 22, 2025', 
    user: 'Jane Smith', 
    vendor: 'Hotel Paradise', 
    amount: 'R3200.00', 
    status: 'Failed' 
  },
  { 
    id: '#6255', 
    date: 'Aug 23, 2025', 
    user: 'Bob Wilson', 
    vendor: 'Safari Tours', 
    amount: 'R1500.00', 
    status: 'Refund' 
  },
];

// Stats Data
export const platformStats = {
  totalUsers: 1200,
  activeCampaigns: 65,
  activeVendors: 80,
  corporateOverview: 100,
};

export const campaignStats = {
  totalCampaigns: 120,
  activeCampaigns: 65,
  bestCampaigns: 25,
  bestVendors: 12,
};

export const voucherStats = {
  totalVouchers: 120,
  activeVouchers: 85,
  expiredVouchers: 25,
  usedVouchers: 10,
};
