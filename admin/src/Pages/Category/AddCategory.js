import React from "react";
import UploadBox from "../../Components/UploadBox";
import Button from "@mui/material/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const AddCategory = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });

  const [previews, setPreviews] = useState([]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr);
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8 ">
        <div className="scroll max-h-[71vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-[25%]">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Category Name
              </h3>
              <input
                type="text"
                onChange={onChangeInput}
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
          </div>
          <br />

          <h3 className="text-[16px] font-[500] mb-1 text-black">
            Category Image
          </h3>
          <br />
          <div className="grid grid-cols-8 gap-4">
            {previews?.length !== 0 &&
              previews?.map((image, index) => {
                return (
                  <div className="uploadBoxWrapper relative">
                    {/* close icon */}
                    <span className="absolute -top-[6px] -right-[6px] flex items-center justify-center w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer">
                      <IoMdClose className="text-white text-[17px]" />
                    </span>

                    <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.2)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                      <LazyLoadImage
                        className="w-full h-full object-cover"
                        alt={"image"}
                        src={"/ariConditioner.svg"}
                        effect="blur"
                        wrapperProps={{
                          style: { transitionDelay: "1s" },
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            <UploadBox
              multiple={true}
              name="images"
              url="/api/category/uploadImages"
              setPreviewsFun={setPreviewsFun}
            />
          </div>
        </div>

        <br />
        <br />
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

export default AddCategory;
