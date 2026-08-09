import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TrackId, EdgeCaseMode, StudentProfile, Submission } from '../types';
import { STUDENT_PRESETS, TRACKS } from '../data/mockData';

interface AppContextType {
  currentPath: string;
  navigate: (path: string) => void;
  edgeCaseMode: EdgeCaseMode;
  setEdgeCaseMode: (mode: EdgeCaseMode) => void;
  themeMode: 'dark' | 'light' | 'night-shield';
  setThemeMode: (theme: 'dark' | 'light' | 'night-shield') => void;
  activeTrackId: TrackId;
  setActiveTrackId: (trackId: TrackId) => void;
  studentProfile: StudentProfile;
  setStudentProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  submissions: Record<number, Submission>;
  submitProof: (dayNumber: number, githubUrl: string, linkedinUrl: string, aiNote?: string) => void;
  applyExamFreeze: () => void;
  completeCatchUp: () => void;
  updateProfile: (data: Partial<StudentProfile>) => void;
  isLoggedIn: boolean;
  login: (profile?: StudentProfile) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Sync pathname with browser location
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [edgeCaseMode, setEdgeCaseModeState] = useState<EdgeCaseMode>('ACTIVE');
  const [themeMode, setThemeMode] = useState<'dark' | 'light' | 'night-shield'>('dark');
  const [activeTrackId, setActiveTrackId] = useState<TrackId>('fullstack');
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(STUDENT_PRESETS.ACTIVE);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const login = (profile?: StudentProfile) => {
    if (profile) {
      setStudentProfile(profile);
      setActiveTrackId(profile.trackId);
    }
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  // Default initial submissions
  const [submissions, setSubmissions] = useState<Record<number, Submission>>(() => {
    const initial: Record<number, Submission> = {};
    for (let i = 1; i <= 14; i++) {
      initial[i] = {
        dayNumber: i,
        githubCommitUrl: `https://github.com/aaravsharma-dev/60-days-of-code/commit/day-${i}`,
        linkedinPostUrl: `https://linkedin.com/posts/aaravsharma-day-${i}`,
        submittedAt: new Date(Date.now() - (15 - i) * 86400000).toISOString(),
        status: 'verified',
        aiReviewNote: `Day ${i} verified! Excellent commit message and proof of work.`
      };
    }
    return initial;
  });

  // Handle browser popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL and state on navigate
  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Change edge case mode
  const setEdgeCaseMode = (mode: EdgeCaseMode) => {
    setEdgeCaseModeState(mode);
    const preset = STUDENT_PRESETS[mode];
    if (preset) {
      setStudentProfile(preset);
      setActiveTrackId(preset.trackId);
    }
  };

  // Submit proof for a day
  const submitProof = (dayNumber: number, githubUrl: string, linkedinUrl: string, aiNote?: string) => {
    const newSubmission: Submission = {
      dayNumber,
      githubCommitUrl: githubUrl,
      linkedinPostUrl: linkedinUrl,
      submittedAt: new Date().toISOString(),
      status: 'verified',
      aiReviewNote: aiNote || `Day ${dayNumber} submission verified by ABTalks AI!`
    };

    setSubmissions((prev) => ({ ...prev, [dayNumber]: newSubmission }));

    // Increment streak & stats in profile
    setStudentProfile((prev) => {
      const isNew = !prev.badges.some((b) => b.id === `day-${dayNumber}`);
      const newStreak = prev.currentStreak + 1;
      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        totalSubmissions: prev.totalSubmissions + 1,
        xp: prev.xp + 100
      };
    });
  };

  // Exam Grace Pass application
  const applyExamFreeze = () => {
    setStudentProfile((prev) => ({
      ...prev,
      currentStreak: prev.longestStreak > 0 ? prev.longestStreak : 1,
      isExamFreezeActive: true,
      hasExamFreezeAvailable: false
    }));
    setEdgeCaseModeState('ACTIVE');
  };

  // Express Catch-up challenge completion
  const completeCatchUp = () => {
    setStudentProfile((prev) => ({
      ...prev,
      currentStreak: Math.max(prev.longestStreak, 13),
      xp: prev.xp + 150
    }));
    setEdgeCaseModeState('ACTIVE');
  };

  const updateProfile = (data: Partial<StudentProfile>) => {
    setStudentProfile((prev) => ({ ...prev, ...data }));
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        edgeCaseMode,
        setEdgeCaseMode,
        themeMode,
        setThemeMode,
        activeTrackId,
        setActiveTrackId,
        studentProfile,
        setStudentProfile,
        submissions,
        submitProof,
        applyExamFreeze,
        completeCatchUp,
        updateProfile,
        isLoggedIn,
        login,
        logout
      }}
    >
      <div
        className={`min-h-screen font-sans transition-colors duration-200 ${
          themeMode === 'dark'
            ? 'bg-[#0B0F17] text-slate-100'
            : themeMode === 'night-shield'
            ? 'bg-[#0d131a] text-amber-100/90 [filter:sepia(0.12)_saturate(0.9)]'
            : 'bg-slate-50 text-slate-900'
        }`}
      >
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
