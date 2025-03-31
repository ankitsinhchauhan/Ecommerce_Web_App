import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import ProductItem from "../Product/ProductItem";

const ProductSlider = (props) => {
  return (
    <section className="productSlider py-3">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="sliderHome"
      >
        {props?.data?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <ProductItem item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default ProductSlider;
