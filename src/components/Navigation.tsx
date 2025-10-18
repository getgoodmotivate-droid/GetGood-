import React from 'react';
import { Home, TrendingUp, Trophy, Menu, X, Target, MessageCircle, Sprout, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentView: 'workout' | 'achievements' | 'walloffame' | 'milestones' | 'coach' | 'plant' | 'earnings';
  onNavigate: (view: 'workout' | 'achievements' | 'walloffame' | 'milestones' | 'coach' | 'plant' | 'earnings') => void;
  plantNeedsWater?: boolean;
  currentBalance?: number;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, plantNeedsWater, currentBalance }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'workout' as const, label: 'Workout', icon: Home },
    { id: 'plant' as const, label: 'Plant', icon: Sprout, badge: plantNeedsWater },
    { id: 'earnings' as const, label: 'Earnings', icon: DollarSign, showBalance: true },
    { id: 'achievements' as const, label: 'Progress', icon: TrendingUp },
    { id: 'milestones' as const, label: 'Milestones', icon: Target },
    { id: 'coach' as const, label: 'AI Coach', icon: MessageCircle },
    { id: 'walloffame' as const, label: 'Hall of Fame', icon: Trophy },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 glass-effect rounded-xl"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation */}
      <nav className={`
        fixed md:static inset-x-0 top-0 z-40 p-4
        ${isOpen ? 'translate-y-0' : '-translate-y-full md:translate-y-0'}
        transition-transform duration-300
      `}>
        <div className="glass-effect rounded-2xl p-2 max-w-4xl mx-auto">
          <div className="flex gap-2 justify-around overflow-x-auto">
            {navItems.map(({ id, label, icon: Icon, badge, showBalance }) => (
              <button
                key={id}
                onClick={() => {
                  onNavigate(id);
                  setIsOpen(false);
                }}
                className={`
                  flex-1 flex flex-col md:flex-row items-center justify-center gap-2 p-3 rounded-xl
                  transition-all duration-300 relative min-w-fit
                  ${currentView === id 
                    ? 'bg-primary-500 text-white shadow-lg' 
                    : 'hover:bg-white/10'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm md:text-base font-medium whitespace-nowrap">
                  {label}
                  {showBalance && currentBalance !== undefined && (
                    <span className="ml-1 text-xs text-green-400">
                      £{currentBalance.toFixed(2)}
                    </span>
                  )}
                </span>
                {badge && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

