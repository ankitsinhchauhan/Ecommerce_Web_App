import React from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Rating from "@mui/material/Rating";

import Button from "@mui/material/Button";

const MyListItems = (props) => {
  return (
    <div className="MyListItems w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
      <div className="img w-[15%] rounded-md overflow-hidden">
        {" "}
        <Link to="product/57757" className="group">
          <img
            src="/asserts/Air Conditioners/Sm41.avif"
            alt=""
            className="w-full group-hover:scale-105 transition-all"
          />
        </Link>
      </div>
      <div className="info w-[85%] relative">
        <IoMdClose className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all" />
        <span className="text-[13px]">Samsung</span>
        <h3 className="text-[15px] w-[80%]">
          <Link className="link ">
            Convertible 5in1 Inverter Split AC AR18CY3YATA
          </Link>
        </h3>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />

        <div className="flex items-center gap-4 mt-2 mb-2">
          <span className="price text-[14px] font-[600]">$85.00</span>
          <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
            $99.00
          </span>
          <span className="price text-red-500 text-[14px] font-[600]">
            55% OFF
          </span>
        </div>

        <Button className="btn-org btn-sm">Add To Cart</Button>
      </div>
    </div>
  );
};

export default MyListItems;
