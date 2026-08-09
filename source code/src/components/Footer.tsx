import React from 'react';
import { useApp } from '../context/AppContext';
import { Zap, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="bg-[#08090d] border-t border-white/10 py-10 px-4 text-xs text-slate-400">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center text-slate-950 font-bold">
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
            </div>
            <span className="font-extrabold text-white text-sm font-mono">ABTalks 60-Day Challenge</span>
          </div>
          <p className="text-slate-400 text-[11px] max-w-sm leading-relaxed">
            Building daily proof of work for Indian engineering college students. From hostel late nights to top tech placements.
          </p>
        </div>

        {/* Route Map Guide */}
        <div className="bg-[#11131c] p-3.5 rounded-2xl border border-white/10 text-center font-mono text-[11px] shadow-md">
          <div className="text-orange-400 font-bold mb-1 flex items-center justify-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>Route Map (390px Viewport):</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300 font-semibold">
            <button onClick={() => navigate('/')} className="hover:text-orange-400">
              /
            </button>
            <span>•</span>
            <button onClick={() => navigate('/dashboard')} className="hover:text-orange-400">
              /dashboard
            </button>
            <span>•</span>
            <button onClick={() => navigate('/day/12')} className="hover:text-orange-400">
              /day/12
            </button>
          </div>
        </div>

        <div className="text-center md:text-right text-[11px] text-slate-400">
          <p className="flex items-center justify-center md:justify-end gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for Indian College Coders</span>
          </p>
          <p className="mt-1 font-mono text-slate-400">100% Free & Open Source</p>
        </div>
      </div>
    </footer>
  );
};
