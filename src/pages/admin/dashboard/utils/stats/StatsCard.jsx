import React, { Children } from 'react'

function StatsCard({title, value, icon,comment}) {
  return (
    <div className='p-5 rounded-lg  border border-neutral-300 flex flex-col flex-wrap bg-white shadow-md'>
        <div className='flex justify-between items-center pb-5'>
        <div className='rounded-lg p-3 flex items-center justify-center bg-black text-white'>
            {icon}
        </div>
        <div className='flex flex-col items-end gap-1'>
            <span className='text-gray-500 text-xl font-serif '>{title}</span>
            <span className='text-gray-900 font-bold text-xl font-serif'>{value}</span>
        </div>
        </div>
        <div className='pt-5 border-t  border-neutral-200'>
            <div>{comment}</div>
        </div>
    </div>
  )
}

export default StatsCard