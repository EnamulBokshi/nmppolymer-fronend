import React,{useState} from 'react';
import { FaSquareFacebook, FaInstagram } from "react-icons/fa6";
import { CiLinkedin, CiTwitter } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import NavPrimary from '../navs/NavPrimary';
import {SearchModal} from '../';
import SwiperSlider from '../../components/slider/swiper/SwiperSlider';

function Header({ bgImage = 'bg-hero-texture', varient, height = '300px', className = '' }) {
    const location = window.location.pathname;

    return (
        <header className={`${location == '/' ? 'h-[500px]':'h-[300px]'} relative  bg-cover bg-center bg-no-repeat ${bgImage} ${className}`}>
            <div className={`bg-black/60 h-[${height}]`}>
                <div className='flex justify-between z-20 bg-black/50 px-5 py-2'>
                    <div className='flex gap-3 z-20'>
                        <FaSquareFacebook className='text-white text-2xl' />
                        <FaInstagram className='text-white text-2xl' />
                        <CiLinkedin className='text-white text-2xl' />
                        <CiTwitter className='text-white text-2xl' />
                    </div>
                    <div className='z-20'>
                        <p className='flex gap-2'>
                            <IoCallOutline className='text-white text-2xl' />
                            <span className='text-neutral-50 font-serif'>+880 17533-20642</span>
                        </p>
                    </div>
                </div>
                <NavPrimary className='z-20' />
                {
                    location === '/' && (
                        <div className='absolute top-0 left-0 w-full h-full bg-black/60 z-10'>
                            <SwiperSlider />
                        </div>
                    )
                }
                <div className='mt-20 ml-5 px-20'>
                    <h1 className='text-4xl text-white font-bold'>{location.toUpperCase().replace('/', '')}</h1>
                </div>
            </div>
          
        </header>
    );
}

export default Header;