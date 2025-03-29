import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { RiEdit2Line } from "react-icons/ri";
import { GoTrash } from "react-icons/go";

// Table
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Checkbox from "@mui/material/Checkbox";

import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../Apis";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
  { id: "image", label: "IMAGE", minWidth: 150 },
  { id: "catName", label: "CATEGORY NAME", minWidth: 150 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const CategoryList = () => {
  // const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const context = useContext(MyContext);
  useEffect(() => {
    fetchDataFromApi(
      `/api/category/get?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      context?.setCatData(res?.data);
    });
  }, [context?.isOpenFullScreenPanle]);

  // const handleChangeCateFilter = (event) => {
  //   setCategoryFilterVal(event.target.value);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const delelteCat = (id) => {
    deleteData(
      `/api/category/${id}?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      context.openAlertBox("success", "Category Deleted");
      fetchDataFromApi(
        `/api/category/get?token=${localStorage.getItem("accesstoken")}`
      ).then((res) => {
        context?.setCatData(res?.data);
      });
    });
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[20px] font-[600]"> Category List</h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
          <Button className="btn !bg-green-600 !text-white btn-sm">
            Export
          </Button>
          <Button
            className="btn-blue btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanle({
                open: true,
                model: "Add New Category",
              })
            }
          >
            Add New Category
          </Button>
        </div>
      </div>
      {/* Category Material Ui */}
      <div className="card my-4 pt-5 bg-white shadow-md sm:rounded-lg">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell width={60}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    width={column.minWidth}
                    key={column.id}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {context?.catData?.length !== 0 &&
                context?.catData?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox {...label} size="small" />
                      </TableCell>
                      <TableCell width={100}>
                        <div className="flex items-center gap-4 w-[80px]">
                          <div className="img w-full rounded-md overflow-hidden group">
                            <Link to="/product/799574" data-discover="true">
                              <LazyLoadImage
                                src={item.images[0]}
                                alt={"image"}
                                effect="blur"
                                className="w-full group-hover:scale-105 transition-all"
                              />
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell width={100}>{item?.name}</TableCell>
                      <TableCell width={100}>
                        <div className="flex items-center gap-4">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]"
                            onClick={() =>
                              context.setIsOpenFullScreenPanle({
                                open: true,
                                model: "Edit Category",
                                id: item?._id,
                              })
                            }
                          >
                            <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                          </Button>

                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]"
                            onClick={() => delelteCat(item?._id)}
                          >
                            <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
          // onChangeCateFilter={handleChangeCateFilter}
        />
      </div>
    </>
  );
};

export default CategoryList;
