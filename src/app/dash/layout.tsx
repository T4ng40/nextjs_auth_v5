import { AppBar } from "./_components/AppBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AppBar />
      <main className="p-6">{children}</main>
    </div>
  );
}
