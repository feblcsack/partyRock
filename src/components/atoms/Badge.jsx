import React from 'react';

const Badge = ({ children, color = 'emerald', size = 'md' }) => {
  const colors = {
    emerald: 'bg-emerald-100 text-emerald-700',
    neutral: 'bg-neutral-100 text-neutral-700',
    amber: 'bg-amber-100 text-amber-700',
    slate: 'bg-slate-100 text-slate-700'
  };
  
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1'
  };
  
  return (
    <span className={`${colors[color]} ${sizes[size]} font-semibold rounded-full inline-block`}>
      {children}
    </span>
  );
};

export default Badge;