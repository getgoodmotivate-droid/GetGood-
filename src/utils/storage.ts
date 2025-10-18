import { UserData } from '../types';

const STORAGE_KEY = 'getgood_user_data';

const defaultUserData: UserData = {
  setupComplete: false,
  startDate: null,
  beforePhoto: null,
  afterPhoto: null,
  monthlyTarget: '',
  weeklyExercises: [],
  selectedPhrase: '',
  selectedSong: '',
  voicePreference: 'male',
  weeklyAchievements: [],
  wallOfFame: [],
  currentWeek: 1,
  subscription: {
    status: 'free_trial',
    trialStartDate: null,
    trialEndDate: null,
    subscriptionStartDate: null,
  },
  milestones: [],
  totalWorkoutDays: 0,
  totalRepsCompleted: 0,
  plant: {
    name: 'Buddy',
    type: 'sunflower',
    growthStage: 0,
    health: 100,
    waterLevel: 50,
    lastWatered: null,
    totalWaterings: 0,
    daysAlive: 0,
  },
  loginStreak: {
    currentStreak: 0,
    longestStreak: 0,
    lastLoginDate: null,
    totalLogins: 0,
    loginDates: [],
  },
  earnings: {
    totalEarned: 0,
    currentBalance: 0,
    lifetimePayouts: 0,
    earningsHistory: [],
    payoutHistory: [],
    adViewsContributed: 0,
    goalsCompleted: 0,
  },
  spotifyConnected: false,
  spotifyPlaylistId: undefined,
  paypalEmail: undefined,
};

export const loadUserData = (): UserData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultUserData, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
  return defaultUserData;
};

export const saveUserData = (data: UserData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const resetUserData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting user data:', error);
  }
};

