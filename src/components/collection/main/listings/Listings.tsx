import React, { useState } from "react";
import SearchBar from "@/components/shared/SearchBar";
import { FiLayers } from "react-icons/fi";
import { PiGavel } from "react-icons/pi";
import { BsClockHistory } from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { LiaEthereum } from "react-icons/lia";
import Tab from "@/components/collection/main/listings/Tab";
import TableHeader from "@/components/collection/main/listings/TableHeader";
import TableData from "@/components/collection/main/listings/TableData";
import { NftListing } from "@/services/models/types";
import { formatTimePast } from "@/utils/formatTimePast";
import ListingTitle from "@/components/collection/main/listings/ListingTitle";
import ListingBuy from "@/components/collection/main/listings/ListingBuy";
import LastSale from "@/components/collection/main/listings/LastSale";
import Rarity from "@/components/collection/main/listings/Rarity";
import Owner from "@/components/collection/main/listings/Owner";

type ListingsProps = {
  collectionSlug: string;
  collectionListings: NftListing[] | null;
};

const Listings: React.FC<ListingsProps> = ({ collectionListings }) => {
  const [selected, setSelected] = useState("items");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleTabSelection = (tab: string) => {
    setSelected(tab);
  };

  return (
    <div className="h-full w-full px-6 py-6">
      <div className="flex flex-col h-full">
        <div className="relative top-[1px] flex flex-row justify-between items-start z-10">
          <div className="flex flex-row justify-start items-center gap-5">
            <Tab text="ITEMS" Icon={FiLayers} isSelected={selected === "items"} onClick={() => handleTabSelection("items")} />
            <Tab text="BIDS" Icon={PiGavel} isSelected={selected === "bids"} onClick={() => handleTabSelection("bids")} />
            <Tab text="HOLDERS" Icon={MdOutlinePeopleAlt} isSelected={selected === "holders"} onClick={() => handleTabSelection("holders")} />
          </div>
          <SearchBar
            barWidth="w-16"
            className="relative bottom-[7px] border rounded border-dark-border h-8 px-1"
            placeholder="Item ID"
            iconSize="text-xl"
          />
        </div>
        <div className="w-full h-[calc(100%-45px)]">
          <div className="block w-full h-full overflow-y-auto overflow-x-auto">
            <table className="min-w-full table-fixed h-full">
              <thead className="sticky top-0 bg-dark-bg">
                <tr className="absolute inset-x-0 top-0 border-b border-dark-border"></tr>
                <tr className="h-10">
                  <TableHeader width="25%" className="text-start">
                    LISTING
                  </TableHeader>
                  <TableHeader width="12%">RARITY</TableHeader>
                  <TableHeader width="15%">BUY NOW</TableHeader>
                  <TableHeader width="12%">LAST SALE</TableHeader>
                  <TableHeader width="12%">OWNER</TableHeader>
                  <TableHeader width="12%">HELD FOR</TableHeader>
                  <TableHeader width="12%" className="h-full flex justify-center items-center">
                    <BsClockHistory className="text-xl" />
                  </TableHeader>
                </tr>
                <tr className="absolute inset-x-0 bottom-0 border-t border-dark-border"></tr>
              </thead>
              <tbody>
                <tr className="h-2">
                  <td colSpan={7}></td>
                </tr>
                {collectionListings?.map((listing) => (
                  <tr key={listing.order_hash}>
                    <TableData width="25%" className="text-start py-1">
                      <ListingTitle
                        tokenImageUrl={listing.token?.previews.image_small_url || ""}
                        tokenName={listing.token?.name || "Pudgy"}
                        isChecked={checkedItems[listing.order_hash] || false}
                        onToggleCheck={() => toggleCheck(listing.order_hash)}
                      />
                    </TableData>
                    <TableData width="12%">
                      <Rarity rank={listing.token?.rarity?.rank} distinctNftCount={listing.token?.collection?.distinct_nft_count} />
                    </TableData>
                    <TableData width="15%">
                      <ListingBuy price={listing.price.value} currency={listing.price.currency} />
                    </TableData>
                    <TableData width="12%">
                      <LastSale
                        unitPrice={listing.token?.last_sale?.unit_price}
                        paymentTokenSymbol={listing.token?.last_sale?.payment_token?.symbol}
                        decimals={listing.token?.last_sale?.payment_token?.decimals}
                      />
                    </TableData>
                    <TableData width="12%">
                      <Owner address={listing.offerer} />
                    </TableData>
                    <TableData width="12%">
                      {listing.token?.owners[0]?.last_acquired_date
                        ? formatTimePast(Math.floor(new Date(listing.token.owners[0].last_acquired_date).getTime() / 1000).toString())
                        : "—"}
                    </TableData>
                    <TableData width="12%">{`${formatTimePast(listing.startTime)} ago`}</TableData>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
