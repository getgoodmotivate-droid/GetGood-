import { PlantData, LoginStreak } from '../types';

export const PLANT_EMOJIS = {
  cactus: ['🌵', '🌵', '🌵🌵', '🌵🌵🌵', '🌵🌵🌵🌸'],
  sunflower: ['🌱', '🌿', '🌻', '🌻🌻', '🌻✨💛'],
  tulip: ['🌱', '🌷', '🌷🌷', '🌷🌷🌷', '🌷✨🌸'],
  daisy: ['🌱', '🌼', '🌼🌼', '🌼🌼🌼', '🌼✨🤍'],
  tree: ['🌰', '🌱', '🌲', '🌳', '🌳🍎'],
  bamboo: ['🌾', '🎋', '🎋🎋', '🎋🎋🎋', '🎋🎋🎋✨'],
};

export const PLANT_NAMES = {
  cactus: ['Spike', 'Prickles', 'Desert Buddy', 'Hardy'],
  sunflower: ['Sunny', 'Ray', 'Bloom', 'Sunshine'],
  tulip: ['Tulip', 'Petal', 'Flora', 'Grace'],
  daisy: ['Daisy', 'Whitey', 'Cheerful', 'Happy'],
  tree: ['Groot', 'Oakley', 'Forest', 'Willow'],
  bamboo: ['Zen', 'Lucky', 'Bamboo Bob', 'Peace'],
};

export const initializePlant = (type: PlantData['type'], name?: string): PlantData => {
  const defaultNames = PLANT_NAMES[type];
  return {
    name: name || defaultNames[Math.floor(Math.random() * defaultNames.length)],
    type,
    growthStage: 0,
    health: 100,
    waterLevel: 50,
    lastWatered: null,
    totalWaterings: 0,
    daysAlive: 0,
  };
};

export const waterPlant = (plant: PlantData): PlantData => {
  const newWaterLevel = Math.min(100, plant.waterLevel + 20);
  const newHealth = Math.min(100, plant.health + 5);
  
  // Check if plant should grow
  const shouldGrow = plant.totalWaterings > 0 && (plant.totalWaterings + 1) % 5 === 0 && plant.growthStage < 4;
  
  return {
    ...plant,
    waterLevel: newWaterLevel,
    health: newHealth,
    lastWatered: new Date().toISOString(),
    totalWaterings: plant.totalWaterings + 1,
    growthStage: shouldGrow ? ((plant.growthStage + 1) as PlantData['growthStage']) : plant.growthStage,
  };
};

export const updatePlantDaily = (plant: PlantData): PlantData => {
  // Decrease water level daily
  const newWaterLevel = Math.max(0, plant.waterLevel - 15);
  
  // Decrease health if water is low
  let newHealth = plant.health;
  if (newWaterLevel < 30) {
    newHealth = Math.max(0, plant.health - 10);
  }
  
  return {
    ...plant,
    waterLevel: newWaterLevel,
    health: newHealth,
    daysAlive: plant.daysAlive + 1,
  };
};

export const getPlantEmoji = (plant: PlantData): string => {
  return PLANT_EMOJIS[plant.type][plant.growthStage];
};

export const getPlantStatus = (plant: PlantData): string => {
  if (plant.health >= 80) return 'Thriving! 🌟';
  if (plant.health >= 60) return 'Healthy! 💚';
  if (plant.health >= 40) return 'Needs care 🌤️';
  if (plant.health >= 20) return 'Struggling 😰';
  return 'Critical! 🆘';
};

export const getWaterStatus = (plant: PlantData): string => {
  if (plant.waterLevel >= 70) return 'Well hydrated! 💧';
  if (plant.waterLevel >= 40) return 'Could use water 💦';
  if (plant.waterLevel >= 20) return 'Thirsty! 🏜️';
  return 'Very thirsty! 🆘';
};

export const getGrowthStageName = (stage: PlantData['growthStage']): string => {
  const stages = ['Seed', 'Sprout', 'Young Plant', 'Mature', 'Blooming'];
  return stages[stage];
};

// Login streak management
export const updateLoginStreak = (streak: LoginStreak): LoginStreak => {
  const today = new Date().toISOString().split('T')[0];
  const lastLogin = streak.lastLoginDate?.split('T')[0];
  
  if (lastLogin === today) {
    // Already logged in today
    return streak;
  }
  
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  let newStreak = streak.currentStreak;
  if (lastLogin === yesterday) {
    // Consecutive day
    newStreak = streak.currentStreak + 1;
  } else if (lastLogin !== today) {
    // Streak broken
    newStreak = 1;
  }
  
  return {
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, streak.longestStreak),
    lastLoginDate: new Date().toISOString(),
    totalLogins: streak.totalLogins + 1,
    loginDates: [...streak.loginDates, today],
  };
};

export const canWaterPlant = (plant: PlantData): boolean => {
  if (!plant.lastWatered) return true;
  
  const lastWatered = new Date(plant.lastWatered);
  const now = new Date();
  const hoursSinceWatered = (now.getTime() - lastWatered.getTime()) / (1000 * 60 * 60);
  
  // Can water every 4 hours
  return hoursSinceWatered >= 4;
};

export const getTimeUntilNextWatering = (plant: PlantData): string => {
  if (!plant.lastWatered) return 'Now!';
  
  const lastWatered = new Date(plant.lastWatered);
  const now = new Date();
  const hoursSinceWatered = (now.getTime() - lastWatered.getTime()) / (1000 * 60 * 60);
  const hoursUntilNext = Math.max(0, 4 - hoursSinceWatered);
  
  if (hoursUntilNext === 0) return 'Now!';
  if (hoursUntilNext < 1) return `${Math.round(hoursUntilNext * 60)} min`;
  return `${Math.round(hoursUntilNext)} hr`;
};

