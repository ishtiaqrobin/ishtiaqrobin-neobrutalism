"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUser, FiGrid, FiSend } from "react-icons/fi";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const BOTTOM_NAV_LINKS: NavItem[] = [
  { name: "Home", href: "/", icon: FiHome },
  { name: "About", href: "/about", icon: FiUser },
  { name: "Projects", href: "/projects", icon: FiGrid },
  { name: "Contact", href: "/contact", icon: FiSend },
];

export default function MobileBottomBar() {
  const pathname = usePathname();

  return (
    /* 
     ─── Mobile Bottom Bar Container ───
     1. With 'lg:hidden' it will only show on mobile and tablet screens.
     2. 'rounded-t-[32px]' is given for smooth top-curve and pill body shape like in the screenshot.
     3. Because of 'fixed bottom-0' it will be perfectly locked at the bottom of the screen.
    */
    <div className="fixed sm:hidden bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur border-t-3 border-black dark:border-zinc-300 rounded-t-2xl px-3 py-2 shadow-[0px_-4px_0px_0px_#000] dark:shadow-[0px_-4px_0px_0px_#b5ff6d]">
      <div className="flex items-center justify-between max-w-md mx-auto gap-1">
        {BOTTOM_NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1.5 rounded-xl transition-all ${isActive
                ? "bg-[#b5ff6d] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] font-black"
                : "text-black dark:text-white border-2 border-transparent font-black hover:bg-[#00f0ff] hover:text-black"
                }`}
            >
              <Icon className="w-5 h-5 stroke-[2.5]" />
              <span className="text-[10px] font-black uppercase tracking-wider">
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
