import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShareAchievementModal } from './ShareAchievementModal';
import { LoginModal } from './LoginModal';
import { Zap, Moon, Sun, Eye, Flame, LayoutDashboard, Calendar, BarChart2, Users, Trophy, History, Share2, LogOut, LogIn } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPath, navigate, themeMode, setThemeMode, studentProfile, isLoggedIn, logout } = useApp();
  const [clickedNav, setClickedNav] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleNavClick = (path: string) => {
    setClickedNav(path);
    navigate(path);
    setTimeout(() => setClickedNav(null), 800);
  };

  return (
    <header className="sticky top-[37px] z-40 bg-[#08090d]/90 backdrop-blur-md border-b border-white/10 px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-all ${
            clickedNav === '/' ? 'animate-icon-blink' : ''
          }`}>
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white font-mono">
                AB<span className="text-orange-500">Talks</span>
              </span>
              <span className="bg-orange-500/15 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-500/30 font-mono">
                60 DAYS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-none hidden sm:block">
              Daily Code Challenge Platform
            </p>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 bg-[#12141d] p-1 rounded-2xl border border-white/10 text-xs font-medium">
          <button
            onClick={() => handleNavClick('/dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              currentPath === '/dashboard'
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold shadow-sm shadow-orange-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className={`w-3.5 h-3.5 ${clickedNav === '/dashboard' ? 'animate-icon-blink text-orange-400' : ''}`} />
            <span>Dashboard</span>
            {studentProfile.currentStreak > 0 && (
              <span className="flex items-center gap-0.5 bg-orange-500/30 text-orange-300 text-[10px] px-1.5 py-0.5 rounded-full font-bold font-mono">
                <Flame className="w-2.5 h-2.5 fill-orange-400 animate-pulse" />
                {studentProfile.currentStreak}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('/day/12')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              currentPath.startsWith('/day/')
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold shadow-sm shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className={`w-3.5 h-3.5 ${clickedNav === '/day/12' ? 'animate-icon-blink text-indigo-400' : ''}`} />
            <span>Day 12</span>
          </button>

          <button
            onClick={() => handleNavClick('/statistics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              currentPath === '/statistics'
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold shadow-sm shadow-orange-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart2 className={`w-3.5 h-3.5 ${clickedNav === '/statistics' ? 'animate-icon-blink text-orange-400' : ''}`} />
            <span>Stats</span>
          </button>

          <button
            onClick={() => handleNavClick('/developers')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              currentPath === '/developers'
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold shadow-sm shadow-orange-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className={`w-3.5 h-3.5 ${clickedNav === '/developers' ? 'animate-icon-blink text-orange-400' : ''}`} />
            <span>Directory</span>
          </button>

          <button
            onClick={() => handleNavClick('/leaderboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              currentPath === '/leaderboard'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold shadow-sm shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Trophy className={`w-3.5 h-3.5 ${clickedNav === '/leaderboard' ? 'animate-icon-blink text-amber-400' : ''}`} />
            <span>Ranks</span>
          </button>

          <button
            onClick={() => handleNavClick('/submissions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              currentPath === '/submissions'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold shadow-sm shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <History className={`w-3.5 h-3.5 ${clickedNav === '/submissions' ? 'animate-icon-blink text-emerald-400' : ''}`} />
            <span>Submissions</span>
          </button>
        </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-1.5">
            {/* Share Achievement Button */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-bold font-mono"
              title="Share 60-Day Streak Achievement on LinkedIn"
            >
              <Share2 className="w-3.5 h-3.5 fill-white" />
              <span className="hidden lg:inline">Share Card</span>
            </button>

            {/* Theme switcher */}
            <div className="bg-[#12141d] border border-white/10 p-0.5 rounded-xl flex items-center">
              <button
                onClick={() => setThemeMode('dark')}
                title="Late-Night Dark Theme"
                className={`p-1.5 rounded-lg transition-colors ${
                  themeMode === 'dark' ? 'bg-orange-500/20 text-orange-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setThemeMode('night-shield')}
                title="Night-Shield Blue Light Filter"
                className={`p-1.5 rounded-lg transition-colors ${
                  themeMode === 'night-shield' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setThemeMode('light')}
                title="Light Theme"
                className={`p-1.5 rounded-lg transition-colors ${
                  themeMode === 'light' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Auth Button */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  if (confirm('Log out of current student account?')) {
                    logout();
                  }
                }}
                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-2.5 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log In</span>
              </button>
            )}

            {/* Profile Quick Avatar */}
            <div
              onClick={() => handleNavClick('/profile')}
              className="flex items-center gap-2 pl-0.5 cursor-pointer group"
              title={`${studentProfile.name} - Profile`}
            >
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className={`w-8 h-8 rounded-xl border border-orange-500/40 object-cover group-hover:scale-105 transition-transform ${
                  clickedNav === '/profile' ? 'animate-icon-blink ring-2 ring-orange-500' : ''
                }`}
              />
            </div>
          </div>
        </div>

      {/* Share Achievement Modal */}
      <ShareAchievementModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
};

