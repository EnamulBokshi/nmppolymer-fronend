import React from 'react'
import { FaSquareFacebook,FaInstagram} from "react-icons/fa6";
import { CiLinkedin,CiTwitter } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import NavPrimary from '../navs/NavPrimary';
import SwiperSlider from '../slider/swiper/SwiperSlider';
function Header() {
  return (
   <header className="h-[500px] realtive bg-[url('https://images.pexels.com/photos/221576/pexels-photo-221576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
   <div className='bg-black/60 h-[500px] '>
   <div className='flex  justify-between bg-black/50 px-5  py-2'>
        <div className='flex gap-3 '>
            <FaSquareFacebook className='text-white text-2xl ' />
            <FaInstagram className='text-white text-2xl '/>
            <CiLinkedin className='text-white text-2xl '/>
            <CiTwitter className='text-white text-2xl '/>
        </div>
        <div>
            <p className='flex gap-2'>
                <IoCallOutline className='text-white text-2xl '/>
                <span className='text-neutral-50 font-serif'>+880 17533-20642</span>
            </p>
        </div>
    </div>
    <NavPrimary />    
   </div>
   </header>
  )
}

export default Header