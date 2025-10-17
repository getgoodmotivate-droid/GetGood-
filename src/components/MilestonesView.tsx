import React, { useState } from 'react';
import { Trophy, Target, Plus, Trash2, Star, Award, TrendingUp } from 'lucide-react';
import { Milestone } from '../types';
import { getProgressPercentage } from '../utils/milestones';

interface MilestonesViewProps {
  milestones: Milestone[];
  onAddCustomMilestone: (milestone: Omit<Milestone, 'id' | 'currentValue'>) => void;
  onDeleteMilestone: (id: string) => void;
}

export const MilestonesView: React.FC<MilestonesViewProps> = ({
  milestones,
  onAddCustomMilestone,
  onDeleteMilestone,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    targetValue: '',
    unit: 'reps' as const,
  });

  const achievedMilestones = milestones.filter(m => m.achieved);
  const inProgressMilestones = milestones.filter(m => !m.achieved);

  const handleAddMilestone = () => {
    if (newMilestone.title && newMilestone.targetValue) {
      onAddCustomMilestone({
        title: newMilestone.title,
        description: newMilestone.description,
        targetValue: parseInt(newMilestone.targetValue),
        unit: newMilestone.unit,
        achieved: false,
        category: 'custom',
        icon: '🎯',
      });
      setNewMilestone({ title: '', description: '', targetValue: '', unit: 'reps' });
      setShowAddForm(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exercise': return TrendingUp;
      case 'consistency': return Star;
      case 'transformation': return Trophy;
      default: return Target;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'exercise': return 'text-blue-400';
      case 'consistency': return 'text-purple-400';
      case 'transformation': return 'text-yellow-400';
      default: return 'text-primary-400';
    }
  };

  return (
    <div className="min-h-screen p-4 py-6 md:py-8">
      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="glass-effect rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
                Milestones
              </h1>
              <p className="text-slate-300 mt-2">Track your fitness journey achievements</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-primary"
            >
              <Plus className="inline w-5 h-5 mr-2" />
              <span className="hidden md:inline">Add Custom</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-effect p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-yellow-400">{achievedMilestones.length}</div>
              <div className="text-sm text-slate-300 mt-1">Achieved</div>
            </div>
            <div className="glass-effect p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-primary-400">{inProgressMilestones.length}</div>
              <div className="text-sm text-slate-300 mt-1">In Progress</div>
            </div>
            <div className="glass-effect p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-green-400">
                {milestones.length > 0 ? Math.round((achievedMilestones.length / milestones.length) * 100) : 0}%
              </div>
              <div className="text-sm text-slate-300 mt-1">Completion</div>
            </div>
            <div className="glass-effect p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-purple-400">{milestones.length}</div>
              <div className="text-sm text-slate-300 mt-1">Total</div>
            </div>
          </div>
        </div>

        {/* Add Custom Milestone Form */}
        {showAddForm && (
          <div className="glass-effect rounded-2xl p-6 mb-6 animate-slide-in-up">
            <h3 className="font-semibold text-lg mb-4">Create Custom Milestone</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={newMilestone.title}
                onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                placeholder="Milestone title"
                className="w-full p-3 rounded-xl glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <textarea
                value={newMilestone.description}
                onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                placeholder="Description (optional)"
                className="w-full p-3 rounded-xl glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                rows={2}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={newMilestone.targetValue}
                  onChange={(e) => setNewMilestone({ ...newMilestone, targetValue: e.target.value })}
                  placeholder="Target value"
                  className="w-full p-3 rounded-xl glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <select
                  value={newMilestone.unit}
                  onChange={(e) => setNewMilestone({ ...newMilestone, unit: e.target.value as any })}
                  className="w-full p-3 rounded-xl glass-effect text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="reps">Reps</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowAddForm(false)} className="flex-1 btn-secondary">
                  Cancel
                </button>
                <button onClick={handleAddMilestone} className="flex-1 btn-primary">
                  <Plus className="inline w-4 h-4 mr-2" />
                  Add Milestone
                </button>
              </div>
            </div>
          </div>
        )}

        {/* In Progress Milestones */}
        {inProgressMilestones.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary-400" />
              In Progress
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {inProgressMilestones.map(milestone => {
                const progress = getProgressPercentage(milestone);
                const CategoryIcon = getCategoryIcon(milestone.category);
                
                return (
                  <div key={milestone.id} className="glass-effect rounded-2xl p-5 animate-slide-in-up">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{milestone.icon}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{milestone.title}</h3>
                          <p className="text-sm text-slate-400">{milestone.description}</p>
                        </div>
                      </div>
                      {milestone.category === 'custom' && (
                        <button
                          onClick={() => onDeleteMilestone(milestone.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <CategoryIcon className={`w-4 h-4 ${getCategoryColor(milestone.category)}`} />
                      <span className="text-xs text-slate-400 capitalize">{milestone.category}</span>
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">
                          {milestone.currentValue} / {milestone.targetValue} {milestone.unit}
                        </span>
                        <span className="text-primary-400 font-semibold">{progress}%</span>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Achieved Milestones */}
        {achievedMilestones.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-400" />
              Achieved ({achievedMilestones.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievedMilestones.map(milestone => {
                const CategoryIcon = getCategoryIcon(milestone.category);
                
                return (
                  <div key={milestone.id} className="glass-effect rounded-2xl p-5 border-2 border-yellow-400/30 relative overflow-hidden">
                    {/* Achievement Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent pointer-events-none" />
                    
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-3xl">{milestone.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{milestone.title}</h3>
                          <p className="text-xs text-slate-400">{milestone.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <CategoryIcon className={`w-4 h-4 ${getCategoryColor(milestone.category)}`} />
                        <span className="text-xs text-slate-400 capitalize">{milestone.category}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-400 font-semibold flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          Completed!
                        </span>
                        {milestone.achievedDate && (
                          <span className="text-xs text-slate-400">
                            {new Date(milestone.achievedDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {milestones.length === 0 && (
          <div className="glass-effect rounded-2xl p-12 text-center">
            <Trophy className="w-20 h-20 mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-semibold mb-2">No Milestones Yet</h3>
            <p className="text-slate-400 mb-6">
              Start working out to unlock automatic milestones, or create your own custom goals!
            </p>
            <button onClick={() => setShowAddForm(true)} className="btn-primary">
              <Plus className="inline w-5 h-5 mr-2" />
              Create Your First Milestone
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

