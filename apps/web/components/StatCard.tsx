"use client";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  color: "emerald" | "purple";
}

export const StatCard = ({ title, value, unit, icon: Icon, color }: StatCardProps) => {
  const themes = {
    emerald: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
    purple: "border-purple-500/20 bg-purple-500/5 text-purple-400",
  };

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className={`p-6 bg-[#1e293b]/40 backdrop-blur-xl border ${themes[color].split(' ')[0]} rounded-3xl relative overflow-hidden group transition-all`}
    >
      {/* Background Icon Decoration */}
      <div className="absolute -top-2 -right-2 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon size={80} />
      </div>

      <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 ${themes[color].split(' ')[2]}`}>
        {title}
      </p>
      
      <div className="flex items-baseline gap-2">
        <h3 className="text-4xl font-black text-white italic tracking-tighter">
          {value}
        </h3>
        {unit && (
          <span className={`${themes[color].split(' ')[2]} font-bold text-sm uppercase italic`}>
            {unit}
          </span>
        )}
      </div>
      
      {/* Decorative Glow */}
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-current to-transparent opacity-20 ${themes[color].split(' ')[2]}`} />
    </motion.div>
  );
};