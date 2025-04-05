import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountSideBar from "../components/SideBar/AccountSideBar";
import { MyContext } from "../App";
import CircularProgress from "@mui/material/CircularProgress";
import { Collapse } from "react-collapse";
import { useNavigate } from "react-router-dom";
import { editData, postData } from "../api";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const MyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [isChangePasswordFormShow, setI1sChangePasswordFormShow] =
    useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [changePassword, setChangePassword] = useState({
    email: "",
    OldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token === null) {
      navigate("/");
    }
  }, [context?.isLogin]);

  // user id
  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
      setFormFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile,
      });

      const ph = `"${context?.userData?.mobile}"`;
      setPhone(ph);

      setChangePassword({
        email: context?.userData?.email,
      });
    }
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });

    setChangePassword(() => {
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

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter name");
      return false;
    }

    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email");
      return false;
    }
    if (formFields.mobile === "") {
      context.openAlertBox("error", "Please enter mobile number");
      return false;
    }

    editData(
      `/api/user/${userId}?token=${localStorage.getItem("accesstoken")}`,
      formFields,
      { withCredentials: true }
    ).then((res) => {
      console.log(res);

      if (res?.error !== true) {
        setIsLoading(false);
        context.openAlertBox("success", "User Updated succesfully");
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  // fill the fields
  const valideValue2 = Object.values(formFields).every((el) => el);

  const handleSubmitChangePassword = (e) => {
    e.preventDefault();

    setIsLoading2(true);

    if (changePassword.OldPassword === "") {
      context.openAlertBox("error", "Please enter OldPassword");
      return false;
    }

    if (changePassword.newPassword === "") {
      context.openAlertBox("error", "Please enter newPassword");
      return false;
    }
    if (changePassword.confirmPassword === "") {
      context.openAlertBox("error", "Please enter confimePassword");
      return false;
    }

    if (changePassword.confirmPassword !== changePassword.newPassword) {
      context.openAlertBox(
        "error",
        "New password & confimePassword not matched"
      );
      return false;
    }

    postData(
      `/api/user/changePassowrd?token=${localStorage.getItem("accesstoken")}`,
      changePassword,
      { withCredentials: true }
    ).then((res) => {
      console.log(res);
      if (res?.error !== true) {
        setIsLoading2(false);
        context.openAlertBox("success", res?.message);
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading2(false);
      }
    });
  };

  return (
    <section className="py-10 w-full ">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSideBar />
        </div>
        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md mb-5">
            <div className="flex items-center pb-3">
              <h2 className="pb-0">My Profile</h2>
              <Button
                className="!ml-auto"
                onClick={() =>
                  setI1sChangePasswordFormShow(!isChangePasswordFormShow)
                }
              >
                Change Password
              </Button>
            </div>
            <hr />

            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="flex items-center gap-5">
                <div className="w-[50%]">
                  <TextField
                    type="name"
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="name"
                    value={formFields.name}
                    disabled={isLoading === true ? true : false}
                    onChange={onChangeInput}
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="email"
                    value={formFields.email}
                    disabled={true}
                    onChange={onChangeInput}
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 mt-4">
                <div className="w-[50%]">
                  <PhoneInput
                    defaultCountry="in"
                    value={phone}
                    disabled={isLoading === true ? true : false}
                    onChange={(phone) => {
                      setPhone(phone);
                      setFormFields({
                        mobile: phone,
                      });
                    }}
                  />
                </div>
              </div>

              <br />
              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  disabled={!valideValue}
                  className="btn-org btn-lg w-[200px]"
                >
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </form>
          </div>

          <Collapse isOpened={isChangePasswordFormShow}>
            <div className="card bg-white p-5 shadow-md rounded-md">
              <div className="flex items-center pb-3">
                <h2 className="pb-0">Change Password</h2>
              </div>
              <hr />

              <form className="mt-8" onSubmit={handleSubmitChangePassword}>
                <div className="grid grid-cols-2 gap-5">
                  {context?.userData?.signUpWithGoogle === false && (
                    <div className="col">
                      <TextField
                        type="name"
                        label="OldPassword"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        name="OldPassword"
                        value={changePassword.OldPassword}
                        disabled={isLoading2 === true ? true : false}
                        onChange={onChangeInput}
                      />
                    </div>
                  )}

                  <div className="col">
                    <TextField
                      type="text"
                      label="newPassword"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="newPassword"
                      value={changePassword.newPassword}
                      onChange={onChangeInput}
                    />
                  </div>

                  <div className="col">
                    <TextField
                      type="text"
                      label="confimePassword"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="confirmPassword"
                      value={changePassword.confirmPassword}
                      // disabled={isLoading2 === true ? true : false}
                      onChange={onChangeInput}
                    />
                  </div>
                </div>

                <br />
                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    disabled={!valideValue2}
                    className="btn-org btn-lg w-[220px]"
                  >
                    {isLoading2 === true ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Collapse>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
