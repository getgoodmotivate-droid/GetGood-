import React, { useState } from 'react';
import { Calendar, TrendingUp, Award, ChevronRight, Save, Trash2 } from 'lucide-react';
import { UserData, WeeklyAchievement } from '../types';

interface AchievementsViewProps {
  userData: UserData;
  onSaveAchievement: (achievement: WeeklyAchievement) => void;
  onDeleteAchievement: (id: string) => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ 
  userData, 
  onSaveAchievement,
  onDeleteAchievement
}) => {
  const [notes, setNotes] = useState('');

  const getDaysElapsed = () => {
    if (!userData.startDate) return 0;
    const start = new Date(userData.startDate);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const getCurrentWeek = () => {
    return Math.floor(getDaysElapsed() / 7) + 1;
  };

  const saveWeeklyProgress = () => {
    const totalProgress = userData.weeklyExercises.reduce(
      (sum, ex) => sum + (ex.currentReps / ex.targetReps) * 100, 
      0
    ) / userData.weeklyExercises.length;

    const achievement: WeeklyAchievement = {
      id: Date.now().toString(),
      weekNumber: getCurrentWeek(),
      date: new Date().toISOString(),
      exercises: userData.weeklyExercises.map(ex => ({
        name: ex.name,
        completed: ex.currentReps,
        target: ex.targetReps,
      })),
      totalProgress: Math.round(totalProgress),
      notes: notes || undefined,
    };

    onSaveAchievement(achievement);
    setNotes('');
  };

  const sortedAchievements = [...userData.weeklyAchievements].sort(
    (a, b) => b.weekNumber - a.weekNumber
  );

  return (
    <div className="min-h-screen p-4 py-6 md:py-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Current Week Summary */}
        <div className="glass-effect rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-primary-400" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Your Progress</h1>
              <p className="text-slate-300 text-sm">Track your fitness journey</p>
            </div>
          </div>

          {/* Current Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="glass-effect p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-primary-400">{getDaysElapsed()}</div>
              <div className="text-sm text-slate-300 mt-1">Days Active</div>
            </div>
            <div className="glass-effect p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-primary-400">{getCurrentWeek()}</div>
              <div className="text-sm text-slate-300 mt-1">Current Week</div>
            </div>
            <div className="glass-effect p-4 rounded-xl text-center col-span-2 md:col-span-1">
              <div className="text-3xl font-bold text-primary-400">
                {userData.weeklyAchievements.length}
              </div>
              <div className="text-sm text-slate-300 mt-1">Logs Saved</div>
            </div>
          </div>

          {/* Save Current Week */}
          <div className="space-y-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this week (optional)..."
              className="w-full p-3 rounded-xl glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows={3}
            />
            <button
              onClick={saveWeeklyProgress}
              className="btn-primary w-full"
            >
              <Save className="inline mr-2 w-5 h-5" />
              Save Week {getCurrentWeek()} Progress
            </button>
          </div>
        </div>

        {/* Achievement History */}
        <div className="glass-effect rounded-2xl md:rounded-3xl p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary-400" />
            Achievement History
          </h2>

          {sortedAchievements.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No achievements logged yet.</p>
              <p className="text-sm mt-2">Complete workouts and save your progress!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedAchievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className="glass-effect p-5 rounded-xl hover:bg-white/15 transition-all animate-slide-in-up relative group"
                >
                  <button
                    onClick={() => {
                      if (confirm('Delete this weekly achievement? This cannot be undone.')) {
                        onDeleteAchievement(achievement.id);
                      }
                    }}
                    className="absolute top-3 right-3 p-2 hover:bg-red-500/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>

                  <div className="flex justify-between items-start mb-3 pr-8">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">Week {achievement.weekNumber}</h3>
                        {achievement.totalProgress >= 80 && (
                          <Award className="w-5 h-5 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-sm text-slate-400">
                        {new Date(achievement.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-400">
                        {achievement.totalProgress}%
                      </div>
                      <div className="text-xs text-slate-400">Completed</div>
                    </div>
                  </div>

                  {/* Exercise Details */}
                  <div className="space-y-2 mb-3">
                    {achievement.exercises.map((ex, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-slate-300">{ex.name}</span>
                        <span className={ex.completed >= ex.target ? 'text-green-400' : 'text-slate-400'}>
                          {ex.completed}/{ex.target} reps
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Notes */}
                  {achievement.notes && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-sm text-slate-300 italic">"{achievement.notes}"</p>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
                      style={{ width: `${achievement.totalProgress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Weekly Tips */}
        <div className="glass-effect rounded-2xl p-6 mt-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <ChevronRight className="w-5 h-5 text-primary-400" />
            Pro Tips
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Log your progress weekly to track patterns</li>
            <li>• Add notes about what worked well or challenges faced</li>
            <li>• Aim for consistent improvement each week</li>
            <li>• Celebrate small wins - every rep counts!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

