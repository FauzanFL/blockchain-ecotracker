import RedirectHandler from "@/components/RedirectHandler";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <RedirectHandler />
      <ConnectButton />
    </div>
  );
}
