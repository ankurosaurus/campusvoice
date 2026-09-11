import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend, Cell 
} from 'recharts';
import { 
  ShieldAlert, Download, Trophy, Flame, AlertCircle, Clock, CheckCircle2, 
  RotateCcw, TrendingUp, Activity, Building, Award 
} from 'lucide-react';

import { INITIAL_ADMIN_ANALYTICS, INITIAL_LEADERBOARD } from '../data/mockData';

export const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(INITIAL_ADMIN_ANALYTICS);
  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);
  const [loading, setLoading] = useState(false);

  const fetchAdminData = async () => {
    try {
      const [analyticsRes, leaderboardRes] = await Promise.all([
        axios.get('/api/admin/analytics'),
        axios.get('/api/admin/leaderboard')
      ]);
      if (analyticsRes.data && analyticsRes.data.summary) {
        setAnalytics(analyticsRes.data);
      }
      if (leaderboardRes.data && leaderboardRes.data.length > 0) {
        setLeaderboard(leaderboardRes.data);
      }
    } catch (err) {
      console.warn('Using client mock analytics for admin dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleExportCSV = async () => {
    try {
      const response = await axios.get('/api/admin/export-csv', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'CampusVoice_Operational_Report.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download CSV report.');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white p-12 text-center text-neutral-500">Loading Central Gap Analytics...</div>;
  }

  const { summary, blockAnalytics, categoryBreakdown, trendData } = analytics;

  return (
    <div id="gap-score" className="min-h-screen bg-black text-white p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white flex items-center gap-2">
            Central Gap Visualizer & Analytics <span className="text-xs px-2.5 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono">SUPER ADMIN</span>
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 mt-1">
            Accountability dashboard exposing feedback-to-action gaps, resolution speeds, and fake resolution rates across campus.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="btn-vesper-solid flex items-center gap-2 text-xs self-start md:self-auto"
        >
          <Download className="w-4 h-4" /> Export Operational CSV Report
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold">Total Complaints</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white">{summary.totalComplaints}</div>
          <div className="mt-2 text-[11px] text-neutral-400 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold">{summary.resolvedCount} Resolved</span> ({((summary.resolvedCount / Math.max(1, summary.totalComplaints))*100).toFixed(1)}%)
          </div>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold">Avg Resolution Speed</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{summary.avgResolutionHours} <span className="text-lg font-normal text-neutral-400">hours</span></div>
          <div className="mt-2 text-[11px] text-neutral-400">
            SLA Compliance: <strong className="text-emerald-400">{summary.slaComplianceRatePercent}%</strong>
          </div>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold">Reopened Ticket Rate</span>
            <RotateCcw className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">{summary.reopenedRatePercent}%</div>
          <div className="mt-2 text-[11px] text-neutral-400">
            Proxy for "Fake Resolution" (Student unsatisfied)
          </div>
        </div>

        <div className="bg-neutral-950 border border-purple-900/60 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold text-purple-300">Overall Campus Gap Score</span>
            <ShieldAlert className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-purple-200">{summary.overallGapScore} <span className="text-sm font-normal text-neutral-400">/ 100</span></div>
          <div className="mt-2 text-[11px] text-purple-300/80">
            Lower is better (0 = Perfect feedback-to-action loop)
          </div>
        </div>
      </div>

      {/* FEEDBACK-TO-ACTION GAP SCORE PER BLOCK CHART */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" /> Feedback-to-Action Gap Score per Block / Mess Unit
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Exposes operational gaps: calculated from complaint volume vs SLA compliance % vs student reopening rate.
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={blockAnalytics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="block" stroke="#a3a3a3" fontSize={12} />
              <YAxis stroke="#a3a3a3" fontSize={12} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626', color: '#ffffff', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="gapScore" name="Gap Score (Lower is better)" fill="#a855f7" radius={[6, 6, 0, 0]}>
                {blockAnalytics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.gapScore > 30 ? '#ef4444' : '#10b981'} />
                ))}
              </Bar>
              <Bar dataKey="slaComplianceRate" name="SLA Compliance %" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LEADERBOARD TABLE & CATEGORY HEATMAP ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEADERBOARD TABLE */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" /> Warden & Staff Performance Leaderboard
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-neutral-900 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="p-3">Staff / Unit</th>
                  <th className="p-3">Block</th>
                  <th className="p-3">Resolved</th>
                  <th className="p-3">SLA Breached</th>
                  <th className="p-3">Student Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {leaderboard.map((staff, idx) => (
                  <tr key={idx} className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-3 font-semibold text-white flex items-center gap-2">
                      {idx === 0 && <Award className="w-4 h-4 text-amber-400" />}
                      {staff.staffName}
                    </td>
                    <td className="p-3 text-neutral-400">{staff.hostelBlock}</td>
                    <td className="p-3 text-emerald-400 font-semibold">{staff.resolvedCount}</td>
                    <td className={`p-3 font-semibold ${staff.breachedCount > 0 ? 'text-red-400' : 'text-neutral-500'}`}>
                      {staff.breachedCount}
                    </td>
                    <td className="p-3 font-bold text-amber-400">★ {staff.satisfactionRating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CATEGORY HEATMAP & DISTRIBUTION */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-red-500" /> Category Heatmap & Issue Distribution
          </h2>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis type="number" stroke="#a3a3a3" fontSize={12} />
                <YAxis dataKey="category" type="category" stroke="#a3a3a3" fontSize={11} width={90} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626', color: '#ffffff', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* TREND CHART OVER TIME */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-blue-400" /> Complaint Trends Over Time by Category
        </h2>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="date" stroke="#a3a3a3" fontSize={12} />
              <YAxis stroke="#a3a3a3" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626', color: '#ffffff' }} />
              <Legend />
              <Line type="monotone" dataKey="total" name="Total Volume" stroke="#ffffff" strokeWidth={2} />
              <Line type="monotone" dataKey="electricity" name="Electricity" stroke="#f59e0b" />
              <Line type="monotone" dataKey="plumbing" name="Plumbing" stroke="#3b82f6" />
              <Line type="monotone" dataKey="food" name="Mess Food" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
