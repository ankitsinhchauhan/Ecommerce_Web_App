import React from "react";
import AccountSideBar from "../components/SideBar/AccountSideBar";


const Address = () => {
  return (
    <section className="py-10 w-full ">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSideBar />
        </div>
        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md mb-5">
            <div className="flex items-center pb-3">
              <h2 className="pb-0">Address</h2>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Address;
