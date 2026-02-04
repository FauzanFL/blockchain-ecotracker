import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export const SettleButton = ({ onClick, isLoading }: { onClick: () => void, isLoading?: boolean }) => {
  return (
    <div className="flex justify-end p-4">
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(16,185,129,0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        disabled={isLoading}
        className="group flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-emerald-500/20 text-purple-400 hover:text-emerald-400 border border-purple-500/30 hover:border-emerald-500/50 rounded-xl transition-all duration-300 text-sm font-bold disabled:opacity-50"
      >
        {/* <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:-translate-y-full transition-transform duration-500 skew-y-12" /> */}
        
        
        <span className="relative z-10">
          {isLoading ? "Processing..." : "SETTLE ALL"}
        </span>
        
        {!isLoading && (
      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
    )}
      </motion.button>
    </div>
  );
};