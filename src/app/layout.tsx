import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ana Carolina - 15 Anos | Baile de Inverno",
  description: "Baile de Inverno - Ana Carolina 15 Anos. Uma noite mágica de festa, dança e momentos inesquecíveis. 21/11/2025 - Casa de Festa Royalle - Av. Brás de Pina, 1867 - Vista Alegre, Rio de Janeiro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>

        {children}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
