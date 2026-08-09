import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_DEVELOPERS, TRACKS } from '../data/mockData';
import { Trophy, Flame, Zap, HelpCircle, Info, ChevronRight, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { navigate } = useApp();
  const [selectedTrack, setSelectedTrack] = useState<string>('ALL');
  const [timeframe, setTimeframe] = useState<'ALL_TIME' | 'THIS_WEEK' | 'TODAY'>('ALL_TIME');
  const [showFormula, setShowFormula] = useState(false);

  const filteredDevs = MOCK_DEVELOPERS.filter((dev) => {
    if (selectedTrack === 'ALL') return true;
    return dev.trackId === selectedTrack;
  }).sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#12141d] via-[#171a28] to-[#12141d] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:animate-glow-pulse transition-all duration-300">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold bg-amber-500/15 text-amber-400 px-3 py-0.5 rounded-full border border-amber-500/30">
              ABTALKS OFFICIAL LEADERBOARD
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Top Engineering Students in 60-Day Challenge
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Ranked by overall consistency, GitHub proof of work, LinkedIn learnings, and daily challenge completion.
          </p>
        </div>

        <button
          onClick={() => setShowFormula(!showFormula)}
          className="px-4 py-2.5 bg-[#181a26] hover:bg-[#202333] text-amber-300 text-xs font-bold rounded-2xl border border-white/10 transition-colors flex items-center gap-2 shrink-0 shadow-md"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>How Score is Calculated</span>
        </button>
      </div>

      {/* Transparent Score Formula Breakdown (Expandable Modal / Card) */}
      {showFormula && (
        <div className="bg-[#11131c] border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-4 animate-fade-in hover:animate-glow-pulse transition-all duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2 font-mono">
              <Info className="w-4 h-4 text-amber-400" />
              <span>Transparent ABTalks Score Calculation Formula</span>
            </h3>
            <button
              onClick={() => setShowFormula(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-[#171a28] p-3.5 rounded-2xl border border-white/5 space-y-1 hover:animate-glow-pulse transition-all duration-300">
              <span className="font-mono font-bold text-orange-400">40% Completion</span>
              <p className="text-[11px] text-slate-400">400 Points max for completing all 60 days</p>
            </div>
            <div className="bg-[#171a28] p-3.5 rounded-2xl border border-white/5 space-y-1 hover:animate-glow-pulse transition-all duration-300">
              <span className="font-mono font-bold text-amber-400">30% Consistency</span>
              <p className="text-[11px] text-slate-400">300 Points max for maintaining active daily streaks</p>
            </div>
            <div className="bg-[#171a28] p-3.5 rounded-2xl border border-white/5 space-y-1 hover:animate-glow-pulse transition-all duration-300">
              <span className="font-mono font-bold text-indigo-400">20% GitHub Proof</span>
              <p className="text-[11px] text-slate-400">200 Points max for verified public repository commits</p>
            </div>
            <div className="bg-[#171a28] p-3.5 rounded-2xl border border-white/5 space-y-1 hover:animate-glow-pulse transition-all duration-300">
              <span className="font-mono font-bold text-blue-400">10% LinkedIn Posts</span>
              <p className="text-[11px] text-slate-400">100 Points max for public learning writeups</p>
            </div>
          </div>
        </div>
      )}

      {/* Filter Toolbar Bento Tile */}
      <div className="bg-[#11131c] border border-white/10 p-4 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 hover:animate-glow-pulse transition-all duration-300">
        {/* Track Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedTrack('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedTrack === 'ALL'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
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
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center gap-1 bg-[#181a26] border border-white/10 p-1 rounded-2xl shrink-0">
          <button
            onClick={() => setTimeframe('TODAY')}
            className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
              timeframe === 'TODAY' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeframe('THIS_WEEK')}
            className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
              timeframe === 'THIS_WEEK' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeframe('ALL_TIME')}
            className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
              timeframe === 'ALL_TIME' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Leaderboard Table Bento Card */}
      <div className="bg-[#11131c] border border-white/10 rounded-3xl p-6 shadow-xl overflow-x-auto hover:animate-glow-pulse transition-all duration-300">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-white/10 pb-3">
            <tr>
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Developer</th>
              <th className="py-3 px-4 hidden sm:table-cell">Track</th>
              <th className="py-3 px-4">Progress</th>
              <th className="py-3 px-4">Streak</th>
              <th className="py-3 px-4 text-right">ABTalks Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            {filteredDevs.map((dev, idx) => {
              const actualRank = idx + 1;
              const isTop3 = actualRank <= 3;

              return (
                <tr
                  key={dev.id}
                  onClick={() => navigate(`/developers/${dev.username}`)}
                  className="hover:bg-[#171a28] cursor-pointer transition-colors"
                >
                  {/* Rank */}
                  <td className="py-4 px-4 font-bold text-sm">
                    {actualRank === 1 ? (
                      <span className="text-amber-400 text-base">🥇 #1</span>
                    ) : actualRank === 2 ? (
                      <span className="text-slate-300 text-base">🥈 #2</span>
                    ) : actualRank === 3 ? (
                      <span className="text-amber-600 text-base">🥉 #3</span>
                    ) : (
                      <span className="text-slate-400">#{actualRank}</span>
                    )}
                  </td>

                  {/* Developer */}
                  <td className="py-4 px-4 font-sans">
                    <div className="flex items-center gap-3">
                      <img
                        src={dev.avatar}
                        alt={dev.name}
                        className="w-10 h-10 rounded-xl object-cover border border-white/10"
                      />
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          <span>{dev.name}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">{dev.college}</div>
                      </div>
                    </div>
                  </td>

                  {/* Track */}
                  <td className="py-4 px-4 hidden sm:table-cell text-[11px] text-indigo-300">
                    {dev.trackName.split(' ')[0]}
                  </td>

                  {/* Progress */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-200">{dev.completedDays}/60 Days</div>
                      <div className="w-20 h-1.5 bg-[#08090d] rounded-full overflow-hidden border border-white/10">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: `${dev.completionPercentage}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Streak */}
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-1 font-bold text-orange-400">
                      <Flame className="w-3.5 h-3.5 fill-orange-400" />
                      {dev.streak}d
                    </span>
                  </td>

                  {/* Score */}
                  <td className="py-4 px-4 text-right">
                    <span className="font-bold text-amber-400 text-sm font-mono">{dev.score} XP</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
