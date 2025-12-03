// src/components/organisms/ProjectCard.jsx
import React from 'react';
import { Star, Award, User, GraduationCap } from 'lucide-react';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';

export default function ProjectCard({ project, rank, onRate, isOwner }) {
  const { title, school, description, scores, userName, grade } = project;

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
  const getRankBadge = () => {
    if (!hasScore) return null;
    
    if (rank === 1) {
      return (
        <div className="absolute -top-3 -right-3 bg-gradient-to-br from-amber-400 to-amber-500 text-white font-bold text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-amber-500/50 z-10">
          <Trophy className="w-4 h-4" />
          #{rank}
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="absolute -top-3 -right-3 bg-gradient-to-br from-neutral-300 to-neutral-400 text-white font-bold text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-neutral-400/50 z-10">
          <Award className="w-4 h-4" />
          #{rank}
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="absolute -top-3 -right-3 bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-orange-500/50 z-10">
          <Award className="w-4 h-4" />
          #{rank}
        </div>
      );
    }
    return (
      <div className="absolute -top-3 -right-3 bg-neutral-600 text-white font-bold text-sm px-4 py-2 rounded-xl shadow-lg z-10">
        #{rank}
      </div>
    );
  };

  return (
    <div className="relative bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-300 overflow-hidden flex flex-col h-full group">
      {/* Rank Badge */}
      {getRankBadge()}

      {/* Gradient Top Bar */}
      <div className={`h-1.5 ${isOwner ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'}`}></div>

      {/* Header */}
      <div className="p-5 pb-4">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-neutral-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
            <GraduationCap className="w-4 h-4 text-neutral-400" />
            <span className="font-medium">{school}</span>
            {grade && (
              <>
                <span className="text-neutral-300">•</span>
                <span className="text-neutral-500">Kelas {grade}</span>
              </>
            )}
          </div>
        </div>

        {/* Owner Info */}
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isOwner ? 'bg-emerald-100' : 'bg-blue-100'}`}>
            <User className={`w-3.5 h-3.5 ${isOwner ? 'text-emerald-600' : 'text-blue-600'}`} />
          </div>
          <span className="text-xs text-neutral-600 font-medium">
            {userName || 'Anonymous'}
          </span>
          {isOwner && (
            <Badge variant="success" size="sm">Milik Anda</Badge>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="px-5 pb-4 flex-1">
        <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Scores */}
      {hasScore ? (
        <div className="px-5 pb-5">
          <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-4 space-y-3 border border-neutral-200">
            {/* Score Bars */}
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-neutral-600">Originalitas</span>
                  <span className="text-xs font-bold text-neutral-800">{scores.originality}</span>
                </div>
                <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${scores.originality}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-neutral-600">Kegunaan</span>
                  <span className="text-xs font-bold text-neutral-800">{scores.usefulness}</span>
                </div>
                <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${scores.usefulness}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-neutral-600">Teknologi</span>
                  <span className="text-xs font-bold text-neutral-800">{scores.technology}</span>
                </div>
                <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${scores.technology}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-neutral-600">Kreativitas</span>
                  <span className="text-xs font-bold text-neutral-800">{scores.creativity}</span>
                </div>
                <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${scores.creativity}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Final Score */}
            <div className="pt-3 mt-1 border-t border-neutral-300">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-neutral-700">
                  Skor Akhir
                </span>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                    {weightedScore.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-5 pb-5">
          <div className="bg-neutral-50 rounded-xl p-4 text-center border border-neutral-200">
            <Star className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-neutral-500">
              {isOwner ? 'Belum Dinilai' : 'Menunggu Penilaian'}
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              {isOwner ? 'Beri nilai untuk project ini' : 'Owner belum memberikan penilaian'}
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
            className="w-full justify-center shadow-md"
          >
            <Star className="w-4 h-4" />
            {hasScore ? 'Edit Nilai' : 'Beri Nilai'}
          </Button>
        </div>
      )}
    </div>
  );
}

// Import Trophy for rank 1
import { Trophy } from 'lucide-react';