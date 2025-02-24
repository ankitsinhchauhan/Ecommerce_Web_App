import React, { useContext } from "react";
import "../HomeSlider/style.css";
import { Link } from "react-router-dom";

import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import { FaRegHeart } from "react-icons/fa6";
import { IoIosGitCompare } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { MyContext } from "../../App";

const ProductItemListView = () => {
  const context = useContext(MyContext);
  return (
    <div className="productItemListView  shadow-md rounded-sm overflow-hidden border border-1  border-[rgba(0,0,0,0.1)] py-5 flex items-center">
      <div className=" group imgWrapper w-[25%] h-[220px] overflow-hidden rounded-md relative">
        <Link to="/">
          <div className="img h-[200px] overflow-hidden">
            <img
              src="./asserts/Air Conditioners/Sm41.avif"
              alt="Air Conditioner"
              className="w-full "
            />
            <img
              src="./asserts/Air Conditioners/sm55.avif"
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
          <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white text-black  hover:!bg-primary hover:text-white group">
            <FaRegHeart className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
          </Button>
          <Button
            className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white text-black  hover:!bg-primary hover:text-white group"
            onClick={() => context.setOpenProductDetailsModal(true)}
          >
            <MdZoomOutMap className="text-[18px] !text-black group-hover:text-white hover:!text-white " />
          </Button>
          <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white text-black  hover:!bg-primary hover:text-white group">
            <IoIosGitCompare className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
          </Button>
        </div>
      </div>
      <div className="info p-3 px-8 py-5 w-[75%] ">
        <h6 className="text-[15px] !font-[400] ">
          <Link to="/">Samsung</Link>
        </h6>
        <h3 className="text-[18px] title mt-2 font-[500] mb-3 text-[#000]">
          <Link to="/" className="link transition-all">
            {" "}
            Convertible 5in1 Inverter Split AC AR18CY3YATA
          </Link>
        </h3>
        <p className="text[14px] mb-3">
          Cool rooms quickly from corner to corner, so feel comfortable wherever
          you are. Digital Inverter technology cools the air 43% faster*. Its
          advanced design also has a 15% larger fan, 18% wider inlet and a 31%
          wider blade. So cool air is dispersed farther and wider**, reaching up
          to 15 meters.
        </p>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />
        <div className="flex items-center gap-4">
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
            $99.00
          </span>
          <span className="price text-red-500 text-[15px] font-[600]">
            $85.00
          </span>
        </div>
        <div className="mt-3">
          <Button className="btn-org mt-3 flex gap-2">
            {" "}
            <IoCartOutline className="text-[20px]" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItemListView;
