import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Authjs",
  description: "Authentication with Auth.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>{children}</SessionProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
