import React, { useContext, useState } from "react";
import "../Search/style.css";
import Button from "@mui/material/Button";
import { IoSearch } from "react-icons/io5";
import { MyContext } from "../../../App";
import { addData } from "../../../api";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const search = () => {
    const obj = {
      page: 1,
      limit: 3,
      query: searchQuery,
    };

    if (searchQuery !== "") {
      addData(`/api/product/search/get`, obj).then((res) => {
        context?.setSearchData(res);
        navigate("/search");
      });
    }
  };

  return (
    <div className="searchBox w-[100%] h-[50px] bg-gray-100 rounded-[5px] relative p-2">
      <input
        type="text"
        placeholder="Search "
        className="w-full  h-[35px] focus:outline-none bg-inherit p-2 text-[15px]"
        value={searchQuery}
        onChange={onChangeInput}
      />
      <Button
        className=" !absolute top-[8px] right-[5px] z-50 !w-[37px] !h-[37px] !min-w-[37px] !rounded-full !text-black"
        onClick={search}
      >
        <IoSearch className="text-[#4e4e4e] text-[24px]" />
      </Button>
    </div>
  );
};

export default Search;
