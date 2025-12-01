import React from 'react';
import { Trophy, School } from 'lucide-react';
import Badge from '../atoms/Badge';

const TopProjectCard = ({ project }) => {
  const calculateWeightedScore = (scores) => {
    const weighted = (
      scores.originality * 0.35 +
      scores.usefulness * 0.35 +
      scores.technology * 0.20 +
      scores.creativity * 0.10
    );
    return weighted.toFixed(1);
  };

  return (
    <div className="bg-neutral-800 rounded-2xl p-6 text-neutral-50 shadow-xl border border-neutral-700 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-10 opacity-5">
        <Trophy className="w-64 h-64" />
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <Badge color="amber" size="sm">
            <Trophy className="w-3 h-3 inline mr-1" />
            Peringkat 1
          </Badge>
          <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-2">{project.title}</h3>
          <div className="flex items-center gap-2 text-neutral-300">
            <School className="w-4 h-4" />
            <span className="text-sm">{project.school}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 bg-neutral-900/50 backdrop-blur-sm p-4 rounded-xl border border-neutral-700">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-neutral-400 mb-1">Orisinalitas</p>
            <p className="text-2xl font-bold text-amber-400">{project.scores.originality}</p>
          </div>
          <div className="w-px h-12 bg-neutral-700"></div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-neutral-400 mb-1">Total Skor</p>
            <p className="text-3xl font-bold text-emerald-400">
              {calculateWeightedScore(project.scores)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProjectCard;