# 🚀 Backend Deployment - Step by Step

## ⏱️ Total Time: 35 minutes

This will enable REAL user accounts, REAL PayPal payouts, and REAL money!

---

## STEP 1: Set Up Supabase (FREE Database) - 15 min

### **What is Supabase:**
- FREE PostgreSQL database
- 500MB storage (enough for 10,000+ users!)
- Built-in authentication
- Real-time features
- Automatic API

### **Setup Steps:**

1. **Create Account:**
   - Go to: https://supabase.com
   - Click "Start your project"
   - Sign up with your email
   - Verify email

2. **Create Project:**
   - Click "New Project"
   - Name: `getgood`
   - Database Password: (generate strong one - SAVE THIS!)
   - Region: Choose closest to you
   - Click "Create project"
   - ⏱️ Wait 2-3 minutes for setup

3. **Create Database Tables:**
   - Click "SQL Editor" in left sidebar
   - Click "New query"
   - Copy & paste this SQL:

```sql
-- Users table
create table users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  password text not null,
  name text not null,
  created_at timestamp with time zone default now()
);

-- Earnings table
create table earnings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  amount decimal(10, 4) not null,
  source text not null,
  description text,
  created_at timestamp with time zone default now()
);

-- Payouts table
create table payouts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  amount decimal(10, 2) not null,
  paypal_email text not null,
  status text default 'pending',
  paypal_batch_id text,
  error_message text,
  created_at timestamp with time zone default now(),
  completed_at timestamp with time zone
);

-- Ad views table
create table ad_views (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  ad_id text,
  ad_type text,
  created_at timestamp with time zone default now()
);

-- Indexes for performance
create index earnings_user_id_idx on earnings(user_id);
create index earnings_created_at_idx on earnings(created_at);
create index payouts_user_id_idx on payouts(user_id);
create index payouts_status_idx on payouts(status);
create index ad_views_user_id_idx on ad_views(user_id);
create index ad_views_created_at_idx on ad_views(created_at);
```

   - Click "Run" (bottom right)
   - Should see "Success. No rows returned"

