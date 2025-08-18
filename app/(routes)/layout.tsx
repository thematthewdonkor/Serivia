import { Sidebar } from "@/components/sidebar";

const RouteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white ">
      <div className="flex">
        <Sidebar />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default RouteLayout;
