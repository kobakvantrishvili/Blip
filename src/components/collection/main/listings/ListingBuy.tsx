// ListingBuy.tsx

import React from "react";
import { LiaEthereum } from "react-icons/lia";

// Define the types for props
type ListingBuyProps = {
  price: number;
  currency: string;
};

const ListingBuy: React.FC<ListingBuyProps> = ({ price, currency }) => {
  const displayCurrency = currency.toUpperCase() === "ETH" || currency.toUpperCase() === "WETH";

  return (
    <button className="border border-dark-border py-[6px] px-2 rounded-md">
      <span>{price.toFixed(4)}</span>
      {displayCurrency ? <LiaEthereum className="inline-block text-lg ml-[2px] text-tertiary-accent" /> : <span>{currency.toUpperCase()}</span>}
    </button>
  );
};

export default ListingBuy;
