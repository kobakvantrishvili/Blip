"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const EthereumProviderContext = createContext<ethers.JsonRpcProvider | null>(null);

type Props = {
  children: React.ReactNode;
};

export const EthereumProvider: React.FC<Props> = ({ children }) => {
  const [provider, setProvider] = useState<ethers.JsonRpcProvider | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_INFURA_URL;
    if (url) {
      setProvider(new ethers.JsonRpcProvider(url));
    } else {
      throw new Error("Infura URL is not defined");
    }
  }, []);

  return <EthereumProviderContext.Provider value={provider}>{children}</EthereumProviderContext.Provider>;
};

export const useEthereumProvider = () => {
  return useContext(EthereumProviderContext);
};
