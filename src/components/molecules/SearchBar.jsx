import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
      <input 
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 bg-white text-zinc-500 border border-neutral-200 rounded-lg focus:ring-1 focus:ring-emerald-300 outline-none transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;