import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Content from './src/models/Content.js';

dotenv.config();

const mockMovies = [
  {
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    type: 'movie',
    genres: ['Drama'],
    director: ['Frank Darabont'],
    cast: ['Tim Robbins', 'Morgan Freeman'],
    duration: 142,
    releaseDate: new Date('1994-10-14'),
    rating: 4.8,
    posterImage: 'https://image.tmdb.org/t/p/w342/q6y0Go1tsGEsmJFQnfEvj4v0oZO.jpg',
    coverImage: 'https://image.tmdb.org/t/p/w1280/9hN6UlYEk4dS7qEFRqoH0DjM32P.jpg',
    views: 150000,
    isTrending: true,
    isFeatured: true,
    availability: { isAvailable: true, platforms: ['StreamBox'] },
  },
  {
    title: 'The Dark Knight',
    description: 'The Caped Crusader fights to protect Gotham from the Joker, a criminal mastermind.',
    type: 'movie',
    genres: ['Action', 'Crime'],
    director: ['Christopher Nolan'],
    cast: ['Christian Bale', 'Heath Ledger'],
    duration: 152,
    releaseDate: new Date('2008-07-18'),
    rating: 4.9,
    posterImage: 'https://image.tmdb.org/t/p/w342/1hf3h4exepR0LjfZAJRc9Yg6EWJ.jpg',
    coverImage: 'https://image.tmdb.org/t/p/w1280/l25UXT011KakLECf6zrAMyella7.jpg',
    views: 200000,
    isTrending: true,
    isFeatured: true,
    language: ['en'],
    availability: { isAvailable: true, platforms: ['StreamBox'] },
  },
  {
    title: 'Inception',
    description: 'A skilled thief who steals corporate secrets through dream-sharing technology.',
    type: 'movie',
    genres: ['Sci-Fi', 'Action'],
    director: ['Christopher Nolan'],
    cast: ['Leonardo DiCaprio', 'Ellen Page'],
    duration: 148,
    releaseDate: new Date('2010-07-16'),
    rating: 4.8,
    posterImage: 'https://image.tmdb.org/t/p/w342/VKcH2wJPVjZhMKxqCpRXDG3d3d9.jpg',
    coverImage: 'https://image.tmdb.org/t/p/w1280/s3TBrA08iwzaSKzjRuSe8PK7qfd.jpg',
    views: 180000,
    isTrending: true,
    isFeatured: true,
    language: ['en'],
    availability: { isAvailable: true, platforms: ['StreamBox'] },
  },
  {
    title: 'The Matrix',
    description: 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.',
    type: 'movie',
    genres: ['Sci-Fi', 'Action'],
    director: ['The Wachowskis'],
    cast: ['Keanu Reeves', 'Laurence Fishburne'],
    duration: 136,
    releaseDate: new Date('1999-03-31'),
    rating: 4.8,
    posterImage: 'https://image.tmdb.org/t/p/w342/k9FzcAtoFD8m0ePVaoh5XrXhd8z.jpg',
    coverImage: 'https://image.tmdb.org/t/p/w1280/iMK0sPzF9soxdQa4qv0L0LGXDBM.jpg',
    views: 160000,
    isTrending: false,
    isFeatured: true,
    language: ['en'],
    availability: { isAvailable: true, platforms: ['StreamBox'] },
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space to ensure humanity\'s survival.',
    type: 'movie',
    genres: ['Sci-Fi', 'Drama'],
    director: ['Christopher Nolan'],
    cast: ['Matthew McConaughey', 'Anne Hathaway'],
    duration: 169,
    releaseDate: new Date('2014-11-07'),
    rating: 4.8,
    posterImage: 'https://image.tmdb.org/t/p/w342/rAiY959yDXm6r9keFJCRqNAxCX1.jpg',
    coverImage: 'https://image.tmdb.org/t/p/w1280/3dL10yKztzHmKfcKlahofS6UXNF.jpg',
    views: 190000,
    isTrending: true,
    isFeatured: true,
    language: ['en'],
    availability: { isAvailable: true, platforms: ['StreamBox'] },
  },
  {
    title: 'Breaking Bad',
    description: 'A high school teacher turned drug manufacturer creates a criminal empire.',
    type: 'series',
    genres: ['Drama', 'Crime'],
    director: ['Vince Gilligan'],
    cast: ['Bryan Cranston', 'Aaron Paul'],
    duration: 47,
    releaseDate: new Date('2008-01-20'),
    rating: 4.9,
    posterImage: 'https://image.tmdb.org/t/p/w342/ggFHVNu6YYI5L9pRXII6UWwzU8r.jpg',
    coverImage: 'https://image.tmdb.org/t/p/w1280/ggFHVNu6YYI5L9pRXII6UWwzU8r.jpg',
    isTrending: true,
    isFeatured: true,
    language: ['en'],
    availability: { isAvailable: true, platforms: ['StreamBox'] },
  },
  {
    title: 'Stranger Things',
    description: 'When a young boy goes missing in a small town, his friends stumble upon a secret military experiment.',
    type: 'series',
    genres: ['Drama', 'Mystery', 'Sci-Fi'],
    director: ['The Duffer Brothers'],
    cast: ['Winona Ryder', 'David Harbour'],
    duration: 50,
    releaseDate: new Date('2016-07-15'),
    rating: 4.7,
    posterImage: 'https://image.tmdb.org/t/p/w342/mwSo1I9bJ-q7kUAP4VE3qXDR5PM.jpg',
    coverImage: 'https://image.tmdb.org/t/p/w1280/lEXeq6f7XH7fFEh7RY7d1KxnG6h.jpg',
    views: 210000,
    isTrending: true,
    isFeatured: true,
    language: ['en'],
    availability: { isAvailable: true, platforms: ['StreamBox'] },
  },
  {
    title: 'The Office',
    description: 'A comedy series about everyday office life at a paper company.',
    type: 'series',
    genres: ['Comedy'],
    director: ['Greg Daniels', 'Michael Schur'],
    cast: ['Steve Carell', 'Rainn Wilson'],
    duration: 22,
    releaseDate: new Date('2005-03-24'),
    rating: 4.6,
    posterImage: 'https://image.tmdb.org/t/p/w342/wfzchSH28Q59dAhMVVvrVY8V9y.jpg',
    coverImage: 'https://image.tmdb.org/t/p/w1280/6H9M6u9Yx3XUhqpqbfh45RfH5Qe.jpg',
    views: 170000,
    isTrending: false,
    isFeatured: true,
    language: ['en'],
    availability: { isAvailable: true, platforms: ['StreamBox'] },
  },
];

const createAdminUser = async () => {
  try {
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
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  }
};

const seedMovies = async () => {
  try {
    console.log('📽️ Seeding movies into database...');
    
    // Delete existing movies
    await Content.deleteMany({});
    
    // Insert mock movies
    await Content.insertMany(mockMovies);
    
    console.log(`✅ Successfully seeded ${mockMovies.length} movies!`);
  } catch (error) {
    console.error('❌ Error seeding movies:', error.message);
  }
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await createAdminUser();
    await seedMovies();
    
    await mongoose.disconnect();
    console.log('\n✅ Database seeded successfully! Refresh the app to see movies.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seed();
