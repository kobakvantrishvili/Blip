import { OpenSeaStreamClient, Network, LogLevel } from "@opensea/stream-js";

let openseaClient: OpenSeaStreamClient | null = null;

const initOpenseaClient = () => {
  if (typeof window !== "undefined" && typeof WebSocket !== "undefined") {
    openseaClient = new OpenSeaStreamClient({
      token: process.env.NEXT_PUBLIC_OPENSEA_API_KEY || "",
      network: Network.MAINNET,
      logLevel: LogLevel.INFO,
      onError: (err) => console.error("OpenSeaStreamClient error:", err),
    });
  } else {
    console.error("WebSocket is not available in this environment.");
  }
};

initOpenseaClient(); // initialize OpenSeaStreamClient

export { openseaClient }; // Export the OpenSeaStreamClient WebSocket connection
