import mongoose from 'mongoose';

const messFeedbackSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentName: String,
  messUnit: {
    type: String,
    default: 'Mess Alpha'
  },
  mealType: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Snacks', 'Dinner'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  category: {
    type: String,
    enum: ['food quality', 'hygiene', 'variety', 'quantity', 'staff behavior', 'general'],
    required: true
  },
  comment: {
    type: String,
    default: ''
  },
  photoUrl: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('MessFeedback', messFeedbackSchema);
