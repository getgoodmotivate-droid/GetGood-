import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

// Check if we have real Supabase credentials
const hasSupabaseCredentials = 
  supabaseUrl && 
  supabaseKey && 
  !supabaseUrl.includes('placeholder') &&
  !supabaseKey.includes('placeholder');

if (!hasSupabaseCredentials) {
  console.warn('⚠️  Warning: Supabase credentials not configured. Database features will not work.');
  console.warn('   Set up Supabase at https://supabase.com and update .env file');
}

// Public client (for regular operations)
export const supabase = hasSupabaseCredentials 
  ? createClient(supabaseUrl, supabaseKey)
  : null as any;

// Admin client (for admin operations like bypassing RLS)
export const supabaseAdmin = hasSupabaseCredentials
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null as any;

// Database Tables:
// - users: User profiles
// - earnings: All earning transactions
// - payouts: Payout requests and history
// - ad_views: Ad view tracking

