import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const usePendingEmissions = (address: string | undefined) => {
  return useQuery({
    queryKey: ['pending-emissions', address],
    queryFn: async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/emissions/pending/${address}`)
      return data;
    },
    enabled: !!address,
    refetchInterval: 5000
  })
  
}