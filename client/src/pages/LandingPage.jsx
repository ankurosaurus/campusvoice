import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Activity, Layers, CheckCircle2, RotateCcw, AlertTriangle, Trophy } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="relative min-h-[calc(100vh-110px)] bg-black text-white flex flex-col justify-between overflow-hidden">
      
      {/* Background scrim & subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black pointer-events-none" />

      {/* Main Hero Copy */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-10 pb-16 text-center flex flex-col items-center justify-center my-auto space-y-8">
        
        {/* Badge */}
        <div className="appear-pop inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-800 bg-gradient-to-r from-neutral-800 via-neutral-900 to-black text-neutral-200 text-xs font-normal tracking-tight shadow-lg">
          <svg className="w-4 h-4 text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.45)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
          </svg>
          <span>Campus Operational Feedback Infrastructure</span>
        </div>

        {/* H1 Headline with Instrument Serif Italic highlight */}
        <h1 className="appear-scale text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.12] text-white">
          Closed-Loop <em className="font-serif italic font-normal text-neutral-400 font-light">Feedback-to-Action</em> for Residential Campuses.
        </h1>

        {/* Lede paragraph */}
        <p className="appear-soft max-w-xl text-base sm:text-lg text-neutral-400 font-normal leading-relaxed tracking-tight">
          Eliminate the feedback gap between student complaints and warden resolution. Real-time SLA tracking, fake-resolution detection, and public trust metrics.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/student" className="btn-vesper-solid flex items-center gap-2">
            Explore Student Portal <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/admin" className="btn-vesper-ghost flex items-center gap-2">
            <Trophy className="w-4 h-4 text-purple-400" /> Admin Gap Visualizer
          </Link>
          <Link to="/transparency" className="btn-vesper-ghost flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> Public Trust Live Feed
          </Link>
        </div>

        {/* Benefits Cards Section */}
        <section id="benefits" className="w-full pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-5 shadow-lg">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center mb-3 border border-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">Closed-Loop Accountability</h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Tickets are only closed when the student rates the fix as Satisfied. Unsatisfied ratings auto-reopen the ticket.
            </p>
          </div>

          <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-5 shadow-lg">
            <div className="w-8 h-8 rounded-lg bg-red-950 text-red-400 flex items-center justify-center mb-3 border border-red-800">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">Automated SLA Escalations</h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              24h acknowledgment and 72h resolution windows with automatic breach flagging and Chief Warden alerts.
            </p>
          </div>

          <div className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-5 shadow-lg">
            <div className="w-8 h-8 rounded-lg bg-purple-950 text-purple-400 flex items-center justify-center mb-3 border border-purple-800">
              <RotateCcw className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">Fake Resolution Visualizer</h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Exposes operational gaps and reopened ticket rates per block & mess unit to stop prematurely closed complaints.
            </p>
          </div>
        </section>

      </main>

      {/* 3 Stats Footer Bar (Vesper.ai Specification) */}
      <footer className="relative z-10 border-t border-neutral-900/80 bg-black/80 backdrop-blur-md px-6 py-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-neutral-300">
          
          <div className="appear-soft inline-flex items-center gap-3 font-medium tracking-tight">
            <div className="relative w-7 h-7 flex items-center justify-center rounded bg-neutral-900 border border-neutral-800">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span><strong className="text-white font-semibold">1,420+</strong> complaints resolved within SLA</span>
          </div>

          <div className="appear-soft inline-flex items-center gap-3 font-medium tracking-tight">
            <div className="w-7 h-7 rounded bg-white flex items-center justify-center text-black">
              <ShieldCheck className="w-4 h-4 text-black stroke-[2.5]" />
            </div>
            <span><strong className="text-white font-semibold">94.8%</strong> SLA resolution compliance rate</span>
          </div>

          <div className="appear-soft inline-flex items-center gap-3 font-medium tracking-tight">
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-6 w-6 rounded-full bg-neutral-800 ring-2 ring-black flex items-center justify-center text-[10px] text-white">BH1</div>
              <div className="inline-block h-6 w-6 rounded-full bg-neutral-700 ring-2 ring-black flex items-center justify-center text-[10px] text-white">GH1</div>
              <div className="inline-block h-6 w-6 rounded-full bg-orange-600 ring-2 ring-black flex items-center justify-center text-[10px] font-bold text-white">M</div>
            </div>
            <span><strong className="text-white font-semibold">20+</strong> hostel blocks & dining halls active</span>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
