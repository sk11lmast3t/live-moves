import apiClient from './api';

export const authService = {
  register: async (username, email, password, firstName, lastName) => {
    const response = await apiClient.post('/auth/register', {
      username,
      email,
      password,
      firstName,
      lastName,
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await apiClient.put('/auth/profile', data);
    return response.data;
  },
};

export const contentService = {
  getAllContent: async (params) => {
    const response = await apiClient.get('/content', { params });
    return response.data;
  },

  getContentById: async (id) => {
    const response = await apiClient.get(`/content/${id}`);
    return response.data;
  },

  getTrending: async () => {
    const response = await apiClient.get('/content/trending');
    return response.data;
  },

  getFeatured: async () => {
    const response = await apiClient.get('/content/featured');
    return response.data;
  },

  getRecommendations: async () => {
    const response = await apiClient.get('/content/recommendations');
    return response.data;
  },

  rateContent: async (id, rating) => {
    const response = await apiClient.post(`/content/${id}/rate`, { rating });
    return response.data;
  },
};

export const watchlistService = {
  getWatchlist: async () => {
    const response = await apiClient.get('/auth/watchlist');
    return response.data;
  },

  addToWatchlist: async (contentId) => {
    const response = await apiClient.post(`/auth/watchlist/${contentId}`);
    return response.data;
  },

  removeFromWatchlist: async (contentId) => {
    const response = await apiClient.delete(`/auth/watchlist/${contentId}`);
    return response.data;
  },
};
