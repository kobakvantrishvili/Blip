import React, { useEffect, useState } from "react";

interface RangeProps {
  min: number;
  max: number;
  category: string;
  onChange: (category: string, from: number, to: number, isSet: boolean) => void;
  currentRange: [number | undefined, number | undefined];
}

const Range: React.FC<RangeProps> = ({ min, max, category, onChange, currentRange }) => {
  const [value, setValue] = useState<[number, number]>([min, max]);

  useEffect(() => {
    if (currentRange[0] !== undefined && currentRange[1] !== undefined) {
      setValue([currentRange[0], currentRange[1]]);
    } else {
      setValue([min, max]);
    }
  }, [currentRange]);

  const handleInputChange = (index: number, newValue: number) => {
    const updatedValue: [number, number] = [...value];
    updatedValue[index] = newValue;
    setValue(updatedValue);

    const isSet = updatedValue[0] !== min || updatedValue[1] !== max;
    onChange(category, updatedValue[0], updatedValue[1], isSet);
  };

  return (
    <div className="p-3">
      <div className="flex flex-row items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => handleInputChange(0, parseInt(e.target.value))}
          className="w-20 py-[2px] px-2 border-2 border-dark-border rounded focus:outline-none focus:border-primary-accent text-text-secondary"
        />
        <span>-</span>
        <input
          type="number"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => handleInputChange(1, parseInt(e.target.value))}
          className="w-20 py-[2px] px-2 border-2 border-dark-border rounded focus:outline-none focus:border-primary-accent text-text-secondary"
        />
      </div>
    </div>
  );
};

export default Range;
