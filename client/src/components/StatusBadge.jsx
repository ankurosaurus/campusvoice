import React from 'react';
import { AlertCircle, Clock, Wrench, CheckCircle2, RotateCcw } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  switch (status) {
    case 'Raised':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-950/70 text-red-400 border border-red-800/60 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
          <AlertCircle className="w-3.5 h-3.5" />
          Raised
        </span>
      );
    case 'Acknowledged':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-950/70 text-blue-400 border border-blue-800/60 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
          <Clock className="w-3.5 h-3.5" />
          Acknowledged
        </span>
      );
    case 'In Progress':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/70 text-amber-400 border border-amber-800/60 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
          <Wrench className="w-3.5 h-3.5" />
          In Progress
        </span>
      );
    case 'Resolved':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Resolved
        </span>
      );
    case 'Reopened':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-950/70 text-purple-400 border border-purple-800/60 shadow-[0_0_10px_rgba(168,85,247,0.2)] animate-pulse">
          <RotateCcw className="w-3.5 h-3.5" />
          Reopened
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300">
          {status}
        </span>
      );
  }
};

export default StatusBadge;
