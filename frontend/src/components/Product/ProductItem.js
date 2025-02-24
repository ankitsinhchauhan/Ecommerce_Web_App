import React, { useContext } from "react";
import "../HomeSlider/style.css";
import { Link } from "react-router-dom";

import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import { FaRegHeart } from "react-icons/fa6";
import { IoIosGitCompare } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import { MyContext } from "../../App";

const ProductItem = () => {
  const context = useContext(MyContext);
  return (
    <div className="productItem  shadow-md rounded-sm overflow-hidden border border-1  border-[rgba(0,0,0,0.1)] py-5">
      <div className=" group imgWrapper w-[100%] h-[220px] overflow-hidden rounded-md relative">
        <Link to="/">
          <div className="img h-[200px] overflow-hidden">
            <img
              src="./asserts/Air Conditioners/Sm41.avif"
              alt="Air Conditioner"
              className="w-full "
            />
            <img
              src="./asserts/Air Conditioners/sm42.avif"
              alt="Air Conditioner"
              className="w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        </Link>
        {/* Discount */}
        <sapn className="discoutn flex items-center absolute top-[5px] left-[10px] z-50 px-2 py-1 text-[12px] font-[500] bg-primary text-white rounded-lg">
          10%
        </sapn>
        {/* Icons */}

        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-700 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
          <Button
            className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white text-black  hover:!bg-primary hover:text-white group"
            onClick={() => context.setOpenProductDetailsModal(true)}
          >
            <MdZoomOutMap className="text-[18px] !text-black group-hover:text-white hover:!text-white " />
          </Button>
          <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white text-black  hover:!bg-primary hover:text-white group">
            <FaRegHeart className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
          </Button>
          <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white text-black  hover:!bg-primary hover:text-white group">
            <IoIosGitCompare className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
          </Button>
        </div>
      </div>
      <div className="info p-3 py-5">
        <h6 className="text-[13px]  !font-[400]">
          <Link to="/">Samsung</Link>
        </h6>
        <h3 className="text-[14px] link transition-all title mt-1.5 mb-1.5 font-[500] text-[#000]">
          <Link to="/"> Convertible 5in1 Inverter Split AC AR18CY3YATA</Link>
        </h3>
        {/* <p>1 Year Standard Warranty on this Product, 10 Year warranty on the compressor</p> */}
        <Rating name="size-small" defaultValue={4} size="small" readOnly />
        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
            $99.00
          </span>
          <span className="price text-red-500 text-[15px] font-[600]">
            $85.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
