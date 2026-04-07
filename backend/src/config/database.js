import mongoose from 'mongoose';

let isConnecting = false;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (isConnecting) {
    return mongoose.connection;
  }

  isConnecting = true;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  } finally {
    isConnecting = false;
  }

  return mongoose.connection;
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};
