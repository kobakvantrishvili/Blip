import { useEffect, useState } from "react";
import { FiLogOut, FiX, FiCheck } from "react-icons/fi";
import { BsCopy } from "react-icons/bs";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useAccount, useDisconnect } from "wagmi";

import Link from "@/components/shared/Link";
import useMediaQuery from "@/hooks/useMediaQuery";
import SearchBar from "@/components/nav/navbar/SearchBar";
import LanguageSelectButton from "@/components/nav/navbar/LanguageSelectButton";
import ConnectButton from "@/components/nav/ConnectButton";
import UserMenuButton from "@/components/nav/UserMenuButton";
import useEthBalance from "@/hooks/useEthBalance";
import EthBalanceDisplay from "@/components/nav/EthBalanceDisplay";
import DropdownMenuItem from "@/components/shared/dropDownMenu/DropDownMenuItem";
import DropDownMenu from "@/components/shared/dropDownMenu/DropDownMenu";
import { handleCopy } from "@/utils/handleCopy";

type NavbarProps = {
  isMenuToggled: boolean;
  setIsMenuToggled: React.Dispatch<React.SetStateAction<boolean>>;
  isCopied: boolean;
  setIsCopied: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = ({ isMenuToggled, setIsMenuToggled, isCopied, setIsCopied }) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  const isAboveLargeScreens = useMediaQuery("(min-width: 1024px)");

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("EN");

  const balance = useEthBalance();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  //TODO: HAS TO BE GLOBAL ONCE I ACTUALLY INTEGRATE NEW LANGUAGE.
  const handleLanguagePick = (language: string) => {
    setSelectedLanguage(language);
  };

  useEffect(() => {
    if (isAboveMediumScreens) setIsMenuToggled(false);
  }, [isAboveMediumScreens, setIsMenuToggled]);

  return (
    <nav className={`fixed top-0 left-0 w-full`}>
      <div
        className={`bg-dark-bg text-text-primary flex items-center fixed z-50 justify-between w-full h-16 m-0 px-6 border-b border-dark-border flex-row gap-2`}
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
                <HiOutlineMenuAlt1 className={`text-text-secondary group-hover:text-primary-accent cursor-pointer text-2xl`} />
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
            <div className={`relative group`}>
              <LanguageSelectButton isAboveMediumScreens={isAboveMediumScreens} />
              <DropDownMenu className={`bg-dark-bg border-dark-border w-14`}>
                <DropdownMenuItem
                  className={`justify-center ${selectedLanguage === "EN" ? "text-primary-accent" : "text-text-secondary"}`}
                  onClick={() => handleLanguagePick("EN")}
                >
                  EN
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`justify-center ${selectedLanguage === "FR" ? "text-primary-accent" : "text-text-secondary"}`}
                  onClick={() => handleLanguagePick("FR")}
                >
                  FR
                </DropdownMenuItem>
              </DropDownMenu>
            </div>
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
                          onClick={() => handleCopy({ address, setIsCopied, setIsDisabled: setIsButtonDisabled })}
                          className={`text-text-secondary ${isButtonDisabled ? "disabled-class" : ""}`}
                        >
                          Copy Address
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          icon={FiLogOut}
                          onClick={() => disconnect()}
                          className="text-text-secondary border-b border-dark-border"
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
      {/* {!isAboveLargeScreens && (
        <div
          className={`bg-dark-bg text-text-primary fixed top-16 flex items-center w-full h-10 m-0 px-6 border-b border-dark-border flex-row gap-2 z-40`}
        >
          <SearchBar className="w-full h-full" barWidth="w-full" />
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
