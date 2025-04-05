import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deleteData, editData } from "../../api";
import { MyContext } from "../../App";

const CartItem = (props) => {
  const [qtyAnchorEl, setQtyAnchorEl] = useState(null);
  const [selectedQty, setSelectedQty] = useState(props.qty);
  const openQty = Boolean(qtyAnchorEl);

  const context = useContext(MyContext);

  const handleClickQty = (event) => {
    setQtyAnchorEl(event.currentTarget);
  };
  const handleCloseQty = (value) => {
    setQtyAnchorEl(null);
    if (value !== null) {
      setSelectedQty(value);

      const cartObj = {
        _id: props?.item?._id,
        qty: value,
        subTotal: props?.item?.price * value,
      };

      editData(
        `/api/cart/updateQty?token=${localStorage.getItem("accesstoken")}`,
        cartObj
      ).then((res) => {
        context.openAlertBox("success", "Upadate Cart");
      });
    }
  };

  const removeItem = (id) => {
    deleteData(
      `/api/cart/deleteCartItem/${id}?token=${localStorage.getItem(
        "accesstoken"
      )}`
    ).then((res) => {
      context.openAlertBox("success", "Item remove");
      context?.getCartItem();
    });
  };

  return (
    <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
      <div className="img w-[15%] rounded-md overflow-hidden">
        {" "}
        <Link to="product/57757" className="group">
          <img
            src={props?.item?.image}
            alt=""
            className="w-full group-hover:scale-105 transition-all"
          />
        </Link>
      </div>
      <div className="info w-[85%] relative">
        <IoMdClose
          className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all"
          onClick={() => removeItem(props?.item?._id)}
        />

        <h3 className="text-[15px] w-[80%]">
          <Link className="link "> {props?.item?.productTitle}</Link>
        </h3>
        <span className="text-[13px]">{props?.item?.brand}</span>
        <Rating
          name="size-small"
          value={props?.item?.rating}
          size="small"
          readOnly
        />

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
              {Array.from({ length: 10 }).map((_, index) => (
                <MenuItem onClick={() => handleCloseQty(index + 1)}>
                  {index + 1}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="price text-[14px] font-[600]">
            {" "}
            &#x20b9; {props?.item?.price}
          </span>
          <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
            &#x20b9;{props?.item?.oldPrice}
          </span>
          <span className="price text-red-500 text-[14px] font-[600]">
            {props?.item?.discount}% OFF
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
