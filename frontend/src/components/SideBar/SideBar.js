import React, { useContext, useEffect, useState } from "react";

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
import { MyContext } from "../../App";
import { useLocation } from "react-router-dom";
import { postData } from "../../api";

const SideBar = (props) => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);

  const [filters, setFilters] = useState({
    catId: [],
    minPrice: "",
    maxPrice: "",
    rating: "",
    page: 1,
    limit: 25,
  });
  const [price, setPrice] = useState([0, 60000]);

  const context = useContext(MyContext);
  const location = useLocation();

  const handleCheckboxChange = (field, value) => {
    const currentValues = filters[field] || [];
    const updatedValues = currentValues?.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    setFilters((prev) => ({
      ...prev,
      [field]: updatedValues,
    }));
  };

  useEffect(() => {
    const url = window.location.href;
    const queryParameters = new URLSearchParams(location.search);

    if (url.includes("catId")) {
      const categoryId = queryParameters.get("catId");
      const catArr = [];
      catArr.push(categoryId);
      filters.catId = catArr;
      filters.rating = [];
    }

    filters.page = 1;
    setTimeout(() => {
      filterData();
    }, 200);
  }, [location]);

  const filterData = () => {
    props.setIsLoading(true);
    postData(`/api/product/filters`, filters).then((res) => {
      props.setProductsData(res);
      props.setIsLoading(false);
      props.setTotalPages(res?.totalPages);
      window.scrollTo(0, 0);
    });
  };

  useEffect(() => {
    filters.page = props.page;
    filterData();
  }, [filters, props.page]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1],
    }));
  }, [price]);

  return (
    <aside className="sidebar py- sticky top-[130px] z-[50]">
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
            {context?.catData?.length !== 0 &&
              context?.catData?.map((item, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={item?._id}
                    control={<Checkbox />}
                    checked={filters?.catId?.includes(item?._id)}
                    label={item?.name}
                    onChange={() => handleCheckboxChange("catId", item?._id)}
                    className="w-full"
                  />
                );
              })}
          </div>
        </Collapse>
      </div>

      {/* Price Section */}
      <div className="box mt-4">
        <h3 className=" w-full mb-3 text-[18px] font-[600] flex items-center pr-5">
          Filter By Price
        </h3>
        <RangeSlider
          value={price}
          onInput={setPrice}
          min={100}
          max={60000}
          step={5}
        />
        <div className="flex  pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            From: <strong className="text-dark">Rs:{price[0]}</strong>
          </span>
          <span className="text-[13px] ml-auto">
            From: <strong className="text-dark">Rs:{price[1]}</strong>
          </span>
        </div>
      </div>
      {/* Rating Section */}
      <div className="box mt-4">
        <h3 className=" w-full mb-3 text-[18px] font-[600] flex items-center pr-5">
          Filter By Rating
        </h3>

        <div className="flex items-center">
          <FormControlLabel
            value={5}
            control={<Checkbox />}
            checked={filters?.rating?.includes(5)}
            onChange={() => handleCheckboxChange("rating", 5)}
          />
          <Rating name="rating" size="small" value={5} readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={4}
            control={<Checkbox />}
            checked={filters?.rating?.includes(4)}
            onChange={() => handleCheckboxChange("rating", 4)}
          />
          <Rating name="rating" size="small" value={4} readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={3}
            control={<Checkbox />}
            checked={filters?.rating?.includes(3)}
            onChange={() => handleCheckboxChange("rating", 3)}
          />
          <Rating name="rating" size="small" value={3} readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={2}
            control={<Checkbox />}
            checked={filters?.rating?.includes(2)}
            onChange={() => handleCheckboxChange("rating", 2)}
          />
          <Rating name="rating" size="small" value={2} readOnly />
        </div>

        <div className="flex items-center">
          <FormControlLabel
            value={1}
            control={<Checkbox />}
            checked={filters?.rating?.includes(1)}
            onChange={() => handleCheckboxChange("rating", 1)}
          />
          <Rating name="rating" size="small" value={1} readOnly />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
