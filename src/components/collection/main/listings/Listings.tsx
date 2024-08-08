import React, { useState } from "react";
import SearchBar from "@/components/shared/SearchBar";
import { FiLayers } from "react-icons/fi";
import { PiGavel } from "react-icons/pi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import Tab from "@/components/collection/main/listings/Tab";
import TableHeader from "@/components/collection/main/listings/TableHeader";
import TableData from "@/components/collection/main/listings/TableData";
import { NftListing } from "@/services/models/types";
import { formatTimeAgo } from "@/utils/formatTimeAgo";

type ListingsProps = {
  collectionSlug: string;
  collectionListings: NftListing[] | null;
};

const Listings: React.FC<ListingsProps> = ({ collectionListings }) => {
  const [selected, setSelected] = useState("items");

  const handleTabSelection = (tab: string) => {
    setSelected(tab);
  };

  return (
    <div className="h-full w-full px-6 py-6">
      <div className="flex flex-col h-full">
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
        <div className="w-full h-[calc(100%-45px)]">
          <div className="relative flex w-full h-full">
            <div className="block w-full h-full overflow-y-auto overflow-x-auto">
              <table className="min-w-full table-fixed">
                <thead className="sticky top-0 bg-dark-bg">
                  <tr className="h-10">
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
                  {collectionListings?.map((listing) => (
                    <tr key={listing.order_hash}>
                      <TableData text={listing.offer[0].identifierOrCriteria} width="24%" className="text-start" />
                      <TableData text="RARITY" width="10%" />
                      <TableData text={`${listing.price.value.toFixed(4)} ${listing.price.currency}`} width="14%" />
                      <TableData text={`${listing.price.value.toFixed(4)} ${listing.price.currency}`} width="10%" />
                      <TableData text={`${listing.price.value.toFixed(4)} ${listing.price.currency}`} width="10%" />
                      <TableData text={`${listing.offerer.slice(2, 7)}...`} width="10%" />
                      <TableData text="#HELD" width="10%" />
                      <TableData text={formatTimeAgo(listing.startTime)} width="12%" />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="absolute inset-x-0 top-[40px] h-[1px] bg-dark-border" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
