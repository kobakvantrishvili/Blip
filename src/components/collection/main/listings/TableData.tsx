import React from "react";

type TableDataProps = {
  text: string;
  width: string;
  className?: string;
  Icon?: React.ElementType;
  onClick?: () => void;
};

const TableData: React.FC<TableDataProps> = ({ text, width, className, Icon, onClick }) => {
  return (
    <td
      className={`px-4 text-sm font-normal text-text-primary tracking-widest text-nowrap flex-none text-center ${className}`}
      style={{ flexBasis: width }}
      onClick={onClick}
    >
      {text}
      {Icon && <Icon className="text-xl" />}
    </td>
  );
};

export default TableData;
