import React, { useState, useRef } from 'react';
import { Camera, Target, Dumbbell, MessageSquare, Music, ChevronRight, Volume2 } from 'lucide-react';
import { UserData, Exercise } from '../types';
import { motivationalPhrases } from '../data/phrases';
import { motivationalSongs } from '../data/songs';
import { compressImage } from '../utils/imageProcessing';
import { speakPhrase } from '../utils/textToSpeech';

interface SetupFlowProps {
  onComplete: (data: Partial<UserData>) => void;
}

type Step = 'photo' | 'target' | 'exercises' | 'phrase' | 'song' | 'voice';

export const SetupFlow: React.FC<SetupFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState<Step>('photo');
  const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
  const [monthlyTarget, setMonthlyTarget] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseReps, setNewExerciseReps] = useState('');
  const [selectedPhrase, setSelectedPhrase] = useState('');
  const [selectedSong, setSelectedSong] = useState('');
  const [voicePreference, setVoicePreference] = useState<'male' | 'female'>('male');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressed = await compressImage(file);
      setBeforePhoto(compressed);
    }
  };

  const addExercise = () => {
    if (newExerciseName && newExerciseReps) {
      const exercise: Exercise = {
        id: Date.now().toString(),
        name: newExerciseName,
        targetReps: parseInt(newExerciseReps),
        currentReps: 0,
      };
      setExercises([...exercises, exercise]);
      setNewExerciseName('');
      setNewExerciseReps('');
    }
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const handleComplete = () => {
    onComplete({
      setupComplete: true,
      startDate: new Date().toISOString(),
      beforePhoto,
      monthlyTarget,
      weeklyExercises: exercises,
      selectedPhrase,
      selectedSong,
      voicePreference,
    });
  };

  const canProceed = () => {
    switch (step) {
      case 'photo': return beforePhoto !== null;
      case 'target': return monthlyTarget.trim() !== '';
      case 'exercises': return exercises.length > 0;
      case 'phrase': return selectedPhrase !== '';
      case 'song': return selectedSong !== '';
      case 'voice': return true;
      default: return false;
    }
  };

  const nextStep = () => {
    const steps: Step[] = ['photo', 'target', 'exercises', 'phrase', 'song', 'voice'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    } else {
      handleComplete();
    }
  };

  const testPhrase = (phrase: string) => {
    speakPhrase(phrase, voicePreference);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-effect rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl animate-scale-in">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Welcome to gEtgOOd
        </h1>
        <p className="text-center text-slate-300 mb-8">Let's set you up for success!</p>

        {/* Photo Step */}
        {step === 'photo' && (
          <div className="space-y-6">
            <div className="text-center">
              <Camera className="w-16 h-16 mx-auto mb-4 text-primary-400" />
              <h2 className="text-2xl font-semibold mb-2">Take Your Before Photo</h2>
              <p className="text-slate-300">Capture where you are today</p>
            </div>

            {beforePhoto ? (
              <div className="space-y-4">
                <img 
                  src={beforePhoto} 
                  alt="Before" 
                  className="w-full max-w-md mx-auto rounded-xl shadow-lg"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-secondary w-full"
                >
                  Retake Photo
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary w-full"
              >
                <Camera className="inline mr-2" />
                Take Photo
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="user"
              onChange={handlePhotoCapture}
              className="hidden"
            />
          </div>
        )}

        {/* Monthly Target Step */}
        {step === 'target' && (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-primary-400" />
              <h2 className="text-2xl font-semibold mb-2">Set Your Monthly Target</h2>
              <p className="text-slate-300">What do you want to achieve?</p>
            </div>

            <textarea
              value={monthlyTarget}
              onChange={(e) => setMonthlyTarget(e.target.value)}
              placeholder="e.g., Lose 5 pounds, Build muscle, Get stronger..."
              className="w-full p-4 rounded-xl glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows={4}
            />
          </div>
        )}

        {/* Exercises Step */}
        {step === 'exercises' && (
          <div className="space-y-6">
            <div className="text-center">
              <Dumbbell className="w-16 h-16 mx-auto mb-4 text-primary-400" />
              <h2 className="text-2xl font-semibold mb-2">Weekly Exercises</h2>
              <p className="text-slate-300">Add your workout routine</p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={newExerciseName}
                onChange={(e) => setNewExerciseName(e.target.value)}
                placeholder="Exercise name (e.g., Push-ups)"
                className="w-full p-3 rounded-xl glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <div className="flex gap-3">
                <input
                  type="number"
                  value={newExerciseReps}
                  onChange={(e) => setNewExerciseReps(e.target.value)}
                  placeholder="Target reps"
                  className="flex-1 p-3 rounded-xl glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button onClick={addExercise} className="btn-primary px-6">
                  Add
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {exercises.map(exercise => (
                <div key={exercise.id} className="glass-effect p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{exercise.name}</div>
                    <div className="text-sm text-slate-300">{exercise.targetReps} reps</div>
                  </div>
                  <button
                    onClick={() => removeExercise(exercise.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phrase Step */}
        {step === 'phrase' && (
          <div className="space-y-6">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-primary-400" />
              <h2 className="text-2xl font-semibold mb-2">Choose Your Mantra</h2>
              <p className="text-slate-300">Pick a phrase to keep you motivated</p>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {motivationalPhrases.map(phrase => (
                <button
                  key={phrase.id}
                  onClick={() => setSelectedPhrase(phrase.text)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    selectedPhrase === phrase.text
                      ? 'bg-primary-500/30 border-2 border-primary-500'
                      : 'glass-effect hover:bg-white/15'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{phrase.text}</div>
                      <div className="text-xs text-slate-400 mt-1">{phrase.category}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        testPhrase(phrase.text);
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Song Step */}
        {step === 'song' && (
          <div className="space-y-6">
            <div className="text-center">
              <Music className="w-16 h-16 mx-auto mb-4 text-primary-400" />
              <h2 className="text-2xl font-semibold mb-2">Pick Your Pump-Up Song</h2>
              <p className="text-slate-300">Music to fuel your workout</p>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {motivationalSongs.map(song => (
                <button
                  key={song.id}
                  onClick={() => setSelectedSong(song.title)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    selectedSong === song.title
                      ? 'bg-primary-500/30 border-2 border-primary-500'
                      : 'glass-effect hover:bg-white/15'
                  }`}
                >
                  <div className="font-medium">{song.title}</div>
                  <div className="text-sm text-slate-400">{song.artist}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Voice Preference Step */}
        {step === 'voice' && (
          <div className="space-y-6">
            <div className="text-center">
              <Volume2 className="w-16 h-16 mx-auto mb-4 text-primary-400" />
              <h2 className="text-2xl font-semibold mb-2">Voice Preference</h2>
              <p className="text-slate-300">Choose your motivational voice</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setVoicePreference('male')}
                className={`p-6 rounded-xl text-center transition-all ${
                  voicePreference === 'male'
                    ? 'bg-primary-500/30 border-2 border-primary-500'
                    : 'glass-effect hover:bg-white/15'
                }`}
              >
                <div className="text-4xl mb-2">🧔</div>
                <div className="font-semibold">Male Voice</div>
              </button>
              <button
                onClick={() => setVoicePreference('female')}
                className={`p-6 rounded-xl text-center transition-all ${
                  voicePreference === 'female'
                    ? 'bg-primary-500/30 border-2 border-primary-500'
                    : 'glass-effect hover:bg-white/15'
                }`}
              >
                <div className="text-4xl mb-2">👩</div>
                <div className="font-semibold">Female Voice</div>
              </button>
            </div>

            <button
              onClick={() => speakPhrase(selectedPhrase, voicePreference)}
              className="btn-secondary w-full"
            >
              <Volume2 className="inline mr-2" />
              Test Voice
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8">
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className={`w-full ${canProceed() ? 'btn-primary' : 'bg-slate-600 text-slate-400 py-3 px-6 rounded-xl cursor-not-allowed'}`}
          >
            {step === 'voice' ? 'Complete Setup' : 'Next'}
            <ChevronRight className="inline ml-2" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {['photo', 'target', 'exercises', 'phrase', 'song', 'voice'].map((s, i) => (
            <div
              key={s}
              className={`h-2 w-8 rounded-full transition-all ${
                s === step ? 'bg-primary-500' : i < ['photo', 'target', 'exercises', 'phrase', 'song', 'voice'].indexOf(step) ? 'bg-primary-300' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

