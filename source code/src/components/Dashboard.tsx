import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EdgeCasePanel } from './EdgeCasePanel';
import { ShareAchievementModal } from './ShareAchievementModal';
import { LoginModal } from './LoginModal';
import { TRACKS, CHALLENGE_DAYS, LEADERBOARD } from '../data/mockData';
import {
  Flame,
  CheckCircle2,
  Calendar,
  Trophy,
  Award,
  ArrowRight,
  Sparkles,
  Clock,
  Github,
  Linkedin,
  AlertTriangle,
  User,
  Zap,
  Moon,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Plus,
  Share2,
  Download,
  LogIn,
  UserPlus
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    studentProfile,
    submissions,
    navigate,
    edgeCaseMode,
    applyExamFreeze,
    completeCatchUp,
    updateProfile,
    activeTrackId,
    isLoggedIn
  } = useApp();

  const [selectedDayModal, setSelectedDayModal] = useState<number | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalMode, setLoginModalMode] = useState<'signin' | 'signup'>('signup');
  const [editCollege, setEditCollege] = useState(studentProfile.college || '');
  const [editGithub, setEditGithub] = useState(studentProfile.githubHandle || '');
  const [editLinkedin, setEditLinkedin] = useState(studentProfile.linkedinUrl || '');

  const totalDays = 60;
  const completedCount = studentProfile.totalSubmissions;
  const completionPercentage = Math.round((completedCount / totalDays) * 100);
  const currentTrack = TRACKS.find((t) => t.id === studentProfile.trackId) || TRACKS[0];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      college: editCollege,
      githubHandle: editGithub,
      linkedinUrl: editLinkedin,
      name: studentProfile.name === 'New Student' ? 'Ankit Kumar' : studentProfile.name
    });
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-4xl mx-auto">
      {/* Edge Case Simulator Bar */}
      <EdgeCasePanel />

      {/* EDGE CASE 1: Empty Profile State Warning/Form */}
      {edgeCaseMode === 'EMPTY_PROFILE' && !studentProfile.college && (
        <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-5 mb-6 text-amber-200">
          <div className="flex items-center gap-2 font-bold text-sm mb-2 text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Profile Incomplete: Set up your college & handles</span>
          </div>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Recruiters verify student authenticity through your college name and public GitHub & LinkedIn accounts. Please update your profile below.
          </p>

          <form onSubmit={handleSaveProfile} className="space-y-3 max-w-md bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Your College Name</label>
              <input
                type="text"
                placeholder="e.g. RV College of Engineering, Bengaluru"
                value={editCollege}
                onChange={(e) => setEditCollege(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">GitHub Username</label>
              <input
                type="text"
                placeholder="e.g. ankit-code"
                value={editGithub}
                onChange={(e) => setEditGithub(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">LinkedIn Profile URL</label>
              <input
                type="text"
                placeholder="e.g. https://linkedin.com/in/ankit-kumar"
                value={editLinkedin}
                onChange={(e) => setEditLinkedin(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 rounded-lg transition-colors"
            >
              Save Profile & Unlock Dashboard
            </button>
          </form>
        </div>
      )}

      {/* EDGE CASE 2: Missed Day Recovery Banner */}
      {edgeCaseMode === 'MISSED_DAY_RECOVERY' && (
        <div className="bg-gradient-to-r from-orange-950/80 via-amber-950/80 to-slate-900 border border-orange-500/50 rounded-2xl p-5 mb-6 text-white shadow-xl">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-orange-300">Streak Alert: Missed Yesterday's Task!</h3>
                <p className="text-[11px] text-slate-300">College mid-terms or hostel Wi-Fi issue? We got you covered.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-orange-500/20">
            {/* Option 1: Exam Grace Pass */}
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Option 1: Exam Grace Pass</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  Activate 1-time monthly Exam Freeze pass to freeze your streak at {studentProfile.longestStreak} days.
                </p>
              </div>
              <button
                onClick={applyExamFreeze}
                disabled={!studentProfile.hasExamFreezeAvailable}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {studentProfile.hasExamFreezeAvailable ? 'Apply Exam Grace Pass (Free)' : 'Pass Already Used'}
              </button>
            </div>

            {/* Option 2: Catch up Challenge */}
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Option 2: 30-Min Catchup Challenge</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  Submit express proof of yesterday's task to restore your streak instantly.
                </p>
              </div>
              <button
                onClick={completeCatchUp}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 rounded-lg transition-colors"
              >
                Complete Catchup & Restore Streak
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDGE CASE 3: First Day / No Streak Onboarding Banner */}
      {edgeCaseMode === 'NO_STREAK_DAY1' && studentProfile.currentStreak === 0 && (
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border border-emerald-500/40 rounded-2xl p-5 mb-6 text-white">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to Day 1 / 60</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Kickstart Your 60-Day Streak Today!</h2>
          <p className="text-xs text-slate-300 leading-relaxed mb-4 max-w-xl">
            You have 0 active streak right now. Complete Day 1 challenge by committing code to GitHub and sharing your commitment on LinkedIn to light your first flame!
          </p>
          <button
            onClick={() => navigate('/day/12')}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-all"
          >
            <span>Start Today's Challenge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* LOGGED OUT STATE BANNER */}
      {!isLoggedIn && (
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/40 rounded-2xl p-5 mb-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <LogIn className="w-4 h-4" />
              <span>You are currently logged out</span>
            </div>
            <h2 className="text-base font-extrabold text-white">Sign In or Sign Up to Sync Your 60-Day Streak</h2>
            <p className="text-xs text-slate-300">
              Log in with your username & password or reset via email OTP to record your daily proof of work.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setLoginModalMode('signin');
                setIsLoginModalOpen(true);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-md"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => {
                setLoginModalMode('signup');
                setIsLoginModalOpen(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-md"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Student Header Bento Card */}
      <section className="bg-[#11131c] border border-white/10 rounded-3xl p-6 mb-6 shadow-xl relative overflow-hidden hover:animate-glow-pulse transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* User Bio */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-500/60 shadow-md"
              />
              {studentProfile.currentStreak > 0 && (
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full p-1 shadow">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white">{studentProfile.name}</h1>
                <span className="text-[10px] bg-[#1a1c2a] text-orange-400 font-mono px-2.5 py-0.5 rounded-lg border border-white/10">
                  {currentTrack.title}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {studentProfile.college || 'College Not Set'} {studentProfile.city && `• ${studentProfile.city}`}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1.5 font-mono">
                <span className="flex items-center gap-1 text-slate-300">
                  <Github className="w-3 h-3 text-slate-400" />
                  @{studentProfile.githubHandle || 'no-handle'}
                </span>
                <span>•</span>
                <span className="text-indigo-400 font-bold">
                  Rank #{studentProfile.rank || 18} in Track
                </span>
              </div>
            </div>
          </div>

          {/* Streak Flame Badge & Share Achievement Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white p-3.5 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-orange-500/20 transition-transform hover:scale-105 active:scale-95 group shrink-0"
              title="Export 60-Day Streak Card for LinkedIn"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              <span className="text-[10px] font-black font-mono mt-1">SHARE CARD</span>
            </button>

            <div className="bg-[#171a28] border border-white/10 p-4 rounded-2xl flex items-center gap-3 shrink-0 shadow-inner hover:animate-glow-pulse transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-500">
                <Flame className="w-7 h-7 fill-orange-500 animate-pulse" />
              </div>
              <div>
                <div className="text-2xl font-black text-white font-mono leading-none">
                  {studentProfile.currentStreak}{' '}
                  <span className="text-xs font-semibold text-slate-400 font-sans">DAYS</span>
                </div>
                <div className="text-[11px] text-orange-400 font-bold mt-1 flex items-center gap-1">
                  <span>🔥 Active Streak</span>
                  {studentProfile.longestStreak > 0 && (
                    <span className="text-slate-400 text-[10px] font-mono">(Max: {studentProfile.longestStreak}d)</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Progress Bar Bento Segment */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs mb-2 font-mono">
            <span className="text-slate-300 font-sans font-bold">Overall Challenge Progress</span>
            <span className="text-orange-400 font-bold">
              {completedCount}/60 Days ({completionPercentage}%)
            </span>
          </div>

          <div className="w-full h-3.5 bg-[#08090d] rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full transition-all duration-500 shadow-sm shadow-orange-500/50"
              style={{ width: `${Math.max(completionPercentage, 3)}%` }}
            />
          </div>
        </div>
      </section>

      {/* Thoughtful Late Night Owl Mode Status Bento Widget */}
      <section className="bg-gradient-to-r from-[#121422] via-[#161a2a] to-[#121422] border border-indigo-500/30 rounded-3xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-xl hover:animate-glow-pulse transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
            <Moon className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-2">
              <span>🌙 Hostel Night-Owl Focus Time</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30 font-mono">
                11:42 PM IST
              </span>
            </div>
            <p className="text-slate-300 text-[11px] mt-0.5">
              3,840 college students across India coding right now. Daily deadline in <strong className="text-orange-400 font-mono">2h 18m</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/day/12')}
          className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl whitespace-nowrap transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25"
        >
          <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>Go to Today's Task</span>
        </button>
      </section>

      {/* Active Today's Task Featured Bento Card */}
      <section className="bg-gradient-to-br from-[#12141d] to-[#171a28] border border-orange-500/30 rounded-3xl p-6 mb-6 shadow-xl relative overflow-hidden hover:animate-glow-pulse transition-all duration-300">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold font-mono text-orange-400 bg-orange-500/15 border border-orange-500/30 px-3 py-0.5 rounded-full">
            TODAY'S TASK • DAY 12 OF 60
          </span>
          <span className="text-xs text-slate-400 font-mono">+100 XP Reward</span>
        </div>

        <h2 className="text-lg sm:text-xl font-extrabold text-white mb-2">
          {CHALLENGE_DAYS[12].title}
        </h2>

        <p className="text-xs text-slate-300 leading-relaxed mb-5">
          {CHALLENGE_DAYS[12].shortSummary}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              45 Mins
            </span>
            <span>•</span>
            <span className="text-indigo-400 font-semibold">Backend Systems</span>
          </div>

          <button
            onClick={() => navigate('/day/12')}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5 transition-transform hover:scale-105"
          >
            <span>Open Day 12 Complete Prompt</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 60-Day Heatmap Interactive Bento Grid Card */}
      <section className="bg-[#11131c] border border-white/10 rounded-3xl p-6 mb-6 shadow-xl hover:animate-glow-pulse transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>60-Day Challenge Interactive Grid</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Click any day block to inspect or submit task proof</p>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Done
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-orange-500 animate-pulse" /> Today
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-[#181a26] border border-white/10" /> Locked
            </span>
          </div>
        </div>

        {/* 60 Day Bento Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
          {Array.from({ length: 60 }, (_, i) => i + 1).map((dayNum) => {
            const isCompleted = !!submissions[dayNum];
            const isToday = dayNum === 12 || (edgeCaseMode === 'NO_STREAK_DAY1' && dayNum === 1);
            const isLocked = dayNum > 12 && edgeCaseMode !== 'NO_STREAK_DAY1';

            return (
              <button
                key={dayNum}
                onClick={() => {
                  if (dayNum === 12) navigate('/day/12');
                  else navigate(`/day/${dayNum}`);
                }}
                className={`h-10 rounded-xl flex flex-col items-center justify-center transition-all border relative group hover:animate-glow-pulse ${
                  isCompleted
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30'
                    : isToday
                    ? 'bg-orange-500/25 border-orange-500 text-orange-300 font-bold ring-2 ring-orange-500/40'
                    : isLocked
                    ? 'bg-[#141622]/60 border-white/5 text-slate-600 hover:border-white/15 hover:text-slate-400'
                    : 'bg-[#181a26] border-white/10 text-slate-300 hover:border-orange-500/50'
                }`}
              >
                <span className="text-xs font-mono font-bold">{dayNum}</span>
                <span className="text-[8px] opacity-70 leading-none font-mono">
                  {isCompleted ? '✓' : isToday ? 'TODAY' : 'DAY'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Achievements & Badges Bento Grid */}
      <section className="bg-[#11131c] border border-white/10 rounded-3xl p-6 mb-6 shadow-xl hover:animate-glow-pulse transition-all duration-300">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-orange-400" />
          <span>Student Achievements & Badges</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {studentProfile.badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border transition-all hover:animate-glow-pulse ${
                b.isUnlocked
                  ? 'bg-[#171a28] border-orange-500/40 text-slate-200 shadow-md'
                  : 'bg-[#141622]/60 border-white/5 text-slate-500 opacity-60'
              }`}
            >
              <div className="text-2xl mb-1.5">{b.icon}</div>
              <h4 className="text-xs font-bold text-white mb-1">{b.title}</h4>
              <p className="text-[10px] text-slate-400 leading-tight">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Indian College Student Leaderboard Snippet Bento Card */}
      <section className="bg-[#11131c] border border-white/10 rounded-3xl p-6 shadow-xl hover:animate-glow-pulse transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-orange-400" />
            <span>Top College Coders (India Track)</span>
          </h2>
          <span className="text-[11px] text-slate-400 font-mono">Updated Daily</span>
        </div>

        <div className="space-y-2.5">
          {LEADERBOARD.map((user) => (
            <div
              key={user.rank}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#171a28] border border-white/5 text-xs hover:border-white/15 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="w-5 font-mono font-bold text-slate-400 text-center">#{user.rank}</span>
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl object-cover border border-white/10" />
                <div>
                  <div className="font-bold text-white">{user.name}</div>
                  <div className="text-[10px] text-slate-400">{user.college}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono">
                <span className="flex items-center gap-1 font-bold text-orange-400">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  {user.streak}d
                </span>
                <span className="text-amber-400 font-bold">{user.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Share Achievement Modal */}
      <ShareAchievementModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        defaultMode={loginModalMode}
      />
    </div>
  );
};
