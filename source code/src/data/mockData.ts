import { Track, ChallengeDay, StudentProfile, Testimonial, LeaderboardUser, TrackId } from '../types';

export const TRACKS: Track[] = [
  {
    id: 'fullstack',
    title: 'Full Stack Web Development',
    tagline: 'React, Node.js, Express & PostgreSQL',
    description: 'Master production-grade modern web development. Build full-stack SaaS apps, real-time dashboards, authentication, and database schemas.',
    iconName: 'Code',
    badgeColor: 'from-amber-500 to-orange-600',
    popularInColleges: ['RV College Bengaluru', 'VJTI Mumbai', 'IIT Madras', 'CGC Landran'],
    techStack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    id: 'genai',
    title: 'GenAI & AI Agents Engineering',
    tagline: 'LLMs, RAG Pipelines & Vector Search',
    description: 'Build intelligent applications powered by Gemini API, OpenAI, LangChain, Vector DBs (Pinecone/Chroma), RAG, and autonomous agent workflows.',
    iconName: 'Sparkles',
    badgeColor: 'from-purple-500 to-indigo-600',
    popularInColleges: ['BITS Pilani', 'DTU Delhi', 'NIT Trichy', 'VIT Vellore'],
    techStack: ['Gemini API', 'Python / TS', 'Vector DBs', 'RAG Pipelines', 'LangChain', 'FastAPI']
  },
  {
    id: 'backend',
    title: 'Backend Systems & Cloud Infra',
    tagline: 'Distributed Systems, Redis & Microservices',
    description: 'Understand system design, rate limiters, message queues (Kafka/RabbitMQ), Caching, Docker, Kubernetes, and Cloud Run deployments.',
    iconName: 'Server',
    badgeColor: 'from-blue-500 to-cyan-600',
    popularInColleges: ['IIT Bombay', 'IIIT Hyderabad', 'COEP Pune', 'SRM Chennai'],
    techStack: ['Node.js', 'Go / TS', 'Redis', 'Docker', 'PostgreSQL', 'Cloud Run']
  },
  {
    id: 'mobile',
    title: 'Cross-Platform Mobile Dev',
    tagline: 'Flutter & React Native Architecture',
    description: 'Build responsive, fast mobile apps for iOS & Android. Master offline-first storage, native push notifications, state management, and animations.',
    iconName: 'Smartphone',
    badgeColor: 'from-emerald-500 to-teal-600',
    popularInColleges: ['KJSCE Mumbai', 'Thapar Patiala', 'IEM Kolkata', 'BMSCE Bengaluru'],
    techStack: ['React Native / Flutter', 'TypeScript / Dart', 'Firebase', 'Zustand', 'Mobile UI']
  }
];

