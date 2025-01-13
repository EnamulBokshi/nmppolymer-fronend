import React from 'react'
import { GoArrowUpRight } from "react-icons/go";
function Factory() {
  return (
    <div className='container mx-auto  bg-gray-100 p-6'>
      <h1 className="text-3xl font-bold mb-4 text-sky-700 uppercase ">Visit Our Factory</h1>
      <div className=''>
              <h1 className='lg:text-2xl cursor-pointer text-yellow-500'  onClick={()=>navigateTo('https://maps.app.goo.gl/j6DPYwQtLfxvF8cKA') }>NMP Polymer LLC. <GoArrowUpRight className='inline rounded-lg   text-red-700'/> </h1>
              <p>House: 1, Road: 1, Block: A, Kamrangirchar, Lalbag,</p>
              <p>Dhaka 1211, Bangladesh</p>
          </div>
    </div>
  )
}

export default Factory