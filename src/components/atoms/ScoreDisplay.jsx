import React from 'react';

const ScoreDisplay = ({ label, value, icon: Icon, color = 'emerald' }) => {
  const colors = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200'
  };
  
  return (
    <div className={`p-3 rounded-lg border ${colors[color]} transition-all hover:shadow-sm`}>
      <div className="flex items-center gap-1.5 mb-1">
        {Icon && <Icon className="w-3.5 h-3.5" />}
        <p className="text-xs font-medium">{label}</p>
      </div>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
};

export default ScoreDisplay;