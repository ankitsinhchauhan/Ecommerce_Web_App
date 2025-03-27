import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../App";
import { editData, postData, uploadImage } from "../Apis";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Collapse } from "react-collapse";
import Checkbox from "@mui/material/Checkbox";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const label = { inputProps: { "arial-lable": "Checkbox demo" } };

const Profile = () => {
  const [previews, setPreviews] = useState([]);
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
    const userAvatar = [];
    if (
      context?.userData?.avatar !== "" &&
      context?.userData?.avatar !== undefined
    ) {
      userAvatar.push(context?.userData?.avatar);
      setPreviews(userAvatar);
    }
  }, [context?.userData]);

  let SelectedImages = [];

  const formData = new FormData();

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);

      const files = e.target.files;
      setIsLoading(true);

      for (var i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];
          SelectedImages.push(file);
          formData.append(`avatar`, file);
        } else {
          context.openAlertBox(
            "error",
            "Please select a valid JPG, PNG or webp image file."
          );
          setIsLoading(false);
          return false;
        }
      }

      uploadImage(
        `/api/user/user-avatar?token=${localStorage.getItem("accesstoken")}`,
        formData,
        { withCredentials: true }
      ).then((res) => {
        console.log(res);
        setIsLoading(false);

        let avatar = [];
        avatar.push(res?.data?.avatar);
        setPreviews(avatar);
      });
    } catch (error) {
      console.error("Upload Failed:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token === null) {
      navigate("/login");
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
        context.openAlertBox("success", "User Updated succesfully");
        setIsLoading(false);
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
    <>
      {" "}
      <div className="card my-4 pt-5 w-[65%] bg-white shadow-md sm:rounded-lg px-5 pb-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-[600]">User Profile</h2>

          <Button
            className="!ml-auto"
            onClick={() =>
              setI1sChangePasswordFormShow(!isChangePasswordFormShow)
            }
          >
            Change Password
          </Button>
        </div>
        <br />
        <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200">
          {isLoading === true ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              {previews?.length !== 0 ? (
                previews?.map((img, index) => {
                  return (
                    <img
                      src={img}
                      key={index}
                      alt=""
                      className="w-full h-full object-cover "
                    />
                  );
                })
              ) : (
                <img
                  src={"/profile.jpg"}
                  alt=""
                  className="w-full h-full object-cover "
                />
              )}
            </>
          )}

          <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex justify-center items-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
            <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
              accept="image/*"
              name="avatar"
            />
          </div>
        </div>

        <form className="formmt-8 " onSubmit={handleSubmit}>
          <div className="flex items-center gap-5">
            <div className="w-[50%]">
              <input
                type="text"
                name="name"
                value={formFields.name}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
            <div className="w-[50%]">
              <input
                type="email"
                name="email"
                value={formFields.email}
                disabled={true}
                onChange={onChangeInput}
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
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
          <div
            className="flex items-center justify-center p-5 rounded-md border border-dashed border-[rgba(0,0,0,0.3)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
            onClick={() =>
              context.setIsOpenFullScreenPanle({
                open: true,
                model: "Add Address",
              })
            }
          >
            <span className="text-[14px] font-[500] ">Add Address</span>
          </div>

          {/* Address Box */}
          <label className="addressBox w-full flex items-center justify-center bg-[#f1f1f1] p-3 rounded-md cursor-pointer">
            <Checkbox {...label} />
          </label>

          <br />
          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={!valideValue}
              className="btn-blue btn-lg w-full"
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
        <div className="card bg-white p-5 shadow-md rounded-md w-[65%]">
          <div className="flex items-center pb-3">
            <h2 className="pb-0 text-[20px] font-[600]">Change Password</h2>
          </div>
          <hr />

          <form className="mt-8" onSubmit={handleSubmitChangePassword}>
            <div className="flex items-center gap-5">
              <div className="w-[50%]">
                <TextField
                  type="name"
                  label="OldPassword"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="OldPassword"
                  value={changePassword.OldPassword}
                  onChange={onChangeInput}
                />
              </div>
              <div className="w-[50%]">
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
            </div>
            <div className="flex items-center gap-5 mt-4">
              <div className="w-[50%]">
                <TextField
                  type="text"
                  label="confimePassword"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="confirmPassword"
                  value={changePassword.confirmPassword}
                  onChange={onChangeInput}
                />
              </div>
            </div>

            <br />
            <div className="flex items-center gap-4">
              <Button
                type="submit"
                disabled={!valideValue2}
                className="btn-blue btn-lg w-full"
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
    </>
  );
};

export default Profile;
