"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import LoadingScreen from "./LoadingScreen";
import toast from "react-hot-toast";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isConnected, isConnecting } = useAccount();
  const router =  useRouter();

  const hasToasted = useRef(false)

  useEffect(() => {
    if (!isConnected && !isConnecting) {
      if (!hasToasted.current) {
        toast.error("Please connect your wallet", {
          id: "auth-error",
          duration: 4000
        });
      }
      router.push("/");
    }
  }, [isConnected, isConnecting, router]);

  if (isConnecting) return <LoadingScreen message="Checking Connection..." />;
  if (!isConnected) return null;

  return <>{children}</>;
}