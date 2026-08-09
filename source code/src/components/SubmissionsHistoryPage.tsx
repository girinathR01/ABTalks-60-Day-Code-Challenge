import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CHALLENGE_DAYS } from '../data/mockData';
import { CheckCircle2, AlertTriangle, Github, Linkedin, ExternalLink, Calendar, Filter, Sparkles, Clock } from 'lucide-react';

export const SubmissionsHistoryPage: React.FC = () => {
  const { submissions, navigate } = useApp();
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'VERIFIED' | 'PARTIAL' | 'MISSING'>('ALL');

  // Build complete 60-day list status
  const allDaysList = Array.from({ length: 60 }, (_, i) => {
    const dayNum = i + 1;
    const sub = submissions[dayNum];
    const isVerified = sub && sub.githubCommitUrl && sub.linkedinPostUrl;
    const isPartial = sub && (sub.githubCommitUrl || sub.linkedinPostUrl) && !isVerified;
    const isMissing = !sub;

    return {
      dayNum,
      challenge: CHALLENGE_DAYS[dayNum],
      submission: sub,
      isVerified,
      isPartial,
      isMissing,
    };
  });

  const filteredDays = allDaysList.filter((item) => {
    if (filterStatus === 'VERIFIED') return item.isVerified;
    if (filterStatus === 'PARTIAL') return item.isPartial;
    if (filterStatus === 'MISSING') return item.isMissing && item.dayNum <= 14; // evaluated up to current day
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#12141d] via-[#171a28] to-[#12141d] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:animate-glow-pulse transition-all duration-300">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 px-3 py-0.5 rounded-full border border-emerald-500/30">
              PROOF OF WORK LOG
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Daily Submission & Audit History
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Track all submitted GitHub commits, LinkedIn proof posts, automated AI mentor reviews, and submission timestamps.
          </p>
        </div>

        {/* Quick Filter Selector */}
        <div className="flex items-center gap-1.5 bg-[#181a26] border border-white/10 p-1 rounded-2xl shrink-0">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              filterStatus === 'ALL'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('VERIFIED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              filterStatus === 'VERIFIED'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Verified
          </button>
          <button
            onClick={() => setFilterStatus('PARTIAL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              filterStatus === 'PARTIAL'
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Partial
          </button>
          <button
            onClick={() => setFilterStatus('MISSING')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              filterStatus === 'MISSING'
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Missing
          </button>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-3">
        {filteredDays.map(({ dayNum, challenge, submission, isVerified, isPartial, isMissing }) => (
          <div
            key={dayNum}
            className={`bg-[#11131c] border rounded-3xl p-5 shadow-xl hover:animate-glow-pulse transition-all duration-300 space-y-3 ${
              isVerified
                ? 'border-emerald-500/30'
                : isPartial
                ? 'border-orange-500/30'
                : 'border-white/5 opacity-70'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={`w-9 h-9 rounded-2xl font-mono font-bold flex items-center justify-center shrink-0 text-xs ${
                    isVerified
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : isPartial
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                      : 'bg-[#181a26] text-slate-500 border border-white/5'
                  }`}
                >
                  #{dayNum}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <h3
                      onClick={() => navigate(`/day/${dayNum}`)}
                      className="font-bold text-white text-sm hover:text-orange-400 cursor-pointer transition-colors"
                    >
                      {challenge ? challenge.title : `Day ${dayNum} Challenge`}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {challenge ? challenge.category : 'Development Task'}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 shrink-0">
                {isVerified ? (
                  <span className="flex items-center gap-1.5 bg-emerald-500/15 text-emerald-400 text-xs font-mono font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>VERIFIED COMPLETE</span>
                  </span>
                ) : isPartial ? (
                  <span className="flex items-center gap-1.5 bg-orange-500/15 text-orange-400 text-xs font-mono font-bold px-3 py-1 rounded-full border border-orange-500/30">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>PARTIAL PROOF</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 bg-[#181a26] text-slate-500 text-xs font-mono font-bold px-3 py-1 rounded-full border border-white/10">
                    <span>PENDING SUBMISSION</span>
                  </span>
                )}

                <button
                  onClick={() => navigate(`/day/${dayNum}`)}
                  className="px-3 py-1.5 bg-[#181a26] hover:bg-[#202333] text-slate-200 text-xs font-bold rounded-xl border border-white/10 transition-colors"
                >
                  Open Task
                </button>
              </div>
            </div>

            {/* Proof links & AI review note if available */}
            {submission && (
              <div className="pt-3 border-t border-white/5 space-y-2 text-xs">
                <div className="flex flex-wrap items-center gap-4 text-slate-300">
                  {submission.githubCommitUrl && (
                    <a
                      href={submission.githubCommitUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 font-mono text-indigo-300 hover:underline"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub Commit</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  )}

                  {submission.linkedinPostUrl && (
                    <a
                      href={submission.linkedinPostUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 font-mono text-blue-400 hover:underline"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn Post</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  )}

                  <span className="text-[10px] text-slate-500 font-mono ml-auto">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </span>
                </div>

                {submission.aiReviewNote && (
                  <div className="bg-[#171a28] p-3 rounded-2xl border border-white/5 text-[11px] text-indigo-200 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                    <span>{submission.aiReviewNote}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
