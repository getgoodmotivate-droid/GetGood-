import React, { useState } from 'react';
import {
  Camera,
  Target,
  Dumbbell,
  MessageCircle,
  Music,
  Calendar,
  TrendingUp,
  Award,
  Image,
  Bot,
  Flame,
  Sprout,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle,
  Bell,
  Users,
  Heart,
  Zap,
} from 'lucide-react';
import Logo from './Logo';

interface FeatureGuideProps {
  onComplete: () => void;
  onSkip: () => void;
}

const FeatureGuide: React.FC<FeatureGuideProps> = ({ onComplete, onSkip }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: '👋 Welcome to gEtgOOd!',
      subtitle: 'Your Revolutionary Fitness Companion',
      description: 'Get fit AND get paid! We\'re not just another fitness app - we reward you for every workout, every goal, and every achievement.',
      features: [
        { icon: Heart, text: 'Track your fitness journey', color: 'text-red-400' },
        { icon: DollarSign, text: 'Earn money for working out', color: 'text-green-400' },
        { icon: Sprout, text: 'Grow your virtual plant companion', color: 'text-emerald-400' },
        { icon: Users, text: 'Share transformations with friends', color: 'text-blue-400' },
      ],
      emoji: '🎉',
    },
    {
      title: '🎯 Setup Your Profile',
      subtitle: 'Personalize Your Experience',
      description: 'In the next few steps, you\'ll customize your fitness journey:',
      features: [
        { icon: Camera, text: 'Take a "Before" photo to track progress', color: 'text-purple-400' },
        { icon: Target, text: 'Set your monthly fitness target', color: 'text-pink-400' },
        { icon: Dumbbell, text: 'Add your custom exercises & rep goals', color: 'text-orange-400' },
        { icon: MessageCircle, text: 'Choose motivational phrases with voice', color: 'text-blue-400' },
        { icon: Music, text: 'Select your pump-up workout songs', color: 'text-indigo-400' },
      ],
      emoji: '⚙️',
    },
    {
      title: '💪 Daily Workouts',
      subtitle: 'Track Every Rep, Earn Every Penny',
      description: 'Your main workout screen is packed with features:',
      features: [
        { icon: CheckCircle, text: 'Tap counters to track each rep', color: 'text-green-400' },
        { icon: TrendingUp, text: 'Watch real-time progress bars', color: 'text-blue-400' },
        { icon: Bell, text: 'Hear motivational phrases on demand', color: 'text-yellow-400' },
        { icon: Music, text: 'Play your workout music', color: 'text-purple-400' },
        { icon: Zap, text: 'Celebrate achievements with animations', color: 'text-orange-400' },
        { icon: DollarSign, text: 'Earn money for every goal completed', color: 'text-green-400' },
      ],
      emoji: '🏋️',
    },
    {
      title: '🌱 Your Plant Companion',
      subtitle: 'Grow Together!',
      description: 'Meet your virtual plant buddy that grows with you:',
      features: [
        { icon: Sprout, text: 'Water your plant by staying active', color: 'text-emerald-400' },
        { icon: Heart, text: 'Keep it healthy to unlock rewards', color: 'text-red-400' },
        { icon: Zap, text: 'Choose from 6 plant types (cactus, sunflower, tulip, daisy, tree, bamboo)', color: 'text-yellow-400' },
        { icon: DollarSign, text: 'Earn £0.01 for each watering', color: 'text-green-400' },
        { icon: Flame, text: 'Draggable widget follows you everywhere', color: 'text-orange-400' },
      ],
      emoji: '🌻',
    },
    {
      title: '💰 Earnings System',
      subtitle: 'Get Paid to Get Fit!',
      description: 'Our unique revenue-sharing model rewards YOU:',
      features: [
        { icon: DollarSign, text: 'Earn £0.10 for each goal completed', color: 'text-green-400' },
        { icon: Sprout, text: 'Earn £0.01 for each plant watering', color: 'text-emerald-400' },
        { icon: Calendar, text: 'Earn £0.05 for each login streak', color: 'text-blue-400' },
        { icon: TrendingUp, text: 'Share in ad revenue (£8 per 1000 views split)', color: 'text-purple-400' },
        { icon: Award, text: 'Cash out via PayPal when you reach £10', color: 'text-yellow-400' },
      ],
      emoji: '💸',
    },
    {
      title: '📊 Track Progress',
      subtitle: 'See Your Growth',
      description: 'Multiple ways to monitor your fitness journey:',
      features: [
        { icon: Calendar, text: 'Weekly Achievement Logs with notes', color: 'text-blue-400' },
        { icon: Award, text: 'Milestones for major accomplishments', color: 'text-yellow-400' },
        { icon: Image, text: 'Monthly before/after photo comparisons', color: 'text-purple-400' },
        { icon: TrendingUp, text: 'Statistics dashboard with all your data', color: 'text-green-400' },
      ],
      emoji: '📈',
    },
    {
      title: '🏆 Hall of Fame',
      subtitle: 'Celebrate Your Transformations',
      description: 'Your personal gallery of success:',
      features: [
        { icon: Image, text: 'Save unlimited transformation photos', color: 'text-purple-400' },
        { icon: Camera, text: 'Auto-generated side-by-side comparisons', color: 'text-pink-400' },
        { icon: Users, text: 'Share to social media instantly', color: 'text-blue-400' },
        { icon: Award, text: 'Add notes to each transformation', color: 'text-yellow-400' },
      ],
      emoji: '🖼️',
    },
    {
      title: '🤖 AI Fitness Coach',
      subtitle: 'Your Personal Trainer',
      description: 'Get expert advice anytime:',
      features: [
        { icon: Bot, text: 'Ask fitness questions 24/7', color: 'text-blue-400' },
        { icon: MessageCircle, text: 'Get personalized workout advice', color: 'text-purple-400' },
        { icon: Heart, text: 'Nutrition tips and meal planning', color: 'text-red-400' },
        { icon: Target, text: 'Context-aware based on your progress', color: 'text-green-400' },
      ],
      emoji: '💬',
    },
    {
      title: '🚀 Ready to Start?',
      subtitle: 'Let\'s Get You Set Up!',
      description: 'You\'re about to embark on an amazing journey. Remember:',
      features: [
        { icon: Zap, text: 'Be consistent - login daily for streaks', color: 'text-yellow-400' },
        { icon: Target, text: 'Set realistic goals you can achieve', color: 'text-blue-400' },
        { icon: Sprout, text: 'Water your plant to build the habit', color: 'text-emerald-400' },
        { icon: Users, text: 'Share your progress to stay motivated', color: 'text-purple-400' },
        { icon: DollarSign, text: 'Every workout earns you real money!', color: 'text-green-400' },
      ],
      emoji: '✨',
    },
  ];

  const currentPageData = pages[currentPage];
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === pages.length - 1;

  const handleNext = () => {
    if (isLastPage) {
      onComplete();
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 relative">
            <button
              onClick={onSkip}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              title="Skip Guide"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center">
              {currentPage === 0 && (
                <div className="mb-4">
                  <Logo size="lg" className="justify-center" />
                </div>
              )}
              <div className="text-6xl mb-4">{currentPageData.emoji}</div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {currentPageData.title}
              </h1>
              <p className="text-xl text-purple-100">{currentPageData.subtitle}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <p className="text-lg text-white/90 mb-6 text-center">
              {currentPageData.description}
            </p>

            {/* Features Grid */}
            <div className="space-y-4 mb-8">
              {currentPageData.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className={`${feature.color} p-3 bg-white/10 rounded-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-white text-lg flex-1">{feature.text}</p>
                  </div>
                );
              })}
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? 'w-8 bg-gradient-to-r from-purple-400 to-blue-400'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={handlePrevious}
                disabled={isFirstPage}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isFirstPage
                    ? 'bg-white/5 text-white/30 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-white/20 transform hover:scale-105'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="text-white/60 text-sm">
                {currentPage + 1} / {pages.length}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isLastPage ? (
                  <>
                    Let's Go!
                    <Zap className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Skip Button (bottom) */}
            {!isLastPage && (
              <div className="text-center mt-6">
                <button
                  onClick={onSkip}
                  className="text-white/50 hover:text-white/80 text-sm transition-colors underline"
                >
                  Skip guide and start setup
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-6 text-white/60 text-sm">
          <p>🔒 All your data stays private on your device</p>
          <p className="mt-1">💪 Get Good. Stay Good. gEtgOOd!</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureGuide;

