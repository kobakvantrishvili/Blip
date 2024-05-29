import React from "react";
import { BsCollection, BsQuestionCircle, BsSuitcaseLg } from "react-icons/bs";
import { ImFeed } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { useAccount, useDisconnect } from "wagmi";

import ConnectButton from "@/components/nav/ConnectButton";
import UserMenuButton from "@/components/nav/UserMenuButton";
import { copyEthAddress } from "@/utils/copyEthAddress";
import EthBalanceDisplay from "@/components/nav/EthBalanceDisplay";
import SidebarItem from "@/components/nav/sidebar/SidebarItem";
import useEthBalance from "@/hooks/useEthBalance";

type SidebarProps = {
  setIsCopied: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = ({ setIsCopied }) => {
  const { address, isConnected } = useAccount();
  const balance = useEthBalance();
  const { disconnect } = useDisconnect();

  return (
    <div className={`fixed flex flex-col left-0 z-20 top-16 bottom-0 w-full h-[calc(100dvh-4rem)] bg-dark-panel`}>
      {/* MENU ITEMS */}
      <div className={`py-8 px-6 flex flex-col gap-8 flex-1`}>
        {!isConnected ? (
          <ConnectButton className="px-4 py-4 gap-2 rounded w-full border border-dark-border">
            CONNECT WALLET
          </ConnectButton>
        ) : (
          <UserMenuButton
            className={`px-4 py-4 gap-2 rounded w-full`}
            onClick={() => copyEthAddress(address, setIsCopied)}
          >
            <span>
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <EthBalanceDisplay className={`ml-auto gap-2`} balance={balance} />
          </UserMenuButton>
        )}
        <SidebarItem title={`COLLECTIONS`} icon={BsCollection} />
        <SidebarItem title={`PORTFOLIO`} icon={BsSuitcaseLg} />
        <SidebarItem title={`ACTIVITY`} icon={ImFeed} />
        <SidebarItem title={`SUPPORT`} icon={BsQuestionCircle} />
      </div>
      {isConnected && (
        <div className="px-12 py-12 flex justify-end items-center">
          <button
            onClick={() => disconnect()}
            className={`group flex items-center justify-center w-12 h-12 bg-dark-hover hover:bg-dark-panel border border-dark-border rounded shadow-md focus:outline-none`}
          >
            <FiLogOut className={`text-text-secondary group-hover:text-primary-accent text-2xl`} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
