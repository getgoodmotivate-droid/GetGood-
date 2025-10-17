import React from 'react';
import { X, Check, Crown, Zap } from 'lucide-react';
import { PREMIUM_FEATURES, PRICING } from '../utils/subscription';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  daysRemaining: number;
  onUpgrade: (plan: 'monthly' | 'yearly') => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  daysRemaining,
  onUpgrade,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass-effect rounded-3xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Crown className="w-10 h-10 text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Upgrade to <span className="text-primary-400">Premium</span>
            </h2>
          </div>
          {daysRemaining > 0 ? (
            <p className="text-slate-300">
              You have <span className="text-primary-400 font-semibold">{daysRemaining} days</span> left in your free trial
            </p>
          ) : (
            <p className="text-slate-300">
              Your free trial has ended. Upgrade to continue using premium features!
            </p>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Monthly Plan */}
          <div className="glass-effect p-6 rounded-2xl hover:bg-white/15 transition-all">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Monthly</h3>
              <div className="text-4xl font-bold text-primary-400 mb-1">
                ${PRICING.monthly.price}
              </div>
              <p className="text-sm text-slate-400">{PRICING.monthly.description}</p>
            </div>
            <button
              onClick={() => onUpgrade('monthly')}
              className="btn-secondary w-full mb-4"
            >
              Choose Monthly
            </button>
          </div>

          {/* Yearly Plan - Popular */}
          <div className="glass-effect p-6 rounded-2xl border-2 border-primary-500 relative hover:bg-white/15 transition-all">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Zap className="w-4 h-4" />
                Best Value
              </span>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Yearly</h3>
              <div className="text-4xl font-bold text-primary-400 mb-1">
                ${PRICING.yearly.price}
              </div>
              <p className="text-sm text-slate-400">{PRICING.yearly.description}</p>
              <p className="text-sm text-green-400 font-semibold mt-1">
                {PRICING.yearly.savings}
              </p>
            </div>
            <button
              onClick={() => onUpgrade('yearly')}
              className="btn-primary w-full mb-4"
            >
              Choose Yearly
            </button>
          </div>
        </div>

        {/* Features List */}
        <div className="glass-effect p-6 rounded-2xl">
          <h3 className="font-semibold text-lg mb-4 text-center">
            What You Get with Premium:
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {Object.entries(PREMIUM_FEATURES).map(([key, feature]) => (
              <div key={key} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className="text-center mt-6 text-sm text-slate-400">
          <p>✨ Cancel anytime • 💯 30-day money-back guarantee • 🔒 Secure payment</p>
        </div>

        {/* Continue Free (if trial active) */}
        {daysRemaining > 0 && (
          <div className="text-center mt-4">
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              Continue with free trial
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

