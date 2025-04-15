import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const BannerBoxV2 = (props) => {
  return (
    <div className="bannerBoxV2 w-full overflow-hidden rounded-md group relative">
      <img
        src={props.image}
        alt=""
        className="w-full transition-all duration-150 group-hover:scale-105"
      />
      <div
        className={`info absolute p-5 top-0 ${
          props.info === "left" ? "left-0" : "right-0"
        } w-[57%] h-[100%] z-50 flex items-center justify-center flex-col gap-2 ${
          props.info === "left" ? "" : "pl-11"
        }`}
      >
        <h2 className="text-[18px] font-[600]">Samsung Refrigerator</h2>
        <spna className="text-[20px] font-[600] text-black w-full">
          &#x20b9; 9,500.00
        </spna>
        <div className="w-full">
          <Link to="/" className="text-[16px] font-[600]">
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerBoxV2;
