import React, { useContext, useEffect, useState } from "react";
import "../HomeSlider/style.css";
import { Link } from "react-router-dom";

import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import { FaRegHeart } from "react-icons/fa6";
import { IoIosGitCompare } from "react-icons/io";
import { MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";

import { MyContext } from "../../App";
import { addData, deleteData, editData, fetchDataFromApi } from "../../api";
import { FaHeart, FaMinus } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import { FiPlus } from "react-icons/fi";

const ProductItemListView = (props) => {
  const context = useContext(MyContext);

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isAddedMyList, setIsAddedMyList] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const myListItem = context?.cartData?.filter((item) =>
      item.productId.includes(props?.item?._id)
    );

    if (myListItem?.length !== 0) {
      setCartItem(item);
      setIsAddedMyList(true);
    } else {
      setIsAddedMyList(false);
    }
  }, [context?.cartData]);

  const addToCart = (product, userId, quantity) => {
    if (userId === undefined) {
      context.openAlertBox("error", "You are not login, Please Login first ");
      return false;
    }

    const data = {
      productTitle: product?.name,
      brand: product?.brand,
      image: product?.images[0],
      rating: product?.rating,
      price: product?.price,
      oldPrice: product?.oldPrice,
      quantity: quantity,
      subTotal: parseInt(product?.price * quantity),
      productId: product?._id,
      countInStock: product?.countInStock,
      discount: product?.discount,
      weight: product?.productWeight,
      userId: userId,
    };

    addData(
      `/api/cart/add?token=${localStorage.getItem("accesstoken")}`,
      data
    ).then((res) => {
      context.openAlertBox("success", "Item added successfully!");

      getCartItem();
    });
  };

  const getCartItem = () => {
    fetchDataFromApi(
      `/api/cart/get?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      context.setCartData(res?.data);
    });
  };

  const handleAddToMyList = (item) => {
    console.log(context?.userData);
    if (context?.userData?._id === undefined) {
      context.openAlertBox("error", "Your are not login please login first!");
      return false;
    } else {
      const obj = {
        productId: item?._id,
        userId: context?.userData?._id,
        productTitle: item?.name,
        image: item?.images[0],
        rating: item?.rating,
        price: item?.price,
        oldPrice: item?.oldPrice,
        brand: item?.brand,
        discount: item?.discount,
      };

      addData(
        `/api/myList/add?token=${localStorage.getItem("accesstoken")}`,
        obj
      ).then((res) => {
        context.openAlertBox("success", "The product saved in my list ");
        setIsAddedMyList(true);
        context?.getMyListData();
      });
    }
  };
  return (
    <div className="productItemListView  shadow-md rounded-sm overflow-hidden border border-1  border-[rgba(0,0,0,0.1)] py-5 flex items-center">
      <div className=" group imgWrapper w-[25%] h-[220px] overflow-hidden rounded-md relative">
        <Link to="/">
          <div className="img h-[230px] overflow-hidden">
            <img
              src={props?.item?.images[0]}
              alt="Air Conditioner"
              className="w-full "
            />
            <img
              src={props?.item?.images[1]}
              alt="Air Conditioner"
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
          <Button
            className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-white text-black  hover:!bg-primary hover:text-white group `}
            onClick={() => handleAddToMyList(props?.item)}
          >
            {isAddedMyList === true ? (
              <FaHeart className="text-[18px] !text-primary group-hover:text-white hover:!text-white" />
            ) : (
              <FaRegHeart className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
            )}
          </Button>
        </div>
      </div>
      <div className="info p-3 px-8 py-5 w-[75%] ">
        <h6 className="text-[15px] !font-[400] ">
          <span to={`/product/${props?.item?._id}`}>{props?.item?.brand}</span>
        </h6>
        <h3 className="text-[18px] title mt-2 font-[500] mb-3 text-[#000]">
          <Link to={`/product/${props?.item?._id}`}>
            {props?.item?.name?.substr(0, 30) + "..."}
          </Link>
        </h3>
        <p className="text[14px] mb-3">{props?.item?.description}</p>
        <Rating name="size-small" defaultValue={4} size="small" readOnly />
        <div className="flex items-center gap-4">
          <span className="price text-red-500 text-[15px] font-[600]">
            &#x20b9; {props?.item?.price}
          </span>
          <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
            &#x20b9; {props?.item?.oldPrice}
          </span>
        </div>
        <div className="mt-3">
          <Button
            className="btn-org btn-border flex w-[180px] btn-sm gap-2"
            size="small"
            onClick={() =>
              addToCart(props?.item, context?.userData?._id, quantity)
            }
          >
            <MdOutlineShoppingCart className="text-[18px]" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItemListView;
