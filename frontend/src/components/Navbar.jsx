import React from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-primary border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <span className="text-3xl font-bold text-secondary">StreamBox</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="/" className="text-white hover:text-secondary transition">Home</a>
              <a href="/movies" className="text-white hover:text-secondary transition">Movies</a>
              <a href="/shows" className="text-white hover:text-secondary transition">Shows</a>
              <a href="/trending" className="text-white hover:text-secondary transition">Trending</a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="hidden md:block px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button className="text-white hover:text-secondary transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m2-1l-2-1m2 1v2.5" />
              </svg>
            </button>
            <button className="text-white hover:text-secondary transition">Profile</button>
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
            <a href="/" className="block text-white hover:text-secondary transition py-2">Home</a>
            <a href="/movies" className="block text-white hover:text-secondary transition py-2">Movies</a>
            <a href="/shows" className="block text-white hover:text-secondary transition py-2">Shows</a>
            <a href="/trending" className="block text-white hover:text-secondary transition py-2">Trending</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
