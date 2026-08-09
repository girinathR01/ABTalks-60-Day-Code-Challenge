import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRACKS } from '../data/mockData';
import { toPng } from 'html-to-image';
import {
  X,
  Download,
  Linkedin,
  Copy,
  Check,
  Flame,
  Zap,
  Trophy,
  CheckCircle2,
  Calendar,
  Share2,
  Sparkles
} from 'lucide-react';

interface ShareAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareAchievementModal: React.FC<ShareAchievementModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile, submissions } = useApp();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  if (!isOpen) return null;

  const currentTrack = TRACKS.find((t) => t.id === studentProfile.trackId) || TRACKS[0];
  const completedCount = Object.keys(submissions).length || 14;

  const defaultCaption = `🚀 Excited to share my progress on the ABTalks 60 Days of Code Challenge!

🔥 Current Streak: ${studentProfile.currentStreak} Days
⚡ Total XP Earned: ${studentProfile.xp} XP
💻 Track: ${currentTrack.title}
🎓 College: ${studentProfile.college || 'Engineering Student'}
🏆 Completed: ${completedCount}/60 Days

I'm building real-world projects daily and documenting my journey in public. Check out my proof of work on GitHub: https://github.com/${studentProfile.githubHandle}

#60DaysOfCode #ABTalks #BuildInPublic #SoftwareEngineering #DeveloperJourney #CodingStreak`;

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#0a0c14'
      });
      const link = document.createElement('a');
      link.download = `${studentProfile.name.replace(/\s+/g, '_')}_60Days_StreakCard.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(defaultCaption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#0f111a] border border-white/10 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative my-8 text-slate-100">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">Share Achievement on LinkedIn</h2>
            <p className="text-xs text-slate-400">Export your 60-day streak card & proof of work image</p>
          </div>
        </div>

        {/* Exportable Card Container (Card to be rendered as PNG) */}
        <div className="overflow-hidden rounded-2xl border border-white/10 mb-5">
          <div
            ref={cardRef}
            className="p-6 bg-gradient-to-br from-[#0a0c14] via-[#121524] to-[#0d0f1a] text-white relative font-sans space-y-5"
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-600 flex items-center justify-center text-white shadow-md">
                  <Zap className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <div className="text-xs font-black tracking-wider uppercase text-amber-400 font-mono flex items-center gap-1">
                    <span>ABTalks 60 Days of Code</span>
                    <Sparkles className="w-3 h-3 text-amber-300 inline" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Official Student Achievement Card</div>
                </div>
              </div>

              <div className="bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Streak</span>
              </div>
            </div>

            {/* Student Info Bar */}
            <div className="flex items-center gap-4 bg-[#161a29]/80 border border-white/10 p-3.5 rounded-2xl">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className="w-14 h-14 rounded-xl object-cover border-2 border-orange-500/60 shadow-md"
              />
              <div className="space-y-0.5">
                <h3 className="text-base font-extrabold text-white">{studentProfile.name}</h3>
                <p className="text-xs text-slate-300 font-medium">{studentProfile.college || 'Indian Tech Student'}</p>
                <div className="text-[11px] font-mono text-indigo-400 font-bold flex items-center gap-2">
                  <span>{currentTrack.title}</span>
                  <span className="text-slate-500">•</span>
                  <span>@{studentProfile.githubHandle}</span>
                </div>
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-3 gap-2.5 font-mono">
              <div className="bg-[#181c2e] p-3 rounded-2xl border border-orange-500/30 text-center">
                <div className="text-[10px] text-slate-400">STREAK</div>
                <div className="text-lg font-black text-orange-400 flex items-center justify-center gap-1 mt-0.5">
                  <Flame className="w-4 h-4 fill-orange-400" />
                  <span>{studentProfile.currentStreak} Days</span>
                </div>
              </div>

              <div className="bg-[#181c2e] p-3 rounded-2xl border border-indigo-500/30 text-center">
                <div className="text-[10px] text-slate-400">TOTAL XP</div>
                <div className="text-lg font-black text-indigo-300 flex items-center justify-center gap-1 mt-0.5">
                  <Zap className="w-4 h-4 fill-indigo-400 text-indigo-400" />
                  <span>{studentProfile.xp}</span>
                </div>
              </div>

              <div className="bg-[#181c2e] p-3 rounded-2xl border border-amber-500/30 text-center">
                <div className="text-[10px] text-slate-400">TRACK RANK</div>
                <div className="text-lg font-black text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>#18</span>
                </div>
              </div>
            </div>

            {/* 60-Day Contribution Heatmap Grid Preview */}
            <div className="bg-[#121524] p-3.5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" />
                  60-Day Contribution Heatmap
                </span>
                <span className="text-emerald-400 font-bold">{completedCount} / 60 Completed</span>
              </div>

              <div className="grid grid-cols-10 gap-1.5 pt-1">
                {Array.from({ length: 60 }, (_, i) => i + 1).map((d) => {
                  const isDone = d <= completedCount;
                  return (
                    <div
                      key={d}
                      className={`h-4 rounded-md flex items-center justify-center text-[8px] font-mono font-bold ${
                        isDone
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : d === completedCount + 1
                          ? 'bg-orange-500/30 border border-orange-500 text-orange-300'
                          : 'bg-[#1a1d2e] text-slate-600'
                      }`}
                    >
                      {d}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card Footer Watermark */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-white/10">
              <span>abtalks.dev/60-days-of-code</span>
              <span className="text-orange-400 font-semibold">#ABTalks60Days #BuildInPublic</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <button
              onClick={handleDownloadImage}
              disabled={isExporting}
              className="w-full sm:w-1/2 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Generating Image...' : 'Download Image (PNG)'}</span>
            </button>

            <button
              onClick={handleCopyCaption}
              className="w-full sm:w-1/2 py-3 px-4 bg-[#1a1d2e] hover:bg-[#23273e] text-slate-200 border border-white/10 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-colors"
            >
              {copiedCaption ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
              <span>{copiedCaption ? 'Post Text Copied!' : 'Copy LinkedIn Caption'}</span>
            </button>
          </div>

          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors"
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>Open LinkedIn Feed to Post Image & Caption</span>
          </a>
        </div>
      </div>
    </div>
  );
};
