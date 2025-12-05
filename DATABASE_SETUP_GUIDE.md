# 🗄️ Database Setup Guide

## ⚠️ IMPORTANT: Manual Setup Required

**NO tables have been created yet.** You need to create the database table manually in the Supabase dashboard.

---

## 📊 Current Status

| Component | Status | Action Needed |
|-----------|--------|---------------|
| Backend API code | ✅ Ready | None - already configured |
| KV store utilities | ✅ Ready | None - already configured |
| Supabase connection | ✅ Connected | None - already working |
| **Database table** | ❌ **NOT CREATED** | **YOU MUST CREATE THIS** |

---

## 🚨 Why Tables Aren't Auto-Created

The Figma Make environment has limitations:

1. ❌ Cannot execute SQL migration files
2. ❌ Cannot run CREATE TABLE statements from code
3. ❌ No access to Supabase CLI for migrations
4. ✅ Can only use existing tables via the Supabase API

**You must create the table manually in the Supabase dashboard.**

---

## 📝 Step-by-Step: Create Your Database Table

### Step 1: Open Supabase Dashboard

1. Go to: **https://supabase.com/dashboard**
2. Sign in to your account
3. Select project: **nzfmijbcuwnlkdglsmus**

### Step 2: Navigate to SQL Editor

1. In the left sidebar, click **"SQL Editor"**
2. Click **"New query"**

### Step 3: Run This SQL

Copy and paste this **entire SQL script** into the editor:

```sql
-- ============================================
-- Campaign Management App - Database Table
-- ============================================

-- Create the KV store table
CREATE TABLE IF NOT EXISTS kv_store_5eb0ec17 (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster prefix searches
CREATE INDEX IF NOT EXISTS idx_kv_key_prefix 
ON kv_store_5eb0ec17 (key text_pattern_ops);

-- Create index for updated_at (useful for sync)
CREATE INDEX IF NOT EXISTS idx_kv_updated_at 
ON kv_store_5eb0ec17 (updated_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE kv_store_5eb0ec17 ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations with service role key
CREATE POLICY "Allow all operations with service role"
ON kv_store_5eb0ec17
FOR ALL
TO authenticated, anon
USING (true)
WITH CHECK (true);

-- Optional: Add a function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_kv_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER kv_store_updated_at
BEFORE UPDATE ON kv_store_5eb0ec17
FOR EACH ROW
EXECUTE FUNCTION update_kv_updated_at();

-- Verify table was created
SELECT 'Table created successfully!' AS status;
```

### Step 4: Execute the Query

1. Click **"Run"** button (or press `Ctrl+Enter`)
2. Wait for confirmation message
3. You should see: **"Table created successfully!"**

### Step 5: Verify Table Exists

1. In left sidebar, click **"Table Editor"**
2. You should see: **`kv_store_5eb0ec17`** in the table list
3. Click on it to view the table structure

Expected columns:
- `key` (TEXT) - Primary key
- `value` (JSONB) - Stores all your data
- `created_at` (TIMESTAMPTZ) - Auto-set
- `updated_at` (TIMESTAMPTZ) - Auto-updated

---

## ✅ Verification Steps

### 1. Check Table in Dashboard

**Table Editor → kv_store_5eb0ec17**

You should see:
- ✅ Table exists
- ✅ 4 columns (key, value, created_at, updated_at)
- ✅ Primary key on `key` column
- ✅ RLS enabled

### 2. Test from Your App

Once the table is created, test it from your application:

```bash
# Start your dev server
npm run dev
```

Open browser console (F12) and run:

```javascript
// Test health check
fetch('https://nzfmijbcuwnlkdglsmus.supabase.co/functions/v1/make-server-5eb0ec17/health')
  .then(r => r.json())
  .then(data => console.log('✅ Backend:', data));

// Test saving data
fetch('https://nzfmijbcuwnlkdglsmus.supabase.co/functions/v1/make-server-5eb0ec17/profile/test-user', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Test User', email: 'test@example.com' })
})
  .then(r => r.json())
  .then(data => console.log('✅ Save test:', data));

// Test reading data back
fetch('https://nzfmijbcuwnlkdglsmus.supabase.co/functions/v1/make-server-5eb0ec17/profile/test-user')
  .then(r => r.json())
  .then(data => console.log('✅ Read test:', data));
```

