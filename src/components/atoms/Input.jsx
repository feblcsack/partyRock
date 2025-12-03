// src/components/atoms/Input.jsx
import React from 'react';

export default function Input({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '', 
  disabled = false,
  className = ''
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-3 bg-white border-2 border-neutral-300 rounded-xl text-neutral-900 font-medium placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed transition-all ${className}`}
    />
  );
}