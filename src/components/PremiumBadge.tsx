import React from 'react';
import { Crown } from 'lucide-react';

interface PremiumBadgeProps {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({ 
  onClick, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <button
      onClick={onClick}
      className={`
        bg-gradient-to-r from-yellow-500 to-yellow-600 
        text-white font-semibold rounded-full 
        flex items-center gap-1.5
        hover:from-yellow-600 hover:to-yellow-700
        transition-all duration-300
        shadow-lg hover:shadow-xl
        ${sizeClasses[size]}
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
      `}
    >
      <Crown className={iconSizes[size]} />
      <span>PRO</span>
    </button>
  );
};

