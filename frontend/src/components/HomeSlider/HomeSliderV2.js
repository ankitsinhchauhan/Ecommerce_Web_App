import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Button from "@mui/material/Button";

const HomeSliderV2 = () => {
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="homeSliderV2"
      >
        <SwiperSlide>
          <div className="item w-full rounded-md overflow-hidden">
            <img src="./FirstBanner/Air_Conditioner.jpg" alt="" />
            {/* Banner Section  Content 1 */}
            <div className="info absolute top-0 -right-[100%] w-[50%]  h-[100%] opacity-0 flex items-center  flex-col justify-center z-50 p-8 text-white transition-all duration-700 ">
              <h4 className="text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0">
                Winter Sale
              </h4>
              <h2 className="text-[35px] font-[700] relative -right-[100%] opacity-0">
                Make Your life Cooler with features Beyond Comparison
              </h2>
              <h3 className="text-[18px] font-[500] flex items-center gap-3 w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0">
                Starting At Only
                <span className="text-black text-[30px] font-[700]">
                  &#x20b9; 130.00
                </span>
              </h3>
              <div className="w-full  relative -right-[100%] opacity-0 btn_">
                <Button className="btn-org2 ">Shop Now</Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item w-full rounded-md overflow-hidden">
            <img src="./FirstBanner/SuperSale.jpg" alt="" />
            {/* Banner Section  Content 2*/}
            <div className="info absolute top-0 -right-[100%] w-[50%]  h-[100%] opacity-0 flex items-center  flex-col justify-center z-50 p-8 text-white transition-all duration-700 ">
              <h4 className="text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0">
                Big Saving Days Sale
              </h4>
              <h2 className="text-[35px] font-[700] relative -right-[100%] opacity-0">
                Limited-Time Appliances Sale! Grab the Best Deals Now
              </h2>
              <h3 className="text-[18px] font-[500] flex items-center gap-3 w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0">
                Starting At Only
                <span className="text-black text-[30px] font-[700]">
                  &#x20b9; 89.00
                </span>
              </h3>
              <div className="w-full  relative -right-[100%] opacity-0 btn_">
                <Button className="btn-org2 ">Shop Now</Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item w-full rounded-md overflow-hidden">
            <img src="./FirstBanner/Microwave.jpg" alt="" />
            {/* Banner Section  Content 3 */}
            <div className="info absolute top-0 -right-[100%] w-[50%]  h-[100%] opacity-0 flex items-center  flex-col justify-center z-50 p-8 text-white transition-all duration-700 ">
              <h4 className="text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0">
                Big Savings on Microwave Ovens
              </h4>
              <h2 className="text-[35px] font-[700] relative -right-[100%] opacity-0">
                For fast and even heating from edges to center
              </h2>
              <h3 className="text-[18px] font-[500] flex items-center gap-3 w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0">
                Starting At Only
                <span className="text-black text-[30px] font-[700]">
                  &#x20b9; 60.00
                </span>
              </h3>
              <div className="w-full  relative -right-[100%] opacity-0 btn_">
                <Button className="btn-org2 ">Shop Now</Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item w-full rounded-md overflow-hidden">
            <img src="./FirstBanner/HomeAppliances.jpg" alt="" />
            {/* Banner Section  Content 4*/}
            <div className="info absolute top-0 -right-[100%] w-[50%]  h-[100%] opacity-0 flex items-center  flex-col justify-center z-50 p-8 text-white transition-all duration-700 ">
              <h4 className="text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0">
                Black Friday Sale
              </h4>
              <h2 className="text-[35px] font-[700] relative -right-[100%] opacity-0">
                Exclusive Home Appliance Sale Limited Time Only!
              </h2>
              <h3 className="text-[18px] font-[500] flex items-center gap-3 w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0">
                Starting At Only
                <span className="text-black text-[30px] font-[700]">
                  &#x20b9; 100.00
                </span>
              </h3>
              <div className="w-full  relative -right-[100%] opacity-0 btn_">
                <Button className="btn-org2 ">Shop Now</Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HomeSliderV2;
