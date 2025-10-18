import React, { useState } from 'react';
import { Droplets, Heart, TrendingUp, Award, Sparkles, Edit2, Calendar, Trophy, RefreshCw } from 'lucide-react';
import { UserData } from '../types';
import { 
  waterPlant, 
  getPlantEmoji, 
  getPlantStatus, 
  getWaterStatus, 
  getGrowthStageName,
  canWaterPlant,
  getTimeUntilNextWatering,
  initializePlant
} from '../utils/plantCare';
import { WateringAnimation } from './WateringAnimation';
import { PlantSelection } from './PlantSelection';
import { addEarning } from '../utils/earningsSystem';

interface PlantCareViewProps {
  userData: UserData;
  onUpdatePlant: (plant: UserData['plant']) => void;
  onUpdateEarnings: (earnings: UserData['earnings']) => void;
}

export const PlantCareView: React.FC<PlantCareViewProps> = ({ userData, onUpdatePlant, onUpdateEarnings }) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [showPlantSelection, setShowPlantSelection] = useState(false);
  const [showWateringAnimation, setShowWateringAnimation] = useState(false);
  const [newName, setNewName] = useState(userData.plant.name);

  const handleWater = () => {
    if (!canWaterPlant(userData.plant)) return;
    
    // Show watering animation
    setShowWateringAnimation(true);
    
    setTimeout(() => {
      const updatedPlant = waterPlant(userData.plant);
      onUpdatePlant(updatedPlant);
      
      // Add earnings for watering
      const updatedEarnings = addEarning(
        userData.earnings,
        0.01, // £0.01 per watering
        'goal_completion',
        'Watered plant'
      );
      onUpdateEarnings(updatedEarnings);
      
      // Show celebration if plant grew
      if (updatedPlant.growthStage > userData.plant.growthStage) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }, 2000); // After animation
  };

  const handleChangePlant = (type: UserData['plant']['type']) => {
    const newPlant = initializePlant(type);
    onUpdatePlant(newPlant);
    setShowPlantSelection(false);
  };

  const handleNameChange = () => {
    onUpdatePlant({
      ...userData.plant,
      name: newName || userData.plant.name,
    });
    setShowNameEdit(false);
  };

  const plant = userData.plant;
  const canWater = canWaterPlant(plant);
  const timeUntilNext = getTimeUntilNextWatering(plant);

  return (
    <div className="min-h-screen p-4 py-6 md:py-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Watering Animation */}
        <WateringAnimation 
          show={showWateringAnimation} 
          onComplete={() => setShowWateringAnimation(false)} 
        />

        {/* Celebration */}
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
            <div className="animate-pulse-slow text-8xl">🎉 Your plant grew! 🌱</div>
          </div>
        )}

        {/* Plant Selection Modal */}
        {showPlantSelection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowPlantSelection(false)} />
            <div className="relative glass-effect rounded-3xl p-6 md:p-8 max-w-4xl w-full">
              <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Plant</h2>
              <PlantSelection 
                selectedType={plant.type} 
                onSelect={handleChangePlant} 
              />
            </div>
          </div>
        )}

        {/* Header */}
        <div className="glass-effect rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-green-400" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Your Plant Buddy</h1>
              <p className="text-slate-300 text-sm">Stay active to help it grow!</p>
            </div>
          </div>

          {/* Login Streak */}
          <div className="glass-effect p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary-400" />
              <div>
                <div className="font-semibold">Login Streak</div>
                <div className="text-sm text-slate-400">
                  {userData.loginStreak.currentStreak} day{userData.loginStreak.currentStreak !== 1 ? 's' : ''} 
                  {userData.loginStreak.longestStreak > 0 && (
                    <span className="ml-2">• Record: {userData.loginStreak.longestStreak} days</span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-3xl font-bold text-primary-400">
              🔥 {userData.loginStreak.currentStreak}
            </div>
          </div>
        </div>

        {/* Plant Display */}
        <div className="glass-effect rounded-2xl md:rounded-3xl p-8 md:p-12 mb-6 text-center">
          {/* Plant Name */}
          <div className="mb-6">
            {showNameEdit ? (
              <div className="flex gap-2 max-w-xs mx-auto">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="flex-1 p-2 rounded-xl glass-effect text-white text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Plant name"
                />
                <button onClick={handleNameChange} className="btn-primary px-4">
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowNameEdit(true)}
                className="group flex items-center gap-2 mx-auto hover:bg-white/10 px-4 py-2 rounded-xl transition-all"
              >
                <h2 className="text-2xl font-bold text-green-400">{plant.name}</h2>
                <Edit2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )}
            <p className="text-slate-400 text-sm mt-1">{getGrowthStageName(plant.growthStage)}</p>
          </div>

          {/* Plant Emoji */}
          <div className="text-9xl mb-4 animate-scale-in">
            {getPlantEmoji(plant)}
          </div>

          {/* Change Plant Button */}
          <button
            onClick={() => setShowPlantSelection(true)}
            className="btn-secondary text-sm mb-8"
          >
            <RefreshCw className="inline w-4 h-4 mr-2" />
            Change Plant Type
          </button>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="glass-effect p-4 rounded-xl">
              <div className="text-xs text-slate-400 mb-1">Health</div>
              <div className="text-2xl font-bold text-red-400">{plant.health}%</div>
              <div className="h-2 bg-slate-700 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all"
                  style={{ width: `${plant.health}%` }}
                />
              </div>
            </div>

            <div className="glass-effect p-4 rounded-xl">
              <div className="text-xs text-slate-400 mb-1">Water</div>
              <div className="text-2xl font-bold text-blue-400">{plant.waterLevel}%</div>
              <div className="h-2 bg-slate-700 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                  style={{ width: `${plant.waterLevel}%` }}
                />
              </div>
            </div>

            <div className="glass-effect p-4 rounded-xl">
              <div className="text-xs text-slate-400 mb-1">Stage</div>
              <div className="text-2xl font-bold text-purple-400">{plant.growthStage + 1}/5</div>
              <div className="text-xs text-slate-400 mt-1">{getGrowthStageName(plant.growthStage)}</div>
            </div>

            <div className="glass-effect p-4 rounded-xl">
              <div className="text-xs text-slate-400 mb-1">Days Alive</div>
              <div className="text-2xl font-bold text-yellow-400">{plant.daysAlive}</div>
              <div className="text-xs text-slate-400 mt-1">{plant.totalWaterings} waterings</div>
            </div>
          </div>

          {/* Status Messages */}
          <div className="space-y-2 mb-6">
            <div className="glass-effect p-3 rounded-xl">
              <Heart className="inline w-5 h-5 mr-2 text-red-400" />
              <span>{getPlantStatus(plant)}</span>
            </div>
            <div className="glass-effect p-3 rounded-xl">
              <Droplets className="inline w-5 h-5 mr-2 text-blue-400" />
              <span>{getWaterStatus(plant)}</span>
            </div>
          </div>

          {/* Water Button */}
          <button
            onClick={handleWater}
            disabled={!canWater}
            className={`
              ${canWater ? 'btn-primary' : 'bg-slate-600 text-slate-400 py-3 px-6 rounded-xl cursor-not-allowed'}
              w-full max-w-md mx-auto text-lg
            `}
          >
            <Droplets className="inline w-6 h-6 mr-2" />
            {canWater ? 'Water Your Plant' : `Water in ${timeUntilNext}`}
          </button>

          {plant.waterLevel < 30 && (
            <p className="text-yellow-400 text-sm mt-3 animate-pulse">
              ⚠️ Your plant is thirsty! Water it by working out!
            </p>
          )}
        </div>

        {/* How to Care Instructions */}
        <div className="glass-effect rounded-2xl p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-green-400" />
            How to Care for {plant.name}
          </h3>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💧</div>
              <div>
                <div className="font-medium">Water by Being Active</div>
                <p className="text-slate-400">Complete workouts to water your plant. Can water every 4 hours!</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">📅</div>
              <div>
                <div className="font-medium">Log in Daily</div>
                <p className="text-slate-400">Your plant grows stronger with your consistency!</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🌱</div>
              <div>
                <div className="font-medium">Watch It Grow</div>
                <p className="text-slate-400">5 waterings = 1 growth stage. Reach stage 5 to see it bloom!</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <div className="font-medium">Don't Neglect It</div>
                <p className="text-slate-400">Water level decreases daily. Keep your streak alive!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="glass-effect rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Plant Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className={`glass-effect p-4 rounded-xl ${plant.totalWaterings >= 5 ? 'border-2 border-green-400' : 'opacity-50'}`}>
              <div className="flex items-center gap-3">
                <div className="text-3xl">🌱</div>
                <div>
                  <div className="font-medium">First Sprout</div>
                  <div className="text-xs text-slate-400">Water 5 times</div>
                </div>
                {plant.totalWaterings >= 5 && <Award className="ml-auto w-5 h-5 text-green-400" />}
              </div>
            </div>

            <div className={`glass-effect p-4 rounded-xl ${plant.growthStage >= 2 ? 'border-2 border-green-400' : 'opacity-50'}`}>
              <div className="flex items-center gap-3">
                <div className="text-3xl">🪴</div>
                <div>
                  <div className="font-medium">Growing Strong</div>
                  <div className="text-xs text-slate-400">Reach stage 3</div>
                </div>
                {plant.growthStage >= 2 && <Award className="ml-auto w-5 h-5 text-green-400" />}
              </div>
            </div>

            <div className={`glass-effect p-4 rounded-xl ${plant.growthStage >= 4 ? 'border-2 border-green-400' : 'opacity-50'}`}>
              <div className="flex items-center gap-3">
                <div className="text-3xl">🌸</div>
                <div>
                  <div className="font-medium">Full Bloom</div>
                  <div className="text-xs text-slate-400">Reach stage 5</div>
                </div>
                {plant.growthStage >= 4 && <Award className="ml-auto w-5 h-5 text-green-400" />}
              </div>
            </div>

            <div className={`glass-effect p-4 rounded-xl ${userData.loginStreak.currentStreak >= 7 ? 'border-2 border-green-400' : 'opacity-50'}`}>
              <div className="flex items-center gap-3">
                <div className="text-3xl">🔥</div>
                <div>
                  <div className="font-medium">Week Streak</div>
                  <div className="text-xs text-slate-400">7 day login streak</div>
                </div>
                {userData.loginStreak.currentStreak >= 7 && <Award className="ml-auto w-5 h-5 text-green-400" />}
              </div>
            </div>

            <div className={`glass-effect p-4 rounded-xl ${userData.loginStreak.longestStreak >= 30 ? 'border-2 border-green-400' : 'opacity-50'}`}>
              <div className="flex items-center gap-3">
                <div className="text-3xl">👑</div>
                <div>
                  <div className="font-medium">Month Champion</div>
                  <div className="text-xs text-slate-400">30 day streak</div>
                </div>
                {userData.loginStreak.longestStreak >= 30 && <Award className="ml-auto w-5 h-5 text-green-400" />}
              </div>
            </div>

            <div className={`glass-effect p-4 rounded-xl ${plant.totalWaterings >= 50 ? 'border-2 border-green-400' : 'opacity-50'}`}>
              <div className="flex items-center gap-3">
                <div className="text-3xl">💯</div>
                <div>
                  <div className="font-medium">Master Gardener</div>
                  <div className="text-xs text-slate-400">50 waterings</div>
                </div>
                {plant.totalWaterings >= 50 && <Award className="ml-auto w-5 h-5 text-green-400" />}
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="glass-effect rounded-2xl p-6 mt-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Plant Care Tips
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>💪 <strong>Complete workouts</strong> to unlock watering</li>
            <li>📅 <strong>Log in daily</strong> to maintain your streak</li>
            <li>🌱 <strong>Water every 4 hours</strong> when available</li>
            <li>❤️ <strong>Keep health above 40%</strong> for optimal growth</li>
            <li>🏆 <strong>Reach stage 5</strong> to see your plant bloom!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

