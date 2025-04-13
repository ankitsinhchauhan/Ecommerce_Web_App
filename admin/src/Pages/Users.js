import React, { use, useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { MdCalendarMonth } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import SearchBox from "../Components/SearchBox";
import { fetchDataFromApi } from "../Apis";
import { MyContext } from "../App";

const columns = [
  { id: "userImg", label: "USER IMAGE", minWidth: 80 },
  { id: "userName", label: "USER NAME", minWidth: 100 },

  {
    id: "userEmail",
    label: "USER EMAIL",
    minWidth: 120,
  },
  {
    id: "userPone",
    label: "PHONE",
    minWidth: 140,
  },
  {
    id: "createdDate",
    label: "CREATED",
    minWidth: 140,
  },
  {
    id: "update",
    label: "ACTION",
    minWidth: 100,
  },
];

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userData, setUserData] = useState([]);
  const [userTotalData, setUserTotalData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const context = useContext(MyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
      setUserData(res?.users);
      setUserTotalData(res?.users);
      setIsLoading(false);
    });
  }, []);

  // Search Bar
  useEffect(() => {
    if (searchQuery !== "") {
      const filteredItems = userTotalData?.filter(
        (user) =>
          user._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.createdAt.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setUserData(filteredItems);
    } else {
      fetchDataFromApi(`/api/user/getAllUsers`).then((res) => {
        if (res?.error === false) {
          setUserData(res?.users);
          setIsLoading(false);
        }
      });
    }
  }, [searchQuery]);

  return (
    <>
      <div className="card my-4 pt-5 bg-white shadow-md sm:rounded-lg">
        <div className="flex items-center w-full px-5 justify-between">
          <div className="col w-[20%] ">
            <h2 className="text-[20px] font-[600]">Users List</h2>
          </div>

          {/* Search Box */}
          <div className="col1 w-[40%] ml-auto">
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>

        <br />

        <TableContainer sx={{ maxHeight: 440 }} className="px-1">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
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
              {isLoading === false
                ? userData?.length !== 0 &&
                  userData
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.reverse()
                    ?.map((user, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <div className="flex items-center gap-4 w-[70px]">
                              <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                                <Link to="/product/799574">
                                  <img
                                    src={
                                      user?.avatar !== "" &&
                                      user?.avatar !== undefined
                                        ? user?.avatar
                                        : "/profile.jpg"
                                    }
                                    alt=""
                                    className="w-full group-hover:scale-105 transition-all"
                                  />
                                </Link>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            {user?.name}
                          </TableCell>

                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <span className="flex items-center gap-2">
                              <MdMarkEmailRead />
                              {user?.email}
                            </span>
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <span className="flex items-center gap-2">
                              <MdLocalPhone />
                              {user?.mobile === null ? "NONE" : user?.mobile}
                            </span>
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <span className="flex items-center gap-2">
                              <MdCalendarMonth />
                              {user?.createdAt?.split("T")[0]}
                            </span>
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <div className="flex items-center gap-4">
                              <Button className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                                <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={userData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default Users;
