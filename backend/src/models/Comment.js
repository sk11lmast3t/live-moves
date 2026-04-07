import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 5000,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    replies: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    isApproved: {
      type: Boolean,
      default: true,
    },
    isSpam: {
      type: Boolean,
      default: false,
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

export default mongoose.model('Comment', commentSchema);
