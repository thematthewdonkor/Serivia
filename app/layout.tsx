import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastProvider } from "@/components/toast-provider";

import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Serivia",
  description: "Discover latest movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${poppins.variable} antialiased`}>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
