import React from "react";

import MyListItems from "./MyListItems";
import AccountSideBar from "../components/SideBar/AccountSideBar";

const MyList = () => {
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
                There are <span className="font-bold text-primary">2</span>{" "}
                products in your My List
              </p>
            </div>
            {/* My List Items */}
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
            <MyListItems />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyList;
