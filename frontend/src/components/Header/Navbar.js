import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { RiMenu2Line } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { MdRocketLaunch } from "react-icons/md";
import CategoryPanel from "../Category/CategoryPanel";

import "./Search/style.css";
import { MyContext } from "../../App";

const Navbar = () => {
  const [isOpenCategoryPanel, setIsOpenCategoryPanel] = useState(false);
  const [catData, setCatData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    setCatData(context?.catData);
  }, [context?.catData]);

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
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-primary">
                    Shop
                  </Button>
                </Link>
              </li>

              <li className="list-none relative">
                <div className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-primary">
                    Categories
                  </Button>
                </div>
                {/* Category Menu */}
                {catData?.length !== 0 && (
                  <div className="subMenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
                    <ul>
                      {catData?.map((cat, index) => {
                        return (
                          <li className="list-none w-full" key={index}>
                            <Link
                              to={`/product?catId=${cat?._id}`}
                              className="w-full"
                            >
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start">
                                {cat?.name}
                              </Button>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
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

      {catData?.length !== 0 && (
        <CategoryPanel
          isOpenCategoryPanel={isOpenCategoryPanel}
          setIsOpenCategoryPanel={setIsOpenCategoryPanel}
          data={catData}
        />
      )}
    </>
  );
};

export default Navbar;
