"use client"
import { useEmissions } from "@/hooks/useEmission";
import { useAccount } from "wagmi";
import EmissionChart from "./EmissionChart";
import { StatCard } from "./StatCard";
import { Activity, Database, HandCoins, Leaf } from "lucide-react";
import { EmissionRow } from "./EmissionRow";
import { usePendingEmissions } from "@/hooks/usePendingEmission";
import EmissionCard from "./EmissionCard";
import { SettleButton } from "./SettleButton";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useEctrBalance } from "@/hooks/useEctrBalance";

let emissionData = {
  totalAmount: 0,
  totalLogs: 0,
  history: [],
}

let factoryData = {
  totalEmissions: 0,
  balance: 0,
  symbol: ""
}

const queryClient = new QueryClient();

export default function Dashboard() {
  const {address} = useAccount();
  const {data} = useEmissions(address);
  const {data: pendingEmissions} = usePendingEmissions(address);
  const {data: factory} = useEctrBalance(address);
  
  if (data) emissionData = data;
  if (factory) factoryData = factory;

  const {mutate, isPending} = useMutation({
    mutationFn: async () => {
      return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/emissions/settle/${address}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['emissions']});
      queryClient.invalidateQueries({queryKey: ['pending-emissions']});
      toast.success("All pending emissions settled");
    }
  })

  return (
    <div className="space-y-4 md:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard 
          title="Total Accumulated" 
          value={factoryData.totalEmissions} 
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
        <StatCard
          title="Balance"
          value={factoryData.balance}
          unit={factoryData.symbol}
          icon={HandCoins}
          color="amber"
        />
      </div>

      <div className="p-6 pb-12 bg-[#1e293b]/30 backdrop-blur-md border border-white/5 rounded-3xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <h4 className="font-bold text-gray-300 uppercase text-xs tracking-widest">Live Analytics</h4>
        </div>
        <EmissionChart data={emissionData.history?.toReversed()} />
      </div>

      <EmissionCard title="Latest Activity">
        {emissionData.history && emissionData.history.length > 0 ? (
          emissionData.history?.slice(0, 5).map((log: any) => (
            <EmissionRow key={log.id} log={log} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
              <Leaf className="relative w-12 h-12 text-emerald-500/40" />
            </div>
            
            <h5 className="text-white font-bold text-sm tracking-widest uppercase mb-1">
              No Activity Yet
            </h5>
            <p className="text-gray-500 text-xs max-w-50 leading-relaxed">
              Your emission footprint is clean. Start tracking to see your impact here.
            </p>
          </div>
        )}
      </EmissionCard>

      <EmissionCard title="Pending Activity">
        {pendingEmissions && pendingEmissions.length > 0 ? (
          <>
            <div className="flex justify-end p-4">
              <SettleButton onClick={() => mutate()} isLoading={isPending} />
            </div>
            {pendingEmissions?.map((log: any) => (
              <EmissionRow key={log.id} log={log} />
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
              <Leaf className="relative w-12 h-12 text-emerald-500/40" />
            </div>
            
            <h5 className="text-white font-bold text-sm tracking-widest uppercase mb-1">
              No Pending Emissions
            </h5>
          </div>
        )}
      </EmissionCard>
    </div>
  );
}
