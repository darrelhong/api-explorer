import { useQuery } from "@tanstack/react-query";
import { ProviderData } from "../types/provider";

export const useProviderQuery = (provider: string, { enabled = true } = {}) =>
  useQuery({
    queryKey: ["providers", provider],
    queryFn: async () => {
      const response = await fetch(`https://api.apis.guru/v2/${provider}.json`);
      const json = await response.json();
      return json.apis as Record<string, ProviderData>;
    },
    enabled,
  });
