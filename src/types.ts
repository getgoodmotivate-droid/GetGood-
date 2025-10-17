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

