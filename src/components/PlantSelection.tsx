import React from 'react';
import { Check } from 'lucide-react';
import { PlantData } from '../types';

interface PlantSelectionProps {
  selectedType: PlantData['type'];
  onSelect: (type: PlantData['type']) => void;
}

const PLANT_INFO = {
  sunflower: {
    name: 'Sunflower',
    emoji: '🌻',
    description: 'Bright and cheerful, loves attention!',
    personality: 'Energetic and positive',
  },
  tulip: {
    name: 'Tulip',
    emoji: '🌷',
    description: 'Elegant and graceful flower',
    personality: 'Calm and sophisticated',
  },
  daisy: {
    name: 'Daisy',
    emoji: '🌼',
    description: 'Simple and sweet, easy to care for',
    personality: 'Friendly and cheerful',
  },
  cactus: {
    name: 'Cactus',
    emoji: '🌵',
    description: 'Hardy and resilient, low maintenance',
    personality: 'Tough and independent',
  },
  tree: {
    name: 'Tree',
    emoji: '🌳',
    description: 'Strong and steady, grows tall',
    personality: 'Wise and patient',
  },
  bamboo: {
    name: 'Bamboo',
    emoji: '🎋',
    description: 'Flexible and fast-growing',
    personality: 'Zen and peaceful',
  },
};

export const PlantSelection: React.FC<PlantSelectionProps> = ({ selectedType, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(PLANT_INFO).map(([type, info]) => (
        <button
          key={type}
          onClick={() => onSelect(type as PlantData['type'])}
          className={`
            glass-effect p-6 rounded-2xl text-center transition-all
            ${selectedType === type 
              ? 'border-2 border-green-400 bg-green-500/20' 
              : 'hover:bg-white/15'
            }
          `}
        >
          {selectedType === type && (
            <div className="absolute top-2 right-2">
              <Check className="w-5 h-5 text-green-400" />
            </div>
          )}
          
          <div className="text-6xl mb-3">{info.emoji}</div>
          <div className="font-semibold text-lg mb-1">{info.name}</div>
          <div className="text-xs text-slate-400 mb-2">{info.personality}</div>
          <div className="text-xs text-slate-300">{info.description}</div>
        </button>
      ))}
    </div>
  );
};

