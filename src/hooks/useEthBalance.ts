import { useEffect, useState } from "react";
import { ethers, formatEther } from "ethers";
import { useAccount } from "wagmi";
import { useEthereumProvider } from "@/context/EthereumProvider";

const useEthBalance = () => {
  const provider = useEthereumProvider();
  const { address } = useAccount();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!address || !provider) return;
      const balance = await provider.getBalance(address);
      setBalance(formatEther(balance));
    };

    fetchBalance();
  }, [address, provider]);

  return balance;
};

export default useEthBalance;
