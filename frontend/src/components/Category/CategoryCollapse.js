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
                  <Link to="/productListing" className="w-full">
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

{
  /* Home  & Kichen Appliance */
}
//   <li className="list-none flex items-center relative flex-col">
//   <Link to="/" className="w-full">
//     <Button className="w-full !text-left !justify-start !px-3  !text-black ">
//       Home & Kitchen
//     </Button>
//   </Link>
//   {subMenuIndex === 2 ? (
//     <FaRegMinusSquare
//       className="absolute top-[12px] right-[15px] cursor-pointer"
//       onClick={() => openSubMenu(2)}
//     />
//   ) : (
//     <FaRegPlusSquare
//       className="absolute top-[12px] right-[15px] cursor-pointer"
//       onClick={() => openSubMenu(2)}
//     />
//   )}

//   {subMenuIndex === 2 && (
//     <ul className="subMenu w-full pl-3">
//       <li className="list-none relative">
//         <Link to="/" className="w-full">
//           <Button className="w-full !text-left !justify-start !px-3 !text-black">
//             Geysers
//           </Button>
//         </Link>
//         {/* {innerSubMenuIndex === 2 ? (
//           <FaRegMinusSquare
//             className="absolute top-[10px] right-[15px] cursor-pointer"
//             onClick={() => openInnerSubMenu(1)}
//           />
//         ) : (
//           <FaRegPlusSquare
//             className="absolute top-[10px] right-[15px] cursor-pointer"
//             onClick={() => openInnerSubMenu(1)}
//           />
//         )} */}
//       </li>
//     </ul>
//   )}

//   {subMenuIndex === 2 && (
//     <ul className="subMenu w-full pl-3">
//       <li className="list-none relative">
//         <Link to="/" className="w-full">
//           <Button className="w-full !text-left !justify-start !px-3 !text-black">
//             Iron
//           </Button>
//         </Link>
//         {/* {innerSubMenuIndex === 2 ? (
//           <FaRegMinusSquare
//             className="absolute top-[10px] right-[15px] cursor-pointer"
//             onClick={() => openInnerSubMenu(1)}
//           />
//         ) : (
//           <FaRegPlusSquare
//             className="absolute top-[10px] right-[15px] cursor-pointer"
//             onClick={() => openInnerSubMenu(1)}
//           />
//         )} */}
//       </li>
//     </ul>
//   )}

//   {subMenuIndex === 2 && (
//     <ul className="subMenu w-full pl-3">
//       <li className="list-none relative">
//         <Link to="/" className="w-full">
//           <Button className="w-full !text-left !justify-start !px-3 !text-black">
//             Mixer grinders
//           </Button>
//         </Link>
//         {/* {innerSubMenuIndex === 2 ? (
//           <FaRegMinusSquare
//             className="absolute top-[10px] right-[15px] cursor-pointer"
//             onClick={() => openInnerSubMenu(1)}
//           />
//         ) : (
//           <FaRegPlusSquare
//             className="absolute top-[10px] right-[15px] cursor-pointer"
//             onClick={() => openInnerSubMenu(1)}
//           />
//         )} */}
//       </li>
//     </ul>
//   )}

//   {subMenuIndex === 2 && (
//     <ul className="subMenu w-full pl-3">
//       <li className="list-none relative">
//         <Link to="/" className="w-full">
//           <Button className="w-full !text-left !justify-start !px-3 !text-black">
//             Fans
//           </Button>
//         </Link>
//         {/* {innerSubMenuIndex === 2 ? (
//           <FaRegMinusSquare
//             className="absolute top-[10px] right-[15px] cursor-pointer"
//             onClick={() => openInnerSubMenu(1)}
//           />
//         ) : (
//           <FaRegPlusSquare
//             className="absolute top-[10px] right-[15px] cursor-pointer"
//             onClick={() => openInnerSubMenu(1)}
//           />
//         )} */}
//       </li>
//     </ul>
//   )}

//   {subMenuIndex === 2 && (
//     <ul className="subMenu w-full pl-3">
//       <li className="list-none relative">
//         <Link to="/" className="w-full">
//           <Button className="w-full !text-left !justify-start !px-3 !text-black">
//             Water purifiers
//           </Button>
//         </Link>
//         {/* {innerSubMenuIndex === 2 ? (
//           <FaRegMinusSquare
//             className="absolute top-[10px] right-[15px] cursor-pointer"
//             onClick={() => openInnerSubMenu(1)}
//           />
//         ) : (
//           <FaRegPlusSquare
//             className="absolute top-[10px] right-[15px] cursor-pointer"
//             onClick={() => openInnerSubMenu(1)}
//           />
//         )} */}
//       </li>
//     </ul>
//   )}

//   {subMenuIndex === 2 && (
//     <ul className="subMenu w-full pl-3">
//       <li className="list-none relative">
//         <Link to="/" className="w-full">
//           <Button className="w-full !text-left !justify-start !px-3 !text-black">
//             Microwave Ovens
//           </Button>
//         </Link>
//         {/* {innerSubMenuIndex === 2 ? (
//           <FaRegMinusSquare
//             className="absolute top-[10px] right-[15px] cursor-pointer"
//             onClick={() => openInnerSubMenu(1)}
//           />
//         ) : (
//           <FaRegPlusSquare
//             className="absolute top-[10px] right-[15px] cursor-pointer"
//             onClick={() => openInnerSubMenu(1)}
//           />
//         )} */}
//       </li>
//     </ul>
//   )}
//   {subMenuIndex === 2 && (
//     <ul className="subMenu w-full pl-3">
//       <li className="list-none relative">
//         <Link to="/" className="w-full">
//           <Button className="w-full !text-left !justify-start !px-3 !text-black">
//             Sandwich Makers & toasters
//           </Button>
//         </Link>
//         {/* {innerSubMenuIndex === 2 ? (
//           <FaRegMinusSquare
//             className="absolute top-[10px] right-[15px] cursor-pointer"
//             onClick={() => openInnerSubMenu(1)}
//           />
//         ) : (
//           <FaRegPlusSquare
//             className="absolute top-[10px] right-[15px] cursor-pointer"
//             onClick={() => openInnerSubMenu(1)}
//           />
//         )} */}
//       </li>
//     </ul>
//   )}
// </li>
