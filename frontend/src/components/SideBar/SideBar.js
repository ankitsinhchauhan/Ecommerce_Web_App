import React, { useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "react-collapse";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

import Rating from "@mui/material/Rating";

//Range Slider
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

import "./style.css";

const SideBar = () => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenAvailabilityFilter, setIsOpenAvailabilityFilter] =
    useState(true);
  const [isOpenColorFilter, setIsOpenColorFilter] = useState(true);

  return (
    <aside className="sidebar py-5">
      <div className="box">
        <h3 className=" w-full mb-3 text-[18px] font-[600] flex items-center pr-5">
          Shop By Categories
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] 1rounded-full !ml-auto !text-black"
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            {isOpenCategoryFilter === true ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll px-4 relative -left-[13px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Air Conditioner"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Refrigerator"
              className="w-full"
            />

            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Dishwasher "
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Washing Machine "
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Home  & Kichen"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>

      {/* Availability */}
      <div className="box mt-3">
        <h3 className=" w-full mb-3 text-[18px] font-[600] flex items-center pr-5">
          Availability
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] 1rounded-full !ml-auto !text-black"
            onClick={() =>
              setIsOpenAvailabilityFilter(!isOpenAvailabilityFilter)
            }
          >
            {isOpenCategoryFilter === true ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenAvailabilityFilter}>
          <div className="scroll px-4 relative -left-[13px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Available (17)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="In Stock (12)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Not Available (1)"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>

      {/* Colors */}
      <div className="box mt-3">
        <h3 className=" w-full mb-3 text-[18px] font-[600] flex items-center pr-5">
          Color
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] 1rounded-full !ml-auto !text-black"
            onClick={() => setIsOpenColorFilter(!isOpenColorFilter)}
          >
            {isOpenColorFilter === true ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenColorFilter}>
          <div className="scroll px-4 relative -left-[13px]">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="white"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Black"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Gray"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Purple"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Red"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Blue"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>

      {/* Price Section */}
      <div className="box mt-4">
        <h3 className=" w-full mb-3 text-[18px] font-[600] flex items-center pr-5">
          Filter By Price
        </h3>
        <RangeSlider />
        <div className="flex  pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            From: <strong className="text-dark">Rs:{100}</strong>
          </span>
          <span className="text-[13px] ml-auto">
            From: <strong className="text-dark">Rs:{1000}</strong>
          </span>
        </div>
      </div>

      {/* Rating Section */}
      <div className="box mt-4">
        <h3 className=" w-full mb-3 text-[18px] font-[600] flex items-center pr-5">
          Filter By Rating
        </h3>
        <div className="w-full">
          <Rating name="size-small" defaultValue={4} size="small" readOnly />
        </div>
        <div className="w-full">
          <Rating name="size-small" defaultValue={4} size="small" readOnly />
        </div>
        <div className="w-full">
          <Rating name="size-small" defaultValue={3} size="small" readOnly />
        </div>
        <div className="w-full">
          <Rating name="size-small" defaultValue={2} size="small" readOnly />
        </div>
        <div className="w-full">
          <Rating name="size-small" defaultValue={1} size="small" readOnly />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
