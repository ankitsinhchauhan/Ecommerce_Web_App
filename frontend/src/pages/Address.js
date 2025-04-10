import React, { useContext, useEffect, useState } from "react";
import AccountSideBar from "../components/SideBar/AccountSideBar";

import { MyContext } from "../App";

import { deleteData, fetchDataFromApi } from "../api";
import AddressBox from "./addressBox";

const Address = () => {
  const [address, setAddress] = useState([]);
  const context = useContext(MyContext);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setAddress(context?.userData?.address_details);
    }
  }, [context?.userData]);

  const removeAddress = (id) => {
    deleteData(
      `/api/address/${id}?token=${localStorage.getItem("accesstoken")}`
    ).then((res) => {
      fetchDataFromApi(
        `/api/address/get?userId=${
          context?.userData?._id
        }&token=${localStorage.getItem("accesstoken")}`
      ).then((res) => {
        setAddress(res.data);
        context?.getuserDetails();
      });
    });
  };

  return (
    <>
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

              <div
                className="flex items-center justify-center p-5 mt-4 rounded-md border border-dashed border-[rgba(0,0,0,0.3)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
                onClick={() => {
                  context?.setOpenAddressPanel(true);
                  context?.setAddressMode("add");
                }}
              >
                <span className="text-[14px] font-[500] ">Add Address</span>
              </div>

              {/* Address Box */}
              <div className="flex gap-3 flex-col mt-4">
                {address?.length > 0 &&
                  address?.map((address, index) => {
                    return (
                      <>
                        <AddressBox
                          address={address}
                          key={index}
                          removeAddress={removeAddress}
                        />
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Address;
