import React, { useContext, useEffect, useState } from "react";
import "../HomeSlider/style.css";
import { Link } from "react-router-dom";

import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { IoIosGitCompare } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import { MyContext } from "../../App";
import { deleteData, editData } from "../../api";

const ProductItem = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);

  const addToCart = (product, userId, quantity) => {
    setIsLoading(true);
    context?.addToCart(product, userId, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    const item = context?.cartData?.filter((cartItem) =>
      cartItem.productId.includes(props?.item?._id)
    );

    if (item?.length !== 0) {
      setCartItem(item);
      setIsAdded(true);
      setQuantity(item[0]?.quantity);
    } else {
      setQuantity(1);
    }
  }, [context?.cartData]);

  const minusQty = () => {
    if (quantity !== 0 && quantity > 0) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }

    if (quantity === 1) {
      deleteData(
        `/api/cart/deleteCartItem/${
          cartItem[0]?._id
        }?token=${localStorage.getItem("accesstoken")}`
      ).then((res) => {
        setIsAdded(false);
        context.openAlertBox("success", "Item remove");
        context?.getCartItem();
      });
    } else {
      const obj = {
        _id: cartItem[0]?._id,
        qty: quantity - 1,
        subTotal: props?.item?.price * (quantity - 1),
      };

      editData(
        `/api/cart/updateQty?token=${localStorage.getItem("accesstoken")}`,
        obj
      ).then((res) => {
        context.openAlertBox("success", "Upadate Cart");
      });
    }
  };

  const addQty = () => {
    setQuantity(quantity + 1);

    const obj = {
      _id: cartItem[0]?._id,
      qty: quantity + 1,
      subTotal: props?.item?.price * (quantity + 1),
    };

    editData(
      `/api/cart/updateQty?token=${localStorage.getItem("accesstoken")}`,
      obj
    ).then((res) => {
      context.openAlertBox("success", "Upadate Cart");
      context?.getCartItem();
    });
  };

  return (
    <div className="productItem h-[420px]  shadow-md rounded-sm overflow-hidden border border-1  border-[rgba(0,0,0,0.1)] py-5">
      <div className=" group imgWrapper w-[100%] h-[200px] overflow-hidden rounded-md relative">
        <Link to={`/product/${props?.item?._id}`}>
          <div className="img h-[200px] overflow-hidden">
            <img src={props?.item?.images[0]} alt="img" className="w-full " />
            <img
              src={props?.item?.images[1]}
              alt="hoverImg"
              className="w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Discount */}
        <sapn className="discoutn flex items-center absolute top-[5px] left-[10px] z-50 px-2 py-1 text-[12px] font-[500] bg-primary text-white rounded-lg">
          {props?.item?.discount}%
        </sapn>
        {/* Icons */}

        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-700 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
          <Button
            className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white text-black  hover:!bg-primary hover:text-white group"
            onClick={() =>
              context.handleOpenProductDetailModal(true, props?.item)
            }
          >
            <MdZoomOutMap className="text-[18px] !text-black group-hover:text-white hover:!text-white " />
          </Button>
          <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white text-black  hover:!bg-primary hover:text-white group">
            <FaRegHeart className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
          </Button>
          <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white text-black  hover:!bg-primary hover:text-white group">
            <IoIosGitCompare className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
          </Button>
        </div>
      </div>
      <div className="info p-3  py-5 relative bp-[50px] h-[190px]">
        <h6 className="text-[13px]  !font-[400]">
          <span to={`/product/${props?.item?._id}`}>{props?.item?.brand}</span>
        </h6>
        <h3 className="text-[14px] link transition-all title mt-1.5 mb-1.5 font-[500] text-[#000]">
          <Link to={`/product/${props?.item?._id}`}>
            {props?.item?.name?.substr(0, 30) + "..."}
          </Link>
        </h3>
        {/* <p>1 Year Standard Warranty on this Product, 10 Year warranty on the compressor</p> */}
        <Rating name="size-small" defaultValue={4} size="small" readOnly />
        <div className="flex items-center gap-4">
          <span className="price text-red-500 text-[15px] font-[600]">
            &#x20b9; {props?.item?.price}
          </span>
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
            &#x20b9; {props?.item?.oldPrice}
          </span>
        </div>

        {/* Add to cart */}
        <div className=" !absolute bottom-[5px] left-0 pl-3 pr-3 w-full">
          {isAdded === false ? (
            <Button
              className="btn-org btn-border flex w-full btn-sm gap-2"
              size="small"
              onClick={() =>
                addToCart(props?.item, context?.userData?._id, quantity)
              }
            >
              <MdOutlineShoppingCart className="text-[18px]" /> Add to Cart
            </Button>
          ) : (
            <>
              {isLoading === true ? (
                <Button
                  className="btn-org btn-border flex w-full btn-sm gap-2"
                  size="small"
                >
                  <CircularProgress />
                </Button>
              ) : (
                <div className="flex items-center justify-between overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)]">
                  <Button
                    className="!min-w-[35px] !w-[35px] !h-[30px] !bg-[#f1f1f1] !rounded-none"
                    onClick={minusQty}
                  >
                    <FaMinus className="text-[rgba(0,0,0,0.7)]" />
                  </Button>
                  <span>{quantity}</span>
                  <Button
                    className="!min-w-[35px] !w-[35px] !h-[30px] !bg-primary !rounded-none"
                    onClick={addQty}
                  >
                    <FiPlus className="text-white" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
