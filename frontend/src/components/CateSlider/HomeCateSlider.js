import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const HomeCateSlider = (props) => {
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
          {props?.data?.map((cat, index) => {
            return (
              <SwiperSlide key={index}>
                <Link to={`/product?catId=${cat?._id}`}>
                  <div className="item py-7  bg-white rounded-md text-center flex items-center justify-center flex-col  ">
                    <img
                      src={cat?.images}
                      alt=""
                      className="w-[60px] h-[60px] transition-all"
                    />
                    <h3 className="text-[14px] font-[500] mt-3">{cat?.name}</h3>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCateSlider;
