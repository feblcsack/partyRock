// src/components/organisms/ProjectCard.jsx
import React from 'react';
import { Star, Award, User, GraduationCap, Trophy, Sparkles } from 'lucide-react';
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

  // Rank badge with better responsive design
  const getRankBadge = () => {
    if (!hasScore) return null;
    
    const rankStyles = {
      1: {
        bg: 'bg-gradient-to-br from-amber-400 to-amber-500',
        shadow: 'shadow-lg shadow-amber-500/50',
        icon: <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      },
      2: {
        bg: 'bg-gradient-to-br from-neutral-400 to-neutral-500',
        shadow: 'shadow-lg shadow-neutral-400/50',
        icon: <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      },
      3: {
        bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
        shadow: 'shadow-lg shadow-orange-500/50',
        icon: <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      }
    };

    const style = rankStyles[rank] || {
      bg: 'bg-neutral-600',
      shadow: 'shadow-lg',
      icon: null
    };

    return (
      <div className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 ${style.bg} ${style.shadow} text-white font-bold text-xs sm:text-sm px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-1.5 z-10`}>
        {style.icon}
        <span>#{rank}</span>
      </div>
    );
  };

  return (
    <div className="relative bg-white rounded-xl sm:rounded-2xl border-2 border-neutral-200 shadow-sm hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full group">
      {/* Rank Badge */}
      {getRankBadge()}

      {/* Gradient Top Bar with Animation */}
      <div className={`h-1 sm:h-1.5 ${isOwner ? 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500' : 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500'} group-hover:h-2 transition-all duration-300`}></div>

      {/* Header */}
      <div className="p-4 sm:p-5 pb-3 sm:pb-4">
        <div className="mb-3">
          {/* Title with better responsive typography */}
          <h3 className="font-bold text-base sm:text-lg lg:text-xl text-neutral-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-tight">
            {title}
          </h3>
          
          {/* School & Grade Info */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-600">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="p-1 bg-neutral-100 rounded-md">
                <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-500" />
              </div>
              <span className="font-semibold text-neutral-700">{school}</span>
            </div>
            {grade && (
              <>
                <span className="text-neutral-300">•</span>
                <Badge variant="default" size="sm">
                  Kelas {grade}
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Owner Info - Better mobile layout */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className={`p-1.5 rounded-lg ${isOwner ? 'bg-emerald-100' : 'bg-blue-100'}`}>
            <User className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isOwner ? 'text-emerald-600' : 'text-blue-600'}`} />
          </div>
          <span className="text-xs sm:text-sm text-neutral-700 font-semibold truncate max-w-[120px] sm:max-w-none">
            {userName || 'Anonymous'}
          </span>
          {isOwner && (
            <Badge variant="success" size="sm">
              <Sparkles className="w-3 h-3" />
              Milik Anda
            </Badge>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="px-4 sm:px-5 pb-3 sm:pb-4 flex-1">
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Scores Section */}
      {hasScore ? (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 space-y-2.5 sm:space-y-3 border-2 border-neutral-200 shadow-inner">
            
            {/* Score Bars with better mobile optimization */}
            <div className="space-y-2 sm:space-y-2.5">
              {[
                { label: 'Originalitas', value: scores.originality, color: 'from-amber-400 to-amber-500', icon: '💡' },
                { label: 'Kegunaan', value: scores.usefulness, color: 'from-emerald-400 to-emerald-500', icon: '✅' },
                { label: 'Teknologi', value: scores.technology, color: 'from-blue-400 to-blue-500', icon: '⚙️' },
                { label: 'Kreativitas', value: scores.creativity, color: 'from-purple-400 to-purple-500', icon: '🎨' }
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm">{item.icon}</span>
                      <span className="text-xs sm:text-sm font-bold text-neutral-700">{item.label}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-neutral-900 bg-white px-2 py-0.5 rounded-md shadow-sm">
                      {item.value}
                    </span>
                  </div>
                  <div className="h-2 sm:h-2.5 bg-neutral-200 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-700 ease-out shadow-sm`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Final Score - Responsive design */}
            <div className="pt-3 sm:pt-4 mt-2 border-t-2 border-neutral-300">
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base font-bold text-neutral-800">
                  Skor Akhir
                </span>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-100 rounded-lg">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-500" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                    {weightedScore.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State - Better mobile design */
        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center border-2 border-neutral-200 border-dashed">
            <div className="inline-flex p-3 sm:p-4 bg-white rounded-full shadow-sm mb-3">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-300" />
            </div>
            <p className="text-sm sm:text-base font-bold text-neutral-600 mb-1">
              {isOwner ? 'Belum Dinilai' : 'Menunggu Penilaian'}
            </p>
            <p className="text-xs sm:text-sm text-neutral-500">
              {isOwner ? 'Klik tombol di bawah untuk memberi nilai' : 'Owner belum memberikan penilaian'}
            </p>
          </div>
        </div>
      )}

      {/* Action Button - Only for owner, better mobile optimization */}
      {isOwner && (
        <div className="p-4 sm:p-5 pt-0">
          <Button 
            variant={hasScore ? "secondary" : "primary"} 
            onClick={() => onRate(project)}
            className="w-full justify-center shadow-lg hover:shadow-xl text-sm sm:text-base py-2.5 sm:py-3"
          >
            <Star className="w-4 h-4" />
            <span className="font-bold">{hasScore ? 'Edit Nilai' : 'Beri Nilai'}</span>
          </Button>
        </div>
      )}
    </div>
  );
}