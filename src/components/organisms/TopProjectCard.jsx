// src/components/organisms/TopProjectCard.jsx
import React from 'react';
import { Trophy, Award, TrendingUp, User, GraduationCap } from 'lucide-react';
import Badge from '../atoms/Badge';

export default function TopProjectCard({ project }) {
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

  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-amber-300 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      
      {/* Decorative Elements - Adjusted for mobile */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-2xl sm:blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-tr from-emerald-200/30 to-transparent rounded-full blur-2xl sm:blur-3xl"></div>
      
      <div className="relative p-5 sm:p-6 lg:p-8">
        
        {/* Header - Responsive Layout */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6 mb-5 sm:mb-6">
          
          {/* Left Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2.5 sm:p-3 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl sm:rounded-2xl shadow-lg shadow-amber-500/50 shrink-0">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-800 break-words">
                    {title}
                  </h3>
                  <Badge variant="warning" size="lg" className="shrink-0">
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Peringkat #1
                  </Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-600">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="p-1 bg-neutral-100 rounded-md">
                      <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-500" />
                    </div>
                    <span className="font-semibold text-neutral-700">{school}</span>
                  </div>
                  {grade && (
                    <>
                      <span className="text-neutral-400">•</span>
                      <Badge variant="default" size="sm">Kelas {grade}</Badge>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 mb-4 sm:mb-5">
              <div className="p-1 bg-neutral-100 rounded-md">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-500" />
              </div>
              <span className="font-semibold">oleh {userName || 'Anonymous'}</span>
            </div>

            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Score Badge - Responsive positioning */}
          <div className="shrink-0 self-center lg:self-start">
            <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xl shadow-amber-500/50 text-center min-w-[140px] sm:min-w-[160px]">
              <div className="inline-flex p-2 sm:p-3 bg-white/20 rounded-full mb-2 sm:mb-3">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-1 sm:mb-2">
                {weightedScore.toFixed(1)}
              </div>
              <div className="text-amber-100 text-xs sm:text-sm font-semibold">
                Skor Tertinggi
              </div>
            </div>
          </div>
        </div>

        {/* Scores Grid - Responsive columns */}
        <div className="bg-white/90 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border-2 border-neutral-200 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            
            {[
              { label: 'Originalitas', value: scores.originality, color: 'amber', weight: '35%', emoji: '💡' },
              { label: 'Kegunaan', value: scores.usefulness, color: 'emerald', weight: '35%', emoji: '✅' },
              { label: 'Teknologi', value: scores.technology, color: 'blue', weight: '20%', emoji: '⚙️' },
              { label: 'Kreativitas', value: scores.creativity, color: 'purple', weight: '10%', emoji: '🎨' }
            ].map((item) => (
              <div key={item.label} className="text-center p-3 sm:p-4 bg-neutral-50 rounded-xl border border-neutral-200 hover:shadow-md transition-shadow">
                <div className="text-2xl sm:text-3xl mb-2">{item.emoji}</div>
                <div className="text-xs sm:text-sm font-bold text-neutral-600 mb-1 sm:mb-2">
                  {item.label}
                </div>
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-${item.color}-600 mb-1`}>
                  {item.value}
                </div>
                <div className="text-xs text-neutral-500 font-semibold">
                  Bobot {item.weight}
                </div>
              </div>
            ))}
          </div>

          {/* Average Info - Mobile friendly */}
          <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t-2 border-neutral-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-neutral-600 font-semibold mb-1">
                  🏆 Project Terbaik Saat Ini
                </p>
                <p className="text-xs text-neutral-500">
                  Berhasil meraih skor tertinggi di antara semua project
                </p>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-emerald-50 px-4 py-2.5 rounded-xl border-2 border-emerald-300">
                <Trophy className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700">Juara 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}