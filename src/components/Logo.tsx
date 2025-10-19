import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo SVG */}
      <div className={`${sizeClasses[size]} flex-shrink-0`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle for contrast */}
          <circle
            cx="60"
            cy="60"
            r="58"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-200"
          />
          
          {/* Muscular figure silhouette */}
          <g transform="translate(60, 60)">
            {/* Head */}
            <ellipse
              cx="0"
              cy="-35"
              rx="8"
              ry="10"
              fill="currentColor"
              className="text-orange-500"
            />
            
            {/* Neck */}
            <rect
              x="-4"
              y="-25"
              width="8"
              height="8"
              fill="currentColor"
              className="text-orange-500"
            />
            
            {/* Shoulders */}
            <ellipse
              cx="0"
              cy="-15"
              rx="18"
              ry="12"
              fill="currentColor"
              className="text-orange-500"
            />
            
            {/* Chest muscles */}
            <path
              d="M -12 -10 Q 0 -5 12 -10 L 10 -5 Q 0 0 -10 -5 Z"
              fill="currentColor"
              className="text-orange-600"
            />
            
            {/* Arms */}
            <ellipse
              cx="-20"
              cy="-8"
              rx="6"
              ry="15"
              fill="currentColor"
              className="text-orange-500"
              transform="rotate(-20)"
            />
            <ellipse
              cx="20"
              cy="-8"
              rx="6"
              ry="15"
              fill="currentColor"
              className="text-orange-500"
              transform="rotate(20)"
            />
            
            {/* Barbell */}
            <rect
              x="-25"
              y="-12"
              width="50"
              height="4"
              fill="currentColor"
              className="text-orange-600"
              rx="2"
            />
            
            {/* Weight plates */}
            <rect
              x="-35"
              y="-16"
              width="8"
              height="12"
              fill="currentColor"
              className="text-orange-600"
              rx="2"
            />
            <rect
              x="27"
              y="-16"
              width="8"
              height="12"
              fill="currentColor"
              className="text-orange-600"
              rx="2"
            />
            
            {/* Arch over head */}
            <path
              d="M -18 -40 Q 0 -50 18 -40"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-orange-600"
            />
          </g>
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <div className={`font-bold text-blue-800 ${textSizeClasses[size]}`}>
          gEtgOOd
        </div>
      )}
    </div>
  );
};

export default Logo;
