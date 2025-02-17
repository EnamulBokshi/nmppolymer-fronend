import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useGetNews, useCreateNews, useDeleteNews, useUpdateNews } from '../../../../hooks/useNews';

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // New state for image
  const [editing, setEditing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // News mutation hooks
  const { 
    data: fetchedNews,
    error: fetchNewsError,
    isPending: fetchNewsPending,
    refetch: fetchNews 
  } = useGetNews();

  const { 
    mutate: createNews,
    error: createNewsError,
    isPending: createNewsPending 
  } = useCreateNews();

  const { 
    mutate: deleteNews,
    error: deleteNewsError 
  } = useDeleteNews();

  const { 
    mutate: updateNews,
    error: updateNewsError,
    isPending: updateNewsLoading 
  } = useUpdateNews();

  useEffect(() => {
    if (fetchedNews) {
      setNewsList(fetchedNews);
    }
  }, [fetchedNews]);

  useEffect(() => {
    if (fetchNewsError) {
      setError(fetchNewsError.message);
      toast.error('Failed to fetch news');
    }
  }, [fetchNewsError]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAddNews = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
      console.log('formData', formData);
       createNews(formData,{
          onSuccess: () => {
            resetForm();
            fetchNews(); // Refresh news list
            toast.success('News added successfully');
          },
          onError: () => {
            toast.error('Failed to add news');
          }
       });
       if(createNewsError) {
          console.log('createNewsError', createNewsError);
       }
      // resetForm();
       fetchNews(); // Refresh news list
      toast.success('News added successfully');
    } catch (err) {
      toast.error('Failed to add news');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNews = async (id) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
       updateNews({ id, formData });

       console.log('Form data: ',formData)
       if(updateNewsError) {
          console.log('updateNewsError', updateNewsError);
       }
      resetForm();
       fetchNews(); // Refresh news list
      toast.success('News updated successfully');
    } catch (err) {
      toast.error('Failed to update news');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news?')) return;
    
    try {
      setIsLoading(true);
       deleteNews(id);
       fetchNews(); // Refresh news list
      toast.success('News deleted successfully');
    } catch (err) {
      toast.error('Failed to delete news');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setImage(null);
    setEditing(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      handleUpdateNews(editing);
    } else {
      handleAddNews();
    }
  };

  const handleEdit = (news) => {
    setTitle(news.title);
    setContent(news.content);
    setEditing(news.id);
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error: {error}
        <button 
          onClick={fetchNews}
          className="ml-4 underline hover:text-red-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">News Management</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          disabled={isLoading || createNewsPending || updateNewsLoading}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-blue-500 outline-none"
          disabled={isLoading || createNewsPending || updateNewsLoading}
        />
        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          disabled={isLoading || createNewsPending || updateNewsLoading}
        />
        <div className="flex gap-4">
          <button 
            type="submit"
            disabled={isLoading || createNewsPending || updateNewsLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading || createNewsPending || updateNewsLoading
              ? 'Processing...'
              : editing
                ? 'Update News'
                : 'Add News'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        <motion.div className="space-y-4">
          {newsList.map((news) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
              <p className="text-gray-600 mb-4">{news.content}</p>
              {/* Display Image */}
              {news.image && (
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(news)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteNews(news.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default News;