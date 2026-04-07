import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // Don't return password by default
    },
    firstName: String,
    lastName: String,
    profilePicture: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    preferences: {
      theme: {
        type: String,
        enum: ['light', 'dark', 'auto'],
        default: 'auto',
      },
      language: {
        type: String,
        default: 'en',
      },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
      },
      contentRatings: [String], // e.g., ['G', 'PG', 'PG-13']
    },
    subscription: {
      plan: {
        type: String,
        enum: ['free', 'basic', 'premium', 'vip'],
        default: 'free',
      },
      startDate: Date,
      endDate: Date,
      status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
      },
    },
    watchlist: [
      {
        contentId: mongoose.Schema.Types.ObjectId,
        addedAt: { type: Date, default: Date.now },
      },
    ],
    viewingHistory: [
      {
        contentId: mongoose.Schema.Types.ObjectId,
        watchedAt: { type: Date, default: Date.now },
        duration: Number, // in seconds
        progress: Number, // percentage watched (0-100)
      },
    ],
    ratings: [
      {
        contentId: mongoose.Schema.Types.ObjectId,
        rating: { type: Number, min: 1, max: 5 },
        ratedAt: { type: Date, default: Date.now },
      },
    ],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastLogin: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to get public profile
userSchema.methods.getPublicProfile = function () {
  const { password, ...profileData } = this.toObject();
  return profileData;
};

export default mongoose.model('User', userSchema);
