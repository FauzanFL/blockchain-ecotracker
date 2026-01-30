import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { polygonAmoy } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "EcoTrackerCarbon",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains: [polygonAmoy],
  ssr: true,
});
