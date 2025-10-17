import React, { useState } from 'react';
import { X, Edit2, Save, Plus, Trash2 } from 'lucide-react';
import { UserData, Exercise } from '../types';

interface EditGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
  onSave: (data: Partial<UserData>) => void;
}

export const EditGoalsModal: React.FC<EditGoalsModalProps> = ({
  isOpen,
  onClose,
  userData,
  onSave,
}) => {
  const [monthlyTarget, setMonthlyTarget] = useState(userData.monthlyTarget);
  const [exercises, setExercises] = useState<Exercise[]>([...userData.weeklyExercises]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseReps, setNewExerciseReps] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      monthlyTarget,
      weeklyExercises: exercises,
    });
    onClose();
  };

  const updateExercise = (id: string, field: keyof Exercise, value: string | number) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const deleteExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const addExercise = () => {
    if (newExerciseName && newExerciseReps) {
      const newExercise: Exercise = {
        id: Date.now().toString(),
        name: newExerciseName,
        targetReps: parseInt(newExerciseReps),
        currentReps: 0,
      };
      setExercises([...exercises, newExercise]);
      setNewExerciseName('');
      setNewExerciseReps('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass-effect rounded-3xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Edit2 className="w-8 h-8 text-primary-400" />
            Edit Your Goals
          </h2>
          <p className="text-slate-300 mt-2">Update your targets and exercises</p>
        </div>

        {/* Monthly Target */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Monthly Target</label>
          <textarea
            value={monthlyTarget}
            onChange={(e) => setMonthlyTarget(e.target.value)}
            placeholder="e.g., Lose 5 pounds, Build muscle..."
            className="w-full p-3 rounded-xl glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={3}
          />
        </div>

        {/* Exercises */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Your Exercises</h3>
          
          {/* Existing Exercises */}
          <div className="space-y-3 mb-4">
            {exercises.map(exercise => (
              <div key={exercise.id} className="glass-effect p-4 rounded-xl">
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <label className="text-xs text-slate-400">Exercise Name</label>
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                      className="w-full p-2 rounded-lg glass-effect text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-slate-400">Target Reps</label>
                      <input
                        type="number"
                        value={exercise.targetReps}
                        onChange={(e) => updateExercise(exercise.id, 'targetReps', parseInt(e.target.value) || 0)}
                        className="w-full p-2 rounded-lg glass-effect text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <button
                      onClick={() => deleteExercise(exercise.id)}
                      className="self-end p-2 hover:bg-red-500/20 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
                
                {/* Notes */}
                <div className="mt-3">
                  <label className="text-xs text-slate-400">Notes (optional)</label>
                  <input
                    type="text"
                    value={exercise.notes || ''}
                    onChange={(e) => updateExercise(exercise.id, 'notes', e.target.value)}
                    placeholder="e.g., Focus on form, increase weight..."
                    className="w-full p-2 rounded-lg glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add New Exercise */}
          <div className="glass-effect p-4 rounded-xl border-2 border-dashed border-white/20">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary-400" />
              Add New Exercise
            </h4>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={newExerciseName}
                  onChange={(e) => setNewExerciseName(e.target.value)}
                  placeholder="Exercise name"
                  className="w-full p-2 rounded-lg glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <input
                type="number"
                value={newExerciseReps}
                onChange={(e) => setNewExerciseReps(e.target.value)}
                placeholder="Target reps"
                className="w-full p-2 rounded-lg glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              onClick={addExercise}
              disabled={!newExerciseName || !newExerciseReps}
              className="btn-secondary w-full mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="inline w-4 h-4 mr-2" />
              Add Exercise
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 btn-primary"
          >
            <Save className="inline w-5 h-5 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

