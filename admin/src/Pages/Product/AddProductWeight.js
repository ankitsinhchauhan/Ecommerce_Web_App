import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import { GoTrash } from "react-icons/go";
import CircularProgress from "@mui/material/CircularProgress";
import { MyContext } from "../../App";
import { addData, deleteData, editData, fetchDataFromApi } from "../../Apis";

const AddProductWeight = () => {
  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState("");

  const context = useContext(MyContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetchDataFromApi(
      `/api/product/productWeight/get?token=${localStorage.getItem(
        "accesstoken"
      )}`
    ).then((res) => {
      if (res?.error === false) {
        setData(res?.data);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (name === "") {
      context.openAlertBox("error", "Please enter product Weight");
      return false;
    }

    if (editId === "") {
      addData(
        `/api/product/productWeight/create?token=${localStorage.getItem(
          "accesstoken"
        )}`,
        {
          name: name,
        }
      ).then((res) => {
        context.openAlertBox("success", "Product Weight Created!");
        setTimeout(() => {
          setIsLoading(false);
          getData();
          setName("");
        }, [300]);
      });
    }

    if (editId !== "") {
      editData(
        `/api/product/productWeight/${editId}?token=${localStorage.getItem(
          "accesstoken"
        )}`,
        {
          name: name,
        }
      ).then((res) => {
        context.openAlertBox("success", "Product Weight updated!");
        setTimeout(() => {
          setIsLoading(false);
          getData();
          setName("");
        }, [300]);
      });
    }
  };

  const deleteItem = (id) => {
    deleteData(
      `/api/product/productWeight/${id}?token=${localStorage.getItem(
        "accesstoken"
      )}`
    ).then((res) => {
      getData();
      context.openAlertBox("success", "Item deleted!");
    });
  };

  const editItem = (id) => {
    fetchDataFromApi(
      `/api/product/productWeight/${id}?token=${localStorage.getItem(
        "accesstoken"
      )}`
    ).then((res) => {
      console.log(res);
      setName(res?.data?.name);
      setEditId(res?.data?._id);
    });
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[20px] font-[600]">Add Products Weight</h2>
      </div>

      <div className="card my-4 pt-5 pb-5 shadow-md md:rounded-lg bg-white w-[65%]">
        <form className="form py-3 p-6 " onSubmit={handleSubmit}>
          <div className="col mb-4">
            <h3 className="text-[16px] font-[500] mb-1 text-black">
              Product Weight
            </h3>
            <input
              type="text"
              className="w-full h-[40px] p-3 textsm border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.5)] rounded-sm "
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px] text-white" />
                Publish and View
              </>
            )}
          </Button>
        </form>
      </div>

      {/* create Table */}

      {data?.length !== 0 && (
        <div className="card my-4 pt-5 pb-5 shadow-md md:rounded-lg bg-white w-[65%]">
          <div className="relative overflow-x-auto mt-5 pb-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 whitespace-nowrap w-[60%]"
                  >
                    PRODUCT WEIGHT
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 whitespace-nowrap w-[30%]"
                  >
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  return (
                    <tr
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      key={index}
                    >
                      <td className="px-6 py-2">
                        <span className="font-[600]">{item?.name}</span>
                      </td>

                      <td className="px-2 py-2 ">
                        <div className="flex items-center gap-4">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]"
                            onClick={() => editItem(item?._id)}
                          >
                            <RiEdit2Line className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                          </Button>

                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]"
                            onClick={() => deleteItem(item?._id)}
                          >
                            <GoTrash className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductWeight;
