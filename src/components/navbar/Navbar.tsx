"use client";

import { FiGlobe, FiLogOut, FiX, FiCheck } from "react-icons/fi";
import { BsCollection, BsSuitcaseLg, BsQuestionCircle, BsCopy } from "react-icons/bs";
import { ImFeed } from "react-icons/im";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useAccount, useDisconnect } from "wagmi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Link from "@/components/shared/Link";
import useMediaQuery from "@/hooks/useMediaQuery";
import SearchBar from "@/components/navbar/SearchBar";
import SidebarItem from "@/components/navbar/SidebarItem";
import ConnectButton from "@/components/shared/ConnectButton";
import UserMenuButton from "@/components/shared/UserMenuButton";
import useEthBalance from "@/hooks/useEthBalance";
import EthBalanceDisplay from "@/components/navbar/EthBalanceDisplay";
import DropdownMenuItem from "@/components/shared/DropDownMenuItem";

const Navbar: React.FC = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  const isAboveLargeScreens = useMediaQuery("(min-width: 1024px)");
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const { address, isConnected } = useAccount();
  const balance = useEthBalance();
  const { disconnect } = useDisconnect();
  const [isCopied, setIsCopied] = useState(false);

  const handleDisconnect = () => {
    disconnect();
    console.log("disconnected!");
  };

  const copyEthAddress = () => {
    if (address) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 1500); // Reset the icon after 1.5 seconds
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <nav className={`relative`}>
      <div
        className={`bg-dark-bg text-text-primary flex items-center fixed z-30 justify-between w-full h-16 m-0 px-6 border-b border-dark-border flex-row gap-2`}
      >
        {/* LEFT */}
        {isAboveMediumScreens ? (
          <div className={`flex items-center justify-start gap-8 flex-1 flex-row`}>
            <a className={`text-secondary-accent font-blip text-3xl relative top-[6px]`} href="/">
              BLIP
            </a>
            <div className={`flex items-center justify-start gap-4 flex-row text-text-secondary`}>
              <Link href="/" className={`hover:text-primary-accent`}>
                COLLECTIONS
              </Link>
              <Link href="/" className={`hover:text-primary-accent`}>
                PORTFOLIO
              </Link>
              <Link href="/" className={`hover:text-primary-accent`}>
                ACTIVITY
              </Link>
            </div>
          </div>
        ) : (
          <div className={`flex items-center justify-start flex-1`}>
            <button onClick={() => setIsMenuToggled(!isMenuToggled)} className="group py-1 px-1">
              {!isMenuToggled ? (
                <HiOutlineMenuAlt1
                  className={`text-text-secondary group-hover:text-primary-accent cursor-pointer text-2xl`}
                />
              ) : (
                <FiX className={`text-text-secondary group-hover:text-primary-accent cursor-pointer text-2xl`} />
              )}
            </button>
          </div>
        )}

        {/* MIDDLE */}
        {isAboveLargeScreens && <SearchBar className="border rounded border-dark-border h-9 p-2" barWidth="w-56" />}
        {!isAboveMediumScreens && (
          <a className={`text-secondary-accent font-blip text-3xl relative top-[6px]`} href="/">
            BRRRR
          </a>
        )}

        {/* RIGHT */}
        <div className={`flex items-center justify-end flex-1`}>
          <div className={`flex items-center`}>
            <button
              className={`group px-4 py-1 relative shadow-custom border border-dark-border hover:bg-dark-hover rounded-l ${
                !isAboveMediumScreens && "rounded"
              }`}
            >
              <FiGlobe className={`text-text-secondary group-hover:text-primary-accent text-2xl`} />
              <div
                className={`absolute inset-x-0 bottom-[-1px] h-[1px] bg-gradient-to-r from-secondary-accent via-primary-accent to-secondary-accent shadow-glow`}
              ></div>
            </button>
            {isAboveMediumScreens && (
              <>
                {!isConnected ? (
                  <ConnectButton className={`px-8 py-[5px] gap-1 rounded-r`}>CONNECT WALLET</ConnectButton>
                ) : (
                  <>
                    <EthBalanceDisplay
                      className={`border-y border-dark-border px-2 py-1 gap-1 hover:text-primary-accent hover:bg-dark-hover`}
                      balance={balance}
                    />
                    <div className={`relative group`}>
                      <UserMenuButton className={`px-4 py-1 gap-1 rounded-r w-42`}>
                        <span>
                          {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                      </UserMenuButton>
                      <div className="absolute right-0 w-42 bg-dark-bg border border-dark-border rounded shadow-lg hidden group-hover:block">
                        <DropdownMenuItem icon={isCopied ? FiCheck : BsCopy} onClick={copyEthAddress}>
                          Copy Address
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          icon={FiLogOut}
                          onClick={handleDisconnect}
                          className="border-b border-dark-border"
                        >
                          Disconnect
                        </DropdownMenuItem>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* SEARCH BAR RELOCATED */}
      {!isAboveLargeScreens && (
        <div
          className={`bg-dark-bg text-text-primary fixed top-16 flex items-center w-full h-10 m-0 px-6 border-b border-dark-border flex-row gap-2 z-10`}
        >
          <SearchBar className="w-full h-full" barWidth="w-full" />
        </div>
      )}

      {/* SIDE BAR */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className={`fixed flex flex-col left-0 z-20 top-16 bottom-0 w-full h-[calc(100dvh-4rem)] bg-dark-panel`}>
          {/* MENU ITEMS */}
          <div className={`py-8 px-6 flex flex-col gap-8 flex-1`}>
            {!isConnected ? (
              <ConnectButton className="px-4 py-4 gap-2 rounded w-full border border-dark-border">
                CONNECT WALLET
              </ConnectButton>
            ) : (
              <UserMenuButton className={`px-4 py-4 gap-2 rounded w-full`} onClick={copyEthAddress}>
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
                onClick={handleDisconnect}
                className={`group flex items-center justify-center w-12 h-12 bg-dark-hover hover:bg-dark-panel border border-dark-border rounded shadow-md focus:outline-none`}
              >
                <FiLogOut className={`text-text-secondary group-hover:text-primary-accent text-2xl`} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Notification Bar */}
      <AnimatePresence mode="wait">
        {isCopied && (
          <motion.div
            key={1}
            className="z-40 fixed bottom-0 left-0 right-0 bg-secondary-accent text-white text-center py-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
