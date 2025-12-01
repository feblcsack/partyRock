import React from 'react';
import { Trophy, School, Star, Medal, Lightbulb, Target, Zap, TrendingUp } from 'lucide-react';
import Badge from '../atoms/Badge';
import ScoreDisplay from '../atoms/ScoreDisplay';
import Button from '../atoms/Button';

const ProjectCard = ({ project, rank, onRate }) => {
  const calculateWeightedScore = (scores) => {
    if (!scores) return 0;
    const weighted = (
      scores.originality * 0.35 +
      scores.usefulness * 0.35 +
      scores.technology * 0.20 +
      scores.creativity * 0.10
    );
    return weighted.toFixed(1);
  };
  
  const totalScore = calculateWeightedScore(project.scores);
  const isRanked = totalScore > 0;
  
  let rankStyles = "border-neutral-200 bg-white";
  let trophyIcon = null;
  let rankBadgeColor = "bg-neutral-800";

  if (isRanked) {
    if (rank === 1) {
      rankStyles = "border-amber-300 bg-amber-50/30";
      trophyIcon = <Trophy className="w-5 h-5 text-amber-500 fill-amber-400" />;
      rankBadgeColor = "bg-amber-500";
    } else if (rank === 2) {
      rankStyles = "border-slate-300 bg-slate-50/30";
      trophyIcon = <Medal className="w-5 h-5 text-slate-400 fill-slate-300" />;
      rankBadgeColor = "bg-slate-400";
    } else if (rank === 3) {
      rankStyles = "border-orange-300 bg-orange-50/30";
      trophyIcon = <Medal className="w-5 h-5 text-orange-400 fill-orange-300" />;
      rankBadgeColor = "bg-orange-400";
    }
  }

  return (
    <div className={`relative bg-white rounded-xl shadow-sm border-2 ${rankStyles} p-5 transition-all hover:shadow-lg hover:-translate-y-1 duration-200`}>
      <div className={`absolute -top-3 -right-3 flex items-center justify-center w-10 h-10 ${rankBadgeColor} rounded-full text-white font-bold shadow-md`}>
        {isRanked ? `#${rank}` : '-'}
      </div>

      <div className="flex items-start justify-between mb-3">
        <Badge color="neutral" size="sm">
          <div className="flex items-center gap-1">
            <School className="w-3 h-3" />
            {project.school}
          </div>
        </Badge>
        {trophyIcon}
      </div>

      <h3 className="text-lg font-bold text-neutral-800 mb-2 line-clamp-1">{project.title}</h3>
      <p className="text-sm text-neutral-500 mb-4 line-clamp-2 min-h-[40px]">{project.description}</p>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <ScoreDisplay 
          label="Orisinalitas" 
          value={project.scores?.originality || 0}
          icon={Lightbulb}
          color="amber"
        />
        <ScoreDisplay 
          label="Manfaat" 
          value={project.scores?.usefulness || 0}
          icon={Target}
          color="blue"
        />
        <ScoreDisplay 
          label="Teknologi" 
          value={project.scores?.technology || 0}
          icon={Zap}
          color="purple"
        />
        <ScoreDisplay 
          label="Total" 
          value={totalScore}
          icon={TrendingUp}
          color="emerald"
        />
      </div>

      <Button 
        variant={project.scores ? 'secondary' : 'primary'}
        size="md"
        onClick={() => onRate(project)}
        className="w-full"
      >
        <Star className="w-4 h-4" />
        {project.scores ? 'Edit Penilaian' : 'Beri Nilai'}
      </Button>
    </div>
  );
};

export default ProjectCard;