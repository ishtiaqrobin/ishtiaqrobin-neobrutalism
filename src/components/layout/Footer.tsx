"use client";

import React from "react";
import Link from "next/link";
import SocialIcons from "../modules/shared/SocialIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-10 pb-28 sm:pb-12 bg-white dark:bg-zinc-950 border-t-3 border-black dark:border-zinc-700">
      {/* Infinite Brutalist Ticker Banner */}
      <div className="w-full overflow-hidden bg-[#b5ff6d] text-black border-b-2 border-black py-3 mb-10 select-none">
        <div className="flex whitespace-nowrap animate-text-marquee2 will-change-transform">
          <div className="flex items-center gap-6 font-black font-clash text-lg md:text-xl uppercase tracking-wider px-4">
            <span>LET'S BUILD SOMETHING AWESOME ★</span>
            <span>AVAILABLE FOR WORK ★</span>
            <span>FULL STACK DEVELOPER ★</span>
            <span>UI/UX & INNOVATION ★</span>
            <span>LET'S BUILD SOMETHING AWESOME ★</span>
            <span>AVAILABLE FOR WORK ★</span>
            <span>FULL STACK DEVELOPER ★</span>
            <span>UI/UX & INNOVATION ★</span>
          </div>
          <div className="flex items-center gap-6 font-black font-clash text-lg md:text-xl uppercase tracking-wider px-4">
            <span>LET'S BUILD SOMETHING AWESOME ★</span>
            <span>AVAILABLE FOR WORK ★</span>
            <span>FULL STACK DEVELOPER ★</span>
            <span>UI/UX & INNOVATION ★</span>
            <span>LET'S BUILD SOMETHING AWESOME ★</span>
            <span>AVAILABLE FOR WORK ★</span>
            <span>FULL STACK DEVELOPER ★</span>
            <span>UI/UX & INNOVATION ★</span>
          </div>
        </div>
      </div>

      <div className="container-custom flex flex-col items-center gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
          <div className="flex items-center gap-2">
            <span className="inline-block bg-[#00f0ff] text-black border-2 border-black font-black text-xs px-2.5 py-1 rounded shadow-[2px_2px_0px_0px_#000]">
              ISHTIAQ ROBIN
            </span>
            <p className="text-sm font-bold tracking-wide text-zinc-900 dark:text-zinc-200">
              © {currentYear} All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-bold uppercase">
            <Link
              href="/cookie-policy"
              className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-black dark:border-zinc-600 rounded hover:bg-[#b5ff6d] hover:text-black transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/privacy-policy"
              className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-black dark:border-zinc-600 rounded hover:bg-[#00f0ff] hover:text-black transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-black dark:border-zinc-600 rounded hover:bg-[#ff597b] hover:text-black transition-colors"
            >
              Terms of Service
            </Link>
          </div>

          <div className="hidden sm:block">
            <SocialIcons />
          </div>
        </div>
      </div>
    </footer>
  );
}
