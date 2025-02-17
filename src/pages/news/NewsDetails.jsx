import React from "react";
import { useParams } from "react-router";
import { useGetNewsDetails } from "../../hooks/useNews";
import { Boilerplate } from "../../components";

function NewsDetails() {
  const { id } = useParams();
  const { data: news, error, isLoading } = useGetNewsDetails(id);

  if (isLoading) {
    return (
      <Boilerplate>
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-gray-500">Loading news details...</p>
        </div>
      </Boilerplate>
    );
  }

  if (error) {
    return (
      <Boilerplate>
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-red-500">Error: {error.message}</p>
        </div>
      </Boilerplate>
    );
  }

  return (
    <Boilerplate>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {/* News Image */}
          <img
            src={news?.image || "https://via.placeholder.com/800x400"}
            alt={news?.title}
            className="w-full h-64 object-cover rounded-lg"
          />

          <div className="bg-violet-300 rounded-lg p-5 text-white mt-5">
            {/* News Title */}
            <h1 className="text-3xl font-bold text-gray-800 mt-6 font-sans">
              {news?.title}
            </h1>

            {/* Metadata */}
            <div className="flex justify-between items-center  text-gray-600 text-sm mt-3">
              <span>📅 {new Date(news?.created_at).toLocaleDateString()}</span>
              <span>✍️ {news?.author_name || "Unknown"}</span>
            </div>

            {/* News Content */}
            <p className="text-gray-700 leading-relaxed mt-6">
              {news?.content}
            </p>
          </div>
        </div>
      </div>
    </Boilerplate>
  );
}

export default NewsDetails;
