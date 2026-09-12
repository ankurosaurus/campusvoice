import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Activity, CheckCircle2, AlertTriangle, RotateCcw, ShieldCheck, Layers, Sparkles } from 'lucide-react';
import Hostel3DCanvas from '../components/Hostel3DCanvas';

export const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-[hsl(201,100%,13%)] text-white flex flex-col justify-between overflow-hidden">
      
      {/* Fullscreen Video Background (Prompt Specification) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
      />

      {/* Hero Section (Prompt Specification) */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 text-center flex flex-col items-center justify-center my-auto">
        
        {/* Badge */}
        <div className="animate-fade-rise inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass text-sky-200 text-xs font-mono tracking-tight mb-8">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Campus Operational Feedback & Resolution Infrastructure</span>
        </div>

        {/* H1 Headline (Prompt Specification) */}
        <h1 
          className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-white"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where campus <em className="not-italic text-neutral-400">voices rise</em> <em className="not-italic text-neutral-400">through the silence.</em>
        </h1>

        {/* Subtext (Prompt Specification) */}
        <p className="animate-fade-rise-delay text-neutral-400 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-sans">
          We're designing tools for deep thinkers, bold creators, and quiet rebels. Closed-loop feedback-to-resolution platform eliminating the gap between student complaints and warden resolution.
        </p>

        {/* CTA Buttons (Prompt Specification) */}
        <div className="animate-fade-rise-delay-2 flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link 
            to="/student" 
            className="liquid-glass rounded-full px-12 py-4 text-base font-semibold text-white hover:scale-[1.03] transition-transform cursor-pointer flex items-center gap-2"
          >
            Begin Journey <ArrowRight className="w-4 h-4 text-sky-400" />
          </Link>

          <Link 
            to="/transparency" 
            className="liquid-glass rounded-full px-8 py-4 text-base font-medium text-emerald-300 hover:scale-[1.03] transition-transform cursor-pointer flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-emerald-400" /> Public Trust Live Feed
          </Link>
        </div>

        {/* Interactive 3D WebGL Hostel Block Inspector Canvas */}
        <div className="w-full max-w-5xl mt-16 animate-fade-rise-delay-2">
          <Hostel3DCanvas />
        </div>

        {/* Benefits Grid */}
        <section id="benefits" className="w-full pt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="liquid-glass rounded-2xl p-6 shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Closed-Loop Accountability</h3>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Tickets are only closed when the student rates the fix as Satisfied. Unsatisfied ratings auto-reopen the ticket.
            </p>
          </div>

          <div className="liquid-glass rounded-2xl p-6 shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/40 text-red-400 flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Automated SLA Escalations</h3>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              24h acknowledgment and 72h resolution windows with automatic breach flagging and Chief Warden alerts.
            </p>
          </div>

          <div className="liquid-glass rounded-2xl p-6 shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center mb-4">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Fake Resolution Visualizer</h3>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Exposes operational gaps and reopened ticket rates per block & mess unit to stop prematurely closed complaints.
            </p>
          </div>
        </section>

      </main>

      {/* Footer Stats Bar */}
      <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md px-6 py-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-neutral-300">
          
          <div className="inline-flex items-center gap-3 font-medium tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span><strong className="text-white font-semibold">1,420+</strong> complaints resolved within SLA</span>
          </div>

          <div className="inline-flex items-center gap-3 font-medium tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span><strong className="text-white font-semibold">94.8%</strong> SLA resolution compliance rate</span>
          </div>

          <div className="inline-flex items-center gap-3 font-medium tracking-tight">
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-7 w-7 rounded-full bg-sky-900 ring-2 ring-black flex items-center justify-center text-[10px] text-white">BH1</div>
              <div className="inline-block h-7 w-7 rounded-full bg-indigo-900 ring-2 ring-black flex items-center justify-center text-[10px] text-white">GH1</div>
              <div className="inline-block h-7 w-7 rounded-full bg-emerald-700 ring-2 ring-black flex items-center justify-center text-[10px] font-bold text-white">M</div>
            </div>
            <span><strong className="text-white font-semibold">20+</strong> hostel blocks & dining halls active</span>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
