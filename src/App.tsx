import { useState, useEffect } from 'react';
import { SetupFlow } from './components/SetupFlow';
import { WorkoutTracker } from './components/WorkoutTracker';
import { MonthlyReview } from './components/MonthlyReview';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Navigation } from './components/Navigation';
import { AchievementsView } from './components/AchievementsView';
import { WallOfFame } from './components/WallOfFame';
import { PricingModal } from './components/PricingModal';
import { PremiumBadge } from './components/PremiumBadge';
import { UserData, Exercise, WeeklyAchievement, Transformation, Milestone } from './types';
import { loadUserData, saveUserData } from './utils/storage';
import { initializeVoices } from './utils/textToSpeech';
import { initializeTrial, checkSubscriptionStatus, getDaysRemaining, isPremiumFeatureAvailable } from './utils/subscription';
import { EditGoalsModal } from './components/EditGoalsModal';
import { MilestonesView } from './components/MilestonesView';
import { MilestoneToast } from './components/MilestoneToast';
import { SettingsModal } from './components/SettingsModal';
import { ChatbotView } from './components/ChatbotView';
import { initializeMilestones, updateMilestones, getNewlyAchievedMilestones } from './utils/milestones';
import { resetUserData } from './utils/storage';

type AppView = 'setup' | 'workout' | 'review' | 'achievements' | 'walloffame' | 'milestones' | 'coach';

