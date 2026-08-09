import { StudentProfile, Submission } from '../types';

export interface DeveloperStats {
  username: string;
  name: string;
  trackId: string;
  currentDay: number;
  completedDays: number;
  currentStreak: number;
  longestStreak: number;
  githubSubmissions: number;
  linkedinSubmissions: number;
  completionPercentage: number;
  score: number;
  rank: number;
  totalSubmissions: number;
  consistencyRate: number; // percentage
  activeDaysCount: number;
  missedDaysCount: number;
  weeklyActivity: { week: string; count: number }[];
  activityOverTime: { day: string; commits: number; posts: number }[];
}

export function calculateStreak(submissions: Record<number, Submission>): { currentStreak: number; longestStreak: number } {
  const days = Object.keys(submissions).map(Number).sort((a, b) => a - b);
  if (days.length === 0) return { currentStreak: 0, longestStreak: 0 };

  let current = 0;
  let maxStreak = 0;
  let tempStreak = 0;

  // Calculate streaks based on sequential completed days
  const todayNum = Math.max(...days, 12); // current day anchor

  for (let d = 1; d <= todayNum; d++) {
    if (submissions[d] && (submissions[d].githubCommitUrl || submissions[d].linkedinPostUrl)) {
      tempStreak++;
      if (tempStreak > maxStreak) maxStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  // Calculate current streak ending at latest active day
  for (let d = todayNum; d >= 1; d--) {
    if (submissions[d] && (submissions[d].githubCommitUrl || submissions[d].linkedinPostUrl)) {
      current++;
    } else {
      break;
    }
  }

  return {
    currentStreak: current,
    longestStreak: Math.max(maxStreak, current)
  };
}

export function calculateCompletion(submissions: Record<number, Submission>, totalDays: number = 60): number {
  const count = Object.keys(submissions).filter(key => {
    const s = submissions[Number(key)];
    return s && (s.githubCommitUrl || s.linkedinPostUrl);
  }).length;
  return Math.round((count / totalDays) * 100);
}

export function calculateScore(profile: Partial<StudentProfile>, submissions: Record<number, Submission>): number {
  const completedCount = Object.keys(submissions).length;
  const githubCount = Object.values(submissions).filter(s => !!s.githubCommitUrl).length;
  const linkedinCount = Object.values(submissions).filter(s => !!s.linkedinPostUrl).length;
  const streak = profile.currentStreak || 0;

  // 40% Completion (max 400 pts), 30% Consistency/Streak (max 300 pts), 20% GitHub (max 200 pts), 10% LinkedIn (max 100 pts)
  const completionScore = Math.min(400, Math.round((completedCount / 60) * 400));
  const consistencyScore = Math.min(300, Math.round((streak / 30) * 300));
  const githubScore = Math.min(200, Math.round((githubCount / 60) * 200));
  const linkedinScore = Math.min(100, Math.round((linkedinCount / 60) * 100));

  return completionScore + consistencyScore + githubScore + linkedinScore;
}

export function getWeeklyActivity(submissions: Record<number, Submission>) {
  const weeks = [
    { week: 'Week 1 (Days 1-7)', count: 0 },
    { week: 'Week 2 (Days 8-14)', count: 0 },
    { week: 'Week 3 (Days 15-21)', count: 0 },
    { week: 'Week 4 (Days 22-28)', count: 0 },
    { week: 'Week 5 (Days 29-35)', count: 0 },
    { week: 'Week 6 (Days 36-42)', count: 0 },
    { week: 'Week 7 (Days 43-49)', count: 0 },
    { week: 'Week 8 (Days 50-60)', count: 0 },
  ];

  Object.keys(submissions).forEach(dayStr => {
    const day = Number(dayStr);
    if (day >= 1 && day <= 7) weeks[0].count++;
    else if (day >= 8 && day <= 14) weeks[1].count++;
    else if (day >= 15 && day <= 21) weeks[2].count++;
    else if (day >= 22 && day <= 28) weeks[3].count++;
    else if (day >= 29 && day <= 35) weeks[4].count++;
    else if (day >= 36 && day <= 42) weeks[5].count++;
    else if (day >= 43 && day <= 49) weeks[6].count++;
    else if (day >= 50 && day <= 60) weeks[7].count++;
  });

  return weeks;
}

export function getDeveloperStats(profile: StudentProfile, submissions: Record<number, Submission>): DeveloperStats {
  const completedDays = Object.keys(submissions).length;
  const githubSubmissions = Object.values(submissions).filter(s => !!s.githubCommitUrl).length;
  const linkedinSubmissions = Object.values(submissions).filter(s => !!s.linkedinPostUrl).length;
  const streakInfo = calculateStreak(submissions);
  const completionPercentage = Math.round((completedDays / 60) * 100);
  const score = calculateScore(profile, submissions);

  // Generate day-by-day activity trend for charts
  const activityOverTime = [];
  for (let i = 1; i <= Math.max(completedDays, 14); i++) {
    const sub = submissions[i];
    activityOverTime.push({
      day: `Day ${i}`,
      commits: sub?.githubCommitUrl ? 1 : 0,
      posts: sub?.linkedinPostUrl ? 1 : 0,
    });
  }

  const activeDaysCount = completedDays;
  const missedDaysCount = Math.max(0, 14 - activeDaysCount); // evaluated up to day 14
  const consistencyRate = Math.round((activeDaysCount / 14) * 100);

  return {
    username: profile.githubHandle || 'developer',
    name: profile.name,
    trackId: profile.trackId,
    currentDay: Math.max(completedDays, 12),
    completedDays,
    currentStreak: streakInfo.currentStreak || profile.currentStreak,
    longestStreak: streakInfo.longestStreak || profile.longestStreak,
    githubSubmissions,
    linkedinSubmissions,
    completionPercentage,
    score,
    rank: profile.rank || 18,
    totalSubmissions: completedDays,
    consistencyRate,
    activeDaysCount,
    missedDaysCount,
    weeklyActivity: getWeeklyActivity(submissions),
    activityOverTime,
  };
}
