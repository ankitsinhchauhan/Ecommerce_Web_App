import React, { useContext, useEffect, useState } from "react";
import AccountSideBar from "../components/SideBar/AccountSideBar";
import Radio from "@mui/material/Radio";
import { MyContext } from "../App";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { addData, deleteData, editData, fetchDataFromApi } from "../api";
import AddressBox from "./addressBox";

const label = { inputProps: { "arial-lable": "Checkbox demo" } };

const Address = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState([]);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [addressType, setAddressType] = useState("");
  const [mode, setMode] = useState("add");

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    userId: "",
    landmark: "",
    addressType: "",
  });

  const context = useContext(MyContext);

  useEffect(() => {
    if (context?.userData?._id !== undefined) {
      setFormFields((preveState) => ({
        ...preveState,
        userId: context?.userData?._id,
      }));
    }
  }, [context?.userData]);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      fetchDataFromApi(
        `/api/address/get?userId=${
          context?.userData?._id
        }&token=${localStorage.getItem("accesstoken")}`
      ).then((res) => {
        setAddress(res?.data);
      });
    }
  }, [context?.userData]);

  const handleClose = () => {
    setIsOpenModel(false);
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

  const handleChangeAddressType = (event) => {
    setAddressType(event.target.value);
    setFormFields(() => ({
      ...formFields,
      addressType: event.target.value,
    }));
  };

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

    if (formFields.landmark === "") {
      context.openAlertBox("error", "Please enter your landmark");
      return false;
    }

    if (formFields.addressType === "") {
      context.openAlertBox("error", "Please enter your addressType");
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
        setIsOpenModel(false);

        fetchDataFromApi(
          `/api/address/get?userId=${
            context?.userData?._id
          }&token=${localStorage.getItem("accesstoken")}`
        ).then((res) => {
          setAddress(res.data);
          setFormFields({
            address_line1: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            mobile: "",
            userId: "",
            landmark: "",
            addressType: "",
          });
          setAddressType("");
          setPhone("");
        });
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  const removeAddress = (id) => {
    deleteData(
      `/api/address/${id}?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      fetchDataFromApi(
        `/api/address/get?userId=${
          context?.userData?._id
        }&token=${localStorage.getItem("accesstoken")}`
      ).then((res) => {
        setAddress(res.data);
      });
    });
  };

  const editAddress = (id) => {
    setMode("edit");
    setIsOpenModel(true);

    fetchDataFromApi(
      `/api/address/${id}?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <section className="py-10 w-full ">
        <div className="container flex gap-5">
          <div className="col1 w-[20%]">
            <AccountSideBar />
          </div>
          <div className="col2 w-[50%]">
            <div className="card bg-white p-5 shadow-md rounded-md mb-5">
              <div className="flex items-center pb-3">
                <h2 className="pb-0">Address</h2>
              </div>

              <div
                className="flex items-center justify-center p-5 mt-4 rounded-md border border-dashed border-[rgba(0,0,0,0.3)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
                onClick={() => setIsOpenModel(true)}
              >
                <span className="text-[14px] font-[500] ">Add Address</span>
              </div>

              {/* Address Box */}
              <div className="flex gap-3 flex-col mt-4">
                {address?.length > 0 &&
                  address?.map((address, index) => {
                    return (
                      <>
                        <AddressBox
                          address={address}
                          key={index}
                          removeAddress={removeAddress}
                          editAddress={editAddress}
                        />
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isOpenModel}>
        <DialogTitle> {mode === "add" ? "Add" : "Edit"} Address</DialogTitle>
        <form className="p-8 py-3 pb-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[100%]">
              <TextField
                className="w-full"
                label="Address Line 1"
                variant="outlined"
                size="small"
                name="address_line1"
                value={formFields?.address_line1}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="City"
                variant="outlined"
                size="small"
                name="city"
                value={formFields.city}
                onChange={onChangeInput}
              />
            </div>
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="State"
                variant="outlined"
                size="small"
                name="state"
                value={formFields.state}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Country"
                variant="outlined"
                size="small"
                name="country"
                value={formFields.country}
                onChange={onChangeInput}
              />
            </div>
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Pin Code"
                variant="outlined"
                size="small"
                name="pincode"
                value={formFields.pincode}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="flex items-center gap-5 pb-5">
            <div className="w-[50%]">
              <PhoneInput
                defaultCountry="in"
                value={phone}
                disabled={isLoading === true ? true : false}
                onChange={(phone) => {
                  setPhone(phone);
                  setFormFields((prevState) => ({
                    ...prevState,
                    mobile: phone,
                  }));
                }}
              />
            </div>

            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Landmark"
                variant="outlined"
                size="small"
                name="landmark"
                value={formFields.landmark}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="flex gap-5 pb-5 flex-col">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Address Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={addressType}
                onChange={handleChangeAddressType}
              >
                <FormControlLabel
                  value="Home"
                  control={<Radio />}
                  label="Home"
                />
                <FormControlLabel
                  value="Office"
                  control={<Radio />}
                  label="Office"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="flex items-center  gap-5">
            <Button type="submit" className="btn-org btn-lg w-full ">
              Save
            </Button>
            <Button
              className="btn-org btn-border w-full btn-lg"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Address;
