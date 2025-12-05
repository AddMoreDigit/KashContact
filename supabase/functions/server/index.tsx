import { Hono } from 'npm:hono@4.0.2';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));
app.use('*', logger(console.log));

// Health check
app.get('/make-server-5eb0ec17/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==================== CAMPAIGNS ====================

// Get all campaigns for a user
app.get('/make-server-5eb0ec17/campaigns/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const campaignsData = await kv.get(`campaigns:${userId}`);
    
    return c.json({ 
      success: true, 
      data: campaignsData ? JSON.parse(campaignsData) : [] 
    });
  } catch (error) {
    console.log('Error fetching campaigns:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create or update campaign
app.post('/make-server-5eb0ec17/campaigns/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const campaign = await c.req.json();
    
    // Get existing campaigns
    const existingData = await kv.get(`campaigns:${userId}`);
    const campaigns = existingData ? JSON.parse(existingData) : [];
    
    // Check if campaign exists
    const existingIndex = campaigns.findIndex((c: any) => c.id === campaign.id);
    
    if (existingIndex >= 0) {
      // Update existing campaign
      campaigns[existingIndex] = { ...campaigns[existingIndex], ...campaign, updatedAt: new Date().toISOString() };
    } else {
      // Add new campaign
      campaigns.push({ ...campaign, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    
    // Save to KV store
    await kv.set(`campaigns:${userId}`, JSON.stringify(campaigns));
    
    return c.json({ success: true, data: campaign });
  } catch (error) {
    console.log('Error saving campaign:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete campaign
app.delete('/make-server-5eb0ec17/campaigns/:userId/:campaignId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const campaignId = parseInt(c.req.param('campaignId'));
    
    const existingData = await kv.get(`campaigns:${userId}`);
    const campaigns = existingData ? JSON.parse(existingData) : [];
    
    const filteredCampaigns = campaigns.filter((c: any) => c.id !== campaignId);
    await kv.set(`campaigns:${userId}`, JSON.stringify(filteredCampaigns));
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting campaign:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== USER PROFILES ====================

// Get user profile
app.get('/make-server-5eb0ec17/profile/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const profileData = await kv.get(`profile:${userId}`);
    
    return c.json({ 
      success: true, 
      data: profileData ? JSON.parse(profileData) : null 
    });
  } catch (error) {
    console.log('Error fetching profile:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Save user profile
app.post('/make-server-5eb0ec17/profile/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const profile = await c.req.json();
    
    await kv.set(`profile:${userId}`, JSON.stringify({ ...profile, updatedAt: new Date().toISOString() }));
    
    return c.json({ success: true, data: profile });
  } catch (error) {
    console.log('Error saving profile:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== TRANSACTIONS ====================

// Get transactions for a user
app.get('/make-server-5eb0ec17/transactions/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const transactionsData = await kv.get(`transactions:${userId}`);
    
    return c.json({ 
      success: true, 
      data: transactionsData ? JSON.parse(transactionsData) : [] 
    });
  } catch (error) {
    console.log('Error fetching transactions:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Add transaction
app.post('/make-server-5eb0ec17/transactions/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const transaction = await c.req.json();
    
    const existingData = await kv.get(`transactions:${userId}`);
    const transactions = existingData ? JSON.parse(existingData) : [];
    
    transactions.push({ ...transaction, createdAt: new Date().toISOString() });
    await kv.set(`transactions:${userId}`, JSON.stringify(transactions));
    
    return c.json({ success: true, data: transaction });
  } catch (error) {
    console.log('Error saving transaction:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== NOTIFICATIONS ====================

// Get notifications for a user
app.get('/make-server-5eb0ec17/notifications/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const notificationsData = await kv.get(`notifications:${userId}`);
    
    return c.json({ 
      success: true, 
      data: notificationsData ? JSON.parse(notificationsData) : [] 
    });
  } catch (error) {
    console.log('Error fetching notifications:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Save notifications
app.post('/make-server-5eb0ec17/notifications/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const notifications = await c.req.json();
    
    await kv.set(`notifications:${userId}`, JSON.stringify(notifications));
    
    return c.json({ success: true, data: notifications });
  } catch (error) {
    console.log('Error saving notifications:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== CART ====================

// Get cart for a user
app.get('/make-server-5eb0ec17/cart/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const cartData = await kv.get(`cart:${userId}`);
    
    return c.json({ 
      success: true, 
      data: cartData ? JSON.parse(cartData) : [] 
    });
  } catch (error) {
    console.log('Error fetching cart:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Save cart
app.post('/make-server-5eb0ec17/cart/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const cart = await c.req.json();
    
    await kv.set(`cart:${userId}`, JSON.stringify(cart));
    
    return c.json({ success: true, data: cart });
  } catch (error) {
    console.log('Error saving cart:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== SERVICE PROVIDERS ====================

// Get all service providers
app.get('/make-server-5eb0ec17/service-providers', async (c) => {
  try {
    const providersData = await kv.get('service-providers');
    
    return c.json({ 
      success: true, 
      data: providersData ? JSON.parse(providersData) : [] 
    });
  } catch (error) {
    console.log('Error fetching service providers:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Save service providers
app.post('/make-server-5eb0ec17/service-providers', async (c) => {
  try {
    const providers = await c.req.json();
    
    await kv.set('service-providers', JSON.stringify(providers));
    
    return c.json({ success: true, data: providers });
  } catch (error) {
    console.log('Error saving service providers:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== SYNC ====================

// Sync all data for a user (bulk operation)
app.post('/make-server-5eb0ec17/sync/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const { campaigns, profile, transactions, notifications, cart } = await c.req.json();
    
    const operations = [];
    
    if (campaigns !== undefined) {
      operations.push(kv.set(`campaigns:${userId}`, JSON.stringify(campaigns)));
    }
    if (profile !== undefined) {
      operations.push(kv.set(`profile:${userId}`, JSON.stringify(profile)));
    }
    if (transactions !== undefined) {
      operations.push(kv.set(`transactions:${userId}`, JSON.stringify(transactions)));
    }
    if (notifications !== undefined) {
      operations.push(kv.set(`notifications:${userId}`, JSON.stringify(notifications)));
    }
    if (cart !== undefined) {
      operations.push(kv.set(`cart:${userId}`, JSON.stringify(cart)));
    }
    
    await Promise.all(operations);
    
    return c.json({ success: true, synced: operations.length });
  } catch (error) {
    console.log('Error syncing data:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all data for a user (bulk operation)
app.get('/make-server-5eb0ec17/sync/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    
    const [campaigns, profile, transactions, notifications, cart] = await Promise.all([
      kv.get(`campaigns:${userId}`),
      kv.get(`profile:${userId}`),
      kv.get(`transactions:${userId}`),
      kv.get(`notifications:${userId}`),
      kv.get(`cart:${userId}`),
    ]);
    
    return c.json({ 
      success: true,
      data: {
        campaigns: campaigns ? JSON.parse(campaigns) : [],
        profile: profile ? JSON.parse(profile) : null,
        transactions: transactions ? JSON.parse(transactions) : [],
        notifications: notifications ? JSON.parse(notifications) : [],
        cart: cart ? JSON.parse(cart) : [],
      }
    });
  } catch (error) {
    console.log('Error fetching sync data:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
