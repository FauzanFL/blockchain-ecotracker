"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function RedirectHandler() {
  const { isConnected, isConnecting } = useAccount();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isConnecting && isConnected && pathname === "/") {
      router.push("/dashboard");
    }
  }, [isConnected, isConnecting, router, pathname]);

  return null;
}
