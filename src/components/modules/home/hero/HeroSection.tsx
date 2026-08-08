"use client";

import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import HoverButton from "../../shared/HoverButton";
import { PERSONAL_INFO } from "@/utils/constants";
import { HiOutlineHand } from "react-icons/hi";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { settingService } from "@/services/setting.service";
import type { ISettings } from "@/types";

export default function HeroSection() {
  const [settings, setSettings] = useState<ISettings | null>(null);
  const { ref } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    settingService.getSettings().then(({ data }) => {
      if (data) setSettings(data);
    });
  }, []);

  const linkedinUrl = settings?.linkedinUrl || PERSONAL_INFO.linkedin;
  const githubUrl = settings?.githubUrl || PERSONAL_INFO.github;
  const facebookUrl = settings?.facebookUrl || PERSONAL_INFO.facebook;
  const contactEmail = settings?.contactEmail || PERSONAL_INFO.email;

  return (
    <section
      ref={ref}
      className="pt-28 sm:pt-40 pb-16 sm:pb-24 bg-[#FFFDF5] dark:bg-zinc-950 overflow-hidden relative border-b-3 border-black dark:border-zinc-700"
    >
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container-custom relative z-10 flex flex-col justify-between">
        {/* Top Part: Greeting Sticker and Main Title */}
        <div className="flex flex-col items-start w-full">
          {/* Sticker Badge Greeting */}
          <div className="inline-flex items-center gap-2 mb-6 -rotate-2 bg-[#b5ff6d] text-black font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_#000] px-4 py-1.5 rounded-lg">
            <span className="text-xl animate-wave-tilted inline-block">
              <HiOutlineHand />
            </span>
            <span>HEY! I'M ISHTIAQ ROBIN ★ FULL-STACK ARCHITECT</span>
          </div>

          {/* Main title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-clash font-black tracking-tight text-black dark:text-white uppercase leading-none max-w-5xl mb-6">
            CRAFTING{" "}
            <span className="inline-block bg-[#00f0ff] text-black px-3 py-1 rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_#000]">
              PURPOSE DRIVEN
            </span>{" "}
            DIGITAL EXPERIENCES THAT{" "}
            <span className="inline-block bg-[#ff597b] text-black px-3 py-1 rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_#000] mt-2">
              INSPIRE & ENGAGE.
            </span>
          </h1>
        </div>

        {/* Middle Part: Brutalist Divider & Description */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 my-8 p-6 bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 rounded-2xl shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d]">
          <div className="md:col-span-4 flex items-center gap-3">
            <div className="w-4 h-4 bg-[#facc15] border-2 border-black rounded-sm shadow-[1px_1px_0px_0px_#000]" />
            <span className="font-mono font-black text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              [ABOUT MY WORK]
            </span>
          </div>
          <p className="md:col-span-8 text-zinc-900 dark:text-zinc-100 font-bold text-base md:text-lg leading-relaxed">
            I partner with forward-thinking brands globally to engineer pixel-perfect, lightning-fast, and highly accessible web applications that convert and win awards.
          </p>
        </div>

        {/* Bottom Part: Social Buttons and Action Link */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6">
          {/* Social Links as Brutalist Sticker Pills */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { name: "LINKEDIN", href: linkedinUrl, bg: "bg-[#00f0ff]" },
              { name: "GITHUB", href: githubUrl, bg: "bg-[#b5ff6d]" },
              { name: "GMAIL", href: `mailto:${contactEmail}`, bg: "bg-[#facc15]" },
              { name: "FACEBOOK", href: facebookUrl, bg: "bg-[#ff597b]" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black ${social.bg} border-2 border-black px-3.5 py-2 rounded-lg shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all`}
              >
                {social.name}
                <FiArrowUpRight className="w-4 h-4 stroke-[3]" />
              </a>
            ))}
          </div>

          {/* Resume / About Button */}
          <div className="shrink-0">
            <Link href="/about">
              <Button size="lg" className="bg-[#b5ff6d] text-black hover:bg-[#a2f059]">
                KNOW ME BETTER ★
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
