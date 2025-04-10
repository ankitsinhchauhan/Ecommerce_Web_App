import React, { useContext } from "react";

import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { deleteData } from "../../api";

const CartPanel = (props) => {
  const context = useContext(MyContext);

  const removeItem = (id) => {
    deleteData(
      `/api/cart/deleteCartItem/${id}?token=${localStorage.getItem(
        "accesstoken"
      )}`
    ).then((res) => {
      context.openAlertBox("success", "Item remove");
      context?.getCartItem();
    });
  };

  return (
    <>
      <div className="scroll w-full max-h-[460px] overflow-y-scroll overflow-x-hidden py-3 px-4">
        {props?.data?.map((item, index) => {
          return (
            <div className="cart w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4">
              <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
                <Link to={`/product/${item?._id}`} className="block group">
                  <img
                    src={item?.image}
                    alt=""
                    className="w-full group-hover:scale-105"
                  />
                </Link>
              </div>
              <div className="info w-[75%] pr-5 pt-3 relative">
                <h4 className="text-[16px] font-[500] w-[90%]">
                  <Link to="/product/57757" className="link transition-all">
                    {item?.productTitle?.substr(0, 20) + "..."}
                  </Link>
                </h4>
                <p className="flex items-center gap-5 mt-2 mb-2">
                  <span>
                    Qty : <span>{item?.quantity}</span>
                  </span>
                  <span className="text-primary font-[500]">
                    Price :
                    {item?.subTotal?.toLocaleString("en-Us", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </span>
                </p>
                <RiDeleteBin6Line
                  className="absolute top-[5px] right-[5px] cursor-pointer text-[20px] link transition-all -mx-2"
                  onClick={() => removeItem(item?._id)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <br />
      {/* Bottom Info */}
      <div className="bottomSec absolute bottom-[10px] left-[10px]  w-full pr-5">
        <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">
              {context?.cartData?.length} Item
            </span>
            <span className="text-primary font-bold">
              {(context?.cartData?.length !== 0
                ? context?.cartData
                    ?.map((item) => parseInt(item.price) * item.quantity)
                    .reduce((total, value) => total + value, 0)
                : 0
              )?.toLocaleString("en-Us", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
        </div>

        <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">Total (tax excl.)</span>
            <span className="text-primary font-bold">
              {(context?.cartData?.length !== 0
                ? context?.cartData
                    ?.map((item) => parseInt(item.price) * item.quantity)
                    .reduce((total, value) => total + value, 0)
                : 0
              )?.toLocaleString("en-Us", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>

          <br />

          <div className="flex items-center justify-between w-full gap-5">
            <Link
              to="/cart"
              className="w-[50%] d-block"
              onClick={context.toggleCartPanel(false)}
            >
              <Button className="btn-org btn-lg ">View Cart</Button>
            </Link>
            <Link
              to="/checkout"
              className="w-[50%] d-block"
              onClick={context.toggleCartPanel(false)}
            >
              <Button className="btn-org btn-border btn-lg ">Check Out</Button>
            </Link>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default CartPanel;
