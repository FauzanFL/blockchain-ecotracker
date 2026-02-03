"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import LoadingScreen from "./LoadingScreen";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isConnected, isConnecting } = useAccount();
  const router =  useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isConnected && !isConnecting) {
      router.replace("/");
    }
  }, [isConnected, isConnecting, router, pathname]);

  if (isConnecting) return <LoadingScreen message="Checking Connection..." />;
  if (!isConnected) return null;

  return <>{children}</>;
}