import React, { useState, useEffect, useCallback } from 'react';
import { CounterDisplay } from './components/CounterDisplay';
import { Controls } from './components/Controls';
import { GeminiFact } from './components/GeminiFact';

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [lastKey, setLastKey] = useState<string | null>(null);

  const increment = useCallback(() => {
    setCount(prev => prev + step);
    setLastKey('UP');
    setTimeout(() => setLastKey(null), 200);
  }, [step]);

  const decrement = useCallback(() => {
    setCount(prev => prev - step);
    setLastKey('DOWN');
    setTimeout(() => setLastKey(null), 200);
  }, [step]);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        increment();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        decrement();
      } else if (e.key === 'r' || e.key === 'R') {
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [increment, decrement, reset]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black">
      
      <div className="w-full max-w-lg relative">
        {/* Background Decorative Blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-100 pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700 pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
            QuickCount AI
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            Simple. Rápido. Inteligente.
          </p>
        </div>

        {/* Main Interface Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
          
          {/* Key Hints */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-30 hidden md:flex">
             <div className={`px-2 py-1 rounded border border-white text-xs ${lastKey === 'UP' ? 'bg-white text-black' : 'text-white'}`}>↑</div>
             <div className={`px-2 py-1 rounded border border-white text-xs ${lastKey === 'DOWN' ? 'bg-white text-black' : 'text-white'}`}>↓</div>
          </div>

          <CounterDisplay count={count} />
          
          <Controls 
            onIncrement={increment} 
            onDecrement={decrement} 
            onReset={reset}
            step={step}
            setStep={setStep}
          />
        </div>

        {/* AI Integration */}
        <div className="relative z-10">
          <GeminiFact count={count} />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-600 text-xs">
          <p>Presiona 'R' para reiniciar</p>
        </div>

      </div>
    </div>
  );
}