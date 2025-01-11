import React from 'react'
import { LogoFull } from '..'
function Footer() {
  return (
    <footer  className='bg-gray-900 px-10 pt-10 text-gray-600'>
        <div className='py-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
            <div className='flex flex-col items-center md:items-start space-y-4'>
                <img src={LogoFull} alt="Logo"  className='w-28 h-28 rounded-full py-8'/>
                <p>NMP Polymer LLC.</p>
                <p>Kamrangirchar, Lalbag</p>
                <p>Dhaka-1211</p>
                <p>Bangladesh</p>
            </div>
            <div className='space-y-4 flex flex-col items-center md:items-start'>
                <h1 className='text-white mb-3'>About Us</h1>
                <a href='#' className='hover:text-red-500 duration-200'>Inception</a>
                <a href='#' className='hover:text-red-500 duration-200'>Milestones</a>
                <a href='#' className='hover:text-red-500 duration-200'>Factories</a>
            </div>
            <div className='space-y-4 flex flex-col items-center md:items-start'>
                <h1 className='text-white'>Businesses</h1>
                <a href='#' className='hover:text-red-500 duration-200'>Category & Product</a>
                <a href='#' className='hover:text-red-500 duration-200'>Brands</a>
                <a href='#' className='hover:text-red-500 duration-200'>Export</a>
            </div>
            <div className='space-y-4 flex flex-col items-center md:items-start'>
                <h1 className='text-white'>Legal</h1>
                <a href='#' className='hover:text-red-500 duration-200'>Privacy</a>
                <a href='#' className='hover:text-red-500 duration-200'>Terms and conditions</a>
                <a href='#' className='hover:text-red-500 duration-200'>FAQ</a>
            </div>
        </div>
        <p className='block pt-0.5 bg-gray-500'></p>
        <div className='flex md:justify-between px-8 py-4 md:flex-row md:items-center items-center flex-wrap flex-col'>
            <div className='flex gap-5  '>
                <a href='#' className='hover:text-red-500 duration-200 text-xs sm:text-sm'>Terms of Use</a>
                <a href='#' className='hover:text-red-500 duration-200 text-xs sm:text-sm'>Privacy</a>
                <a href='#' className='hover:text-red-500 duration-200 text-xs sm:text-sm'>Sitemap</a>
                <a href='#' className='hover:text-red-500 duration-200 text-xs sm:text-sm'>Contact</a>
            </div>
            <div>© 2025 NMP ploymer | All rights reserved</div>
        </div>
    </footer>
  )
}

export default Footer
