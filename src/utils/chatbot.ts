import { UserData } from '../types';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Rule-based fitness coach responses
export class FitnessCoachBot {
  private userData: UserData;

  constructor(userData: UserData) {
    this.userData = userData;
  }

  getResponse(userMessage: string): string {
    const message = userMessage.toLowerCase().trim();

    // Greeting responses
    if (this.isGreeting(message)) {
      return this.getGreeting();
    }

    // Motivation requests
    if (this.isMotivationRequest(message)) {
      return this.getMotivation();
    }

    // Progress questions
    if (this.isProgressQuestion(message)) {
      return this.getProgressUpdate();
    }

    // Exercise advice
    if (this.isExerciseQuestion(message)) {
      return this.getExerciseAdvice(message);
    }

    // Goal setting
    if (this.isGoalQuestion(message)) {
      return this.getGoalAdvice();
    }

    // Tips
    if (this.isTipsRequest(message)) {
      return this.getTips();
    }

    // Struggling
    if (this.isStrugglingMessage(message)) {
      return this.getEncouragement();
    }

    // Default response
    return this.getDefaultResponse();
  }

  private isGreeting(msg: string): boolean {
    return /^(hi|hello|hey|sup|yo|good morning|good evening)/.test(msg);
  }

  private isMotivationRequest(msg: string): boolean {
    return /motivat|inspire|encourag|pump.*up|need.*push/.test(msg);
  }

  private isProgressQuestion(msg: string): boolean {
    return /progress|how.*doing|how am i|stats|performance/.test(msg);
  }

  private isExerciseQuestion(msg: string): boolean {
    return /push.*up|sit.*up|squat|plank|exercise|form|technique|how.*do/.test(msg);
  }

  private isGoalQuestion(msg: string): boolean {
    return /goal|target|should.*aim|how much|how many|recommend/.test(msg);
  }

  private isTipsRequest(msg: string): boolean {
    return /tip|advice|suggestion|help|improve|better/.test(msg);
  }

  private isStrugglingMessage(msg: string): boolean {
    return /hard|difficult|can't|struggling|tired|sore|pain|quit|give up/.test(msg);
  }

