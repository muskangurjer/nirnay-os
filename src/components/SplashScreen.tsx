import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, HeartPulse, ChevronRight, Zap, Radio } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalMs = 5000;
    const intervalMs = 50;
    const step = (intervalMs / totalMs) * 100;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    const countdownTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          setTimeout(onComplete, 200);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(countdownTimer);
    };
  }, [onComplete]);

  return (
    <div
      id="splash-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden select-none"
    >
      {/* Background ambient medical grid & glowing rings */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      
      {/* Glowing concentric pulse circles */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />

      {/* Central Brand Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg px-6">
        {/* Animated Emblem */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 opacity-30 blur-lg animate-pulse" />
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-teal-500/40 shadow-2xl shadow-teal-500/20 flex items-center justify-center">
            <Activity className="w-12 h-12 text-teal-400 animate-pulse" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

        {/* Title & Hierarchy */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
          National Health Grid • ABDM Integrated
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
          Nirnay<span className="text-teal-400">OS</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
          Next-Generation Unified Clinical Operating System connecting Patients, Doctors, Hospitals, and Emergency Triage.
        </p>

        {/* Key Features Pill Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            PM-JAY & CGHS Enabled
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 text-xs">
            <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
            AI Emergency Triage
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 text-xs">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Real-Time Bed Grid
          </span>
        </div>

        {/* Progress Bar & Countdown */}
        <div className="w-full max-w-xs mb-4">
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-400 transition-all duration-75 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
            <span>Synchronizing ABDM Health Registry...</span>
            <span className="font-mono text-teal-400 font-semibold">{timeLeft}s</span>
          </div>
        </div>

        {/* Skip Intro Button */}
        <button
          id="skip-intro-btn"
          onClick={onComplete}
          className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all shadow-sm cursor-pointer"
        >
          Skip Intro
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Footer disclaimer */}
      <div className="absolute bottom-4 text-center text-[11px] text-slate-600">
        Government of India • Ministry of Health & Family Welfare • ABDM Sandbox Certified
      </div>
    </div>
  );
};
