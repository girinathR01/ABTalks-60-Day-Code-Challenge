import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_DEVELOPERS, TRACKS } from '../data/mockData';
import { ShareAchievementModal } from './ShareAchievementModal';
import { LoginModal } from './LoginModal';
import {
  Flame,
  Trophy,
  Github,
  Linkedin,
  Share2,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Zap,
  BookOpen,
  Award,
  ExternalLink,
  Code,
  LogOut,
  LogIn,
  Download
} from 'lucide-react';

interface DeveloperProfileProps {
  usernameParam?: string;
}

export const DeveloperProfile: React.FC<DeveloperProfileProps> = ({ usernameParam }) => {
  const { studentProfile, submissions, navigate, isLoggedIn, logout } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Find matching dev profile or default to logged-in student profile
  const matchedDev = usernameParam
    ? MOCK_DEVELOPERS.find((d) => d.username === usernameParam || d.githubHandle === usernameParam)
    : null;

  const name = matchedDev ? matchedDev.name : studentProfile.name;
  const username = matchedDev ? matchedDev.username : studentProfile.githubHandle || 'developer';
  const college = matchedDev ? matchedDev.college : studentProfile.college || 'Engineering College';
  const avatar = matchedDev ? matchedDev.avatar : studentProfile.avatar;
  const streak = matchedDev ? matchedDev.streak : studentProfile.currentStreak;
  const rank = matchedDev ? matchedDev.rank : studentProfile.rank || 18;
  const trackId = matchedDev ? matchedDev.trackId : studentProfile.trackId;
  const githubHandle = matchedDev ? matchedDev.githubHandle : studentProfile.githubHandle;
  const linkedinUrl = matchedDev ? matchedDev.linkedinUrl : studentProfile.linkedinUrl;
  const score = matchedDev ? matchedDev.score : 520;

  const currentTrack = TRACKS.find((t) => t.id === trackId) || TRACKS[0];

  const handleCopyProfile = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-[#12141d] via-[#161a28] to-[#12141d] border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={avatar}
                alt={name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-orange-500/60 shadow-lg"
              />
              {streak > 0 && (
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white p-1.5 rounded-full shadow-md">
                  <Flame className="w-4 h-4 fill-white" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-black text-white">{name}</h1>
                <span className="text-xs bg-orange-500/15 text-orange-400 font-mono px-2.5 py-0.5 rounded-lg border border-orange-500/30 font-bold">
                  @{username}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{college}</p>
              <div className="text-[11px] text-indigo-400 font-semibold font-mono">
                {currentTrack.title}
              </div>
            </div>
          </div>

          {/* Social Links, Share Achievement & Auth Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Share Achievement Card Button */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white text-xs font-black rounded-xl shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Share Achievement</span>
            </button>

            {githubHandle && (
              <a
                href={`https://github.com/${githubHandle}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-[#181a26] hover:bg-[#202333] text-slate-200 text-xs font-semibold rounded-xl border border-white/10 transition-colors flex items-center gap-1.5"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>GitHub</span>
              </a>
            )}

            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold rounded-xl border border-blue-500/30 transition-colors flex items-center gap-1.5"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            )}

            <button
              onClick={handleCopyProfile}
              className="px-3.5 py-2 bg-[#181a26] hover:bg-[#202333] text-slate-200 text-xs font-semibold rounded-xl border border-white/10 transition-colors flex items-center gap-1.5"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-slate-300" />}
              <span>{copiedLink ? 'Copied' : 'Share Link'}</span>
            </button>

            {/* Log Out / Log In Option */}
            {!usernameParam && (
              isLoggedIn ? (
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to log out of your student account?')) {
                      logout();
                    }
                  }}
                  className="px-3.5 py-2 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                  title="Log out of student account"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Log Out</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-transform hover:scale-105"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Log In</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10 font-mono">
          <div className="bg-[#171a28] p-3 rounded-2xl border border-white/5">
            <div className="text-[10px] text-slate-400">STREAK</div>
            <div className="text-lg font-bold text-orange-400 flex items-center gap-1">
              <Flame className="w-4 h-4 fill-orange-400" />
              {streak} Days
            </div>
          </div>

          <div className="bg-[#171a28] p-3 rounded-2xl border border-white/5">
            <div className="text-[10px] text-slate-400">TRACK RANK</div>
            <div className="text-lg font-bold text-indigo-300">#{rank}</div>
          </div>

          <div className="bg-[#171a28] p-3 rounded-2xl border border-white/5">
            <div className="text-[10px] text-slate-400">ABTALKS SCORE</div>
            <div className="text-lg font-bold text-amber-400">{score}</div>
          </div>

          <div className="bg-[#171a28] p-3 rounded-2xl border border-white/5">
            <div className="text-[10px] text-slate-400">TRACK STATUS</div>
            <div className="text-lg font-bold text-emerald-400">Active</div>
          </div>
        </div>
      </div>

      {/* 60-Day Contribution Activity Grid */}
      <section className="bg-[#11131c] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-400" />
            <span>60-Day Challenge Activity Grid</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">14 / 60 Completed</span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2">
          {Array.from({ length: 60 }, (_, i) => i + 1).map((dayNum) => {
            const isCompleted = dayNum <= 14; // sample logic

            return (
              <div
                key={dayNum}
                onClick={() => navigate(`/day/${dayNum}`)}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                  isCompleted
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-[#181a26] border-white/5 text-slate-600'
                }`}
              >
                <span className="text-xs font-mono font-bold">{dayNum}</span>
                <span className="text-[8px] font-mono">{isCompleted ? '✓' : '○'}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech Stack & Skills */}
      <section className="bg-[#11131c] border border-white/10 rounded-3xl p-6 shadow-xl space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Code className="w-4 h-4 text-indigo-400" />
          <span>Tech Stack & Core Skills</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {currentTrack.techStack.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-[#181a26] border border-white/10 text-xs text-slate-200 font-mono font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* 60-Day Challenge History List */}
      <section className="bg-[#11131c] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Challenge History Log</span>
        </h2>

        <div className="space-y-2">
          {Array.from({ length: 14 }, (_, i) => 14 - i).map((dayNum) => (
            <div
              key={dayNum}
              onClick={() => navigate(`/day/${dayNum}`)}
              className="p-3 rounded-2xl bg-[#171a28] border border-white/5 flex items-center justify-between text-xs cursor-pointer hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0">
                  #{dayNum}
                </span>
                <div>
                  <div className="font-bold text-white">Day {dayNum} Challenge Submission</div>
                  <div className="text-[10px] text-slate-400 font-mono">GitHub Commit + LinkedIn Writeup Verified</div>
                </div>
              </div>

              <span className="text-emerald-400 font-mono font-bold text-[11px] bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                +100 XP Verified
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Share Achievement Export Modal */}
      <ShareAchievementModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};
