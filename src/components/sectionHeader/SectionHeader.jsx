import React from 'react'
import SearchBox from '../Search'

function SectionHeader() {
  return (
    <div className='flex justify-between items-center  '>
      <div>
        <h1 className='text-3xl font-bold'>Products</h1>
        <p className='text-gray-400'>A 360 look at our products</p>
      </div>
      <div>
        <SearchBox />
      </div>
    </div>
  )
}

export default  SectionHeader