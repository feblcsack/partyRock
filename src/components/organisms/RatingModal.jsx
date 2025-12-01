import React, { useState, useEffect } from 'react';
import { X, Save, CheckCircle2, Lightbulb, Target, Zap, Award } from 'lucide-react';
import Button from '../atoms/Button';
import ScoreSlider from '../molecules/ScoreSlider';

const RatingModal = ({ isOpen, onClose, project, onSave }) => {
  const [scores, setScores] = useState({ 
    originality: 0, 
    usefulness: 0, 
    technology: 0, 
    creativity: 0 
  });

  useEffect(() => {
    if (project && project.scores) {
      setScores(project.scores);
    } else {
      setScores({ originality: 0, usefulness: 0, technology: 0, creativity: 0 });
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const handleChange = (key, value) => {
    setScores(prev => ({ ...prev, [key]: value }));
  };

  const calculateWeightedAverage = () => {
    return (
      scores.originality * 0.35 +
      scores.usefulness * 0.35 +
      scores.technology * 0.20 +
      scores.creativity * 0.10
    ).toFixed(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-neutral-50 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="bg-neutral-800 p-5 flex justify-between items-center text-white">
          <div>
            <h3 className="font-bold text-lg">Form Penilaian Project</h3>
            <p className="text-neutral-300 text-sm mt-0.5">{project.title}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-neutral-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-sm text-neutral-700 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Bobot Penilaian:</strong> Orisinalitas (35%), Kebermanfaatan (35%), Teknologi (20%), Kreativitas (10%)
              </span>
            </p>
          </div>

          <ScoreSlider 
            label="Orisinalitas & Keunikan"
            value={scores.originality}
            onChange={(val) => handleChange('originality', val)}
            icon={Lightbulb}
            color="amber"
            description="Seberapa unik dan original ide project ini? (Bobot 35%)"
          />

          <ScoreSlider 
            label="Kebermanfaatan"
            value={scores.usefulness}
            onChange={(val) => handleChange('usefulness', val)}
            icon={Target}
            color="blue"
            description="Seberapa bermanfaat project ini untuk memecahkan masalah? (Bobot 35%)"
          />

          <ScoreSlider 
            label="Penerapan Teknologi"
            value={scores.technology}
            onChange={(val) => handleChange('technology', val)}
            icon={Zap}
            color="purple"
            description="Kompleksitas dan implementasi teknologi yang digunakan (Bobot 20%)"
          />

          <ScoreSlider 
            label="Kreativitas Presentasi"
            value={scores.creativity}
            onChange={(val) => handleChange('creativity', val)}
            icon={Award}
            color="emerald"
            description="Cara penyampaian dan demo project (Bobot 10%)"
          />

          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-neutral-600 mb-1">Skor Total Tertimbang</p>
              <p className="text-4xl font-bold text-emerald-600">{calculateWeightedAverage()}</p>
            </div>
            <Button 
              variant="primary"
              size="lg"
              onClick={() => onSave(project.id, scores)}
              className="shadow-lg shadow-emerald-200"
            >
              <Save className="w-5 h-5" />
              Simpan Penilaian
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;