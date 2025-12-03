// src/components/atoms/ScoreDisplay.jsx
import React from 'react';

export default function ScoreDisplay({ label, score, color = 'emerald' }) {
  const colorClasses = {
    amber: 'from-amber-400 to-amber-500',
    emerald: 'from-emerald-400 to-emerald-500',
    blue: 'from-blue-400 to-blue-500',
    purple: 'from-purple-400 to-purple-500'
  };

  const gradient = colorClasses[color] || colorClasses.emerald;

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs sm:text-sm font-bold text-neutral-700">
          {label}
        </span>
        <span className="text-xs sm:text-sm font-bold text-neutral-900 bg-white px-2 py-0.5 rounded-md shadow-sm">
          {score}
        </span>
      </div>
      <div className="h-2 sm:h-2.5 bg-neutral-200 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
}