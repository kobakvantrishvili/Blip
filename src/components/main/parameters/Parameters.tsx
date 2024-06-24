import React, { useState } from "react";
import Status from "@/components/main/parameters/Status";
import PropertyBar from "@/components/main/parameters/PropertyBar";
import PriceRangeInput from "@/components/main/parameters/PriceRangeInput";
import Traits from "@/components/main/parameters/Traits";

const Parameters: React.FC = () => {
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const handlePriceBarClick = () => {
    setIsPriceOpen(!isPriceOpen);
  };

  return (
    <div className="max-w-[290px] 2xl:max-w-[320px] min-w-[250px] flex-1 border-r border-dark-border h-full">
      <div className="flex flex-col gap-4 px-3 py-6 border-b border-dark-border">
        <Status />
        <div className="flex flex-col gap-2">
          <PropertyBar name="PRICE" onClick={handlePriceBarClick} isOpen={isPriceOpen} />
          {isPriceOpen && <PriceRangeInput />}
        </div>
      </div>
      <div className={`px-3 py-6 ${isPriceOpen ? "h-[calc(100%-277px)]" : "h-[calc(100%-193px)]"}`}>
        <Traits />
      </div>
    </div>
  );
};

export default Parameters;
