import { UserEarnings } from '../types';

// Revenue sharing calculation
// Example: 1000 ad views = £10 revenue
// Company keeps £2 (20%), Users split £8 (80%)
// Each user gets £8/1000 = £0.008 per ad view

export const AD_REVENUE_RATE = 0.01; // £10 per 1000 views = £0.01 per view
export const COMPANY_COMMISSION = 0.20; // 20% company fee
export const USER_SHARE = 0.80; // 80% goes to users

export const EARNINGS_RATES = {
  adView: 0.008, // £0.008 per ad view (£8/1000 users)
  goalCompleted: 0.05, // £0.05 per goal completed
  streakBonus: 0.10, // £0.10 for maintaining 7-day streak
  milestoneBonus: 0.25, // £0.25 for achieving milestone
  plantWatering: 0.01, // £0.01 per plant watering
  weeklyActive: 0.50, // £0.50 for being active all week
};

export const MIN_PAYOUT = 5.00; // Minimum £5 to cash out

export const addEarning = (
  earnings: UserEarnings,
  amount: number,
  source: UserEarnings['earningsHistory'][0]['source'],
  description: string
): UserEarnings => {
  const earning = {
    id: Date.now().toString(),
    amount,
    source,
    date: new Date().toISOString(),
    description,
  };

  return {
    ...earnings,
    totalEarned: earnings.totalEarned + amount,
    currentBalance: earnings.currentBalance + amount,
    earningsHistory: [earning, ...earnings.earningsHistory],
  };
};

export const addAdViewEarning = (earnings: UserEarnings): UserEarnings => {
  const updated = addEarning(
    earnings,
    EARNINGS_RATES.adView,
    'ad_view',
    'Ad view contribution'
  );
  
  return {
    ...updated,
    adViewsContributed: earnings.adViewsContributed + 1,
  };
};

export const addGoalEarning = (earnings: UserEarnings, goalName: string): UserEarnings => {
  const updated = addEarning(
    earnings,
    EARNINGS_RATES.goalCompleted,
    'goal_completion',
    `Completed: ${goalName}`
  );
  
  return {
    ...updated,
    goalsCompleted: earnings.goalsCompleted + 1,
  };
};

export const addStreakBonus = (earnings: UserEarnings, days: number): UserEarnings => {
  return addEarning(
    earnings,
    EARNINGS_RATES.streakBonus,
    'streak_bonus',
    `${days}-day streak bonus`
  );
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(amount);
};

export const canCashOut = (earnings: UserEarnings): boolean => {
  return earnings.currentBalance >= MIN_PAYOUT;
};

export const requestPayout = (
  earnings: UserEarnings,
  paypalEmail: string
): UserEarnings => {
  const payout = {
    id: Date.now().toString(),
    amount: earnings.currentBalance,
    method: 'paypal' as const,
    email: paypalEmail,
    status: 'pending' as const,
    date: new Date().toISOString(),
  };

  return {
    ...earnings,
    currentBalance: 0,
    lifetimePayouts: earnings.lifetimePayouts + payout.amount,
    payoutHistory: [payout, ...earnings.payoutHistory],
  };
};

