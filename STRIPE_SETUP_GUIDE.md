# 💳 Stripe Setup Guide for gEtgOOd

## Step-by-Step Stripe Integration

### Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Click "Start now" or "Sign up"
3. Fill in your details
4. Verify your email

---

### Step 2: Get Your API Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`) ← Use this in your app
   - **Secret key** (starts with `sk_test_...`) ← Keep this SECRET (for backend only)

3. For now, we only need the **Publishable key**

---

### Step 3: Create Your Products

1. Go to https://dashboard.stripe.com/test/products
2. Click "+ Add product"

**Product 1: Monthly Plan**
- Name: `gEtgOOd Premium - Monthly`
- Description: `Premium features for gEtgOOd fitness app`
- Pricing model: `Recurring`
- Price: `$4.99`
- Billing period: `Monthly`
- Currency: `USD`
- Click "Save product"
- **Copy the Price ID** (starts with `price_...`)

**Product 2: Yearly Plan**
- Name: `gEtgOOd Premium - Yearly`
- Description: `Premium features for gEtgOOd fitness app (Save 33%!)`
- Pricing model: `Recurring`
- Price: `$39.99`
- Billing period: `Yearly`
- Currency: `USD`
- Click "Save product"
- **Copy the Price ID** (starts with `price_...`)

---

### Step 4: Configure Your App

1. Create a `.env.local` file in your project root (C:\gEtgOOd\):

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
VITE_STRIPE_MONTHLY_PRICE_ID=price_YOUR_MONTHLY_PRICE_ID
VITE_STRIPE_YEARLY_PRICE_ID=price_YOUR_YEARLY_PRICE_ID
VITE_APP_URL=http://localhost:5173
```

2. Replace the placeholders with your actual keys

---

### Step 5: Enable Payment Links (Simple Approach)

For a simple implementation without a backend:

1. Go to https://dashboard.stripe.com/test/payment-links
2. Click "New"
3. Select your "Monthly" product
4. Configure:
   - Success page: `http://localhost:5173/?payment=success`
   - Cancel page: `http://localhost:5173/?payment=cancel`
5. Click "Create link"
6. Copy the payment link URL

Repeat for Yearly plan.

---

### Step 6: Update Code with Payment Links

In `src/utils/subscription.ts`, update:

```typescript
export const PRICING = {
  monthly: {
    price: 4.99,
    paymentLink: 'https://buy.stripe.com/test_YOUR_LINK_HERE',
    description: 'Billed monthly',
  },
  yearly: {
    price: 39.99,
    paymentLink: 'https://buy.stripe.com/test_YOUR_LINK_HERE',
    description: 'Billed annually (Save 33%)',
    savings: '2 months free!',
  },
};
```

---

### Step 7: Test Payments

Stripe provides test cards:

**Success:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**Declined:**
- Card: `4000 0000 0000 0002`

**Requires 3D Secure:**
- Card: `4000 0027 6000 3184`

---

### Step 8: Handle Webhooks (Advanced)

For production, you'll want webhooks to handle subscription events.

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click "+ Add endpoint"
3. Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Signing secret**

---

## Simple Implementation (No Backend)

### Option 1: Payment Links (Easiest)

Users click "Upgrade" → Opens Stripe Payment Link → Pays → Redirected back

**Pros:**
- No backend needed
- Stripe hosts payment page
- Secure

**Cons:**
- Can't auto-update user status in app
- User must manually activate premium

### Option 2: Stripe Checkout (Recommended)

Uses `@stripe/stripe-js` to create checkout session

**Pros:**
- Better UX
- Can track payment success
- Still no backend needed initially

**Cons:**
- Need backend for full automation

---

## With Backend (Full Automation)

For full automation, you'll need a backend to:
1. Create checkout sessions
2. Receive webhook events
3. Update user premium status in database

**Tech Stack Options:**
- Node.js + Express
- Next.js API routes
- Serverless functions (Vercel, Netlify)
- Firebase Functions

---

## Security Best Practices

1. ✅ **Never** commit `.env.local` (it's in `.gitignore`)
2. ✅ **Never** expose secret key (`sk_test_...`) in frontend
3. ✅ Only use publishable key (`pk_test_...`) in frontend
4. ✅ Validate webhooks with signing secret
5. ✅ Use HTTPS in production

---

## Testing Your Implementation

1. Start dev server: `npm run dev`
2. Click "Upgrade to Premium"
3. Choose a plan
4. Use test card: `4242 4242 4242 4242`
5. Complete payment
6. Verify premium features unlock

---

## Going Live

1. Switch from Test mode to Live mode in Stripe Dashboard
2. Get Live API keys
3. Update `.env.local` with live keys
4. Create live products
5. Test with real card
6. Deploy your app!

---

## Pricing Recommendations

**Monthly Plan:** $4.99 - $9.99
**Yearly Plan:** $39.99 - $79.99 (save 20-33%)

**Trial Period:** 30 days (free)

**Target:** 
- 1000 users → 50 paid (5% conversion) → $250-500/month
- 10,000 users → 500 paid (5% conversion) → $2,500-5,000/month

---

## Next Steps

1. Set up Stripe account ✅
2. Get API keys ✅
3. Create products ✅
4. Configure `.env.local` ✅
5. Test payments ✅
6. Deploy to production 🚀

**Need help? Check Stripe docs: https://stripe.com/docs**

