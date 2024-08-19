import React, { ReactElement, ReactNode } from "react";

type TableHeaderProps = {
  children: ReactNode;
  width: string;
  className?: string;
  onClick?: () => void;
};

const TableHeader: React.FC<TableHeaderProps> = ({ children, width, className, onClick }) => {
  return (
    <th
      className={`px-4 text-sm font-normal text-text-secondary tracking-widest text-nowrap flex-none ${className}`}
      style={{ flexBasis: width }}
      onClick={onClick}
    >
      {children}
    </th>
  );
};

export default TableHeader;
