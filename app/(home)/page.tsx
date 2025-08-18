import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="relative min-h-screen">
        <div className="w-80  bg-gray-800">
          <Sidebar />
        </div>
        <Navbar />
        <main>Main</main>
      </div>
    </div>
  );
}
