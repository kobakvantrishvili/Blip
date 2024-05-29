import { copyEthAddress } from "@/utils/copyEthAddress";

export const handleCopyClick = (
  address: string | undefined,
  setIsCopied: (value: boolean) => void,
  setIsDisabled: (value: boolean) => void
) => {
  if (address) {
    copyEthAddress(address, setIsCopied);
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 1500);
  }
};
