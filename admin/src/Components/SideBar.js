import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { BsBagCheck } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";

import { Collapse } from "react-collapse";
import { MyContext } from "../App";

const SideBar = () => {
  const [subMenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if (subMenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  const context = useContext(MyContext);

  return (
    <>
      <div
        className={`sidebar fixed top-0 left-0 z-[50] bg-[#fff] h-full border-r border-[rgba(0,0,0,0.2)] py-2 px-4 ${
          context.isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
        } `}
      >
        <div className="py-2 w-full mt-5">
          <Link to="/" className="text-[20px] font-bold font-outfit">
            <img src="./spLogo.png" alt="" className="w-[180px]" />
          </Link>
        </div>
        <ul className="mt-4">
          {/* Dashboard */}
          <li>
            <Link to="/">
              <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
                <RxDashboard className="text-[18px]" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </li>
          {/* Home Slides */}
          <li>
            <Button
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]"
              onClick={() => isOpenSubMenu(5)}
            >
              <FaRegImage className="text-[19px]" />
              <span>Home Banner</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                <FaAngleDown
                  className={`transition-all ${
                    subMenuIndex === 4 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>
            {/* Homeslides Sub Menu */}
            <Collapse isOpened={subMenuIndex === 5 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/homeSlider/list">
                    <Button className="!text-[rgba(0,0,0,0.7)] !text-[13px] !font-[500] !capitalize !justify-start !w-full !pl-9 flex gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Home Banner List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !text-[13px] !font-[500] !capitalize !justify-start !w-full !pl-9 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanle({
                        open: true,
                        model: "Add Home Banner",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add Home Banner
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          {/* Users */}
          <li>
            <Link to="/users">
              <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
                <FiUsers className="text-[20px]" />
                <span>Users</span>
              </Button>
            </Link>
          </li>
          {/* Products */}
          <li>
            <Button
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]"
              onClick={() => isOpenSubMenu(3)}
            >
              <RiProductHuntLine className="text-[19px]" />
              <span>Products</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                <FaAngleDown
                  className={`transition-all ${
                    subMenuIndex === 3 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>
            {/* Product Sub Menu */}
            <Collapse isOpened={subMenuIndex === 3 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/products">
                    <Button className="!text-[rgba(0,0,0,0.7)] !text-[13px] !font-[500] !capitalize !justify-start !w-full !pl-9 flex gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Product List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !text-[13px] !font-[500] !capitalize !justify-start !w-full !pl-9 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanle({
                        open: true,
                        model: "Add Product",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Product Upload
                  </Button>
                </li>

                <li className="w-full">
                  <Link to="/product/addWeight">
                    <Button className="!text-[rgba(0,0,0,0.7)] !text-[13px] !font-[500] !capitalize !justify-start !w-full !pl-9 flex gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Add Product Weight
                    </Button>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          {/* category */}
          <li>
            <Button
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]"
              onClick={() => isOpenSubMenu(4)}
            >
              <TbCategory className="text-[19px]" />
              <span>Category</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                <FaAngleDown
                  className={`transition-all ${
                    subMenuIndex === 4 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>
            {/* Category Sub Menu */}
            <Collapse isOpened={subMenuIndex === 4 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/category/list">
                    <Button className="!text-[rgba(0,0,0,0.7)] !text-[13px] !font-[500] !capitalize !justify-start !w-full !pl-9 flex gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                      Category List
                    </Button>
                  </Link>
                </li>

                <li className="w-full">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !text-[13px] !font-[500] !capitalize !justify-start !w-full !pl-9 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanle({
                        open: true,
                        model: "Add New Category",
                      })
                    }
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>
                    Add a Category
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link to="/orders">
              <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
                <BsBagCheck className="text-[20px]" />
                <span>Orders</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
              <MdLogout className="text-[20px]" />
              <span>Logout</span>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
