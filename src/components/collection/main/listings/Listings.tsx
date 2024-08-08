import React, { useState } from "react";
import SearchBar from "@/components/shared/SearchBar";
import { FiLayers } from "react-icons/fi";
import { PiGavel } from "react-icons/pi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import Tab from "@/components/collection/main/listings/Tab";
import TableHeader from "@/components/collection/main/listings/tableHeader";

const Listings: React.FC = () => {
  const [selected, setSelected] = useState("items");

  const handleTabSelection = (tab: string) => {
    setSelected(tab);
  };

  return (
    <div className="h-full w-full px-6 py-6">
      <div className="flex flex-col">
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
        <div className="relative flex w-full">
          <div className="block w-full overflow-x-auto">
            <table className="w-full flex flex-col gap-2">
              <thead>
                <tr className="flex justify-start py-2">
                  <TableHeader text="X LISTED" width="24%" className="text-start" />
                  <TableHeader text="RARITY" width="10%" />
                  <TableHeader text="BUY NOW" width="14%" />
                  <TableHeader text="LAST SALE" width="10%" />
                  <TableHeader text="TOP BID" width="10%" />
                  <TableHeader text="OWNER" width="10%" />
                  <TableHeader text="#HELD" width="10%" />
                  <TableHeader text="TIME" width="12%" />
                </tr>
              </thead>
              <tbody>
                <tr className="flex justify-start py-1">
                  <TableHeader text="X LISTED" width="24%" className="text-start" />
                  <TableHeader text="RARITY" width="10%" />
                  <TableHeader text="BUY NOW" width="14%" />
                  <TableHeader text="LAST SALE" width="10%" />
                  <TableHeader text="TOP BID" width="10%" />
                  <TableHeader text="OWNER" width="10%" />
                  <TableHeader text="#HELD" width="10%" />
                  <TableHeader text="TIME" width="12%" />
                </tr>
                <tr className="flex justify-start py-1">
                  <TableHeader text="X LISTED" width="24%" className="text-start" />
                  <TableHeader text="RARITY" width="10%" />
                  <TableHeader text="BUY NOW" width="14%" />
                  <TableHeader text="LAST SALE" width="10%" />
                  <TableHeader text="TOP BID" width="10%" />
                  <TableHeader text="OWNER" width="10%" />
                  <TableHeader text="#HELD" width="10%" />
                  <TableHeader text="TIME" width="12%" />
                </tr>
              </tbody>
            </table>
          </div>
          <div className="absolute inset-x-0 top-[40px] h-[1px] bg-dark-border" />
        </div>
      </div>
    </div>
  );
};

export default Listings;
