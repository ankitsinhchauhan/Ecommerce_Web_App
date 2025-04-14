import React from "react";
import { Link } from "react-router-dom";

const BannerBox = (props) => {
  return (
    <div className="box bannerBox overflow-hidden rounded-lg group">
      <Link to="/">
        <img
          src={props.img}
          alt="banner"
          className="w-full h-[150px] transition-all group-hover:scale-105"
        />
      </Link>
    </div>
  );
};

export default BannerBox;
