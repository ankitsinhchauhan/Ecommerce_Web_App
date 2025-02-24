import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { GoPerson } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../Apis";
import { MyContext } from "../App";

const ChangePassword = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordShow2, setIsPasswordShow2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    email: localStorage.getItem("userEmail"),
    newPassword: "",
    confirmPassword: "",
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  // fill the fields
  const valideValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.newPassword === "") {
      context.openAlertBox("error", "Please enter new Password");
      setIsLoading(false);
      return false;
    }
    if (formFields.confirmPassword === "") {
      context.openAlertBox("error", "Please enter confirm password");
      setIsLoading(false);
      return false;
    }

    if (formFields.confirmPassword !== formFields.newPassword) {
      context.openAlertBox(
        "error",
        "new password confirm password not matched"
      );
      setIsLoading(false);
      return false;
    }
    postData(`/api/user/resetPassword`, formFields).then((res) => {
      console.log(res);
      if (res?.error === false) {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("actionType");
        context.openAlertBox("success", res?.message);
        setIsLoading(false);
        navigate("/login");
      } else {
        context.openAlertBox("error", res?.message);
      }
    });
  };

  return (
    <section className=" bg-white w-full">
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
          <img src="./Logo.png" alt="" className="m-auto w-[80px]" />
        </div>
        <h1 className="text-center text-[40px] font-[700]">
          Welcome Back!
          <br /> You can change your password from here
        </h1>

        <br />

        <form className="w-full px-8  mt-3" onSubmit={handleSubmit}>
          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">New Password</h4>
            <div className="relative w-full">
              <input
                type={isPasswordShow === false ? "password" : "text"}
                name="newPassword"
                value={formFields.newPassword}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
                className="w-full h-[45px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.5)] focus:outline-none px-3"
              />
              <Button
                className="!absolute top-[5px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-700"
                onClick={() => setIsPasswordShow(!isPasswordShow)}
              >
                {isPasswordShow === false ? (
                  <FaEye className="text-[17px]" />
                ) : (
                  <FaEyeSlash className="text-[17px]" />
                )}
              </Button>
            </div>
          </div>

          <div className="form-group mb-4 w-full">
            <h4 className="text-[14px] font-[500] mb-1">Confirm Password</h4>
            <div className="relative w-full">
              <input
                type={isPasswordShow2 === false ? "password" : "text"}
                name="confirmPassword"
                value={formFields.confirmPassword}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
                className="w-full h-[45px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.5)] focus:outline-none px-3"
              />
              <Button
                className="!absolute top-[5px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-gray-700"
                onClick={() => setIsPasswordShow2(!isPasswordShow2)}
              >
                {isPasswordShow2 === false ? (
                  <FaEye className="text-[17px]" />
                ) : (
                  <FaEyeSlash className="text-[17px]" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center w-full mt-3 mb-3">
            <Button
              type="submit"
              disabled={!valideValue}
              className="btn-blue btn-lg w-full flex gap-3"
            >
              {isLoading === true ? (
                <CircularProgress color="inherit" />
              ) : (
                "Change Password"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
