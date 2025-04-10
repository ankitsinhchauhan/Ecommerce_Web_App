import React, { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiDotsVertical } from "react-icons/hi";
import { MyContext } from "../App";

const AddressBox = (props) => {
  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const context = useContext(MyContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeAddress = (id) => {
    setAnchorEl(null);
    props.removeAddress(id);
  };

  const editAddress = (id) => {
    setAnchorEl(null);
    context?.setOpenAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
  };

  return (
    <div className="group relative border border-dashed border-[rgba(0,0,0,0.3)] addressBox w-full bg-[#fafafa] p-4 rounded-md cursor-pointer ">
      <span className="inline-block text-[12px] font-[500] p-1 bg-[#e7e7e7] rounded-sm">
        {" "}
        {props?.address?.addressType}
      </span>
      <h4 className="pt-2 flex items-center gap-4 text-[14px]">
        <span> {context?.userData?.name}</span>
        <span> +{props?.address?.mobile}</span>
      </h4>
      <span className="text-[13px] block pt-1 w-100">
        {props?.address?.address_line1 +
          " " +
          props?.address?.landmark +
          " " +
          props?.address?.city +
          " " +
          props?.address?.pincode +
          " " +
          props?.address?.state +
          " " +
          props?.address?.country}
      </span>

      <div className="absolute top-[20px]  right-[20px]">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <HiDotsVertical />
        </IconButton>

        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            },
          }}
        >
          <MenuItem onClick={() => editAddress(props?.address?._id)}>
            Edit
          </MenuItem>
          <MenuItem onClick={() => removeAddress(props?.address?._id)}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default AddressBox;
