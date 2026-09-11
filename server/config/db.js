import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  // If MONGODB_URI is not provided or running on Vercel without Atlas URI, skip network attempt for instant response
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri || mongoUri.includes('127.0.0.1') || mongoUri.includes('localhost')) {
    if (process.env.VERCEL) {
      console.log('[Prototype Mode] Running on Vercel in instant in-memory mode.');
      return;
    }
  }

  if (mongoUri) {
    try {
      const db = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 1500
      });
      isConnected = db.connections[0].readyState === 1;
      console.log(`[MongoDB] Connected to database at ${mongoUri}`);
    } catch (err) {
      console.log('[MongoDB] URI connection failed, falling back to mock mode.');
    }
  }
};
