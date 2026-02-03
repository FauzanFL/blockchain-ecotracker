import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";

export const useEmissions = (address: string | undefined) => {
  const [isClient, setIsClient] = useState(false);
  const previousEmissions = useRef<number | null>(null);

  const query = useQuery({
    queryKey: ['emissions', address],
    queryFn: async () => {
      console.log("Fething data")
      if (!address) return null;

      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const {data} = await axios.get(
        `${baseUrl}/emissions/stats/${address}`
      )
      return data;
    },
    enabled: true,
    refetchInterval: 10000,
  });

  useEffect(() => {
    setIsClient(true);
    if (query.data) {
      const currentCount = query.data.history.length;

      if (previousEmissions.current !== null && currentCount > previousEmissions.current) {
        const latestEntry = query.data.history[0];

        toast.success(`New emission detected! ${latestEntry.amount} kg CO2`, {
          duration: 4000,
          position: 'top-right',
        })
      }

      previousEmissions.current = currentCount;
    }
  }, [query.data]);

  return query;
}