import React from "react";
import UploadBox from "../../Components/UploadBox";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { addData, deleteImages } from "../../Apis";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const AddHomeSlider = () => {
  const [productCat, setProductCat] = useState("");
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    bannerTitle: "",
    catId: "",
    images: [],
    price: "",
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.catId = event.target.value;
    formFields.category = event.target.value;
  };

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
    formFields.images = previewsArr;
  };

  const selectCatByName = (name) => {
    formFields.catName = name;
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;
    deleteImages(
      `/api/banner/deleteImage?img=${image}?token=${localStorage.getItem(
        "accesstoken"
      )}`
    ).then((res) => {
      imageArr.splice(index, 1);
      setPreviews([]);

      setTimeout(() => {
        setPreviews(imageArr);
        // formFields.images = previewsArr;
      }, 100);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(0);

    setIsLoading(true);

    if (formFields.bannerTitle === "") {
      context.openAlertBox("error", "Please enter Banner title");
      setIsLoading(false);
      return false;
    }

    if (formFields.catId === "") {
      context.openAlertBox("error", "Please  select category");
      setIsLoading(false);
      return false;
    }

    if (formFields.price === "") {
      context.openAlertBox("error", "Please enter price");
      setIsLoading(false);
      return false;
    }

    if (previews?.length === 0) {
      context.openAlertBox("error", "Please select banner images");
      setIsLoading(false);
      return false;
    }

    addData(
      `/api/banner/add?token=${localStorage.getItem("accesstoken")}`,
      formFields,
      {
        withCredentials: true,
      }
    ).then((res) => {
      context.openAlertBox("success", "Banner Created");

      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanle({
          open: false,
        });
      }, 500);
      navigate("/homeSlider/list");
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="scroll max-h-[71vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-4 mb-3 gap-5">
            <div className="col ">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Banner Title
              </h3>
              <input
                type="text"
                name="bannerTitle"
                value={formFields.bannerTitle}
                onChange={onChangeInput}
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Category
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  size="small"
                  value={productCat}
                  label="Category"
                  className="w-full"
                  onChange={handleChangeProductCat}
                >
                  {context?.catData?.map((cat, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={cat?._id}
                        onClick={() => selectCatByName(cat?.name)}
                      >
                        {cat?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col ">
              <h3 className="text-[16px] font-[500] mb-1 text-black">Price</h3>
              <input
                type="text"
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
          </div>

          <br />

          <h3 className="text-[16px] font-[500] mb-1 text-black ">
            Banner Image
          </h3>
          <br />
          <div className="grid grid-cols-8 gap-4">
            {previews?.length !== 0 &&
              previews?.map((image, index) => {
                return (
                  <div className="uploadBoxWrapper relative" key={index}>
                    {/* close icon */}
                    <span
                      className="absolute -top-[6px] -right-[6px] flex items-center justify-center w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer"
                      onClick={() => removeImg(image, index)}
                    >
                      <IoMdClose className="text-white text-[17px]" />
                    </span>

                    <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.2)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                      <img src={image} alt="" className="w-full" />
                    </div>
                  </div>
                );
              })}
            <UploadBox
              multiple={true}
              name="images"
              url="/api/banner/uploadImages"
              setPreviewsFun={setPreviewsFun}
            />
          </div>
        </div>

        <br />
        <br />
        <div className="w-[250px]">
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px] text-white" />
                Publish and View
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddHomeSlider;
