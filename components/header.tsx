"use client";

import qs from "query-string";

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
import { useCallback, useState } from "react";

import { useUser } from "@/hooks/useUser";
import { createClient } from "@/utils/supabase/client";
import { useLoginModal } from "@/hooks/useLoginModal";

import { getSearchMovies } from "@/actions/getSearchMovies";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export const Header = () => {
  const user = useUser();
  const supabase = createClient();
  const params = useSearchParams();
  const [value, setValue] = useState("");
  const router = useRouter();
  const { onOpen } = useLoginModal();

  //Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  //Handle search
  const handleSearch = useCallback(
    async (query: string) => {
      try {
        let currentQuery = {};

        await getSearchMovies(query);

        if (params) {
          currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: Record<string, string | undefined> = {
          ...currentQuery,
          query: value,
        };

        if (params?.get("query") === value) {
          delete updatedQuery.value;

          setValue("");
        }

        //Explore this later with getSearchMovies vs getPopularMovies function
        const url = qs.stringifyUrl({
          url: "/",
          query: updatedQuery,
        });

        router.push(url);
      } catch (error) {
        console.error("Search failed:", error);
      }
    },
    [params, router, value]
  );

  //Prevent api calls on every keystroke so that you don't spam it
  useEffect(() => {
    if (!value) return;

    const timeout = setTimeout(() => {
      handleSearch(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, handleSearch]);

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

          {/*Header image or hero section */}
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

        {/* Search input field */}
        <div className=" sm:flex flex-1 max-w-md mx-4 md:mx-8">
          <div className="relative w-full">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search movies, series, shows..."
              className="pl-10 text-white border-slate-600 bg-slate-700/50 placeholder:text-gray-400 text-sm md:text-base focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />
          </div>
        </div>

        {/*Toggle open */}
        <div className="flex-shrink-0">
          {!user ? (
            <Button
              onClick={() => onOpen()}
              size="default"
              className="text-white bg-slate-800/30 hover:bg-slate-600/50 text-sm md:text-base transition-colors"
            >
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Login</span>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-9 h-9 cursor-pointer ">
                  <AvatarImage src={user.user_metadata.avatar_url || ""} />
                  <AvatarFallback className="text-gray-300 bg-slate-600">
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
