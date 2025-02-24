import React from "react";
import HomeCateSlider from "../components/CateSlider/HomeCateSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import AddBannerSlider from "../components/AddBannerSlider/AddBannerSlider";

// import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductSlider from "../components/HomeSlider/ProductSlider";
import AddSecondBannerSlider from "../components/AddBannerSlider/AddSecondBannerSlider";
import CompanyName from "../components/HomeSlider/CompanyName";
import HomeSliderV2 from "../components/HomeSlider/HomeSliderV2";
import BannerBoxV2 from "../components/HomeSlider/BannerBoxV2";

const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

      <HomeCateSlider />

      {/* Product Item */}
      <section className="bg-white py-8 mt-5">
        <div className="container">
          <div className="flex items-center gap-10">
            <div className="lefSec">
              <h2 className="text-[20px] font-[600]">Popular Product</h2>
              <p className="text-[14px] font-[400]">
                Do not miss the current offers until the end of March.
              </p>
            </div>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Home Appliances" />
              <Tab label="Kitchen Appliances" />
            </Tabs>
          </div>
          <ProductSlider items={5} />
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
                  Free Delivery Now On Your First Order and over $200
                </p>
              </div>
              <p className="font-bold text-[22px]">-Only $200 </p>
            </div>
            {/* Banner Slider */}

            <AddBannerSlider items={4} />
          </div>
        </section>
      </section>
      {/* Product Slider 2 */}
      <section className="py-5 pt-0  bg-white">
        <div className="container">
          <h2 className="text-[25px] font-[600]">Latest Product</h2>
          <ProductSlider items={5} />
          {/* Add Banner Slider 2 */}
          <AddSecondBannerSlider items={2} />
        </div>
      </section>
      {/* Feature Product */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-[25px] font-[600]">Future Product</h2>
          <ProductSlider items={5} />
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
