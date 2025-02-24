import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const CartItem = (props) => {
  const [qtyAnchorEl, setQtyAnchorEl] = useState(null);
  const [selectedQty, setSelectedQty] = useState(props.qty);
  const openQty = Boolean(qtyAnchorEl);

  const handleClickQty = (event) => {
    setQtyAnchorEl(event.currentTarget);
  };
  const handleCloseQty = (value) => {
    setQtyAnchorEl(null);
    if (value !== null) {
      setSelectedQty(value);
    }
  };

  return (
    <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
      <div className="img w-[15%] rounded-md overflow-hidden">
        {" "}
        <Link to="product/57757" className="group">
          <img
            src="/asserts/Air Conditioners/Sm41.avif"
            alt=""
            className="w-full group-hover:scale-105 transition-all"
          />
        </Link>
      </div>
      <div className="info w-[85%] relative">
        <IoMdClose className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all" />
        <span className="text-[13px]">Samsung</span>
        <h3 className="text-[15px] w-[80%]">
          <Link className="link ">
            {" "}
            Convertible 5in1 Inverter Split AC AR18CY3YATA
          </Link>
        </h3>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />

        <div className="flex items-center gap-4 mt-2">
          <div className="relative">
            <span
              className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] py-1 px-3 rounded-md cursor-pointer"
              onClick={handleClickQty}
            >
              Qty : {selectedQty}
              <FaCaretDown className="mx-1" />
            </span>
            <Menu
              id="basic-menu"
              anchorEl={qtyAnchorEl}
              open={openQty}
              onClose={() => handleCloseQty(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleCloseQty(1)}>1</MenuItem>
              <MenuItem onClick={() => handleCloseQty(2)}>2</MenuItem>
              <MenuItem onClick={() => handleCloseQty(3)}>3</MenuItem>
              <MenuItem onClick={() => handleCloseQty(4)}>4</MenuItem>
              <MenuItem onClick={() => handleCloseQty(5)}>5</MenuItem>
              <MenuItem onClick={() => handleCloseQty(6)}>6</MenuItem>
              <MenuItem onClick={() => handleCloseQty(7)}>7</MenuItem>
              <MenuItem onClick={() => handleCloseQty(8)}>8</MenuItem>
              <MenuItem onClick={() => handleCloseQty(9)}>9</MenuItem>
              <MenuItem onClick={() => handleCloseQty(10)}>10</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="price text-[14px] font-[600]">$85.00</span>
          <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
            $99.00
          </span>
          <span className="price text-red-500 text-[14px] font-[600]">
            55% OFF
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
