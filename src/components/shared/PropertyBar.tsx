import React from "react";
import { IoIosArrowDown } from "react-icons/io";

type PropertyBarProps = {
  name: string;
  isOpen: boolean;
  textColor?: string;
  onClick?: () => void;
};

const PropertyBar: React.FC<PropertyBarProps> = ({ name, textColor, isOpen, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center cursor-pointer p-3 ${isOpen ? "bg-dark-selected" : "hover:bg-dark-hover"}`}
      style={{ userSelect: "none" }}
    >
      <span className={`text-sm tracking-widest ${textColor}`}>{name}</span>
      <IoIosArrowDown className={`text-xl transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </div>
  );
};

export default PropertyBar;
