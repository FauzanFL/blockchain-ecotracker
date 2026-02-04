
interface EmissionCardProps {
  title: string,
  children: React.ReactNode
}

export default function EmissionCard({ title, children}: EmissionCardProps) {
  return (
    <div className="bg-[#1e293b]/60 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
          <h4 className="font-bold text-white tracking-widest uppercase text-sm">{title}</h4>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-emerald-500 rounded-full" />
            <div className="w-1 h-1 bg-emerald-500/50 rounded-full" />
            <div className="w-1 h-1 bg-emerald-500/20 rounded-full" />
          </div>
        </div>
        <div className="divide-y divide-white/5">
        {children}
        </div>
    </div>
  )
}