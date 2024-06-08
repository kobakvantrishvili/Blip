import React from "react";
import { IconType } from "react-icons";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, className = "", onClick }) => {
  return (
    <button className={`${className}`} onClick={onClick} disabled={className?.includes("disabled-class")}>
      {children}
    </button>
  );
};

export default Button;
