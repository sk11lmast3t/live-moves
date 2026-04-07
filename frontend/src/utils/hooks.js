import React, { useState, useEffect } from 'react';
import { contentService } from '../services/contentService';

export const useContent = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContent = async (params = {}) => {
    setLoading(true);
    try {
      const data = await contentService.getAllContent(params);
      setContent(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { content, loading, error, fetchContent };
};

export const useTrending = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const data = await contentService.getTrending();
        setTrending(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return { trending, loading, error };
};
