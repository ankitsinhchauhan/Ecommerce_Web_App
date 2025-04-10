import React, { useContext, useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { MyContext } from "../App";
import { addData, editData, fetchDataFromApi } from "../api";

const AddAddress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [phone, setPhone] = useState("");
  const [addressType, setAddressType] = useState("");

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

  useEffect(() => {
    if (context?.addressMode === "edit") {
      fetchAddress(context?.addressId);
    }
  }, [context?.addressMode]);

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

    if (context.addressMode === "add") {
      setIsLoading(true);
      addData(
        `/api/address/add?token=${localStorage.getItem("accesstoken")}`,
        formFields,
        { withCredentials: true }
      ).then((res) => {
        console.log(res);
        if (res?.error !== true) {
          context.openAlertBox("success", "Address created successfully");

          setTimeout(() => {
            setIsLoading(false);
            context?.setOpenAddressPanel(false);
          }, 500);

          context.getuserDetails();

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
        } else {
          context.openAlertBox("error", res?.message);
          setIsLoading(false);
        }
      });
    }

    if (context.addressMode === "edit") {
      setIsLoading(true);
      editData(
        `/api/address/${context?.addressId}?token=${localStorage.getItem(
          "accesstoken"
        )}`,
        formFields,
        { withCredentials: true }
      ).then((res) => {
        fetchDataFromApi(
          `/api/address/get?userId=${
            context?.userData?._id
          }&token=${localStorage.getItem("accesstoken")}`
        ).then((res) => {
          setTimeout(() => {
            setIsLoading(false);
            context.setOpenAddressPanel(false);
          }, 500);
          context?.getuserDetails(res?.data);
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
      });
    }
  };

  const fetchAddress = (id) => {
    fetchDataFromApi(
      `/api/address/${id}?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      setFormFields({
        address_line1: res?.address?.address_line1,
        city: res?.address?.city,
        state: res?.address?.state,
        pincode: res?.address?.pincode,
        country: res?.address?.country,
        mobile: res?.address?.mobile,
        userId: res?.address?.userId,
        landmark: res?.address?.landmark,
        addressType: res?.address?.addressType,
      });
      const ph = `"${res?.address?.mobile}`;
      setPhone(ph);

      setAddressType(res?.address?.addressType);
    });
  };

  return (
    <form className="p-8 py-3 pb-8 px-4" onSubmit={handleSubmit}>
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
        <div className="col w-[100%]">
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
      </div>

      <div className="flex items-center gap-5 pb-5">
        <div className="col w-[100%]">
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
        <div className="col w-[100%]">
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
      </div>
      <div className="flex items-center gap-5 pb-5">
        <div className="col w-[100%]">
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
        <div className="w-[100%]">
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
      </div>
      <div className="flex items-center gap-5 pb-5">
        <div className="col w-[100%]">
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
            <FormControlLabel value="Home" control={<Radio />} label="Home" />
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
          {isLoading === true ? <CircularProgress color="inherit" /> : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default AddAddress;
