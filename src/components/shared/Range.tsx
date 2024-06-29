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
  const [inputValue, setInputValue] = useState<[string, string]>([min.toString(), max.toString()]);

  useEffect(() => {
    if (currentRange[0] !== undefined && currentRange[1] !== undefined) {
      setValue([currentRange[0], currentRange[1]]);
      setInputValue([currentRange[0].toString(), currentRange[1].toString()]);
    } else {
      setValue([min, max]);
      setInputValue([min.toString(), max.toString()]);
    }
  }, [currentRange]);

  const handleInputChange = (index: number, newValue: string) => {
    const updatedInputValue: [string, string] = [...inputValue];
    updatedInputValue[index] = newValue;
    setInputValue(updatedInputValue);
  };

  const handleInputBlur = (index: number) => {
    const newValue = parseInt(inputValue[index]);
    if (isNaN(newValue)) {
      setInputValue([value[0].toString(), value[1].toString()]);
      return;
    }

    const clampedValue = Math.max(min, Math.min(max, newValue)); // make sure value is in range
    const updatedValue: [number, number] = [...value];
    updatedValue[index] = clampedValue;
    setValue(updatedValue);

    const isMinSet = updatedValue[0] !== min;
    const isMaxSet = updatedValue[1] !== max;
    const isSet = isMinSet || isMaxSet;
    onChange(category, updatedValue[0], updatedValue[1], isSet);

    setInputValue([updatedValue[0].toString(), updatedValue[1].toString()]);
  };

  return (
    <div className="p-3">
      <div className="flex flex-row items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          value={inputValue[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
          onBlur={() => handleInputBlur(0)}
          className="w-20 py-[2px] px-2 border-2 border-dark-border rounded focus:outline-none focus:border-primary-accent text-text-secondary"
        />
        <span>-</span>
        <input
          type="number"
          min={min}
          max={max}
          value={inputValue[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
          onBlur={() => handleInputBlur(1)}
          className="w-20 py-[2px] px-2 border-2 border-dark-border rounded focus:outline-none focus:border-primary-accent text-text-secondary"
        />
      </div>
    </div>
  );
};

export default Range;
