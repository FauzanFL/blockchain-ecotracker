"use client"

import {motion} from "motion/react"
import RedirectHandler from "./RedirectHandler";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Leaf, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0f172a] flex flex-col items-center justify-center text-white font-sans">
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 1000, 0],
            y: [0, 500, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-emerald-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-purple-500/20 rounded-full blur-[120px]"
        />
      </div>

      <main className="relative z-10 flex flex-col items-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-emerald-500/20 rounded-2xl backdrop-blur-xl border border-emerald-500/30">
              <Leaf className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              Eco-Track
            </h1>
          </div>

          <p className="text-gray-400 max-w-md mx-auto text-lg leading-relaxed">
            Monitor Your Carbon Footprint. Earn Rewards. <br />
            <span className="text-emerald-400 font-semibold">
              Secure on Polygon Amoy.
            </span>
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative group p-0.5 rounded-[40px] bg-linear-to-br from-emerald-400/50 via-purple-500/50 to-emerald-400/50 shadow-2xl"
        >
          <div className="bg-[#1e293b]/90 backdrop-blur-2xl px-12 py-16 rounded-[38px] flex flex-col items-center gap-8 border border-white/10">
            {/* Liquid Sphere Element */}
            <div className="relative w-24 h-24 mb-2">
              <motion.div
                animate={{
                  borderRadius: [
                    "40% 60% 70% 30% / 40% 50% 60% 50%",
                    "30% 60% 70% 40% / 50% 60% 30% 60%",
                    "40% 60% 70% 30% / 40% 50% 60% 50%",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute inset-0 bg-linear-to-tr from-emerald-500 to-purple-500 blur-sm opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-10 h-10 text-white fill-current" />
              </div>
            </div>

            {/* THE BUTTON */}
            <div className="scale-125 hover:scale-110 transition-transform duration-300">
              <RedirectHandler />
              <ConnectButton label="CONNECT WALLET" />
            </div>

            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
              Powered by Polygon Amoy
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="absolute bottom-4 text-[10px] text-gray-600 font-mono italic">
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}{" "}
        | 1:12:02 PM WIB
      </footer>
    </div>
  );
}