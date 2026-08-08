"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LucideIcon } from "lucide-react";
import { motion } from "motion/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { Route } from "@/types";
import { cn } from "@/lib/utils";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  routes: Route[];
  quickActions?: {
    title: string;
    items: {
      title: string;
      url: string;
      icon: LucideIcon;
      tooltip?: string;
    }[];
  };
}

export function AppSidebar({
  routes,
  quickActions,
  ...props
}: AppSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleSignOut = async () => {
    await logout();
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar className="h-screen flex flex-col border-r-3 border-black dark:border-zinc-700 bg-white dark:bg-zinc-950" {...props}>
      {/* Header */}
      <SidebarHeader className="border-b-2 border-black shrink-0 p-4">
        {/* Logo */}
        <Link href="/" className="inline-block">
          <motion.div
            className="text-2xl font-black font-clash uppercase text-black bg-[#00f0ff] border-2 border-black px-3 py-1 rounded-lg shadow-[2px_2px_0px_0px_#000] w-fit cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            IR ★
          </motion.div>
        </Link>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="flex-1 overflow-y-auto min-h-0 py-2">
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 px-3">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-black uppercase tracking-wider transition-all border-l-4 my-0.5",
                          isActive
                            ? "bg-[#b5ff6d] text-black border-black shadow-[2px_2px_0px_0px_#000] font-black"
                            : "text-zinc-700 dark:text-zinc-300 border-transparent hover:text-black dark:hover:text-white hover:border-black",
                        )}
                      >
                        <Link href={item.url} onClick={handleLinkClick}>
                          {item.icon && <item.icon className="h-4 w-4 stroke-[2.5]" />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {quickActions && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 px-3">
              {quickActions.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {quickActions.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.tooltip || item.title}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-black uppercase tracking-wider transition-all border-l-4 my-0.5",
                          isActive
                            ? "bg-[#b5ff6d] text-black border-black shadow-[2px_2px_0px_0px_#000] font-black"
                            : "text-zinc-700 dark:text-zinc-300 border-transparent hover:text-black dark:hover:text-white hover:border-black",
                        )}
                      >
                        <Link href={item.url} onClick={handleLinkClick}>
                          <item.icon className="h-4 w-4 stroke-[2.5]" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t-2 border-black shrink-0 p-3 bg-[#FFFDF5] dark:bg-zinc-900">
        {!user ? (
          <div className="flex items-center gap-3 p-2">
            <Skeleton className="h-8 w-8 rounded-full border-2 border-black" />
            <div className="flex flex-col flex-1 min-w-0 gap-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 p-2 bg-white dark:bg-zinc-800 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000]">
            <Avatar className="h-8 w-8 border border-black shrink-0">
              <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
              <AvatarFallback className="bg-[#00f0ff] text-black font-black text-xs">
                {user?.name?.charAt(0) || ""}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-xs font-black uppercase text-black dark:text-white truncate">
                {user?.name || ""}
              </span>
              <span className="text-[11px] font-mono font-bold text-zinc-500 truncate">
                {user?.email || ""}
              </span>
            </div>
          </div>
        )}
        <div className="pt-2">
          <Button
            onClick={handleSignOut}
            className="w-full justify-center bg-[#ff597b] text-black hover:bg-[#e04565] border-2 border-black font-black uppercase text-xs tracking-wider shadow-[2px_2px_0px_0px_#000] cursor-pointer"
          >
            <LogOut className="h-4 w-4 mr-1.5 stroke-[2.5]" />
            SIGN OUT ★
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
