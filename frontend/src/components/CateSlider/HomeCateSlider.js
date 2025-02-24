import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const HomeCateSlider = () => {
  return (
    <div className="homeCatSlider">
      <div className="container">
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          modules={[Navigation]}
          navigation={true}
          className="homeCatSlider"
        >
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7  bg-white rounded-md text-center flex items-center justify-center flex-col  ">
                <img
                  src="/ariConditioner.svg"
                  alt="Air Conditioners"
                  className="w-[60px] h-[60px] transition-all"
                />
                <h3 className="text-[14px] font-[500] mt-3">
                  Air Conditioners
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7  bg-white rounded-md text-center flex items-center justify-center flex-col  ">
                <img
                  src="/dishwasher.svg"
                  alt="Dishwashers"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[14px] font-[500] mt-3">Dishwashers</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7  bg-white rounded-md text-center flex items-center justify-center flex-col  ">
                <img
                  src="https://cdn-icons-png.freepik.com/256/11945/11945249.png?ga=GA1.1.1632216567.1720354650&semt=ais_hybrid"
                  alt="Fans"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[14px] font-[500] mt-3">Fnas</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7  bg-white rounded-md text-center flex items-center justify-center flex-col  ">
                <img
                  src="https://cdn-icons-png.freepik.com/256/7964/7964416.png?ga=GA1.1.1632216567.1720354650&semt=ais_hybrid"
                  alt="Geyser"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[14px] font-[500] mt-3">Geyser</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7  bg-white rounded-md text-center flex items-center justify-center flex-col  ">
                <img
                  src="https://cdn-icons-png.freepik.com/256/3073/3073751.png?ga=GA1.1.1632216567.1720354650&semt=ais_hybrid"
                  alt="Irons"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[14px] font-[500] mt-3">Irons</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7  bg-white rounded-md text-center flex items-center justify-center flex-col  ">
                <img
                  src="https://cdn-icons-png.freepik.com/256/9875/9875284.png?ga=GA1.1.1632216567.1720354650&semt=ais_hybrid"
                  alt="Microwave Oven"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[14px] font-[500] mt-3">Microwave Oven</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7  bg-white rounded-md text-center flex items-center justify-center flex-col  ">
                <img
                  src="https://cdn-icons-png.freepik.com/256/1249/1249838.png?ga=GA1.1.1632216567.1720354650&semt=ais_hybrid"
                  alt="Mixer Grinder"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[14px] font-[500] mt-3">Mixer Grinder</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7  bg-white rounded-md text-center flex items-center justify-center flex-col  ">
                <img
                  src="https://cdn-icons-png.freepik.com/256/447/447191.png?ga=GA1.1.1632216567.1720354650&semt=ais_hybrid"
                  alt="Refrigerator"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[14px] font-[500] mt-3">Refrigerator</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7  bg-white rounded-md text-center flex items-center justify-center flex-col  ">
                <img
                  src="sandwich_maker.svg"
                  alt="Sandwich Maker"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[14px] font-[500] mt-3">Sandwich Maker</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7  bg-white rounded-md text-center flex items-center justify-center flex-col  ">
                <img
                  src="https://cdn-icons-png.freepik.com/256/3322/3322056.png?ga=GA1.1.1632216567.1720354650&semt=ais_hybrid"
                  alt="Washing Machines"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[14px] font-[500] mt-3">
                  Washing Machines
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7  bg-white rounded-md text-center flex items-center justify-center flex-col  ">
                <img
                  src="https://cdn-icons-png.freepik.com/256/10138/10138064.png?ga=GA1.1.1632216567.1720354650&semt=ais_hybrid"
                  alt=" Water Purifiers"
                  className="w-[60px] transition-all"
                />
                <h3 className="text-[14px] font-[500] mt-3">Water Purifier</h3>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCateSlider;
