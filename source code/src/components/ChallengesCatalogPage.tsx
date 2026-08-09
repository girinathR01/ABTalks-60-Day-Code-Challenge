import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CHALLENGE_DAYS, TRACKS } from '../data/mockData';
import { BookOpen, CheckCircle2, Clock, Lock, ArrowRight, Zap, Filter, Search } from 'lucide-react';

export const ChallengesCatalogPage: React.FC = () => {
  const { submissions, navigate } = useApp();
  const [selectedTrack, setSelectedTrack] = useState<string>('fullstack');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'COMPLETED' | 'PENDING'>('ALL');

  const allDays = Array.from({ length: 60 }, (_, i) => i + 1);

  const filteredDays = allDays.filter((dayNum) => {
    const dayData = CHALLENGE_DAYS[dayNum];
    const isCompleted = !!submissions[dayNum];

    const matchesSearch =
      dayData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dayData.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'COMPLETED' && isCompleted) ||
      (statusFilter === 'PENDING' && !isCompleted);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#12141d] via-[#171a28] to-[#12141d] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold bg-orange-500/15 text-orange-400 px-3 py-0.5 rounded-full border border-orange-500/30">
              60-DAY DEVELOPMENT CATALOG
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Daily Hands-On Engineering Challenges
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Explore all 60 production tasks across Full Stack, GenAI Agents, Backend Infrastructure, and Mobile App development.
          </p>
        </div>

        <div className="bg-[#181a26] border border-white/10 p-3 rounded-2xl flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white font-mono">60 Days Structured</div>
            <div className="text-[10px] text-slate-400">LeetCode/CodeChef Style</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar Bento Card */}
      <div className="bg-[#11131c] border border-white/10 p-4 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search topic, title, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#181a26] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 font-mono"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-[#181a26] border border-white/10 p-1 rounded-2xl shrink-0">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              statusFilter === 'ALL'
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All 60 Days
          </button>
          <button
            onClick={() => setStatusFilter('COMPLETED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              statusFilter === 'COMPLETED'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setStatusFilter('PENDING')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              statusFilter === 'PENDING'
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDays.map((dayNum) => {
          const dayData = CHALLENGE_DAYS[dayNum];
          const isCompleted = !!submissions[dayNum];
          const isToday = dayNum === 12;

          return (
            <div
              key={dayNum}
              onClick={() => navigate(`/day/${dayNum}`)}
              className={`bg-[#11131c] border rounded-3xl p-5 shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:scale-[1.02] group ${
                isCompleted
                  ? 'border-emerald-500/40 hover:border-emerald-500'
                  : isToday
                  ? 'border-orange-500/60 ring-2 ring-orange-500/20'
                  : 'border-white/10 hover:border-orange-500/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : isToday
                        ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                        : 'bg-[#181a26] text-slate-400 border-white/10'
                    }`}
                  >
                    DAY {dayNum} OF 60
                  </span>

                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-orange-400" />
                    {dayData.estimatedMinutes}m
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm group-hover:text-orange-400 transition-colors line-clamp-2">
                  {dayData.title}
                </h3>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {dayData.shortSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[11px] text-indigo-300 font-mono font-semibold">
                  +{dayData.xp} XP
                </span>

                <div className="flex items-center gap-1 text-orange-400 font-bold group-hover:translate-x-1 transition-transform">
                  <span>{isCompleted ? 'Review Problem' : 'Open Problem'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
