import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import {
  mainnet,
  optimism,
  sepolia,
  solana,
  solanaTestnet,
  solanaDevnet,
} from "@reown/appkit/networks";
import { QueryClient } from "@tanstack/react-query";

// Get projectId from https://cloud.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID || "YOUR_PROJECT_ID";

if (!projectId) {
  throw new Error("VITE_PROJECT_ID is not set");
}

// Create a metadata object
export const metadata = {
  name: "Multi-Wallet Test App",
  description: "Testing Reown AppKit Multi-Wallet functionality",
  url: "https://localhost:5173",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create Wagmi Adapter for EVM chains
export const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, sepolia],
  projectId,
  ssr: false,
});

// Create Solana Adapter
export const solanaAdapter = new SolanaAdapter({
  wallets: [],
});

// Create query client
export const queryClient = new QueryClient();

// Create the modal with multi-wallet enabled
export const modal = createAppKit({
  adapters: [wagmiAdapter, solanaAdapter],
  networks: [mainnet, optimism, sepolia, solana, solanaTestnet, solanaDevnet],
  projectId,
  metadata,
  features: {
    analytics: false,
  },
  themeMode: "light",
  themeVariables: {
    "--w3m-accent": "#3396FF",
  },
});
