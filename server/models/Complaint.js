import mongoose from 'mongoose';

const remarkSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  authorName: String,
  authorRole: String,
  note: {
    type: String,
    required: true
  },
  statusBefore: String,
  statusAfter: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const complaintSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['hostel', 'mess'],
    default: 'hostel'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentName: String,
  studentEmail: String,
  block: {
    type: String,
    required: true,
    enum: ['BH-1', 'BH-2', 'GH-1', 'Mess Alpha']
  },
  roomNo: {
    type: String,
    default: 'N/A'
  },
  category: {
    type: String,
    required: true,
    enum: [
      'electricity', 'plumbing', 'cleanliness', 'wifi', 'furniture', 'security',
      'food quality', 'hygiene', 'variety', 'quantity', 'staff behavior', 'other'
    ]
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Raised', 'Acknowledged', 'In Progress', 'Resolved', 'Reopened'],
    default: 'Raised'
  },
  acknowledgedAt: Date,
  resolvedAt: Date,
  reopenedAt: Date,
  slaAckDeadline: Date,
  slaResolveDeadline: Date,
  isSlaBreached: {
    type: Boolean,
    default: false
  },
  slaBreachedReason: {
    type: String,
    default: ''
  },
  reopenedCount: {
    type: Number,
    default: 0
  },
  remarks: [remarkSchema],
  satisfaction: {
    rated: { type: Boolean, default: false },
    satisfied: { type: Boolean, default: null },
    rating: { type: Number, default: 0 },
    comment: { type: String, default: '' },
    ratedAt: Date
  }
}, { timestamps: true });

export default mongoose.model('Complaint', complaintSchema);
