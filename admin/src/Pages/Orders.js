import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from "../Components/Badge";
import SearchBox from "../Components/SearchBox";

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
    <div
      className="card my-4 bg-white shadow-md sm:rounded-lg
  "
    >
      <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[20px] font-[600] ">Recent Order</h2>
        <div className="w-[40%]">
          <SearchBox />
        </div>
      </div>
      <div className="relative overflow-x-auto mt-5 pb-5">
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
                <span className="text-primary font-[600]">
                  7466588hfdhey75hej83j
                </span>
              </td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary font-[600]">
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
                  22/5 Steet No 6 , Anil Flate, Dafnala Road, Shahibaug,
                  Ahmedabad
                </span>
              </td>
              <td className="px-6 py-4 font-[500]">380004</td>
              <td className="px-6 py-4 font-[500]">$179.00</td>
              <td className="px-6 py-4 font-[500]">mahesh100@gmail.com</td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary font-[600]">
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
                              src="/frontend/public/asserts/Air Conditioners/Sm41.avif"
                              alt=""
                              className="w-[40px] h-[40px] object-cover rounded-md"
                            />
                          </td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            3
                          </td>
                          <td className="px-6 py-4 font-[500] ">$89.00</td>

                          <td className="px-6 py-4 font-[500]">$267.00</td>
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
                          <td className="px-6 py-4 font-[500] ">$89.00</td>

                          <td className="px-6 py-4 font-[500]">$178.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            )}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-[500]">
                <Button
                  className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                  onClick={() => isShowOrderProduct(1)}
                >
                  {isOpenOrderProduct === 1 ? (
                    <FaAngleUp className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                  ) : (
                    <FaAngleDown className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                  )}
                </Button>
              </td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary font-[600]">
                  7466588hfdhey75hej83j
                </span>
              </td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary font-[600]">
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
                  22/5 Steet No 6 , Anil Flate, Dafnala Road, Shahibaug,
                  Ahmedabad
                </span>
              </td>
              <td className="px-6 py-4 font-[500]">380004</td>
              <td className="px-6 py-4 font-[500]">$179.00</td>
              <td className="px-6 py-4 font-[500]">mahesh100@gmail.com</td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary font-[600]">
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
            {isOpenOrderProduct === 1 && (
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
                              src="/frontend/public/asserts/Air Conditioners/Sm41.avif"
                              alt=""
                              className="w-[40px] h-[40px] object-cover rounded-md"
                            />
                          </td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            3
                          </td>
                          <td className="px-6 py-4 font-[500] ">$89.00</td>

                          <td className="px-6 py-4 font-[500]">$267.00</td>
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
  );
};

export default Orders;
