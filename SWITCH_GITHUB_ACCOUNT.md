# 🔐 Switch to Company GitHub Account

## ⚠️ **ISSUE:**
You're authenticated as `r3verseMichael` but need to push to `getgoodmotivate-droid`.

---

## 🚀 **SOLUTION: Re-authenticate**

### **METHOD 1: Using GitHub CLI (Recommended)**

**1. Install GitHub CLI (if not installed):**
```bash
winget install --id GitHub.cli
```

**2. Login to new account:**
```bash
gh auth login
```

**3. Follow prompts:**
- Choose: **GitHub.com**
- Choose: **HTTPS**
- Authenticate: **Login with a web browser**
- Copy the code shown
- Press Enter
- **Browser will open** → Log out of old account → Log in to `getgoodmotivate-droid`
- Paste the code
- Authorize

**4. Push again:**
```bash
git push -u origin main
```

---

### **METHOD 2: Using Personal Access Token (PAT)**

**1. Create PAT on new GitHub account:**
- Go to: https://github.com/settings/tokens
- Click: **Generate new token** → **Classic**
- Name: `GetGood App Push Access`
- Select scopes: **repo** (all checkboxes)
- Click: **Generate token**
- **COPY THE TOKEN** (you won't see it again!)

**2. Update remote URL with token:**
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/getgoodmotivate-droid/GetGood-.git
```

Replace `YOUR_TOKEN` with your actual token.

**3. Push:**
```bash
git push -u origin main
```

---

### **METHOD 3: Quick Fix - Use HTTPS Authentication**

**When you run `git push`, it will ask for credentials:**

```bash
git push -u origin main
```

**Enter:**
- **Username:** `getgoodmotivate-droid`
- **Password:** Your GitHub password (or PAT if 2FA enabled)

---

## ✅ **AFTER SUCCESSFUL PUSH:**

**1. Verify on GitHub:**
- Go to: https://github.com/getgoodmotivate-droid/GetGood-
- Should see all your code!
- Should see all commits!

**2. Connect to Vercel:**
- Vercel will auto-deploy from new repo
- Or reconnect manually

**3. Auto-updates enabled:**
- Every `git push` → Vercel auto-deploys
- No manual deployment needed!
- Changes live in 2-3 minutes!

---

## 🎊 **WHAT YOU'LL HAVE:**

**After this:**
- ✅ Code on company GitHub
- ✅ Professional setup
- ✅ Auto-deployment working
- ✅ Push code → Auto-updates live
- ✅ Full version control
- ✅ Ready for team/investors!

---

## 💡 **RECOMMENDED METHOD:**

Use **GitHub CLI** (Method 1) - it's the cleanest and most secure way!

