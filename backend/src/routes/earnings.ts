import express from 'express';
import { supabase } from '../config/supabase';
import { authenticate, AuthRequest, rateLimit } from '../middleware/auth';

const router = express.Router();

// Get user earnings
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { data, error } = await supabase
      .from('earnings')
      .select('*')
      .eq('user_id', req.userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Calculate totals
    const totalEarned = data.reduce((sum: number, e: any) => sum + e.amount, 0);
    
    // Get payouts
    const { data: payouts } = await supabase
      .from('payouts')
      .select('amount')
      .eq('user_id', req.userId)
      .eq('status', 'completed');

    const totalPaidOut = payouts?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0;
    const currentBalance = totalEarned - totalPaidOut;

    res.json({
      earnings: data,
      summary: {
        totalEarned,
        totalPaidOut,
        currentBalance,
        earningsCount: data.length,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Add earning (protected with rate limiting)
router.post('/', authenticate, rateLimit(100, 24 * 60 * 60 * 1000), async (req: AuthRequest, res) => {
  try {
    const { amount, source, description } = req.body;

    // Validate
    if (!amount || !source) {
      return res.status(400).json({ error: 'Amount and source required' });
    }

    // Validate amount is reasonable
    const maxEarningPerAction = {
      'ad_view': 0.01,
      'goal_completion': 0.10,
      'streak_bonus': 0.50,
      'plant_watering': 0.02,
    };

    const maxAmount = maxEarningPerAction[source as keyof typeof maxEarningPerAction] || 0.01;
    if (amount > maxAmount) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create earning
    const { data, error } = await supabase
      .from('earnings')
      .insert({
        user_id: req.userId,
        amount,
        source,
        description: description || source.replace('_', ' '),
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, earning: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

