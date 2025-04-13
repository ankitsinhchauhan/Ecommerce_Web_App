import React, { useContext, useEffect, useState } from "react";
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
import Pagination from "@mui/material/Pagination";
import Checkbox from "@mui/material/Checkbox";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Rating from "@mui/material/Rating";

import { MyContext } from "../App";

// ReChats
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

import { deleteData, fetchDataFromApi } from "../Apis";
import SearchBox from "../Components/SearchBox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 100 },
  { id: "category", label: "CATEGORY", minWidth: 150 },
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
    id: "reating",
    label: "RATING",
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

  // material ui
  const [productCat, setProductCat] = useState("");
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrder] = useState([]);
  const [sortedIds, setSortedIds] = useState([]);
  const [users, setUsers] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [ordersCount, setOrdersCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageOrder, setPageOrder] = useState(1);
  const [totalOrdersData, setTotalOrdersData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
  }, [context?.isOpenFullScreenPanle]);

  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProduct(null);
    } else {
      setIsOpenOrderProduct(index);
    }
  };

  useEffect(() => {
    fetchDataFromApi(
      `/api/order/order-list?page=${pageOrder}&limit=5&token=${localStorage.getItem(
        "accesstoken"
      )}`
    ).then((res) => {
      if (res?.error === false) {
        setOrder(res);
        setOrdersData(res?.data);
      }
    });
    fetchDataFromApi(
      `/api/order/order-list?&token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      if (res?.error === false) {
        setTotalOrdersData(res);
      }
    });
    fetchDataFromApi(`/api/order/count`).then((res) => {
      setOrdersCount(res?.count);
    });
  }, [pageOrder]);

  // Search Bar
  useEffect(() => {
    if (searchQuery !== "") {
      const filteredOrders = totalOrdersData?.data?.filter(
        (order) =>
          order?._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order?.userId?.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order?.userId?.email
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order?.createdAt.includes(searchQuery)
      );
      setOrdersData(filteredOrders);
    } else {
      fetchDataFromApi(
        `/api/order/order-list?page=${pageOrder}&limit=7&token=${localStorage.getItem(
          "accesstoken"
        )}`
      ).then((res) => {
        if (res?.error === false) {
          setOrder(res);
          setOrdersData(res?.data);
        }
      });
    }
  }, [searchQuery]);

  useEffect(() => {
    getTotalUsersByYear();
    fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
      setUsers(res?.users);
    });
    fetchDataFromApi(`/api/user/getAllReview`).then((res) => {
      setAllReviews(res?.reviews);
    });
  });

  // Handle to toggle all checkboxes
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;

    // update all items checked status
    const updateItems = productData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setProductData(updateItems);

    //updaate the sorted IDs state
    if (isChecked) {
      const ids = updateItems.map((item) => item._id).sort((a, b) => a - b);

      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  // Handler to toggle individual checkboxes
  const handleCheckboxChange = (e, id, index) => {
    const updatedItems = productData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item
    );
    setProductData(updatedItems);

    // update the sortedIds state
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getProducts = async () => {
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProducts?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      let productArr = [];
      if (res?.error === false) {
        for (let i = 0; i < res?.products?.length; i++) {
          productArr[i] = res?.products[i];
          productArr[i].checked = false;
        }
        setTimeout(() => {
          setProductData(productArr);
          setIsLoading(false);
        }, 300);
      }
    });
  };

  const deleteProduct = (id) => {
    deleteData(
      `/api/product/${id}?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      getProducts();
      context.openAlertBox("success", "Product Deleted");
    });
  };

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    setIsLoading(true);
    const id = event.target.value;
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${id}?token=${localStorage.getItem(
        "accesstoken"
      )}`
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    });
  };

  const getTotalUsersByYear = () => {
    fetchDataFromApi(
      `/api/order/users?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      const users = [];
      res?.TotalUsers?.length !== 0 &&
        res?.TotalUsers?.map((item) => {
          users.push({
            name: item?.name,
            TotalUsers: parseInt(item?.TotalUsers),
          });
        });
      const uniqueArr = users.filter(
        (obj, index, self) =>
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArr);
    });
  };

  const getTotalSalessByYear = () => {
    fetchDataFromApi(
      `/api/order/sales?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      const sales = [];
      res?.monthlySales?.length !== 0 &&
        res?.monthlySales?.map((item) => {
          sales.push({
            name: item?.name,
            TotalSales: parseInt(item?.TotalSales),
          });
        });
      const uniqueArr = users.filter(
        (obj, index, self) =>
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArr);
    });
  };
  return (
    <>
      <div className="w-full py-2 px-5 p-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center justify-between  rounded-md gap-8 mb-5">
        <div className="info">
          <h1 className="text-[35px] font-bold leading-10 mb-3">
            Welcome,
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

      {productData?.length !== 0 &&
        users?.length !== 0 &&
        allReviews?.length !== 0 && (
          <DashboardBoxes
            orders={ordersCount}
            products={productData?.length}
            users={users?.length}
            reviews={allReviews?.length}
            category={context?.catData?.length}
          />
        )}

      {/* Product Tabel Material Ui */}
      <div className="card my-4 pt-5 bg-white shadow-md sm:rounded-lg">
        {/* Filter by category */}
        <div className="flex items-center w-full px-5 justify-between">
          <div className="col w-[20%] ">
            <h4 className="text-[13px] font-[600] mb-2">Category By</h4>
            {context?.catData?.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                className="w-full "
                size="small"
                labelId="demo-simple-select-label"
                id="productCatDrop"
                value={productCat}
                onChange={handleChangeProductCat}
                label="Category"
              >
                {context?.catData?.map((cat, index) => {
                  return <MenuItem value={cat?._id}>{cat?.name}</MenuItem>;
                })}
              </Select>
            )}
          </div>

          <div className="col1 w-[20%] ml-auto">
            <SearchBox />
          </div>
        </div>

        <br />

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    {...label}
                    size="small"
                    onChange={handleSelectAll}
                    checked={
                      productData?.length > 0
                        ? productData.every((item) => item.checked)
                        : false
                    }
                  />
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
              {isLoading === false ? (
                productData?.length !== 0 &&
                productData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.reverse()
                  ?.map((product, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <Checkbox
                            {...label}
                            size="small"
                            checked={product.checked === true ? true : false}
                            onChange={(e) =>
                              handleCheckboxChange(e, product._id, index)
                            }
                          />
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex items-center gap-4 w-[300px]">
                            <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                              <Link to={`/product/${product?._id}`}>
                                <LazyLoadImage
                                  src={product?.images[0]}
                                  alt={"images"}
                                  effect="blur"
                                  className="w-full group-hover:scale-105 transition-all"
                                />
                              </Link>
                            </div>
                            <div className="info w-[75%]">
                              <h3 className=" text-[14px] font-[600] leading-4 hover:text-primary">
                                <Link to={`/product/${product?._id}`}>
                                  {product?.name}
                                </Link>
                              </h3>
                              <span className="text-[12px]">
                                {product?.brand}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          {product?.catName}
                        </TableCell>

                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex gap-1 flex-col">
                            <span className="price text-primary text-[14px] font-[600]">
                              &#x20b9; {product?.price}
                            </span>

                            <span className="oldPrice line-through leading-3 text-gray-500 text-[15px] font-[500]">
                              &#x20b9; {product?.oldPrice}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <p className="text-[14px] w-[100px]">
                            <span className="font-[600]">{product?.sale}</span>
                            sale
                          </p>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <p className="text-[14px] w-[100px]">
                            <Rating
                              name="half-rating"
                              size="small"
                              defaultValue={product?.rating}
                              precision={0.5}
                            />
                          </p>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex items-center gap-4">
                            <Button
                              className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]"
                              onClick={() =>
                                context.setIsOpenFullScreenPanle({
                                  open: true,
                                  model: "Edit Product",
                                  id: product?._id,
                                })
                              }
                            >
                              <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                            </Button>
                            <Link to={`/product/${product?._id}`}>
                              <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                                <FaRegEye className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                              </Button>
                            </Link>
                            <Button
                              className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]"
                              onClick={() => deleteProduct(product?._id)}
                            >
                              <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={8}>
                      <div className="flex items-center justify-center w-full min-h-[400px]">
                        <CircularProgress color="inherit" />
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Recent Order</h2>
          <div className="w-[25%]">
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setPageOrder={setPageOrder}
            />
          </div>
        </div>
        {/* Recent Order Table */}

        <div className="shadow-md w-full px-5 rounded-md">
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
                {ordersData?.length !== 0 &&
                  ordersData?.map((order, index) => {
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
                                order?.delivery_address?.country +
                                " " +
                                order?.delivery_address?.mobile}
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
                            <Badge status={order?.order_status} />
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

            {orders?.totalPages > 1 && (
              <div className="flex items-center justify-center mt-10 pb-5">
                <Pagination
                  showFirstButton
                  showLastButton
                  count={orders?.totalPages}
                  page={pageOrder}
                  onChange={(e, value) => setPageOrder(value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ReChats */}
      <div className="card mt-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5 pb-0">
          <h2 className="text-[18px] font-[600]">Total User & Total Sales</h2>
        </div>
        <div className="flex items-center gap-5 px-5 py-5 pt-0">
          <span
            className="flex items-center gap-1 text-[15px] cursor-pointer"
            onClick={getTotalUsersByYear}
          >
            <span className="block w-[8px] h-[8px] rounded-full bg-[#0858f7]"></span>
            Total users
          </span>
          <span
            className="flex items-center gap-1 text-[15px] cursor-pointer"
            onClick={getTotalSalessByYear}
          >
            <span className="block w-[8px] h-[8px] rounded-full bg-[#16a34a]"></span>
            Total Sales
          </span>
        </div>

        {chartData?.length !== 0 && (
          <BarChart
            width={1000}
            height={500}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
              tick={{ fontSize: 12 }}
              label={{ position: "insideBottom", fontSize: 14 }}
              style={{ fill: context?.theme === "dark" ? "white" : "#000" }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{ position: "insideBottom", fontSize: 14 }}
              style={{ fill: context?.theme === "dark" ? "white" : "#000" }}
            />
            <Tooltip
              contentStyle={{ background: "#071739", color: "white" }}
              labelStyle={{ color: "yellow" }}
              itemStyle={{ color: "cyan" }}
              cursor={{ fill: "white" }}
            />
            <Legend />

            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              vertical={false}
            />

            <Bar dataKey="TotalSales" stackId="a" fill="#16a34a" />
            <Bar dataKey="TotalUsers" stackId="b" fill="#0858f7" />
          </BarChart>
        )}
      </div>
    </>
  );
};

export default Dashboard;
