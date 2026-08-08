"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export default function DashboardLayout({
  children,
  admin,
  user,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const pathname = usePathname();

  const segments = pathname?.split("/").filter(Boolean) ?? [];
  const isAdminRoute = pathname?.startsWith("/admin-dashboard");
  const isUserRoute = pathname?.startsWith("/user-dashboard");

  const formatLabel = (segment: string) => {
    return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <SidebarProvider>
      {/* h-screen + overflow-hidden — layout viewport-এ lock */}
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        {/* flex-col + overflow-hidden — শুধু content area scroll করবে */}
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-3 border-b-3 border-black dark:border-zinc-700 bg-white/95 dark:bg-zinc-950/95 backdrop-blur px-4">
            <SidebarTrigger className="-ml-1 flex md:hidden border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] bg-white dark:bg-zinc-900 cursor-pointer" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {segments.map((segment, index) => {
                  const href = `/${segments.slice(0, index + 1).join("/")}`;
                  const isLast = index === segments.length - 1;

                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>
                            {formatLabel(segment)}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={href}>
                            {formatLabel(segment)}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          {/* ✅ data-lenis-prevent — Lenis এই area-তে scroll capture করবে না */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6" data-lenis-prevent>
            {isAdminRoute ? admin : isUserRoute ? user : children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
