export interface Exercise {
  id: string;
  name: string;
  targetReps: number;
  currentReps: number;
  personalBest?: number;
  notes?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string; // 'reps', 'days', 'weeks', 'transformations'
  achieved: boolean;
  achievedDate?: string;
  category: 'exercise' | 'consistency' | 'transformation' | 'custom';
  icon?: string;
}

export interface WeeklyAchievement {
  id: string;
  weekNumber: number;
  date: string;
  exercises: {
    name: string;
    completed: number;
    target: number;
  }[];
  totalProgress: number;
  notes?: string;
}

export interface Transformation {
  id: string;
  startDate: string;
  endDate: string;
  beforePhoto: string;
  afterPhoto: string;
  comparisonPhoto?: string;
  monthlyTarget: string;
  notes?: string;
}

export interface SubscriptionData {
  status: 'free_trial' | 'premium' | 'expired';
  trialStartDate: string | null;
  trialEndDate: string | null;
  subscriptionStartDate: string | null;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface PlantData {
  name: string;
  type: 'cactus' | 'sunflower' | 'tulip' | 'daisy' | 'tree' | 'bamboo';
  growthStage: 0 | 1 | 2 | 3 | 4; // 0=seed, 1=sprout, 2=young, 3=mature, 4=blooming
  health: number; // 0-100
  waterLevel: number; // 0-100
  lastWatered: string | null;
  totalWaterings: number;
  daysAlive: number;
}

export interface UserEarnings {
  totalEarned: number; // Total ever earned
  currentBalance: number; // Available to cash out
  lifetimePayouts: number; // Total cashed out
  earningsHistory: {
    id: string;
    amount: number;
    source: 'ad_view' | 'goal_completion' | 'streak_bonus' | 'referral';
    date: string;
    description: string;
  }[];
  payoutHistory: {
    id: string;
    amount: number;
    method: 'paypal';
    email: string;
    status: 'pending' | 'completed' | 'failed';
    date: string;
  }[];
  adViewsContributed: number;
  goalsCompleted: number;
}

export interface LoginStreak {
  currentStreak: number;
  longestStreak: number;
  lastLoginDate: string | null;
  totalLogins: number;
  loginDates: string[];
}

export interface UserData {
  setupComplete: boolean;
  startDate: string | null;
  beforePhoto: string | null;
  afterPhoto: string | null;
  monthlyTarget: string;
  weeklyExercises: Exercise[];
  selectedPhrase: string;
  selectedSong: string;
  voicePreference: 'male' | 'female';
  weeklyAchievements: WeeklyAchievement[];
  wallOfFame: Transformation[];
  currentWeek: number;
  subscription: SubscriptionData;
  milestones: Milestone[];
  totalWorkoutDays: number;
  totalRepsCompleted: number;
  plant: PlantData;
  loginStreak: LoginStreak;
  earnings: UserEarnings;
  spotifyConnected: boolean;
  spotifyPlaylistId?: string;
  paypalEmail?: string;
}

export interface MotivationalPhrase {
  id: string;
  text: string;
  category: string;
}

export interface MotivationalSong {
  id: string;
  title: string;
  artist: string;
  url: string;
}

