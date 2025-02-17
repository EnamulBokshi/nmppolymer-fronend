import React, { useState, useRef, useEffect } from 'react';
import { FiAlignLeft } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { TiTimesOutline } from "react-icons/ti";

function SearchBox({ value, onChange, callback, data = [] }) {
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryRef = useRef(null);

  // Close category modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategory(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='relative w-full max-w-md mx-auto'>
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        className='px-12 py-3 text-gray-700 rounded-lg w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none' 
        placeholder='Search...'
      />
      {
        !showCategory ? (
          <FiAlignLeft 
            className="absolute left-3 top-[50%] transform -translate-y-1/2 text-xl text-gray-500 cursor-pointer" 
            onClick={() => setShowCategory(!showCategory)}
          />
        ) : (
          <TiTimesOutline 
            className="absolute left-3 top-[50%] transform -translate-y-1/2 text-xl text-gray-500 cursor-pointer" 
            onClick={() => setShowCategory(false)}
          />
        )
      }
      <FaSearch className="absolute right-3 top-[50%] transform -translate-y-1/2 text-xl text-gray-500" />

      {/* Category Dropdown */}
      {showCategory && (
        <div 
          ref={categoryRef} 
          className="absolute top-12 left-0 p-4 w-56 bg-white shadow-md border border-gray-200 rounded-lg z-10"
        >  
          <div 
            className={`p-3 rounded cursor-pointer hover:bg-gray-100 ${!selectedCategory ? 'bg-gray-100' : ''}`} 
            onClick={() => {
              callback(null, null);
              setSelectedCategory(null);
              setShowCategory(false);
            }}
          >
            <h1 className="text-lg font-semibold">All Categories</h1>
          </div>
          {data?.map((category) => (
            <div 
              key={category.id} 
              className={`p-3 rounded cursor-pointer hover:bg-gray-100 ${selectedCategory === category.id ? 'bg-gray-100' : ''}`} 
              onClick={() => {
                callback(category.id, category.name);
                setSelectedCategory(category.id);
                setShowCategory(false);
              }}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
