"use client";
import { Check, Copy, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface EmissionRowProps {
  log: {
    id: string;
    createdAt: string;
    amount: number;
    txHash: string;
    isSettled: boolean;
  };
}

export const EmissionRow = ({ log }: EmissionRowProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(log.txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="px-6 py-4 grid grid-cols-2 md:grid-cols-4 items-center hover:bg-white/3 transition-colors group"
    >
      <div className="flex flex-col">
        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
          {new Date(log.createdAt).toLocaleDateString()}
        </span>
        <span className="text-sm font-medium text-gray-300">
          {new Date(log.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div className="hidden md:flex flex-col items-start gap-1">
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          Tx Hash
        </span>
        <div className="flex items-center gap-2">
          {log.txHash ? (
            <>
              <code className="text-xs text-purple-400 bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/10 font-mono">
                {truncateHash(log.txHash)}
              </code>

              <button
                onClick={() => handleCopy()}
                className="text-gray-500 hover:text-emerald-400 transition-colors p-1"
                title="Copy Hash"
              >
                {copied ? (
                  <Check size={14} className="text-emerald-500" />
                ) : (
                  <Copy size={14} />
                )}
              </button>

              <a
                href={`https://amoy.polygonscan.com/tx/${log.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-purple-400 transition-colors"
              >
                <ExternalLink size={14} />
              </a>
            </>
          ) : (
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              -
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end md:items-center">
        <span className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
          {log.amount}{" "}
          <span className="text-xs font-normal text-gray-500">kg</span>
        </span>
      </div>

      <div className="hidden md:block">
        <span
          className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
            log.isSettled
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
              : "bg-amber-500/10 text-amber-400 border-amber-500/30"
          }`}
        >
          {log.isSettled ? "✔ Settled" : "⟳ Pending"}
        </span>
      </div>
    </motion.div>
  );
};
