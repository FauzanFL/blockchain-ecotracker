import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useEctrBalance = (address: string | undefined) => {
  return useQuery({
    queryKey: ['ectr-balance', address],
    queryFn: async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/emissions/balance/${address}`)
      return data;
    },
    enabled: !!address,
    refetchInterval: 5000
  })
  
}