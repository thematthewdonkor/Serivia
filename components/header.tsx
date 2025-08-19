import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, Search } from "lucide-react";

import { SidebarRoutes } from "./sidebar-route";
import Image from "next/image";
import { Input } from "./ui/input";
import { AuthModal } from "./auth-modal";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 md:p-6 bg-slate-800/50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <span className="text-lg md:text-xl font-semibold">Serivia</span>
      </div>

      <div className="flex-1 flex items-center justify-between gap-4 md:gap-6">
        <Sheet>
          <SheetTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-slate-700 transition-colors duration-200 hover:text-white"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-slate-900 w-80 text-white z-60 p-6"
          >
            <SidebarRoutes />
          </SheetContent>
        </Sheet>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-4 md:mx-8">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Movies, series, shows..."
              className="pl-10 text-white border-slate-600 bg-slate-700/50 placeholder:text-gray-400 text-sm md:text-base"
            />
          </div>
        </div>

        <div className="">
          <AuthModal>
            <Button>Login</Button>
          </AuthModal>
        </div>
      </div>
    </header>
  );
};
