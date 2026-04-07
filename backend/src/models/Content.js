import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['movie', 'series', 'anime', 'music', 'documentary', 'education', 'shortfilm'],
      required: true,
    },
    genres: [String],
    tags: [String],
    posterImage: String, // Movie poster
    coverImage: String,
    bannerImage: String,
    thumbnail: String,
    duration: Number, // in minutes, null for series
    releaseDate: Date,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    contentRating: {
      type: String,
      enum: ['G', 'PG', 'PG-13', '14+', 'R', '18+'],
      default: 'PG-13',
    },
    director: [String],
    cast: [String],
    language: [String],
    subtitles: [String],
    availability: {
      isAvailable: { type: Boolean, default: true },
      startDate: Date,
      endDate: Date,
      regions: [{ type: String, default: 'all' }],
      platforms: [String], // Streaming platforms (Netflix, Disney+, etc)
      streamingUrl: String, // URL to stream the content
    },
    videoQualities: [
      {
        quality: { type: String, enum: ['480p', '720p', '1080p', '2K', '4K'] },
        videoUrl: String,
        bitrate: Number, // in kbps
        size: Number, // in MB
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    userRatings: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        rating: { type: Number, min: 1, max: 5 },
        ratedAt: { type: Date, default: Date.now },
      },
    ],
    episodes: [
      {
        episodeNumber: Number,
        seasonNumber: Number,
        title: String,
        description: String,
        duration: Number,
        releaseDate: Date,
        videoUrl: String,
        thumbnail: String,
      },
    ],
    isPopular: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    keywords: [String], // For SEO and search
    metadata: {
      tmdbId: Number, // TMDB database ID for syncing
      tmdbType: String, // 'movie' or 'tv'
      popularity: Number,
      voteCount: Number,
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

// Index for search optimization
contentSchema.index({ title: 'text', description: 'text', keywords: 'text' });
contentSchema.index({ genres: 1 });
contentSchema.index({ type: 1 });
contentSchema.index({ isTrending: -1 });

export default mongoose.model('Content', contentSchema);
