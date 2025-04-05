import React, { useState, useEffect, useContext, useRef } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import ProductZoom from "../components/Product/ProductZoom";

import ProductSlider from "../components/HomeSlider/ProductSlider";
import ProductDetailComponents from "../components/Product/ProductDetailComponents";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchDataFromApi } from "../api";
import Reviews from "./reviews";

const ProductsDetials = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [productData, setProductData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reviewscount, setReviewsCount] = useState(0);
  const [relatedProductData, setRelatedProductData] = useState([]);

  const { id } = useParams();

  const reviewsSection = useRef();

  useEffect(() => {
    fetchDataFromApi(`/api/user/getReview?productId=${id}`).then((res) => {
      if (res?.error === false) {
        setReviewsCount(res.reviews.length);
      }
    });
  }, [reviewscount]);

  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setProductData(res?.product);

        //releated product
        fetchDataFromApi(
          `/api/product/getAllProductsByCatId/${res?.product?.catId}`
        ).then((res) => {
          if (res?.error === false) {
            const filteredData = res?.products?.filter(
              (item) => item._id !== id
            );
            setRelatedProductData(filteredData);
          }
        });

        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    });

    window.scrollTo(0, 0);
  }, [id]);

  const gotoReviews = () => {
    window.scrollTo({
      top: reviewsSection?.current?.offsetTop - 170,
      behavior: "smooth",
    });
    setActiveTab(1);
  };

  return (
    <>
      <div className="py-5">
        <div className="container cursor-pointer">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              to="/"
              underline="hover"
              color="inherit"
              className="link transition !text-[14px]"
            >
              Home
            </Link>
            <Link
              to="/appliances"
              underline="hover"
              color="inherit"
              className="link transition !text-[14px]"
            >
              Appliances
            </Link>
            <Link
              to="/"
              underline="hover"
              color="inherit"
              className="link transition !text-[14px]"
            >
              Air Conditioner
            </Link>
          </Breadcrumbs>
        </div>
      </div>

      <section className="bg-white  py-5 ">
        {isLoading === true ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="container flex gap-8 items-center">
              <div className="productZoomContainer w-[30%]">
                <ProductZoom images={productData?.images} />
              </div>
              {/* Product Content */}
              <div className="productContent w-[60%] pr-10 pl-10">
                <ProductDetailComponents
                  item={productData}
                  reviewscount={reviewscount}
                  gotoReviews={gotoReviews}
                />
              </div>
            </div>
            {/* Description section */}
            <div className="container pt-10 ">
              <div className="flex items-center gap-8 mb-5">
                <span
                  className={`link text-[17px] cursor-pointer font-[500] ${
                    activeTab === 0 && "text-primary"
                  }`}
                  onClick={() => setActiveTab(0)}
                >
                  Description
                </span>

                <span
                  className={`link text-[17px] cursor-pointer font-[500] ${
                    activeTab === 2 && "text-primary"
                  }`}
                  onClick={() => setActiveTab(1)}
                  ref={reviewsSection}
                >
                  Reviews ({reviewscount})
                </span>
              </div>
              {activeTab === 0 && (
                <div className="shadow-md w-full py-5 px-8 rounded-md">
                  {productData?.description}
                </div>
              )}

              {/* Reviews Section */}
              {activeTab === 1 && (
                <div className="shadow-md w-[80%] py-5 px-8 rounded-md">
                  {productData?.length !== 0 && (
                    <Reviews
                      productId={productData?._id}
                      setReviewsCount={setReviewsCount}
                    />
                  )}
                </div>
              )}
            </div>
            {relatedProductData?.length !== 0 && (
              <div className="container pt-8">
                <h2 className="text-[25px] font-[600] pb-0">Related Product</h2>
                <ProductSlider items={5} data={relatedProductData} />
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default ProductsDetials;
