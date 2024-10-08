import React, { useRef, useState } from "react";
import Status from "@/components/collection/main/leftPanel/Status";
import PriceBar from "@/components/collection/main/leftPanel/PriceBar";
import Traits from "@/components/collection/main/leftPanel/Traits";
import { CollectionTraits } from "@/services/models/types";
import useComponentHeight from "@/hooks/useComponentHeight";

type LeftPanelProps = {
  collectionTraits: CollectionTraits | null;
  error: string | null;
  isLoading: boolean;
};

const LeftPanel: React.FC<LeftPanelProps> = ({ collectionTraits, error, isLoading }) => {
  const pricePanelRef = useRef<HTMLDivElement>(null);
  const pricePanelHeight = useComponentHeight(pricePanelRef);

  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const handlePriceBarClick = () => {
    setIsPriceOpen(!isPriceOpen);
  };

  return (
    <div className="min-w-[250px] w-1/6 border-r border-dark-border h-full overflow-y-auto scrollbar-hide">
      <div ref={pricePanelRef} className="flex flex-col gap-4 px-3 py-6 border-b border-dark-border">
        <Status />
        <PriceBar isPriceOpen={isPriceOpen} handlePriceBarClick={handlePriceBarClick} />
      </div>
      <div className={`px-3 py-6 h-[calc(100%-${pricePanelHeight}px)]`}>
        <Traits collectionTraits={collectionTraits} error={error} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default LeftPanel;
