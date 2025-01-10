import React from 'react'

function BtnPrimary({children}) {
  return (
    <button className='px-6 py-3 rounded-lg bg-red-700 relative overflow-hidden group'>
        <span className='absolute inset-0 bg-red-800 scale-0 origin-bottom-left transition-transform duration-300 ease-out group-hover:scale-100'></span>
        <span className='relative text-white'>{children}</span>
    </button>
  )
}

export default BtnPrimary