import React, { useState } from "react";
import AccountSideBar from "./../components/SideBar/AccountSideBar";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

import Badge from "../components/Badge/Badge";

const Orders = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);

  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };

  return (
    <section className="py-10 w-full ">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSideBar />
        </div>
        <div className="col2 w-[80%]">
          <div className="shadow-md rounded-md bg-white">
            <div className="p-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2>My Orders</h2>
              <p>
                There are <span className="font-bold text-primary">2</span>{" "}
                Orders
              </p>
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
                        <th
                          scope="col"
                          className="px-6 py-3 whitespace-nowrap "
                        >
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
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-[500]">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                            onClick={() => isShowOrderProduct(0)}
                          >
                            {isOpenOrderProduct === 0 ? (
                              <FaAngleUp className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                            ) : (
                              <FaAngleDown className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                            )}
                          </Button>
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="text-primary">
                            7466588hfdhey75hej83j
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="text-primary">
                            pay_PTP0qExFbtiirnjf879n
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          Mahesh Sharma
                        </td>
                        <td className="px-6 py-4 font-[500] ">7485967485</td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="block w-[400px]">
                            {" "}
                            22/5 Steet No 6 , Anil Flate, Dafnala Road,
                            Shahibaug, Ahmedabad
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[500]">380004</td>
                        <td className="px-6 py-4 font-[500]">$179.00</td>
                        <td className="px-6 py-4 font-[500]">
                          mahesh100@gmail.com
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="text-primary">
                            166e173hh270033kdsi3k122ab
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <Badge status="pending" />
                        </td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          2025-01-15
                        </td>
                      </tr>
                      {/* Product Tabel */}
                      {isOpenOrderProduct === 0 && (
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
                                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4 font-[500]">
                                      <span className="text-gray-600">
                                        7466588hfdhey75hej83j
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 font-[500]">
                                      Convertible 5in1 Inverter Split AC
                                    </td>
                                    <td className="px-6 py-4 font-[500]">
                                      <img
                                        src="/asserts/Air Conditioners/Sm41.avif"
                                        alt=""
                                        className="w-[40px] h-[40px] object-cover rounded-md"
                                      />
                                    </td>
                                    <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                      3
                                    </td>
                                    <td className="px-6 py-4 font-[500] ">
                                      $89.00
                                    </td>

                                    <td className="px-6 py-4 font-[500]">
                                      $267.00
                                    </td>
                                  </tr>
                                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4 font-[500]">
                                      <span className="text-gray-600">
                                        7466588hfdhey75hej83j
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 font-[500]">
                                      Convertible 5in1 Inverter Split AC
                                    </td>
                                    <td className="px-6 py-4 font-[500]">
                                      <img
                                        src="/asserts/Air Conditioners/Sm41.avif"
                                        alt=""
                                        className="w-[40px] h-[40px] object-cover rounded-md"
                                      />
                                    </td>
                                    <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                      2
                                    </td>
                                    <td className="px-6 py-4 font-[500] ">
                                      $89.00
                                    </td>

                                    <td className="px-6 py-4 font-[500]">
                                      $178.00
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
