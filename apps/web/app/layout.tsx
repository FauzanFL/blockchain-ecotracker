import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eco Tracker App",
  description: "Track your carbon footprint and reduce your carbon footprint",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}
          <Toaster position="top-center" toastOptions={{
            style: {
              background: "rgba(30, 41, 59, 0.7)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#fff",
              borderRadius: "16px",
              fontSize: "14px",
              fontWeight: "500",
              padding: "12px 24px",
              maxWidth: "400px",
            },
            error: {
              style: {
                border: "1px solid rgba(239, 68, 68, 0.3)",
              },
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
            success: {
              style: {
                border: "1px solid rgba(52, 211, 153, 0.3)",
              },
              iconTheme: {
                primary: "#34d399",
                secondary: "#fff",
              },
            },
          }}/>
        </Providers>
      </body>
    </html>
  );
}
