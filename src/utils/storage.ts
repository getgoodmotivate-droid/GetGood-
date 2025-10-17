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

