import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegMinusSquare } from "react-icons/fa";

const CategoryCollapse = () => {
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
          <li className="list-none flex items-center relative flex-col">
            <Link to="/" className="w-full">
              <Button className="w-full !text-left !justify-start !px-3  !text-black ">
                Appliances
              </Button>
            </Link>
            {subMenuIndex === 0 ? (
              <FaRegMinusSquare
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubMenu(0)}
              />
            ) : (
              <FaRegPlusSquare
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => openSubMenu(0)}
              />
            )}
            {/* Air Conditioner */}
            {subMenuIndex === 0 && (
              <ul className="subMenu  w-full pl-3">
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-black">
                      Air Conditioner
                    </Button>
                  </Link>
                  {innerSubMenuIndex === 0 ? (
                    <FaRegMinusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(0)}
                    />
                  ) : (
                    <FaRegPlusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(0)}
                    />
                  )}
                  {innerSubMenuIndex === 0 && (
                    <ul className="inner_submenu w-full pl-3">
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start !px-3 transition text-[14px] "
                        >
                          Split AC
                        </Link>
                      </li>
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start !px-3 transition text-[14px] "
                        >
                          Window AC
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                {/* Refrigerators */}
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-black">
                      Refrigerators
                    </Button>
                  </Link>
                  {innerSubMenuIndex === 1 ? (
                    <FaRegMinusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  ) : (
                    <FaRegPlusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  )}
                  {innerSubMenuIndex === 1 && (
                    <ul className="inner_submenu w-full pl-3">
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start !px-3 transition text-[14px] "
                        >
                          Single Door
                        </Link>
                      </li>
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start !px-3 transition text-[14px] "
                        >
                          Double Door
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                {/* Washing Machine */}
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-black">
                      Washing Machine
                    </Button>
                  </Link>
                  {innerSubMenuIndex === 2 ? (
                    <FaRegMinusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(2)}
                    />
                  ) : (
                    <FaRegPlusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(2)}
                    />
                  )}
                  {innerSubMenuIndex === 2 && (
                    <ul className="inner_submenu w-full pl-3">
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start !px-3 transition text-[14px] "
                        >
                          Single Door
                        </Link>
                      </li>
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start !px-3 transition text-[14px] "
                        >
                          Double Door
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                {/* Dishwashers */}
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-black">
                      Dishwashers
                    </Button>
                  </Link>
                  {innerSubMenuIndex === 3 ? (
                    <FaRegMinusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(3)}
                    />
                  ) : (
                    <FaRegPlusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(3)}
                    />
                  )}
                  {innerSubMenuIndex === 3 && (
                    <ul className="inner_submenu w-full pl-3">
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start !px-3 transition text-[14px] "
                        >
                          Single Door
                        </Link>
                      </li>
                      <li className="list-none relative mb-1">
                        <Link
                          to="/"
                          className="link w-full !text-left !justify-start !px-3 transition text-[14px] "
                        >
                          Double Door
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          {/* Home  & Kichen Appliance */}
          <li className="list-none flex items-center relative flex-col">
            <Link to="/" className="w-full">
              <Button className="w-full !text-left !justify-start !px-3  !text-black ">
                Home & Kitchen
              </Button>
            </Link>
            {subMenuIndex === 2 ? (
              <FaRegMinusSquare
                className="absolute top-[12px] right-[15px] cursor-pointer"
                onClick={() => openSubMenu(2)}
              />
            ) : (
              <FaRegPlusSquare
                className="absolute top-[12px] right-[15px] cursor-pointer"
                onClick={() => openSubMenu(2)}
              />
            )}

            {subMenuIndex === 2 && (
              <ul className="subMenu w-full pl-3">
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-black">
                      Geysers
                    </Button>
                  </Link>
                  {/* {innerSubMenuIndex === 2 ? (
                    <FaRegMinusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  ) : (
                    <FaRegPlusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  )} */}
                </li>
              </ul>
            )}

            {subMenuIndex === 2 && (
              <ul className="subMenu w-full pl-3">
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-black">
                      Iron
                    </Button>
                  </Link>
                  {/* {innerSubMenuIndex === 2 ? (
                    <FaRegMinusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  ) : (
                    <FaRegPlusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  )} */}
                </li>
              </ul>
            )}

            {subMenuIndex === 2 && (
              <ul className="subMenu w-full pl-3">
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-black">
                      Mixer grinders
                    </Button>
                  </Link>
                  {/* {innerSubMenuIndex === 2 ? (
                    <FaRegMinusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  ) : (
                    <FaRegPlusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  )} */}
                </li>
              </ul>
            )}

            {subMenuIndex === 2 && (
              <ul className="subMenu w-full pl-3">
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-black">
                      Fans
                    </Button>
                  </Link>
                  {/* {innerSubMenuIndex === 2 ? (
                    <FaRegMinusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  ) : (
                    <FaRegPlusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  )} */}
                </li>
              </ul>
            )}

            {subMenuIndex === 2 && (
              <ul className="subMenu w-full pl-3">
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-black">
                      Water purifiers
                    </Button>
                  </Link>
                  {/* {innerSubMenuIndex === 2 ? (
                    <FaRegMinusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  ) : (
                    <FaRegPlusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  )} */}
                </li>
              </ul>
            )}

            {subMenuIndex === 2 && (
              <ul className="subMenu w-full pl-3">
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-black">
                      Microwave Ovens
                    </Button>
                  </Link>
                  {/* {innerSubMenuIndex === 2 ? (
                    <FaRegMinusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  ) : (
                    <FaRegPlusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  )} */}
                </li>
              </ul>
            )}
            {subMenuIndex === 2 && (
              <ul className="subMenu w-full pl-3">
                <li className="list-none relative">
                  <Link to="/" className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-black">
                      Sandwich Makers & toasters
                    </Button>
                  </Link>
                  {/* {innerSubMenuIndex === 2 ? (
                    <FaRegMinusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  ) : (
                    <FaRegPlusSquare
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openInnerSubMenu(1)}
                    />
                  )} */}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default CategoryCollapse;
