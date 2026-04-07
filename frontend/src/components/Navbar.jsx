import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  `hover:text-secondary transition ${isActive ? 'text-secondary' : 'text-white'}`;

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const onSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-primary border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <Link to="/" className="text-3xl font-bold text-secondary">StreamBox</Link>
            </div>
            <div className="hidden md:flex space-x-6">
              <NavLink to="/" className={linkClass}>Home</NavLink>
              <NavLink to="/movies" className={linkClass}>Movies</NavLink>
              <NavLink to="/shows" className={linkClass}>Shows</NavLink>
              <NavLink to="/trending" className={linkClass}>Trending</NavLink>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={onSearch}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="hidden md:block px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </form>
            <button onClick={() => navigate('/login')} className="text-white hover:text-secondary transition">Profile</button>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-secondary transition py-2">Home</NavLink>
            <NavLink to="/movies" onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-secondary transition py-2">Movies</NavLink>
            <NavLink to="/shows" onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-secondary transition py-2">Shows</NavLink>
            <NavLink to="/trending" onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-secondary transition py-2">Trending</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
