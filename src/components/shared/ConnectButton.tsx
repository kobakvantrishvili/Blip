import { useWeb3Modal } from "@web3modal/wagmi/react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

interface ConnectButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ className, children }) => {
  const { open } = useWeb3Modal();
  return (
    <button
      className={`bg-tertiary-accent text-text-dark hover:bg-white focus:outline-none flex items-center justify-center ${className}`}
      onClick={() => open()}
    >
      <MdOutlineAccountBalanceWallet className={`text-text-dark text-2xl`} />
      {children}
    </button>
  );
};

export default ConnectButton;
