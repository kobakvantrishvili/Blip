"use client";

import React, { ReactNode } from "react";
import { State, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { config, projectId } from "@/config/wagmiConfig";

const queryClient = new QueryClient();
if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeMode: "dark",
  themeVariables: {
    "--w3m-font-family": "Jaro",
    "--w3m-font-size-master": "11px",
    "--w3m-border-radius-master": "1px",
  },
});

type Props = {
  children: ReactNode;
  initialState?: State;
};

export const Web3ModalProvider: React.FC<Props> = ({ children, initialState }) => {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