  private getGreeting(): string {
    const greetings = [
      `Hey there! 💪 I'm your AI fitness coach. Ready to crush some goals today?`,
      `Hello, champ! 🔥 How can I help you with your fitness journey?`,
      `Hey! 👋 Let's make today count. What do you need?`,
      `What's up! 💯 Your coach is here. How can I support you?`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  private getMotivation(): string {
    const motivations = [
      `${this.userData.selectedPhrase} Remember why you started! 💪`,
      `You've already completed ${this.userData.totalRepsCompleted} total reps! That's INCREDIBLE! Keep going! 🔥`,
      `Every rep brings you closer to your goal: ${this.userData.monthlyTarget}. Don't stop now! 💯`,
      `Look how far you've come! You're on day ${this.getDaysActive()}. You're building a real habit! 🌟`,
      `The pain you feel today is the strength you feel tomorrow. Push through! 💪`,
      `Your body can do it - it's your mind you need to convince. You've got this! 🧠💪`,
    ];
    return motivations[Math.floor(Math.random() * motivations.length)];
  }

  private getProgressUpdate(): string {
    const daysActive = this.getDaysActive();
    const totalReps = this.userData.totalRepsCompleted;
    const achievements = this.userData.weeklyAchievements.length;
    const transformations = this.userData.wallOfFame.length;
    const avgRepsPerDay = daysActive > 0 ? Math.round(totalReps / daysActive) : 0;

    return `Here's your progress snapshot:\n\n📊 Stats:\n• ${daysActive} days active\n• ${totalReps} total reps completed\n• ${achievements} weeks logged\n• ${transformations} transformation${transformations !== 1 ? 's' : ''} completed\n• Average ${avgRepsPerDay} reps/day\n\n${this.getProgressFeedback(daysActive, totalReps)}`;
  }

  private getProgressFeedback(days: number, reps: number): string {
    if (days >= 30) {
      return "🏆 You're a consistency champion! Keep that momentum!";
    } else if (days >= 7) {
      return "⚡ Great weekly streak! You're building a solid habit!";
    } else if (reps >= 100) {
      return "💪 Triple digits! That's serious dedication!";
    } else {
      return "🌟 Great start! Keep building that foundation!";
    }
  }

  private getExerciseAdvice(message: string): string {
    if (/push.*up/.test(message)) {
      return `💪 Push-up tips:\n• Keep your core tight and body straight\n• Lower yourself until chest nearly touches ground\n• Push through your palms, not fingertips\n• Breathe out as you push up\n• Start with incline push-ups if needed\n\nYou've got this! 🔥`;
    }
    
    if (/sit.*up|crunch/.test(message)) {
      return `🎯 Sit-up tips:\n• Keep your core engaged throughout\n• Don't pull on your neck\n• Exhale as you crunch up\n• Focus on quality over quantity\n• Keep lower back pressed to floor\n\nFeel the burn! 💯`;
    }

    if (/squat/.test(message)) {
      return `🏋️ Squat tips:\n• Keep your chest up and core tight\n• Push through your heels\n• Knees track over toes (don't collapse in)\n• Go as low as comfortable\n• Breathe in going down, out coming up\n\nYou're building leg strength! 🦵`;
    }

    return `For specific exercise form tips, ask me about:\n• Push-ups\n• Sit-ups\n• Squats\n• Planks\n• Pull-ups\n\nOr tell me which exercise you need help with! 💪`;
  }

  private getGoalAdvice(): string {
    const currentExercises = this.userData.weeklyExercises;
    const hasExercises = currentExercises.length > 0;

    if (!hasExercises) {
      return `🎯 Goal-setting tips:\n\n1. Start small - 10-20 reps per exercise\n2. Focus on 3-5 exercises max\n3. Aim for consistency over intensity\n4. Set weekly AND monthly goals\n5. Track everything!\n\nRecommended starter routine:\n• 20 push-ups\n• 30 sit-ups\n• 20 squats\n• 30-second plank\n\nReady to set this up? Go to Workout tab and click Edit! 📝`;
    }

    return `Based on your current routine, here's my advice:\n\n📈 Progression:\n• Increase reps by 5-10% weekly\n• Add 1 new exercise every 2 weeks\n• Rest days are important!\n\n💡 Your current target: ${this.userData.monthlyTarget}\n\nLooks ${this.isGoalRealistic() ? 'realistic and achievable! 💪' : 'ambitious! Break it into smaller weekly goals. 🎯'}`;
  }

  private getTips(): string {
    const tips = [
      `🌅 Best time to work out:\n• Morning: Boosts energy all day\n• Evening: Relieves stress\n• Consistency > timing\n\nPick what works for YOUR schedule!`,
      `💧 Hydration tips:\n• Drink before you're thirsty\n• Water before, during, after workout\n• Aim for 8+ glasses daily\n\nStay hydrated = Better performance! 💦`,
      `🍗 Nutrition basics:\n• Protein after workouts (30min window)\n• Carbs for energy before\n• Don't skip meals\n• Whole foods > processed\n\nFuel your gains! 🥗`,
      `😴 Recovery is KEY:\n• 7-9 hours sleep minimum\n• Rest days prevent injury\n• Stretch after workouts\n• Listen to your body\n\nMuscles grow during rest! 💤`,
      `📸 Progress tracking:\n• Take photos weekly\n• Measure same time/place\n• Track more than weight\n• Celebrate non-scale victories\n\nYou're using gEtgOOd - you're already winning! 📊`,
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  }

  private getEncouragement(): string {
    const encouragements = [
      `I hear you - it's tough! But remember:\n\n💪 You're stronger than you think\n🎯 Progress isn't always linear\n⏰ Rest is part of the process\n🔥 Tomorrow is a new day\n\nDon't quit! Adjust and keep going! 🌟`,
      `Feeling the burn? GOOD! That means it's working! 🔥\n\nEvery champion was once a contender who refused to give up.\n\nTake a rest day if needed, but DON'T QUIT.\n\nYou've come too far! 💪`,
      `Soreness = Growth! 💯\n\nTips for recovery:\n• Stretch gently\n• Stay hydrated\n• Light activity helps\n• Get good sleep\n• Protein for muscle repair\n\nYou're getting stronger! 🌟`,
      `Listen: The fact that you're here, trying, working hard - that ALREADY makes you a winner! 🏆\n\nBad days happen. It's normal.\n\nWhat matters is you don't quit.\n\nRest today, crush it tomorrow! 💪🔥`,
    ];
    return encouragements[Math.floor(Math.random() * encouragements.length)];
  }

  private getDefaultResponse(): string {
    const responses = [
      `I'm here to help! Ask me about:\n\n💪 Exercise form and technique\n📊 Your progress and stats\n🎯 Goal setting advice\n💡 Fitness tips\n🔥 Motivation\n\nWhat do you need help with?`,
      `Not sure what you're asking, but I'm here for you! Try:\n\n• "How am I doing?"\n• "Give me motivation"\n• "Tips for push-ups"\n• "Help me set goals"\n• "I'm struggling"\n\nWhat can I help with? 💪`,
      `Let me help you! I can assist with:\n\n✅ Tracking your progress\n✅ Exercise techniques\n✅ Setting realistic goals\n✅ Staying motivated\n✅ Fitness tips\n\nAsk away! 🎯`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private getDaysActive(): number {
    if (!this.userData.startDate) return 0;
    const start = new Date(this.userData.startDate);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  private isGoalRealistic(): boolean {
    const target = this.userData.monthlyTarget.toLowerCase();
    return !(/lose.*\d{2,}|gain.*\d{2,}|100|extreme|massive/.test(target));
  }

  // Quick action suggestions
  getQuickActions(): string[] {
    const actions = [
      "How am I doing?",
      "Give me motivation",
      "Tips for better form",
      "Help me set goals",
      "I'm feeling tired",
    ];

    // Context-aware suggestions
    if (this.userData.totalRepsCompleted > 100) {
      actions.push("What milestone should I aim for?");
    }

    if (this.getDaysActive() >= 7) {
      actions.push("How to maintain my streak?");
    }

    return actions;
  }
}

// Generate context-aware greeting
export const getWelcomeMessage = (userData: UserData): ChatMessage => {
  const daysActive = userData.startDate 
    ? Math.floor((new Date().getTime() - new Date(userData.startDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  let greeting = `Hey! 👋 I'm your AI fitness coach. `;

  if (daysActive === 0) {
    greeting += `Welcome to gEtgOOd! I'm here to help you reach your goals. Ask me anything about fitness, form, or motivation! 💪`;
  } else if (daysActive < 7) {
    greeting += `You're ${daysActive} days into your journey - great start! How can I support you today? 🔥`;
  } else if (daysActive < 30) {
    greeting += `${daysActive} days strong! You're building a real habit. What do you need? 💯`;
  } else {
    greeting += `${daysActive} days of dedication! You're a champion! What can I help with today? 🏆`;
  }

  return {
    id: 'welcome',
    role: 'assistant',
    content: greeting,
    timestamp: new Date().toISOString(),
  };
};

