import React from "react";

import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const CartPanel = () => {
  return (
    <>
      <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden py-3 px-4">
        <div className="cart w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to="/product/57757" className="block group">
              <img
                src="/asserts/Air Conditioners/Sm41.avif"
                alt=""
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="info w-[75%] pr-5 relative">
            <h4 className="text-[16px] font-[500] w-[90%]">
              <Link to="/product/57757" className="link transition-all">
                Convertible 5in1 Inverter Split AC AR18CY3YATA
              </Link>
            </h4>
            <p className="flex items-center gap-5 mt-2 mb-2">
              <span>
                Qty : <span>2</span>
              </span>
              <span className="text-primary font-[500]">Price : $89.00</span>
            </p>
            <RiDeleteBin6Line className="absolute top-[5px] right-[5px] cursor-pointer text-[20px] link transition-all -mx-2" />
          </div>
        </div>{" "}
        <div className="cart w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to="/product/57757" className="block group">
              <img
                src="/asserts/Air Conditioners/Sm41.avif"
                alt=""
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="info w-[75%] pr-5 relative">
            <h4 className="text-[16px] font-[500] w-[90%]">
              <Link to="/product/57757" className="link transition-all">
                Convertible 5in1 Inverter Split AC AR18CY3YATA
              </Link>
            </h4>
            <p className="flex items-center gap-5 mt-2 mb-2">
              <span>
                Qty : <span>2</span>
              </span>
              <span className="text-primary font-[500]">Price : $89.00</span>
            </p>
            <RiDeleteBin6Line className="absolute top-[5px] right-[5px] cursor-pointer text-[20px] link transition-all -mx-2" />
          </div>
        </div>{" "}
        <div className="cart w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to="/product/57757" className="block group">
              <img
                src="/asserts/Air Conditioners/Sm41.avif"
                alt=""
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="info w-[75%] pr-5 relative">
            <h4 className="text-[16px] font-[500] w-[90%]">
              <Link to="/product/57757" className="link transition-all">
                Convertible 5in1 Inverter Split AC AR18CY3YATA
              </Link>
            </h4>
            <p className="flex items-center gap-5 mt-2 mb-2">
              <span>
                Qty : <span>2</span>
              </span>
              <span className="text-primary font-[500]">Price : $89.00</span>
            </p>
            <RiDeleteBin6Line className="absolute top-[5px] right-[5px] cursor-pointer text-[20px] link transition-all -mx-2" />
          </div>
        </div>{" "}
        <div className="cart w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4">
          <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
            <Link to="/product/57757" className="block group">
              <img
                src="/asserts/Air Conditioners/Sm41.avif"
                alt=""
                className="w-full group-hover:scale-105"
              />
            </Link>
          </div>
          <div className="info w-[75%] pr-5 relative">
            <h4 className="text-[16px] font-[500] w-[90%]">
              <Link to="/product/57757" className="link transition-all">
                Convertible 5in1 Inverter Split AC AR18CY3YATA
              </Link>
            </h4>
            <p className="flex items-center gap-5 mt-2 mb-2">
              <span>
                Qty : <span>2</span>
              </span>
              <span className="text-primary font-[500]">Price : $89.00</span>
            </p>
            <RiDeleteBin6Line className="absolute top-[5px] right-[5px] cursor-pointer text-[20px] link transition-all -mx-2" />
          </div>
        </div>
      </div>

      <br />

      {/* Bottom Info */}
      <div className="bottomSec absolute bottom-[10px] left-[10px]  w-full pr-5">
        <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">1 Item</span>
            <span className="text-primary font-bold">$89.00</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">Shipping</span>
            <span className="text-primary font-bold">$5.00</span>
          </div>
        </div>

        <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[600]">Total(tax excl.)</span>
            <span className="text-primary font-bold">$94.00</span>
          </div>

          <br />

          <div className="flex items-center justify-between w-full gap-5">
            <Link to="/cart" className="w-[50%] d-block">
              <Button className="btn-org btn-lg ">View Cart</Button>
            </Link>
            <Link to="/checkout" className="w-[50%] d-block">
              <Button className="btn-org btn-border btn-lg ">Check Out</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPanel;
