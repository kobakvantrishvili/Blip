import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config/wagmiConfig";
import { Web3ModalProvider } from "@/context/Web3ModalProvider";
import { EthereumProvider } from "@/context/EthereumProvider";

export const metadata: Metadata = {
  title: "Blip",
  description: "Money go BRRRRR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body>
        <Web3ModalProvider initialState={initialState}>
          <EthereumProvider>{children}</EthereumProvider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
