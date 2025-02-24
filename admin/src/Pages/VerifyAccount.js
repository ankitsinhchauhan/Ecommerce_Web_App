import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { GoPerson } from "react-icons/go";
import Button from "@mui/material/Button";
import OtpBox from "../Components/OtpBox";
import { MyContext } from "../App";
import { postData } from "../Apis";
import CircularProgress from "@mui/material/CircularProgress";

const VerifyAccount = () => {
  const [otp, setOpt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (value) => {
    setOpt(value);
  };

  const navigate = useNavigate();
  const context = useContext(MyContext);

  const verifyOtp = (e) => {
    e.preventDefault();

    if (otp !== "") {
      setIsLoading(true);
      // Verify OTP (Forgot Password)
      const actionType = localStorage.getItem("actionType");
      if (actionType !== "forgot-password") {
        // Verify Email
        postData("/api/user/verifyemail", {
          email: localStorage.getItem("userEmail"),
          otp: otp,
        }).then((res) => {
          if (res?.error === false) {
            context.openAlertBox("success", res?.message);
            localStorage.removeItem("userEmail");
            setIsLoading(false);
            navigate("/login");
          } else {
            context.openAlertBox("error", res?.message);
          }
        });
      } else {
        // Frogot password verify otp
        postData("/api/user/verify-forgot-password-otp", {
          email: localStorage.getItem("userEmail"),
          otp: otp,
        }).then((res) => {
          if (res?.error === false) {
            context.openAlertBox("success", res?.message);
            navigate("/change-password");
          } else {
            context.openAlertBox("error", res?.message);
          }
        });
      }
    }
  };

  return (
    <section className=" bg-white w-full h-[100vh]">
      <header className="w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50 bg-gray-100">
        <Link to="/" activeClassName="isActive">
          <img src="./spLogo.png" alt="" className="w-[180px]" />
        </Link>
        <div className="flex items-center gap-0 ">
          <NavLink to="/login">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <CgLogIn className="text-[18px]" />
              Login
            </Button>
          </NavLink>
          <NavLink to="/sign-up">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <GoPerson className="text-[18px]" />
              Sign Up
            </Button>
          </NavLink>
        </div>
      </header>
      {/* <img
        src="./loginbg.jpg"
        alt=""
        className="w-full fixed top-0 left-0 opacity-20"
      /> */}

      <div className="loginBox card w-[600px] h-[auto] pb-40 mx-auto pt-20 relative z-50">
        <div className="text-center">
          <img
            src="/Verifiy/verified3.png"
            alt=""
            className="w-[100px] m-auto"
          />
        </div>
        <h1 className="text-center text-[40px] font-[700]">
          Welcome Back!
          <br /> Please Verify your Email
        </h1>
        <br />
        <p className="text-center tex-[16px]">
          OTP send to &nbsp;
          <span className="text-primary font-bold">
            {localStorage.getItem("userEmail")}
          </span>
        </p>
        <br />
        <form onSubmit={verifyOtp}>
          <div className="text-center flex items-center justify-center flex-col">
            <OtpBox length={6} onChange={handleOtpChange} />
          </div>

          <br />
          <div className="w-[300px] m-auto">
            <Button type="submit" className="btn-blue btn-lg w-full flex gap-3">
              {isLoading === true ? (
                <CircularProgress color="inherit" />
              ) : (
                "Verify OTP"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VerifyAccount;
