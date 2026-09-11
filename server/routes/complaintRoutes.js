import express from 'express';
import mongoose from 'mongoose';
import Complaint from '../models/Complaint.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';
import { mockComplaints } from '../utils/mockStore.js';

const router = express.Router();

// Generate ticket code
const generateTicketId = async () => {
  const count = mockComplaints.length + 1;
  const year = new Date().getFullYear();
  const seq = count.toString().padStart(4, '0');
  return `CMP-${year}-${seq}`;
};

// @route   POST /api/complaints
router.post('/', protect, authorize('student'), async (req, res) => {
  try {
    const { type, block, roomNo, category, urgency, title, description, photoUrl } = req.body;

    if (!title || !description || !category || !block) {
      return res.status(400).json({ message: 'Title, description, category, and hostel block are required.' });
    }

    const ticketId = await generateTicketId();
    const now = new Date();
    const ackDeadline = new Date(now.getTime() + 24 * 3600 * 1000);
    const resDeadline = new Date(now.getTime() + 72 * 3600 * 1000);

    const newTicket = {
      _id: `mock_ticket_${Date.now()}`,
      ticketId,
      type: type || 'hostel',
      student: req.user._id,
      studentName: req.user.name,
      studentEmail: req.user.email,
      block,
      roomNo: roomNo || req.user.roomNo || 'N/A',
      category,
      urgency: urgency || 'medium',
      title,
      description,
      photoUrl: photoUrl || '',
      status: 'Raised',
      slaAckDeadline: ackDeadline,
      slaResolveDeadline: resDeadline,
      isSlaBreached: false,
      reopenedCount: 0,
      remarks: [],
      satisfaction: { rated: false, satisfied: null, rating: 0, comment: '' },
      createdAt: now
    };

    if (mongoose.connection.readyState === 1) {
      const complaint = await Complaint.create(newTicket);
      return res.status(201).json(complaint);
    }

    // Mock store insert
    mockComplaints.unshift(newTicket);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create complaint: ' + error.message });
  }
});

// @route   GET /api/complaints/my
router.get('/my', protect, authorize('student'), async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const complaints = await Complaint.find({ student: req.user._id }).sort({ createdAt: -1 });
      return res.json(complaints);
    }

    const myTickets = mockComplaints.filter(c => c.student === req.user._id || c.studentEmail === req.user.email);
    res.json(myTickets.length > 0 ? myTickets : mockComplaints.slice(0, 15));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch student complaints.' });
  }
});

// @route   GET /api/complaints/all
router.get('/all', protect, authorize('staff', 'admin'), async (req, res) => {
  try {
    const { block, status, category, urgency, breached, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      const query = {};
      if (req.user.role === 'staff' && req.user.hostelBlock !== 'All') {
        query.block = req.user.hostelBlock;
      } else if (block && block !== 'All') {
        query.block = block;
      }
      if (status && status !== 'All') query.status = status;
      if (category && category !== 'All') query.category = category;
      if (urgency && urgency !== 'All') query.urgency = urgency;
      if (breached === 'true') query.isSlaBreached = true;
      if (search) {
        query.$or = [
          { ticketId: { $regex: search, $options: 'i' } },
          { title: { $regex: search, $options: 'i' } },
          { studentName: { $regex: search, $options: 'i' } }
        ];
      }
      const complaints = await Complaint.find(query).sort({ createdAt: -1 });
      return res.json(complaints);
    }

    // Filter mock dataset
    let filtered = [...mockComplaints];

    if (req.user.role === 'staff' && req.user.hostelBlock !== 'All') {
      filtered = filtered.filter(c => c.block === req.user.hostelBlock);
    } else if (block && block !== 'All') {
      filtered = filtered.filter(c => c.block === block);
    }

    if (status && status !== 'All') filtered = filtered.filter(c => c.status === status);
    if (category && category !== 'All') filtered = filtered.filter(c => c.category === category);
    if (urgency && urgency !== 'All') filtered = filtered.filter(c => c.urgency === urgency);
    if (breached === 'true') filtered = filtered.filter(c => c.isSlaBreached);

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(c =>
        c.ticketId.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.studentName.toLowerCase().includes(q)
      );
    }

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch complaints: ' + error.message });
  }
});

