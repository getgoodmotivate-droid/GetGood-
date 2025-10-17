import React, { useState, useRef } from 'react';
import { Camera, X, Save, RefreshCw } from 'lucide-react';
import { Transformation } from '../types';
import { compressImage, createBeforeAfterImage } from '../utils/imageProcessing';

interface AddTransformationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transformation: Omit<Transformation, 'id'>) => void;
}

export const AddTransformationModal: React.FC<AddTransformationModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [step, setStep] = useState<'photos' | 'details'>('photos');
  const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<string | null>(null);
  const [comparisonImage, setComparisonImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [monthlyTarget, setMonthlyTarget] = useState('');
  const [notes, setNotes] = useState('');

  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleBeforePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressed = await compressImage(file);
      setBeforePhoto(compressed);
    }
  };

  const handleAfterPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressed = await compressImage(file);
      setAfterPhoto(compressed);
    }
  };

  const generateComparison = async () => {
    if (beforePhoto && afterPhoto) {
      setIsGenerating(true);
      try {
        const comparison = await createBeforeAfterImage(beforePhoto, afterPhoto);
        setComparisonImage(comparison);
      } catch (error) {
        console.error('Error generating comparison:', error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleSave = () => {
    if (!beforePhoto || !afterPhoto || !monthlyTarget) return;

    const transformation: Omit<Transformation, 'id'> = {
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      beforePhoto,
      afterPhoto,
      comparisonPhoto: comparisonImage || undefined,
      monthlyTarget,
      notes: notes || undefined,
    };

    onSave(transformation);
    handleClose();
  };

  const handleClose = () => {
    setStep('photos');
    setBeforePhoto(null);
    setAfterPhoto(null);
    setComparisonImage(null);
    setStartDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    setEndDate(new Date().toISOString().split('T')[0]);
    setMonthlyTarget('');
    setNotes('');
    onClose();
  };

  const canProceed = () => {
    if (step === 'photos') {
      return beforePhoto && afterPhoto;
    }
    return monthlyTarget.trim() !== '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative glass-effect rounded-3xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-all z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <Camera className="w-12 h-12 mx-auto mb-3 text-primary-400" />
          <h2 className="text-3xl font-bold">Add Transformation</h2>
          <p className="text-slate-300 mt-2">Upload your before & after photos</p>
        </div>

        {/* Photos Step */}
        {step === 'photos' && (
          <div className="space-y-6">
            {/* Photo Upload Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Before Photo */}
              <div>
                <h3 className="font-semibold mb-3 text-center">BEFORE Photo</h3>
                {beforePhoto ? (
                  <div className="space-y-3">
                    <img 
                      src={beforePhoto} 
                      alt="Before" 
                      className="w-full rounded-xl shadow-lg"
                    />
                    <button
                      onClick={() => beforeInputRef.current?.click()}
                      className="btn-secondary w-full text-sm"
                    >
                      <RefreshCw className="inline w-4 h-4 mr-2" />
                      Change Photo
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => beforeInputRef.current?.click()}
                    className="btn-primary w-full h-64 flex flex-col items-center justify-center"
                  >
                    <Camera className="w-12 h-12 mb-3" />
                    <span>Take/Upload Before</span>
                  </button>
                )}
                <input
                  ref={beforeInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleBeforePhoto}
                  className="hidden"
                />
              </div>

              {/* After Photo */}
              <div>
                <h3 className="font-semibold mb-3 text-center">AFTER Photo</h3>
                {afterPhoto ? (
                  <div className="space-y-3">
                    <img 
                      src={afterPhoto} 
                      alt="After" 
                      className="w-full rounded-xl shadow-lg"
                    />
                    <button
                      onClick={() => afterInputRef.current?.click()}
                      className="btn-secondary w-full text-sm"
                    >
                      <RefreshCw className="inline w-4 h-4 mr-2" />
                      Change Photo
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => afterInputRef.current?.click()}
                    className="btn-primary w-full h-64 flex flex-col items-center justify-center"
                  >
                    <Camera className="w-12 h-12 mb-3" />
                    <span>Take/Upload After</span>
                  </button>
                )}
                <input
                  ref={afterInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleAfterPhoto}
                  className="hidden"
                />
              </div>
            </div>

            {/* Generate Comparison */}
            {beforePhoto && afterPhoto && !comparisonImage && (
              <button
                onClick={generateComparison}
                disabled={isGenerating}
                className="btn-primary w-full"
              >
                {isGenerating ? 'Generating...' : 'Create Side-by-Side Comparison'}
              </button>
            )}

            {/* Comparison Preview */}
            {comparisonImage && (
              <div className="space-y-3">
                <h3 className="font-semibold text-center">Comparison Preview</h3>
                <img 
                  src={comparisonImage} 
                  alt="Comparison" 
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={() => setStep('details')}
              disabled={!canProceed()}
              className={`w-full ${canProceed() ? 'btn-primary' : 'bg-slate-600 text-slate-400 py-3 px-6 rounded-xl cursor-not-allowed'}`}
            >
              Next: Add Details
            </button>
          </div>
        )}

        {/* Details Step */}
        {step === 'details' && (
          <div className="space-y-6">
            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 rounded-xl glass-effect text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-3 rounded-xl glass-effect text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Goal/Target */}
            <div>
              <label className="block text-sm font-medium mb-2">What was your goal? *</label>
              <input
                type="text"
                value={monthlyTarget}
                onChange={(e) => setMonthlyTarget(e.target.value)}
                placeholder="e.g., Lose 10 pounds, Build muscle, Get stronger..."
                className="w-full p-3 rounded-xl glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-2">Transformation Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How do you feel? What worked? What did you learn?"
                className="w-full p-3 rounded-xl glass-effect text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                rows={4}
              />
            </div>

            {/* Duration Info */}
            <div className="glass-effect p-4 rounded-xl">
              <div className="text-sm text-slate-300">
                <p><strong>Duration:</strong> {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep('photos')}
                className="flex-1 btn-secondary"
              >
                Back to Photos
              </button>
              <button
                onClick={handleSave}
                disabled={!canProceed()}
                className={`flex-1 ${canProceed() ? 'btn-primary' : 'bg-slate-600 text-slate-400 py-3 px-6 rounded-xl cursor-not-allowed'}`}
              >
                <Save className="inline w-5 h-5 mr-2" />
                Save to Hall of Fame
              </button>
            </div>
          </div>
        )}

        {/* Step Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          <div className={`h-2 w-16 rounded-full transition-all ${step === 'photos' ? 'bg-primary-500' : 'bg-primary-300'}`} />
          <div className={`h-2 w-16 rounded-full transition-all ${step === 'details' ? 'bg-primary-500' : 'bg-slate-600'}`} />
        </div>
      </div>
    </div>
  );
};

