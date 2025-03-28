import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { RiEdit2Line } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import ProgressBar from "../../Components/ProgressBar";

// Table
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import { MyContext } from "../../App";
import SearchBox from "../../Components/SearchBox";

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
    id: "action",
    label: "ACTION",
    minWidth: 100,
  },
];

const Products = () => {
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const context = useContext(MyContext);

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

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[20px] font-[600]">Products</h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
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
      {/* Product Tabel Material Ui */}
      <div className="card my-4 pt-5 bg-white shadow-md sm:rounded-lg">
        {/* Filter by category */}
        <div className="flex items-center w-full px-5 justify-between">
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

          {/* Search Box */}
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
    </>
  );
};

export default Products;
