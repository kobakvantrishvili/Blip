import React from "react";
import { LiaEthereum } from "react-icons/lia";

type EthBalanceDisplayProps = {
  balance: string | null;
  className?: string;
};

const EthBalanceDisplay: React.FC<EthBalanceDisplayProps> = ({ balance, className }) => (
  <div className={`flex flex-row ${className}`}>
    <span>{balance ? `${balance}` : "Loading..."}</span>
    <LiaEthereum className="text-tertiary-accent text-2xl" />
  </div>
);

export default EthBalanceDisplay;
