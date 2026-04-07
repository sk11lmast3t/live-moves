import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await tmdbClient.get('/trending/movie/week', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error.message);
    throw error;
  }
};

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbClient.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error.message);
    throw error;
  }
};

export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await tmdbClient.get('/movie/top_rated', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top rated movies:', error.message);
    throw error;
  }
};

export const getTrendingTV = async (page = 1) => {
  try {
    const response = await tmdbClient.get('/trending/tv/week', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending TV:', error.message);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbClient.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    throw error;
  }
};

export const getTVDetails = async (tvId) => {
  try {
    const response = await tmdbClient.get(`/tv/${tvId}`, {
      params: {
        append_to_response: 'credits,videos',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching TV details:', error.message);
    throw error;
  }
};

export const searchContent = async (query, page = 1) => {
  try {
    const response = await tmdbClient.get('/search/multi', {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching content:', error.message);
    throw error;
  }
};

export const getImageUrl = (path, size = 'w342') => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
