import React from "react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { IoIosGitCompare } from "react-icons/io";
import QtyBox from "./QtyBox";

const ProductDetailComponents = (props) => {
  return (
    <>
      <h1 className="text-[24px] font-[600] mb-3 ">{props?.item?.name}</h1>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-gray-400 text-[13px]">
          Brands :{" "}
          <span className="font-[500] text-black opacity-75">
            {props?.item?.brand}
          </span>
        </span>
        <Rating name="size-small" defaultValue={4} size="small" />{" "}
        <span
          className="text-[13px] cursor-pointer"
          onClick={props.gotoReviews}
        >
          Review ({props?.reviewscount})
        </span>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <span className="price text-red-500 text-[20px] font-[600]">
          &#x20b9; {props?.item?.price}
        </span>
        <span className="oldPrice line-through text-gray-500 text-[20px] font-[500]">
          &#x20b9; {props?.item?.oldPrice}
        </span>

        <span className="text-[14px]">
          Available In Stock :{" "}
          <span className="text-green-600 font-bold">
            {props?.item?.countInStock} Items
          </span>
        </span>
      </div>
      <p className="mt-3 pr-10">{props?.item?.description}</p>

      {/* QtyBox */}
      <p className="text-[14px] mt-5 mb-2 text-[#000]">
        Free Shipping (Est. Delivery Time 2-3 Days)
      </p>
      <div className="flex items-center gap-4 py-4">
        <div className="qtyBoxWrapper w-[70px]">
          <QtyBox />
        </div>
        <Button className="btn-org flex gap-2">
          <IoCartOutline className="text-[22px]" />
          Add to Cart
        </Button>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <span className="flex items-center gap-2 text-[15px] font-[500] link cursor-pointer">
          {" "}
          <FaRegHeart className="text-[18px]" />
          Add to Wishlist
        </span>
        <span className="flex items-center gap-2 text-[15px] font-[500] link cursor-pointer">
          {" "}
          <IoIosGitCompare className="text-[18px]" />
          Add to Compare
        </span>
      </div>
    </>
  );
};

export default ProductDetailComponents;
