import React, { useContext, useState } from "react";
import OtpBox from "../components/OtpBox/OtpBox";
import { Button } from "@mui/material";
import { postData } from "../api";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";

const Verify = () => {
  const [otp, setOpt] = useState("");
  const handleOtpChange = (value) => {
    setOpt(value);
  };

  const navigate = useNavigate();
  const context = useContext(MyContext);

  const verifyOtp = (e) => {
    e.preventDefault();

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

          navigate("/forgot-password");
        } else {
          context.openAlertBox("error", res?.message);
        }
      });
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-7 px-10">
          <div className="text-center flex items-center justify-center">
            <img src="/Verifiy/verified3.png" alt="" width="70" />
          </div>
          <h3 className="text-center text-[30px] font-[500] text-black mt-4 mb-2">
            Verify Otp
          </h3>
          <p className="text-center text-[14px] mt-0 mb-5">
            OTP Send to{" "}
            <span className="text-primary font-bold">
              {localStorage.getItem("userEmail")}
            </span>
          </p>
          <form onSubmit={verifyOtp}>
            <OtpBox length={6} onChange={handleOtpChange} />
            <div className="flex items-center justify-center mt-6">
              <Button type="submit" className="w-full btn-org btn-lg">
                Verify Otp
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Verify;
