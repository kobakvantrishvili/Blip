import React, { useRef, useState } from "react";

import { CollectionTraits } from "@/services/models/types";
import Status from "@/components/collection/main/parameters/Status";
import PriceBar from "@/components/collection/main/parameters/PriceBar";
import Traits from "@/components/collection/main/parameters/Traits";
import useComponentHeight from "@/hooks/useComponentHeight";

type MainProps = {
  collectionSlug: string;
  collectionTraits: CollectionTraits | null;
  error: string | null;
  isLoading: boolean;
};

const Main: React.FC<MainProps> = ({ collectionSlug, collectionTraits, error, isLoading }) => {
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const handlePriceBarClick = () => {
    setIsPriceOpen(!isPriceOpen);
  };

  return (
    <main className="flex justify-between flex-row flex-1 font-jockey h-[calc(100dvh-149px)]">
      {/* STATUS & TRAITS  */}
      <div className="max-w-[290px] 2xl:max-w-[320px] min-w-[250px] flex-1 border-r border-dark-border h-full">
        <div className="flex flex-col gap-4 px-3 py-6 border-b border-dark-border">
          <Status />
          <PriceBar isPriceOpen={isPriceOpen} handlePriceBarClick={handlePriceBarClick} />
        </div>
        <div className={`px-3 py-6 ${isPriceOpen ? "h-[calc(100%-277px)]" : "h-[calc(100%-193px)]"}`}>
          <Traits collectionTraits={collectionTraits} error={error} isLoading={isLoading} />
        </div>
      </div>
      {/* LISTINGS  */}
      <div className="flex-1 bg-orange-400">LISTINGS</div>
      {/* ACTIVITY  */}
      <div className="max-w-[390px] 2xl:max-w-[420px] min-w-[350px] flex-1 bg-yellow-400 flex-shrink">ACTIVITY</div>
    </main>
  );
};

export default Main;
