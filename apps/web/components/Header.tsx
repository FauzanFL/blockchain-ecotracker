"use client";
import { useAccount, useDisconnect } from "wagmi";
import LoadingScreen from "./LoadingScreen";
import { Leaf, LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function Header() {
  const { address, isConnected } = useAccount();
  const { disconnect, isPending: isDisconnecting } = useDisconnect();

  const truncatedAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}` 
    : "";

  const handleDisconnect = () => {
    disconnect();
    toast.dismiss("auth-error");

    toast.success("Disconnected from wallet", { id: "logout-success" });
  };

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="mx-auto flex justify-between items-center bg-[#1e293b]/40 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl shadow-2xl">

        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
            <Leaf className="w-5 h-5 text-emerald-400" />
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic text-white">
            Eco-Track
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {isConnected && (
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">Connected Wallet</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-mono text-emerald-400">{truncatedAddress}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleDisconnect}
            disabled={isDisconnecting}
            className="group flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl transition-all duration-300 text-sm font-medium disabled:opacity-50"
          >
            <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <span>{isDisconnecting ? "Disconnecting..." : "Exit"}</span>
          </button>
        </div>
      </div>

      {isDisconnecting && <LoadingScreen message="Disconnecting..." />}
    </header>
  );
}
