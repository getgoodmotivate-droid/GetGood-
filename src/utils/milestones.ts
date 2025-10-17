import { Milestone } from '../types';

// Default milestone templates
export const DEFAULT_MILESTONES: Omit<Milestone, 'id' | 'currentValue'>[] = [
  // Exercise Milestones
  {
    title: 'Century Club',
    description: 'Complete 100 total reps',
    targetValue: 100,
    unit: 'reps',
    achieved: false,
    category: 'exercise',
    icon: '💯',
  },
  {
    title: 'Half K',
    description: 'Complete 500 total reps',
    targetValue: 500,
    unit: 'reps',
    achieved: false,
    category: 'exercise',
    icon: '🔥',
  },
  {
    title: 'Thousand Strong',
    description: 'Complete 1,000 total reps',
    targetValue: 1000,
    unit: 'reps',
    achieved: false,
    category: 'exercise',
    icon: '💪',
  },
  
  // Consistency Milestones
  {
    title: 'Week Warrior',
    description: 'Train for 7 consecutive days',
    targetValue: 7,
    unit: 'days',
    achieved: false,
    category: 'consistency',
    icon: '⚡',
  },
  {
    title: 'Month Master',
    description: 'Train for 30 consecutive days',
    targetValue: 30,
    unit: 'days',
    achieved: false,
    category: 'consistency',
    icon: '🌟',
  },
  {
    title: 'Quarter Champ',
    description: 'Train for 90 consecutive days',
    targetValue: 90,
    unit: 'days',
    achieved: false,
    category: 'consistency',
    icon: '👑',
  },
  
  // Transformation Milestones
  {
    title: 'First Transformation',
    description: 'Complete your first 30-day cycle',
    targetValue: 1,
    unit: 'transformations',
    achieved: false,
    category: 'transformation',
    icon: '🎉',
  },
  {
    title: 'Transformation Veteran',
    description: 'Complete 3 transformations',
    targetValue: 3,
    unit: 'transformations',
    achieved: false,
    category: 'transformation',
    icon: '🏆',
  },
  {
    title: 'Year of Change',
    description: 'Complete 12 transformations',
    targetValue: 12,
    unit: 'transformations',
    achieved: false,
    category: 'transformation',
    icon: '🌈',
  },
];

export const initializeMilestones = (): Milestone[] => {
  return DEFAULT_MILESTONES.map((milestone, index) => ({
    ...milestone,
    id: `milestone_${index + 1}`,
    currentValue: 0,
  }));
};

export const checkMilestoneProgress = (
  milestone: Milestone,
  currentValue: number
): Milestone => {
  const achieved = currentValue >= milestone.targetValue;
  return {
    ...milestone,
    currentValue,
    achieved,
    achievedDate: achieved && !milestone.achieved ? new Date().toISOString() : milestone.achievedDate,
  };
};

export const updateMilestones = (
  milestones: Milestone[],
  totalReps: number,
  totalDays: number,
  totalTransformations: number
): Milestone[] => {
  return milestones.map(milestone => {
    let currentValue = milestone.currentValue;
    
    switch (milestone.unit) {
      case 'reps':
        currentValue = totalReps;
        break;
      case 'days':
        currentValue = totalDays;
        break;
      case 'transformations':
        currentValue = totalTransformations;
        break;
    }
    
    return checkMilestoneProgress(milestone, currentValue);
  });
};

export const getProgressPercentage = (milestone: Milestone): number => {
  return Math.min(100, Math.round((milestone.currentValue / milestone.targetValue) * 100));
};

export const getNewlyAchievedMilestones = (
  oldMilestones: Milestone[],
  newMilestones: Milestone[]
): Milestone[] => {
  return newMilestones.filter((newMilestone, index) => {
    const oldMilestone = oldMilestones[index];
    return newMilestone.achieved && !oldMilestone?.achieved;
  });
};

