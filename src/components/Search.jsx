import React from 'react'
import { FiAlignLeft } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

function SearchBox({ value, onChange }) {
  return (
    <div className='relative'>
      <input 
      type="text" 
      value={value} 
      onChange={onChange} 
      className='px-8 py-3 text-gray-500 rounded-lg w-full relative ' placeholder='Search...' />
      <FiAlignLeft className='absolute top-[15px] left-1 text-xl opacity-50' />
      <FaSearch className="absolute right-3 top-[15px]  text-xl opacity-50" />
    </div>
  )
}
export default SearchBox