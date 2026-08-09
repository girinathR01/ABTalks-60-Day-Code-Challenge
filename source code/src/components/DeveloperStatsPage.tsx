import React from 'react';
import { useApp } from '../context/AppContext';
import { getDeveloperStats } from '../utils/stats';
import {
  Flame,
  Trophy,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Github,
  Linkedin,
  BarChart2,
  Activity,
  Award,
  Zap,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const DeveloperStatsPage: React.FC = () => {
  const { studentProfile, submissions, navigate } = useApp();
  const stats = getDeveloperStats(studentProfile, submissions);

  // Data for completion pie chart
  const completionPieData = [
    { name: 'Completed', value: stats.completedDays, color: '#f97316' },
    { name: 'Remaining', value: 60 - stats.completedDays, color: '#1f293d' }
  ];

  // Data for GitHub vs LinkedIn comparison
  const proofComparisonData = [
    { category: 'GitHub Commits', count: stats.githubSubmissions, fill: '#6366f1' },
    { category: 'LinkedIn Posts', count: stats.linkedinSubmissions, fill: '#0a66c2' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#12141d] via-[#171a28] to-[#12141d] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:animate-glow-pulse transition-all duration-300">
        <div className="flex items-center gap-4">
          <img
            src={studentProfile.avatar}
            alt={studentProfile.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-500/50 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">{studentProfile.name} Analytics</h1>
              <span className="text-[10px] bg-orange-500/15 text-orange-400 font-mono px-2.5 py-0.5 rounded-lg border border-orange-500/30">
                @{studentProfile.githubHandle || 'developer'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              ABTalks 60-Day Challenge • {studentProfile.college || 'Engineering Student'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/profile')}
            className="px-4 py-2 bg-[#181a26] hover:bg-[#202333] text-white text-xs font-semibold rounded-xl border border-white/10 transition-colors flex items-center gap-2"
          >
            <Zap className="w-3.5 h-3.5 text-orange-400" />
            <span>View Public Profile</span>
          </button>
        </div>
      </div>

      {/* Top Key Metrics Bento Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Metric 1 */}
        <div className="bg-[#11131c] border border-white/10 p-4 rounded-2xl shadow-sm space-y-1 hover:animate-glow-pulse transition-all duration-300">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-white font-mono">
            {stats.completedDays} <span className="text-xs font-sans text-slate-500">/ 60</span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono">{stats.completionPercentage}% Challenge Done</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#11131c] border border-white/10 p-4 rounded-2xl shadow-sm space-y-1 hover:animate-glow-pulse transition-all duration-300">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Current Streak</span>
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          </div>
          <div className="text-xl font-black text-orange-400 font-mono">
            {stats.currentStreak} <span className="text-xs font-sans text-slate-500">Days</span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono">Max: {stats.longestStreak} Days</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#11131c] border border-white/10 p-4 rounded-2xl shadow-sm space-y-1 hover:animate-glow-pulse transition-all duration-300">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>GitHub Commits</span>
            <Github className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-xl font-black text-indigo-300 font-mono">
            {stats.githubSubmissions}
          </div>
          <p className="text-[10px] text-slate-400 font-mono">Verified Proofs</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#11131c] border border-white/10 p-4 rounded-2xl shadow-sm space-y-1 hover:animate-glow-pulse transition-all duration-300">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>LinkedIn Posts</span>
            <Linkedin className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-black text-blue-300 font-mono">
            {stats.linkedinSubmissions}
          </div>
          <p className="text-[10px] text-slate-400 font-mono">Public Writeups</p>
        </div>

        {/* Metric 5 */}
        <div className="bg-[#11131c] border border-white/10 p-4 rounded-2xl shadow-sm space-y-1 hover:animate-glow-pulse transition-all duration-300">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>ABTalks Score</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-black text-amber-400 font-mono">
            {stats.score}
          </div>
          <p className="text-[10px] text-slate-400 font-mono">Rank #{stats.rank}</p>
        </div>

        {/* Metric 6 */}
        <div className="bg-[#11131c] border border-white/10 p-4 rounded-2xl shadow-sm space-y-1 hover:animate-glow-pulse transition-all duration-300">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Consistency</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono">
            {stats.consistencyRate}%
          </div>
          <p className="text-[10px] text-slate-400 font-mono">Active Rate</p>
        </div>
      </div>

      {/* GitHub-style 60-Day Contribution Heatmap Grid */}
      <section className="bg-[#11131c] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 hover:animate-glow-pulse transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>60-Day Contribution Heatmap</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Daily proof submission matrix across the 60-day challenge
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-[#181a26] border border-white/10" /> Empty
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-orange-500/30 border border-orange-500/50" /> Partial
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Complete
            </span>
          </div>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2">
          {Array.from({ length: 60 }, (_, i) => i + 1).map((dayNum) => {
            const sub = submissions[dayNum];
            const isFull = sub && sub.githubCommitUrl && sub.linkedinPostUrl;
            const isPartial = sub && (sub.githubCommitUrl || sub.linkedinPostUrl);

            return (
              <button
                key={dayNum}
                onClick={() => navigate(`/day/${dayNum}`)}
                title={`Day ${dayNum}: ${isFull ? 'Completed (GitHub + LinkedIn)' : isPartial ? 'Partial' : 'Pending'}`}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all hover:scale-105 ${
                  isFull
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : isPartial
                    ? 'bg-orange-500/20 border-orange-500/50 text-orange-300'
                    : 'bg-[#181a26] border-white/5 text-slate-600 hover:border-white/20'
                }`}
              >
                <span className="text-xs font-mono font-bold">{dayNum}</span>
                <span className="text-[8px] opacity-70 font-mono">
                  {isFull ? '✓' : isPartial ? '½' : '○'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Activity Over Time */}
        <div className="bg-[#11131c] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 hover:animate-glow-pulse transition-all duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>Activity & Proof Submissions Over Time</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Daily Trend</span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.activityOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262a3d" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#181a26', borderColor: '#334155', borderRadius: '12px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="commits" stroke="#818cf8" strokeWidth={2} name="GitHub Commits" />
                <Line type="monotone" dataKey="posts" stroke="#38bdf8" strokeWidth={2} name="LinkedIn Posts" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Weekly Activity Breakdown */}
        <div className="bg-[#11131c] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 hover:animate-glow-pulse transition-all duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-orange-400" />
              <span>Weekly Submissions Breakdown</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Weeks 1-8</span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262a3d" />
                <XAxis dataKey="week" stroke="#64748b" fontSize={9} tickFormatter={(v) => v.split(' ')[0] + ' ' + v.split(' ')[1]} />
                <YAxis stroke="#64748b" fontSize={10} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#181a26', borderColor: '#334155', borderRadius: '12px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#f97316" radius={[6, 6, 0, 0]} name="Completed Days" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Completion Donut Chart */}
        <div className="bg-[#11131c] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 hover:animate-glow-pulse transition-all duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Challenge Completion Proportion</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">60 Days Total</span>
          </div>

          <div className="h-56 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {completionPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#181a26', borderColor: '#334155', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-white font-mono">{stats.completionPercentage}%</span>
              <span className="text-[10px] text-slate-400">Completed</span>
            </div>
          </div>
        </div>

        {/* Chart 4: GitHub vs LinkedIn Comparison */}
        <div className="bg-[#11131c] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 hover:animate-glow-pulse transition-all duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Proof-of-Work Comparison</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Code vs Writeup</span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={proofComparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#262a3d" />
                <XAxis type="number" stroke="#64748b" fontSize={10} allowDecimals={false} />
                <YAxis dataKey="category" type="category" stroke="#64748b" fontSize={11} width={110} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#181a26', borderColor: '#334155', borderRadius: '12px' }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {proofComparisonData.map((entry, index) => (
                    <Cell key={`cell-proof-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
