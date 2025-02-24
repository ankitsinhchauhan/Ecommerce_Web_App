import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Rating from "@mui/material/Rating";
import ProductZoom from "../components/Product/ProductZoom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ProductSlider from "../components/HomeSlider/ProductSlider";
import ProductDetailComponents from "../components/Product/ProductDetailComponents";
import { Link } from "react-router-dom";

const ProductsDetials = () => {
  const [activeTab, setActiveTab] = useState(0);

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
        <div className="container flex gap-8 items-center">
          <div className="productZoomContainer w-[30%]">
            <ProductZoom />
          </div>
          {/* Product Content */}
          <div className="productContent w-[60%] pr-10 pl-10">
            <ProductDetailComponents />
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
                activeTab === 1 && "text-primary"
              }`}
              onClick={() => setActiveTab(1)}
            >
              Product Details
            </span>

            <span
              className={`link text-[17px] cursor-pointer font-[500] ${
                activeTab === 2 && "text-primary"
              }`}
              onClick={() => setActiveTab(2)}
            >
              Reviews (5)
            </span>
          </div>
          {activeTab === 0 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              <p>
                Cool rooms quickly from corner to corner, so feel comfortable
                wherever you are. Digital Inverter technology cools the air 43%
                faster*. Its advanced design also has a 15% larger fan, 18%
                wider inlet and a 31% wider blade. So cool air is dispersed
                farther and wider**, reaching up to 15 meters.
              </p>
              <h4>Features</h4>
              <p>
                <ul>
                  <li>Cools you faster</li>
                  <li>Easy to clean, removes airborne bacteria</li>
                  <li>Automatically stays fresh and hygienic</li>
                  <li>Effortlessly optimize energy efficiency</li>
                  <li>Prevents corrosion, optimizes performance</li>
                  <li>Corrosion-resistant for added durability</li>
                  <li>Long-lasting protection, optimal cooling</li>
                  <li>Eco-friendly cooling – zero ozone impact</li>
                </ul>
              </p>

              <h4>Free Shipping & Return</h4>
              <p>
                We offer free shipping for products on orders above $50 and
                offer delivery for all orders in India.
              </p>

              <h4>Online Support</h4>
              <p>
                You will get 24 hour support with this purchase product and you
                can return it within 30days for an exchange.
              </p>
            </div>
          )}

          {/* Product Dtails */}
          {activeTab === 1 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Brand Name
                      </th>

                      <td class="px-6 py-4">SAMSUNG</td>
                    </tr>

                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Country of Origin
                      </th>

                      <td class="px-6 py-4">India</td>
                    </tr>

                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Manufacturers
                      </th>

                      <td class="px-6 py-4">Samsung Pvt. Ltd</td>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          )}

          {/* Reviews Section */}
          {activeTab === 2 && (
            <div className="shadow-md w-[80%] py-5 px-8 rounded-md">
              <div className="w-full productReviewsConteainer">
                <h2 className="text-[18px]">Customer Reviews</h2>
                <div className="reviewScroll  w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-5 pr-5">
                  <div className="review w-full pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://i.pinimg.com/736x/0f/c3/45/0fc3450c5de8fdd71e8fe4ac104d0212.jpg"
                          alt="user"
                          className="w-full"
                        />
                      </div>
                      <div className="w-[80%]">
                        <h4 className="text-[16px]">Mahesh Sharam</h4>
                        <h5 className="text-[13px] mb-0">2025-01-05</h5>
                        <p className="mt-0 mb-0">
                          Our homeis old fashioned so it has high ceilings,
                          which can be a challenge for air conditioning. No AC
                          has been able to make the room cooler. But this Voltas
                          model has been up to the task, efficiently cooling the
                          room nice and cold. It's energy-efficient, which is
                          important given the larger area it needs to cool.
                        </p>
                      </div>
                    </div>
                    <Rating name="size-small" defaultValue={4} />
                  </div>
                  <div className="review w-full pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full  ">
                        <img
                          src="https://i.pinimg.com/736x/65/b5/de/65b5de946d290cf9ce21def2937550e6.jpg"
                          alt="user"
                          className="w-full"
                        />
                      </div>
                      <div className="w-[80%]">
                        <h4 className="text-[16px]">Jay Panchal</h4>
                        <h5 className="text-[13px] mb-0">2025-02-19</h5>
                        <p className="mt-0 mb-0">
                          Our homeis old fashioned so it has high ceilings,
                          which can be a challenge for air conditioning. No AC
                          has been able to make the room cooler. But this Voltas
                          model has been up to the task, efficiently cooling the
                          room nice and cold. It's energy-efficient, which is
                          important given the larger area it needs to cool.
                        </p>
                      </div>
                    </div>
                    <Rating name="size-small" defaultValue={4} />
                  </div>
                  <div className="review w-full pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://i.pinimg.com/736x/1d/7a/ec/1d7aec6c1546abfd71358816f8282384.jpg"
                          alt="user"
                          className="w-full"
                        />
                      </div>
                      <div className="w-[80%]">
                        <h4 className="text-[16px]">Rakesh Veram</h4>
                        <h5 className="text-[13px] mb-0">2025-01-24</h5>
                        <p className="mt-0 mb-0">
                          Our homeis old fashioned so it has high ceilings,
                          which can be a challenge for air conditioning. No AC
                          has been able to make the room cooler. But this Voltas
                          model has been up to the task, efficiently cooling the
                          room nice and cold. It's energy-efficient, which is
                          important given the larger area it needs to cool.
                        </p>
                      </div>
                    </div>
                    <Rating name="size-small" defaultValue={4} />
                  </div>
                  <div className="review w-full pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img
                          src="https://i.pinimg.com/736x/22/5c/e4/225ce47d454d11924faf881aa805386b.jpg"
                          alt="user"
                          className="w-full"
                        />
                      </div>
                      <div className="w-[80%]">
                        <h4 className="text-[16px]">Harsh Patel</h4>
                        <h5 className="text-[13px] mb-0">2025-01-15</h5>
                        <p className="mt-0 mb-0">
                          Our homeis old fashioned so it has high ceilings,
                          which can be a challenge for air conditioning. No AC
                          has been able to make the room cooler. But this Voltas
                          model has been up to the task, efficiently cooling the
                          room nice and cold. It's energy-efficient, which is
                          important given the larger area it needs to cool.
                        </p>
                      </div>
                    </div>
                    <Rating name="size-small" defaultValue={4} />
                  </div>
                  <br />
                  <div className="reviewForm bg-[#fafafa] p-4">
                    <h2 className="text-[18px]">Add a Review</h2>
                    <form className="w-full mt-5">
                      <TextField
                        id="outlined-multiline-static"
                        label="Write a review"
                        multiline
                        rows={5}
                        className="w-full"
                      />

                      <Rating
                        name="size-small"
                        defaultValue={4}
                        className="mt-5"
                      />
                      <div className="flex items-center mt-4">
                        <Button className="btn-org">Submit Review</Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="container pt-8">
          <h2 className="text-[25px] font-[600] pb-0">Related Product</h2>
          <ProductSlider items={5} />
        </div>
      </section>
    </>
  );
};

export default ProductsDetials;
