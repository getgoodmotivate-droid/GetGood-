import React, { useEffect, useState } from 'react';

interface WateringAnimationProps {
  show: boolean;
  onComplete: () => void;
}

export const WateringAnimation: React.FC<WateringAnimationProps> = ({ show, onComplete }) => {
  const [drops, setDrops] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    if (show) {
      // Generate water drops
      const newDrops = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 1000,
      }));
      setDrops(newDrops);

      // Auto complete after animation
      const timer = setTimeout(() => {
        onComplete();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Water Drops */}
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute text-4xl animate-fall"
          style={{
            left: `${drop.x}%`,
            top: '-10%',
            animationDelay: `${drop.delay}ms`,
            animationDuration: '2s',
          }}
        >
          💧
        </div>
      ))}

      {/* Sparkles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl animate-bounce">
          ✨ +£0.01 ✨
        </div>
      </div>

      <style>{`
        @keyframes fall {
          from {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          to {
            transform: translateY(120vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall 2s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

