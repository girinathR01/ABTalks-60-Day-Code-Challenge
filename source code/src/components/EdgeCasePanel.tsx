import React from 'react';
import { useApp } from '../context/AppContext';
import { EdgeCaseMode } from '../types';
import { Flame, AlertTriangle, UserX, Sparkles, Sliders } from 'lucide-react';

export const EdgeCasePanel: React.FC = () => {
  const { edgeCaseMode, setEdgeCaseMode } = useApp();

  const modes: { id: EdgeCaseMode; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'ACTIVE',
      label: '🔥 Active Student',
      icon: <Flame className="w-3.5 h-3.5 text-orange-400" />,
      desc: '14-Day Streak active'
    },
    {
      id: 'NO_STREAK_DAY1',
      label: '🌱 First Day (No Streak)',
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />,
      desc: 'Day 1 Onboarding'
    },
    {
      id: 'MISSED_DAY_RECOVERY',
      label: '⚠️ Missed Day',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />,
      desc: 'Streak broken & recovery'
    },
    {
      id: 'EMPTY_PROFILE',
      label: '👤 Empty Profile',
      icon: <UserX className="w-3.5 h-3.5 text-slate-400" />,
      desc: 'Setup required'
    }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 mb-6 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span>Real-World Edge Case Simulator:</span>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
          Interactive Testing Mode
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {modes.map((m) => {
          const isActive = edgeCaseMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setEdgeCaseMode(m.id)}
              className={`flex flex-col items-start p-2 rounded-lg text-left transition-all border ${
                isActive
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 ring-1 ring-amber-500/30'
                  : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                {m.icon}
                <span>{m.label}</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5">{m.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
