import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { PlantData } from '../types';
import { getPlantEmoji, getPlantStatus } from '../utils/plantCare';

interface PlantWidgetProps {
  plant: PlantData;
  needsWater: boolean;
  onWater: () => void;
  onClose: () => void;
}

export const PlantWidget: React.FC<PlantWidgetProps> = ({ plant, needsWater, onWater, onClose }) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 120, y: window.innerHeight - 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showMessage, setShowMessage] = useState(false);

  const status = getPlantStatus(plant);

  // Show random messages
  useEffect(() => {
    if (!needsWater) {
      const interval = setInterval(() => {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }, 30000); // Every 30 seconds

      return () => clearInterval(interval);
    }
  }, [needsWater]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const messages = needsWater 
    ? ["I'm thirsty! 💧", "Water me please! 🥺", "Need water! 💦"]
    : ["You're doing great! 💪", "Keep it up! ⭐", "Love the energy! ✨", "Proud of you! 🌟"];

  const currentMessage = messages[Math.floor(Date.now() / 10000) % messages.length];

  return (
    <div
      className="fixed z-50 pointer-events-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 w-6 h-6 glass-effect rounded-full flex items-center justify-center hover:bg-red-500 transition-all z-10"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Widget Container */}
      <div
        className={`
          glass-effect rounded-2xl p-4 shadow-2xl border-2 transition-all
          ${needsWater ? 'border-red-500 animate-pulse' : 'border-green-500/50'}
        `}
        onMouseDown={handleMouseDown}
      >
        {/* Plant Emoji */}
        <div className="text-6xl mb-2 text-center animate-bounce-slow">
          {getPlantEmoji(plant)}
        </div>

        {/* Plant Name */}
        <div className="text-center text-sm font-semibold mb-1">
          {plant.name}
        </div>

        {/* Health Bar */}
        <div className="w-24 h-2 glass-effect rounded-full overflow-hidden mb-2">
          <div
            className={`h-full transition-all ${
              plant.health > 60 ? 'bg-green-500' :
              plant.health > 30 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
            style={{ width: `${plant.health}%` }}
          />
        </div>

        {/* Status / Message */}
        {(needsWater || showMessage) && (
          <div className={`
            text-center text-xs px-3 py-2 rounded-xl mb-2 animate-fade-in
            ${needsWater ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}
          `}>
            {needsWater ? currentMessage : (showMessage ? currentMessage : status)}
          </div>
        )}

        {/* Water Button */}
        {needsWater && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWater();
            }}
            className="w-full btn-primary text-sm py-2 mt-2"
          >
            💧 Water Me!
          </button>
        )}
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

