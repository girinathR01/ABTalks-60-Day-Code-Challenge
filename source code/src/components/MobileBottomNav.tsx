import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, Calendar, BarChart2, Users, Trophy, History } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentPath, navigate } = useApp();
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  const navItems = [
    { label: 'Dash', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Task', path: '/day/12', icon: Calendar },
    { label: 'Stats', path: '/statistics', icon: BarChart2 },
    { label: 'Devs', path: '/developers', icon: Users },
    { label: 'Rank', path: '/leaderboard', icon: Trophy },
    { label: 'Proof', path: '/submissions', icon: History },
  ];

  const handleItemClick = (path: string) => {
    setClickedItem(path);
    navigate(path);
    setTimeout(() => setClickedItem(null), 800);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#08090d]/95 backdrop-blur-lg border-t border-white/10 px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path || (item.path.startsWith('/day/') && currentPath.startsWith('/day/'));
          const isClicked = clickedItem === item.path;

          return (
            <button
              key={item.path}
              onClick={() => handleItemClick(item.path)}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
                isActive
                  ? 'text-orange-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isClicked ? 'animate-icon-blink text-orange-400' : ''}`} />
              <span className="text-[10px] font-mono leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

