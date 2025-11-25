import React, { useState } from 'react';
import { Sparkles, Loader2, Info } from 'lucide-react';
import { getNumberFunFact } from '../services/geminiService';
import { FactStatus } from '../types';

interface GeminiFactProps {
  count: number;
}

export const GeminiFact: React.FC<GeminiFactProps> = ({ count }) => {
  const [fact, setFact] = useState<string | null>(null);
  const [status, setStatus] = useState<FactStatus>(FactStatus.IDLE);

  const handleGetFact = async () => {
    setStatus(FactStatus.LOADING);
    setFact(null);
    try {
      const result = await getNumberFunFact(count);
      setFact(result);
      setStatus(FactStatus.SUCCESS);
    } catch (error) {
      setFact("Lo siento, no pude obtener un dato curioso en este momento.");
      setStatus(FactStatus.ERROR);
    }
  };

  return (
    <div className="mt-8 w-full max-w-md mx-auto">
      {status === FactStatus.IDLE && (
        <button
          onClick={handleGetFact}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium shadow-lg transition-all active:scale-98"
        >
          <Sparkles className="w-4 h-4" />
          <span>¿Qué dice la IA sobre el {count}?</span>
        </button>
      )}

      {status === FactStatus.LOADING && (
        <div className="w-full p-6 rounded-xl bg-slate-800 border border-indigo-500/30 flex items-center justify-center gap-3 animate-pulse">
          <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
          <span className="text-slate-300">Consultando a Gemini...</span>
        </div>
      )}

      {(status === FactStatus.SUCCESS || status === FactStatus.ERROR) && (
        <div className="relative group w-full p-6 rounded-xl bg-slate-800 border border-slate-700 shadow-xl overflow-hidden">
          <div className={`absolute top-0 left-0 w-1 h-full ${status === FactStatus.SUCCESS ? 'bg-gradient-to-b from-indigo-500 to-purple-500' : 'bg-rose-500'}`} />
          
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg ${status === FactStatus.SUCCESS ? 'bg-indigo-500/10 text-indigo-400' : 'bg-rose-500/10 text-rose-400'}`}>
              {status === FactStatus.SUCCESS ? <Sparkles className="w-5 h-5" /> : <Info className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
                {status === FactStatus.SUCCESS ? 'Dato Curioso' : 'Error'}
              </h4>
              <p className="text-slate-200 leading-relaxed text-sm md:text-base">
                {fact}
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleGetFact}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-slate-700/50 transition-all opacity-0 group-hover:opacity-100"
            title="Intentar de nuevo con otra curiosidad"
          >
            <RotateIcon />
          </button>
        </div>
      )}
    </div>
  );
};

const RotateIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
)
