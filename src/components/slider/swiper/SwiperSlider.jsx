import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Video3 from '../../../assets/hero-video/43629-436237628_small.mp4'
import Video2 from '../../../assets/hero-video/73977-549736324_small.mp4'
import Video1 from '../../../assets/hero-video/188890-884171104_small.mp4'
import parse from 'html-react-parser';
export const sliderContent  =[
  {
    title: "We are <span className = 'text-blue-700 font-extrabold'>promissed</span>  to provide the <span className = 'text-violet-700'>best</span>  products",
    video: Video1,
  },
  {
    title: "We are here to help you",
    video: Video3,
  },
  {
    title: "We are <span className = 'text-violet-700'>promissed</span> to serve you, <span className = 'text-yellow-400'>24/7</span>",
    video: Video2,
  },
  
]
import {Autoplay,Navigation,Pagination,} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./styles.css";



export default function SwiperSlider() {
  
  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        loop={true}
        onMouseEnter={(e) => {
          e.stopPropagation();
        }}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
          playOnMouseLeave: true,
        }}
        navigation={true}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          sliderContent.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="h-full  w-full flex items-center bg-cover justify-center bg-hero-texture">
                <div className="h-full w-full flex items-center justify-center bg-black/60">
                  <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src={slide.video}
                    muted
                autoPlay
                loop
                playsInline
                > </video>
                  <div className="absolute top-0 flex items-center justify-center left-0 w-full h-full bg-black/60">
                    <div className="px-10 flex items-center justify-center">
                      <h2 className=" text-white md:text-4xl mt-10  text-2xl font-bold text-center">
                        {parse(slide.title)}
                      </h2>
                    </div>  
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}
