import React from "react";
import { LiaEthereum } from "react-icons/lia";

type LastSaleProps = {
  unitPrice: number | undefined;
  paymentTokenSymbol: string | null | undefined;
  decimals?: number;
};

const LastSale: React.FC<LastSaleProps> = ({ unitPrice, paymentTokenSymbol, decimals = 18 }) => {
  const symbol = paymentTokenSymbol?.toUpperCase() || "ETH";
  const price = unitPrice ? (unitPrice / Math.pow(10, decimals)).toFixed(4) : "0";

  return (
    <>
      <span>{price}</span>
      {(symbol === "ETH" || symbol === "WETH") && <LiaEthereum className="inline-block text-lg ml-[2px] text-text-secondary" />}
    </>
  );
};

export default LastSale;