function App() {
  const [userData, setUserData] = useState<UserData>(loadUserData());
  const [currentView, setCurrentView] = useState<AppView>('setup');
  const [isLoading, setIsLoading] = useState(true);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showEditGoals, setShowEditGoals] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [achievedMilestone, setAchievedMilestone] = useState<Milestone | null>(null);

  useEffect(() => {
    // Initialize text-to-speech voices
    initializeVoices();

    // Initialize trial if not set
    if (!userData.subscription.trialStartDate) {
      const trial = initializeTrial();
      setUserData({
        ...userData,
        subscription: trial,
      });
    }

    // Initialize milestones if not set
    if (!userData.milestones || userData.milestones.length === 0) {
      const milestones = initializeMilestones();
      setUserData({
        ...userData,
        milestones,
      });
    }

    // Determine initial view
    if (userData.setupComplete) {
      setCurrentView('workout');
    }
    
    // Small delay for smooth initial render
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  useEffect(() => {
    // Save user data whenever it changes
    saveUserData(userData);
  }, [userData]);

  const handleSetupComplete = (data: Partial<UserData>) => {
    const updatedData = { ...userData, ...data };
    setUserData(updatedData);
    setCurrentView('workout');
  };

  const handleUpdateExercises = (exercises: Exercise[]) => {
    // Calculate total reps
    const totalReps = exercises.reduce((sum, ex) => sum + ex.currentReps, 0);
    const oldMilestones = userData.milestones || [];
    
    // Update milestones
    const newMilestones = updateMilestones(
      oldMilestones,
      userData.totalRepsCompleted + totalReps,
      userData.totalWorkoutDays,
      userData.wallOfFame.length
    );

    // Check for newly achieved milestones
    const newlyAchieved = getNewlyAchievedMilestones(oldMilestones, newMilestones);
    if (newlyAchieved.length > 0) {
      setAchievedMilestone(newlyAchieved[0]); // Show first newly achieved
    }

    setUserData({ 
      ...userData, 
      weeklyExercises: exercises,
      milestones: newMilestones,
      totalRepsCompleted: userData.totalRepsCompleted + totalReps,
    });
  };

  const handleCheckProgress = () => {
    setCurrentView('review');
  };

  const handleReviewComplete = (afterPhoto: string, comparisonImage: string | null) => {
    // Save to wall of fame
    const transformation: Transformation = {
      id: Date.now().toString(),
      startDate: userData.startDate!,
      endDate: new Date().toISOString(),
      beforePhoto: userData.beforePhoto!,
      afterPhoto: afterPhoto,
      comparisonPhoto: comparisonImage || undefined,
      monthlyTarget: userData.monthlyTarget,
    };

    setUserData({ 
      ...userData, 
      afterPhoto,
      wallOfFame: [...userData.wallOfFame, transformation]
    });
  };

  const handleContinueTraining = () => {
    // Reset progress for next month
    const resetExercises = userData.weeklyExercises.map(ex => ({
      ...ex,
      currentReps: 0,
    }));
    
    setUserData({
      ...userData,
      weeklyExercises: resetExercises,
      startDate: new Date().toISOString(),
      beforePhoto: userData.afterPhoto, // After becomes new before
      afterPhoto: null,
      currentWeek: 1,
      weeklyAchievements: [], // Reset weekly achievements for new cycle
    });
    
    setCurrentView('workout');
  };

  const handleSaveAchievement = (achievement: WeeklyAchievement) => {
    setUserData({
      ...userData,
      weeklyAchievements: [...userData.weeklyAchievements, achievement],
      currentWeek: achievement.weekNumber + 1,
    });
  };

  const handleDeleteAchievement = (id: string) => {
    setUserData({
      ...userData,
      weeklyAchievements: userData.weeklyAchievements.filter(a => a.id !== id),
    });
  };

  const handleDeleteTransformation = (id: string) => {
    setUserData({
      ...userData,
      wallOfFame: userData.wallOfFame.filter(t => t.id !== id),
    });
  };

  const handleAddTransformation = (transformation: Omit<Transformation, 'id'>) => {
    const newTransformation: Transformation = {
      ...transformation,
      id: Date.now().toString(),
    };
    setUserData({
      ...userData,
      wallOfFame: [...userData.wallOfFame, newTransformation],
    });
  };

  const handleNavigate = (view: 'workout' | 'achievements' | 'walloffame' | 'milestones' | 'coach') => {
    setCurrentView(view);
  };

  const handleEditGoals = (data: Partial<UserData>) => {
    setUserData({ ...userData, ...data });
  };

  const handleAddCustomMilestone = (milestone: Omit<Milestone, 'id' | 'currentValue'>) => {
    const newMilestone: Milestone = {
      ...milestone,
      id: `custom_${Date.now()}`,
      currentValue: 0,
    };
    setUserData({
      ...userData,
      milestones: [...(userData.milestones || []), newMilestone],
    });
  };

  const handleDeleteMilestone = (id: string) => {
    setUserData({
      ...userData,
      milestones: (userData.milestones || []).filter(m => m.id !== id),
    });
  };

  const handleResetProgress = () => {
    const resetExercises = userData.weeklyExercises.map(ex => ({
      ...ex,
      currentReps: 0,
    }));
    setUserData({
      ...userData,
      weeklyExercises: resetExercises,
    });
  };

  const handleClearAchievements = () => {
    setUserData({
      ...userData,
      weeklyAchievements: [],
      currentWeek: 1,
    });
  };

  const handleClearMilestones = () => {
    const defaultMilestones = initializeMilestones();
    setUserData({
      ...userData,
      milestones: defaultMilestones,
      totalRepsCompleted: 0,
      totalWorkoutDays: 0,
    });
  };

  const handleResetApp = () => {
    resetUserData();
    window.location.reload();
  };

  const handleUpgrade = (plan: 'monthly' | 'yearly') => {
    // For now, just mark as premium (in production, integrate with Stripe)
    console.log('Upgrading to:', plan);
    
    // Temporary: Mark as premium immediately
    // In production, this would happen after successful Stripe payment
    setUserData({
      ...userData,
      subscription: {
        ...userData.subscription,
        status: 'premium',
        subscriptionStartDate: new Date().toISOString(),
      },
    });
    
    setShowPricingModal(false);
    
    // TODO: Integrate with Stripe Checkout
    // window.location.href = `stripe_checkout_url_for_${plan}`;
  };

  const subscriptionStatus = checkSubscriptionStatus(userData.subscription);
  const daysRemaining = getDaysRemaining(userData.subscription);
  const isPremium = isPremiumFeatureAvailable(userData.subscription);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            gEtgOOd
          </h1>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Trial/Premium Badge */}
      {currentView !== 'setup' && currentView !== 'review' && (
        <div className="fixed top-20 right-4 z-40">
          {subscriptionStatus === 'trial' ? (
            <div className="glass-effect px-4 py-2 rounded-full text-sm">
              <span className="text-slate-300">{daysRemaining} days left in trial</span>
              <button
                onClick={() => setShowPricingModal(true)}
                className="ml-2 text-primary-400 hover:text-primary-300 font-semibold"
              >
                Upgrade
              </button>
            </div>
          ) : subscriptionStatus === 'active' ? (
            <PremiumBadge size="md" />
          ) : (
            <button
              onClick={() => setShowPricingModal(true)}
              className="glass-effect px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-all"
            >
              <span className="text-red-400 font-semibold">Trial Expired</span>
              <span className="ml-2 text-primary-400">Upgrade Now</span>
            </button>
          )}
        </div>
      )}

      {/* Pricing Modal */}
      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        daysRemaining={daysRemaining}
        onUpgrade={handleUpgrade}
      />

      {/* Edit Goals Modal */}
      <EditGoalsModal
        isOpen={showEditGoals}
        onClose={() => setShowEditGoals(false)}
        userData={userData}
        onSave={handleEditGoals}
      />

      {/* Milestone Achievement Toast */}
      <MilestoneToast
        milestone={achievedMilestone}
        onClose={() => setAchievedMilestone(null)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onResetProgress={handleResetProgress}
        onClearAchievements={handleClearAchievements}
        onClearMilestones={handleClearMilestones}
        onResetApp={handleResetApp}
      />

      {currentView === 'setup' ? (
        <SetupFlow onComplete={handleSetupComplete} />
      ) : currentView === 'review' ? (
        <MonthlyReview 
          userData={userData}
          onComplete={handleReviewComplete}
          onContinue={handleContinueTraining}
        />
      ) : (
        <>
          <Navigation 
            currentView={currentView as 'workout' | 'achievements' | 'walloffame' | 'milestones' | 'coach'}
            onNavigate={handleNavigate}
          />
          
          {currentView === 'workout' && (
            <WorkoutTracker 
              userData={userData}
              onUpdateExercises={handleUpdateExercises}
              onCheckProgress={handleCheckProgress}
              isPremium={isPremium}
              onShowPricing={() => setShowPricingModal(true)}
              onEditGoals={() => setShowEditGoals(true)}
              onShowSettings={() => setShowSettings(true)}
            />
          )}
          
          {currentView === 'achievements' && (
            <AchievementsView 
              userData={userData}
              onSaveAchievement={handleSaveAchievement}
              onDeleteAchievement={handleDeleteAchievement}
            />
          )}
          
          {currentView === 'milestones' && (
            <MilestonesView
              milestones={userData.milestones || []}
              onAddCustomMilestone={handleAddCustomMilestone}
              onDeleteMilestone={handleDeleteMilestone}
            />
          )}
          
          {currentView === 'coach' && (
            <ChatbotView userData={userData} />
          )}
          
          {currentView === 'walloffame' && (
            <WallOfFame 
              userData={userData}
              onDeleteTransformation={handleDeleteTransformation}
              onAddTransformation={handleAddTransformation}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;

