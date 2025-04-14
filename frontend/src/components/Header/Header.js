import React, { useContext, useState } from "react";
import Search from "./Search/Search";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";

import { GoPerson } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { BsBagCheck } from "react-icons/bs";

import Navbar from "./Navbar";
import { MyContext } from "../../App";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../api";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAnchorEl(null);

    fetchDataFromApi(
      `/api/user/logout?token=${localStorage.getItem("accesstoken")}`,
      {
        withCredentials: true,
      }
    ).then((res) => {
      console.log(res);
      if (res?.error === false) {
        context.setIsLogin(false);
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        context.setUserData(null);
        context?.setCartData([]);
        context?.setMyListData([]);
        navigate("/");
      }
    });
  };

  return (
    <header className="bg-white shadow-md font-outfit sticky -top-[47px] z-[100]">
      <div className="top-strip   bg-gray-10 border-gray-300 border-t-[1px] border-b-[1px]">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-[13px]">
                No Cost EMI & Instant Bank Caseback available
              </p>
            </div>
            {/* Help  / Order */}
            <div className="col2 flex items-center justify-end">
              <ul className="flex items-center gap-2">
                <li className="list-none">
                  <Link
                    to="contactUs"
                    className="text-[13px] link font-[500] transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="contactUs"
                    className="text-[13px] link font-[500] transition"
                  >
                    order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header border-b-[1px] border-gray-300 py-5">
        <div className="container flex items-center justify-between">
          {/* logo */}
          <div className=" col1 w-[25%] flex">
            <Link
              to="/"
              className="font-bold font-outfit text-[35px] flex justify-center items-center"
            >
              <img src="./spLogo.png" alt="" className="h-[40px]" />
            </Link>
          </div>

          {/* Search bar */}
          <div className="col2 px-5 w-[40%]">
            <Search />
          </div>
          {/* Login, Wishlist, Cart */}
          <div className="col3 w-[35%] flex items-center pl-7  ">
            <ul className="flex items-center justify-end w-full gap-3 ">
              {context.isLogin === false ? (
                <li className="list-none">
                  <Tooltip title="Login">
                    <Link
                      to="/login"
                      className="link transition text-[16px] font-[500] text-gray-600 px-1"
                    >
                      Login
                    </Link>
                    <span className="fonte-bold">|</span>
                    <Link
                      to="/register"
                      className="link transition text-[16px] font-[500] text-gray-600 px-1"
                    >
                      Register
                    </Link>
                  </Tooltip>
                </li>
              ) : (
                // Profile Account
                <>
                  <Button
                    className="myAccountWrap !text-[#000] flex items-center gap-3 cursor-pointer"
                    onClick={handleClick}
                  >
                    <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1]">
                      <GoPerson className="text-[18px] text-[rgba(0,0,0,0.9)]" />
                    </Button>
                    <div className="info flex-col font-outfit">
                      <h4 className=" leading-3 text-[14px] text-[rgba(0,0,0,0.7)] mb-0 capitalize text-left justify-start ">
                        {context?.userData?.name}
                      </h4>
                      <span className="text-[13px] text-[rgba(0,0,0,0.7)] lowercase">
                        {context?.userData?.email}
                      </span>
                    </div>
                  </Button>

                  {/* Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Link to="/my-account" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-2"
                      >
                        <GoPerson className="text-[18px]" />
                        <span className="text-[14px]"> My account</span>
                      </MenuItem>
                    </Link>

                    <Link to="/my-list" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-2"
                      >
                        <FaRegHeart className="text-[18px]" />
                        <span className="text-[14px]"> My List</span>
                      </MenuItem>
                    </Link>
                    <Link to="/my-orders" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-2"
                      >
                        <BsBagCheck className="text-[18px]" />
                        <span className="text-[14px]"> Orders</span>
                      </MenuItem>
                    </Link>

                    <Link to="/reviews" className="w-full block">
                      <MenuItem
                        onClick={handleClose}
                        className="flex gap-2 !py-2"
                      >
                        <BsBagCheck className="text-[18px]" />
                        <span className="text-[14px]">Reviews</span>
                      </MenuItem>
                    </Link>

                    <MenuItem onClick={logout} className="flex gap-2 !py-2">
                      <MdLogout className="text-[18px]" />
                      <span className="text-[14px]"> Logout</span>
                    </MenuItem>
                  </Menu>
                </>
              )}

              {/* WishList */}
              <li>
                <Tooltip title="WishList">
                  <Link to="/my-list">
                    <IconButton aria-label="WishList">
                      <StyledBadge
                        badgeContent={
                          context?.myListData?.length !== 0
                            ? context?.myListData?.length
                            : 0
                        }
                        color="secondary"
                      >
                        <FaRegHeart />
                      </StyledBadge>
                    </IconButton>
                  </Link>
                </Tooltip>
              </li>
              {/* WishList */}
              <li>
                <Tooltip title="Cart">
                  <IconButton
                    aria-label="cart"
                    onClick={() => context.setOpenCartPanel(true)}
                  >
                    <StyledBadge
                      badgeContent={
                        context?.cartData?.length !== 0
                          ? context?.cartData?.length
                          : 0
                      }
                      color="secondary"
                    >
                      <IoCartOutline />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
