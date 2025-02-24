import React, { useState } from "react";

import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productFeatured, setProductFeatured] = useState("");

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };
  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8 ">
        <div className="scroll max-h-[71vh] overflow-y-scroll pr-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Name
              </h3>
              <input
                type="text"
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Description
              </h3>
              <textarea
                type="text"
                className="w-full h-[140px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-5">
            {/* Category */}
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Category
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                value={productCat}
                label="Category"
                className="w-full"
                onChange={handleChangeProductCat}
              >
                <MenuItem value={null}>None</MenuItem>
                <MenuItem value={10}>Appliances</MenuItem>
                <MenuItem value={20}>Home & Kichen</MenuItem>
              </Select>
            </div>
            {/* Sub category */}
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Sub Category
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                value={productSubCat}
                label="Category"
                className="w-full"
                onChange={handleChangeProductSubCat}
              >
                <MenuItem value={null}>None</MenuItem>
                <MenuItem value={10}>Air Conditioners</MenuItem>
                <MenuItem value={20}>Refrigerators</MenuItem>
                <MenuItem value={30}>Washing Machines</MenuItem>
                <MenuItem value={40}> Dishwashers</MenuItem>
                <MenuItem value={50}> Home & Kichen</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Old Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-5">
            {/* Category */}
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Is Featured?
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                value={productFeatured}
                label="Category"
                className="w-full"
                onChange={handleChangeProductFeatured}
              >
                <MenuItem value={10}>True</MenuItem>
                <MenuItem value={20}>False</MenuItem>
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Stock
              </h3>
              <input
                type="number"
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Brand
              </h3>
              <input
                type="text"
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Discount
              </h3>
              <input
                type="number"
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-5">
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Capacity
              </h3>
              <input
                type="text"
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Rating
              </h3>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </div>
          </div>

          <div className="col w-full p-5 px-0">
            <h3 className="font-[700] text-[18px] mb-3">Media & Images</h3>

            <div className="grid grid-cols-8 gap-4">
              <div className="uploadBoxWrapper relative">
                {/* close icon */}
                <span className="absolute -top-[6px] -right-[6px] flex items-center justify-center w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer">
                  <IoMdClose className="text-white text-[17px]" />
                </span>
                <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.2)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    src={"/asserts/Air Conditioners/Sm41.avif"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                  />
                </div>
              </div>
              <div className="uploadBoxWrapper relative">
                {/* close icon */}
                <span className="absolute -top-[6px] -right-[6px] flex items-center justify-center w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer">
                  <IoMdClose className="text-white text-[17px]" />
                </span>
                <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.2)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    src={"/asserts/Air Conditioners/Sm41.avif"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                  />
                </div>
              </div>
              <div className="uploadBoxWrapper relative">
                {/* close icon */}
                <span className="absolute -top-[6px] -right-[6px] flex items-center justify-center w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer">
                  <IoMdClose className="text-white text-[17px]" />
                </span>
                <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.2)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    src={"/asserts/Air Conditioners/Sm41.avif"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                  />
                </div>
              </div>
              <UploadBox multiple={true} />
            </div>
          </div>
        </div>

        <hr />
        <br />
        <Button type="button" className="btn-blue btn-lg w-full flex gap-2">
          <FaCloudUploadAlt className="text-[25px] text-white" />
          Publish and View
        </Button>
      </form>
    </section>
  );
};

export default AddProduct;