// Day 12 detailed entry & full 60 day catalog titles
export const CHALLENGE_DAYS: Record<number, ChallengeDay> = {
  1: {
    dayNumber: 1,
    title: 'Developer Portfolio CLI & Git Setup',
    trackId: 'fullstack',
    category: 'Environment & Git',
    shortSummary: 'Set up your professional development environment, create your main 60-day repository, and configure automated commit hooks.',
    fullDescription: `Welcome to Day 1 of the ABTalks 60-Day Challenge! Today is all about laying down a strong foundation. You will create your main GitHub repository where all your 60 days of code will live, set up clean Git branch policies, and build an interactive CLI terminal script that displays your bio, social links, and current 60-day challenge progress.`,
    deliverables: [
      'Create public GitHub repo named `60-days-of-code-abtalks` with a comprehensive README',
      'Build a CLI script (using Node.js or Python) that outputs formatted ASCII art bio & tech stack',
      'Publish your first commit and post your Day 1 commitment on LinkedIn with #60DaysOfCode #ABTalks'
    ],
    starterCode: `// day01-cli.js - Run with: node day01-cli.js
console.log("==========================================");
console.log("⚡ ABTalks 60-Day Code Challenge - Day 1");
console.log("👤 Developer: [Your Name] | College: [Your College]");
console.log("🎯 Track: Full Stack Web Development");
console.log("==========================================");
`,
    hints: [
      'Make sure your GitHub repository is PUBLIC so recruiters and the automated validator can verify it.',
      'Tag @ABTalks in your LinkedIn post so Indian tech recruiters following the hashtag see your submission!'
    ],
    estimatedMinutes: 30,
    xp: 50,
    resources: [
      { title: 'Git Best Practices Guide', url: 'https://docs.github.com/en/get-started', type: 'docs' },
      { title: 'How to Write a Great LinkedIn Post for Developers', url: 'https://linkedin.com', type: 'video' }
    ],
    linkedInTemplate: `Day 1/60 of the #60DaysOfCode Challenge with @ABTalks! 🚀\n\nOfficial commitment made. Building projects every single night for the next 60 days.`
  },

  12: {
    dayNumber: 12,
    title: 'Rate-Limited API Proxy & Redis Sliding Window Cache',
    trackId: 'fullstack',
    category: 'Backend Security & Performance',
    shortSummary: 'Build an express rate-limiting proxy middleware with sliding window algorithm using Redis or in-memory LRU cache to defend endpoints from abuse.',
    fullDescription: `Production APIs face thousands of malicious requests every second. High-growth Indian tech platforms like Swiggy, Zomato, and PhonePe rely heavily on rate limiting to prevent API denial-of-service and protect downstream database servers.

Today on Day 12, you will build a production-ready Express API proxy middleware that intercepts requests, tracks IP request counts using a Sliding Window Counter algorithm in Redis (or in-memory cache), returns standard HTTP \`429 Too Many Requests\` headers with retry-after timestamps when limits are exceeded, and logs request metrics.`,
    deliverables: [
      'Implement Express server with `/api/v1/data` endpoint protected by custom rate-limiter middleware',
      'Set sliding window limit to max 5 requests per 10 seconds per IP address',
      'Return standard headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`',
      'Return HTTP 429 JSON response `{ error: "Rate limit exceeded. Try again in X seconds." }` when throttled',
      'Add test script or curl command log showing rate limiter in action'
    ],
    starterCode: `// rateLimiter.ts - Express Middleware
import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [ip: string]: { count: number; resetTime: number };
}

const store: RateLimitStore = {};
const WINDOW_MS = 10 * 1000; // 10 seconds sliding window
const MAX_REQUESTS = 5;

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.ip || '127.0.0.1';
  const now = Date.now();

  if (!store[clientIp] || now > store[clientIp].resetTime) {
    store[clientIp] = { count: 1, resetTime: now + WINDOW_MS };
  } else {
    store[clientIp].count += 1;
  }

  const remaining = Math.max(0, MAX_REQUESTS - store[clientIp].count);
  const resetInSec = Math.ceil((store[clientIp].resetTime - now) / 1000);

  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS);
  res.setHeader('X-RateLimit-Remaining', remaining);
  res.setHeader('X-RateLimit-Reset', resetInSec);

  if (store[clientIp].count > MAX_REQUESTS) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: \`Rate limit exceeded. Try again in \${resetInSec} seconds.\`,
      retryAfterSeconds: resetInSec,
    });
  }

  next();
};`,
    hints: [
      'Test your rate limiter by calling `curl http://localhost:3000/api/v1/data` 6 times rapidly in terminal.',
      'Check `req.headers["x-forwarded-for"]` to properly extract client IP when deployed behind reverse proxies like Cloud Run or Nginx.'
    ],
    estimatedMinutes: 45,
    xp: 100,
    resources: [
      { title: 'MDN HTTP 429 Too Many Requests Specification', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429', type: 'docs' },
      { title: 'Express Middleware Pattern Guide', url: 'https://expressjs.com/en/guide/using-middleware.html', type: 'docs' },
      { title: 'Understanding Sliding Window Rate Limiting (10 Min Video)', url: 'https://youtube.com', type: 'video' }
    ],
    linkedInTemplate: `Day 12/60 of #60DaysOfCode with @ABTalks! ⚡

Today I built an Express Rate-Limiting Proxy Middleware using a Sliding Window algorithm! 🛡️

Why is this crucial?
When platforms like Swiggy or Razorpay experience flash sales or DDoS spikes, rate limiters protect backend databases from collapsing by enforcing strict IP request quotas.

Key Implementations:
✅ Sliding window counter tracking request timestamps
✅ Custom HTTP headers (X-RateLimit-Remaining, Retry-After)
✅ HTTP 429 Throttle response with dynamic reset calculation

Building real backend infrastructure every night after college! 💻

GitHub Commit: [Your GitHub Link]

#ABTalks #60DaysOfCode #BuildInPublic #BackendEngineering #NodeJS #WebDevelopment`
  }
};

// Generate lightweight entries for Days 2-60 to populate calendar seamlessly
const SAMPLE_TITLES = [
  'DOM Manipulation & Storage', 'REST API Contracts & Axios', 'JWT Authentication & Cookies',
  'PostgreSQL Schema & Migrations', 'Prisma ORM Relations', 'Tailwind Responsive Dashboard',
  'State Management with Zustand', 'Debounced Search & Pagination', 'File Uploads with S3/Multer',
  'Serverless Edge Functions', 'Rate-Limited API Proxy', 'Vector Database & RAG Search',
  'Real-Time WebSockets Chat', 'Redis Queue & Background Workers', 'Dockerizing Node Microservice',
  'OAuth 2.0 Integration', 'Stripe/Razorpay Webhook Handler', 'GraphQL Query & Mutation Schema',
  'Unit Testing with Vitest', 'CI/CD Pipeline with GitHub Actions', 'Gemini AI Audio Summarizer',
  'Infinite Scroll & Virtualization', 'Dark Mode & Theme Engine', 'Custom React Hooks Suite',
  'Role-Based Authorization (RBAC)', 'PDF Generation Server-side', 'Email Notification Queue',
  'Monorepo Architecture setup', 'Client-side Offline IndexedDB', 'System Design: URL Shortener',
  'System Design: Notification Hub', 'Full Stack SaaS MVP Launch'
];

for (let d = 2; d <= 60; d++) {
  if (d === 12) continue;
  const title = SAMPLE_TITLES[(d - 2) % SAMPLE_TITLES.length] + ` (Part ${Math.floor(d / 10) + 1})`;
  CHALLENGE_DAYS[d] = {
    dayNumber: d,
    title,
    trackId: 'fullstack',
    category: d % 2 === 0 ? 'Backend Systems' : 'Frontend Architecture',
    shortSummary: `Day ${d} task: Build and deploy ${title} with full commit proof and public LinkedIn writeup.`,
    fullDescription: `On Day ${d} of your 60-day journey, you are building ${title}. Follow the instructions, commit your code to GitHub, and share your learnings on LinkedIn to maintain your public streak!`,
    deliverables: [
      `Implement ${title} component/service in your repository`,
      'Push commit to GitHub with detailed commit message',
      'Post LinkedIn proof of work with #60DaysOfCode'
    ],
    starterCode: `// Day ${d}: ${title}\nconsole.log("Day ${d} starting...");\n`,
    hints: ['Focus on clean modular code.', 'Keep your LinkedIn summary clear and value-packed!'],
    estimatedMinutes: 40,
    xp: 80,
    resources: [
      { title: `Day ${d} Technical Documentation`, url: 'https://developer.mozilla.org', type: 'docs' }
    ],
    linkedInTemplate: `Day ${d}/60 of #60DaysOfCode with @ABTalks! Building ${title} today. #BuildInPublic #ABTalks`
  };
}

// Student Profile presets for the 4 Edge Cases
export const STUDENT_PRESETS: Record<string, StudentProfile> = {
  ACTIVE: {
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    college: 'RV College of Engineering',
    city: 'Bengaluru, KA',
    gradYear: "CS '26",
    trackId: 'fullstack',
    githubHandle: 'aaravsharma-dev',
    linkedinUrl: 'https://linkedin.com/in/aaravsharma-code',
    joinedDate: '2026-07-24',
    currentStreak: 14,
    longestStreak: 14,
    totalSubmissions: 14,
    rank: 18,
    totalStudentsInTrack: 1420,
    xp: 1250,
    hasExamFreezeAvailable: true,
    isExamFreezeActive: false,
    badges: [
      { id: 'b1', title: '10-Day Torchbearer', description: 'Maintained 10 consecutive daily submissions without missing a day', icon: '🔥', isUnlocked: true, unlockedAt: '2026-08-03' },
      { id: 'b2', title: 'GitHub Committer', description: 'Pushed 10 verified public commits to GitHub', icon: '⚡', isUnlocked: true, unlockedAt: '2026-08-03' },
      { id: 'b3', title: 'LinkedIn Voice', description: 'Shared 10 learning posts with #60DaysOfCode', icon: '💼', isUnlocked: true, unlockedAt: '2026-08-03' },
      { id: 'b4', title: 'Night Owl Coder', description: 'Submitted 5 proofs of work between 10 PM and 1 AM', icon: '🦉', isUnlocked: true, unlockedAt: '2026-08-05' },
      { id: 'b5', title: '30-Day Legend', description: 'Reach halfway point in the 60-day challenge', icon: '🏆', isUnlocked: false }
    ]
  },

  NO_STREAK_DAY1: {
    name: 'Priya Verma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    college: 'VJTI Mumbai',
    city: 'Mumbai, MH',
    gradYear: "IT '27",
    trackId: 'genai',
    githubHandle: 'priyaverma-tech',
    linkedinUrl: 'https://linkedin.com/in/priya-verma-vjti',
    joinedDate: '2026-08-07',
    currentStreak: 0,
    longestStreak: 0,
    totalSubmissions: 0,
    rank: 1280,
    totalStudentsInTrack: 1420,
    xp: 0,
    hasExamFreezeAvailable: true,
    isExamFreezeActive: false,
    badges: [
      { id: 'b1', title: '10-Day Torchbearer', description: 'Maintained 10 consecutive daily submissions', icon: '🔥', isUnlocked: false },
      { id: 'b2', title: 'First Day Rookie', description: 'Complete Day 1 submission', icon: '🌱', isUnlocked: false }
    ]
  },

  MISSED_DAY_RECOVERY: {
    name: 'Rohan Kulkarni',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    college: 'NIT Trichy',
    city: 'Tiruchirappalli, TN',
    gradYear: "ECE '26",
    trackId: 'backend',
    githubHandle: 'rohan-nitt',
    linkedinUrl: 'https://linkedin.com/in/rohankulkarni-tech',
    joinedDate: '2026-07-20',
    currentStreak: 0, // Broken streak from missing yesterday!
    longestStreak: 12,
    totalSubmissions: 12,
    rank: 142,
    totalStudentsInTrack: 980,
    xp: 960,
    hasExamFreezeAvailable: true,
    isExamFreezeActive: false,
    badges: [
      { id: 'b1', title: '10-Day Torchbearer', description: 'Maintained 10 consecutive daily submissions', icon: '🔥', isUnlocked: true, unlockedAt: '2026-07-30' }
    ]
  },

  EMPTY_PROFILE: {
    name: 'New Student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
    college: '',
    city: '',
    gradYear: "2027",
    trackId: 'fullstack',
    githubHandle: '',
    linkedinUrl: '',
    joinedDate: '2026-08-07',
    currentStreak: 0,
    longestStreak: 0,
    totalSubmissions: 0,
    rank: 0,
    totalStudentsInTrack: 1420,
    xp: 0,
    hasExamFreezeAvailable: true,
    isExamFreezeActive: false,
    badges: []
  }
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ananya Deshmukh',
    college: 'COEP Pune',
    companyPlaced: 'Swiggy',
    role: 'SDE-1 (Frontend)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    quote: 'I was from a non-CS branch with zero projects on my resume. Doing 60 days of code with ABTalks forced me to push commits every night. My recruiter literally found my profile through my Day 34 LinkedIn post!',
    streakCount: 60,
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com'
  },
  {
    id: 't2',
    name: 'Kabir Mehta',
    college: 'CGC Landran, Punjab',
    companyPlaced: 'Razorpay',
    role: 'Backend Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    quote: 'Being in a Tier-3 college, companies never visited our campus. ABTalks taught me how to build real backend systems. Pushing GitHub code daily gave me proof of work that spoke louder than any degree.',
    streakCount: 60,
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com'
  },
  {
    id: 't3',
    name: 'Sneha Sundaram',
    college: 'SRM Institute Chennai',
    companyPlaced: 'PhonePe',
    role: 'Product Engineer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    quote: 'The late night hostel coding community is unmatched! Seeing 3,000 other Indian college students active at midnight kept me accountable even during semester exams.',
    streakCount: 60,
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com'
  }
];

