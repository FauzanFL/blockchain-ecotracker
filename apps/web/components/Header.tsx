"use client";
import { useAccount, useDisconnect } from "wagmi";
import LoadingScreen from "./LoadingScreen";

export default function Header() {
  const { address } = useAccount();
  const { disconnect, isPending: isDisconnecting } = useDisconnect();

  return (
    <header className="flex justify-between items-center px-4 py-2 sticky top-0 right-0 left-0 bg-transparent">
      <div className="">
        <h1 className="text-2xl font-bold">Carbon Tracker</h1>
        {address && (
          <p className="text-sm text-gray-400">
            Account: <span className="text-blue-400 font-mono">{address.slice(0,6)}...{address.slice(-4)}</span>
          </p>
        )}
      </div>

      <button
        onClick={() => disconnect()}
        disabled={isDisconnecting}
        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 rounded-lg transition-all text-sm font-medium"
      >
        {isDisconnecting ? "Disconnecting..." : "Disconnect"}
      </button>

      {(isDisconnecting) && <LoadingScreen message="Disconnecting..." />}
    </header>
  );
}
