// src/components/molecules/ScoreSlider.jsx
import React from 'react';

export default function ScoreSlider({ label, emoji, value, onChange, weight, color = 'emerald' }) {
  const colorClasses = {
    amber: {
      bg: 'bg-amber-500',
      track: 'bg-amber-100',
      text: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-700'
    },
    emerald: {
      bg: 'bg-emerald-500',
      track: 'bg-emerald-100',
      text: 'text-emerald-600',
      badge: 'bg-emerald-100 text-emerald-700'
    },
    blue: {
      bg: 'bg-blue-500',
      track: 'bg-blue-100',
      text: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-700'
    },
    purple: {
      bg: 'bg-purple-500',
      track: 'bg-purple-100',
      text: 'text-purple-600',
      badge: 'bg-purple-100 text-purple-700'
    }
  };

  const colors = colorClasses[color] || colorClasses.emerald;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl">{emoji}</span>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-neutral-800">
              {label}
            </h4>
            <p className="text-xs text-neutral-500 font-medium">
              Bobot: {weight}%
            </p>
          </div>
        </div>
        
        {/* Value Badge */}
        <div className={`${colors.badge} px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-sm`}>
          <span className="text-lg sm:text-2xl font-bold">
            {value}
          </span>
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Track Background */}
        <div className={`h-3 sm:h-4 ${colors.track} rounded-full overflow-hidden shadow-inner`}>
          {/* Progress Bar */}
          <div 
            className={`h-full ${colors.bg} transition-all duration-300 rounded-full shadow-sm`}
            style={{ width: `${value}%` }}
          ></div>
        </div>

        {/* Slider Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-3 sm:h-4 opacity-0 cursor-pointer"
        />

        {/* Tick Marks */}
        <div className="flex justify-between mt-2 px-1">
          {[0, 25, 50, 75, 100].map((tick) => (
            <div key={tick} className="flex flex-col items-center">
              <div className={`w-0.5 h-2 ${colors.bg} opacity-30`}></div>
              <span className="text-xs text-neutral-400 font-medium mt-1">
                {tick}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Helper Text */}
      <div className="mt-3 flex items-center justify-between text-xs sm:text-sm text-neutral-600">
        <span className="font-medium">Kurang</span>
        <span className="font-medium">Sangat Baik</span>
      </div>
    </div>
  );
}