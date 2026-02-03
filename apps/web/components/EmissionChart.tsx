"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function EmissionChart({ data }: { data: any[] }) {
  
  const chartData = data?.map((item) => ({
    ...item,
    displayTime: new Date(item.createdAt).toLocaleTimeString([], { 
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit', 
      minute: '2-digit' 
    }),
  }));

  return (
    <div className="h-72 w-full bg-transparent mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
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
    </div>
  );
}