// @route   PUT /api/complaints/:id/status
router.put('/:id/status', protect, authorize('staff', 'admin'), async (req, res) => {
  try {
    const { status, note } = req.body;
    if (!status || !note || !note.trim()) {
      return res.status(400).json({ message: 'Status and a mandatory action note are required.' });
    }

    if (mongoose.connection.readyState === 1) {
      const complaint = await Complaint.findById(req.params.id);
      if (complaint) {
        const statusBefore = complaint.status;
        complaint.status = status;
        if (status === 'Acknowledged' && !complaint.acknowledgedAt) complaint.acknowledgedAt = new Date();
        if (status === 'Resolved') complaint.resolvedAt = new Date();
        complaint.remarks.push({
          author: req.user._id,
          authorName: req.user.name,
          authorRole: req.user.role,
          note,
          statusBefore,
          statusAfter: status,
          createdAt: new Date()
        });
        await complaint.save();
        return res.json(complaint);
      }
    }

    // Mock update
    const complaint = mockComplaints.find(c => c._id === req.params.id);
    if (complaint) {
      const statusBefore = complaint.status;
      complaint.status = status;
      if (status === 'Acknowledged' && !complaint.acknowledgedAt) complaint.acknowledgedAt = new Date();
      if (status === 'Resolved') complaint.resolvedAt = new Date();
      complaint.remarks.push({
        authorName: req.user.name,
        authorRole: req.user.role,
        note,
        statusBefore,
        statusAfter: status,
        createdAt: new Date()
      });
      return res.json(complaint);
    }

    res.status(404).json({ message: 'Complaint not found.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update ticket status: ' + error.message });
  }
});

// @route   PUT /api/complaints/:id/satisfaction
router.put('/:id/satisfaction', protect, authorize('student'), async (req, res) => {
  try {
    const { satisfied, comment, rating } = req.body;
    const isSatisfied = Boolean(satisfied);

    if (mongoose.connection.readyState === 1) {
      const complaint = await Complaint.findById(req.params.id);
      if (complaint) {
        complaint.satisfaction = {
          rated: true,
          satisfied: isSatisfied,
          rating: rating || (isSatisfied ? 5 : 1),
          comment: comment || '',
          ratedAt: new Date()
        };

        if (!isSatisfied) {
          complaint.status = 'Reopened';
          complaint.reopenedCount += 1;
          complaint.remarks.push({
            authorName: req.user.name,
            authorRole: 'student',
            note: `Student rated resolution as Unsatisfied: "${comment || 'Action taken was ineffective'}" — Ticket Reopened automatically.`,
            statusBefore: 'Resolved',
            statusAfter: 'Reopened',
            createdAt: new Date()
          });
        }

        await complaint.save();
        return res.json(complaint);
      }
    }

    // Mock update
    const complaint = mockComplaints.find(c => c._id === req.params.id);
    if (complaint) {
      complaint.satisfaction = {
        rated: true,
        satisfied: isSatisfied,
        rating: rating || (isSatisfied ? 5 : 1),
        comment: comment || '',
        ratedAt: new Date()
      };

      if (!isSatisfied) {
        complaint.status = 'Reopened';
        complaint.reopenedCount += 1;
        complaint.remarks.push({
          authorName: req.user.name,
          authorRole: 'student',
          note: `Student rated resolution as Unsatisfied: "${comment || 'Action taken was ineffective'}" — Ticket Reopened automatically.`,
          statusBefore: 'Resolved',
          statusAfter: 'Reopened',
          createdAt: new Date()
        });
      }

      return res.json(complaint);
    }

    res.status(404).json({ message: 'Complaint not found.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to record satisfaction rating.' });
  }
});

export default router;
