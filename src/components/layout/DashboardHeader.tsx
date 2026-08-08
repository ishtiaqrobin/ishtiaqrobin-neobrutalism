"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoutButton } from "@/components/modules/auth/LogoutButton";
import { User, Menu } from "lucide-react";
import Link from "next/link";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import Image from "next/image";
import logo from "@/assets/images/logo.webp";
import { PERSONAL_INFO } from "@/utils/constants";
// import { motion } from "framer-motion";
import { motion } from "motion/react";

export function DashboardHeader() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const getDashboardUrl = () => {
    if (user?.role === "ADMIN") return "/admin-dashboard";
    return "/user-dashboard";
  };

  const getUserRoutes = () => {
    if (user?.role === "ADMIN") return adminRoutes[0]?.items || [];
    return userRoutes[0]?.items;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-3 border-black dark:border-zinc-700 bg-white/95 dark:bg-zinc-950/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger Menu */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden rounded-lg w-9 h-9 border-2 border-black shadow-[2px_2px_0px_0px_#000]"
              >
                <Menu className="h-5 w-5 stroke-[2.5]" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 border-r-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900">
              <SheetHeader className="px-4 pt-4 pb-2 border-b-2 border-black">
                <SheetTitle>
                  <Link href="/">
                    <motion.div
                      className="text-2xl font-black font-clash uppercase text-black dark:text-white cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="text-[#00f0ff]">&lt;</span>
                      {PERSONAL_INFO.name.split(" ")[0]}
                      <span className="text-[#00f0ff]"> /&gt;</span>
                    </motion.div>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 pt-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase text-black dark:text-white px-2">
                    {user?.role === "ADMIN" && "ADMIN MENU"}
                    {user?.role === "USER" && "USER DASHBOARD"}
                  </h3>
                  <nav className="space-y-1 pt-2">
                    {getUserRoutes().map((route) => {
                      const Icon = route.icon;
                      const isActive = pathname === route.url;
                      return (
                        <Link
                          key={route.url}
                          href={route.url}
                          onClick={() => setIsSheetOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-black uppercase tracking-wider transition-all border-l-4",
                            isActive
                              ? "bg-[#b5ff6d] text-black border-black shadow-[2px_2px_0px_0px_#000]"
                              : "text-zinc-700 dark:text-zinc-300 border-transparent hover:text-black dark:hover:text-white hover:border-black",
                          )}
                        >
                          {Icon && <Icon className="h-4 w-4 stroke-[2.5]" />}
                          <span>{route.title}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <h2 className="text-lg font-clash font-black uppercase tracking-tight text-black dark:text-white">
            {user?.role === "ADMIN" && "ADMIN DASHBOARD ★"}
            {user?.role === "USER" && "USER DASHBOARD ★"}
          </h2>
        </div>

        {/* Profile Menu */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full focus:outline-none cursor-pointer">
                <Avatar className="h-9 w-9 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <AvatarImage
                    src={user?.image || undefined}
                    alt={user?.name}
                  />
                  <AvatarFallback className="bg-[#00f0ff] text-black font-black text-xs">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-xl shadow-[4px_4px_0px_0px_#000]">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-black font-clash uppercase text-black dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs font-mono font-bold text-zinc-500 truncate">
                    {user?.email}
                  </p>
                  <span className="text-[10px] font-mono font-black uppercase bg-[#b5ff6d] text-black px-1.5 py-0.5 rounded border border-black w-fit mt-1 shadow-[1px_1px_0px_0px_#000]">
                    ROLE: {user?.role}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-black/20" />
              <DropdownMenuItem asChild>
                <Link href={getDashboardUrl()} className="cursor-pointer font-bold text-xs uppercase">
                  <User className="mr-2 h-4 w-4 stroke-[2.5]" />
                  DASHBOARD
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-black/20" />
              <DropdownMenuItem asChild>
                <LogoutButton
                  variant="ghost"
                  className="w-full justify-start px-2 font-black uppercase text-xs text-red-600 hover:bg-red-100 cursor-pointer"
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
