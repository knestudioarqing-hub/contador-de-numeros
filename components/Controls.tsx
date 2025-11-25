import React from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface ControlsProps {
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  step: number;
  setStep: (step: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  onIncrement,
  onDecrement,
  onReset,
  step,
  setStep
}) => {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      
      {/* Main Buttons */}
      <div className="flex items-center justify-center gap-6 w-full">
        <button
          onClick={onDecrement}
          className="group relative flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-800 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500 transition-all active:scale-95 shadow-lg"
          aria-label="Disminuir"
        >
          <Minus className="w-8 h-8 text-rose-400 group-hover:text-rose-300 transition-colors" strokeWidth={3} />
        </button>

        <button
          onClick={onReset}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all active:scale-95 shadow-lg"
          aria-label="Reiniciar"
        >
          <RotateCcw className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={onIncrement}
          className="group relative flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-800 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-500 transition-all active:scale-95 shadow-lg"
          aria-label="Aumentar"
        >
          <Plus className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" strokeWidth={3} />
        </button>
      </div>

      {/* Step Selector */}
      <div className="flex items-center gap-2 bg-slate-800/50 p-2 rounded-xl border border-slate-700/50">
        <span className="text-xs font-semibold text-slate-400 uppercase px-2">Paso:</span>
        {[1, 5, 10, 100].map((val) => (
          <button
            key={val}
            onClick={() => setStep(val)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              step === val
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  );
};