Expected results:
```json
✅ Backend: {"status":"ok","timestamp":"2024-12-02T..."}
✅ Save test: {"success":true,"data":{...}}
✅ Read test: {"success":true,"data":{"name":"Test User",...}}
```

### 3. Check Data in Dashboard

After testing:

1. Go to **Table Editor → kv_store_5eb0ec17**
2. You should see a row with:
   - `key`: `"profile:test-user"`
   - `value`: `{"name":"Test User","email":"test@example.com",...}`

---

## 📊 What Gets Stored in This Table

All your application data is stored as key-value pairs:

### Data Structure

| Key Pattern | Data Type | Example |
|-------------|-----------|---------|
| `campaigns:{userId}` | Array of campaigns | `[{id:1, title:"Birthday",...}]` |
| `profile:{userId}` | User profile | `{name:"John", email:"..."}` |
| `transactions:{userId}` | Transaction history | `[{id:1, amount:500,...}]` |
| `notifications:{userId}` | Notifications | `[{id:1, message:"...",...}]` |
| `cart:{userId}` | Shopping cart | `[{service:..., qty:1}]` |
| `service-providers` | All providers | `[{id:1, name:"Hotel X"}]` |

### Example Data

After using the app, your table might look like:

| key | value | updated_at |
|-----|-------|------------|
| `profile:user123` | `{"name":"John Doe","email":"john@example.com",...}` | 2024-12-02 10:30:00 |
| `campaigns:user123` | `[{"id":1,"title":"Birthday Party",...}]` | 2024-12-02 10:35:00 |
| `transactions:user123` | `[{"id":1,"amount":500,...}]` | 2024-12-02 10:40:00 |
| `cart:user123` | `[{"serviceId":5,"quantity":1}]` | 2024-12-02 10:45:00 |

---

## 🔒 Security (RLS Policies)

The SQL script enables Row Level Security (RLS) with a permissive policy. This is fine for development, but for production, you should create more restrictive policies:

### Production Security (Optional)

```sql
-- Drop the permissive policy
DROP POLICY "Allow all operations with service role" ON kv_store_5eb0ec17;

-- Create user-specific policies
CREATE POLICY "Users can read their own data"
ON kv_store_5eb0ec17
FOR SELECT
TO authenticated
USING (key LIKE 'profile:' || auth.uid() || '%' 
    OR key LIKE 'campaigns:' || auth.uid() || '%'
    OR key LIKE 'transactions:' || auth.uid() || '%'
    OR key LIKE 'notifications:' || auth.uid() || '%'
    OR key LIKE 'cart:' || auth.uid() || '%'
    OR key = 'service-providers');

CREATE POLICY "Users can write their own data"
ON kv_store_5eb0ec17
FOR INSERT
TO authenticated
WITH CHECK (key LIKE 'profile:' || auth.uid() || '%'
         OR key LIKE 'campaigns:' || auth.uid() || '%'
         OR key LIKE 'transactions:' || auth.uid() || '%'
         OR key LIKE 'notifications:' || auth.uid() || '%'
         OR key LIKE 'cart:' || auth.uid() || '%');

CREATE POLICY "Users can update their own data"
ON kv_store_5eb0ec17
FOR UPDATE
TO authenticated
USING (key LIKE 'profile:' || auth.uid() || '%'
    OR key LIKE 'campaigns:' || auth.uid() || '%'
    OR key LIKE 'transactions:' || auth.uid() || '%'
    OR key LIKE 'notifications:' || auth.uid() || '%'
    OR key LIKE 'cart:' || auth.uid() || '%');
```

---

