// src/components/organisms/ProjectCard.jsx
import React from 'react';
import { Star, Award, User } from 'lucide-react';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import ScoreDisplay from '../atoms/ScoreDisplay';

export default function ProjectCard({ project, rank, onRate, isOwner }) {
  const { title, school, description, scores, userName } = project;

  const calculateWeightedScore = (scores) => {
    if (!scores) return 0;
    return (
      scores.originality * 0.35 +
      scores.usefulness * 0.35 +
      scores.technology * 0.20 +
      scores.creativity * 0.10
    );
  };

  const weightedScore = calculateWeightedScore(scores);
  const hasScore = scores !== null && scores !== undefined;

  // Rank badge color
  const getRankColor = () => {
    if (rank === 1) return 'bg-amber-500';
    if (rank === 2) return 'bg-neutral-400';
    if (rank === 3) return 'bg-orange-600';
    return 'bg-neutral-300';
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Header with Rank */}
      <div className="p-5 pb-4 border-b border-neutral-100">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-neutral-800 mb-1 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-neutral-500">{school}</p>
          </div>
          
          {hasScore && (
            <div className={`${getRankColor()} text-white font-bold text-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0`}>
              <Award className="w-4 h-4" />
              #{rank}
            </div>
          )}
        </div>

        {/* Owner Info */}
        <div className="flex items-center gap-2 mt-2">
          <User className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-xs text-neutral-500">
            {isOwner ? 'Project Anda' : userName || 'Anonymous'}
          </span>
          {isOwner && (
            <Badge variant="success" size="sm">Milik Anda</Badge>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="p-5 flex-1">
        <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Scores */}
      {hasScore ? (
        <div className="px-5 pb-4">
          <div className="bg-neutral-50 rounded-lg p-4 space-y-2.5">
            <ScoreDisplay label="Originalitas" score={scores.originality} />
            <ScoreDisplay label="Kegunaan" score={scores.usefulness} />
            <ScoreDisplay label="Teknologi" score={scores.technology} />
            <ScoreDisplay label="Kreativitas" score={scores.creativity} />
            
            <div className="pt-2.5 mt-2.5 border-t border-neutral-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-neutral-700">
                  Skor Akhir
                </span>
                <span className="text-2xl font-bold text-emerald-600">
                  {weightedScore.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-5 pb-4">
          <div className="bg-neutral-50 rounded-lg p-4 text-center">
            <Star className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
            <p className="text-sm text-neutral-500">
              {isOwner ? 'Belum dinilai' : 'Menunggu penilaian'}
            </p>
          </div>
        </div>
      )}

      {/* Action Button - Only for owner */}
      {isOwner && (
        <div className="p-5 pt-0">
          <Button 
            variant={hasScore ? "secondary" : "primary"} 
            onClick={() => onRate(project)}
            className="w-full justify-center"
          >
            <Star className="w-4 h-4" />
            {hasScore ? 'Edit Nilai' : 'Beri Nilai'}
          </Button>
        </div>
      )}
    </div>
  );
}