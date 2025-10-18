import express from 'express';
import { supabase } from '../config/supabase';
import { createPayout } from '../config/paypal';
import { authenticate, AuthRequest, rateLimit } from '../middleware/auth';

const router = express.Router();

const MIN_PAYOUT = parseFloat(process.env.MIN_PAYOUT || '5.00');

// Request payout
router.post('/request', authenticate, rateLimit(5, 24 * 60 * 60 * 1000), async (req: AuthRequest, res) => {
  try {
    const { paypalEmail } = req.body;

    if (!paypalEmail) {
      return res.status(400).json({ error: 'PayPal email required' });
    }

    // Calculate current balance
    const { data: earnings } = await supabase
      .from('earnings')
      .select('amount')
      .eq('user_id', req.userId);

    const totalEarned = earnings?.reduce((sum: number, e: any) => sum + e.amount, 0) || 0;

    const { data: payouts } = await supabase
      .from('payouts')
      .select('amount')
      .eq('user_id', req.userId)
      .in('status', ['completed', 'pending']);

    const totalPaidOut = payouts?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0;
    const currentBalance = totalEarned - totalPaidOut;

    // Check minimum
    if (currentBalance < MIN_PAYOUT) {
      return res.status(400).json({
        error: `Minimum payout is £${MIN_PAYOUT}`,
        currentBalance,
        needed: MIN_PAYOUT - currentBalance,
      });
    }

    // Check for pending payouts
    const { data: pending } = await supabase
      .from('payouts')
      .select('id')
      .eq('user_id', req.userId)
      .eq('status', 'pending')
      .single();

    if (pending) {
      return res.status(400).json({ error: 'You already have a pending payout' });
    }

    // Create payout record
    const { data: payoutRecord, error: insertError } = await supabase
      .from('payouts')
      .insert({
        user_id: req.userId,
        amount: currentBalance,
        paypal_email: paypalEmail,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) throw insertError;

    // Process PayPal payout
    try {
      const paypalPayout = await createPayout(paypalEmail, currentBalance);

      // Update status
      await supabase
        .from('payouts')
        .update({
          status: 'completed',
          paypal_batch_id: paypalPayout.batch_header.payout_batch_id,
          completed_at: new Date().toISOString(),
        })
        .eq('id', payoutRecord.id);

      res.json({
        success: true,
        message: 'Payout sent successfully!',
        amount: currentBalance,
        payoutId: paypalPayout.batch_header.payout_batch_id,
      });
    } catch (paypalError: any) {
      // Mark as failed
      await supabase
        .from('payouts')
        .update({
          status: 'failed',
          error_message: paypalError.message,
        })
        .eq('id', payoutRecord.id);

      throw paypalError;
    }
  } catch (error: any) {
    console.error('Payout error:', error);
    res.status(500).json({ error: error.message || 'Payout failed' });
  }
});

// Get payout history
router.get('/history', authenticate, async (req: AuthRequest, res) => {
  try {
    const { data, error } = await supabase
      .from('payouts')
      .select('*')
      .eq('user_id', req.userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ payouts: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

