import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import Footer from "./components/Footer/Footer";
import ProductsDetials from "./pages/ProductsDetials";

import toast, { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import Verify from "./pages/Verify";
import ForgotPassowrd from "./pages/ForgotPassowrd";
import CheckOut from "./pages/CheckOut";
import MyAccount from "./pages/MyAccount";
import MyList from "./pages/MyList";
import Orders from "./pages/Orders";
import { addData, fetchDataFromApi } from "./api";
import Address from "./pages/Address";
import OrderFailed from "./pages/OrderFailed";
import OrderPlaced from "./pages/OrderPlaced";
import SearchPage from "./pages/SearchPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

const MyContext = createContext();

const App = () => {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    item: {},
  });

  const [addressMode, setAddressMode] = useState("add");
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [openAddressPanel, setOpenAddressPanel] = useState(false);
  const [catData, setCatData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [myListData, setMyListData] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleOpenProductDetailModal = (status, item) => {
    setOpenProductDetailsModal({
      open: status,
      item: item,
    });
  };

  const handleCloseProductDetailModal = () => {
    setOpenProductDetailsModal({
      open: false,
      item: {},
    });
  };

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

  const toggleAddressPanel = (newOpen) => () => {
    if (newOpen === false) {
      setAddressMode("add");
    }
    setOpenAddressPanel(newOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      getCartItem();
      getMyListData();
      getuserDetails();
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    fetchDataFromApi(`/api/category/get`).then((res) => {
      setCatData(res?.data);
    });
  }, []);

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };
  // Add to cart
  const addToCart = (product, userId, quantity) => {
    if (userId === undefined) {
      openAlertBox("error", "You are not login, Please Login first ");
      return false;
    }

    const data = {
      productTitle: product?.name,
      brand: product?.brand,
      image: product?.images[0],
      rating: product?.rating,
      price: product?.price,
      oldPrice: product?.oldPrice,
      quantity: quantity,
      subTotal: parseInt(product?.price * quantity),
      productId: product?._id,
      countInStock: product?.countInStock,
      discount: product?.discount,
      weight: product?.productWeight,
      userId: userId,
    };

    addData(
      `/api/cart/add?token=${localStorage.getItem("accesstoken")}`,
      data
    ).then((res) => {
      openAlertBox("success", "Item added successfully!");

      getCartItem();
    });
  };

  const getCartItem = () => {
    fetchDataFromApi(
      `/api/cart/get?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      setCartData(res?.data);
    });
  };

  const getMyListData = () => {
    fetchDataFromApi(
      `/api/myList/get?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      console.log(res);
      setMyListData(res?.data);
    });
  };

  //get user Details
  const getuserDetails = () => {
    const token = localStorage.getItem("accesstoken");
    fetchDataFromApi(`/api/user/userDetails?token=${token}`).then((res) => {
      setUserData(res?.data);

      if (res?.response?.data?.error === true) {
        if (res?.response?.data?.message === "You have not login") {
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("refreshtoken");
          openAlertBox("error", "Your session is closed login again");

          window.location.href = "/login";

          setIsLogin(false);
        }
      }
    });
  };

  const values = {
    openProductDetailsModal,
    setOpenProductDetailsModal,
    handleOpenProductDetailModal,
    handleCloseProductDetailModal,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    openAlertBox,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    catData,
    setCatData,
    addToCart,
    cartData,
    setCartData,
    getCartItem,
    myListData,
    setMyListData,
    getMyListData,
    openAddressPanel,
    setOpenAddressPanel,
    toggleAddressPanel,
    getuserDetails,
    addressMode,
    setAddressMode,
    addressId,
    setAddressId,
    searchData,
    setSearchData,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/aboutus"} element={<AboutUs />} />
            <Route path={"/contactus"} element={<ContactUs />} />
            <Route path={"/product"} element={<ProductListing />} />
            <Route path={"/product/:id"} element={<ProductsDetials />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/cart"} element={<CartPage />} />
            <Route path={"/verify"} element={<Verify />} />
            <Route path={"/forgot-password"} element={<ForgotPassowrd />} />
            <Route path={"/checkout"} element={<CheckOut />} />
            <Route path={"/my-account"} element={<MyAccount />} />
            <Route path={"/my-list"} element={<MyList />} />
            <Route path={"/my-orders"} element={<Orders />} />
            <Route path={"/orderFailed"} element={<OrderFailed />} />
            <Route path={"/orderPlaced"} element={<OrderPlaced />} />
            <Route path={"/address"} element={<Address />} />
            <Route path={"/search"} element={<SearchPage />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />
    </>
  );
};

export default App;

export { MyContext };
