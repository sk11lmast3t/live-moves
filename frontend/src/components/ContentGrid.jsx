import React from 'react';
import ContentCard from './ContentCard';

const ContentGrid = ({ title, content, loading, error, onItemClick }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-secondary rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading content: {error}</p>
      </div>
    );
  }

  if (!content || content.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No content available</p>
      </div>
    );
  }

  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {content.map((item) => (
          <ContentCard
            key={item._id}
            content={item}
            onClick={() => onItemClick?.(item)}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentGrid;
