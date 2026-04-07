import mongoose from 'mongoose';

let connectionPromise = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI)
      .then(() => {
        console.log('✅ MongoDB connected successfully');
        return mongoose.connection;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection failed:', error.message);
        connectionPromise = null;
        throw error;
      });
  }

  await connectionPromise;

  if (mongoose.connection.readyState !== 1) {
    connectionPromise = null;
    throw new Error('MongoDB connection was not established');
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
