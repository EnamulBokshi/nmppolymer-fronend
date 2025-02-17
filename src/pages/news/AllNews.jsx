import React, { useState, useEffect } from "react";
import { Boilerplate } from "../../components";
import { useGetNews } from "../../hooks/useNews";
import { useNavigate } from "react-router";

const AllNews = () => {
  const { data: news, isError, isLoading, error } = useGetNews();
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 1;
  const navigate = useNavigate();

  // Pagination Logic
  const totalPages = Math.ceil((news?.length || 0) / newsPerPage);
  const paginatedNews = news?.slice(
    (currentPage - 1) * newsPerPage,
    currentPage * newsPerPage
  );

  // Ensure page is within valid range
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  return (
    <Boilerplate>
      <div className="container mx-auto px-4 py-10">
        <div className="space-y-4 md:p-10">
          <h1 className="text-3xl font-bold mb-6 font-serif text-gray-800">
            Featured News
          </h1>
          {isLoading && (
            <div className="text-center text-gray-500">Loading news...</div>
          )}
          {isError && (
            <div className="text-center text-red-500">
              Error: {error.message}
            </div>
          )}
          {news?.map((newsItem) => (
            <div
              key={newsItem.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-[1.03]"
                onClick={()=>navigate(`/news/${newsItem.id}`)}
            >
              <img
                src={newsItem.image || "https://via.placeholder.com/300"}
                alt="news"
                className="w-full h-32 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {newsItem.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {newsItem.content.slice(0, 150)}...
                </p>
                <div className="mt-3 flex justify-between text-gray-500 text-sm">
                  <span>
                    📅 {new Date(newsItem.created_at).toLocaleDateString()}
                  </span>
                  <span>✍️ {newsItem.author_name || "Unknown"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-6">
            All News 📰 
          </h1>

          {isLoading && (
            <div className="text-center text-gray-500">Loading news...</div>
          )}
          {isError && (
            <div className="text-center text-red-500">
              Error: {error?.message}
            </div>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedNews?.map((newsItem) => (
              <div
                key={newsItem.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-[1.03]"
              >
                <img
                  src={newsItem.image || "https://via.placeholder.com/300"}
                  alt="news"
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {newsItem.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3">
                    {newsItem.content.slice(0, 150)}...
                  </p>
                  <div className="mt-3 flex justify-between text-gray-500 text-sm">
                    <span>
                      📅 {new Date(newsItem.created_at).toLocaleDateString()}
                    </span>
                    <span>✍️ {newsItem.author_name || "Unknown"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-l disabled:opacity-50"
            >
              Prev
            </button>

            <span className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-r disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
      <div></div>
    </Boilerplate>
  );
};

export default AllNews;
