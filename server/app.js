import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import messRoutes from './routes/messRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import transparencyRoutes from './routes/transparencyRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint (always accessible regardless of DB connection state)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    name: 'CampusVoice Operational Infrastructure API', 
    version: '1.0.0', 
    vercel: !!process.env.VERCEL,
    mongoConnected: !!process.env.MONGODB_URI
  });
});

// Ensure DB connection for API routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ 
      message: 'Database connection unavailable. On Vercel, please set MONGODB_URI environment variable in your Vercel Project Settings.' 
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/mess', messRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/transparency', transparencyRoutes);

export default app;
