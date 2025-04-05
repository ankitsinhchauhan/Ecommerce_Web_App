import React, { useContext, useEffect, useState } from "react";
import HomeCateSlider from "../components/CateSlider/HomeCateSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import AddBannerSlider from "../components/AddBannerSlider/AddBannerSlider";

// import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddSecondBannerSlider from "../components/AddBannerSlider/AddSecondBannerSlider";
import CompanyName from "../components/HomeSlider/CompanyName";
import HomeSliderV2 from "../components/HomeSlider/HomeSliderV2";
import BannerBoxV2 from "../components/HomeSlider/BannerBoxV2";
import { MyContext } from "../App";
import { fetchDataFromApi } from "../api";
import ProductSlider from "../components/HomeSlider/ProductSlider";
import ProductLoading from "../components/Product/ProductLoading";

const Home = () => {
  const [value, setValue] = useState(0);
  const [populatProductsData, setPopularProductsData] = useState([]);
  const [productData, setAllProductsData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchDataFromApi(`/api/product/getAllProducts`).then((res) => {
      console.log(res);
      setAllProductsData(res?.products);
    });

    fetchDataFromApi(`/api/product/getFeaturedProducts`).then((res) => {
      console.log(res);
      setFeaturedProducts(res?.products);
    });
  }, []);

  useEffect(() => {
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${context?.catData[0]?._id}`
    ).then((res) => {
      setPopularProductsData(res?.products);
    });
  }, [context?.catData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterByCatId = (id) => {
    setPopularProductsData([]);
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
      setPopularProductsData(res?.products);
    });
  };

  return (
    <>
      {/* <HomeSlider /> */}

      {/* HomeSlider Second */}
      <section className="py-6">
        <div className="container flex items-center gap-6">
          <div className="part1 w-[70%]">
            <HomeSliderV2 />
          </div>
          {/* BannerBoxV2 */}
          <div className="part1 w-[30%]  gap-5 pl-5 flex items-center justify-between flex-col">
            <BannerBoxV2 info="left" image={"./FirstBanner/Brown.jpg"} />
            <BannerBoxV2
              info="right"
              image={"./FirstBanner/Refrigerator.jpg"}
            />
          </div>
        </div>
      </section>

      {context?.catData?.length !== 0 && (
        <HomeCateSlider data={context?.catData} />
      )}

      {/* Product Item */}
      <section className="bg-white py-8 mt-5">
        <div className="container">
          <div className="flex items-center gap-10">
            <div className="lefSec">
              <h2 className="text-[25px] font-[600]">Popular Product</h2>
              <p className="text-[14px] font-[400]  mt-0 mb-0">
                Do not miss the current offers until the end of March.
              </p>
            </div>
            <div className="rightSec w-[60%]">
              <Tabs
                value={value}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                onChange={handleChange}
              >
                {context?.catData?.length !== 0 &&
                  context?.catData?.map((cat, index) => {
                    return (
                      <Tab
                        label={cat?.name}
                        onClick={() => filterByCatId(cat?._id)}
                      />
                    );
                  })}
              </Tabs>
            </div>
          </div>

          {populatProductsData?.length === 0 && <ProductLoading />}

          {populatProductsData?.length !== 0 && (
            <ProductSlider items={6} data={populatProductsData} />
          )}
        </div>
        {/* Delivery, Location, Return and GST Biil  */}
        <section className="py-10  bg-white mt-4">
          <div className="container">
            <div className="freeShipping w-[85%] m-auto py-4 p-4 border border-blue-400 flex items-center justify-between rounded-md mb-7">
              <div className="col1 flex items-center gap-4">
                {" "}
                <LiaShippingFastSolid className="text-[50px]" />
                <span className="text-[20px] font-[600] uppercase">
                  Free Delivery
                </span>
              </div>

              <div className="col2">
                <p className="mb-0 font-[500]">
                  Free Delivery Now On Your First Order and over &#x20b9;1000
                </p>
              </div>
              <p className="font-bold text-[22px]"> - only &#x20b9;1000 </p>
            </div>
            {/* Banner Slider */}

            <AddBannerSlider items={4} />
          </div>
        </section>
      </section>
      {/* Product Slider 2 */}
      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[25px] font-[600]">Latest Product</h2>

          {productData?.length === 0 && <ProductLoading />}

          {productData?.length !== 0 && (
            <ProductSlider items={6} data={productData} />
          )}

          {/* Add Banner Slider 2 */}
          <AddSecondBannerSlider items={2} />
        </div>
      </section>
      {/* Feature Product */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-[25px] font-[600]">Future Product</h2>

          {featuredProducts?.length === 0 && <ProductLoading />}

          {featuredProducts?.length !== 0 && (
            <ProductSlider items={6} data={featuredProducts} />
          )}
        </div>
      </section>

      {/* Company Section */}
      <section className=" compnaySection mb-5">
        <div className="">
          <CompanyName />
        </div>
      </section>
    </>
  );
};

export default Home;
