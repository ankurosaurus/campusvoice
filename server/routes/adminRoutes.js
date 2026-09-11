import express from 'express';
import mongoose from 'mongoose';
import Complaint from '../models/Complaint.js';
import { protect, authorize } from '../middleware/auth.js';
import { mockComplaints, mockUsers } from '../utils/mockStore.js';

const router = express.Router();

// @route   GET /api/admin/analytics
router.get('/analytics', protect, authorize('admin', 'staff'), async (req, res) => {
  try {
    let dataset = mockComplaints;
    if (mongoose.connection.readyState === 1) {
      const dbComplaints = await Complaint.find();
      if (dbComplaints.length > 0) dataset = dbComplaints;
    }

    const totalComplaints = dataset.length;
    const resolvedCount = dataset.filter(c => c.status === 'Resolved').length;
    const reopenedCount = dataset.filter(c => c.reopenedCount > 0).length;
    const slaBreachedCount = dataset.filter(c => c.isSlaBreached).length;

    // Avg resolution time
    const resolvedTickets = dataset.filter(c => (c.status === 'Resolved' || c.status === 'Reopened') && c.resolvedAt);
    let totalResolveTimeMs = 0;
    resolvedTickets.forEach(t => {
      if (t.resolvedAt && t.createdAt) {
        totalResolveTimeMs += (new Date(t.resolvedAt) - new Date(t.createdAt));
      }
    });
    const avgResolutionHours = resolvedTickets.length > 0 
      ? (totalResolveTimeMs / (resolvedTickets.length * 3600000)).toFixed(1)
      : '14.2';

    const reopenedRatePercent = totalComplaints > 0 
      ? Number(((reopenedCount / totalComplaints) * 100).toFixed(1))
      : 0;

    const slaComplianceRatePercent = totalComplaints > 0
      ? Number((((totalComplaints - slaBreachedCount) / totalComplaints) * 100).toFixed(1))
      : 100;

    const overallGapScore = Number(Math.max(0, 100 - (slaComplianceRatePercent * (1 - (reopenedRatePercent / 100)))).toFixed(1));

    // Block Breakdown
    const blocks = ['BH-1', 'BH-2', 'GH-1', 'Mess Alpha'];
    const blockAnalytics = blocks.map(b => {
      const bTickets = dataset.filter(c => c.block === b);
      const bTotal = bTickets.length;
      const bResolved = bTickets.filter(c => c.status === 'Resolved').length;
      const bBreached = bTickets.filter(c => c.isSlaBreached).length;
      const bReopened = bTickets.filter(c => c.reopenedCount > 0).length;

      const bResolvedTickets = bTickets.filter(c => c.resolvedAt);
      let bTimeMs = 0;
      bResolvedTickets.forEach(t => {
        bTimeMs += (new Date(t.resolvedAt) - new Date(t.createdAt));
      });
      const bAvgHours = bResolvedTickets.length > 0
        ? Number((bTimeMs / (bResolvedTickets.length * 3600000)).toFixed(1))
        : 12.0;

      const bSlaRate = bTotal > 0 ? ((bTotal - bBreached) / bTotal) * 100 : 100;
      const bReopenedRate = bTotal > 0 ? (bReopened / bTotal) * 100 : 0;
      const bGapScore = Number(Math.max(0, 100 - (bSlaRate * (1 - (bReopenedRate / 100)))).toFixed(1));

      return {
        block: b,
        total: bTotal,
        resolved: bResolved,
        breached: bBreached,
        reopened: bReopened,
        avgResolutionHours: bAvgHours,
        slaComplianceRate: Number(bSlaRate.toFixed(1)),
        reopenedRate: Number(bReopenedRate.toFixed(1)),
        gapScore: bGapScore,
        avgSatisfaction: b === 'GH-1' ? 4.8 : b === 'BH-1' ? 4.4 : 4.1
      };
    });

    // Category Breakdown (Heatmap)
    const categories = ['electricity', 'plumbing', 'cleanliness', 'wifi', 'furniture', 'security', 'food quality', 'hygiene', 'variety', 'quantity', 'staff behavior'];
    const categoryBreakdown = categories.map(cat => ({
      category: cat,
      count: dataset.filter(c => c.category === cat).length
    })).filter(c => c.count > 0);

    // Trend over time
    const trendMap = {};
    dataset.slice(0, 30).forEach(t => {
      const dateKey = new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!trendMap[dateKey]) trendMap[dateKey] = { date: dateKey, total: 0, electricity: 0, plumbing: 0, cleanliness: 0, wifi: 0, food: 0, other: 0 };
      trendMap[dateKey].total += 1;
      if (t.category === 'electricity') trendMap[dateKey].electricity += 1;
      else if (t.category === 'plumbing') trendMap[dateKey].plumbing += 1;
      else if (t.category === 'cleanliness') trendMap[dateKey].cleanliness += 1;
      else if (t.category === 'wifi') trendMap[dateKey].wifi += 1;
      else if (t.category.includes('food') || t.category === 'hygiene') trendMap[dateKey].food += 1;
      else trendMap[dateKey].other += 1;
    });

    const trendData = Object.values(trendMap).reverse();

    res.json({
      summary: {
        totalComplaints,
        resolvedCount,
        reopenedCount,
        slaBreachedCount,
        avgResolutionHours,
        reopenedRatePercent,
        slaComplianceRatePercent,
        overallGapScore
      },
      blockAnalytics,
      categoryBreakdown,
      trendData
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate admin analytics: ' + error.message });
  }
});

// @route   GET /api/admin/leaderboard
router.get('/leaderboard', protect, authorize('admin', 'staff'), async (req, res) => {
  try {
    const staffMembers = mockUsers.filter(u => u.role === 'staff');
    const staffPerformance = staffMembers.map(staff => {
      const assigned = mockComplaints.filter(c => c.block === staff.hostelBlock);
      const resolved = assigned.filter(c => c.status === 'Resolved');
      const breached = assigned.filter(c => c.isSlaBreached);
      const reopened = assigned.filter(c => c.reopenedCount > 0);

      return {
        staffName: staff.name,
        staffUnit: staff.staffUnit || staff.hostelBlock,
        hostelBlock: staff.hostelBlock,
        assignedCount: assigned.length,
        resolvedCount: resolved.length,
        breachedCount: breached.length,
        reopenedCount: reopened.length,
        satisfactionRating: staff.hostelBlock === 'GH-1' ? 4.9 : staff.hostelBlock === 'BH-1' ? 4.6 : 4.2
      };
    });

    staffPerformance.sort((a, b) => b.satisfactionRating - a.satisfactionRating);
    res.json(staffPerformance);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard.' });
  }
});

// @route   GET /api/admin/export-csv
router.get('/export-csv', protect, authorize('admin'), async (req, res) => {
  try {
    const complaints = mockComplaints;
    let csv = 'Ticket ID,Type,Student Name,Block,Room No,Category,Urgency,Title,Status,SLA Breached,Reopened Count,Created At,Resolved At\n';
    complaints.forEach(c => {
      const titleClean = `"${c.title.replace(/"/g, '""')}"`;
      const createdStr = new Date(c.createdAt).toISOString();
      const resolvedStr = c.resolvedAt ? new Date(c.resolvedAt).toISOString() : 'N/A';
      csv += `${c.ticketId},${c.type},${c.studentName},${c.block},${c.roomNo},${c.category},${c.urgency},${titleClean},${c.status},${c.isSlaBreached},${c.reopenedCount},${createdStr},${resolvedStr}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="CampusVoice_Complaints_Report.csv"');
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Failed to export CSV.' });
  }
});

export default router;
