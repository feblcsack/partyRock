import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ value, onChange, options, icon: Icon, placeholder }) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 z-10" />
      )}

      <select
        className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-10 py-2.5 bg-white border border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer text-neutral-400`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 pointer-events-none" />
    </div>
  );
};

export default Select;
