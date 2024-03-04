import React, { useState } from "react";

interface SwitchProps {
  autoPlayOn: boolean;
  setAutoPlayOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Switcher1: React.FC<SwitchProps> = ({ autoPlayOn, setAutoPlayOn }) => {
  const handleCheckboxChange = () => {
    setAutoPlayOn((prev) => !prev);
  };

  return (
    <div className="">
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={autoPlayOn}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div className="block h-7 w-12 rounded-full  bg-[#E5E7EB]"></div>
          <div
            className={`absolute top-1 h-5 w-5 rounded-full ${autoPlayOn ? "right-1 bg-[#0d47a1]" : "left-1 bg-white"}   transition-all duration-1000`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default Switcher1;
