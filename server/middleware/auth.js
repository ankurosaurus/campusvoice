import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { mockUsers } from '../utils/mockStore.js';

const JWT_SECRET = process.env.JWT_SECRET || 'campusvoice_super_secret_jwt_key_2026';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      if (mongoose.connection.readyState === 1) {
        req.user = await User.findById(decoded.id).select('-password');
        if (req.user) return next();
      }

      // Mock user lookup fallback
      const mockUser = mockUsers.find(u => u._id === decoded.id) || mockUsers[0];
      req.user = {
        _id: mockUser._id,
        id: mockUser._id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
        hostelBlock: mockUser.hostelBlock,
        roomNo: mockUser.roomNo || '',
        staffUnit: mockUser.staffUnit || ''
      };
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided.' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `User role '${req.user ? req.user.role : 'none'}' is not authorized to access this route.` 
      });
    }
    next();
  };
};

export { JWT_SECRET };
