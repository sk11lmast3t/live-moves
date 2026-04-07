import React from 'react';

const ContentCard = ({ content, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 cursor-pointer group"
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={content.coverImage || '/placeholder.jpg'}
          alt={content.title}
          className="w-full h-full object-cover group-hover:brightness-75 transition"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
          <button className="opacity-0 group-hover:opacity-100 transition bg-secondary text-white px-6 py-3 rounded-full font-bold">
            ▶ Play
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-bold text-lg truncate">{content.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-400">{content.type}</span>
          <div className="flex items-center">
            <span className="text-accent">★</span>
            <span className="text-white ml-1">{content.rating || 'N/A'}</span>
          </div>
        </div>
        <p className="text-gray-400 text-xs mt-2 line-clamp-2">{content.description}</p>
      </div>
    </div>
  );
};

export default ContentCard;
