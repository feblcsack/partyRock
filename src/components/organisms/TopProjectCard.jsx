// src/components/organisms/TopProjectCard.jsx
import React from 'react';
import { Trophy, Award, TrendingUp, User } from 'lucide-react';
import ScoreDisplay from '../atoms/ScoreDisplay';
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
    <div className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 rounded-2xl border-2 border-amber-300 shadow-xl overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-200/30 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl shadow-lg shadow-amber-500/50">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-neutral-800">
                    {title}
                  </h3>
                  <Badge variant="warning" size="lg">
                    <Award className="w-3.5 h-3.5" />
                    Peringkat #1
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <span className="font-medium">{school}</span>
                  {grade && (
                    <>
                      <span className="text-neutral-400">•</span>
                      <span>Kelas {grade}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
              <User className="w-4 h-4" />
              <span>oleh {userName || 'Anonymous'}</span>
            </div>

            <p className="text-neutral-700 leading-relaxed mb-6">
              {description}
            </p>
          </div>

          {/* Score Badge */}
          <div className="shrink-0 text-center">
            <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-2xl p-6 shadow-xl shadow-amber-500/50">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <div className="text-4xl font-bold mb-1">
                {weightedScore.toFixed(1)}
              </div>
              <div className="text-amber-100 text-xs font-medium">
                Skor Tertinggi
              </div>
            </div>
          </div>
        </div>

        {/* Scores Grid */}
        <div className="bg-white/80 backdrop-blur rounded-xl p-5 border border-neutral-200 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-sm font-semibold text-neutral-600 mb-2">Originalitas</div>
              <div className="text-3xl font-bold text-amber-600">{scores.originality}</div>
              <div className="text-xs text-neutral-500 mt-1">35% bobot</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-neutral-600 mb-2">Kegunaan</div>
              <div className="text-3xl font-bold text-emerald-600">{scores.usefulness}</div>
              <div className="text-xs text-neutral-500 mt-1">35% bobot</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-neutral-600 mb-2">Teknologi</div>
              <div className="text-3xl font-bold text-blue-600">{scores.technology}</div>
              <div className="text-xs text-neutral-500 mt-1">20% bobot</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-neutral-600 mb-2">Kreativitas</div>
              <div className="text-3xl font-bold text-purple-600">{scores.creativity}</div>
              <div className="text-xs text-neutral-500 mt-1">10% bobot</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}