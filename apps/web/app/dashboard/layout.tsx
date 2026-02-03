import AuthGuard from "@/components/AuthGuard";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <Header />
      <main className="p-4">{children}</main>
    </AuthGuard>
  );
}
