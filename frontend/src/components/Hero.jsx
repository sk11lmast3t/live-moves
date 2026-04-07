import React from 'react';
import { useNavigate } from 'react-router-dom';
import { watchlistService } from '../services/contentService';

const Hero = ({ featured }) => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');

  if (!featured) return null;

  const addToWatchlist = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    try {
      await watchlistService.addToWatchlist(featured._id);
      setMessage('Added to watchlist');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not add to watchlist');
    }
  };

  return (
    <div className="relative h-96 bg-black overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${featured.bannerImage || featured.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
      </div>

      <div className="relative h-full flex items-center px-8 md:px-16">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{featured.title}</h1>
          <p className="text-gray-300 text-lg mb-8 line-clamp-3">{featured.description}</p>

          <div className="flex space-x-4">
            <button
              onClick={() => navigate(`/content/${featured._id}`)}
              className="bg-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition flex items-center space-x-2"
            >
              <span>▶</span>
              <span>Play Now</span>
            </button>
            <button
              onClick={addToWatchlist}
              className="bg-gray-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-600 transition flex items-center space-x-2"
            >
              <span>+</span>
              <span>Add to Watchlist</span>
            </button>
          </div>

          {message && <p className="text-sm text-accent mt-2">{message}</p>}

          <div className="flex space-x-6 mt-4 text-sm text-gray-300">
            <span>📺 {featured.type}</span>
            <span>⏱️ {featured.duration} min</span>
            <span>⭐ {featured.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
