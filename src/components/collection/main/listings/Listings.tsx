import React, { useState } from "react";
import SearchBar from "@/components/shared/SearchBar";
import { FiLayers } from "react-icons/fi";
import { PiGavel } from "react-icons/pi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import Tab from "@/components/collection/main/listings/Tab";

const Listings: React.FC = () => {
  const [selected, setSelected] = useState("items");

  const handleTabSelection = (tab: string) => {
    setSelected(tab);
  };

  return (
    <div className="flex flex-1 flex-col h-full w-full px-6 py-6">
      <div className="relative flex flex-row justify-between items-start">
        <div className="relative bottom-1 flex flex-row justify-start items-center gap-5">
          <Tab text="ITEMS" Icon={FiLayers} isSelected={selected === "items"} onClick={() => handleTabSelection("items")} />
          <Tab text="BIDS" Icon={PiGavel} isSelected={selected === "bids"} onClick={() => handleTabSelection("bids")} />
          <Tab text="HOLDERS" Icon={MdOutlinePeopleAlt} isSelected={selected === "holders"} onClick={() => handleTabSelection("holders")} />
        </div>
        <SearchBar
          barWidth="w-16"
          className="relative bottom-2 border rounded border-dark-border h-8 px-1"
          placeholder="Item ID"
          iconSize="text-xl"
        />
        <div className={`absolute inset-x-0 bottom-1 h-[1px] bg-dark-border`}></div>
      </div>
    </div>
  );
};

export default Listings;
