import { Home, Heart, TrendingUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sidebarRoutes = [
  { icon: Home, label: "Home", url: "/", active: true },
  { icon: Heart, label: "Favorites", url: "/favorite" },
  { icon: TrendingUp, label: "Trending", url: "/trending" },
];

export const SidebarRoutes = () => {
  return (
    <nav className="space-y-8 flex-2">
      {sidebarRoutes.map((route) => (
        <Link
          href={route.url}
          key={route.label}
          className={cn(
            "w-full flex items-center justify-start text-gray-300 md:text-lg hover:text-white hover:bg-slate-700/50 p-2 rounded-lg transition duration-200",
            route.active && "bg-slate-700/50 text-white"
          )}
        >
          <route.icon className="w-5 h-5 md:w-6 md:h-6 mr-3" />
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
