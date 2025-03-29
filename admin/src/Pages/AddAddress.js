import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { MyContext } from "../App";
import { addData, fetchDataFromApi } from "../Apis";

const AddAddress = () => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const context = useContext(MyContext);

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: "",
    selected: false,
    userId: "",
  });

  useEffect(() => {
    setFormFields((preveState) => ({
      ...preveState,
      userId: context?.userData?._id,
    }));
  }, [context?.userData]);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields((preveState) => ({
      ...preveState,
      status: event.target.value,
    }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  // //fill the fields
  // const valideValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.address_line1 === "") {
      context.openAlertBox("error", "Please enter your address Line");
      return false;
    }

    if (formFields.city === "") {
      context.openAlertBox("error", "Please enter your city ");
      return false;
    }
    if (formFields.state === "") {
      context.openAlertBox("error", "Please enter your state");
      return false;
    }

    if (formFields.pincode === "") {
      context.openAlertBox("error", "Please enter your pincode");
      return false;
    }

    if (formFields.country === "") {
      context.openAlertBox("error", "Please enter your country");
      return false;
    }
    if (phone === "") {
      context.openAlertBox("error", "Please enter your 10 digit mobile number");
      return false;
    }

    addData(
      `/api/address/add?token=${localStorage.getItem("accesstoken")}`,
      formFields,
      { withCredentials: true }
    ).then((res) => {
      console.log(res);
      if (res?.error !== true) {
        setIsLoading(false);
        context.openAlertBox("success", "Address created successfully");
        context?.setIsOpenFullScreenPanle({
          open: false,
        });

        fetchDataFromApi(
          `/api/address/get?token=${localStorage.getItem("accesstoken")}`
        ).then((res) => {
          context?.setAddress(res.data);
        });
      } else {
        context.openAlertBox("error", res?.data?.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="scroll max-h-[71vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-2 mb-3 gap-4">
            <div className="col w-[100%]">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Address Line 1
              </h3>
              <input
                type="text"
                name="address_line1"
                value={formFields.address_line1}
                onChange={onChangeInput}
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
            <div className="col w-[100%]">
              <h3 className="text-[16px] font-[500] mb-1 text-black">City</h3>
              <input
                type="text"
                name="city"
                value={formFields.city}
                onChange={onChangeInput}
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
          </div>
          <div className="grid grid-cols-3 mb-3 gap-4">
            <div className="col w-[100%]">
              <h3 className="text-[16px] font-[500] mb-1 text-black">State</h3>
              <input
                type="text"
                name="state"
                value={formFields.state}
                onChange={onChangeInput}
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
            <div className="col w-[100%]">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Pincode
              </h3>
              <input
                type="text"
                name="pincode"
                value={formFields.pincode}
                onChange={onChangeInput}
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
            <div className="col w-[100%]">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Country
              </h3>
              <input
                type="text"
                name="country"
                value={formFields.country}
                onChange={onChangeInput}
                className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              />
            </div>
            <div className="col w-[100%]">
              <h3 className="text-[16px] font-[500] mb-1 text-black">
                Mobile No
              </h3>
              <PhoneInput
                defaultCountry="in"
                value={phone}
                disabled={isLoading === true ? true : false}
                onChange={(phone) => {
                  setPhone(phone);
                  {
                    setFormFields((preveState) => ({
                      ...preveState,
                      mobile: phone,
                    }));
                  }
                }}
              />
            </div>
            <div className="col w-[100%]">
              <h3 className="text-[16px] font-[500] mb-1 text-black">Status</h3>
              <Select
                size="small"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                value={status}
                onChange={handleChangeStatus}
                className="w-full"
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
          </div>
          <br />
        </div>

        <div className="w-[250px]">
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-[25px] text-white" />
            Publish and View
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddAddress;
