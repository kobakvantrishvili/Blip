import React, { useState, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface DropDownMenuProps {
  className?: string;
  children?: React.ReactNode;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ className, children }) => {
  return (
    <div className={`absolute right-0 rounded shadow-lg border hidden group-hover:block ${className}`}>{children}</div>
  );
};

export default DropDownMenu;
