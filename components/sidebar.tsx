import {
  Home,
  Heart,
  Clock,
  TrendingUp,
  Settings,
  HelpCircle,
  Play,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const sidebarRoutes = [
  { icon: Home, label: "Home", url: "/", active: true },
  { icon: Heart, label: "Favorites", url: "/favorite" },
  { icon: Clock, label: "Coming soon", url: "/comingsoon" },
  { icon: TrendingUp, label: "Trending", url: "/trending" },
];

const bottomRoutes = [
  { icon: Settings, label: "Settings", url: "/settings" },
  { icon: HelpCircle, label: "Support", url: "/help" },
];

const continueWatching = [
  {
    title: "The Martian",
    progress: 34,
    duration: "36min",
    image: "/placeholder.jpg",
  },
];

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-80 bg-slate-800/30 p-6 flex-col">
      <nav className="space-y-2">
        {sidebarRoutes.map((route) => (
          <Link
            href={route.url}
            key={route.label}
            className={cn(
              "w-full flex items-center justify-start text-gray-300 hover:text-white hover:bg-slate-700/50 p-2 rounded-lg transition duration-200",
              route.active && "bg-slate-700/50 text-white"
            )}
          >
            <route.icon className="w-5 h-5 mr-3" />
            {route.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 space-y-2">
        {bottomRoutes.map((route) => (
          <Link
            href={route.url}
            key={route.label}
            className="w-full flex items-center justify-start text-gray-300 hover:text-white hover:bg-slate-700/50 p-2 rounded-lg transition duration-200"
          >
            <route.icon className="w-5 h-5 mr-3" />
            {route.label}
          </Link>
        ))}
      </div>

      <div className="mt-8 flex-1">
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-white" />
          <span className="text-white font-medium">Continue Watching</span>
        </div>

        <div className="space-y-3">
          {continueWatching.map((item) => (
            <div key={item.title}>
              <div className="relative group cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="w-full h-24 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                  <div
                    className="h-full bg-white"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>

                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {item.duration}
                </div>

                <div className="absolute bottom-2 right-2 text-white text-xs">
                  {item.progress}%
                </div>
              </div>
              <h4>Title</h4>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
