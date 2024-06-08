import { Dispatch, SetStateAction } from "react";
import { handleCopyClick } from "@/utils/handleCopyClick";

interface CopyProps {
  address: string | undefined;
  setIsCopied: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleCopy = ({ address, setIsCopied, setIsDisabled }: CopyProps) => {
  setIsDisabled(true);
  handleCopyClick(address)
    .then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    })
    .finally(() => {
      setTimeout(() => {
        setIsDisabled(false);
      }, 1500);
    });
};
