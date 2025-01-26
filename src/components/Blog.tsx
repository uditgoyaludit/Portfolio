import React, { useState } from 'react';

export function Blog() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const posts = [
    {
      title: "10 Essential Tips for Backend Development",
      date: "Mar 15, 2024",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      category: "Tech",
      excerpt: "Learn the most important practices for building robust backend systems."
    },
    {
      title: "Understanding System Architecture",
      date: "Mar 10, 2024",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      category: "Tutorial",
      excerpt: "A comprehensive guide to designing scalable system architectures."
    },
    {
      title: "Best Practices for API Design",
      date: "Mar 5, 2024",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      category: "Guide",
      excerpt: "Create clean, efficient, and developer-friendly APIs with these tips."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="space-y-4 text-center mb-16">
        <p className="text-blue-600 font-medium animate-slide-in">Blog</p>
        <h2 className="text-4xl font-bold text-gray-900 shimmer-text">Latest Articles</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts.map((post, index) => (
          <div 
            key={index} 
            className="group relative animate-slide-in"
            style={{ animationDelay: `${index * 150}ms` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="h-full rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap gap-2 sm:gap-0 sm:flex-nowrap justify-between items-center mb-4">
                  <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {post.excerpt}
                </p>

                <div className="mt-auto">
                  <button className="text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-300 inline-flex items-center">
                    Read More
                    <span className="ml-1 transform group-hover:translate-x-1 inline-block transition-transform duration-300">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {hoveredIndex === index && (
              <div className="absolute -inset-px rounded-xl border-2 border-blue-600 pointer-events-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}