4. **Get API Keys:**
   - Click "Settings" (gear icon in sidebar)
   - Click "API"
   - Find these values:

   **Copy these 3 things:**
   - `Project URL` (looks like: https://xxxxx.supabase.co)
   - `anon public` key (under "Project API keys")
   - `service_role` key (under "Project API keys" - click "Reveal")

   **SAVE THESE SAFELY!** You'll need them in Step 2!

5. **Test Connection:**
   - Click "Table Editor" in sidebar
   - You should see: users, earnings, payouts, ad_views
   - ✅ Database is ready!

---

## STEP 2: Deploy Backend to Railway (FREE) - 10 min

### **What is Railway:**
- FREE tier: 500 hours/month (plenty!)
- Automatic deployments from GitHub
- Easy environment variables
- Built-in monitoring

### **Setup Steps:**

1. **Create Account:**
   - Go to: https://railway.app
   - Click "Login with GitHub"
   - Authorize Railway

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Find your repository: `getgood` (or whatever you named it)
   - Click on it

3. **Configure Backend:**
   - Railway will detect Node.js automatically
   - Click on your project
   - Click "Settings"
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Click "Save"

4. **Add Environment Variables:**
   - Click "Variables" tab
   - Click "Add Variable" for each:

```
PORT=3000
NODE_ENV=production

SUPABASE_URL=(paste from Supabase Step 4)
SUPABASE_KEY=(paste anon key from Supabase Step 4)
SUPABASE_SERVICE_KEY=(paste service key from Supabase Step 4)

PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=(we'll add this in Step 3)
PAYPAL_SECRET=(we'll add this in Step 3)

JWT_SECRET=(generate random string, like: myapp_secret_key_12345_change_this)

FRONTEND_URL=https://g-etg-o-od-q87b.vercel.app
FRONTEND_URL_PROD=https://g-etg-o-od-q87b.vercel.app

AD_REVENUE_PER_1000_VIEWS=10.00
USER_REVENUE_SHARE=0.80
MIN_PAYOUT=5.00
```

   - Click "Add" after each

5. **Deploy:**
   - Click "Deploy" button
   - ⏱️ Wait 2-3 minutes
   - Check "Deployments" tab
   - Should see "Success" ✅

6. **Get Your Backend URL:**
   - Click "Settings"
   - Find "Domains"
   - Copy the URL (looks like: `https://backend-production-xxxx.up.railway.app`)
   - **SAVE THIS URL!**

7. **Test Backend:**
   - Open: `https://your-backend-url.railway.app/health`
   - Should see: `{"status":"ok","timestamp":"..."}`
   - ✅ Backend is live!

---

## STEP 3: Set Up PayPal - 10 min

### **Create PayPal Business Account:**

1. **Sign Up:**
   - Go to: https://www.paypal.com/bizsignup
   - Business Type: Individual / Sole Proprietor
   - Business Category: Health & Fitness
   - Use YOUR company email
   - Complete all steps
   - Verify your email

2. **Get API Credentials:**
   - Go to: https://developer.paypal.com/dashboard
   - Login with your PayPal account
   - Click "Apps & Credentials"
   - Click "Create App"
   - App Name: "gEtgOOd Fitness"
   - Click "Create App"

3. **Copy Credentials:**
   **SANDBOX (for testing):**
   - Click "Sandbox" tab
   - Copy "Client ID"
   - Click "Show" under "Secret"
   - Copy "Secret"
   
   **SAVE THESE!**

4. **Add to Railway:**
   - Go back to Railway
   - Click "Variables"
   - Update these:
     - `PAYPAL_CLIENT_ID` = (paste Client ID)
     - `PAYPAL_SECRET` = (paste Secret)
   - Click "Save"
   - Backend will auto-redeploy

5. **Create Sandbox Test Account:**
   - In PayPal Developer Dashboard
   - Click "Sandbox" → "Accounts"
   - Click "Create Account"
   - Type: Personal
   - Copy the email & password
   - **Use this to test payouts!**

---

## STEP 4: Connect Frontend to Backend - 5 min

### **Update Frontend:**

1. **Add Backend URL to Vercel:**
   - Go to: https://vercel.com/dashboard
   - Click your project
   - Click "Settings"
   - Click "Environment Variables"
   - Add new variable:
     - Name: `VITE_BACKEND_URL`
     - Value: `https://your-backend-url.railway.app` (from Step 2)
   - Click "Save"

2. **Redeploy:**
   - Click "Deployments"
   - Click "..." on latest deployment
   - Click "Redeploy"
   - ⏱️ Wait 1 minute
   - ✅ Done!

---

## ✅ **DEPLOYMENT COMPLETE!**

### **What You Now Have:**

✅ **Frontend:** https://g-etg-o-od-q87b.vercel.app/
✅ **Backend:** https://your-backend-url.railway.app/
✅ **Database:** Supabase (connected)
✅ **PayPal:** Sandbox mode (ready for testing)

---

## 🧪 **TESTING:**

### **Test User Registration:**

**Method 1: Use your app**
1. Open: https://g-etg-o-od-q87b.vercel.app/
2. Register a new account
3. Should create real account in database!

**Method 2: Direct API call**
```bash
curl -X POST https://your-backend-url.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123","name":"Test User"}'
```

Should return: `{"token":"...", "user":{...}}`

### **Verify in Supabase:**
1. Go to Supabase dashboard
2. Click "Table Editor"
3. Click "users"
4. Should see your test user! ✅

### **Test Payout (Sandbox):**
1. In your app, earn £5+ (or manually add to database)
2. Click "Cash Out"
3. Enter sandbox PayPal email (from Step 3.5)
4. Check sandbox account - should receive money!

---

## 💰 **GO LIVE WITH REAL MONEY:**

### **When Ready:**

1. **Switch PayPal to Live:**
   - Railway → Variables
   - Change `PAYPAL_MODE` from `sandbox` to `live`
   - Get LIVE credentials from PayPal
   - Update `PAYPAL_CLIENT_ID` and `PAYPAL_SECRET`

2. **Integrate Ad Network:**
   - Sign up for AdMob: https://admob.google.com
   - Add ad units to app
   - Start earning REAL revenue!

3. **Process Real Payouts:**
   - Users earn money
   - They request payout
   - PayPal sends REAL money!

---

## 📊 **MONITORING:**

### **Railway Dashboard:**
- View logs
- Check resource usage
- Monitor deployments

### **Supabase Dashboard:**
- View database
- Check user count
- Monitor queries

### **PayPal Dashboard:**
- View payouts
- Check balance
- Monitor transactions

---

## 🎉 **YOU'RE LIVE!**

Your complete app is now:
- ✅ Deployed
- ✅ Connected to database
- ✅ Ready for real users
- ✅ Ready for real money!

**Start Marketing:**
1. Share your link
2. Get users
3. Earn revenue
4. Pay users
5. Keep profit!

**Your profit:** 20% of all ad revenue
**User earnings:** 80% of ad revenue
**Win-win!** 💰

---

## 🚨 **TROUBLESHOOTING:**

**"Database connection failed"**
- Check SUPABASE_URL is correct
- Check SUPABASE_KEY is correct
- Verify tables exist in Supabase

**"PayPal error"**
- Check PAYPAL_CLIENT_ID is correct
- Check PAYPAL_SECRET is correct
- Verify in sandbox mode first

**"CORS error"**
- Check FRONTEND_URL matches your Vercel URL
- Redeploy backend after changing

**Need help?**
- Railway logs: Click "Logs" in dashboard
- Supabase logs: Click "Logs" in sidebar
- PayPal sandbox: Test with sandbox accounts first

---

**Congratulations! Your revenue-sharing fitness app is LIVE! 🎉**

