import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import AddBanner2 from "./AddBanner2";

const AddSecondBannerSlider = (props) => {
  return (
    <div className="py-4 w-full pt-10 ">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="smallBtn "
      >
        <SwiperSlide>
          <AddBanner2 img={"./Banner/Add2banner1.webp"} />
        </SwiperSlide>

        <SwiperSlide>
          <AddBanner2 img={"./Banner/Add2banner2.webp"} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AddSecondBannerSlider;
