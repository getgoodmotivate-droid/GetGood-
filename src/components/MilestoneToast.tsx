import React, { useEffect, useState } from 'react';
import { Trophy, X } from 'lucide-react';
import { Milestone } from '../types';

interface MilestoneToastProps {
  milestone: Milestone | null;
  onClose: () => void;
}

export const MilestoneToast: React.FC<MilestoneToastProps> = ({ milestone, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (milestone) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [milestone, onClose]);

  if (!milestone) return null;

  return (
    <div className={`
      fixed top-20 right-4 z-50 max-w-sm
      transition-all duration-300 transform
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `}>
      <div className="glass-effect rounded-2xl p-5 shadow-2xl border-2 border-yellow-400/50 animate-scale-in">
        {/* Celebration Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-2xl pointer-events-none" />
        
        <div className="relative">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-4xl animate-bounce">{milestone.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold text-sm">Milestone Achieved!</span>
                </div>
                <h3 className="font-bold text-lg">{milestone.title}</h3>
              </div>
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="p-1 hover:bg-white/10 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-slate-300 text-sm mb-3">{milestone.description}</p>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">
              {milestone.currentValue} / {milestone.targetValue} {milestone.unit}
            </span>
            <span className="text-green-400 font-semibold">100% Complete! 🎉</span>
          </div>
        </div>
      </div>
    </div>
  );
};

