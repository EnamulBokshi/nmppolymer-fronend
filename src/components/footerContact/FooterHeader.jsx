import React from 'react'
import { Link } from 'react-router'
import BtnPrimary from '../Buttons/BtnPrimary'

function FooterHeader() {
  return (
    <section className='flex pt-10 flex-wrap jusitfy-between gap-5 p-5 flex-col sm:flex-row sm:justify-evenly gap-y-5 sm:items-start'>
        <div className='flex  flex-col items-center'>
            <h1 className='text-3xl font-bold '>Store <span className='text-sky-700'> Locator </span> </h1>
            <p className='text-gray-400'>Locate us</p>
            {/* <BtnPrimary >Find a store</BtnPrimary> */}
            <Link to='/store' className='text-blue-100 px-5 py-2 bg-red-700 '>Find a store</Link>
        </div>
        <div className='flex  flex-col items-center '>
            <h1 className='text-3xl font-bold '>Contact <span className='text-sky-700'>Us</span></h1>
            <p className='text-gray-400'>We are here to help you</p>
            <Link to='/contact' className='text-blue-100 px-5 py-2 bg-red-700'>Contact us</Link>

        </div>        
    </section>
  )
}

export default FooterHeader