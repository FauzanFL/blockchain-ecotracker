"use client";
import { useMemo, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function EmissionChart({ data }: { data: any[] }) {
  const [filter, setFilter] = useState("ALL")

  const filteredData = useMemo(() => {
    if (!data) return [];

    const now = new Date();
    let result = [...data];

    if (filter === "24H") {
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      result = data.filter(item => new Date(item.createdAt) >= oneDayAgo);
    } else if (filter === "7D") {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      result = data.filter(item => new Date(item.createdAt) >= sevenDaysAgo);
    } else if (filter === "30D") {
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      result = data.filter(item => new Date(item.createdAt) >= thirtyDaysAgo);
    }

    return result.map((item) => ({
      ...item,
      displayTime: new Date(item.createdAt).toLocaleTimeString([], {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }))
  }, [data, filter])
  

  return (
    <div className="h-72 w-full bg-transparent mt-4">
      <div className="flex justify-end gap-2 mb-6">
        {["ALL", "24H", "7D", "30D"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all border ${
              filter === f
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                : "bg-white/5 text-gray-500 border-white/10 hover:bg-white/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="colorEmerald" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#ffffff" 
              opacity={0.05} 
            />
            
            <XAxis 
              dataKey="displayTime" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              dy={10}
            />
            
            <YAxis 
              hide={true} // Sembunyikan YAxis untuk tampilan lebih clean/minimalis
              domain={['auto', 'auto']}
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#fff'
              }}
              itemStyle={{ color: '#10b981' }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
              cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '4 4' }}
            />

            <Area
              type="monotone"
              dataKey="amount" // Perbaikan typo ammount -> amount
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorEmerald)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center border border-dashed border-white/10 rounded-2xl">
          <p className="text-gray-500 text-sm italic">No data available for this period</p>
        </div>
      )}
    </div>
  );
}