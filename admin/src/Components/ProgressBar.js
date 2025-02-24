import React from "react";

const ProgressBar = (props) => {
  return (
    <div className="w-[110px] h-auto overflow-hidden rounded-md bg-[#f1f1f1]">
      <sapn
        className={`flex items-center w-[${props.value}%] h-[8px]  ${
          props.type === "success" && "bg-green-600"
        } ${props.type === "error" && "bg-red-500"} ${
          props.type === "warning" && "bg-orange-400"
        }`}
      ></sapn>
    </div>
  );
};

export default ProgressBar;
