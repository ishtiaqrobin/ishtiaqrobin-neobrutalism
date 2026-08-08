"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import {
  FiPenTool,
  FiLayers,
  FiCode,
  FiCheckCircle,
  FiCompass,
  FiUploadCloud,
  FiFileText,
} from "react-icons/fi";
import ShimmerText from "../../shared/ShimmerText";

interface ProcessCard {
  id: number;
  number: string;
  icon: React.ReactNode;
  description: string;
}

const WEB_PROCESS_DATA: ProcessCard[] = [
  {
    id: 1,
    number: "01. Discover",
    icon: <FiCompass />,
    description:
      "Understanding the client's goals, target audience, and project scope before writing a single line of code.",
  },
  {
    id: 2,
    number: "02. Plan",
    icon: <FiFileText />,
    description:
      "Defining the tech stack, architecture, and project timeline to keep everything on track 1st day.",
  },
  {
    id: 3,
    number: "03. Design",
    icon: <FiPenTool />,
    description:
      "Crafting clean, responsive UI with a focus on user experience, consistency, and visual hierarchy.",
  },
  {
    id: 4,
    number: "04. Develop",
    icon: <FiCode />,
    description:
      "Building scalable, maintainable full-stack applications using modern frameworks and best practices.",
  },
  {
    id: 5,
    number: "05. Test & Optimize",
    icon: <FiCheckCircle />,
    description:
      "Ensuring performance, security, and cross-browser compatibility before any code goes to prod.",
  },
  {
    id: 6,
    number: "06. Deploy",
    icon: <FiUploadCloud />,
    description:
      "Shipping to production with CI/CD pipelines, and proper hosting setup in place.",
  },
];

export default function DesignProcess() {
  const containerRef = useRef<HTMLDivElement>(null);

  //   1. Global scroll progress
  const { scrollYProgress } = useScroll();

  // 2. Measuring the speed or velocity of scrolling
  const scrollVelocity = useVelocity(scrollYProgress);

  // 3. Using spring physics to reduce jerks (which makes the motion super smooth)
  const velocityFactor = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // 4. X-axis motion value to keep the loop uninterrupted
  const baseX = useMotionValue(0);

  // 5. Transformation Mapping (Range to move left or right based on speed)
  // Scroll down will go left (-) if velocity is positive, scroll up will go right (+) if velocity is negative
  const x = useTransform(baseX, (v) => `${v}%`);

  //   Default base speed (The cards move slowly even if you don't scroll.)
  //   const baseVelocity = -0.5;
  const baseVelocity = -0.5;

  useAnimationFrame((time, delta) => {
    // Scroll speed depends on the scroll momentum
    let moveBy = baseVelocity + velocityFactor.get() * 30;

    // User scrolling down? Positive velocity. User scrolling up? Negative velocity.
    if (moveBy > 0) {
      moveBy = Math.min(moveBy, 5); // Max 5px per frame
    } else {
      moveBy = Math.max(moveBy, -5);
    }

    // Each frame, update the position and set the loop boundaries (-50% to 0%)
    let newX = baseX.get() + moveBy * (delta / 1000);
    if (newX <= -50) {
      newX = 0;
    } else if (newX > 0) {
      newX = -50;
    }
    baseX.set(newX);
  });

  //   Infinite loop trick: duplicate the array to make it infinite
  const doubledCards = [...WEB_PROCESS_DATA, ...WEB_PROCESS_DATA];

  return (
    <section
      ref={containerRef}
      className="w-full py-20 overflow-hidden border-b-3 border-black dark:border-zinc-700"
    >
      {/* ─── HEADING ─── */}
      <div className="container-custom mb-10 flex flex-col items-start">
        <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-4">
          ★ WORKFLOW & METHODOLOGY
        </div>

        <h2 className="text-4xl lg:text-6xl text-black dark:text-white font-clash font-black uppercase tracking-tight mb-4">
          MY DESIGN & DEV PROCESS
        </h2>
        <p className="text-zinc-800 dark:text-zinc-200 font-bold leading-relaxed text-base border-l-4 border-black dark:border-zinc-400 pl-3 max-w-2xl">
          A structured, battle-tested engineering pipeline that guarantees fast execution, scalable code, and stunning user experiences.
        </p>
      </div>

      {/* ─── VELOCITY SCROLL CONTAINER ─── */}
      <div className="container-custom relative w-full flex overflow-hidden py-4">
        <motion.div
          style={{ x }}
          className="flex flex-row items-stretch gap-6 whitespace-nowrap will-change-transform pr-6"
        >
          {doubledCards.map((card, index) => (
            <div
              key={index}
              className="w-[280px] sm:w-[320px] h-full bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl p-6 flex flex-col items-start gap-4 shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d] shrink-0 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              <div className="p-3 bg-[#b5ff6d] text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] text-xl shrink-0 font-bold">
                {card.icon}
              </div>

              {/* Card info */}
              <div className="flex flex-col gap-2 whitespace-normal flex-1">
                <span className="text-xl font-black font-clash uppercase tracking-tight text-black dark:text-white">
                  {card.number}
                </span>
                <p className="text-sm font-bold leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
