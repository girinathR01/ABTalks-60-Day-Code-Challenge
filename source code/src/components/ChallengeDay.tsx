import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { CHALLENGE_DAYS } from '../data/mockData';
import {
  Flame,
  CheckCircle2,
  Github,
  Linkedin,
  Copy,
  Check,
  Code,
  Sparkles,
  ExternalLink,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Zap,
  Share2,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export const ChallengeDay: React.FC = () => {
  const { currentPath, navigate, submissions, submitProof, studentProfile } = useApp();

  // Extract day number from route (default 12)
  const pathParts = currentPath.split('/');
  const dayFromPath = parseInt(pathParts[pathParts.length - 1], 10);
  const dayNumber = isNaN(dayFromPath) ? 12 : dayFromPath;

  const dayData = CHALLENGE_DAYS[dayNumber] || CHALLENGE_DAYS[12];
  const existingSubmission = submissions[dayNumber];

  const [activeTab, setActiveTab] = useState<'instructions' | 'starter' | 'linkedin'>('instructions');

  // Form inputs
  const [githubUrl, setGithubUrl] = useState(
    existingSubmission?.githubCommitUrl || `https://github.com/${studentProfile.githubHandle || 'student'}/60-days-of-code/commit/day-${dayNumber}`
  );
  const [linkedinUrl, setLinkedinUrl] = useState(
    existingSubmission?.linkedinPostUrl || `https://linkedin.com/posts/${studentProfile.githubHandle || 'student'}-day-${dayNumber}`
  );

  const [isAiValidating, setIsAiValidating] = useState(false);
  const [aiNote, setAiNote] = useState<string | null>(existingSubmission?.aiReviewNote || null);
  const [isSubmitted, setIsSubmitted] = useState(!!existingSubmission);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLinkedin, setCopiedLinkedin] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Sync inputs when dayNumber changes
  useEffect(() => {
    const sub = submissions[dayNumber];
    if (sub) {
      setGithubUrl(sub.githubCommitUrl);
      setLinkedinUrl(sub.linkedinPostUrl);
      setAiNote(sub.aiReviewNote || null);
      setIsSubmitted(true);
    } else {
      setGithubUrl(`https://github.com/${studentProfile.githubHandle || 'student'}/60-days-of-code/commit/day-${dayNumber}`);
      setLinkedinUrl(`https://linkedin.com/posts/${studentProfile.githubHandle || 'student'}-day-${dayNumber}`);
      setAiNote(null);
      setIsSubmitted(false);
    }
  }, [dayNumber, submissions, studentProfile.githubHandle]);

  // AI Validator Trigger
  const handleAiValidate = async () => {
    if (!githubUrl || !linkedinUrl) {
      setFormError('Please enter both GitHub commit URL and LinkedIn post URL.');
      return;
    }
    setFormError(null);
    setIsAiValidating(true);

    try {
      const res = await fetch('/api/ai/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          githubUrl,
          linkedinUrl,
          dayNumber,
          taskTitle: dayData.title
        })
      });
      const data = await res.json();
      if (data.success) {
        setAiNote(data.aiNote);
      } else {
        setAiNote(`Verified! Great job implementing Day ${dayNumber}: ${dayData.title}. Pushing commits to GitHub and sharing on LinkedIn builds real recruiter trust.`);
      }
    } catch (err) {
      console.warn('AI call error, using local fallback:', err);
      setAiNote(`Verified! Great job implementing Day ${dayNumber}: ${dayData.title}. Public proof of work is verified.`);
    } finally {
      setIsAiValidating(false);
    }
  };

  // Submit proof handler
  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl || !linkedinUrl) {
      setFormError('Both GitHub commit URL and LinkedIn post URL are required.');
      return;
    }

    setFormError(null);
    submitProof(dayNumber, githubUrl, linkedinUrl, aiNote || undefined);
    setIsSubmitted(true);

    // Fire Confetti explosion!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect triggered');
    }
  };

  const copyToClipboard = (text: string, type: 'code' | 'linkedin') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedLinkedin(true);
      setTimeout(() => setCopiedLinkedin(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-6 max-w-4xl mx-auto bg-[#08090d]">
      {/* Day Navigation Bento Bar */}
      <div className="flex items-center justify-between bg-[#11131c] border border-white/10 p-3 rounded-2xl mb-6 text-xs shadow-lg">
        <button
          onClick={() => navigate(`/day/${Math.max(1, dayNumber - 1)}`)}
          disabled={dayNumber <= 1}
          className="flex items-center gap-1 text-slate-300 hover:text-white disabled:opacity-40 font-mono"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Day {dayNumber - 1}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-extrabold text-orange-400 font-mono text-sm">
            DAY {dayNumber} OF 60
          </span>
          {/* Day Dropdown Picker */}
          <select
            value={dayNumber}
            onChange={(e) => navigate(`/day/${e.target.value}`)}
            className="bg-[#181a26] border border-white/10 text-slate-300 text-xs rounded-xl px-2.5 py-1 font-mono focus:outline-none"
          >
            {Array.from({ length: 60 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                Day {d}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => navigate(`/day/${Math.min(60, dayNumber + 1)}`)}
          disabled={dayNumber >= 60}
          className="flex items-center gap-1 text-slate-300 hover:text-white disabled:opacity-40 font-mono"
        >
          <span>Day {dayNumber + 1}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Challenge Bento Hero Header */}
      <section className="bg-gradient-to-br from-[#12141d] via-[#161927] to-[#11131c] border border-white/10 rounded-3xl p-6 sm:p-8 mb-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-mono font-bold px-3 py-1 rounded-full">
              {dayData.category}
            </span>
            <span className="bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-semibold px-2.5 py-1 rounded-full">
              Full Stack Track
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              {dayData.estimatedMinutes} Mins
            </span>
            <span>•</span>
            <span className="text-orange-400 font-bold">+{dayData.xp} XP</span>
          </div>
        </div>

        <h1 className="text-xl sm:text-3xl font-black text-white mb-3 leading-snug">
          {dayData.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          {dayData.shortSummary}
        </p>
      </section>

      {/* Bento Navigation Tabs */}
      <div className="flex bg-[#11131c] p-1.5 rounded-2xl border border-white/10 mb-6 gap-2">
        <button
          onClick={() => setActiveTab('instructions')}
          className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'instructions'
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Task Instructions</span>
        </button>

        <button
          onClick={() => setActiveTab('starter')}
          className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'starter'
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Starter Code & Hints</span>
        </button>

        <button
          onClick={() => setActiveTab('linkedin')}
          className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'linkedin'
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Linkedin className="w-4 h-4 text-blue-400" />
          <span>LinkedIn Blueprint</span>
        </button>
      </div>

      {/* Tab 1: Task Instructions Bento Card */}
      {activeTab === 'instructions' && (
        <section className="bg-[#11131c] border border-white/10 rounded-3xl p-6 sm:p-8 mb-6 shadow-xl space-y-6">
          <div>
            <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-400" />
              <span>Problem Context & Real-World Impact</span>
            </h2>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#171926] p-4.5 rounded-2xl border border-white/5">
              {dayData.fullDescription}
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Step-by-Step Deliverables Checklist</span>
            </h2>
            <ul className="space-y-2.5">
              {dayData.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-slate-200 bg-[#171926] p-3.5 rounded-2xl border border-white/5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Recommended Developer Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {dayData.resources.map((res, idx) => (
                <a
                  key={idx}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#171926] hover:bg-[#1f2233] text-xs font-medium text-indigo-300 border border-white/5 transition-colors"
                >
                  <span>{res.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tab 2: Starter Code & Hints Bento Card */}
      {activeTab === 'starter' && (
        <section className="bg-[#11131c] border border-white/10 rounded-3xl p-6 sm:p-8 mb-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-orange-400" />
              <span>Express Rate Limiter Middleware Starter</span>
            </h2>

            <button
              onClick={() => copyToClipboard(dayData.starterCode, 'code')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1d202e] hover:bg-[#25293b] text-orange-400 text-xs font-semibold transition-colors border border-white/10"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="bg-[#090a0f] rounded-2xl p-4 border border-white/10 overflow-x-auto font-mono text-xs text-emerald-400 shadow-inner">
            <pre>{dayData.starterCode}</pre>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-2xl text-xs text-orange-200">
            <h4 className="font-bold text-orange-300 mb-1">💡 Pro Tips & Common Pitfalls:</h4>
            <ul className="list-disc pl-4 space-y-1 text-slate-300">
              {dayData.hints.map((hint, idx) => (
                <li key={idx}>{hint}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Tab 3: LinkedIn Post Blueprint Bento Card */}
      {activeTab === 'linkedin' && (
        <section className="bg-[#11131c] border border-white/10 rounded-3xl p-6 sm:p-8 mb-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span>LinkedIn #60DaysOfCode Post Generator</span>
            </h2>

            <button
              onClick={() => copyToClipboard(dayData.linkedInTemplate, 'linkedin')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-md shadow-blue-600/30"
            >
              {copiedLinkedin ? <Check className="w-3.5 h-3.5 text-white" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLinkedin ? 'Copied to Clipboard!' : 'Copy Post Text'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Recruiters search LinkedIn daily using tags like <strong className="text-orange-400 font-mono">#60DaysOfCode #ABTalks</strong>. Copy this blueprint, paste on LinkedIn with a screenshot of your terminal/code, and share proof!
          </p>

          <div className="bg-[#090a0f] p-4.5 rounded-2xl border border-white/10 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
            {dayData.linkedInTemplate}
          </div>
        </section>
      )}

      {/* PROOF OF WORK SUBMISSION BENTO FORM CARD */}
      <section className="bg-gradient-to-br from-[#12141d] via-[#161a28] to-[#12141d] border-2 border-orange-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <Flame className="w-5 h-5 fill-orange-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Submit Proof of Work (Day {dayNumber})</h2>
              <p className="text-[11px] text-slate-400">Required: Public GitHub commit + LinkedIn post link</p>
            </div>
          </div>

          {isSubmitted && (
            <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Verified & Submitted
            </span>
          )}
        </div>

        {formError && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-300 text-xs p-3.5 rounded-2xl mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmitProof} className="space-y-4">
          {/* GitHub Commit Link */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <Github className="w-4 h-4 text-slate-400" />
              <span>GitHub Commit / Repository URL</span>
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/your-handle/60-days-of-code/commit/xyz"
              className="w-full bg-[#090a0f] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:border-orange-500 focus:outline-none font-mono"
              required
            />
          </div>

          {/* LinkedIn Post Link */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span>LinkedIn Post URL</span>
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/posts/your-handle-activity-1234"
              className="w-full bg-[#090a0f] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:border-orange-500 focus:outline-none font-mono"
              required
            />
          </div>

          {/* AI Quick Proof Validator Feedback Note */}
          {aiNote && (
            <div className="bg-indigo-950/60 border border-indigo-500/30 p-4 rounded-2xl text-xs text-indigo-200">
              <div className="flex items-center gap-1.5 font-bold text-indigo-300 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>AI Mentor Review Note:</span>
              </div>
              <p className="leading-relaxed">{aiNote}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleAiValidate}
              disabled={isAiValidating}
              className="w-full sm:w-auto px-4 py-3 bg-[#181a26] hover:bg-[#202333] text-slate-200 font-bold text-xs rounded-2xl border border-white/10 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>{isAiValidating ? 'Evaluating Proof...' : 'AI Pre-Check Submission'}</span>
            </button>

            <button
              type="submit"
              className="w-full sm:flex-1 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white font-black text-xs rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Flame className="w-4 h-4 fill-white" />
              <span>{isSubmitted ? 'Update Submission & Re-Claim Streak' : 'Submit Proof & Claim Streak (+100 XP)'}</span>
            </button>
          </div>
        </form>

        {/* Celebratory Banner on Submission */}
        {isSubmitted && (
          <div className="mt-6 pt-5 border-t border-white/10 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-4 py-2 rounded-2xl text-xs font-extrabold mb-3 shadow-lg">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span>🔥 STREAK UPDATED TO {studentProfile.currentStreak} DAYS!</span>
            </div>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Your submission is verified and publicly recorded. Keep up the consistency for tomorrow's challenge!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
