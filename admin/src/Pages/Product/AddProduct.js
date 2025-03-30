import React, { useContext, useEffect, useState } from "react";

import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import UploadBox from "../../Components/UploadBox";
import CircularProgress from "@mui/material/CircularProgress";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App";
import { addData, deleteImages } from "../../Apis";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    category: "",
    catName: "",
    catId: "",
    price: "",
    oldPrice: "",
    countInStock: "",
    brand: "",
    discount: "",
    isFeatured: false,
    productWeight: [],
    rating: "",
  });

  const [productCat, setProductCat] = useState("");
  const [productFeatured, setProductFeatured] = useState("");
  const [productWeight, setProductWeight] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.catId = event.target.value;
    formFields.category = event.target.value;
  };

  const selectCatByName = (name) => {
    formFields.catName = name;
  };

  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
    formFields.isFeatured = event.target.value;
  };

  const handleChangeProductWeight = (event) => {
    const {
      target: { value },
    } = event;
    setProductWeight(typeof value === "string" ? value.split(",") : value);
    formFields.productWeight = value;
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

  const onChangeRating = (e) => {
    setFormFields(() => ({
      ...formFields,
      rating: e.target.value,
    }));
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
    e.preventDefault(0);

    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter product name");
      setIsLoading(false);
      return false;
    }
    if (formFields.description === "") {
      context.openAlertBox("error", "Please enter description");
      setIsLoading(false);
      return false;
    }
    if (formFields.catId === "") {
      context.openAlertBox("error", "Please  select product category");
      setIsLoading(false);
      return false;
    }

    if (formFields.price === "") {
      context.openAlertBox("error", "Please enter price");
      setIsLoading(false);
      return false;
    }
    if (formFields.oldPrice === "") {
      context.openAlertBox("error", "Please enter oldPrice");
      setIsLoading(false);
      return false;
    }

    if (formFields.countInStock === "") {
      context.openAlertBox("error", "Please enter countInStock");
      setIsLoading(false);
      return false;
    }
    if (formFields.brand === "") {
      context.openAlertBox("error", "Please enter brand");
      setIsLoading(false);
      return false;
    }
    if (formFields.discount === "") {
      context.openAlertBox("error", "Please enter discount");
      setIsLoading(false);
      return false;
    }

    if (formFields.rating === "") {
      context.openAlertBox("error", "Please enter rating");
      setIsLoading(false);
      return false;
    }

    if (previews?.length === 0) {
      context.openAlertBox("error", "Please select product images");

      setIsLoading(false);

      return false;
    }

    console.log(formFields);

    addData(
      `/api/product/create?token=${localStorage.getItem("accesstoken")}`,
      formFields,
      {
        withCredentials: true,
      }
    ).then((res) => {
      console.log(res);

      context.openAlertBox("success", "Product Created");

      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanle({
          open: false,
        });
        navigate("/products");
      }, 2500);
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8 " onSubmit={handleSubmit}>
        <div className="scroll max-h-[71vh] overflow-y-scroll pr-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Name
              </h3>
              <input
                type="text"
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
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
                name="description"
                value={formFields.description}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-5">
            {/* Category */}
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Category
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

            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
              />
            </div>
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Old Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
                name="oldPrice"
                value={formFields.oldPrice}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-5">
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Stock
              </h3>
              <input
                type="number"
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
                name="countInStock"
                value={formFields.countInStock}
                onChange={onChangeInput}
              />
            </div>
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Brand
              </h3>
              <input
                type="text"
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
                name="brand"
                value={formFields.brand}
                onChange={onChangeInput}
              />
            </div>
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Discount
              </h3>
              <input
                type="number"
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
                name="discount"
                value={formFields.discount}
                onChange={onChangeInput}
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
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Weight
              </h3>
              <Select
                multiple
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                value={productWeight}
                label="Category"
                className="w-full"
                onChange={handleChangeProductWeight}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1.0}>1.0</MenuItem>
                <MenuItem value={2.0}>1.5</MenuItem>
                <MenuItem value={3.0}>2.0</MenuItem>
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Product Rating
              </h3>
              <Rating
                name="half-rating"
                defaultValue={1}
                precision={0.5}
                onChange={onChangeRating}
              />
            </div>
          </div>

          <div className="col w-full p-5 px-0">
            <h3 className="font-[700] text-[18px] mb-3">Product Images</h3>

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
                url="/api/product/uploadImages"
                setPreviewsFun={setPreviewsFun}
              />
            </div>
          </div>
        </div>

        <hr />
        <br />
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
      </form>
    </section>
  );
};

export default AddProduct;
