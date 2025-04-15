import React, { useContext } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { TfiWallet } from "react-icons/tfi";
import { GoGift } from "react-icons/go";
import { TbTruckReturn } from "react-icons/tb";
import { Link } from "react-router-dom";
import { BiChat } from "react-icons/bi";
import { Button, Dialog, DialogContent } from "@mui/material";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Drawer from "@mui/material/Drawer";

import { IoMdClose } from "react-icons/io";
import { MyContext } from "../../App";
import CartPanel from "../Cart/CartPanel";
import ProductDetailComponents from "../Product/ProductDetailComponents";
import ProductZoom from "../Product/ProductZoom";
import AddAddress from "../../pages/AddAddress";

const Footer = () => {
  const context = useContext(MyContext);
  return (
    <>
      <div className="">
        <footer className="py-5 bg-[#fafafa] mt-2">
          {/* delivey , return, payment, gift, support */}
          <div className="container">
            <div className="flex items-center justify-center gap-2 py-8 pb-8">
              <div className="co1 flex items-center justify-center flex-col group w-[18%]">
                <LiaShippingFastSolid className="text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-[600] mt-3 ">Free Shipping</h3>
                <p className="text-[12px] font-[500] ">
                  For all Orders Over $100
                </p>
              </div>
              <div className="co1 flex items-center justify-center flex-col group w-[18%]">
                <TbTruckReturn className="text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-[600] mt-3 ">30 Days Return</h3>
                <p className="text-[12px] font-[500] ">
                  For an Exchange Product
                </p>
              </div>
              <div className="co1 flex items-center justify-center flex-col group w-[18%]">
                <TfiWallet className="text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-[600] mt-3 ">
                  Secured Payment
                </h3>
                <p className="text-[12px] font-[500] ">
                  Payment Cards Accepted
                </p>
              </div>
              <div className="co1 flex items-center justify-center flex-col group w-[18%]">
                <GoGift className="text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-[600] mt-3 ">Special Gift</h3>
                <p className="text-[12px] font-[500] ">
                  Our First Product Order
                </p>
              </div>
              <div className="co1 flex items-center justify-center flex-col group w-[18%]">
                <TfiHeadphoneAlt className="text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-[600] mt-3 ">Support 24/7</h3>
                <p className="text-[12px] font-[500] ">Contact us Anytime</p>
              </div>
            </div>
            <br />
            <hr />

            {/* footer section parts */}
            <div className="footer flex py-8">
              {/* Contact section  */}
              <div className="part1 w-[25%]  border-r border-[rgba(0,0,0,0.2)]">
                <h2 className="text-[18px] font-[600] mb-4">Contact Us</h2>
                <p className="text-[14px] font-[400] pb-4">
                  classshop - Mega Super Store
                  <br /> 507-Union Trade Center France
                </p>

                <Link
                  to="mailto:someone@example.com"
                  className="link text-[14px]"
                >
                  helpdeskindia@shopnest.com
                </Link>
                <span className="text-[18px] font-[600] block w-full mt-3 text-primary">
                  (+91) 7433-021-436
                </span>

                <div className="flex items-center gap-2 mt-2 ">
                  <BiChat className="text-[40px] text-primary" />
                  <span className="text-[16px] font-[600]">
                    Online Chat
                    <br /> Get Expert Help
                  </span>
                </div>
              </div>
              {/* Product section  */}
              <div className="part2 w-[40%] flex pl-8">
                <div className="part2_col1 w-[50%]">
                  <h2 className="text-[18px] font-[600] mb-4">Products</h2>
                  <ul className="list">
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link to="/" className="link">
                        Price Drop
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link to="/" className="link">
                        New Products
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link to="/" className="link">
                        Best Sales
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link to="/" className="link">
                        Contact Us
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link to="/" className="link">
                        Stores
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Our Company section  */}
                <div className="part2_col2 w-[50%]">
                  <h2 className="text-[18px] font-[600] mb-4">Our Compnay</h2>
                  <ul className="list">
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link to="/" className="link">
                        Price Delivery
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link to="/" className="link">
                        Legal Notice
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link to="/" className="link">
                        Terms And Conditions Of Use
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link to="/" className="link">
                        About Us
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link to="/" className="link">
                        Secure Payment
                      </Link>
                    </li>
                    <li className="list-none text-[14px] w-full mb-2">
                      <Link to="/" className="link">
                        Login
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* subscirpbe seciton */}
              <div className="part3 w-[35%] flex flex-col pl-8 pr-8">
                <h2 className="text-[18px] font-[600] mb-4">
                  Subscribe to newsletter
                </h2>
                <p className="text-[13px]">
                  Subscribe to our latest newsletter to get news about special
                  discounts.
                </p>
                <form className="mt-5">
                  <input
                    type="text"
                    placeholder="Enter Your Email Address"
                    className="w-full h-[45px] border outline-none pl-4 pr-4 rounded-sm mb-4 focus:border-[rgba(0,0,0,0.3)]"
                  />
                  <Button className="btn-org">Subscribe</Button>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="I agree to the terms and conditions and the privacy policy"
                  />
                </form>
              </div>
            </div>
          </div>
        </footer>
        {/* bootsrip */}
        <div className="bottomStripe border-t border-[rgba(0,0,0,0.2)] py-2 bg-white">
          <div className="container flex items-center justify-between">
            <p className="text-[16px]">
              Copyright &copy; 2025 ShopNest Of India. All Rights Reserved.
            </p>
            <ul className="flex justify-center items-center gap-3">
              <li className="list-none">
                <Link
                  to="/"
                  target="_blank"
                  className="w-[35px] h-[35px] rounded-full  border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                >
                  <FaFacebookF className="text-[18px] group-hover:text-white" />
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/"
                  target="_blank"
                  className="w-[35px] h-[35px] rounded-full  border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                >
                  <FaXTwitter className="text-[18px] group-hover:text-white" />
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/"
                  target="_blank"
                  className="w-[35px] h-[35px] rounded-full  border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                >
                  <FaInstagram className="text-[22px] group-hover:text-white" />
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/"
                  target="_blank"
                  className="w-[35px] h-[35px] rounded-full  border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                >
                  <FaPinterest className="text-[22px] group-hover:text-white" />
                </Link>
              </li>
            </ul>
            {/* Copy Right */}
          </div>
        </div>
        <br />
      </div>
      {/* Cart Panel */}
      <Drawer
        open={context.openCartPanel}
        onClose={context.toggleCartPanel(false)}
        anchor={"right"}
        className="cartPanel"
      >
        <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]">
          <h4>Shopping Cart ({context?.cartData?.length})</h4>
          <IoMdClose
            className="text-[20px] cursor-pointer"
            onClick={context.toggleCartPanel(false)}
          />
        </div>
        {context?.cartData?.length !== 0 ? (
          <CartPanel data={context?.cartData} />
        ) : (
          <>
            <div className="flex items-center justify-center flex-col pt-[100px] gap-5">
              <img src="/empty-cart.png" alt="" className="w-[150px]" />
              <h4>Your Cart is currently empty</h4>
              <Button
                className="btn-org btn-sm"
                onClick={context.toggleCartPanel(false)}
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </Drawer>

      {/* Address panel */}

      <Drawer
        open={context.openAddressPanel}
        onClose={context.toggleAddressPanel(false)}
        anchor={"right"}
        className="addressPanel"
      >
        <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]">
          <h4>
            {context?.addressMode === "add" ? "Add" : "Edit"} Delivery Address
          </h4>
          <IoMdClose
            className="text-[20px] cursor-pointer"
            onClick={context.toggleAddressPanel(false)}
          />
        </div>

        <AddAddress />
      </Drawer>

      <Dialog
        open={context?.openProductDetailsModal.open}
        fullWidth={context?.fullWidth}
        maxWidth={context?.maxWidth}
        onClose={context?.handleCloseProductDetailModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="productDetailsModal"
      >
        <DialogContent>
          <div className="flex items-center w-full productDetailsModalContainer relative">
            <Button
              className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-black !absolute !top-[0px] !right-[0px] !bg-[#f1f1f1] "
              onClick={context?.handleCloseProductDetailModal}
            >
              <IoMdClose className="text-[20px]" />
            </Button>
            {context?.openProductDetailsModal?.item?.length !== 0 && (
              <>
                <div className="col1 w-[45%] px-3 ">
                  <ProductZoom
                    images={context?.openProductDetailsModal?.item?.images}
                  />
                </div>
                <div className="col2 w-[55%] py-8 px-8 pr-16 productContent">
                  <ProductDetailComponents
                    item={context?.openProductDetailsModal?.item}
                  />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;
