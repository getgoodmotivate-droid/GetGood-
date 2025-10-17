import React, { useState } from 'react';
import { X, Trash2, AlertTriangle, RotateCcw, Database } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetProgress: () => void;
  onClearAchievements: () => void;
  onClearMilestones: () => void;
  onResetApp: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onResetProgress,
  onClearAchievements,
  onClearMilestones,
  onResetApp,
}) => {
  const [confirmAction, setConfirmAction] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAction = (action: string, callback: () => void) => {
    if (confirmAction === action) {
      callback();
      setConfirmAction(null);
      onClose();
    } else {
      setConfirmAction(action);
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
      <div className="relative glass-effect rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
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
            <Database className="w-8 h-8 text-primary-400" />
            Data Management
          </h2>
          <p className="text-slate-300 mt-2">Clear or reset your fitness data</p>
        </div>

        {/* Warning */}
        <div className="glass-effect p-4 rounded-xl mb-6 border-l-4 border-yellow-400">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-yellow-400 mb-1">Important!</p>
              <p className="text-slate-300">These actions cannot be undone. Click twice to confirm.</p>
            </div>
          </div>
        </div>

        {/* Reset Options */}
        <div className="space-y-3">
          {/* Reset Current Progress */}
          <div className="glass-effect p-4 rounded-xl">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-blue-400" />
                  Reset Current Progress
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Reset all exercise rep counters to zero. Keeps your goals and history.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleAction('resetProgress', onResetProgress)}
              className={`w-full mt-3 py-2 px-4 rounded-lg transition-all ${
                confirmAction === 'resetProgress'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'btn-secondary'
              }`}
            >
              {confirmAction === 'resetProgress' ? 'Click again to confirm' : 'Reset Progress'}
            </button>
          </div>

          {/* Clear Weekly Achievements */}
          <div className="glass-effect p-4 rounded-xl">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-orange-400" />
                  Clear Weekly Achievements
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Delete all saved weekly achievement logs. Keeps exercises and milestones.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleAction('clearAchievements', onClearAchievements)}
              className={`w-full mt-3 py-2 px-4 rounded-lg transition-all ${
                confirmAction === 'clearAchievements'
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'btn-secondary'
              }`}
            >
              {confirmAction === 'clearAchievements' ? 'Click again to confirm' : 'Clear Achievements'}
            </button>
          </div>

          {/* Clear Milestones */}
          <div className="glass-effect p-4 rounded-xl">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-purple-400" />
                  Reset Milestones
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Reset all milestone progress and remove custom milestones. Restores defaults.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleAction('clearMilestones', onClearMilestones)}
              className={`w-full mt-3 py-2 px-4 rounded-lg transition-all ${
                confirmAction === 'clearMilestones'
                  ? 'bg-purple-500 hover:bg-purple-600 text-white'
                  : 'btn-secondary'
              }`}
            >
              {confirmAction === 'clearMilestones' ? 'Click again to confirm' : 'Reset Milestones'}
            </button>
          </div>

          {/* Reset Entire App */}
          <div className="glass-effect p-4 rounded-xl border-2 border-red-500/30">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold flex items-center gap-2 text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  Reset Entire App
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Delete EVERYTHING: progress, achievements, milestones, Hall of Fame, settings. Start fresh.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleAction('resetApp', onResetApp)}
              className={`w-full mt-3 py-2 px-4 rounded-lg transition-all ${
                confirmAction === 'resetApp'
                  ? 'bg-red-500 hover:bg-red-600 text-white font-bold'
                  : 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
              }`}
            >
              {confirmAction === 'resetApp' ? '⚠️ CONFIRM: Delete Everything' : 'Reset Entire App'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 text-center text-sm text-slate-400">
          <p>Your data is stored locally in your browser.</p>
          <p className="mt-1">No data is sent to any server.</p>
        </div>
      </div>
    </div>
  );
};

