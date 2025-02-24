import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { Navigation } from "swiper/modules";
import BannerBox from "./BannerBox";

const AddBannerSlider = (props) => {
  return (
    <div className="py-4 w-full pt-10 ">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="smallBtn"
      >
        <SwiperSlide>
          <BannerBox img={"/Banner/Banner1.jpg"} />
        </SwiperSlide>

        <SwiperSlide>
          <BannerBox img={"/Banner/Banner4.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/Banner/Banner5.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/Banner/Banner3.jpg"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/Banner/Banner2.jpg"} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AddBannerSlider;
