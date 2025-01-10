import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

export default function SwiperSlider() {
  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide >
          <div className=" h-[500px] bg-[url('https://images.pexels.com/photos/221576/pexels-photo-221576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')">

          </div>
        </SwiperSlide>
        <SwiperSlide className={`bg-[url('https://images.pexels.com/photos/221576/pexels-photo-221576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]`}>Slide 2</SwiperSlide>
        <SwiperSlide className={`bg-[url('https://images.pexels.com/photos/3977166/pexels-photo-3977166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]`}>Slide 3</SwiperSlide>
      </Swiper>
    </>
  );
}
