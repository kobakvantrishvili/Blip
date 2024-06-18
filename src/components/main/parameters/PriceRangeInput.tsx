import React from "react";
import { LiaEthereum } from "react-icons/lia";

const PriceRangeInput: React.FC = () => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Regex to allow only digits and one decimal point
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value)) {
      event.target.value = value;
    } else {
      event.target.value = value.slice(0, -1);
    }
  };

  return (
    <div className="px-3" style={{ userSelect: "none" }}>
      <div className="grid grid-cols-2 grid-rows-2 border border-text-tertiary rounded-md text-text-secondary">
        <div className="flex flex-row items-center justify-center bg-dark-hover border-r border-b border-text-tertiary p-2">
          <span className="text-sm tracking-widest">Min</span>
          <LiaEthereum className="text-text-secondary text-xl ml-1" />
        </div>
        <input
          type="text"
          className="px-2 py-1 text-sm bg-transparent focus:outline-none w-full h-full text-text-primary tracking-wider border-b border-text-tertiary"
          onChange={handleInputChange}
          placeholder="0"
        />
        <div className="flex flex-row items-center justify-center bg-dark-hover border-r border-text-tertiary p-2">
          <span className="text-sm tracking-widest">Max</span>
          <LiaEthereum className="text-text-secondary text-xl ml-1" />
        </div>
        <input
          type="text"
          className="px-2 py-1 text-sm bg-transparent focus:outline-none w-full h-full text-text-primary tracking-wider"
          onChange={handleInputChange}
          placeholder="1000"
        />
      </div>
    </div>
  );
};

export default PriceRangeInput;
