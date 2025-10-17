import React from 'react';
import { Lock, Crown } from 'lucide-react';

interface FeatureLockProps {
  featureName: string;
  onUpgrade: () => void;
  children?: React.ReactNode;
  isLocked: boolean;
}

export const FeatureLock: React.FC<FeatureLockProps> = ({
  featureName,
  onUpgrade,
  children,
  isLocked,
}) => {
  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Blurred Content */}
      <div className="pointer-events-none opacity-50 blur-sm">
        {children}
      </div>

      {/* Lock Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl">
        <div className="text-center p-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lock className="w-8 h-8 text-yellow-400" />
            <Crown className="w-8 h-8 text-yellow-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Premium Feature</h3>
          <p className="text-slate-300 mb-4 text-sm">
            Upgrade to unlock <span className="text-primary-400 font-semibold">{featureName}</span>
          </p>
          <button
            onClick={onUpgrade}
            className="btn-primary"
          >
            <Crown className="inline w-5 h-5 mr-2" />
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

