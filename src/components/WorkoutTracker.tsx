import React, { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw, Volume2, Trophy, Calendar, Play, Pause, Edit2, Settings } from 'lucide-react';
import { UserData, Exercise } from '../types';
import { speakPhrase } from '../utils/textToSpeech';
import { audioPlayer } from '../utils/audioPlayer';

interface WorkoutTrackerProps {
  userData: UserData;
  onUpdateExercises: (exercises: Exercise[]) => void;
  onCheckProgress: () => void;
  isPremium: boolean;
  onShowPricing: () => void;
  onEditGoals: () => void;
  onShowSettings: () => void;
}

export const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({ 
  userData, 
  onUpdateExercises,
  onCheckProgress,
  isPremium,
  onShowPricing,
  onEditGoals,
  onShowSettings
}) => {
  const [exercises, setExercises] = useState<Exercise[]>(userData.weeklyExercises);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    setExercises(userData.weeklyExercises);
  }, [userData.weeklyExercises]);

  const updateReps = (id: string, increment: number) => {
    const updated = exercises.map(ex => {
      if (ex.id === id) {
        const newReps = Math.max(0, ex.currentReps + increment);
        
        // Check if goal reached
        if (newReps === ex.targetReps && ex.currentReps < ex.targetReps) {
          setShowCelebration(true);
          speakPhrase('Great job! You hit your target!', userData.voicePreference);
          setTimeout(() => setShowCelebration(false), 3000);
        }
        
        return { ...ex, currentReps: newReps };
      }
      return ex;
    });
    setExercises(updated);
    onUpdateExercises(updated);
  };

  const resetExercise = (id: string) => {
    const updated = exercises.map(ex => 
      ex.id === id ? { ...ex, currentReps: 0 } : ex
    );
    setExercises(updated);
    onUpdateExercises(updated);
  };

  const resetAll = () => {
    const updated = exercises.map(ex => ({ ...ex, currentReps: 0 }));
    setExercises(updated);
    onUpdateExercises(updated);
  };

  const totalProgress = exercises.reduce((sum, ex) => sum + (ex.currentReps / ex.targetReps) * 100, 0) / exercises.length;

  const getDaysElapsed = () => {
    if (!userData.startDate) return 0;
    const start = new Date(userData.startDate);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const daysElapsed = getDaysElapsed();
  const canCheckProgress = daysElapsed >= 30;

  return (
    <div className="min-h-screen p-4 py-6 md:py-8">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="animate-pulse-slow text-6xl md:text-8xl">🎉</div>
        </div>
      )}

      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="glass-effect rounded-2xl md:rounded-3xl p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                gEtgOOd
              </h1>
              <p className="text-sm md:text-base text-slate-300 mt-1">Keep pushing! 💪</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={onShowSettings}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
                title="Settings"
              >
                <Settings className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <div className="text-right">
                <div className="text-xs md:text-sm text-slate-400">Day {daysElapsed}</div>
                <div className="text-xl md:text-2xl font-bold text-primary-400">{Math.round(totalProgress)}%</div>
              </div>
            </div>
          </div>

          {/* Monthly Target */}
          <div className="glass-effect p-3 md:p-4 rounded-xl relative group">
            <button
              onClick={onEditGoals}
              className="absolute top-2 right-2 p-1.5 hover:bg-white/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              title="Edit Goals"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <div className="text-xs md:text-sm text-slate-400 mb-1">Monthly Target</div>
            <div className="text-sm md:text-base font-medium pr-8">{userData.monthlyTarget}</div>
          </div>
        </div>

        {/* Motivational Controls */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
          <button
            onClick={() => speakPhrase(userData.selectedPhrase, userData.voicePreference)}
            className="glass-effect p-3 md:p-4 rounded-xl hover:bg-white/15 transition-all flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-primary-400" />
            <span className="text-sm md:text-base">Play Mantra</span>
          </button>
          <button
            onClick={() => {
              if (!isPremium) {
                onShowPricing();
                return;
              }
              
              if (isPlayingMusic) {
                audioPlayer.stop();
                setIsPlayingMusic(false);
              } else {
                // Note: You would need actual audio file URLs here
                // For now, this is a placeholder
                speakPhrase(`Now playing ${userData.selectedSong}. Get pumped up!`, userData.voicePreference);
                setIsPlayingMusic(true);
              }
            }}
            className={`glass-effect p-3 md:p-4 rounded-xl hover:bg-white/15 transition-all flex items-center justify-center gap-2 ${isPlayingMusic ? 'bg-primary-500/20' : ''} relative`}
          >
            {isPlayingMusic ? (
              <Pause className="w-4 h-4 md:w-5 md:h-5 text-primary-400" />
            ) : (
              <Play className="w-4 h-4 md:w-5 md:h-5 text-primary-400" />
            )}
            <span className="text-sm md:text-base truncate">{userData.selectedSong}</span>
            {!isPremium && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                PRO
              </span>
            )}
          </button>
        </div>

        {/* Exercises */}
        <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
          {exercises.map(exercise => {
            const progress = (exercise.currentReps / exercise.targetReps) * 100;
            const isComplete = exercise.currentReps >= exercise.targetReps;

            return (
              <div key={exercise.id} className="glass-effect rounded-xl md:rounded-2xl p-4 md:p-6 relative overflow-hidden animate-slide-in-up">
                {/* Progress Background */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />

                <div className="relative">
                  <div className="flex justify-between items-start mb-3 md:mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                        {exercise.name}
                        {isComplete && <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-300 mt-1">
                        {exercise.currentReps} / {exercise.targetReps} reps
                      </p>
                    </div>
                    <button
                      onClick={() => resetExercise(exercise.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-all"
                      title="Reset"
                    >
                      <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>

                  {/* Counter Controls */}
                  <div className="flex items-center justify-center gap-3 md:gap-4">
                    <button
                      onClick={() => updateReps(exercise.id, -1)}
                      disabled={exercise.currentReps === 0}
                      className="btn-secondary px-6 py-3 md:px-8 md:py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    
                    <div className="text-4xl md:text-5xl font-bold text-primary-400 min-w-[100px] md:min-w-[120px] text-center">
                      {exercise.currentReps}
                    </div>
                    
                    <button
                      onClick={() => updateReps(exercise.id, 1)}
                      className="btn-primary px-6 py-3 md:px-8 md:py-4"
                    >
                      <Plus className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <button
            onClick={resetAll}
            className="btn-secondary text-sm md:text-base"
          >
            <RotateCcw className="inline mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
            Reset All
          </button>
          
          <button
            onClick={onCheckProgress}
            disabled={!canCheckProgress}
            className={`text-sm md:text-base ${canCheckProgress ? 'btn-primary' : 'bg-slate-600 text-slate-400 py-3 px-6 rounded-xl cursor-not-allowed'}`}
          >
            <Calendar className="inline mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
            {canCheckProgress ? 'Monthly Check-in' : `${30 - daysElapsed} days left`}
          </button>
        </div>

        {/* Motivational Quote */}
        <div className="glass-effect rounded-xl md:rounded-2xl p-4 md:p-6 mt-4 md:mt-6 text-center">
          <p className="text-base md:text-lg italic text-slate-200">"{userData.selectedPhrase}"</p>
        </div>
      </div>
    </div>
  );
};

