import React, { useContext } from "react";

import MyListItems from "./MyListItems";
import AccountSideBar from "../components/SideBar/AccountSideBar";
import { MyContext } from "../App";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const MyList = () => {
  const context = useContext(MyContext);
  return (
    <section className="py-10 w-full ">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSideBar />
        </div>
        <div className="col2 w-[70%]">
          <div className="shadow-md rounded-md bg-white">
            <div className="p-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2>My List</h2>
              <p>
                There are{" "}
                <span className="font-bold text-primary">
                  {}
                  {context?.myListData?.length}
                </span>{" "}
                products in your My List
              </p>
            </div>
            {context?.myListData?.length !== 0 ? (
              context?.myListData?.map((item, index) => {
                return <MyListItems item={item} />;
              })
            ) : (
              <>
                <div className="flex items-center justify-center flex-col py-8 gap-6">
                  <img src="/emptyList.png" alt="" className="w-[160px]" />
                  <h3 className="text-[18px]">My List is currently empty</h3>
                  <Link to="/">
                    <Button className="btn-org btn-lg ">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyList;
