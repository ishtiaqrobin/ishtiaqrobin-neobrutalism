"use client";

import React from "react";
import Link from "next/link";
import SocialIcons from "./SocialIcons";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <div className="container-custom pt-16 sm:pt-24 pb-12">
      <div className="bg-[#FFFDF5] dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl py-14 sm:py-16 px-6 flex flex-col items-center justify-center text-center shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d]">
        {/* ─── AVAILABLE FOR WORK BADGE ─── */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#b5ff6d] text-black border-2 border-black rounded-md shadow-[2px_2px_0px_0px_#000] mb-6 -rotate-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
          </span>

          <span className="text-xs font-black uppercase tracking-wider">
            AVAILABLE FOR FREELANCE & FULL TIME
          </span>
        </div>

        {/* ─── MAIN HEADING ─── */}
        <h2 className="text-4xl sm:text-6xl font-clash font-black uppercase text-black dark:text-white leading-tight tracking-tight mb-8 max-w-3xl">
          LET'S CREATE YOUR <br />
          <span className="inline-block bg-[#00f0ff] text-black px-3 py-0.5 border-3 border-black shadow-[4px_4px_0px_0px_#000] -rotate-1 mt-2">
            NEXT BIG IDEA.
          </span>
        </h2>

        {/* ─── CONTACT ME BUTTON ─── */}
        <div>
          <Link href="/contact">
            <Button size="lg" className="bg-[#ff597b] text-black hover:bg-[#e04565]">
              GET IN TOUCH NOW ★
            </Button>
          </Link>
        </div>

        <div className="block sm:hidden mt-8">
          <SocialIcons />
        </div>
      </div>
    </div>
  );
}
