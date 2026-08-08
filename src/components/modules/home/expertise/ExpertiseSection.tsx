"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiCode, FiLayers, FiFeather } from "react-icons/fi";
import ShimmerText from "../../shared/ShimmerText";
import TechMarquee from "../../shared/TechMarquee";

interface ExpertiseItem {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  image: string;
}

const EXPERTISE_DATA: ExpertiseItem[] = [
  {
    id: 1,
    title: "Development",
    icon: <FiCode className="w-4 h-4" />,
    description:
      "Building fast, secure, and production-ready applications utilizing Next.js, TypeScript, and robust backend engineering with optimized web vitals.",
    image:
      "https://res.cloudinary.com/dcfhqij0i/image/upload/v1781106429/10002_akgngb.jpg",
  },
  {
    id: 2,
    title: "UI/UX Design",
    icon: <FiLayers className="w-4 h-4" />,
    description:
      "Designing user-centric, modern interfaces that shapes how the audience interacts with the product. Bridging pure visuals with clean product architecture.",
    image:
      "https://res.cloudinary.com/dcfhqij0i/image/upload/v1781106429/10001_rgweal.avif",
  },
  {
    id: 3,
    title: "Branding",
    icon: <FiFeather className="w-4 h-4" />,
    description:
      "Crafting memorable brand identities, high-end design systems, and typography Guidelines that help your product pop out globally across every device.",
    image:
      "https://res.cloudinary.com/dcfhqij0i/image/upload/v1781106210/branding_isulht.webp",
  },
];

export default function ExpertiseSection() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const [currentImage, setCurrentImage] = useState<string>(
    EXPERTISE_DATA[0].image,
  );

  const handleRowClick = (item: ExpertiseItem) => {
    if (expandedId === item.id) {
      setExpandedId(null);
    } else {
      setExpandedId(item.id);
      setCurrentImage(item.image);
    }
  };

  return (
    <section className="container-custom py-16 sm:py-24 border-b-3 border-black dark:border-zinc-700">
      {/* ─── Top Layer ─── */}
      <div className="mb-10">
        <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-4">
          ★ SPECIALITY & CORE SKILLS
        </div>
        <h2 className="text-4xl lg:text-6xl text-black dark:text-white font-clash font-black uppercase tracking-tight">
          AREAS OF EXPERTISE
        </h2>
      </div>

      {/* ─── 2nd Column ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* ─── Left Side ─── */}
        <div className="lg:col-span-6 flex flex-col w-full gap-5 order-first">
          {EXPERTISE_DATA.map((item) => {
            const isOpen = expandedId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleRowClick(item)}
                className={`w-full bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-xl p-5 cursor-pointer transition-all ${
                  isOpen
                    ? "shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d] -translate-x-0.5 -translate-y-0.5"
                    : "shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5"
                }`}
              >
                {/* Item, Title, Icon */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-[#b5ff6d] text-black border border-black rounded-lg shadow-[1px_1px_0px_0px_#000] shrink-0 font-bold">
                      {item.icon}
                    </span>
                    <h3 className="text-lg font-black font-clash uppercase tracking-tight text-black dark:text-white">
                      {item.title}
                    </h3>
                  </div>

                  {/* Chevron Icon */}
                  <span
                    className="p-1.5 bg-[#00f0ff] text-black border border-black rounded-md shadow-[1px_1px_0px_0px_#000] shrink-0 font-bold"
                    style={{
                      display: "inline-block",
                      transition:
                        "transform 300ms cubic-bezier(0.25, 1, 0.5, 1)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </div>

                {/* Expanded Description */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-sm sm:text-base leading-relaxed text-zinc-900 dark:text-zinc-100 font-bold border-t-2 border-black/10 dark:border-white/10 mt-3">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ─── Right Side ─── */}
        <div className="lg:col-span-6 w-full order-last">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-3 border-black dark:border-zinc-300 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d] bg-white dark:bg-zinc-900">
            <AnimatePresence mode="sync">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={currentImage}
                  alt="Expertise showcase"
                  fill
                  sizes="(max-w-7xl) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ─── Tech Marquee ─── */}
      <TechMarquee />
    </section>
  );
}
