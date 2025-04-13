import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

import SearchBox from "../Components/SearchBox";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { editData, fetchDataFromApi } from "../Apis";
import { useContext } from "react";
import { MyContext } from "../App";

const Orders = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [pageOrder, setPageOrder] = useState(1);
  const [orderStatus, setOrderStatus] = useState("");

  const context = useContext(MyContext);

  const handleChange = (e, id) => {
    setOrderStatus(e.target.value);

    const obj = {
      id: id,
      order_status: e.target.value,
    };

    editData(
      `/api/order/orderStatus/${id}?token=${localStorage.getItem(
        "accesstoken"
      )}`,
      obj
    ).then((res) => {
      if (res?.data?.error === false) {
        context.openAlertBox("error", res?.data?.message);
      } else {
        context.openAlertBox("success", "update order status");
      }
    });
  };

  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataFromApi(
      `/api/order/order-list?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      setOrders(res?.data);
    });
  }, [orderStatus, pageOrder]);

  return (
    <div className="card my-4 bg-white shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[20px] font-[600] ">Recent Order</h2>
        <div className="w-[40%]">
          <SearchBox setPageOrder={setPageOrder} />
        </div>
      </div>
      {/* create tabel */}
      <div className="shadow-md w-full py-5 px-8 rounded-md">
        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  &nbsp;
                </th>

                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Payment Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Pin Code
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  User Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Status
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.length !== 0 &&
                orders?.map((order, index) => {
                  return (
                    <>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-[500]">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                            onClick={() => isShowOrderProduct(index)}
                          >
                            {isOpenOrderProduct === index ? (
                              <FaAngleUp className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                            ) : (
                              <FaAngleDown className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                            )}
                          </Button>
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="text-primary">{order?._id}</span>
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="text-primary">
                            {order?.paymentId
                              ? order?.paymentId
                              : "CASH ON DELIVERY"}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          {order?.userId?.name}
                        </td>
                        <td className="px-6 py-4 font-[500] ">
                          {order?.userId?.mobile}
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="block w-[400px]">
                            {order?.delivery_address?.address_line1 +
                              " " +
                              order?.delivery_address?.landmark +
                              " " +
                              order?.delivery_address?.city +
                              " " +
                              order?.delivery_address?.state +
                              " " +
                              order?.delivery_address?.country}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          {order?.delivery_address?.pincode}
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          &#x20b9; {order?.totalAmt}
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          {order?.userId?.email}
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="text-primary">
                            {order?.userId?._id}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={
                              order?.order_status !== null
                                ? order?.order_status
                                : orderStatus
                            }
                            label="Status"
                            size="small"
                            className="w-full"
                            onChange={(e) => handleChange(e, order?._id)}
                          >
                            <MenuItem value={"pending"}>Pending</MenuItem>
                            <MenuItem value={"confirm"}>Confirm</MenuItem>
                            <MenuItem value={"delivered"}>Delivered</MenuItem>
                          </Select>
                        </td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          {order?.createdAt?.split("T")[0]}
                        </td>
                      </tr>
                      {/* Product Tabel */}
                      {isOpenOrderProduct === index && (
                        <tr>
                          <td className="pl-20" colSpan="6">
                            <div className="relative overflow-x-auto">
                              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Product Id
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Product Title
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap "
                                    >
                                      Image
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Quantity
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Price
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Sub Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order?.products?.map((item, index) => {
                                    return (
                                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-[500]">
                                          <span className="text-gray-600">
                                            {item?._id}
                                          </span>
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                          <div className="w-[200px]">
                                            {item?.productTitle}
                                          </div>
                                        </td>
                                        <td className="px-6 py-4 font-[500]">
                                          <img
                                            src={item?.image}
                                            alt=""
                                            className="w-[40px] h-[40px] object-cover rounded-md"
                                          />
                                        </td>
                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                          {item?.quantity}
                                        </td>
                                        <td className="px-6 py-4 font-[500] ">
                                          &#x20b9;{item?.price}
                                        </td>

                                        <td className="px-6 py-4 font-[500]">
                                          &#x20b9;{" "}
                                          {item?.price * item?.quantity}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
