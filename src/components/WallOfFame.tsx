import React, { useState } from 'react';
import { Trophy, Trash2, Download, Share2, Calendar, Plus } from 'lucide-react';
import { UserData, Transformation } from '../types';
import { AddTransformationModal } from './AddTransformationModal';

interface WallOfFameProps {
  userData: UserData;
  onDeleteTransformation: (id: string) => void;
  onAddTransformation: (transformation: Omit<Transformation, 'id'>) => void;
}

export const WallOfFame: React.FC<WallOfFameProps> = ({ 
  userData, 
  onDeleteTransformation,
  onAddTransformation
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    link.click();
  };

  const shareImage = async (imageUrl: string, title: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'transformation.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: title,
          text: 'Check out my transformation with gEtgOOd!',
        });
      } else {
        downloadImage(imageUrl, 'transformation.png');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      downloadImage(imageUrl, 'transformation.png');
    }
  };

  const sortedTransformations = [...userData.wallOfFame].sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
  );

  const handleAddTransformation = (transformation: Omit<Transformation, 'id'>) => {
    onAddTransformation(transformation);
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen p-4 py-6 md:py-8">
      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* Add Transformation Modal */}
        <AddTransformationModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddTransformation}
        />

        {/* Header */}
        <div className="glass-effect rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Hall of Fame</h1>
                <p className="text-slate-300 text-sm md:text-base mt-1">
                  Your transformation journey - {sortedTransformations.length} milestone{sortedTransformations.length !== 1 ? 's' : ''} achieved!
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
            >
              <Plus className="inline w-5 h-5 mr-2" />
              <span className="hidden md:inline">Add Transformation</span>
              <span className="md:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Transformations Grid */}
        {sortedTransformations.length === 0 ? (
          <div className="glass-effect rounded-2xl md:rounded-3xl p-12 text-center">
            <Trophy className="w-20 h-20 mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-semibold mb-2">No Transformations Yet</h3>
            <p className="text-slate-400">
              Complete a monthly cycle to add your first transformation to the Hall of Fame!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {sortedTransformations.map((transformation) => (
              <div 
                key={transformation.id} 
                className="glass-effect rounded-2xl overflow-hidden animate-scale-in"
              >
                {/* Comparison Image */}
                {transformation.comparisonPhoto ? (
                  <img 
                    src={transformation.comparisonPhoto} 
                    alt="Transformation" 
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-1 h-64">
                    <img 
                      src={transformation.beforePhoto} 
                      alt="Before" 
                      className="w-full h-full object-cover"
                    />
                    <img 
                      src={transformation.afterPhoto} 
                      alt="After" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {transformation.monthlyTarget}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(transformation.startDate).toLocaleDateString()} - {new Date(transformation.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {transformation.notes && (
                    <p className="text-sm text-slate-300 italic mb-4">
                      "{transformation.notes}"
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const imageUrl = transformation.comparisonPhoto || transformation.afterPhoto;
                        downloadImage(imageUrl, `transformation-${transformation.id}.png`);
                      }}
                      className="flex-1 btn-secondary text-sm py-2"
                    >
                      <Download className="inline w-4 h-4 mr-1" />
                      Download
                    </button>
                    <button
                      onClick={() => {
                        const imageUrl = transformation.comparisonPhoto || transformation.afterPhoto;
                        shareImage(imageUrl, transformation.monthlyTarget);
                      }}
                      className="flex-1 btn-primary text-sm py-2"
                    >
                      <Share2 className="inline w-4 h-4 mr-1" />
                      Share
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to remove this transformation?')) {
                          onDeleteTransformation(transformation.id);
                        }
                      }}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {sortedTransformations.length > 0 && (
          <div className="glass-effect rounded-2xl p-6 mt-6">
            <h3 className="font-semibold mb-4">Journey Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">
                  {sortedTransformations.length}
                </div>
                <div className="text-sm text-slate-400 mt-1">Transformations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">
                  {sortedTransformations.length * 30}
                </div>
                <div className="text-sm text-slate-400 mt-1">Days Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">
                  {sortedTransformations.length * 4}
                </div>
                <div className="text-sm text-slate-400 mt-1">Weeks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  🏆
                </div>
                <div className="text-sm text-slate-400 mt-1">Champion!</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

