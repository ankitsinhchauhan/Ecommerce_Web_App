import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Product/Products";

import SideBar from "./Components/SideBar";
import HomeSliderBanners from "./Pages/HomeSliderBanners/HomeSliderBanners";

import CategoryList from "./Pages/Category/CategoryList";
import SubCategoryList from "./Pages/Category/SubCategoryList";

import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import VerifyAccount from "./Pages/VerifyAccount";
import ChangePassword from "./Pages/ChangePassword";
import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./Apis";
import Profile from "./Pages/Profile";
import ProductDetails from "./Pages/Product/ProductDetails";

const MyContext = createContext();

const App = () => {
  const [isSidebarOpen, setisSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [catData, setCatData] = useState([]);
  const [address, setAddress] = useState([]);

  // Product panel (upload product)
  const [isOpenFullScreenPanle, setIsOpenFullScreenPanle] = useState({
    open: false,
    model: "",
    id: "",
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
    // Product Details
    {
      path: "/product/:id",
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
                <ProductDetails />
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

  useEffect(() => {
    fetchDataFromApi(
      `/api/category/get?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      setCatData(res?.data);
    });
  }, []);

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
    catData,
    setCatData,
    address,
    setAddress,
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />

        <Toaster />
      </MyContext.Provider>
    </>
  );
};

export default App;
export { MyContext };
