import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContentGrid from '../components/ContentGrid';
import { contentService } from '../services/contentService';

const Home = () => {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const [trendingData, featuredData, moviesData, showsData] = await Promise.all([
          contentService.getTrending(),
          contentService.getFeatured(),
          contentService.getAllContent({ type: 'movie', limit: 10 }),
          contentService.getAllContent({ type: 'series', limit: 10 }),
        ]);

        setTrending(trendingData);
        setFeatured(featuredData[0]);
        setMovies(moviesData.content || []);
        setShows(showsData.content || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="bg-primary min-h-screen text-white">
      <Navbar />
      {featured && <Hero featured={featured} />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContentGrid title="Trending Now" content={trending} loading={loading} error={error} onItemClick={(item) => navigate(`/content/${item._id}`)} />
        <ContentGrid title="Popular Movies" content={movies} loading={loading} error={error} onItemClick={(item) => navigate(`/content/${item._id}`)} />
        <ContentGrid title="Top Shows" content={shows} loading={loading} error={error} onItemClick={(item) => navigate(`/content/${item._id}`)} />
      </main>
    </div>
  );
};

export default Home;
