import React, { useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";
import { BsBagCheckFill } from "react-icons/bs";
import Radio from "@mui/material/Radio";
import { MyContext } from "../App";
import { addData, deleteData, fetchDataFromApi } from "../api";

import { BsFillBagCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const CheckOut = () => {
  const [userData, setUserData] = useState(null);
  const [isChecked, setIsChecked] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState();

  const context = useContext(MyContext);
  // const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (context?.userData !== null) {
      setUserData(context?.userData);
      setSelectedAddress(context?.userData?.address_details[0]?._id);

      fetchDataFromApi(
        `/api/order/order-list?token=${localStorage.getItem("accesstoken")}`
      ).then((res) => {
        console.log(res);
      });
    }
  }, [context?.userData, userData]);

  useEffect(() => {
    setTotalAmount(
      context?.cartData?.length !== 0
        ? context?.cartData
            ?.map((item) => parseInt(item.price) * item.quantity)
            .reduce((total, value) => total + value, 0)
        : 0
    )?.toLocaleString("en-US", { style: "currency", currency: "INR" });

    // localStorage
    //   .setItem(
    //     "totalAmount",
    //     context?.cartData?.length !== 0
    //       ? context?.cartData
    //           ?.map((item) => parseInt(item.price) * item.quantity)
    //           .reduce((total, value) => total + value, 0)
    //       : 0
    //   )
    //   ?.toLocaleString("en-US", { style: "currency", currency: "INR" });
  }, [context.cartData]);

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

    if (userData?.address_details?.length !== 0) {
      var option = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        key_secret: process.env.REACT_APP_RAZORPAY_KEY_SECRET,
        amount: parseInt(totalAmount * 100),
        currency: "INR",
        order_receipt: context?.userData?.name,
        name: "ShopNestWebApp",
        description: "for testing purpose",
        handler: function (res) {
          const paymentId = res.razorpay_payment_id;
          const user = context?.userData;

          const payLoad = {
            userId: user?._id,
            products: context?.cartData,
            paymentId: paymentId,
            payment_status: "COMPLETED",
            delivery_address: selectedAddress,
            totalAmt: totalAmount,
            date: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          };

          addData(
            `/api/order/create?token=${localStorage.getItem("accesstoken")}`,
            payLoad
          ).then((res) => {
            context.openAlertBox("success", "Order Placed");

            deleteData(
              `/api/cart/emptyCart/${user?._id}?token=${localStorage.getItem(
                "accesstoken"
              )}`
            ).then((res) => {
              context?.getCartItem();
            });
            // navigate("/");
          });
        },

        them: {
          color: "#6c6cff ",
        },
      };

      var pay = new window.Razorpay(option);
      pay.open();
    } else {
      context.openAlertBox("error", "Please add address");
    }
  };

  const cashOnDelivery = () => {
    const user = context?.userData;

    if (userData?.address_details?.length !== 0) {
      const payLoad = {
        userId: user?._id,
        products: context?.cartData,
        paymentId: "",
        payment_status: "CASH ON DELIVERY",
        delivery_address: selectedAddress,
        totalAmt: totalAmount,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
      addData(
        `/api/order/create?token=${localStorage.getItem("accesstoken")}`,
        payLoad
      ).then((res) => {
        context.openAlertBox("success", "Order Placed");
        deleteData(
          `/api/cart/emptyCart/${user?._id}?token=${localStorage.getItem(
            "accesstoken"
          )}`
        ).then((res) => {
          context?.getCartItem();
        });
        // navigate("/");
      });
    } else {
      context?.openAlertBox("error", "Please add address");
    }
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
              <div className="flex items-center flex-col gap-3 mb-2">
                <Button
                  type="submit"
                  className="btn-org btn-lg w-full flex gap-2 items-center"
                >
                  <BsBagCheckFill className="text-[20px]" />
                  Check Out
                </Button>

                <Button
                  type="button"
                  className="btn-dark btn-lg w-full flex gap-2 items-center"
                  onClick={cashOnDelivery}
                >
                  <BsFillBagCheckFill className="text-[20px]" />
                  Cash on Delivery
                </Button>
              </div>{" "}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckOut;
