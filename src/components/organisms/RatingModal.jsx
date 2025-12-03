// src/components/organisms/RatingModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Save, Star } from 'lucide-react';
import Button from '../atoms/Button';
import ScoreSlider from '../molecules/ScoreSlider';

export default function RatingModal({ isOpen, onClose, project, onSave }) {
  const [scores, setScores] = useState({
    originality: 50,
    usefulness: 50,
    technology: 50,
    creativity: 50
  });

  useEffect(() => {
    if (project?.scores) {
      setScores(project.scores);
    } else {
      setScores({
        originality: 50,
        usefulness: 50,
        technology: 50,
        creativity: 50
      });
    }
  }, [project]);

  const handleScoreChange = (category, value) => {
    setScores(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = () => {
    onSave(project.id, scores);
  };

  const calculateWeightedScore = () => {
    return (
      scores.originality * 0.35 +
      scores.usefulness * 0.35 +
      scores.technology * 0.20 +
      scores.creativity * 0.10
    ).toFixed(1);
  };

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header - Responsive padding */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="p-2 sm:p-3 bg-white/20 backdrop-blur rounded-xl shadow-lg shrink-0">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-2xl font-bold text-white truncate">
                Penilaian Project
              </h2>
              <p className="text-xs sm:text-sm text-emerald-50 truncate">
                {project.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 hover:bg-white/20 rounded-xl transition-all duration-200 group shrink-0 ml-2"
            aria-label="Tutup"
          >
            <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Content - Responsive scrolling */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto max-h-[calc(95vh-200px)] sm:max-h-[calc(90vh-220px)]">
          
          {/* Project Info Card */}
          <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-neutral-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-neutral-500 mb-1">Sekolah</p>
                <p className="text-sm sm:text-base font-bold text-neutral-800">{project.school}</p>
              </div>
              {project.grade && (
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-500 mb-1">Kelas</p>
                  <p className="text-sm sm:text-base font-bold text-neutral-800">Kelas {project.grade}</p>
                </div>
              )}
            </div>
            {project.description && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neutral-300">
                <p className="text-xs sm:text-sm font-semibold text-neutral-500 mb-2">Deskripsi</p>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}
          </div>

          {/* Scoring Section */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-neutral-800">
                Berikan Penilaian
              </h3>
              <div className="text-right">
                <p className="text-xs sm:text-sm text-neutral-600 font-medium">Skor Akhir</p>
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-amber-100 rounded-md">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 fill-amber-500" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                    {calculateWeightedScore()}
                  </p>
                </div>
              </div>
            </div>

            {/* Sliders with icons and better mobile layout */}
            <div className="space-y-4 sm:space-y-5">
              <ScoreSlider
                label="Originalitas"
                emoji="💡"
                value={scores.originality}
                onChange={(value) => handleScoreChange('originality', value)}
                weight={35}
                color="amber"
              />
              
              <ScoreSlider
                label="Kegunaan"
                emoji="✅"
                value={scores.usefulness}
                onChange={(value) => handleScoreChange('usefulness', value)}
                weight={35}
                color="emerald"
              />
              
              <ScoreSlider
                label="Teknologi"
                emoji="⚙️"
                value={scores.technology}
                onChange={(value) => handleScoreChange('technology', value)}
                weight={20}
                color="blue"
              />
              
              <ScoreSlider
                label="Kreativitas"
                emoji="🎨"
                value={scores.creativity}
                onChange={(value) => handleScoreChange('creativity', value)}
                weight={10}
                color="purple"
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl sm:rounded-2xl p-4 sm:p-5">
            <div className="flex gap-3 sm:gap-4">
              <div className="shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-base sm:text-lg">📊</span>
                </div>
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-blue-900 mb-2">
                  Tentang Penilaian
                </p>
                <ul className="text-xs sm:text-sm text-blue-800 space-y-1 sm:space-y-1.5 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Originalitas & Kegunaan: 35% dari total skor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Teknologi: 20% dari total skor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Kreativitas: 10% dari total skor</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Better mobile buttons */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-neutral-50 to-neutral-100 border-t-2 border-neutral-200 flex gap-2 sm:gap-3 sticky bottom-0">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onClose}
            className="flex-1 sm:flex-none sm:px-6 py-3 text-sm sm:text-base font-bold justify-center"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Batal</span>
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={handleSubmit}
            className="flex-1 sm:flex-none sm:px-6 py-3 text-sm sm:text-base font-bold shadow-lg shadow-emerald-500/40 justify-center"
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5" />
            Simpan Penilaian
          </Button>
        </div>
      </div>
    </div>
  );
}