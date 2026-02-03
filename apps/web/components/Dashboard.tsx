"use client"
import { useEmissions } from "@/hooks/useEmission";
import { useAccount } from "wagmi";
import EmissionChart from "./EmissionChart";
import { StatCard } from "./StatCard";
import { Activity, Database } from "lucide-react";
import { EmissionRow } from "./EmissionRow";

let emissionData = {
  totalAmount: 0,
  totalLogs: 0,
  history: [],
}

export default function Dashboard() {
  const {address} = useAccount();
  const {data} = useEmissions(address);
  
  if (data) emissionData = data;

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

      <div className="bg-[#1e293b]/60 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
          <h4 className="font-bold text-white tracking-widest uppercase text-sm">Latest Activity</h4>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-emerald-500 rounded-full" />
            <div className="w-1 h-1 bg-emerald-500/50 rounded-full" />
            <div className="w-1 h-1 bg-emerald-500/20 rounded-full" />
          </div>
        </div>
        
        <div className="divide-y divide-white/5">
          {emissionData.history.toReversed().slice(0, 5).map((log: any) => (
            <EmissionRow key={log.id} log={log} />
          ))}
        </div>
      </div>
    </div>
  );
}
