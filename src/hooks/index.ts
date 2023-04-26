import { useQuery } from "@tanstack/react-query";
import("ethers");

const core = import("@wagmi/core");
const providers = import("@wagmi/core/providers/public");
export const useWagmi = () => {
  return useQuery({
    queryKey: ["wagmi"],
    queryFn: async () => {
      await import("ethers");
      const { createClient, configureChains, mainnet } = await core;
      const { publicProvider } = await providers;
      const { provider, webSocketProvider } = configureChains(
        [mainnet],
        [publicProvider()]
      );

      const client = createClient({
        autoConnect: true,
        provider,
        webSocketProvider,
      });
      return client;
    },
  });
};
