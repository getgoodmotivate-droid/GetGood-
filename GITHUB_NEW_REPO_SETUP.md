# 🆕 Setting Up New GitHub Repository (Company Account)

## Step 1: Create New GitHub Account

1. **Log out** of current GitHub account
2. Go to https://github.com/signup
3. Sign up with your **company/app email**
4. Choose username (e.g., `getgood-app` or your company name)
5. Verify email

---

## Step 2: Create New Repository

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `getgood-fitness-app`
   - **Description:** "Revolutionary fitness app where users get paid to work out! 💪💰"
   - **Visibility:** 
     - ✅ **Private** (recommended for now)
     - Or Public (if you want it open source)
3. **Don't** initialize with README (we already have one)
4. Click **"Create repository"**

---

## Step 3: Update Your Local Git

### **Option A: Update Current Repo (Recommended)**

```bash
# Remove old remote
git remote remove origin

# Add new remote (replace YOUR_NEW_USERNAME)
git remote add origin https://github.com/YOUR_NEW_USERNAME/getgood-fitness-app.git

# Push to new repo
git push -u origin main
```

### **Option B: Fresh Start (Clean slate)**

```bash
# Create new repo folder
cd ..
mkdir getgood-app-new
cd getgood-app-new

# Initialize git
git init

# Copy all files from C:\gEtgOOd (except .git folder)
# Then:
git add .
git commit -m "Initial commit: Complete fitness app with revenue sharing"

# Add remote (replace YOUR_NEW_USERNAME)
git remote add origin https://github.com/YOUR_NEW_USERNAME/getgood-fitness-app.git

# Push
git push -u origin main
```

---

## Step 4: Deploy Backend

### **Option 1: Railway (Easiest, Free)**

1. Go to https://railway.app
2. Sign up with GitHub (use new account)
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Connect your new repository
6. Select `backend` folder
7. Railway auto-detects Node.js
8. Add environment variables (from `.env.example`)
9. Deploy!

### **Option 2: Render (Free)**

1. Go to https://render.com
2. Sign up with GitHub
3. New → Web Service
4. Connect repository
5. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
6. Add environment variables
7. Deploy!

### **Option 3: Heroku**

```bash
# Install Heroku CLI
# Then:
cd backend
heroku login
heroku create getgood-backend
git push heroku main
```

---

## Step 5: Update Frontend

### **Update API URL in Frontend:**

Create/update `/.env`:
```env
# Development
VITE_BACKEND_URL=http://localhost:3000

# Production (after deploying backend)
VITE_BACKEND_URL=https://your-backend.railway.app
```

Update `vercel.json`:
```json
{
  "env": {
    "VITE_BACKEND_URL": "https://your-backend.railway.app"
  }
}
```

---

## Step 6: Redeploy Frontend on Vercel

### **Option A: Connect New GitHub Repo to Vercel**

1. Go to https://vercel.com/dashboard
2. Import new repository
3. Deploy
4. Get new URL

### **Option B: Keep Current Vercel, Update Source**

1. Vercel Dashboard → Project Settings
2. Git → Change repository
3. Connect to new GitHub repo
4. Redeploy

---

## Step 7: Complete Setup Checklist

### **Backend:**
- [  ] Supabase account created
- [  ] Database tables created
- [  ] PayPal Business account created
- [  ] PayPal API credentials added
- [  ] Backend deployed on Railway/Render
- [  ] Environment variables configured
- [  ] Health check working (`/health`)

### **Frontend:**
- [  ] New GitHub repo created
- [  ] Code pushed to new repo
- [  ] Vercel connected to new repo
- [  ] Backend URL configured
- [  ] App deployed and working

### **Testing:**
- [  ] User registration works
- [  ] User login works
- [  ] Earnings tracking works
- [  ] PayPal payout works (sandbox)
- [  ] Ad tracking works

---

## Quick Commands Reference:

### **Update Git Remote:**
```bash
cd C:\gEtgOOd
git remote set-url origin https://github.com/YOUR_NEW_USERNAME/getgood-fitness-app.git
git push -u origin main
```

### **Test Backend Locally:**
```bash
cd backend
npm run dev
# Visit http://localhost:3000/health
```

### **Deploy Backend to Railway:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

---

## Important Notes:

### **Keep Current Vercel URL?**
- Your current URL: `https://g-etg-o-od-q87b.vercel.app/`
- You can keep this! Just reconnect to new GitHub repo

### **Private vs Public Repo:**
- **Private:** Code is hidden, only you can see
- **Public:** Anyone can view code, good for portfolio
- Recommendation: **Keep private** until you're making money, then decide

### **Backend Costs:**
- **Railway:** Free tier (500 hours/month)
- **Render:** Free tier (750 hours/month)
- **Heroku:** $7/month (no free tier anymore)
- **Supabase:** Free tier (500MB database, 2GB bandwidth)

All can handle **10,000+ users** on free tier!

---

## Need Help?

Common issues:
1. **"Permission denied"** → Make sure you're logged into new GitHub account
2. **"Repository not found"** → Double-check repository name
3. **"Failed to push"** → Make sure repo is empty (no README initialized)

---

## Next Step:

**Tell me:**
1. Your new GitHub username
2. Whether you want private or public repo

**Then I'll give you the exact commands to run!** 🚀

