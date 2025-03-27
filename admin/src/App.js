import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Product/Products";
import AddProduct from "./Pages/Product/AddProduct";
// Add product (upload product)
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { IoMdClose } from "react-icons/io";
import SideBar from "./Components/SideBar";
import HomeSliderBanners from "./Pages/HomeSliderBanners/HomeSliderBanners";
import AddHomeSlider from "./Pages/HomeSliderBanners/AddHomeSlider";
import AddCategory from "./Pages/Category/AddCategory";
import CategoryList from "./Pages/Category/CategoryList";
import SubCategoryList from "./Pages/Category/SubCategoryList";
import AddSubCategory from "./Pages/Category/AddSubCategory";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import VerifyAccount from "./Pages/VerifyAccount";
import ChangePassword from "./Pages/ChangePassword";
import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./Apis";
import Profile from "./Pages/Profile";
import AddAddress from "./Pages/AddAddress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyContext = createContext();

const App = () => {
  const [isSidebarOpen, setisSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  // Product panel (upload product)
  const [isOpenFullScreenPanle, setIsOpenFullScreenPanle] = useState({
    open: false,
    model: "",
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarwrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <SideBar />
              </div>
              <div
                className={`contentRight py-4 px-5  ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),
    },
    // Login page
    {
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },

    // Verify Account
    {
      path: "/verify-account",
      element: (
        <>
          <VerifyAccount />
        </>
      ),
    },
    // Change Password
    {
      path: "/change-password",
      element: (
        <>
          <ChangePassword />
        </>
      ),
    },
    // Sign Up page
    {
      path: "/sign-up",
      element: (
        <>
          <SignUp />
        </>
      ),
    },
    // Products
    {
      path: "/products",
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarwrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <SideBar />
              </div>
              <div
                className={`contentRight py-4 px-5  ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Products />
              </div>
            </div>
          </section>
        </>
      ),
    },
    //Add Home Slider Banner
    {
      path: "/homeSlider/list",
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarwrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <SideBar />
              </div>
              <div
                className={`contentRight py-4 px-5  ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <HomeSliderBanners />
              </div>
            </div>
          </section>
        </>
      ),
    },
    // Category List
    {
      path: "/category/list",
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarwrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <SideBar />
              </div>
              <div
                className={`contentRight py-4 px-5  ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <CategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },
    // Sub Category List
    {
      path: "/subCategory/list",
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarwrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <SideBar />
              </div>
              <div
                className={`contentRight py-4 px-5  ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <SubCategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },
    //Users
    {
      path: "/users",
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarwrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <SideBar />
              </div>
              <div
                className={`contentRight py-4 px-5  ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Users />
              </div>
            </div>
          </section>
        </>
      ),
    },
    // Orders
    {
      path: "/orders",
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarwrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <SideBar />
              </div>
              <div
                className={`contentRight py-4 px-5  ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Orders />
              </div>
            </div>
          </section>
        </>
      ),
    },
    // Profile
    {
      path: "/profile",
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarwrapper ${
                  isSidebarOpen === true ? "w-[18%]" : "w-[0px] opacity-0"
                } transition-all`}
              >
                <SideBar />
              </div>
              <div
                className={`contentRight py-4 px-5  ${
                  isSidebarOpen === false ? "w-[100%]" : "w-[82%]"
                } transition-all`}
              >
                <Profile />
              </div>
            </div>
          </section>
        </>
      ),
    },
  ]);

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      fetchDataFromApi(`/api/user/userDetails?token=${token}`).then((res) => {
        setUserData(res?.data);

        if (res?.response?.data?.message === "You have not login") {
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("refreshtoken");
          openAlertBox("error", "Your session is closed login again");

          window.location.href = "/login";
        }
      });
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const values = {
    isSidebarOpen,
    setisSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanle,
    setIsOpenFullScreenPanle,
    openAlertBox,
    userData,
    setUserData,
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />

        {/* Add/Upload Product */}

        <Dialog
          fullScreen
          open={isOpenFullScreenPanle.open}
          onClose={() =>
            setIsOpenFullScreenPanle({
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
                  setIsOpenFullScreenPanle({
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
                  {isOpenFullScreenPanle?.model}
                </span>
              </Typography>
            </Toolbar>
          </AppBar>
          {isOpenFullScreenPanle?.model === "Add Product" && <AddProduct />}
          {isOpenFullScreenPanle?.model === "Add Home Slide" && (
            <AddHomeSlider />
          )}
          {isOpenFullScreenPanle?.model === "Add New Category" && (
            <AddCategory />
          )}
          {isOpenFullScreenPanle?.model === "Add Sub Category" && (
            <AddSubCategory />
          )}
          {isOpenFullScreenPanle?.model === "Add Address" && <AddAddress />}
        </Dialog>
        <Toaster />
      </MyContext.Provider>
    </>
  );
};

export default App;
export { MyContext };
