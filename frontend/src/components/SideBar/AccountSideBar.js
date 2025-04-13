import React, { useContext, useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { BsBagCheck } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { LuMapPinPlus } from "react-icons/lu";

import { NavLink } from "react-router";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { MyContext } from "../../App";
import { uploadImage } from "../../api";

const AccountSideBar = () => {
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

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

  const onChangeFile = async (e) => {
    e.preventDefault();
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
        setIsLoading(false);

        let avatar = [];
        avatar.push(res?.data?.avatar);
        setPreviews(avatar);
      });
    } catch (error) {
      console.error("Upload Failed:", error);
    }
  };

  return (
    <div className="card bg-white shadow-md rounded-md sticky top-[160px]">
      <div className="w-full p-5 flex items-center justify-center flex-col">
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
        <h3>{context?.userData?.name}</h3>
        <h6 className="text-[13px] font-[500]"> {context?.userData?.email}</h6>
      </div>
      <ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">
        <li className="w-full">
          <NavLink to="/my-account" exact={true} activeClassName="isActive">
            <Button className="w-full !justify-start !text-left !py-2 !px-5 !text-[rgba(0,0,0,0.8)] !capitalize !rounded-none flex items-center gap-2">
              <GoPerson className="text-[20px]" />
              My Profile
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink to="/address" exact={true} activeClassName="isActive">
            <Button className="w-full !justify-start !text-left !py-2 !px-5 !text-[rgba(0,0,0,0.8)] !capitalize !rounded-none flex items-center gap-2">
              <LuMapPinPlus className="text-[20px]" />
              Address
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink to="/my-list" exact={true} activeClassName="isActive">
            <Button className="w-full !justify-start !text-left !py-2 !px-5 !text-[rgba(0,0,0,0.8)] !capitalize !rounded-none flex items-center gap-2">
              <FaRegHeart className="text-[20px]" />
              My List
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/my-orders" exact={true} activeClassName="isActive">
            <Button className="w-full !justify-start !text-left !py-2 !px-5 !text-[rgba(0,0,0,0.8)] !capitalize !rounded-none flex items-center gap-2">
              <BsBagCheck className="text-[20px]" />
              My Orders
            </Button>
          </NavLink>
        </li>
        {/* <li className="w-full">
          <NavLink to="/logout" exact={true} activeClassName="isActive">
            <Button className="w-full !justify-start !text-left !py-2 !px-5 !text-[rgba(0,0,0,0.8)] !capitalize !rounded-none flex items-center gap-2">
              <MdLogout className="text-[20px]" />
              Logout
            </Button>
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
};

export default AccountSideBar;
