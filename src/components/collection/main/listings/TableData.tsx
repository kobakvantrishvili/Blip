import React, { ReactNode } from "react";

type TableDataProps = {
  children: ReactNode;
  width: string;
  className?: string;
  onClick?: () => void;
};

const TableData: React.FC<TableDataProps> = ({ children, width, className, onClick }) => {
  return (
    <td
      className={`px-4 text-sm font-normal text-text-primary tracking-widest text-nowrap flex-none text-center ${className}`}
      style={{ flexBasis: width }}
      onClick={onClick}
    >
      {children}
    </td>
  );
};

export default TableData;
