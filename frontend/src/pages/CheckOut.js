import React, { useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import { BsBagCheckFill } from "react-icons/bs";
import Radio from "@mui/material/Radio";
import { MyContext } from "../App";

const CheckOut = () => {
  const [userData, setUserData] = useState(null);
  const [isChecked, setIsChecked] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState();
  const context = useContext(MyContext);

  useEffect(() => {
    if (context?.userData !== null) {
      setUserData(context?.userData);
    }
  }, [context?.userData, userData]);

  const editAddress = (id) => {
    context?.setOpenAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
  };

  const handleChange = (e, index) => {
    if (e.target.checked) {
      setIsChecked(index);
      setSelectedAddress(e.target.value);
    }
  };

  const checkout = (e) => {
    e.preventDefault();
  };

  return (
    <section className="py-10">
      <form onSubmit={checkout}>
        <div className="w-[70%] m-auto flex gap-5">
          {/* Left Side */}
          <div className="leftCol w-[60%]">
            <div className="card bg-white shadow-md p-5 rounded-md w-full">
              <div className="flex items-center justify-between">
                <h2>Select Delivery Address</h2>
                <Button
                  variant="outlined"
                  className="gap-1"
                  onClick={() => {
                    context?.setOpenAddressPanel(true);
                    context?.setAddressMode("add");
                  }}
                >
                  {" "}
                  <FaPlus />
                  Add New Address
                </Button>
              </div>

              <br />

              <div className="flex flex-col gap-4 ">
                {userData?.address_details.length !== 0 ? (
                  userData?.address_details?.map((address, index) => {
                    return (
                      <label
                        className={`flex relative gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md ${
                          isChecked === index && "bg-blue-100"
                        }`}
                        key={index}
                      >
                        <div>
                          <Radio
                            size="small"
                            onChange={(e) => handleChange(e, index)}
                            checked={isChecked === index}
                            value={address?._id}
                          />
                        </div>
                        <div className="info">
                          <span className="inline-block text-[13px] font-[500] p-1 mb-1 bg-[#f1f1f1] rounded-sm">
                            {address?.addressType}
                          </span>
                          <h3>{userData?.name}</h3>
                          <p className="mt-1 mb-0">
                            {address?.address_line1 +
                              " " +
                              address?.landmark +
                              " " +
                              address?.city +
                              " " +
                              address?.pincode +
                              " " +
                              address?.state +
                              " " +
                              address?.country}
                          </p>
                          <p className="mb-0 font-[500]">+{userData?.mobile}</p>
                        </div>
                        <div>
                          <Button
                            variant="text"
                            className="!absolute top-[15px] right-[15px]"
                            size="small"
                            onClick={() => editAddress(address?._id)}
                          >
                            EDIT
                          </Button>
                        </div>
                      </label>
                    );
                  })
                ) : (
                  <>
                    <div className="flex  items-center justify-between mt-5 flex-col p-5">
                      <img src="noAddress.png" alt="" width="100" />
                      <h2 className="text-center">
                        No Addresses found in you account
                      </h2>
                      <p className="mt-0">Add a delivery address.</p>
                      <Button className="btn-org">Add Address</Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="rightCol w-[40%]">
            <div className="card shadow-md bg-white p-5 rounded-md">
              <h2 className="mb-4">Your Order</h2>
              <div className=" mb-5 scroll max-h-[400px] overflow-y-scroll overflow-x-hidden pr-2">
                <div className="flex items-center  justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1]">
                  <span className="text-[14px] font-[600]">Product</span>
                  <span className="text-[14px] font-[600]">Subtotal</span>
                </div>
                <div className=" mb-5 scroll max-h-[270px] overflow-y-scroll overflow-x-hidden pr-2">
                  {context?.cartData?.length !== 0 &&
                    context?.cartData?.map((item, index) => {
                      return (
                        <div
                          className="flex items-center justify-between py-2"
                          key={index}
                        >
                          <div className="part1 flex items-center gap-3">
                            <div className="img w-[60px] h-[60px] object-cover overflow-hidden rounded-md group cursor-pointer ">
                              <img
                                src={item?.image}
                                alt=""
                                className="w-full transition-all group-hover:scale-105"
                              />
                            </div>
                            <div className="info">
                              <h4
                                className="text-[14px]"
                                title={item?.productTitle}
                              >
                                {item?.productTitle?.substr(0, 20) + "..."}
                              </h4>
                              <span className="text-[13px]">
                                Qty :{item?.quantity}
                              </span>
                            </div>
                          </div>
                          <span className="text-[14px]">
                            {" "}
                            {(item?.quantity * item?.price)?.toLocaleString(
                              "en-Us",
                              {
                                style: "currency",
                                currency: "INR",
                              }
                            )}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
              <Button
                type="submit"
                className="btn-org btn-lg w-full flex gap-2 items-center"
              >
                <BsBagCheckFill className="text-[20px]" />
                Check Out
              </Button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckOut;
