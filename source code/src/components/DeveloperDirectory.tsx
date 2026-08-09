import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_DEVELOPERS, DirectoryDeveloper, TRACKS } from '../data/mockData';
import { Search, Filter, Flame, Trophy, Github, Linkedin, ArrowRight, UserCheck, Sparkles } from 'lucide-react';

export const DeveloperDirectory: React.FC = () => {
  const { navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'rank' | 'streak' | 'completion'>('rank');

  // Filter & Sort developers
  const filteredDevs = MOCK_DEVELOPERS.filter((dev) => {
    const matchesSearch =
      dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.college.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTrack = selectedTrack === 'ALL' || dev.trackId === selectedTrack;

    return matchesSearch && matchesTrack;
  }).sort((a, b) => {
    if (sortBy === 'streak') return b.streak - a.streak;
    if (sortBy === 'completion') return b.completionPercentage - a.completionPercentage;
    return a.rank - b.rank; // default rank ascending
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#12141d] via-[#171a28] to-[#12141d] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:animate-glow-pulse transition-all duration-300">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold bg-orange-500/15 text-orange-400 px-3 py-0.5 rounded-full border border-orange-500/30">
              ABTALKS DEVELOPER DIRECTORY
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Discover Top College Developers Across India
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Inspect public 60-day challenge progress, GitHub commits, LinkedIn writeups, and streaks of active engineering students.
          </p>
        </div>

        <div className="bg-[#181a26] border border-white/10 p-3 rounded-2xl flex items-center gap-3 shrink-0 hover:animate-glow-pulse transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white font-mono">{MOCK_DEVELOPERS.length} Active Profiles</div>
            <div className="text-[10px] text-slate-400">Verified Proof Submissions</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Bento Tile */}
      <div className="bg-[#11131c] border border-white/10 p-4 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 hover:animate-glow-pulse transition-all duration-300">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search name, handle, or college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#181a26] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 font-mono"
          />
        </div>

        {/* Track Filter & Sort Selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 bg-[#181a26] border border-white/10 p-1 rounded-2xl">
            <button
              onClick={() => setSelectedTrack('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedTrack === 'ALL'
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Tracks
            </button>
            {TRACKS.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTrack(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedTrack === t.id
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.title.split(' ')[0]}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#181a26] border border-white/10 text-slate-300 text-xs rounded-2xl px-3 py-2 font-mono focus:outline-none shrink-0"
          >
            <option value="rank">Sort by Rank</option>
            <option value="streak">Sort by Streak</option>
            <option value="completion">Sort by Completion %</option>
          </select>
        </div>
      </div>

      {/* Developer Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDevs.map((dev) => (
          <div
            key={dev.id}
            className="bg-[#11131c] border border-white/10 rounded-3xl p-5 shadow-xl hover:border-orange-500/40 hover:animate-glow-pulse transition-all duration-300 flex flex-col justify-between space-y-4 group"
          >
            <div>
              {/* Dev Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={dev.avatar}
                    alt={dev.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-white/10 group-hover:border-orange-500/50 transition-colors"
                  />
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-orange-400 transition-colors">
                      {dev.name}
                    </h3>
                    <div className="text-[11px] text-slate-400 font-mono">@{dev.username}</div>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold bg-[#181a26] text-amber-400 px-2.5 py-1 rounded-xl border border-white/10">
                  #{dev.rank}
                </span>
              </div>

              {/* Dev Bio & College */}
              <div className="text-xs text-slate-300 space-y-1 mb-3">
                <p className="font-medium text-slate-200">{dev.college}</p>
                <p className="text-[11px] text-slate-400">{dev.trackName}</p>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 bg-[#171a28] p-2.5 rounded-2xl border border-white/5 text-center font-mono">
                <div>
                  <div className="text-[10px] text-slate-400">STREAK</div>
                  <div className="text-xs font-bold text-orange-400 flex items-center justify-center gap-0.5">
                    <Flame className="w-3 h-3 fill-orange-400" />
                    {dev.streak}d
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">DONE</div>
                  <div className="text-xs font-bold text-emerald-400">{dev.completedDays}/60</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">SCORE</div>
                  <div className="text-xs font-bold text-amber-400">{dev.score}</div>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {dev.skills.slice(0, 4).map((skill, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-[#181a26] text-slate-300 px-2 py-0.5 rounded-lg border border-white/5 font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <button
              onClick={() => navigate(`/developers/${dev.username}`)}
              className="w-full py-2.5 bg-[#181a26] hover:bg-orange-500 hover:text-white text-slate-200 text-xs font-bold rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2 group-hover:border-orange-500/50"
            >
              <span>View Developer Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {filteredDevs.length === 0 && (
        <div className="bg-[#11131c] border border-white/10 rounded-3xl p-10 text-center text-slate-400 space-y-2">
          <p className="text-sm font-semibold">No developer profiles matched your query.</p>
          <p className="text-xs">Try adjusting your search terms or track filters.</p>
        </div>
      )}
    </div>
  );
};
