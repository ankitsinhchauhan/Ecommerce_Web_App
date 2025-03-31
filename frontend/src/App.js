import React, { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import Footer from "./components/Footer/Footer";
import ProductsDetials from "./pages/ProductsDetials";
import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ProductZoom from "./components/Product/ProductZoom";
import ProductDetailComponents from "./components/Product/ProductDetailComponents";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import Verify from "./pages/Verify";
import ForgotPassowrd from "./pages/ForgotPassowrd";
import CheckOut from "./pages/CheckOut";
import MyAccount from "./pages/MyAccount";
import MyList from "./pages/MyList";
import Orders from "./pages/Orders";
import { fetchDataFromApi } from "./api";
import Address from "./pages/Address";

const MyContext = createContext();

const App = () => {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    item: {},
  });
  const [fullWidth, setFullWidth] = useState("lg");
  const [maxWidth, setMaxWidth] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [catData, setCatData] = useState([]);

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

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

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
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    fetchDataFromApi(`/api/category/get`).then((res) => {
      console.log(res);
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

  const values = {
    setOpenProductDetailsModal,
    handleOpenProductDetailModal,
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
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/productListing"} element={<ProductListing />} />
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
            <Route path={"/address"} element={<Address />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />

      <Dialog
        open={openProductDetailsModal.open}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleCloseProductDetailModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="productDetailsModal"
      >
        <DialogContent>
          <div className="flex items-center w-full productDetailsModalContainer relative ">
            <Button
              className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-black !absolute !top-[0px] !right-[0px] !bg-[#f1f1f1] "
              onClick={handleCloseProductDetailModal}
            >
              <IoMdClose className="text-[20px]" />
            </Button>
            {openProductDetailsModal?.item?.length !== 0 && (
              <>
                <div className="col1 w-[45%] px-3 ">
                  <ProductZoom images={openProductDetailsModal?.item?.images} />
                </div>
                <div className="col2 w-[55%] py-8 px-8 pr-16 productContent">
                  <ProductDetailComponents
                    item={openProductDetailsModal?.item}
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

export default App;

export { MyContext };
