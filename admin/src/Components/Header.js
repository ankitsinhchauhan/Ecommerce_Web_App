import React, { useContext, useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { MdLogout } from "react-icons/md";

import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { MyContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../Apis";
import Dialog from "@mui/material/Dialog";
import AddHomeSlider from "../Pages/HomeSliderBanners/AddHomeSlider";
import AddCategory from "../Pages/Category/AddCategory";
import AddSubCategory from "../Pages/Category/AddSubCategory";
import AddProduct from "../Pages/Product/AddProduct";
import AddAddress from "../Pages/AddAddress";
import EditCategory from "../Pages/Category/editCategory";
import { IoMdClose } from "react-icons/io";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const logout = () => {
    setAnchorMyAcc(null);

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
        navigate("/");
      }
    });
  };

  return (
    <>
      <header
        className={`w-full h-[auto] py-2 ${
          context.isSidebarOpen === true ? "pl-64" : "pl-5"
        } pr-7 shadow-md bg-[#fff] flex items-center justify-between transition-all`}
      >
        <div className="part1">
          <Button
            className="!w-[40px] !h-[40px] !min-w-[40px]  !mx-9 !rounded-full !text-[rgba(0,0,0,0.8)]"
            onClick={() => context.setisSidebarOpen(!context.isSidebarOpen)}
          >
            <RiMenu2Line className="text-[22px] text-[rgba(0,0,0,0.8)]" />
          </Button>
        </div>
        {/* part 2 */}
        <div className="part2 w-[40%] flex items-center justify-end gap-5">
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={2} color="secondary">
              <FaRegBell />
            </StyledBadge>
          </IconButton>

          {/* Login side */}
          {context.isLogin === false ? (
            <li className="list-none ">
              <Link to="/login">
                <Button className="btn-blue btn-sm !rounded-full">
                  Sign In
                </Button>
              </Link>
            </li>
          ) : (
            // Profile Account
            <>
              <Button
                className="myAccountWrap !text-[#000] flex items-center gap-3 cursor-pointer"
                onClick={handleClickMyAcc}
              >
                <div
                  className="rounded-full w-[35px] h-[35px]   overflow-hidden cursor-pointer"
                  onClick={handleClickMyAcc}
                >
                  <img
                    src="/profile.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </Button>

              {/* Menu */}
              <Menu
                anchorEl={anchorMyAcc}
                id="account-menu"
                open={openMyAcc}
                onClose={handleCloseMyAcc}
                onClick={handleCloseMyAcc}
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
                <MenuItem onClick={handleCloseMyAcc} className="!bg-white">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full w-[35px] h-[35px]   overflow-hidden cursor-pointer">
                      <img
                        src="/profile.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="info flex-col font-outfit mx-2">
                    <h4 className=" leading-3 text-[14px] text-[rgba(0,0,0,0.7)] mb-0 capitalize text-left justify-start ">
                      {context?.userData?.name}
                    </h4>
                    <span className="text-[13px] text-[rgba(0,0,0,0.7)] lowercase">
                      {context?.userData?.email}
                    </span>
                  </div>
                </MenuItem>

                <Divider />
                <Link to="/profile" className="w-full block">
                  <MenuItem
                    onClick={handleCloseMyAcc}
                    className="flex gap-2 !py-2"
                  >
                    <GoPerson className="text-[18px]" />
                    <span className="text-[14px]"> Profile</span>
                  </MenuItem>
                </Link>
                <MenuItem onClick={logout} className="flex gap-2 !py-2">
                  <MdLogout className="text-[18px]" />
                  <span className="text-[14px]"> Logout</span>
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </header>

      {/* Add/Upload Product */}

      <Dialog
        fullScreen
        open={context?.isOpenFullScreenPanle.open}
        onClose={() =>
          context?.setIsOpenFullScreenPanle({
            open: false,
          })
        }
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() =>
                context?.setIsOpenFullScreenPanle({
                  open: false,
                })
              }
              aria-label="close"
            >
              <IoMdClose className="text-black" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-gray-800">
                {" "}
                {context?.isOpenFullScreenPanle?.model}
              </span>
            </Typography>
          </Toolbar>
        </AppBar>
        {context?.isOpenFullScreenPanle?.model === "Add Product" && (
          <AddProduct />
        )}
        {context?.isOpenFullScreenPanle?.model === "Add Home Slide" && (
          <AddHomeSlider />
        )}
        {context?.isOpenFullScreenPanle?.model === "Add New Category" && (
          <AddCategory />
        )}
        {context?.isOpenFullScreenPanle?.model === "Add Sub Category" && (
          <AddSubCategory />
        )}
        {context?.isOpenFullScreenPanle?.model === "Add Address" && (
          <AddAddress />
        )}
        {context?.isOpenFullScreenPanle?.model === "Edit Category" && (
          <EditCategory />
        )}
      </Dialog>
    </>
  );
};

export default Header;
