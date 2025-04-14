import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
// import { FaRegPlusSquare } from "react-icons/fa";
// import { FaRegMinusSquare } from "react-icons/fa";

const CategoryCollapse = (props) => {
  const [subMenuIndex, setSubMenuIndex] = useState(null);
  const [innerSubMenuIndex, setInnerSubMenuIndex] = useState(null);

  const openSubMenu = (index) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(null);
    } else {
      setSubMenuIndex(index);
    }
  };

  const openInnerSubMenu = (index) => {
    if (innerSubMenuIndex === index) {
      setInnerSubMenuIndex(null);
    } else {
      setInnerSubMenuIndex(index);
    }
  };

  return (
    <>
      <div className="scroll">
        {/* Menu */}
        <ul className="w-full">
          {props?.data?.length !== 0 &&
            props?.data?.map((cat, index) => {
              return (
                <li className="list-none flex items-center relative flex-col">
                  <Link to={`/product?catId=${cat?._id}`} className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3  !text-black ">
                      {cat?.name}
                    </Button>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default CategoryCollapse;
