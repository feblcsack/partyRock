// src/components/molecules/Select.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select({ value, onChange, options, icon: Icon }) {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Icon className="w-5 h-5 text-neutral-500" />
        </div>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-10 py-3 bg-white border-1 border-neutral-300 rounded-xl text-neutral-500 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all appearance-none cursor-pointer`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="font-medium">
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <ChevronDown className="w-5 h-5 text-neutral-500" />
      </div>
    </div>
  );
}