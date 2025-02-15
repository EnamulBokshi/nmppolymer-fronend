import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBox({ handleChange,value}) {
  return (
    <div className="relative inline-block">
      <input
        type="text"
        className="px-8 py-2 rounded-lg"
        placeholder="search..."
        value={value}
        onChange={handleChange}
      />
      <FaSearch className="absolute top-3 left-2 text-gray-400" />
    </div>
  );
}

export default SearchBox;
