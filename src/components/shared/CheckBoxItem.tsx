import React from "react";

interface CheckboxItemProps {
  type: string;
  count: number;
  category: string;
  onChange: (category: string, type: string, checked: boolean) => void;
  isChecked: boolean;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ type, count, category, onChange, isChecked }) => {
  const handleCheckboxChange = () => {
    onChange(category, type, !isChecked);
  };

  return (
    <div
      className={`flex justify-between p-3 border-text-tertiary hover:bg-dark-hover`}
      style={{ userSelect: "none" }}
      onClick={handleCheckboxChange}
    >
      <div className="flex flex-row items-center gap-2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => {}}
          className="h-[15px] w-[15px] appearance-none rounded-sm border border-text-tertiary checked:bg-primary-accent focus:outline-none"
        />
        <span className="text-sm">{type}</span>
      </div>
      <span className="text-sm">{count}</span>
    </div>
  );
};

export default CheckboxItem;
