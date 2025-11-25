import React from 'react';

interface CounterDisplayProps {
  count: number;
}

export const CounterDisplay: React.FC<CounterDisplayProps> = ({ count }) => {
  // Simple color logic based on value
  const getColorClass = (val: number) => {
    if (val > 0) return 'text-emerald-400';
    if (val < 0) return 'text-rose-400';
    return 'text-slate-100';
  };

  return (
    <div className="flex justify-center items-center py-12 select-none">
      <span 
        className={`text-9xl font-extrabold tracking-tighter number-transition ${getColorClass(count)} drop-shadow-2xl`}
      >
        {count}
      </span>
    </div>
  );
};