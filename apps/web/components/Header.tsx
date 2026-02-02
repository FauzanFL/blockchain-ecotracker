"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import LoadingScreen from "./LoadingScreen";

export default function Header() {
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect, isPending } = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected && !isConnecting) {
      router.push("/");
    }
  }, [isConnected, isConnecting, router]);

  return (
    <header className="flex justify-between items-center px-4 py-2 sticky top-0 right-0 left-0 bg-transparent">
      <div className="">
        <h1 className="text-2xl font-bold">Carbon Tracker</h1>
        <p className="text-sm">
          Account: <span className="text-blue-400"> {address}</span>
        </p>
      </div>

      <button
        onClick={() => disconnect()}
        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 rounded-lg transition-all text-sm font-medium"
      >
        Disconnect Wallet
      </button>

      {isPending && <LoadingScreen message="Disconnecting..." />}
      {!isConnected && <LoadingScreen message="Wallet Not Connected" />}
    </header>
  );
}
