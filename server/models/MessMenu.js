import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Main' }, // e.g. Main, Side, Beverage, Dessert
  totalRating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  avgRating: { type: Number, default: 4.0 }
});

const messMenuSchema = new mongoose.Schema({
  messUnit: {
    type: String,
    default: 'Mess Alpha'
  },
  dayOfWeek: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  mealType: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Snacks', 'Dinner'],
    required: true
  },
  dishes: [dishSchema],
  specialItem: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('MessMenu', messMenuSchema);