export const LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Siddharth Rao', college: 'IIT Madras', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150', streak: 48, xp: 4200, githubHandle: 'siddharth-m', trackId: 'backend' },
  { rank: 2, name: 'Tanvi Nair', college: 'BITS Pilani', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150', streak: 48, xp: 4150, githubHandle: 'tanvi-bits', trackId: 'genai' },
  { rank: 3, name: 'Aditya Raj', college: 'DTU Delhi', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=150', streak: 47, xp: 3980, githubHandle: 'aditya-dtu', trackId: 'fullstack' },
  { rank: 4, name: 'Megha Gupta', college: 'IGDTUW Delhi', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150', streak: 46, xp: 3890, githubHandle: 'megha-code', trackId: 'mobile' },
  { rank: 5, name: 'Vikram Singh', college: 'Thapar Institute', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150', streak: 45, xp: 3810, githubHandle: 'vikram-thapar', trackId: 'fullstack' },
  { rank: 6, name: 'Rohan Sharma', college: 'VJTI Mumbai', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', streak: 42, xp: 3650, githubHandle: 'rohan-sharma', trackId: 'backend' },
  { rank: 7, name: 'Pooja Iyer', college: 'NIT Trichy', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', streak: 40, xp: 3500, githubHandle: 'pooja-nitt', trackId: 'genai' },
  { rank: 8, name: 'Aarav Sharma', college: 'RV College Bengaluru', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250', streak: 14, xp: 1250, githubHandle: 'aaravsharma-dev', trackId: 'fullstack' }
];

export interface DirectoryDeveloper {
  id: string;
  name: string;
  username: string;
  college: string;
  city: string;
  trackId: TrackId;
  trackName: string;
  avatar: string;
  streak: number;
  completedDays: number;
  completionPercentage: number;
  score: number;
  rank: number;
  githubHandle: string;
  linkedinUrl: string;
  skills: string[];
}

export const MOCK_DEVELOPERS: DirectoryDeveloper[] = [
  {
    id: 'dev-1',
    name: 'Siddharth Rao',
    username: 'siddharth-m',
    college: 'IIT Madras',
    city: 'Chennai, TN',
    trackId: 'backend',
    trackName: 'Backend Systems & Cloud Infra',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    streak: 48,
    completedDays: 52,
    completionPercentage: 87,
    score: 940,
    rank: 1,
    githubHandle: 'siddharth-m',
    linkedinUrl: 'https://linkedin.com',
    skills: ['Node.js', 'Go', 'Redis', 'Docker', 'PostgreSQL', 'Cloud Run']
  },
  {
    id: 'dev-2',
    name: 'Tanvi Nair',
    username: 'tanvi-bits',
    college: 'BITS Pilani',
    city: 'Pilani, RJ',
    trackId: 'genai',
    trackName: 'GenAI & AI Agents Engineering',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    streak: 48,
    completedDays: 51,
    completionPercentage: 85,
    score: 925,
    rank: 2,
    githubHandle: 'tanvi-bits',
    linkedinUrl: 'https://linkedin.com',
    skills: ['Gemini API', 'Python', 'Pinecone', 'LangChain', 'RAG']
  },
  {
    id: 'dev-3',
    name: 'Aditya Raj',
    username: 'aditya-dtu',
    college: 'DTU Delhi',
    city: 'New Delhi',
    trackId: 'fullstack',
    trackName: 'Full Stack Web Development',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=250',
    streak: 47,
    completedDays: 49,
    completionPercentage: 82,
    score: 890,
    rank: 3,
    githubHandle: 'aditya-dtu',
    linkedinUrl: 'https://linkedin.com',
    skills: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS']
  },
  {
    id: 'dev-4',
    name: 'Megha Gupta',
    username: 'megha-code',
    college: 'IGDTUW Delhi',
    city: 'New Delhi',
    trackId: 'mobile',
    trackName: 'Cross-Platform Mobile Dev',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=250',
    streak: 46,
    completedDays: 48,
    completionPercentage: 80,
    score: 875,
    rank: 4,
    githubHandle: 'megha-code',
    linkedinUrl: 'https://linkedin.com',
    skills: ['Flutter', 'React Native', 'Firebase', 'Dart', 'Mobile UI']
  },
  {
    id: 'dev-5',
    name: 'Vikram Singh',
    username: 'vikram-thapar',
    college: 'Thapar Institute',
    city: 'Patiala, PB',
    trackId: 'fullstack',
    trackName: 'Full Stack Web Development',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=250',
    streak: 45,
    completedDays: 46,
    completionPercentage: 77,
    score: 850,
    rank: 5,
    githubHandle: 'vikram-thapar',
    linkedinUrl: 'https://linkedin.com',
    skills: ['React', 'Next.js', 'Prisma', 'PostgreSQL', 'Tailwind']
  },
  {
    id: 'dev-6',
    name: 'Aarav Sharma',
    username: 'aaravsharma-dev',
    college: 'RV College of Engineering',
    city: 'Bengaluru, KA',
    trackId: 'fullstack',
    trackName: 'Full Stack Web Development',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    streak: 14,
    completedDays: 14,
    completionPercentage: 23,
    score: 520,
    rank: 18,
    githubHandle: 'aaravsharma-dev',
    linkedinUrl: 'https://linkedin.com/in/aaravsharma-code',
    skills: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Tailwind']
  },
  {
    id: 'dev-7',
    name: 'Priya Verma',
    username: 'priyaverma-tech',
    college: 'VJTI Mumbai',
    city: 'Mumbai, MH',
    trackId: 'genai',
    trackName: 'GenAI & AI Agents Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    streak: 8,
    completedDays: 10,
    completionPercentage: 17,
    score: 380,
    rank: 42,
    githubHandle: 'priyaverma-tech',
    linkedinUrl: 'https://linkedin.com',
    skills: ['Python', 'Gemini API', 'LangChain', 'FastAPI']
  },
  {
    id: 'dev-8',
    name: 'Rohan Kulkarni',
    username: 'rohan-nitt',
    college: 'NIT Trichy',
    city: 'Tiruchirappalli, TN',
    trackId: 'backend',
    trackName: 'Backend Systems & Cloud Infra',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    streak: 12,
    completedDays: 12,
    completionPercentage: 20,
    score: 460,
    rank: 29,
    githubHandle: 'rohan-nitt',
    linkedinUrl: 'https://linkedin.com',
    skills: ['Node.js', 'Express', 'Redis', 'Docker', 'PostgreSQL']
  }
];

export const FAQS = [
  {
    q: 'How much time do I need to commit every day?',
    a: 'Just 45 to 60 minutes late at night after college lectures and hostel dinners. Every task is structured with starter code and clear deliverables.'
  },
  {
    q: 'What happens if I have college mid-term exams or hostel Wi-Fi downtime?',
    a: 'Every student gets 2 monthly Exam Grace Passes to freeze their streak without penalty! You can also complete express Catch-Up challenges.'
  },
  {
    q: 'Why do I need to post on LinkedIn and push to GitHub?',
    a: 'GitHub proves your code exists. LinkedIn makes your work visible to founders and tech recruiters searching for active Indian engineering talent.'
  },
  {
    q: 'Is ABTalks 60-Day Challenge completely free?',
    a: 'Yes, 100% free forever for all college students across India.'
  }
];
