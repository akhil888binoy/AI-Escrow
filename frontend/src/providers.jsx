import {
    RainbowKitProvider,
    getDefaultWallets,
    getDefaultConfig,
    darkTheme,
  } from "@rainbow-me/rainbowkit";
  
  import {
    argentWallet,
    trustWallet,
    ledgerWallet,
  } from "@rainbow-me/rainbowkit/wallets";
  
  import { polygonAmoy, sepolia } from "wagmi/chains";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { WagmiProvider } from "wagmi";
  
  const { wallets } = getDefaultWallets();
  const amoyChain = {
    id: 80002, // Polygon Mumbai Testnet
    name: "Mumbai",
    network: "mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://polygon-amoy.g.alchemy.com/v2/34EkQRSk-LEy-SVbvOFyAit6iU2tf29l"], // Alchemy URL
      },
    },
    blockExplorers: {
      default: {
        name: "Polygonscan",
        url: "https://mumbai.polygonscan.com/",
      },
    },
    testnet: true,
  };
  
  export const config = getDefaultConfig({
    appName: "Escrow",
    projectId: "8d4e5671800fd109469c3a183aa7325a",
    wallets: [
      ...wallets,
      {
        groupName: "Other",
        wallets: [argentWallet, trustWallet, ledgerWallet],
      },
    ],
    chains: [sepolia , polygonAmoy],
    ssr: true,
  });
  
  
  export const queryClient = new QueryClient();
  
  export function Providers({ children }) {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }