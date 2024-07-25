import React from "react";
import PropertyBar from "@/components/shared/PropertyBar";
import PriceRangeInput from "@/components/collection/main/leftPanel/PriceRangeInput";

type PriceBarProps = {
  isPriceOpen: boolean;
  handlePriceBarClick: () => void;
};

const PriceBar: React.FC<PriceBarProps> = ({ isPriceOpen, handlePriceBarClick }) => {
  return (
    <div className="flex flex-col gap-2">
      <PropertyBar name="PRICE" onClick={handlePriceBarClick} isOpen={isPriceOpen} />
      {isPriceOpen && <PriceRangeInput />}
    </div>
  );
};

export default PriceBar;
