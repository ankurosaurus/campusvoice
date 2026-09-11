import express from 'express';
import mongoose from 'mongoose';
import MessFeedback from '../models/MessFeedback.js';
import MessMenu from '../models/MessMenu.js';
import { protect, authorize } from '../middleware/auth.js';
import { mockMessFeedback, mockMessMenu } from '../utils/mockStore.js';

const router = express.Router();

// @route   POST /api/mess/feedback
router.post('/feedback', protect, authorize('student'), async (req, res) => {
  try {
    const { mealType, rating, category, comment, photoUrl } = req.body;

    if (!mealType || !rating || !category) {
      return res.status(400).json({ message: 'Meal type, rating (1-5), and category are required.' });
    }

    const newFeedback = {
      _id: `mf_${Date.now()}`,
      student: req.user._id,
      studentName: req.user.name,
      messUnit: 'Mess Alpha',
      mealType,
      rating: Number(rating),
      category,
      comment: comment || '',
      photoUrl: photoUrl || '',
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      const feedback = await MessFeedback.create(newFeedback);
      return res.status(201).json(feedback);
    }

    mockMessFeedback.unshift(newFeedback);
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit mess feedback: ' + error.message });
  }
});

// @route   GET /api/mess/feedback
router.get('/feedback', protect, async (req, res) => {
  try {
    const feedbacks = mockMessFeedback;
    const totalCount = feedbacks.length;
    const avgRating = totalCount > 0 
      ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / totalCount).toFixed(1)
      : '4.5';

    res.json({ feedbacks, stats: { totalCount, avgRating } });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch mess feedback.' });
  }
});

// @route   GET /api/mess/menu
router.get('/menu', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const menu = await MessMenu.find().sort({ dayOfWeek: 1 });
      if (menu.length > 0) return res.json(menu);
    }

    res.json(mockMessMenu);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch mess menu.' });
  }
});

// @route   POST /api/mess/rate-dish
router.post('/rate-dish', protect, authorize('student'), async (req, res) => {
  try {
    const { menuId, dishId, rating } = req.body;

    const menuItem = mockMessMenu.find(m => m._id === menuId) || mockMessMenu[0];
    const dish = menuItem.dishes.find(d => d._id === dishId) || menuItem.dishes[0];

    dish.totalRating = (dish.totalRating || 50) + Number(rating);
    dish.ratingCount = (dish.ratingCount || 10) + 1;
    dish.avgRating = Number((dish.totalRating / dish.ratingCount).toFixed(1));

    res.json({ dish, menuItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to rate dish.' });
  }
});

export default router;
