import React from "react";
import { Link } from "react-router-dom";

const AddBanner2 = (props) => {
  return (
    <div className="box bannerBox overflow-hidden rounded-lg group">
      <Link to="/">
        <img
          src={props.img}
          alt="banner"
          className="w-full h-[300px] transition-all group-hover:scale-105"
        />
      </Link>
    </div>
  );
};

export default AddBanner2;
