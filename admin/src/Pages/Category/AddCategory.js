import React, { useContext } from "react";
import UploadBox from "../../Components/UploadBox";
import Button from "@mui/material/Button";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { deleteImages, postData } from "../../Apis";
import { MyContext } from "../../App";

const AddCategory = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);

  const context = useContext(MyContext);

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

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = previews;

    deleteImages(`/api/category/deleteImage?img=${image}`).then((res) => {
      imageArr.splice(index, 1);
      setPreviews([]);

      setTimeout(() => {
        setPreviews(imageArr);
        // formFields.images = previewsArr;
      }, 100);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter category name");
      setIsLoading(false);
      return false;
    }

    if (previews?.length === 0) {
      context.openAlertBox("error", "Please select category images");
      setIsLoading(false);
      return false;
    }

    console.log(formFields);

    postData(
      `/api/category/create?token=${localStorage.getItem("accesstoken")}`,
      formFields,
      {
        withCredentials: true,
      }
    ).then((res) => {
      console.log(res);
      setIsLoading(false);
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="scroll max-h-[71vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-[25%]">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Category Name
              </h3>
              <input
                type="text"
                name="name"
                value={formFields.name}
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
              url="/api/category/uploadImages"
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

export default AddCategory;
