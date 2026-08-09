export type TrackId = 'fullstack' | 'genai' | 'mobile' | 'backend';

export interface Track {
  id: TrackId;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  badgeColor: string;
  popularInColleges: string[];
  techStack: string[];
}

export interface ResourceLink {
  title: string;
  url: string;
  type: 'docs' | 'video' | 'repo';
}

export interface ChallengeDay {
  dayNumber: number;
  title: string;
  trackId: TrackId;
  category: string;
  shortSummary: string;
  fullDescription: string;
  deliverables: string[];
  starterCode: string;
  hints: string[];
  estimatedMinutes: number;
  xp: number;
  resources: ResourceLink[];
  linkedInTemplate: string;
}

export type EdgeCaseMode = 'ACTIVE' | 'NO_STREAK_DAY1' | 'MISSED_DAY_RECOVERY' | 'EMPTY_PROFILE';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

export interface StudentProfile {
  name: string;
  avatar: string;
  college: string;
  city: string;
  gradYear: string;
  trackId: TrackId;
  githubHandle: string;
  linkedinUrl: string;
  joinedDate: string;
  currentStreak: number;
  longestStreak: number;
  totalSubmissions: number;
  rank: number;
  totalStudentsInTrack: number;
  xp: number;
  badges: Badge[];
  hasExamFreezeAvailable: boolean;
  isExamFreezeActive: boolean;
}

export interface Submission {
  dayNumber: number;
  githubCommitUrl: string;
  linkedinPostUrl: string;
  submittedAt: string;
  aiReviewNote?: string;
  status: 'verified' | 'pending';
}

export interface Testimonial {
  id: string;
  name: string;
  college: string;
  companyPlaced: string;
  role: string;
  avatar: string;
  quote: string;
  streakCount: number;
  githubUrl: string;
  linkedinUrl: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  college: string;
  avatar: string;
  streak: number;
  xp: number;
  githubHandle: string;
  trackId: TrackId;
}
