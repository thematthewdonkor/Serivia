"use client";

import { Home, Heart, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarRoutes = [
  { icon: Home, label: "Home", url: "/" },
  { icon: Heart, label: "Favorites", url: "/favorite" },
  { icon: TrendingUp, label: "Trending", url: "/trending" },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isActiveRoute = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  return (
    <nav className="space-y-2 flex-2">
      {sidebarRoutes.map((route) => {
        const isActive = isActiveRoute(route.url);
        const Icon = route.icon;

        return (
          <Link
            href={route.url}
            key={route.label}
            className={cn(
              "w-full flex items-center justify-start text-gray-300 md:text-lg hover:text-white hover:bg-slate-700/50 p-2 rounded-lg transition duration-200 group relative",
              isActive && "bg-slate-700/50 text-white"
            )}
          >
            <Icon
              className={cn(
                "w-5 h-5 md:w-6 md:h-6 mr-3 transition-colors duration-200",
                isActive ? "text-white" : "text-gray-400 group-hover:text-white"
              )}
            />

            {route.label}
          </Link>
        );
      })}
    </nav>
  );
};
