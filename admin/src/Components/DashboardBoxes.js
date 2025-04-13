import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { IoStatsChart } from "react-icons/io5";
import { AiOutlinePieChart } from "react-icons/ai";

import { RiProductHuntLine } from "react-icons/ri";
import { MdOutlineReviews } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const DashboardBoxes = (props) => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide>
          <div className="box p-5 cursor-pointer bg-[#3872fa] hover:bg-[#2e62dd] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
            <AiOutlinePieChart className="text-[40px] text-white" />
            <div className="info w-[70%]">
              <h3 className="text-white">Total Users</h3>
              <b className="text-white text-[20px]">{props?.users}</b>
            </div>
            <IoStatsChart className="text-[50px] text-white" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box p-5 cursor-pointer bg-[#10b981] hover:bg-[rgb(24,131,95)] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
            <AiOutlineGift className="text-[40px] text-white" />
            <div className="info w-[70%]">
              <h3 className="text-white"> Total Orders</h3>
              <b className="text-white text-[20px]">{props?.orders}</b>
            </div>
            <IoStatsChart className="text-[50px] text-white" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box p-5 cursor-pointer bg-[#312be1d3] hover:bg-[#312be1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
            <RiProductHuntLine className="text-[40px] text-white" />
            <div className="info w-[70%]">
              <h3 className="text-white">Total Products</h3>
              <b className="text-white text-[20px]">{props?.products}</b>
            </div>
            <IoStatsChart className="text-[50px] text-white" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box p-5 cursor-pointer bg-[#842edb] hover:bg-[#7027b9] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 ">
            <MdOutlineReviews className="text-[30px] text-white" />
            <div className="info w-[70%]">
              <h3 className="text-white">Total Reviews</h3>
              <b className="text-white text-[20px]">{props?.reviews}</b>
            </div>
            <IoStatsChart className="text-[50px] text-white" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default DashboardBoxes;
