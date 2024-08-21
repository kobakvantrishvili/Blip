import React, { useState } from "react";
import { handleCopy } from "@/utils/handleCopy";

type OwnerProps = {
  address: string;
};

const Owner: React.FC<OwnerProps> = ({ address }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCopyClick = () => {
    if (!isDisabled) {
      handleCopy({ address, setIsCopied, setIsDisabled });
    }
  };

  return (
    <span onClick={handleCopyClick} className={`cursor-pointer ${isCopied ? "text-text-primary" : "text-text-primary hover:text-white"}`}>
      {`${address.slice(2, 7)}...`}
    </span>
  );
};

export default Owner;
