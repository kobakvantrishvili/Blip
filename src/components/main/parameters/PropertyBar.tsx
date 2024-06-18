import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type PropertyBarProps = {
  name: string;
  onClick?: () => void;
  isOpen: boolean;
};

const PropertyBar: React.FC<PropertyBarProps> = ({ name, onClick, isOpen }) => {
  return (
    <div onClick={onClick} className="flex justify-between items-center cursor-pointer p-3 hover:bg-dark-hover" style={{ userSelect: "none" }}>
      <span className="text-sm tracking-widest">{name}</span>
      <IoIosArrowDown className={`text-xl transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </div>
  );
};

export default PropertyBar;
