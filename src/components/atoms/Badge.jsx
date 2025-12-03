// src/components/atoms/Badge.jsx
import React from 'react';

export default function Badge({ children, variant = 'default', size = 'md' }) {
  const baseStyles = 'inline-flex items-center gap-1 font-semibold rounded-lg';
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  const variants = {
    default: 'bg-neutral-100 text-neutral-700',
    primary: 'bg-emerald-100 text-emerald-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700'
  };

  return (
    <span className={`${baseStyles} ${sizes[size]} ${variants[variant]}`}>
      {children}
    </span>
  );
}