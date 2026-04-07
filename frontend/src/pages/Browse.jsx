import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ContentGrid from '../components/ContentGrid';
import { contentService } from '../services/contentService';

const PAGE_CONFIG = {
  '/movies': { title: 'Movies', params: { type: 'movie', limit: 30 } },
  '/shows': { title: 'Shows', params: { type: 'series', limit: 30 } },
  '/trending': { title: 'Trending', params: { limit: 30 }, trending: true },
};

const Browse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { title, params, trending } = useMemo(() => {
    const baseConfig = PAGE_CONFIG[location.pathname] || { title: 'Browse', params: { limit: 30 } };
    const query = new URLSearchParams(location.search);
    const search = query.get('q');

    if (search) {
      return {
        title: `Search results for "${search}"`,
        params: { ...baseConfig.params, search },
        trending: false,
      };
    }

    return baseConfig;
  }, [location.pathname, location.search]);

  useEffect(() => {
    let cancelled = false;

    const loadContent = async () => {
      setLoading(true);
      setError('');

      try {
        const data = trending
          ? await contentService.getTrending()
          : await contentService.getAllContent(params);

        if (!cancelled) {
          setContent(Array.isArray(data) ? data : data.content || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || err.message || 'Failed to load content');
          setContent([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      cancelled = true;
    };
  }, [params, trending]);

  return (
    <div className="bg-primary min-h-screen text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ContentGrid
          title={title}
          content={content}
          loading={loading}
          error={error}
          onItemClick={(item) => navigate(`/content/${item._id}`)}
        />
      </main>
    </div>
  );
};

export default Browse;
