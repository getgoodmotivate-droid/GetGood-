import { SubscriptionData } from '../types';

export const initializeTrial = (): SubscriptionData => {
  const now = new Date();
  const trialEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
  
  return {
    status: 'free_trial',
    trialStartDate: now.toISOString(),
    trialEndDate: trialEnd.toISOString(),
    subscriptionStartDate: null,
  };
};

export const checkSubscriptionStatus = (subscription: SubscriptionData): 'active' | 'trial' | 'expired' => {
  if (subscription.status === 'premium' && subscription.subscriptionStartDate) {
    return 'active';
  }
  
  if (subscription.status === 'free_trial' && subscription.trialEndDate) {
    const now = new Date();
    const trialEnd = new Date(subscription.trialEndDate);
    
    if (now < trialEnd) {
      return 'trial';
    } else {
      return 'expired';
    }
  }
  
  return 'expired';
};

export const getDaysRemaining = (subscription: SubscriptionData): number => {
  if (subscription.status === 'free_trial' && subscription.trialEndDate) {
    const now = new Date();
    const trialEnd = new Date(subscription.trialEndDate);
    const diff = trialEnd.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return Math.max(0, days);
  }
  
  return 0;
};

export const isPremiumFeatureAvailable = (subscription: SubscriptionData): boolean => {
  const status = checkSubscriptionStatus(subscription);
  return status === 'active' || status === 'trial';
};

// Premium features list
export const PREMIUM_FEATURES = {
  backgroundAudio: 'Background Audio Playback',
  unlimitedTransformations: 'Unlimited Transformations in Hall of Fame',
  advancedStats: 'Advanced Statistics & Analytics',
  exportData: 'Export Your Data (CSV/JSON)',
  customExercises: 'Unlimited Custom Exercises',
  darkMode: 'Dark Mode Theme',
  noAds: 'Ad-Free Experience',
};

// Pricing
export const PRICING = {
  monthly: {
    price: 4.99,
    priceId: 'price_monthly', // Replace with your Stripe Price ID
    description: 'Billed monthly',
  },
  yearly: {
    price: 39.99,
    priceId: 'price_yearly', // Replace with your Stripe Price ID
    description: 'Billed annually (Save 33%)',
    savings: '2 months free!',
  },
};

