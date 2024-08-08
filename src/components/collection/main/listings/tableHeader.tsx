import React from "react";

type TableHeaderProps = {
  text: string;
  width: string;
  className?: string;
  onClick?: () => void;
};

const TableHeader: React.FC<TableHeaderProps> = ({ text, width, className, onClick }) => {
  return (
    <th
      className={`px-4 text-sm font-normal text-text-secondary tracking-wider text-nowrap flex-none ${className}`}
      style={{ flexBasis: width }}
      onClick={onClick}
    >
      {text}
    </th>
  );
};

export default TableHeader;
