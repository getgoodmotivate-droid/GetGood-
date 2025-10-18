import React, { useState } from 'react';
import { DollarSign, TrendingUp, Gift, ArrowUpRight, Eye, Target, Flame, Download } from 'lucide-react';
import { UserData } from '../types';
import { formatCurrency, canCashOut, MIN_PAYOUT } from '../utils/earningsSystem';

interface EarningsViewProps {
  userData: UserData;
  onRequestPayout: (email: string) => void;
}

export const EarningsView: React.FC<EarningsViewProps> = ({ userData, onRequestPayout }) => {
  const [paypalEmail, setPaypalEmail] = useState(userData.paypalEmail || '');
  const [showPayoutForm, setShowPayoutForm] = useState(false);

  const handlePayout = () => {
    if (paypalEmail && canCashOut(userData.earnings)) {
      onRequestPayout(paypalEmail);
      setShowPayoutForm(false);
    }
  };

  const earnings = userData.earnings;
  const canCashOutNow = canCashOut(earnings);

  return (
    <div className="min-h-screen p-4 py-6 md:py-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header - Current Balance */}
        <div className="glass-effect rounded-2xl md:rounded-3xl p-8 mb-6 text-center relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 animate-pulse-slow" />
          
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-8 h-8 text-green-400" />
              <h1 className="text-3xl md:text-4xl font-bold">Your Earnings</h1>
            </div>
            <p className="text-slate-300 text-sm mb-6">Get paid to get fit! 💪💰</p>

            {/* Big Balance Display */}
            <div className="mb-6">
              <div className="text-6xl md:text-7xl font-bold text-green-400 mb-2">
                {formatCurrency(earnings.currentBalance)}
              </div>
              <div className="text-slate-400 text-sm">Available to Cash Out</div>
            </div>

            {/* Cash Out Button */}
            {showPayoutForm ? (
              <div className="max-w-md mx-auto space-y-3">
                <input
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  placeholder="Your PayPal email"
                  className="w-full p-3 rounded-xl glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPayoutForm(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePayout}
                    disabled={!paypalEmail || !canCashOutNow}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    <Download className="inline w-5 h-5 mr-2" />
                    Cash Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowPayoutForm(true)}
                disabled={!canCashOutNow}
                className={`
                  ${canCashOutNow ? 'btn-primary' : 'bg-slate-600 text-slate-400 py-3 px-6 rounded-xl cursor-not-allowed'}
                  text-lg
                `}
              >
                {canCashOutNow 
                  ? '💸 Cash Out to PayPal' 
                  : `Earn ${formatCurrency(MIN_PAYOUT - earnings.currentBalance)} more to cash out`
                }
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="glass-effect p-5 rounded-xl text-center">
            <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">
              {formatCurrency(earnings.totalEarned)}
            </div>
            <div className="text-xs text-slate-400 mt-1">Total Earned</div>
          </div>

          <div className="glass-effect p-5 rounded-xl text-center">
            <Gift className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">
              {formatCurrency(earnings.lifetimePayouts)}
            </div>
            <div className="text-xs text-slate-400 mt-1">Total Paid Out</div>
          </div>

          <div className="glass-effect p-5 rounded-xl text-center">
            <Eye className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">
              {earnings.adViewsContributed}
            </div>
            <div className="text-xs text-slate-400 mt-1">Ad Views</div>
          </div>

          <div className="glass-effect p-5 rounded-xl text-center">
            <Target className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-400">
              {earnings.goalsCompleted}
            </div>
            <div className="text-xs text-slate-400 mt-1">Goals Hit</div>
          </div>
        </div>

        {/* How You Earn */}
        <div className="glass-effect rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Gift className="w-6 h-6 text-green-400" />
            How You Earn Money
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 glass-effect rounded-xl">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="font-medium">Watch Ads</div>
                  <div className="text-xs text-slate-400">Share in ad revenue</div>
                </div>
              </div>
              <div className="text-green-400 font-semibold">
                ~£0.008/view
              </div>
            </div>

            <div className="flex items-center justify-between p-3 glass-effect rounded-xl">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-yellow-400" />
                <div>
                  <div className="font-medium">Complete Goals</div>
                  <div className="text-xs text-slate-400">Hit your targets</div>
                </div>
              </div>
              <div className="text-green-400 font-semibold">£0.05/goal</div>
            </div>

            <div className="flex items-center justify-between p-3 glass-effect rounded-xl">
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-orange-400" />
                <div>
                  <div className="font-medium">Maintain Streaks</div>
                  <div className="text-xs text-slate-400">7-day login bonus</div>
                </div>
              </div>
              <div className="text-green-400 font-semibold">£0.10/week</div>
            </div>

            <div className="flex items-center justify-between p-3 glass-effect rounded-xl">
              <div className="flex items-center gap-3">
                <ArrowUpRight className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="font-medium">Weekly Activity</div>
                  <div className="text-xs text-slate-400">Active all week</div>
                </div>
              </div>
              <div className="text-green-400 font-semibold">£0.50/week</div>
            </div>
          </div>
        </div>

        {/* Earnings History */}
        <div className="glass-effect rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Recent Earnings</h2>
          {earnings.earningsHistory.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No earnings yet</p>
              <p className="text-sm mt-1">Complete workouts and goals to start earning!</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {earnings.earningsHistory.slice(0, 20).map((earning) => (
                <div key={earning.id} className="flex items-center justify-between p-3 glass-effect rounded-xl">
                  <div>
                    <div className="font-medium text-sm">{earning.description}</div>
                    <div className="text-xs text-slate-400">
                      {new Date(earning.date).toLocaleDateString()} • {new Date(earning.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div className="text-green-400 font-semibold">
                    +{formatCurrency(earning.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payout History */}
        {earnings.payoutHistory.length > 0 && (
          <div className="glass-effect rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Payout History</h2>
            <div className="space-y-2">
              {earnings.payoutHistory.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between p-3 glass-effect rounded-xl">
                  <div>
                    <div className="font-medium text-sm">PayPal: {payout.email}</div>
                    <div className="text-xs text-slate-400">
                      {new Date(payout.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(payout.amount)}</div>
                    <div className={`text-xs ${
                      payout.status === 'completed' ? 'text-green-400' :
                      payout.status === 'pending' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {payout.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="glass-effect rounded-2xl p-6 mt-6 border-l-4 border-green-400">
          <h3 className="font-semibold mb-2">💡 How Revenue Sharing Works</h3>
          <p className="text-sm text-slate-300">
            We share 80% of our ad revenue with our users! Every 1,000 ad views generates ~£10. 
            We keep £2, and split £8 among active users. Plus earn bonuses for hitting goals and maintaining streaks!
          </p>
          <p className="text-sm text-green-400 mt-2">
            ✨ The more you work out, the more you earn! Win-win! 💪💰
          </p>
        </div>
      </div>
    </div>
  );
};

