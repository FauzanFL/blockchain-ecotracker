"use client"
import { useEmissions } from "@/hooks/useEmission";
import { useAccount } from "wagmi";
import EmissionChart from "./EmissionChart";
import { StatCard } from "./StatCard";
import { Activity, Database } from "lucide-react";
import { EmissionRow } from "./EmissionRow";
import { usePendingEmissions } from "@/hooks/usePendingEmission";
import EmissionCard from "./EmissionCard";
import { SettleButton } from "./SettleButton";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

let emissionData = {
  totalAmount: 0,
  totalLogs: 0,
  history: [],
}

const queryClient = new QueryClient();

export default function Dashboard() {
  const {address} = useAccount();
  const {data} = useEmissions(address);
  const {data: pendingEmissions} = usePendingEmissions(address);
  
  if (data) emissionData = data;

  const {mutate, isPending} = useMutation({
    mutationFn: async () => {
      return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/settle/${address}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['emissions']});
      queryClient.invalidateQueries({queryKey: ['pending-emissions']});
      toast.success("All pending emissions settled");
    }
  })

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          title="Total Accumulated" 
          value={emissionData.totalAmount} 
          unit="kg CO₂"
          icon={Activity}
          color="emerald"
        />
        <StatCard 
          title="Total Logs" 
          value={emissionData.totalLogs} 
          icon={Database}
          color="purple"
        />
      </div>

      <div className="p-6 bg-[#1e293b]/30 backdrop-blur-md border border-white/5 rounded-3xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <h4 className="font-bold text-gray-300 uppercase text-xs tracking-widest">Live Analytics</h4>
        </div>
        <EmissionChart data={emissionData.history} />
      </div>

      <EmissionCard title="Latest Activity">
        {emissionData.history.toReversed().slice(0, 5).map((log: any) => (
            <EmissionRow key={log.id} log={log} />
          ))}
      </EmissionCard>

      <EmissionCard title="Pending Activity">
        <div className="flex justify-end p-4">
          <SettleButton onClick={() => mutate()} isLoading={isPending} />
        </div>
        {pendingEmissions?.toReversed().map((log: any) => (
            <EmissionRow key={log.id} log={log} />
          ))}
      </EmissionCard>
    </div>
  );
}
