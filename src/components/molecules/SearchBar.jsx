// src/components/molecules/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Cari...' }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="w-5 h-5 text-neutral-500" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 bg-white border-2 border-neutral-300 rounded-xl text-neutral-900 font-medium placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
      />
    </div>
  );
}