import React, { useEffect, useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../Apis";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdFilterVintage } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";

const ProductDetails = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [product, setProduct] = useState();
  const zoomSliderBig = useRef();
  const zoomSliderSmall = useRef();

  const { id } = useParams();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSmall.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  useEffect(() => {
    fetchDataFromApi(
      `/api/product/${id}?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      setTimeout(() => {
        setProduct(res?.product);
      }, 1000);
    });
  });

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[20px] font-[600]"> Product Details</h2>
      </div>
      <br />
      {product?._id !== "" &&
      product?._id !== undefined &&
      product?._id !== null ? (
        <>
          <div className="productDetails flex gap-8">
            <div className="w-[40%]">
              {product?.images?.length !== 0 && (
                <div className="flex gap-3">
                  {/* Small Img Swiper */}
                  <div className={`slider w-[15%]`}>
                    <Swiper
                      ref={zoomSliderSmall}
                      direction={"vertical"}
                      slidesPerView={5}
                      spaceBetween={10}
                      navigation={true}
                      modules={[Navigation]}
                      className={`zoomProductSlideThumb h-[400px] overflow-hidden
                 ${product?.images?.length > 5 && "space"}`}
                    >
                      {product?.images?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div
                              className={`item rounded-md overflow-hidden cursor-pointer group ${
                                slideIndex === index
                                  ? "opacity-1"
                                  : "opacity-30"
                              }`}
                              onClick={() => goto(index)}
                            >
                              <img
                                src={item}
                                className="w-full transition-all group-hover:scale-105"
                                alt=""
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>

                  {/* Big Img Swiper */}
                  <div className="zoomContainer w-[85%] overflow-hidden rounded-md">
                    <Swiper
                      ref={zoomSliderBig}
                      slidesPerView={1}
                      spaceBetween={0}
                      navigation={false}
                    >
                      {product?.images?.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <InnerImageZoom
                              zoomType="hover"
                              zoomScale={1}
                              src={item}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              )}
            </div>

            <div className="w-[60%] gap-8">
              <h1 className="text-[25px] font-[500] mb-4">{product?.name}</h1>

              <div className="flex items-center py-1 text-[14px]">
                <span className="w-[15%] font-[500] flex items-center gap-2">
                  <MdBrandingWatermark className="opacity-65" />
                  Brand :{" "}
                </span>
                <span className="text-[14px]">{product?.brand}</span>
              </div>

              <div className="flex items-center py-1 text-[14px]">
                <span className="w-[15%] font-[500] flex items-center gap-2">
                  <BiSolidCategoryAlt className="opacity-65" />
                  Category :{" "}
                </span>
                <span className="text-[14px]">{product?.catName}</span>
              </div>

              {product?.productWeight?.length !== 0 && (
                <div className="flex items-center py-1 text-[14px]">
                  <span className="w-[15%] font-[500] flex items-center gap-2">
                    <MdFilterVintage className="opacity-65" />
                    Weight :{" "}
                  </span>

                  <div className="flex items-center gap-2">
                    {product?.productWeight?.map((weight, index) => {
                      return (
                        <span
                          className="text-[12px] inline-block p-1 shadow-sm  font-[500] bg-[#fff]"
                          key={index}
                        >
                          {weight}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center py-1 text-[14px]">
                <span className="w-[15%] font-[500] flex items-center gap-2">
                  <MdRateReview className="opacity-65" />
                  Review :{" "}
                </span>
                <span className="text-[14px]">
                  ({product?.reviews?.length > 0 ? product?.reviews?.length : 0}
                  )Review
                </span>
              </div>

              <div className="flex items-center py-1 text-[14px]">
                <span className="w-[15%] font-[500] flex items-center gap-2">
                  <BsPatchCheckFill className="opacity-65" />
                  Publishd :{" "}
                </span>
                <span className="text-[14px]">
                  {product?.createdAt?.split("T")[0]}
                </span>
              </div>
              <h2 className="text-[20px] font-[500] mb-3">
                Product Description
              </h2>
              {product?.description && (
                <p className="text-[14px] ">{product?.description}</p>
              )}
            </div>
          </div>
          <br />
          <h2 className="text-[18px] font-[500]">Customer Reviews</h2>
          <div className="reviewsWrap mt-3">
            <div className="reviews w-full mb-3 h-auto p-4 bg-white rounded-sm shadow-md flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="img w-[85px] h-[85px] rounded-full overflow-hidden">
                  <img
                    src="https://cdn.vectorstock.com/i/1000v/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="info w-[80%]">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[16px] font-[500]">Amit Patel</h4>
                    <Rating name="read-only" value={5} size="small" readOnly />
                  </div>
                  <span className="text-[13px] mt-2">2025-03-29</span>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                </div>
              </div>
            </div>
            <div className="reviews w-full mb-3 h-auto p-4 bg-white rounded-sm shadow-md flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="img w-[85px] h-[85px] rounded-full overflow-hidden">
                  <img
                    src="https://cdn.vectorstock.com/i/1000v/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="info w-[80%]">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[16px] font-[500]">Amit Patel</h4>
                    <Rating name="read-only" value={5} size="small" readOnly />
                  </div>
                  <span className="text-[13px] mt-2">2025-03-29</span>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-96">
          <CircularProgress color="inherit" />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