## 🛠️ Troubleshooting

### Issue: "relation kv_store_5eb0ec17 does not exist"

**Solution:** You haven't created the table yet. Follow Step 3 above to create it.

### Issue: SQL query fails with permissions error

**Solution:** Make sure you're signed in as the project owner or have admin permissions.

### Issue: Can't see the table in Table Editor

**Solution:** 
1. Refresh the page
2. Check you're in the correct project
3. Try running: `SELECT * FROM kv_store_5eb0ec17;` in SQL Editor

### Issue: App can't connect to database

**Solution:**
1. Check table exists: Table Editor → kv_store_5eb0ec17
2. Check RLS policies are enabled
3. Verify SUPABASE_SERVICE_ROLE_KEY is correct
4. Check backend logs in browser DevTools

### Issue: Data not persisting

**Symptoms:**
- localStorage works
- Supabase sync fails
- No data in Supabase dashboard

**Solution:**
1. Verify table created: Go to Table Editor
2. Check browser console (F12) for errors
3. Test API endpoint directly (see Verification Step 2)
4. Check Supabase project is active (not paused)

---

## 🎯 After Setup Checklist

Once you've created the table, verify:

- [ ] Table `kv_store_5eb0ec17` exists in Supabase dashboard
- [ ] Table has 4 columns: key, value, created_at, updated_at
- [ ] RLS is enabled
- [ ] Health check endpoint returns `{"status":"ok"}`
- [ ] Can save test data via API
- [ ] Can read test data back
- [ ] Data appears in Table Editor
- [ ] Your app runs without database errors

---

## 📱 Using the Database in Your App

Once the table is created, everything works automatically!

### Automatic Hybrid Storage

Your app already uses hybrid storage - no code changes needed:

```typescript
// This automatically saves to BOTH localStorage AND Supabase
import { storage } from './utils/hybridStorage';

// Save data
await storage.set('campaigns:user123', JSON.stringify(campaigns));

// Read data
const campaigns = await storage.get('campaigns:user123');
```

### React Hooks

```typescript
import { useCampaigns } from './utils/useHybridStorage';

function MyCampaigns() {
  const { data, loading, setData } = useCampaigns();
  
  // data automatically:
  // 1. Loads from localStorage (instant)
  // 2. Syncs to Supabase (background)
  // 3. Updates every 30 seconds
  
  return <div>{data.length} campaigns</div>;
}
```

### Backend API

All these endpoints work automatically once the table exists:

```bash
# Campaigns
GET    /campaigns/:userId
POST   /campaigns/:userId
DELETE /campaigns/:userId/:id

# Profile
GET    /profile/:userId
POST   /profile/:userId

# Transactions
GET    /transactions/:userId
POST   /transactions/:userId

# And more...
```

---

## 🎉 Success!

Once you complete the setup:

1. ✅ Table is created in Supabase
2. ✅ Backend API can read/write data
3. ✅ Hybrid storage works seamlessly
4. ✅ Data persists across devices
5. ✅ Offline mode with localStorage
6. ✅ Automatic cloud sync

**Your database is now ready to use!** 🚀

---

## 📞 Quick Reference

**Table Name:** `kv_store_5eb0ec17`

**Columns:**
- `key` (TEXT, PRIMARY KEY)
- `value` (JSONB)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

**Backend URL:**
```
https://nzfmijbcuwnlkdglsmus.supabase.co/functions/v1/make-server-5eb0ec17
```

**Project ID:** `nzfmijbcuwnlkdglsmus`

**Dashboard:** https://supabase.com/dashboard/project/nzfmijbcuwnlkdglsmus

---

## 🔗 Related Documentation

- `LOCAL_SETUP_COMPLETE.md` - Complete setup overview
- `START_HERE.md` - Quick start guide
- `README.md` - Project documentation
- `TROUBLESHOOTING.md` - Common issues

---

**Remember:** Without creating this table, your app will only use localStorage. Create the table to enable cloud sync! ☁️
