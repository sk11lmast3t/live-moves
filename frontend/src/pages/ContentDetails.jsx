import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { contentService, watchlistService } from '../services/contentService';

const ContentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadItem = async () => {
      setItem(null);
      setLoading(true);
      setError('');
      setSuccessMessage('');
      setErrorMessage('');

      try {
        const data = await contentService.getContentById(id);
        if (!cancelled) {
          setItem(data);
        }
      } catch (err) {
        if (!cancelled) {
          setItem(null);
          setError(err.response?.data?.message || err.message || 'Failed to load content');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadItem();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const addToWatchlist = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    setSuccessMessage('');
    setErrorMessage('');

    try {
      await watchlistService.addToWatchlist(id);
      setSuccessMessage('Added to watchlist');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Could not add to watchlist');
    }
  };

  return (
    <div className="bg-primary min-h-screen text-white">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading && <p className="text-gray-300">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {item && (
          <div className="grid md:grid-cols-3 gap-8">
            <img
              src={item.coverImage || item.posterImage || '/placeholder.jpg'}
              alt={item.title}
              className="rounded-lg w-full h-[460px] object-cover"
            />

            <div className="md:col-span-2 space-y-4">
              <h1 className="text-4xl font-bold">{item.title}</h1>
              <p className="text-gray-300">{item.description}</p>
              <p className="text-sm text-gray-400">
                {item.type} • {item.duration || 'N/A'} min • ⭐ {item.rating || 'N/A'}
              </p>

              <div className="flex gap-3">
                <button className="bg-secondary px-6 py-2 rounded-lg font-bold">▶ Play</button>
                <button onClick={addToWatchlist} className="bg-gray-700 px-6 py-2 rounded-lg font-bold">+ Watchlist</button>
              </div>

              {successMessage && <p className="text-sm text-accent">{successMessage}</p>}
              {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ContentDetails;
