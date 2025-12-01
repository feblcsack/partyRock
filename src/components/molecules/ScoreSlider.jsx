import React from 'react';

const ScoreSlider = ({ label, value, onChange, icon: Icon, color = 'emerald', description }) => {
  const colors = {
    emerald: 'accent-emerald-600',
    amber: 'accent-amber-600',
    blue: 'accent-blue-600',
    purple: 'accent-purple-600'
  };
  
  const textColors = {
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600'
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="flex items-center gap-2 font-semibold text-neutral-700">
          {Icon && <Icon className={`w-4 h-4 ${textColors[color]}`} />}
          {label}
        </label>
        <span className={`${textColors[color]} font-bold text-xl min-w-[3rem] text-right`}>{value}</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer ${colors[color]}`}
      />
      {description && <p className="text-xs text-neutral-500">{description}</p>}
    </div>
  );
};

export default ScoreSlider;