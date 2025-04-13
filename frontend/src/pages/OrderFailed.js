import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const OrderFailed = () => {
  return (
    <section className="w-full p-10 py-20 flex items-center justify-center flex-col gap-2">
      <img src="/Failed.png" alt="" width="80" />
      <h3 className="mb-0 text-[25px]"> Your order is failed</h3>
      <p className="mt-0">Your order is failed due to some reason</p>
      <Link to="/">
        <Button className="btn-org btn-border">Back to home</Button>
      </Link>
    </section>
  );
};

export default OrderFailed;
