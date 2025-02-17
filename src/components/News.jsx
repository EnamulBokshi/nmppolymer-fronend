import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetNews } from '../hooks/useNews';
import { useInView } from 'react-intersection-observer';

// ✅ Extracted NewsCard Component
const NewsCard = ({ newsItem, isLeft }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const itemVariants = {
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white shadow-lg rounded-xl cursor-pointer overflow-hidden flex flex-col md:flex-row transition-transform transform hover:scale-[1.05] hover:shadow-xl"
      variants={itemVariants}
      initial={isLeft ? 'hiddenLeft' : 'hiddenRight'}
      animate={inView ? 'visible' : undefined}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="md:w-1/3">
        <img
          src={newsItem.image || 'https://via.placeholder.com/300x200'}
          alt={newsItem.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-6 flex flex-col justify-between md:w-2/3">
        <h3 className="text-2xl font-semibold text-gray-800 hover:text-red-600 transition-colors duration-300">{newsItem.title}</h3>
        <p className="text-gray-700 mt-2">{newsItem.content.slice(0, 150)}...</p>
        <div className="mt-4 flex justify-between text-gray-500 text-sm">
          <span className="flex items-center">📅 {new Date(newsItem.created_at).toLocaleDateString()}</span>
          <span className="flex items-center">✍️ {newsItem.author_name.toUpperCase() || 'Unknown'}</span>
        </div>
      </div>
    </motion.div>
  );
};

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 5;
  const { data: news, isLoading, error } = useGetNews();

  useEffect(() => {
    if (news?.length) {
        console.log(news)
      setNewsList(news.slice((currentPage - 1) * newsPerPage, currentPage * newsPerPage));
    }
  }, [news, currentPage]);

  const totalPages = Math.ceil((news?.length || 0) / newsPerPage);

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Latest News</h2>

      {isLoading && <div className="text-center text-gray-500">Loading news...</div>}
      {error && <div className="text-red-500 text-center">Error: {error.message}</div>}

      <motion.div className="space-y-6">
        <AnimatePresence>
          {newsList?.map((newsItem, index) => (
            <NewsCard key={newsItem.id} newsItem={newsItem} isLeft={index % 2 === 0} />
          ))}
        </AnimatePresence>
      </motion.div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-red-100 hover:bg-red-300 text-gray-700 font-bold py-2 px-4 rounded-l disabled:opacity-50"
          >
            Prev
          </button>
          <span className="bg-gray-200 text-gray-700 font-bold py-2 px-6">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-red-100 hover:bg-red-300 text-gray-700 font-bold py-2 px-4 rounded-r disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
