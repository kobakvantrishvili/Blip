import React from "react";
import { LiaEthereum } from "react-icons/lia";
//import { ethers } from "ethers";
//import { useEthereumProvider } from "@/context/EthereumProvider";

type ListingBuyProps = {
  price: number;
  currency: string;
  hash: string; // NFT listing hash
  collectionSlug: string; // Collection slug
  contractAddress: string; // Contract address
  chain?: string; // Blockchain (e.g., Ethereum)
};

const ListingBuy: React.FC<ListingBuyProps> = ({ price, currency, hash, collectionSlug, contractAddress, chain }) => {
  const displayCurrency = currency.toUpperCase() === "ETH" || currency.toUpperCase() === "WETH";

  // const handleBuyClick = async () => {
  //   let provider;
  //   let signer;

  //   if (window.ethereum == null) {
  //     // If MetaMask is not installed, we use the default provider.
  //     console.log("MetaMask not installed; using read-only defaults");
  //     provider = ethers.getDefaultProvider();
  //   } else {
  //     provider = new ethers.BrowserProvider(window.ethereum);
  //     console.log(await provider.listAccounts());

  //     try {
  //       // Prompt user to connect their wallet
  //       const accounts = await provider.send("eth_requestAccounts", []);
  //       if (accounts.length === 0) {
  //         alert("Please connect your MetaMask wallet.");
  //         return;
  //       }
  //       signer = await provider.getSigner();
  //     } catch (error) {
  //       console.error("User denied account access:", error);
  //       alert("Please allow access to your MetaMask account.");
  //       return;
  //     }
  //   }

  //   if (!signer) {
  //     console.error("Signer is not defined.");
  //     alert("Unable to get the signer. Please try again.");
  //     return;
  //   }

  //   // Call the API to fulfill the NFT listing
  //   const fulfiller = await signer.getAddress();
  //   try {
  //     const response = await fetch("/api/fulfillNftListing", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         hash,
  //         chain,
  //         fulfillerAddress: fulfiller, // Use connected wallet address
  //         collectionSlug,
  //         contractAddress,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log("Transaction successful:", data);
  //     } else {
  //       console.error("Transaction failed:", data.error);
  //       alert(`Transaction failed: ${data.error}`);
  //     }
  //   } catch (error) {
  //     console.error("Error processing transaction:", error);
  //     alert("Error processing transaction.");
  //   }
  // };

  return (
    <button className="border border-dark-border py-[6px] px-2 rounded-md" onClick={() => {}}>
      <span>{price.toFixed(4)}</span>
      {displayCurrency ? <LiaEthereum className="inline-block text-lg ml-[2px] text-tertiary-accent" /> : <span>{currency.toUpperCase()}</span>}
    </button>
  );
};

export default ListingBuy;
