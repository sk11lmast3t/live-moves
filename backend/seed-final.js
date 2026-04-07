import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete and recreate admin user
    const userCollection = mongoose.connection.collection('users');
    await userCollection.deleteMany({ email: 'admin@streambox.com' });
    
    const hashedPassword = await bcryptjs.hash('admin123', 10);
    await userCollection.insertOne({
      username: 'admin',
      email: 'admin@streambox.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('✅ Admin user created');

    // Insert movies directly into collection
    const contentCollection = mongoose.connection.collection('contents');
    await contentCollection.deleteMany({});
    
    const movies = [
      { title: 'The Shawshank Redemption', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption.', type: 'movie', genres: ['Drama'], duration: 142, rating: 4.8, views: 150000, isTrending: true, isFeatured: true, coverImage: 'https://image.tmdb.org/t/p/w500/9hN6UlYEk4dS7qEFRqoH0DjM32P.jpg', availability: { isAvailable: true, platforms: ['StreamBox'] } },
      { title: 'The Dark Knight', description: 'The Caped Crusader fights to protect Gotham from the Joker.', type: 'movie', genres: ['Action'], duration: 152, rating: 4.9, views: 200000, isTrending: true, isFeatured: true, coverImage: 'https://image.tmdb.org/t/p/w500/l25UXT011KakLECf6zrAMyella7.jpg', availability: { isAvailable: true, platforms: ['StreamBox'] } },
      { title: 'Inception', description: 'A skilled thief who steals corporate secrets through dream-sharing technology.', type: 'movie', genres: ['Sci-Fi'], duration: 148, rating: 4.8, views: 180000, isTrending: true, isFeatured: true, coverImage: 'https://image.tmdb.org/t/p/w500/s3TBrA08iwzaSKzjRuSe8PK7qfd.jpg', availability: { isAvailable: true, platforms: ['StreamBox'] } },
      { title: 'The Matrix', description: 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.', type: 'movie', genres: ['Sci-Fi', 'Action'], duration: 136, rating: 4.8, views: 160000, isTrending: false, isFeatured: true, coverImage: 'https://image.tmdb.org/t/p/w500/k9FzcAtoFD8m0ePVaoh5XrXhd8z.jpg', availability: { isAvailable: true, platforms: ['StreamBox'] } },
      { title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space to ensure humanity survival.', type: 'movie', genres: ['Sci-Fi'], duration: 169, rating: 4.8, views: 190000, isTrending: true, isFeatured: true, coverImage: 'https://image.tmdb.org/t/p/w500/3dL10yKztzHmKfcKlahofS6UXNF.jpg', availability: { isAvailable: true, platforms: ['StreamBox'] } },
      { title: 'Breaking Bad', description: 'A high school teacher turned drug manufacturer creates a criminal empire.', type: 'series', genres: ['Drama'], duration: 47, rating: 4.9, views: 220000, isTrending: true, isFeatured: true, coverImage: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pRXII6UWwzU8r.jpg', availability: { isAvailable: true, platforms: ['StreamBox'] } },
      { title: 'Stranger Things', description: 'When a young boy goes missing, his friends stumble upon a secret military experiment.', type: 'series', genres: ['Drama'], duration: 50, rating: 4.7, views: 210000, isTrending: true, isFeatured: true, coverImage: 'https://image.tmdb.org/t/p/w500/lEXeq6f7XH7fFEh7RY7d1KxnG6h.jpg', availability: { isAvailable: true, platforms: ['StreamBox'] } },
      { title: 'The Office', description: 'A comedy series about everyday office life at a paper company.', type: 'series', genres: ['Comedy'], duration: 22, rating: 4.6, views: 170000, isTrending: false, isFeatured: true, coverImage: 'https://image.tmdb.org/t/p/w500/6H9M6u9Yx3XUhqpqbfh45RfH5Qe.jpg', availability: { isAvailable: true, platforms: ['StreamBox'] } },
      { title: 'Pulp Fiction', description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales.', type: 'movie', genres: ['Crime', 'Drama'], duration: 154, rating: 4.8, views: 175000, isTrending: true, isFeatured: true, coverImage: 'https://image.tmdb.org/t/p/w500/d5iIlW_sdue26t9ejkxw5zxX4v8.jpg', availability: { isAvailable: true, platforms: ['StreamBox'] } },
      { title: 'Forrest Gump', description: 'The presidencies of Kennedy and Johnson unfold from the perspective of an Alabama man with an IQ of 75.', type: 'movie', genres: ['Drama'], duration: 142, rating: 4.8, views: 185000, isTrending: false, isFeatured: true, coverImage: 'https://image.tmdb.org/t/p/w500/arw2sxc0M0w9pIY2vXlTDusvuSd.jpg', availability: { isAvailable: true, platforms: ['StreamBox'] } },
    ];

    await contentCollection.insertMany(movies);
    console.log(`✅ Added ${movies.length} movies`);

    await mongoose.disconnect();
    console.log('✅ Done! Refresh your app to see movies.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seed();
