import React from 'react'
import SearchBox from '../Search'

function SectionHeader({title, des, children}) {
  return (
    <div className='flex sm:flex-row flex-col gpa-y-3 justify-center sm:justify-between items-center  '>
      <div>
        <h1 className='text-3xl font-bold text-center sm:text-start'>Products</h1>
        <p className='text-gray-400'>A 360 look at our products</p>
      </div>
      <div className='mb-2 sm:mb-0'>
        <SearchBox />
      </div>
    </div>
  )
}

export default  SectionHeader