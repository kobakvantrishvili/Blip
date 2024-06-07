import React from "react";
import { IconType } from "react-icons";

type DropdownMenuItemProps = {
  children: React.ReactNode;
  icon?: IconType;
  onClick?: () => void;
  className?: string;
};

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ children, icon: Icon, className = "", onClick }) => {
  return (
    <button
      className={`w-full px-4 py-2 text-left text-text-secondary hover:bg-dark-hover flex items-center gap-2 ${className}`}
      onClick={onClick}
      disabled={className?.includes("disabled-class")}
    >
      {Icon && <Icon className={`text-text-tertiary text-2xl`} />}
      {children}
    </button>
  );
};

export default DropdownMenuItem;
