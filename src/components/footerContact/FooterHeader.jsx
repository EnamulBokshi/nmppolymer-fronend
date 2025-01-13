import React from 'react'
import { Link } from 'react-router'
import BtnPrimary from '../Buttons/BtnPrimary'
import { FaSearch } from 'react-icons/fa'
import { AiFillContacts } from 'react-icons/ai'

function FooterHeader() {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-5 pb-20 pt-10 px-5'>
        <div className='flex  flex-col items-center '>
            
            <h1 className='text-3xl font-bold pb-1'><FaSearch className='inline me-2 text-red-700'/> Store <span className='text-sky-700'>  Locator </span> </h1>
            <p className='text-gray-400 font-bold'>Visit our store to collect your products</p>
            {/* <BtnPrimary >Find a store</BtnPrimary> */}
            <Link to='/store' className='text-red-700 px-5 py-2  font-bold underline text-xl  '>Find our store</Link>
        </div>
        <div className='flex  flex-col items-center '>
            <h1 className='text-3xl font-bold pb-1'> <AiFillContacts  className='inline me-2 text-red-700'/> Contact <span className='text-sky-700'>Us</span></h1>
            <p className='text-gray-400 font-bold'>We are here to help you</p>
            <p className='text-gray-400 font-bold'>Feel free to ask any questions</p>
            <Link to='/contact' className='text-red-700 px-5 py-2  font-bold underline text-xl  '>Contact us</Link>

        </div>        
    </section>
  )
}

export default FooterHeader