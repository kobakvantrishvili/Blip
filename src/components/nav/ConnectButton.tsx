import React from "react";
import { web3ModalClient } from "@/client/web3ModalClient";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

type ConnectButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

const ConnectButton: React.FC<ConnectButtonProps> = ({ className, children }) => {
  const handleConnect = async () => {
    try {
      await web3ModalClient.open();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <button
      className={`bg-tertiary-accent text-text-dark hover:bg-white focus:outline-none flex items-center justify-center ${className}`}
      onClick={handleConnect}
    >
      <MdOutlineAccountBalanceWallet className={`text-text-dark text-2xl`} />
      {children}
    </button>
  );
};

export default ConnectButton;
