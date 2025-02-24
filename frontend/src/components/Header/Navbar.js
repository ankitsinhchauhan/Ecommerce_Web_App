import React, { useState } from "react";
import Button from "@mui/material/Button";
import { RiMenu2Line } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { MdRocketLaunch } from "react-icons/md";
import CategoryPanel from "../Category/CategoryPanel";

import "./Search/style.css";

const Navbar = () => {
  const [isOpenCategoryPanel, setIsOpenCategoryPanel] = useState(false);

  const openCategoryPanel = () => {
    setIsOpenCategoryPanel(true);
  };

  return (
    <>
      <nav className="py-2">
        <div className="container flex items-center justify-end gap-8">
          <div className="co1_1 w-[20%] border-r  border-[rgba(0,0,0,0.2)]">
            <Button
              className="!text-black gap-2 w-full font-bold"
              onClick={openCategoryPanel}
            >
              <RiMenu2Line className="text-[18px]" />
              Show By Categories
              <LiaAngleDownSolid className="text-[13px] ml-auto font-bold" />
            </Button>
          </div>
          {/* navbar */}
          <div className="co1_2 w-[60%]">
            <ul className="flex items-center  gap-5 ">
              <li className="list-none">
                <Link
                  to="/ProductListing"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-primary">
                    Shop
                  </Button>
                </Link>
              </li>

              <li className="list-none relative">
                <Link
                  to="/categories"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-primary">
                    Categories
                  </Button>
                </Link>
                {/* Category Menu */}
                <div className="subMenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
                  <ul>
                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start">
                          Air Conditioners
                        </Button>
                      </Link>
                    </li>
                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Refrigerators
                        </Button>
                      </Link>
                    </li>
                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Washing Machines
                        </Button>
                      </Link>
                    </li>
                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Dishwashers
                        </Button>
                      </Link>
                    </li>
                    <li className="list-none w-full">
                      <Link to="/" className="w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Home & Kichen
                        </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="list-none">
                <Link
                  to="/about"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-primary">
                    About
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/reviews"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-primary">
                    Reviews
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/contact"
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-primary">
                    Contact Us
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
          {/* Free Delivery */}
          <div className="col3 w-[20%]">
            <p className="text-[16px] font-[500] flex items-center gap-3 mb-0 mt-0">
              <MdRocketLaunch className="text-[18px]" />
              Free National Delivery
            </p>
          </div>
        </div>
      </nav>

      {/* Category Panel */}
      <CategoryPanel
        isOpenCategoryPanel={isOpenCategoryPanel}
        setIsOpenCategoryPanel={setIsOpenCategoryPanel}
      />
    </>
  );
};

export default Navbar;
