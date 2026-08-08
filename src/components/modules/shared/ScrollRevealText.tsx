"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import ShimmerText from "./ShimmerText";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

// ─── Word Component ───
// Hook (useTransform) has been moved outside of map() into a separate component.
// This is the correct pattern for React Rules of Hooks.

function Word({
  word,
  scrollYProgress,
  start,
  end,
}: {
  word: string;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

  return (
    <span className="relative inline-block">
      {/* Blurred base layer */}
      <span className="absolute opacity-15 text-zinc-400 dark:text-zinc-700 font-clash font-black uppercase">
        {word}
      </span>

      {/* Scroll-driven animated layer */}
      <motion.span
        style={{ opacity }}
        className="relative text-black dark:text-white font-clash font-black uppercase"
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function ScrollRevealText({
  text,
  className,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");

  return (
    <div className="w-full flex flex-col items-center text-center justify-center py-20 sm:py-28 bg-[#FFFDF5] dark:bg-zinc-950 border-y-3 border-black dark:border-zinc-700 px-4">
      {/* Top sticker badge */}
      <div className="inline-block -rotate-1 bg-[#b5ff6d] text-black font-black text-xs uppercase tracking-widest px-3.5 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-8">
        ★ MISSION STATEMENT
      </div>

      {/* Main text container */}
      <p
        ref={containerRef}
        className={`text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-zinc-300 dark:text-zinc-800 max-w-5xl flex flex-wrap justify-center gap-x-3 gap-y-3 leading-tight ${className}`}
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;

          return (
            <Word
              key={i}
              word={word}
              scrollYProgress={scrollYProgress}
              start={start}
              end={end}
            />
          );
        })}
      </p>
    </div>
  );
}
