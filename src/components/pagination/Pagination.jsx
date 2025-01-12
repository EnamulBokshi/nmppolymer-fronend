import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
function Pagination() {
  return (
    <div className='flex justify-between items-center mt-10'>
      <div className=' space-x-4 flex items-center'>
      <button className='rounded-full hover:bg-red-700 duration-200 hover:text-white p-2 bg-gray-200 text-red-700 ring ring-red-700 '>
        <FaArrowLeft />
      </button>
      <button className='rounded-full hover:bg-red-700 duration-200 hover:text-white p-2 bg-gray-200 text-red-700 ring ring-red-700 '>
        <FaArrowRight />
      </button>
      <a href="#" className='text-red-700 ms-5 uppercase font-serif font-bold'>See ALL</a>
      </div>
      <div>
        <h2 className='text-3xl font-serif'>
          <span className='text-red-600'>70</span>
          /
          <span className='text-gray-500'>100</span>
        </h2>
      </div>
    </div>
  )
}

export default Pagination