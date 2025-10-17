import React, { useState, useRef } from 'react';
import { Camera, Download, Share2, RefreshCw } from 'lucide-react';
import { UserData } from '../types';
import { compressImage, createBeforeAfterImage } from '../utils/imageProcessing';

interface MonthlyReviewProps {
  userData: UserData;
  onComplete: (afterPhoto: string, comparisonImage: string | null) => void;
  onContinue: () => void;
}

export const MonthlyReview: React.FC<MonthlyReviewProps> = ({ 
  userData, 
  onComplete,
  onContinue 
}) => {
  const [afterPhoto, setAfterPhoto] = useState<string | null>(userData.afterPhoto);
  const [comparisonImage, setComparisonImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [transformationNotes, setTransformationNotes] = useState('');

  const handlePhotoCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressed = await compressImage(file);
      setAfterPhoto(compressed);
    }
  };

  const generateComparison = async () => {
    if (userData.beforePhoto && afterPhoto) {
      setIsGenerating(true);
      try {
        const comparison = await createBeforeAfterImage(userData.beforePhoto, afterPhoto);
        setComparisonImage(comparison);
      } catch (error) {
        console.error('Error generating comparison:', error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const downloadImage = () => {
    if (comparisonImage) {
      const link = document.createElement('a');
      link.href = comparisonImage;
      link.download = 'getgood-transformation.png';
      link.click();
    }
  };

  const shareImage = async () => {
    if (comparisonImage) {
      try {
        // Convert base64 to blob
        const response = await fetch(comparisonImage);
        const blob = await response.blob();
        const file = new File([blob], 'transformation.png', { type: 'image/png' });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'My Fitness Transformation',
            text: 'Check out my transformation with gEtgOOd!',
          });
        } else {
          // Fallback: download
          downloadImage();
        }
      } catch (error) {
        console.error('Error sharing:', error);
        downloadImage();
      }
    }
  };

  return (
    <div className="min-h-screen p-4 py-6 md:py-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="glass-effect rounded-2xl md:rounded-3xl p-6 md:p-8">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Monthly Check-in 🎉
          </h1>
          <p className="text-center text-slate-300 mb-8">
            You've completed a full month! Let's see your progress.
          </p>

          {/* Before/After Photos */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Before Photo */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-center">BEFORE</h3>
              {userData.beforePhoto && (
                <img 
                  src={userData.beforePhoto} 
                  alt="Before" 
                  className="w-full rounded-xl shadow-lg"
                />
              )}
              <div className="text-sm text-slate-400 text-center mt-2">
                {new Date(userData.startDate!).toLocaleDateString()}
              </div>
            </div>

            {/* After Photo */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-center">AFTER</h3>
              {afterPhoto ? (
                <div className="space-y-3">
                  <img 
                    src={afterPhoto} 
                    alt="After" 
                    className="w-full rounded-xl shadow-lg"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary w-full text-sm"
                  >
                    <RefreshCw className="inline mr-2 w-4 h-4" />
                    Retake Photo
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary w-full h-64 flex flex-col items-center justify-center"
                >
                  <Camera className="w-12 h-12 mb-3" />
                  Take After Photo
                </button>
              )}
              <div className="text-sm text-slate-400 text-center mt-2">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="user"
            onChange={handlePhotoCapture}
            className="hidden"
          />

          {/* Generate Comparison */}
          {afterPhoto && !comparisonImage && (
            <button
              onClick={generateComparison}
              disabled={isGenerating}
              className="btn-primary w-full mb-6"
            >
              {isGenerating ? 'Generating...' : 'Create Side-by-Side Comparison'}
            </button>
          )}

          {/* Comparison Image */}
          {comparisonImage && (
            <div className="space-y-4 mb-6">
              <img 
                src={comparisonImage} 
                alt="Before and After Comparison" 
                className="w-full rounded-xl shadow-2xl"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <button onClick={downloadImage} className="btn-secondary">
                  <Download className="inline mr-2 w-5 h-5" />
                  Download
                </button>
                <button onClick={shareImage} className="btn-primary">
                  <Share2 className="inline mr-2 w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          )}

          {/* Stats Summary */}
          <div className="glass-effect p-6 rounded-xl mb-6">
            <h3 className="font-semibold mb-4">Your Journey</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly Target:</span>
                <span>{userData.monthlyTarget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Exercises Tracked:</span>
                <span>{userData.weeklyExercises.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Reps Completed:</span>
                <span>{userData.weeklyExercises.reduce((sum, ex) => sum + ex.currentReps, 0)}</span>
              </div>
            </div>
          </div>

          {/* Transformation Notes */}
          <div className="space-y-3 mb-6">
            <label className="block text-sm font-medium">
              Add a note about your transformation (optional)
            </label>
            <textarea
              value={transformationNotes}
              onChange={(e) => setTransformationNotes(e.target.value)}
              placeholder="How do you feel? What did you learn? What's next?"
              className="w-full p-3 rounded-xl glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows={3}
            />
          </div>

          {/* Continue Button */}
          <button 
            onClick={() => {
              onComplete(afterPhoto!, comparisonImage);
              onContinue();
            }} 
            className="btn-primary w-full"
            disabled={!afterPhoto}
          >
            Save to Hall of Fame & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

