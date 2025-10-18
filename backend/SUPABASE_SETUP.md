# 🗄️ Supabase Database Setup

## Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up (free!)
4. Create new project:
   - Name: gEtgOOd
   - Database password: (generate strong password)
   - Region: Choose closest to you

## Step 2: Create Tables

Go to **SQL Editor** in Supabase dashboard and run these commands:

### **1. Users Table**
```sql
create table users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  password text not null,
  name text not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table users enable row level security;

-- Users can only read their own data
create policy "Users can view own data"
  on users for select
  using (auth.uid() = id);
```

### **2. Earnings Table**
```sql
create table earnings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  amount decimal(10, 4) not null,
  source text not null,
  description text,
  created_at timestamp with time zone default now()
);

-- Indexes for performance
create index earnings_user_id_idx on earnings(user_id);
create index earnings_created_at_idx on earnings(created_at);

-- RLS
alter table earnings enable row level security;

create policy "Users can view own earnings"
  on earnings for select
  using (auth.uid() = user_id);
```

### **3. Payouts Table**
```sql
create table payouts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  amount decimal(10, 2) not null,
  paypal_email text not null,
  status text default 'pending' check (status in ('pending', 'completed', 'failed')),
  paypal_batch_id text,
  error_message text,
  created_at timestamp with time zone default now(),
  completed_at timestamp with time zone
);

-- Indexes
create index payouts_user_id_idx on payouts(user_id);
create index payouts_status_idx on payouts(status);

-- RLS
alter table payouts enable row level security;

create policy "Users can view own payouts"
  on payouts for select
  using (auth.uid() = user_id);
```

### **4. Ad Views Table**
```sql
create table ad_views (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  ad_id text,
  ad_type text,
  created_at timestamp with time zone default now()
);

-- Indexes
create index ad_views_user_id_idx on ad_views(user_id);
create index ad_views_created_at_idx on ad_views(created_at);

-- RLS
alter table ad_views enable row level security;

create policy "Users can view own ad views"
  on ad_views for select
  using (auth.uid() = user_id);
```

## Step 3: Get API Keys

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_KEY`
   - **service_role** key → `SUPABASE_SERVICE_KEY`

3. Add to `backend/.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
```

## Step 4: Test Connection

Run backend:
```bash
npm run dev
```

Should see:
```
🚀 Backend server running on port 3000
```

## Done! ✅

Your database is ready!

