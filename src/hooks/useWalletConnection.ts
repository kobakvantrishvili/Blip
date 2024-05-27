import { useEffect } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";

const useWalletConnection = () => {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  const connectWallet = () => {
    open();
  };

  const disconnectWallet = () => {
    disconnect();
  };

  useEffect(() => {
    if (isConnected) {
      // Handle any side effects after connecting, e.g., fetching user data
      console.log(`Connected to wallet with address: ${address}`);
    }
  }, [isConnected, address]);

  return {
    address,
    isConnected,
    connectWallet,
    disconnectWallet,
  };
};

export default useWalletConnection;
