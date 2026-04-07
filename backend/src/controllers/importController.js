import Content from '../models/Content.js';
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingTV,
  getImageUrl,
} from '../utils/tmdbService.js';

const mapTMDBToContent = (tmdbData, type) => {
  return {
    title: tmdbData.title || tmdbData.name,
    description: tmdbData.overview,
    type: type === 'movie' ? 'movie' : 'series',
    genres: [], // TMDB returns genre IDs, would need separate call to map to names
    director: tmdbData.director || 'Unknown',
    cast: [],
    duration: tmdbData.runtime || 0,
    releaseDate: new Date(tmdbData.release_date || tmdbData.first_air_date),
    rating: tmdbData.vote_average / 2, // Convert from 0-10 to 0-5
    posterImage: getImageUrl(tmdbData.poster_path),
    coverImage: getImageUrl(tmdbData.backdrop_path),
    views: 0,
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

export const importTrendingMovies = async (req, res) => {
  try {
    const { pages = 1 } = req.body;
    let imported = 0;
    let duplicates = 0;

    for (let page = 1; page <= pages; page++) {
      const data = await getTrendingMovies(page);

      for (const movie of data.results) {
        // Check if movie already exists
        const exists = await Content.findOne({ 'metadata.tmdbId': movie.id });
        if (exists) {
          duplicates++;
          continue;
        }

        const contentData = mapTMDBToContent(movie, 'movie');
        await Content.create(contentData);
        imported++;
      }
    }

    res.status(200).json({
      message: 'Trending movies imported successfully',
      imported,
      duplicates,
      total: imported + duplicates,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const importPopularMovies = async (req, res) => {
  try {
    const { pages = 1 } = req.body;
    let imported = 0;
    let duplicates = 0;

    for (let page = 1; page <= pages; page++) {
      const data = await getPopularMovies(page);

      for (const movie of data.results) {
        const exists = await Content.findOne({ 'metadata.tmdbId': movie.id });
        if (exists) {
          duplicates++;
          continue;
        }

        const contentData = mapTMDBToContent(movie, 'movie');
        await Content.create(contentData);
        imported++;
      }
    }

    res.status(200).json({
      message: 'Popular movies imported successfully',
      imported,
      duplicates,
      total: imported + duplicates,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const importTopRatedMovies = async (req, res) => {
  try {
    const { pages = 1 } = req.body;
    let imported = 0;
    let duplicates = 0;

    for (let page = 1; page <= pages; page++) {
      const data = await getTopRatedMovies(page);

      for (const movie of data.results) {
        const exists = await Content.findOne({ 'metadata.tmdbId': movie.id });
        if (exists) {
          duplicates++;
          continue;
        }

        const contentData = mapTMDBToContent(movie, 'movie');
        await Content.create(contentData);
        imported++;
      }
    }

    res.status(200).json({
      message: 'Top rated movies imported successfully',
      imported,
      duplicates,
      total: imported + duplicates,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const importTrendingTV = async (req, res) => {
  try {
    const { pages = 1 } = req.body;
    let imported = 0;
    let duplicates = 0;

    for (let page = 1; page <= pages; page++) {
      const data = await getTrendingTV(page);

      for (const tv of data.results) {
        const exists = await Content.findOne({ 'metadata.tmdbId': tv.id });
        if (exists) {
          duplicates++;
          continue;
        }

        const contentData = mapTMDBToContent(tv, 'tv');
        await Content.create(contentData);
        imported++;
      }
    }

    res.status(200).json({
      message: 'Trending TV shows imported successfully',
      imported,
      duplicates,
      total: imported + duplicates,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const importAllContent = async (req, res) => {
  try {
    const result = {
      trending: {},
      popular: {},
      topRated: {},
      trendingTV: {},
    };

    // Import trending movies
    const trendingData = await getTrendingMovies(1);
    for (const movie of trendingData.results.slice(0, 10)) {
      const exists = await Content.findOne({ 'metadata.tmdbId': movie.id });
      if (!exists) {
        await Content.create(mapTMDBToContent(movie, 'movie'));
        result.trending.imported = (result.trending.imported || 0) + 1;
      }
    }

    // Import popular movies
    const popularData = await getPopularMovies(1);
    for (const movie of popularData.results.slice(0, 10)) {
      const exists = await Content.findOne({ 'metadata.tmdbId': movie.id });
      if (!exists) {
        await Content.create(mapTMDBToContent(movie, 'movie'));
        result.popular.imported = (result.popular.imported || 0) + 1;
      }
    }

    // Import top rated movies
    const topRatedData = await getTopRatedMovies(1);
    for (const movie of topRatedData.results.slice(0, 10)) {
      const exists = await Content.findOne({ 'metadata.tmdbId': movie.id });
      if (!exists) {
        await Content.create(mapTMDBToContent(movie, 'movie'));
        result.topRated.imported = (result.topRated.imported || 0) + 1;
      }
    }

    // Import trending TV
    const trendingTVData = await getTrendingTV(1);
    for (const tv of trendingTVData.results.slice(0, 10)) {
      const exists = await Content.findOne({ 'metadata.tmdbId': tv.id });
      if (!exists) {
        await Content.create(mapTMDBToContent(tv, 'series'));
        result.trendingTV.imported = (result.trendingTV.imported || 0) + 1;
      }
    }

    const totalImported = Object.values(result).reduce(
      (sum, cat) => sum + (cat.imported || 0),
      0
    );

    res.status(200).json({
      message: 'Content imported from TMDB',
      totalImported,
      breakdown: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
