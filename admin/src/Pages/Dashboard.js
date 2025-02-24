import React, { useContext, useState } from "react";
import DashboardBoxes from "../Components/DashboardBoxes";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from "../Components/Badge";
import { Link } from "react-router-dom";
import { RiEdit2Line } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import ProgressBar from "../Components/ProgressBar";

import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { MyContext } from "../App";

// ReChats
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  {
    id: "subcategory",
    label: "SUB CATEGORY",
    minWidth: 150,
  },
  {
    id: "price",
    label: "PRICE",
    minWidth: 150,
  },
  {
    id: "sales",
    label: "SALES",
    minWidth: 100,
  },
  {
    id: "action",
    label: "ACTION",
    minWidth: 100,
  },
];

const Dashboard = () => {
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);

  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };

  // material ui
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [chatr1Data, setChart1Data] = useState([
    {
      name: "JAN",
      TotalSales: 4000,
      TotalUsers: 2400,
      amt: 2400,
    },
    {
      name: "FEB",
      TotalSales: 3000,
      TotalUsers: 1398,
      amt: 2210,
    },
    {
      name: "MARCH",
      TotalSales: 2000,
      TotalUsers: 9800,
      amt: 2290,
    },
    {
      name: "APRIL",
      TotalSales: 2780,
      TotalUsers: 3908,
      amt: 2000,
    },
    {
      name: "MAY",
      TotalSales: 1890,
      TotalUsers: 4800,
      amt: 2181,
    },
    {
      name: "JUN",
      TotalSales: 2390,
      TotalUsers: 3800,
      amt: 2500,
    },
    {
      name: "JULY",
      TotalSales: 3490,
      TotalUsers: 4300,
      amt: 2100,
    },
    {
      name: "AUG",
      TotalSales: 3490,
      TotalUsers: 1200,
      amt: 2100,
    },
    {
      name: "SEP",
      TotalSales: 3490,
      TotalUsers: 6420,
      amt: 2100,
    },
    {
      name: "OCT",
      TotalSales: 3490,
      TotalUsers: 5300,
      amt: 2100,
    },
    {
      name: "NOV",
      TotalSales: 3490,
      TotalUsers: 1200,
      amt: 2100,
    },
    {
      name: "DEC",
      TotalSales: 3490,
      TotalUsers: 2300,
      amt: 2100,
    },
  ]);

  const handleChangeCateFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const context = useContext(MyContext);

  return (
    <>
      <div className="w-full py-2 px-5 p-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center justify-between  rounded-md gap-8 mb-5">
        <div className="info">
          <h1 className="text-[35px] font-bold leading-10 mb-3">
            Good Morning,
            <div className="flex items-center gap-2 mt-1">
              Cameron
              <img src="/hello.svg" alt="" className="w-[38px]" />
            </div>
          </h1>
          <p>
            Here's What happening on your store today. See the sataticstics at
            once.
          </p>
          <br />
          <Button
            className="btn-blue !capitalize"
            onClick={() =>
              context.setIsOpenFullScreenPanle({
                open: true,
                model: "Add Product",
              })
            }
          >
            <FaPlus className="font-bold" />
            Add Product
          </Button>
        </div>
        <img src="/onlineShop.jpg" alt="" className="w-[250px] " />
      </div>
      <DashboardBoxes />

      {/* Product Tabel Tailwind css */}
      <div className="card my-4 bg-white shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[20px] font-[600]">
            Products
            <span className="font-[400] text-[14px]">(Tailwind Css)</span>
          </h2>
        </div>

        {/* Filter by category */}
        <div className="flex items-center w-full pl-5 justify-between pr-5">
          <div className="col w-[20%] ">
            <h4 className="text-[13px] font-[600] mb-2">Category By</h4>
            <Select
              className="w-full "
              size="small"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={categoryFilterVal}
              onChange={handleChangeCateFilter}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Refrigerators</MenuItem>
              <MenuItem value={20}>Washing Machines</MenuItem>
              <MenuItem value={30}>Air Conditioners</MenuItem>
              <MenuItem value={40}>Microwaves</MenuItem>
              <MenuItem value={50}>Dishwashers</MenuItem>
            </Select>
          </div>
          <div className="col w-[25%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white btn-sm">
              Export
            </Button>
            <Button
              className="btn-blue btn-sm"
              onClick={() =>
                context.setIsOpenFullScreenPanle({
                  open: true,
                  model: "Add Product",
                })
              }
            >
              Add Product
            </Button>
          </div>
        </div>

        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 pr-0 py-3" width="10%">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </th>

                <th scope="col" className="px-0 py-3 whitespace-nowrap">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap ">
                  Sub Category
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Sales
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 pr-0 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/799574">
                        <img
                          src="/asserts/Air Conditioners/Sm41.avif"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <Link to="/product/799574">
                        <h3 className=" text-[14px] font-[600] leading-4 hover:text-primary">
                          Convertible 5in1 Inverter Split AC AR18CY3YATA
                        </h3>
                      </Link>
                      <span className="text-[12px]">Samsung</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $99.00
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $85.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>Sales
                  </p>
                  <ProgressBar value={40} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 pr-0 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/799574">
                        <img
                          src="/asserts/Air Conditioners/Sm41.avif"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <Link to="/product/799574">
                        <h3 className=" text-[14px] font-[600] leading-4 hover:text-primary">
                          Convertible 5in1 Inverter Split AC AR18CY3YATA
                        </h3>
                      </Link>
                      <span className="text-[12px]">Samsung</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $99.00
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $85.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>Sales
                  </p>
                  <ProgressBar value={40} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 pr-0 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/799574">
                        <img
                          src="/asserts/Air Conditioners/Sm41.avif"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <Link to="/product/799574">
                        <h3 className=" text-[14px] font-[600] leading-4 hover:text-primary">
                          Convertible 5in1 Inverter Split AC AR18CY3YATA
                        </h3>
                      </Link>
                      <span className="text-[12px]">Samsung</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $99.00
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $85.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>Sales
                  </p>
                  <ProgressBar value={40} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 pr-0 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/799574">
                        <img
                          src="/asserts/Air Conditioners/Sm41.avif"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <Link to="/product/799574">
                        <h3 className=" text-[14px] font-[600] leading-4 hover:text-primary">
                          Convertible 5in1 Inverter Split AC AR18CY3YATA
                        </h3>
                      </Link>
                      <span className="text-[12px]">Samsung</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $99.00
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $85.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>Sales
                  </p>
                  <ProgressBar value={40} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 pr-0 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/799574">
                        <img
                          src="/asserts/Air Conditioners/Sm41.avif"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <Link to="/product/799574">
                        <h3 className=" text-[14px] font-[600] leading-4 hover:text-primary">
                          Convertible 5in1 Inverter Split AC AR18CY3YATA
                        </h3>
                      </Link>
                      <span className="text-[12px]">Samsung</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $99.00
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $85.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>Sales
                  </p>
                  <ProgressBar value={40} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 pr-0 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/799574">
                        <img
                          src="/asserts/Air Conditioners/Sm41.avif"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <Link to="/product/799574">
                        <h3 className=" text-[14px] font-[600] leading-4 hover:text-primary">
                          Convertible 5in1 Inverter Split AC AR18CY3YATA
                        </h3>
                      </Link>
                      <span className="text-[12px]">Samsung</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">Electronics</td>
                <td className="px-6 py-2">
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $99.00
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $85.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-2">
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>Sales
                  </p>
                  <ProgressBar value={40} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Pagiantion */}
        <div className=" flex items-center justify-end pt-5 pb-5 px-4">
          <Pagination count={10} size="small" color="primary" />
        </div>
      </div>
      {/* Product Tabel Material Ui */}
      <div className="card my-4 bg-white shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[20px] font-[600]">
            Products
            <span className="font-[400] text-[14px]">(Material Ui Table )</span>
          </h2>
        </div>

        {/* Filter by category */}
        <div className="flex items-center w-full pl-5 justify-between pr-5">
          <div className="col w-[20%] ">
            <h4 className="text-[13px] font-[600] mb-2">Category By</h4>
            <Select
              className="w-full "
              size="small"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={categoryFilterVal}
              onChange={handleChangeCateFilter}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Refrigerators</MenuItem>
              <MenuItem value={20}>Washing Machines</MenuItem>
              <MenuItem value={30}>Air Conditioners</MenuItem>
              <MenuItem value={40}>Microwaves</MenuItem>
              <MenuItem value={50}>Dishwashers</MenuItem>
            </Select>
          </div>
          <div className="col w-[25%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white btn-sm">
              Export
            </Button>
            <Button
              className="btn-blue btn-sm"
              onClick={() =>
                context.setIsOpenFullScreenPanle({
                  open: true,
                  model: "Add Product",
                })
              }
            >
              Add Product
            </Button>
          </div>
        </div>

        <br />

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/799574">
                        <img
                          src="/asserts/Air Conditioners/Sm41.avif"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <Link to="/product/799574">
                        <h3 className=" text-[14px] font-[600] leading-4 hover:text-primary">
                          Convertible 5in1 Inverter Split AC AR18CY3YATA
                        </h3>
                      </Link>
                      <span className="text-[12px]">Samsung</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $99.00
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $85.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>Sales
                  </p>
                  <ProgressBar value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/799574">
                        <img
                          src="/asserts/Air Conditioners/Sm41.avif"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <Link to="/product/799574">
                        <h3 className=" text-[14px] font-[600] leading-4 hover:text-primary">
                          Convertible 5in1 Inverter Split AC AR18CY3YATA
                        </h3>
                      </Link>
                      <span className="text-[12px]">Samsung</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $99.00
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $85.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>Sales
                  </p>
                  <ProgressBar value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/799574">
                        <img
                          src="/asserts/Air Conditioners/Sm41.avif"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <Link to="/product/799574">
                        <h3 className=" text-[14px] font-[600] leading-4 hover:text-primary">
                          Convertible 5in1 Inverter Split AC AR18CY3YATA
                        </h3>
                      </Link>
                      <span className="text-[12px]">Samsung</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $99.00
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $85.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>Sales
                  </p>
                  <ProgressBar value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/799574">
                        <img
                          src="/asserts/Air Conditioners/Sm41.avif"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <Link to="/product/799574">
                        <h3 className=" text-[14px] font-[600] leading-4 hover:text-primary">
                          Convertible 5in1 Inverter Split AC AR18CY3YATA
                        </h3>
                      </Link>
                      <span className="text-[12px]">Samsung</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $99.00
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $85.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>Sales
                  </p>
                  <ProgressBar value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/799574">
                        <img
                          src="/asserts/Air Conditioners/Sm41.avif"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <Link to="/product/799574">
                        <h3 className=" text-[14px] font-[600] leading-4 hover:text-primary">
                          Convertible 5in1 Inverter Split AC AR18CY3YATA
                        </h3>
                      </Link>
                      <span className="text-[12px]">Samsung</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $99.00
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $85.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>Sales
                  </p>
                  <ProgressBar value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/product/799574">
                        <img
                          src="/asserts/Air Conditioners/Sm41.avif"
                          alt=""
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <Link to="/product/799574">
                        <h3 className=" text-[14px] font-[600] leading-4 hover:text-primary">
                          Convertible 5in1 Inverter Split AC AR18CY3YATA
                        </h3>
                      </Link>
                      <span className="text-[12px]">Samsung</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                      $99.00
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $85.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span>Sales
                  </p>
                  <ProgressBar value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      {/* Recent Order Table */}
      <div
        className="card my-4 bg-white shadow-md sm:rounded-lg
      "
      >
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[20px] font-[600] ">Recent Order</h2>
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

      {/* ReChats */}
      <div className="card mt-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5 pb-0">
          <h2 className="text-[18px] font-[600]">Total User & Total Sales</h2>
        </div>
        <div className="flex items-center gap-5 px-5 py-5 pt-0">
          <span className="flex items-center gap-1 text-[15px]">
            <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
            Total users
          </span>
          <span className="flex items-center gap-1 text-[15px]">
            <span className="block w-[8px] h-[8px] rounded-full bg-primary"></span>
            Total Sales
          </span>
        </div>
        <LineChart
          width={1000}
          height={500}
          data={chatr1Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="none" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="TotalSales"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="TotalUsers"
            stroke="#82ca9d"
            strokeWidth={3}
          />
        </LineChart>
      </div>
    </>
  );
};

export default Dashboard;
