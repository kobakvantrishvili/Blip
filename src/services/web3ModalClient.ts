import { createWeb3Modal } from "@web3modal/wagmi/react";
import { config, projectId } from "@/config/wagmiConfig";

if (!projectId) throw new Error("Project ID is not defined");

const web3ModalClient = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  themeMode: "dark",
  themeVariables: {
    "--w3m-font-family": "Jaro",
    "--w3m-font-size-master": "11px",
    "--w3m-border-radius-master": "1px",
  },
});

export { web3ModalClient };
