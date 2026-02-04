import AuthGuard from "@/components/AuthGuard";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#0f172a] text-white">
        <Header />
        <main className="mx-auto p-6">{children}</main>
      </div>
    </AuthGuard>
  );
}
