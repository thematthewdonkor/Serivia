"use client";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Menu, Search } from "lucide-react";
import { SidebarRoutes } from "./sidebar-route";
import Image from "next/image";
import { Input } from "./ui/input";
import { AuthModal } from "./auth-modal";

import { useUser } from "@/hooks/useUser";
import { createClient } from "@/utils/supabase/client";

export const Header = () => {
  const user = useUser();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="flex items-center justify-between p-4 md:p-6 bg-slate-800/30">
      <div className="flex items-center justify-between w-full gap-4 md:gap-6">
        {/* Mobile Menu */}
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Menu className="text-gray-300" />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-slate-800 w-80 border-slate-700 text-white p-6"
              >
                <SidebarRoutes />
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className=" hidden md:flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Serivia Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="text-lg md:text-xl font-semibold text-white">
              Serivia
            </span>
          </div>
        </div>

        <div className=" sm:flex flex-1 max-w-md mx-4 md:mx-8">
          <div className="relative w-full">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search movies, series, shows..."
              className="pl-10 text-white border-slate-600 bg-slate-700/50 placeholder:text-gray-400 text-sm md:text-base focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />
          </div>
        </div>

        <div className="flex-shrink-0">
          {!user ? (
            <AuthModal>
              <Button
                size="default"
                className="text-white bg-slate-800/30 hover:bg-slate-600/50 text-sm md:text-base transition-colors"
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Login</span>
              </Button>
            </AuthModal>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-9 h-9 cursor-pointer">
                  <AvatarImage src={user.user_metadata.avatar_url || ""} />
                  <AvatarFallback>
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-10 bg-slate-800 text-white border-slate-600">
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};
