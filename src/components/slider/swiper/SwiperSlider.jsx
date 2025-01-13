import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
// import { Swiper, useSwiper } from '@welcome-ui/swiper'
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./styles.css";

// import required modules

export default function SwiperSlider() {
  const videos = ['https://cdn.pixabay.com/video/2021/05/12/73977-549736324_large.mp4',]
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
          // disableOnInteraction: true,
          // pauseOnMouseEnter: true,
          playOnMouseLeave: true,
        }}
        navigation={true}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="h-full w-full flex items-center bg-cover justify-center bg-hero-texture">
            <div className="h-full w-full flex items-center justify-center bg-black/60">
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://cdn.pixabay.com/video/2021/09/11/88207-602915574_large.mp4"
                muted
                autoPlay
                loop
              ></video>
              <div className="absolute top-0 flex items-center justify-center left-0 w-full h-full bg-black/60">
                <div className="">
                <h2 className=" text-white text-4xl ">
                  We are here to help you
                </h2>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full w-full flex items-center bg-cover justify-center bg-hero-texture">
            <div className="h-full w-full flex items-center justify-center bg-black/60">
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={videos[0]}
                muted
                autoPlay
                loop
              ></video>
              <div className="absolute top-0 flex items-center justify-center left-0 w-full h-full bg-black/60">
                <div className="">
                <h2 className=" text-white text-4xl ">
                  We are here to help you
                </h2>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full w-full flex items-center bg-cover justify-center bg-hero-texture ">
            <div className="h-full w-full flex items-center justify-center bg-black/60">
              <h2 className="text-white text-4xl">We are here to help you</h2>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
