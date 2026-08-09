import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STUDENT_PRESETS, TRACKS } from '../data/mockData';
import { TrackId } from '../types';
import {
  X,
  LogIn,
  User,
  Mail,
  Lock,
  CheckCircle2,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'signup'
}) => {
  const { login, navigate } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot_password'>(defaultMode);

  // Form Fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Forgot Password state
  const [forgotStep, setForgotStep] = useState<'email' | 'otp'>('email');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpMessage, setOtpMessage] = useState<string | null>(null);

  // Cloudflare turnstile captcha state
  const [captchaVerified, setCaptchaVerified] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Sign In submission
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim() || !password) {
      setErrorMessage('Please enter both username/email and password.');
      return;
    }

    if (!captchaVerified) {
      setErrorMessage('Please complete the security verification.');
      return;
    }

    // Authenticate user profile (matching preset or creating custom)
    const matchedPreset =
      username.toLowerCase().includes('priya') || username.toLowerCase().includes('catch')
        ? STUDENT_PRESETS.CATCH_UP
        : STUDENT_PRESETS.ACTIVE;

    login({
      ...matchedPreset,
      name: username.includes('@') ? username.split('@')[0] : username,
      githubHandle: username.toLowerCase().replace(/\s+/g, '-'),
    });

    setSuccessMessage('Signed in successfully!');
    setTimeout(() => {
      onClose();
      navigate('/dashboard');
    }, 600);
  };

  // Handle Sign Up submission
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim()) {
      setErrorMessage('Username is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Password is required.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!captchaVerified) {
      setErrorMessage('Please complete the security verification.');
      return;
    }

    // Create new profile
    const newStudent = {
      id: 'usr-' + Date.now(),
      name: username,
      college: 'Indian Institute of Technology',
      githubHandle: username.toLowerCase().replace(/[^a-z0-9]/g, ''),
      linkedinUrl: `https://linkedin.com/in/${username.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      currentStreak: 1,
      longestStreak: 1,
      totalSubmissions: 1,
      xp: 100,
      rank: 42,
      trackId: 'fullstack' as TrackId,
      isExamFreezeActive: false,
      hasExamFreezeAvailable: true,
      badges: STUDENT_PRESETS.ACTIVE.badges,
    };

    login(newStudent);
    setSuccessMessage('Account created! Welcome to ABTalks 60 Days of Code.');
    setTimeout(() => {
      onClose();
      navigate('/dashboard');
    }, 700);
  };

  // Handle Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    // Simulate OTP generation
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    setForgotStep('otp');
    setOtpMessage(`Verification OTP sent to ${email}. (Demo OTP: ${mockOtp})`);
  };

  // Handle Reset Password with OTP
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (otpCode.trim() !== generatedOtp && otpCode.trim() !== '849201') {
      setErrorMessage('Invalid OTP code. Please check your email or enter demo code.');
      return;
    }

    if (!newPassword || newPassword.length < 4) {
      setErrorMessage('New password must be at least 4 characters long.');
      return;
    }

    setSuccessMessage('Password reset successfully! Logging you in...');

    setTimeout(() => {
      login({
        ...STUDENT_PRESETS.ACTIVE,
        name: email.split('@')[0] || 'Aarav Sharma',
      });
      onClose();
      navigate('/dashboard');
    }, 1000);
  };

  // Quick Preset fill helper
  const handleQuickPreset = (presetKey: 'ACTIVE' | 'CATCH_UP') => {
    const p = STUDENT_PRESETS[presetKey];
    setUsername(p.name);
    setEmail(`${p.githubHandle}@gmail.com`);
    setPassword('student123');
    setConfirmPassword('student123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative my-8 font-sans border border-slate-200">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LeetCode / ABTalks Style Header Logo */}
        <div className="flex flex-col items-center justify-center pt-2 pb-5">
          <div className="w-12 h-12 mb-2 flex items-center justify-center">
            {/* Custom Orange Stylized Arrow Logo matching LeetCode look */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center shadow-md">
              <div className="text-white font-black text-xl font-mono tracking-tighter flex items-center">
                <span>&lt;</span>
                <span className="text-amber-200 font-bold">/</span>
                <span>&gt;</span>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 font-sans flex items-center gap-1.5">
            <span>ABTalks</span>
            <span className="text-xs font-mono bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full border border-orange-200">
              60 Days
            </span>
          </h2>
        </div>

        {/* Status Error / Success Messages */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2 animate-fade-in">
            <Info className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* SIGN UP FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
              />
            </div>

            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
              />
            </div>

            <div>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
              />
            </div>

            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail address"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
              />
            </div>

            {/* Cloudflare Turnstile Captcha Simulation */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setCaptchaVerified(!captchaVerified)}
                  className="w-6 h-6 rounded-md border flex items-center justify-center transition-colors focus:outline-none"
                  style={{
                    backgroundColor: captchaVerified ? '#16a34a' : '#ffffff',
                    borderColor: captchaVerified ? '#16a34a' : '#cbd5e1'
                  }}
                >
                  {captchaVerified && <CheckCircle2 className="w-4 h-4 text-white" />}
                </button>
                <span className="text-xs font-semibold text-slate-800">Success!</span>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-sans">
                {/* Cloudflare logo icon */}
                <div className="w-5 h-3 bg-amber-500 rounded-sm flex items-center justify-center text-[7px] font-black text-white">
                  CF
                </div>
                <div className="flex flex-col text-right leading-tight">
                  <span className="font-bold text-slate-700">CLOUDFLARE</span>
                  <span className="text-[8px] text-slate-400">Privacy • Help</span>
                </div>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#18181b] hover:bg-black text-white font-bold text-sm rounded-xl shadow-md transition-colors active:scale-98"
            >
              Sign Up
            </button>

            {/* Terms and Sign In toggle */}
            <div className="text-center pt-2 space-y-2">
              <p className="text-[11px] text-slate-500">
                By continuing, you agree to{' '}
                <a href="#terms" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline">
                  Terms
                </a>{' '}
                &{' '}
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>

              <p className="text-xs text-slate-600">
                Have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setMode('signin');
                  }}
                  className="text-slate-900 font-bold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        )}

        {/* SIGN IN FORM */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-3.5">
            <div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username or E-mail address"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
              />
            </div>

            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
              />
              <div className="text-right pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setForgotStep('email');
                    setMode('forgot_password');
                  }}
                  className="text-[11px] text-slate-500 hover:text-slate-900 font-medium hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Cloudflare Turnstile Captcha Simulation */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setCaptchaVerified(!captchaVerified)}
                  className="w-6 h-6 rounded-md border flex items-center justify-center transition-colors focus:outline-none"
                  style={{
                    backgroundColor: captchaVerified ? '#16a34a' : '#ffffff',
                    borderColor: captchaVerified ? '#16a34a' : '#cbd5e1'
                  }}
                >
                  {captchaVerified && <CheckCircle2 className="w-4 h-4 text-white" />}
                </button>
                <span className="text-xs font-semibold text-slate-800">Success!</span>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-sans">
                <div className="w-5 h-3 bg-amber-500 rounded-sm flex items-center justify-center text-[7px] font-black text-white">
                  CF
                </div>
                <div className="flex flex-col text-right leading-tight">
                  <span className="font-bold text-slate-700">CLOUDFLARE</span>
                  <span className="text-[8px] text-slate-400">Privacy • Help</span>
                </div>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#18181b] hover:bg-black text-white font-bold text-sm rounded-xl shadow-md transition-colors active:scale-98"
            >
              Sign In
            </button>

            {/* Toggle to Sign Up */}
            <div className="text-center pt-2 space-y-2">
              <p className="text-xs text-slate-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setMode('signup');
                  }}
                  className="text-slate-900 font-bold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD FORM (WITH OTP VERIFICATION) */}
        {mode === 'forgot_password' && (
          <div className="space-y-4">
            <div className="text-center pb-1">
              <h3 className="text-sm font-bold text-slate-900">Reset Password via Email OTP</h3>
              <p className="text-xs text-slate-500">
                {forgotStep === 'email'
                  ? 'Enter your registered email address to receive a 6-digit OTP code'
                  : 'Enter the 6-digit OTP code sent to your email and set a new password'}
              </p>
            </div>

            {forgotStep === 'email' && (
              <form onSubmit={handleSendOtp} className="space-y-3.5">
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Registered E-mail address"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs rounded-xl shadow-md hover:from-amber-600 hover:to-orange-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send OTP Code to Email</span>
                </button>
              </form>
            )}

            {forgotStep === 'otp' && (
              <form onSubmit={handleResetPassword} className="space-y-3.5">
                {otpMessage && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-xs space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      OTP Sent Successfully!
                    </p>
                    <p className="text-[11px] font-mono">{otpMessage}</p>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    6-Digit Verification OTP Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit OTP (e.g., 849201)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-mono tracking-widest text-center placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#18181b] hover:bg-black text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Verify OTP & Reset Password</span>
                </button>
              </form>
            )}

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setMode('signin');
                }}
                className="text-xs text-slate-600 hover:text-slate-900 font-bold hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        )}

        {/* Demo Fast Fill Bar */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Quick Demo Fill:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleQuickPreset('ACTIVE')}
              className="text-orange-600 hover:underline font-bold"
            >
              Aarav
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleQuickPreset('CATCH_UP')}
              className="text-indigo-600 hover:underline font-bold"
            >
              Priya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
