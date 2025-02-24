import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { GoPerson } from "react-icons/go";

import Button from "@mui/material/Button";

const ForgotPassowrd = () => {
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
      <img
        src="./loginbg.jpg"
        alt=""
        className="w-full fixed top-0 left-0 opacity-20"
      />

      <div className="loginBox card w-[600px] h-[auto] pb-40 mx-auto pt-20 relative z-50">
        <div className="text-center">
          <img src="./Logo.png" alt="" className="m-auto w-[80px]" />
        </div>
        <h1 className="text-center text-[40px] font-[700]">
          Having trouble to sign in?
          <br />
          Reset your password.
        </h1>

        <br />

        <form className="w-full px-8  mt-3">
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Email</h4>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-[45px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.5)] focus:outline-none px-3"
            />
          </div>

          <Button className="btn-blue btn-lg w-full">Reset Password </Button>
          <br />
          <br />
          <div className="text-center flex items-center justify-center gap-2">
            <span>Don't want to reset?</span>
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-gray-700 text-[15px] font-[600]"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassowrd;
