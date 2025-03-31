import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CompanyName = () => {
  const [slider] = useState([
    { img: "/Logo/Crompton.png" },
    { img: "/Logo/Lg.png" },
    { img: "/Logo/Voltas.png" },
    { img: "/Logo/Whirlpool.png" },
    { img: "/Logo/Havells.png" },
    { img: "/Logo/Orient.png" },
    { img: "/Logo/Samsung.png" },
  ]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1,
    cssEase: "linear",
  };
  return (
    <div className="slider-container bg-white p-2 mt-5">
      <Slider {...settings}>
        {slider.map((slide) => (
          <div key={slider}>
            <img src={slide.img} alt="logo" className="mt-5  h-[100px]" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CompanyName;
