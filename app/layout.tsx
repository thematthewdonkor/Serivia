import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthModal } from "@/components/modal/auth-modal";
import { MovieModal } from "@/components/modal/movie-modal";

import Footer from "@/components/footer";

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
        <AuthModal />
        <MovieModal />
        {children}
        <div className="bg-slate-900">
          <Footer />
        </div>
      </body>
    </html>
  );
}
