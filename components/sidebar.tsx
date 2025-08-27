import Image from "next/image";
import { Progress } from "./ui/progress";
import { Youtube } from "lucide-react";

import { SidebarRoutes } from "./sidebar-route";

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
    <aside className="hidden md:flex w-80 bg-slate-800/30  border-slate-700/50 p-6 flex-col min-h-screen text-gray-300">
      <SidebarRoutes />

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center justify-center w-8 h-8 bg-slate-700/50 rounded-lg">
            <Youtube className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-lg">
            Continue Watching
          </span>
        </div>

        <div className="space-y-1">
          {continueWatching.map((item) => (
            <div key={item.title}>
              <div className="relative group cursor-pointer">
                <div className="relative h-24 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                <div className="absolute bottom-0 left-0 right-0">
                  <Progress value={item.progress} className="bg-white" />
                </div>

                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {item.duration}
                </div>

                <div className="absolute bottom-2 right-2 text-white text-xs">
                  {item.progress}%
                </div>
              </div>

              <h4 className="text-sm text-white line-clamp-1 mt-2">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
