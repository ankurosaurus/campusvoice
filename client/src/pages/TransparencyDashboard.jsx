import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, Clock, CheckCircle2, Building, Flame, Activity, Lock } from 'lucide-react';

import { INITIAL_TRANSPARENCY_METRICS } from '../data/mockData';

export const TransparencyDashboard = () => {
  const [metrics, setMetrics] = useState(INITIAL_TRANSPARENCY_METRICS);
  const [loading, setLoading] = useState(false);

  const fetchPublicMetrics = async () => {
    try {
      const res = await axios.get('/api/transparency/public-metrics');
      if (res.data && res.data.overallResolutionRatePercent !== undefined) {
        setMetrics(res.data);
      }
    } catch (err) {
      console.warn('Using client mock transparency metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicMetrics();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-black text-white p-12 text-center text-neutral-500">Loading Public Campus Trust Data...</div>;
  }

  const { overallResolutionRatePercent, avgResponseTimeHours, blockMetrics, recentResolutions } = metrics;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" /> Live Public Transparency Layer
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
          Real-Time Resolution & Trust Metrics
        </h1>
        <p className="text-sm text-neutral-400">
          Open student visibility into hostel block & dining operations performance. Updated continuously to ensure accountability.
        </p>
      </div>

      {/* Top 2 Global Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div className="bg-neutral-950 border border-emerald-900/60 rounded-2xl p-6 text-center shadow-2xl">
          <div className="text-xs text-neutral-400 uppercase tracking-wider font-semibold mb-1">Campus Resolution Rate</div>
          <div className="text-4xl md:text-5xl font-bold text-emerald-400">{overallResolutionRatePercent}%</div>
          <div className="mt-2 text-xs text-neutral-400">Complaints successfully resolved</div>
        </div>

        <div className="bg-neutral-950 border border-blue-900/60 rounded-2xl p-6 text-center shadow-2xl">
          <div className="text-xs text-neutral-400 uppercase tracking-wider font-semibold mb-1">Average Response Speed</div>
          <div className="text-4xl md:text-5xl font-bold text-blue-400">{avgResponseTimeHours} <span className="text-xl font-normal text-neutral-400">hours</span></div>
          <div className="mt-2 text-xs text-neutral-400">From submission to technician action</div>
        </div>
      </div>

      {/* BLOCK-WISE RESOLUTION CARDS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Building className="w-5 h-5 text-emerald-400" /> Block-Wise & Mess Operations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {blockMetrics.map((b) => (
            <div key={b.block} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-900 mb-3">
                <span className="font-bold text-base text-white">{b.block}</span>
                <span className="text-xs font-semibold text-emerald-400">{b.resolutionRatePercent}% Rate</span>
              </div>

              <div className="space-y-2 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Total Tickets:</span>
                  <span className="font-medium text-white">{b.totalComplaints}</span>
                </div>
                <div className="flex justify-between">
                  <span>Resolved:</span>
                  <span className="font-medium text-emerald-400">{b.resolvedCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Speed:</span>
                  <span className="font-medium text-white">{b.avgResponseHours}h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIVE RECENT RESOLUTION STREAM */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-emerald-400" /> Recent Resolutions Live Feed (Anonymized)
        </h2>

        <div className="space-y-3">
          {recentResolutions.map((r, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-neutral-400">{r.ticketId}</span>
                <span className="px-2 py-0.5 rounded bg-black border border-neutral-800 font-semibold text-white">{r.block}</span>
                <span className="text-neutral-300 capitalize">📁 {r.category}</span>
              </div>

              <div className="flex items-center gap-4 text-neutral-400">
                <span>⏱️ Resolved in <strong className="text-white">{r.resolutionHours}h</strong></span>
                <span className="text-amber-400 font-bold">★ {r.rating} / 5</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransparencyDashboard;
