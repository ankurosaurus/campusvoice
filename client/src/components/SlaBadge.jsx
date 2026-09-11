import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const SlaBadge = ({ isBreached, slaDeadline, status }) => {
  if (status === 'Resolved') {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-neutral-400 font-mono">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        Completed
      </span>
    );
  }

  if (isBreached) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-red-900/60 text-red-300 border border-red-500/50 animate-bounce">
        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
        SLA Breached
      </span>
    );
  }

  if (!slaDeadline) return null;

  const now = new Date();
  const deadline = new Date(slaDeadline);
  const diffHours = Math.max(0, Math.round((deadline - now) / (1000 * 60 * 60)));

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-neutral-900 text-neutral-300 border border-neutral-800">
      ⏱️ {diffHours}h SLA window
    </span>
  );
};

export default SlaBadge;
