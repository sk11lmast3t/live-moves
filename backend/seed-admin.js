import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Content from './src/models/Content.js';
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingTV,
  getImageUrl,
} from './src/utils/tmdbService.js';

dotenv.config();

const mapTMDBToContent = (tmdbData, type) => {
  return {
    title: tmdbData.title || tmdbData.name,
    description: tmdbData.overview,
    type: type === 'movie' ? 'movie' : 'series',
    genres: [],
    director: 'Unknown',
    cast: [],
    duration: tmdbData.runtime || 120,
    releaseDate: new Date(tmdbData.release_date || tmdbData.first_air_date),
    rating: (tmdbData.vote_average || 0) / 2,
    posterImage: getImageUrl(tmdbData.poster_path),
    coverImage: getImageUrl(tmdbData.backdrop_path),
    views: Math.floor(Math.random() * 10000),
    isTrending: true,
    isFeatured: tmdbData.vote_average >= 8.0,
    comments: [],
    availability: {
      isAvailable: true,
      platforms: ['StreamBox'],
      streamingUrl: `https://streaming.example.com/watch/${tmdbData.id}`,
    },
    metadata: {
      tmdbId: tmdbData.id,
      tmdbType: type,
      popularity: tmdbData.popularity,
      voteCount: tmdbData.vote_count,
    },
  };
};

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing admin (fresh start)
    await User.deleteOne({ email: 'admin@streambox.com' });
    
    // Hash password
    const hashedPassword = await bcryptjs.hash('admin123', 10);

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@streambox.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isVerified: true,
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully');
    console.log('📧 Email: admin@streambox.com');
    console.log('🔑 Password: admin123');
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  }
};

const seedMovies = async () => {
  try {
    console.log('\n📽️ Starting to import movies from TMDB...');
    let totalImported = 0;

    // Import trending movies
    console.log('Fetching trending movies...');
    const trendingMovies = await getTrendingMovies(1);
    for (const movie of trendingMovies.results.slice(0, 5)) {
      const exists = await Content.findOne({ 'metadata.tmdbId': movie.id });
      if (!exists) {
        await Content.create(mapTMDBToContent(movie, 'movie'));
        totalImported++;
      }
    }
    console.log(`✅ Imported ${totalImported} trending movies`);

    // Import popular movies
    console.log('Fetching popular movies...');
    const popularMovies = await getPopularMovies(1);
    for (const movie of popularMovies.results.slice(0, 5)) {
      const exists = await Content.findOne({ 'metadata.tmdbId': movie.id });
      if (!exists) {
        await Content.create(mapTMDBToContent(movie, 'movie'));
        totalImported++;
      }
    }
    console.log(`✅ Imported more popular movies (total: ${totalImported})`);

    // Import top rated movies
    console.log('Fetching top-rated movies...');
    const topRatedMovies = await getTopRatedMovies(1);
    for (const movie of topRatedMovies.results.slice(0, 5)) {
      const exists = await Content.findOne({ 'metadata.tmdbId': movie.id });
      if (!exists) {
        await Content.create(mapTMDBToContent(movie, 'movie'));
        totalImported++;
      }
    }
    console.log(`✅ Imported top-rated movies (total: ${totalImported})`);

    // Import trending TV
    console.log('Fetching trending TV shows...');
    const trendingTV = await getTrendingTV(1);
    for (const tv of trendingTV.results.slice(0, 5)) {
      const exists = await Content.findOne({ 'metadata.tmdbId': tv.id });
      if (!exists) {
        await Content.create(mapTMDBToContent(tv, 'tv'));
        totalImported++;
      }
    }
    console.log(`✅ Imported TV shows (total: ${totalImported})`);

    console.log(`\n✅ Successfully imported ${totalImported} movies/shows!`);
  } catch (error) {
    console.error('❌ Error seeding movies:', error.message);
  }
};

const seed = async () => {
  try {
    await createAdminUser();
    await seedMovies();
    await mongoose.disconnect();
    console.log('\n✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seed();
