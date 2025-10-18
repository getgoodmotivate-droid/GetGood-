# 🖥️ gEtgOOd Backend Server

Backend API for the gEtgOOd fitness app with revenue sharing.

## ✨ Features

- ✅ User authentication (register/login)
- ✅ Earnings tracking
- ✅ PayPal payouts
- ✅ Ad view tracking
- ✅ Rate limiting & fraud prevention
- ✅ PostgreSQL database (Supabase)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

### 3. Set Up Database
Follow `SUPABASE_SETUP.md` to create your database tables.

### 4. Run Development Server
```bash
npm run dev
```

Server will start on http://localhost:3000

### 5. Test
```bash
curl http://localhost:3000/health
```

Should return: `{"status":"ok","timestamp":"..."}`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Earnings
- `GET /api/earnings` - Get user earnings
- `POST /api/earnings` - Add new earning

### Payouts
- `POST /api/payout/request` - Request payout
- `GET /api/payout/history` - Get payout history

### Ads
- `POST /api/ads/view` - Track ad view
- `GET /api/ads/stats` - Get ad statistics

## 🔐 Authentication

All endpoints (except `/health`, `/auth/register`, `/auth/login`) require authentication.

Include JWT token in headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🗄️ Database

Uses Supabase (PostgreSQL) with tables:
- `users` - User accounts
- `earnings` - All earnings transactions
- `payouts` - Payout requests and history
- `ad_views` - Ad view tracking

## 🚀 Deployment

### Railway (Recommended)
```bash
railway login
railway init
railway up
```

### Render
1. Connect GitHub repository
2. Set root directory to `backend`
3. Build: `npm install && npm run build`
4. Start: `npm start`

### Heroku
```bash
heroku create
git push heroku main
```

## 💰 Revenue Model

- User views ad → Earns £0.008 (80% of £0.01)
- Company keeps £0.002 (20%)
- Minimum payout: £5.00
- PayPal payouts processed automatically

## 🔒 Security

- JWT authentication
- Password hashing (bcrypt)
- Rate limiting (100 requests/day per user)
- Fraud detection (max 10 ad views/minute)
- Input validation

## 📦 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **Database:** PostgreSQL (Supabase)
- **Authentication:** JWT + bcrypt
- **Payments:** PayPal REST SDK

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run in development mode (with auto-reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## 🐛 Troubleshooting

**"Cannot connect to database"**
- Check SUPABASE_URL and SUPABASE_KEY in `.env`
- Verify database tables are created

**"PayPal error"**
- Check PAYPAL_CLIENT_ID and PAYPAL_SECRET
- Verify PayPal mode (sandbox vs live)

**"JWT error"**
- Check JWT_SECRET is set in `.env`
- Verify token format in Authorization header

## 📝 License

ISC

