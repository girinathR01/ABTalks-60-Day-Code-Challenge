import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRACKS, TESTIMONIALS, FAQS, CHALLENGE_DAYS } from '../data/mockData';
import {
  Zap,
  Flame,
  Github,
  Linkedin,
  CheckCircle2,
  ArrowRight,
  Code,
  Sparkles,
  Server,
  Smartphone,
  Trophy,
  Users,
  Moon,
  ChevronRight,
  Play
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate, setActiveTrackId } = useApp();
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-blue-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      default:
        return <Code className="w-5 h-5 text-amber-400" />;
    }
  };

  const day12Data = CHALLENGE_DAYS[12];

  return (
    <div className="min-h-screen pb-16 bg-[#08090d]">
      {/* Hero Section */}
      <section className="relative px-4 pt-8 pb-12 overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0e1017] via-[#12141f] to-[#08090d]">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {/* Bento Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161824] border border-orange-500/30 text-orange-300 text-xs font-semibold mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping" />
            <Zap className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span>FOR INDIAN COLLEGE STUDENTS • 100% FREE</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Build 1 Project Every Day.{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
              Maintain Your Streak.
            </span>{' '}
            Get Hired.
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Join <strong className="text-white">14,200+ engineering students</strong> building real applications every night after college. Prove your daily skills publicly on GitHub and LinkedIn.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto mb-10">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white font-extrabold text-sm shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 group transition-all transform hover:-translate-y-0.5"
            >
              <Flame className="w-4 h-4 fill-white" />
              <span>Start 60-Day Challenge Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/day/12')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#141622] hover:bg-[#1a1c2b] text-slate-200 font-semibold text-sm border border-white/10 flex items-center justify-center gap-2 transition-colors"
            >
              <Code className="w-4 h-4 text-indigo-400" />
              <span>Explore Day 12 Task</span>
            </button>
          </div>

          {/* Trust Banner Stats - Bento Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto bg-[#11131c] border border-white/10 p-3.5 rounded-3xl backdrop-blur-md text-center shadow-xl">
            <div className="p-2 bg-[#171926] rounded-2xl border border-white/5">
              <div className="text-lg sm:text-2xl font-black text-orange-400 font-mono">14.2K+</div>
              <div className="text-[11px] text-slate-400 font-medium">Students Enrolled</div>
            </div>
            <div className="p-2 bg-[#171926] rounded-2xl border border-white/5">
              <div className="text-lg sm:text-2xl font-black text-emerald-400 font-mono">420+</div>
              <div className="text-[11px] text-slate-400 font-medium">Indian Colleges</div>
            </div>
            <div className="p-2 bg-[#171926] rounded-2xl border border-white/5">
              <div className="text-lg sm:text-2xl font-black text-indigo-400 font-mono">₹0</div>
              <div className="text-[11px] text-slate-400 font-medium">Free Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiter Trust Logotypes */}
      <section className="py-6 px-4 bg-[#0a0b12] border-b border-white/5 text-center">
        <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold mb-3">
          ABTalks Alumni Hired At Top Tech Companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-80 text-xs font-bold text-slate-300 font-mono">
          <span className="hover:text-orange-400 transition-colors">SWIGGY</span>
          <span>•</span>
          <span className="hover:text-orange-400 transition-colors">RAZORPAY</span>
          <span>•</span>
          <span className="hover:text-orange-400 transition-colors">PHONEPE</span>
          <span>•</span>
          <span className="hover:text-orange-400 transition-colors">CRED</span>
          <span>•</span>
          <span className="hover:text-orange-400 transition-colors">ZERODHA</span>
          <span>•</span>
          <span className="hover:text-orange-400 transition-colors">GOOGLE</span>
        </div>
      </section>

      {/* How It Works - Bento Grid 3 Step Routine */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">
            The Daily Routine
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            How ABTalks Works Every Night
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
            Designed specifically for hostel life after 10 PM. No lectures. Pure building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 Bento Card */}
          <div className="bg-[#11131c] border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-orange-500/40 transition-all shadow-xl">
            <div className="text-5xl font-black text-white/5 absolute right-4 top-3 font-mono group-hover:text-orange-500/10 transition-colors">
              01
            </div>
            <div className="w-11 h-11 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4 font-bold shadow-inner">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">1. Read Today's Prompt</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Log in late at night. Read a structured 45-minute task prompt with starter code and clear API deliverables.
            </p>
          </div>

          {/* Step 2 Bento Card */}
          <div className="bg-[#11131c] border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-indigo-500/40 transition-all shadow-xl">
            <div className="text-5xl font-black text-white/5 absolute right-4 top-3 font-mono group-hover:text-indigo-500/10 transition-colors">
              02
            </div>
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 font-bold shadow-inner">
              <Github className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">2. Push GitHub Commit</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Code the solution on your laptop or mobile editor. Commit and push your code to your public GitHub repo.
            </p>
          </div>

          {/* Step 3 Bento Card */}
          <div className="bg-[#11131c] border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-blue-500/40 transition-all shadow-xl">
            <div className="text-5xl font-black text-white/5 absolute right-4 top-3 font-mono group-hover:text-blue-500/10 transition-colors">
              03
            </div>
            <div className="w-11 h-11 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 font-bold shadow-inner">
              <Linkedin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">3. Post LinkedIn Proof</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Share your daily breakdown on LinkedIn using #60DaysOfCode. Keep your streak alive and build public proof of work.
            </p>
          </div>
        </div>
      </section>

      {/* Track Selector Bento Grid */}
      <section className="py-10 px-4 bg-[#0a0b12] border-y border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">
              Choose Your Specialization
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              4 Industry-Standard Learning Tracks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRACKS.map((track, idx) => {
              const isSelected = selectedTrackIndex === idx;
              return (
                <div
                  key={track.id}
                  onClick={() => {
                    setSelectedTrackIndex(idx);
                    setActiveTrackId(track.id);
                  }}
                  className={`p-6 rounded-3xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#151724] border-orange-500 ring-1 ring-orange-500/50 shadow-xl shadow-orange-500/10'
                      : 'bg-[#11131c] border-white/10 hover:border-white/20 hover:bg-[#141622]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#1d202e] flex items-center justify-center border border-white/5">
                        {getTrackIcon(track.iconName)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-snug">{track.title}</h3>
                        <span className="text-[10px] text-orange-400 font-medium font-mono">{track.tagline}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{track.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {track.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] bg-[#1a1c2a] text-slate-300 px-2.5 py-1 rounded-lg border border-white/10 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Popular at: {track.popularInColleges[0]}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTrackId(track.id);
                        navigate('/dashboard');
                      }}
                      className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1"
                    >
                      <span>Select Track</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teaser Preview Bento Card of Day 12 Challenge */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-[#12141e] via-[#161a29] to-[#11131d] border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold px-3 py-1 rounded-full">
              LIVE CHALLENGE PREVIEW • DAY 12
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>⏱️ 45 Mins</span>
              <span>•</span>
              <span className="text-orange-400 font-bold">+100 XP</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
            {day12Data.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
            {day12Data.shortSummary}
          </p>

          {/* Code snippet preview bento tile */}
          <div className="bg-[#090a0f] rounded-2xl p-4 border border-white/10 font-mono text-[11px] text-emerald-400 overflow-x-auto mb-6 shadow-inner">
            <div className="text-slate-500 text-[10px] mb-1">// Starter Express Middleware Snippet</div>
            <pre>{`app.use('/api/v1', rateLimiter({
  windowMs: 10 * 1000, // 10s sliding window
  max: 5,              // Limit each IP to 5 requests
  statusCode: 429     // Return HTTP 429 Too Many Requests
}));`}</pre>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Includes starter repo, solution checklist, and LinkedIn post blueprint</span>
            </div>

            <button
              onClick={() => navigate('/day/12')}
              className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <span>View Day 12 Complete Prompt</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Alumni Proof Wall / Student Testimonials Bento Grid */}
      <section className="py-10 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
            Real Proof of Work
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            From Tier-3 Colleges to Top Tech
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-[#11131c] border border-white/10 p-6 rounded-3xl flex flex-col justify-between shadow-xl hover:border-white/20 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-2xl object-cover border border-orange-500/40" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-[11px] text-slate-400">{t.college}</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-emerald-400 text-xs font-bold mb-3">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Placed at {t.companyPlaced} ({t.role})</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">"{t.quote}"</p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-orange-400 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  {t.streakCount} Days Streak
                </span>
                <a href={t.linkedinUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white flex items-center gap-1 font-mono">
                  <Linkedin className="w-3 h-3 text-blue-400" />
                  <span>Verified</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* College FAQs Bento Grid */}
      <section className="py-10 px-4 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div key={idx} className="bg-[#11131c] border border-white/10 rounded-2xl overflow-hidden transition-colors">
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-bold text-white"
                >
                  <span>{faq.q}</span>
                  <span className="text-orange-400 text-base font-mono">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-0 text-xs text-slate-300 border-t border-white/5 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action Bento Container */}
      <section className="py-12 px-4 max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Ready to Build Your 60-Day Streak?
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 max-w-md mx-auto mb-6">
            Join thousands of college coders active right now. Free forever.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3.5 bg-[#090a0f] hover:bg-[#12141e] text-orange-400 font-extrabold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 mx-auto transition-all transform hover:scale-105 border border-orange-500/30"
          >
            <Flame className="w-4 h-4 fill-orange-400" />
            <span>Enter Student Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
