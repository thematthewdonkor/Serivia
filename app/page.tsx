import { Suspense } from "react";

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { MovieCard } from "@/components/movie-card";
import { Loading } from "@/components/loading";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white ">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Suspense fallback={<Loading />}>
            <Header />
          </Suspense>
          <main className="p-4 md:p-6">
            <HeroSection />
            <div className="mt-6 md:mt-8 pb-4">
              <MovieCard />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
