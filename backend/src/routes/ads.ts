import express from 'express';
import { supabase } from '../config/supabase';
import { authenticate, AuthRequest, rateLimit } from '../middleware/auth';

const router = express.Router();

const AD_REVENUE_PER_VIEW = parseFloat(process.env.AD_REVENUE_PER_1000_VIEWS || '10') / 1000;
const USER_SHARE = parseFloat(process.env.USER_REVENUE_SHARE || '0.80');

// Track ad view
router.post('/view', authenticate, rateLimit(200, 24 * 60 * 60 * 1000), async (req: AuthRequest, res) => {
  try {
    const { adId, adType } = req.body;

    // Basic fraud prevention
    const now = Date.now();
    const { data: recentViews } = await supabase
      .from('ad_views')
      .select('created_at')
      .eq('user_id', req.userId)
      .gte('created_at', new Date(now - 60000).toISOString()); // Last minute

    // Max 10 ad views per minute
    if (recentViews && recentViews.length >= 10) {
      return res.status(429).json({ error: 'Too many ad views. Please slow down.' });
    }

    // Record ad view
    const { error: adError } = await supabase
      .from('ad_views')
      .insert({
        user_id: req.userId,
        ad_id: adId,
        ad_type: adType,
        created_at: new Date().toISOString(),
      });

    if (adError) throw adError;

    // Calculate user earning
    const userEarning = AD_REVENUE_PER_VIEW * USER_SHARE;

    // Credit user
    const { data: earning, error: earningError } = await supabase
      .from('earnings')
      .insert({
        user_id: req.userId,
        amount: userEarning,
        source: 'ad_view',
        description: `Ad view - ${adType || 'banner'}`,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (earningError) throw earningError;

    res.json({
      success: true,
      earned: userEarning,
      earning,
    });
  } catch (error: any) {
    console.error('Ad view error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get ad stats (for admin/user)
router.get('/stats', authenticate, async (req: AuthRequest, res) => {
  try {
    const { data, error } = await supabase
      .from('ad_views')
      .select('*')
      .eq('user_id', req.userId);

    if (error) throw error;

    res.json({
      totalViews: data.length,
      todayViews: data.filter((v: any) =>
        new Date(v.created_at).toDateString() === new Date().toDateString()
      ).length,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

