import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Sparkles } from 'lucide-react';

export const RouteMapBar: React.FC = () => {
  const { currentPath, navigate } = useApp();

  const routes = [
    { label: '/', name: 'Landing' },
    { label: '/dashboard', name: 'Dashboard' },
    { label: '/day/12', name: 'Challenge' },
    { label: '/statistics', name: 'Analytics' },
    { label: '/developers', name: 'Directory' },
    { label: '/leaderboard', name: 'Ranks' },
    { label: '/submissions', name: 'Proof Log' },
    { label: '/achievements', name: 'Badges' },
  ];

  return (
    <div className="sticky top-0 z-50 bg-[#08090d]/95 backdrop-blur-md border-b border-white/10 py-1.5 px-3 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-indigo-300 font-medium shrink-0">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <MapPin className="w-3.5 h-3.5 text-orange-400" />
          <span className="font-semibold text-slate-200 hidden sm:inline">Views:</span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full pb-0.5 scrollbar-none">
          {routes.map((r) => {
            const isActive = currentPath === r.label || (r.label === '/day/12' && currentPath.startsWith('/day/'));
            return (
              <button
                key={r.label}
                onClick={() => navigate(r.label)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl transition-all whitespace-nowrap font-mono text-[11px] font-bold ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-md shadow-orange-500/20 border border-orange-400/40'
                    : 'bg-[#141622] text-slate-300 hover:bg-[#1c1f30] hover:text-white border border-white/10'
                }`}
              >
                <span>{r.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
