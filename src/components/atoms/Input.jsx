import React from 'react';

const Input = ({ icon: Icon, className = '', ...props }) => {
  return (
    <div className="relative w-full">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />}
      <input 
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 bg-white border border-neutral-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;