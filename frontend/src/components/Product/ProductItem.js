import React, { useContext } from "react";
import "../HomeSlider/style.css";
import { Link } from "react-router-dom";

import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import { FaRegHeart } from "react-icons/fa6";
import { IoIosGitCompare } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import { MyContext } from "../../App";

const ProductItem = (props) => {
  const context = useContext(MyContext);
  return (
    <div className="productItem  shadow-md rounded-sm overflow-hidden border border-1  border-[rgba(0,0,0,0.1)] py-5">
      <div className=" group imgWrapper w-[100%] h-[200px] overflow-hidden rounded-md relative">
        <Link to={`/product/${props?.item?._id}`}>
          <div className="img h-[200px] overflow-hidden">
            <img src={props?.item?.images[0]} alt="img" className="w-full " />
            <img
              src={props?.item?.images[1]}
              alt="hoverImg"
              className="w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        </Link>
        {/* Discount */}
        <sapn className="discoutn flex items-center absolute top-[5px] left-[10px] z-50 px-2 py-1 text-[12px] font-[500] bg-primary text-white rounded-lg">
          {props?.item?.discount}
        </sapn>
        {/* Icons */}

        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-700 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
          <Button
            className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white text-black  hover:!bg-primary hover:text-white group"
            onClick={() =>
              context.handleOpenProductDetailModal(true, props?.item)
            }
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
          <span to={`/product/${props?.item?._id}`}>{props?.item?.brand}</span>
        </h6>
        <h3 className="text-[14px] link transition-all title mt-1.5 mb-1.5 font-[500] text-[#000]">
          <Link to={`/product/${props?.item?._id}`}>{props?.item?.name}</Link>
        </h3>
        {/* <p>1 Year Standard Warranty on this Product, 10 Year warranty on the compressor</p> */}
        <Rating name="size-small" defaultValue={4} size="small" readOnly />
        <div className="flex items-center gap-4">
          <span className="price text-red-500 text-[15px] font-[600]">
            &#x20b9; {props?.item?.price}
          </span>
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
            &#x20b9; {props?.item?.oldPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
