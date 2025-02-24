import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { BsBagCheckFill } from "react-icons/bs";

const CheckOut = () => {
  return (
    <section className="py-10">
      <div className="container flex gap-5">
        {/* Left Side */}
        <div className="leftCol w-[73%]">
          <div className="card bg-white shadow-md p-5 rounded-md w-full">
            <h1>Billing Details</h1>
            <form className="w-full mt-5">
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-[50%]">
                  <TextField
                    type="name"
                    className="w-full"
                    label="Full Name"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="col w-[50%]">
                  <TextField
                    type="email"
                    className="w-full"
                    label="Email"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              <h6 className="text-[14px] font-[500] mb-3">Steet address *</h6>
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-[100%]">
                  <TextField
                    type="name"
                    label="House No. and Street Name"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-[100%]">
                  <TextField
                    type="name"
                    label="Apartment , suite, unit, etc. (optional)"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
              </div>

              <h6 className="text-[14px] font-[500] mb-3">Town / City *</h6>
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-[100%]">
                  <TextField
                    type="name"
                    label="Town / City *"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>

                <div className="col w-[100%]">
                  <TextField
                    type="name"
                    label="State / Contry *"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
              </div>

              <h6 className="text-[14px] font-[500] mb-3">Zip Code *</h6>
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-[100%]">
                  <TextField
                    type="name"
                    label="Zip Code"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex items-center gap-5 pb-5">
                <div className="col w-[100%]">
                  <TextField
                    type="number"
                    label="Phone Number"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
                <div className="col w-[100%]">
                  <TextField
                    type="text"
                    label="Email Address"
                    variant="outlined"
                    size="small"
                    className="w-full"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side */}
        <div className="rightCol w-[30%]">
          <div className="card shadow-md bg-white p-5 rounded-md">
            <h2 className="mb-4">Your Order</h2>
            <div className=" mb-5 scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2">
              <div className="flex items-center  justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1]">
                <span className="text-[14px] font-[600]">Product</span>
                <span className="text-[14px] font-[600]">Subtotal</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="part1 flex items-center gap-3">
                  <div className="img w-[60px] h-[60px] object-cover overflow-hidden rounded-md group cursor-pointer ">
                    <img
                      src="/asserts/Air Conditioners/Sm41.avif"
                      alt=""
                      className="w-full transition-all group-hover:scale-105"
                    />
                  </div>
                  <div className="info">
                    <h4 className="text-[14px]">
                      Convertible Inverter Split AC....
                    </h4>
                    <span className="text-[13px]">Qty : 1</span>
                  </div>
                </div>
                <span className="text-[14px]">$80.00</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="part1 flex items-center gap-3">
                  <div className="img w-[60px] h-[60px] object-cover overflow-hidden rounded-md group cursor-pointer ">
                    <img
                      src="/asserts/Air Conditioners/Sm41.avif"
                      alt=""
                      className="w-full transition-all group-hover:scale-105"
                    />
                  </div>
                  <div className="info">
                    <h4 className="text-[14px]">
                      Convertible Inverter Split AC....
                    </h4>
                    <span className="text-[13px]">Qty : 1</span>
                  </div>
                </div>
                <span className="text-[14px]">$80.00</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="part1 flex items-center gap-3">
                  <div className="img w-[60px] h-[60px] object-cover overflow-hidden rounded-md group cursor-pointer ">
                    <img
                      src="/asserts/Air Conditioners/Sm41.avif"
                      alt=""
                      className="w-full transition-all group-hover:scale-105"
                    />
                  </div>
                  <div className="info">
                    <h4 className="text-[14px]">
                      Convertible Inverter Split AC....
                    </h4>
                    <span className="text-[13px]">Qty : 1</span>
                  </div>
                </div>
                <span className="text-[14px]">$80.00</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="part1 flex items-center gap-3">
                  <div className="img w-[60px] h-[60px] object-cover overflow-hidden rounded-md group cursor-pointer ">
                    <img
                      src="/asserts/Air Conditioners/Sm41.avif"
                      alt=""
                      className="w-full transition-all group-hover:scale-105"
                    />
                  </div>
                  <div className="info">
                    <h4 className="text-[14px]">
                      Convertible Inverter Split AC....
                    </h4>
                    <span className="text-[13px]">Qty : 1</span>
                  </div>
                </div>
                <span className="text-[14px]">$80.00</span>
              </div>
            </div>
            <Button className="btn-org btn-lg w-full flex gap-2 items-center">
              <BsBagCheckFill className="text-[20px]" />
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
