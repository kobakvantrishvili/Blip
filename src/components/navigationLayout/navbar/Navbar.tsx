import { FiGlobe, FiLogOut, FiX, FiCheck } from "react-icons/fi";
import { BsCopy } from "react-icons/bs";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useAccount, useDisconnect } from "wagmi";

import Link from "@/components/shared/Link";
import useMediaQuery from "@/hooks/useMediaQuery";
import SearchBar from "@/components/navigationLayout/navbar/SearchBar";
import ConnectButton from "@/components/navigationLayout/ConnectButton";
import UserMenuButton from "@/components/navigationLayout/UserMenuButton";
import useEthBalance from "@/hooks/useEthBalance";
import EthBalanceDisplay from "@/components/navigationLayout/EthBalanceDisplay";
import DropdownMenuItem from "@/components/shared/dropDownMenu/DropDownMenuItem";
import { copyEthAddress } from "@/utils/copyEthAddress";
import DropDownMenu from "@/components/shared/dropDownMenu/DropDownMenu";

type NavbarProps = {
  isMenuToggled: boolean;
  setIsMenuToggled: React.Dispatch<React.SetStateAction<boolean>>;
  isCopied: boolean;
  setIsCopied: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = ({ isMenuToggled, setIsMenuToggled, isCopied, setIsCopied }) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  const isAboveLargeScreens = useMediaQuery("(min-width: 1024px)");

  const balance = useEthBalance();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

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
                  <ConnectButton className={`px-8 py-1 gap-1 rounded-r border-y border-r border-tertiary-accent`}>
                    CONNECT WALLET
                  </ConnectButton>
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
                      <DropDownMenu className={`w-42 bg-dark-bg border-dark-border`}>
                        <DropdownMenuItem
                          icon={isCopied ? FiCheck : BsCopy}
                          onClick={() => copyEthAddress(address, setIsCopied)}
                        >
                          Copy Address
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          icon={FiLogOut}
                          onClick={() => disconnect()}
                          className="border-b border-dark-border"
                        >
                          Disconnect
                        </DropdownMenuItem>
                      </DropDownMenu>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* SEARCH BAR RELOCATION */}
      {!isAboveLargeScreens && (
        <div
          className={`bg-dark-bg text-text-primary fixed top-16 flex items-center w-full h-10 m-0 px-6 border-b border-dark-border flex-row gap-2 z-10`}
        >
          <SearchBar className="w-full h-full" barWidth="w-full" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
