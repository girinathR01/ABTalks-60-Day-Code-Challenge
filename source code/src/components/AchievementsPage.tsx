import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShareAchievementModal } from './ShareAchievementModal';
import { Award, Trophy, Flame, Zap, ShieldCheck, Lock, CheckCircle2, Sparkles, Download, Share2 } from 'lucide-react';

export const AchievementsPage: React.FC = () => {
  const { studentProfile, submissions } = useApp();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const completedCount = Object.keys(submissions).length;
  const streak = studentProfile.currentStreak;

  const milestones = [
    { days: 7, title: '7-Day Kickstart Milestone', description: 'Maintained a clean 7-day coding streak', unlocked: streak >= 7 || completedCount >= 7, icon: '🔥' },
    { days: 14, title: '14-Day Consistency Veteran', description: 'Completed 2 full weeks of daily proof of work', unlocked: streak >= 14 || completedCount >= 14, icon: '⚡' },
    { days: 21, title: '21-Day Habit Master', description: 'Coding late at night has become second nature', unlocked: completedCount >= 21, icon: '🎯' },
    { days: 30, title: '30-Day Halfway Legend', description: 'Reached the halfway milestone of the 60-day challenge', unlocked: completedCount >= 30, icon: '🏆' },
    { days: 45, title: '45-Day Elite Scholar', description: 'Built an impressive portfolio of public projects', unlocked: completedCount >= 45, icon: '💎' },
    { days: 60, title: '60-Day Challenge Winner', description: 'Finished the entire 60-day challenge with verified proof', unlocked: completedCount >= 60, icon: '👑' },
  ];

  const badges = [
    { title: 'First Blood', category: 'Submission', description: 'Submitted your first GitHub commit and LinkedIn post', unlocked: completedCount >= 1 },
    { title: 'Late-Night Owl', category: 'Time', description: 'Pushed proof of work after 11 PM hostel curfew', unlocked: true },
    { title: 'GitHub Committer', category: 'Code', description: 'Accumulated 10+ verified GitHub repository commits', unlocked: completedCount >= 10 },
    { title: 'LinkedIn Thought Leader', category: 'Writing', description: 'Published 10+ public learning writeups on LinkedIn', unlocked: completedCount >= 10 },
    { title: 'Exam Shield Survivor', category: 'Resilience', description: 'Used an Exam Grace Pass to preserve streak during semester exams', unlocked: true },
    { title: 'Top 50 Ranker', category: 'Leaderboard', description: 'Ranked in the top 50 student developers across India', unlocked: studentProfile.rank <= 50 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#12141d] via-[#171a28] to-[#12141d] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:animate-glow-pulse transition-all duration-300">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold bg-amber-500/15 text-amber-400 px-3 py-0.5 rounded-full border border-amber-500/30">
              MILESTONES & BADGES
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Developer Achievements & Proof Medals
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Earn verifiable badges and unlock milestone certificates as you progress through the 60 days.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white text-xs font-black rounded-xl shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Export Streak Card</span>
          </button>

          <div className="bg-[#181a26] border border-white/10 p-3 rounded-2xl flex items-center gap-3 font-mono hover:animate-glow-pulse transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {milestones.filter((m) => m.unlocked).length} / {milestones.length} Unlocked
              </div>
              <div className="text-[10px] text-slate-400">Milestone Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* 60-Day Milestones Section */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-orange-400" />
          <span>60-Day Progression Milestones</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className={`bg-[#11131c] border rounded-3xl p-5 shadow-xl hover:animate-glow-pulse transition-all duration-300 space-y-3 ${
                m.unlocked
                  ? 'border-amber-500/50 bg-gradient-to-br from-[#11131c] to-[#1c1826]'
                  : 'border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-2xl">{m.icon}</span>
                {m.unlocked ? (
                  <span className="flex items-center gap-1 bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" /> UNLOCKED
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-[#181a26] text-slate-500 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-white/10">
                    <Lock className="w-3 h-3" /> LOCKED
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-white text-sm">{m.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{m.description}</p>
              </div>

              {!m.unlocked && (
                <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-slate-500">
                  Requires {m.days} completed days (Current: {completedCount})
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Special Badge Collection */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Special Achievement Badges</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className={`bg-[#11131c] border rounded-3xl p-5 shadow-xl hover:animate-glow-pulse transition-all duration-300 space-y-2 ${
                b.unlocked ? 'border-orange-500/40' : 'border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-lg border border-indigo-500/20">
                  {b.category}
                </span>
                {b.unlocked && <Sparkles className="w-4 h-4 text-amber-400" />}
              </div>

              <h3 className="font-bold text-white text-sm">{b.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Share Achievement Modal */}
      <ShareAchievementModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};
