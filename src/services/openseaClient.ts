import { OpenSeaStreamClient, Network, LogLevel } from "@opensea/stream-js";

const client = new OpenSeaStreamClient({
  token: process.env.NEXT_PUBLIC_OPENSEA_API_KEY || "",
  network: Network.MAINNET,
  logLevel: LogLevel.INFO,
  onError: (err) => console.error(err),
});

export default client;
