import React, { useState } from "react";
import Button from "@mui/material/Button";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const AddSubCategory = () => {
  const [subCategory, setSubCategory] = useState("");

  const handleChangeSubCategory = (event) => {
    setSubCategory(event.target.value);
  };
  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8 ">
        <div className="scroll max-h-[71vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-4 mb-3 gap-5">
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Category
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                value={subCategory}
                label="Category"
                className="w-full"
                onChange={handleChangeSubCategory}
              >
                <MenuItem value={null}>None</MenuItem>
                <MenuItem value={10}>Appliances</MenuItem>
                <MenuItem value={20}>Home & Kichen</MenuItem>
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Sub Category Name
              </h3>
              <input
                type="text"
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
          </div>
        </div>

        <div className="w-[250px]">
          <Button type="button" className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-[25px] text-white" />
            Publish and View
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddSubCategory;
