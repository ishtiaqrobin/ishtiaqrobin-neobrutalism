"use client";

// import { motion } from "framer-motion";
import { motion } from "motion/react";

import GradientText from "@/components/common/GradientText";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  center = true,
}: SectionTitleProps) {
  return (
    <motion.div
      className={`mb-16 ${center ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {subtitle && (
        <motion.div
          className="mb-4 inline-block"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="inline-block -rotate-1 bg-[#b5ff6d] text-black font-black text-xs md:text-sm uppercase px-3.5 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            ⚡ {subtitle}
          </span>
        </motion.div>
      )}
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-clash tracking-tight text-black dark:text-white uppercase mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-zinc-700 dark:text-zinc-300 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
      <div
        className={`mt-6 flex items-center gap-2 ${
          center ? "justify-center" : ""
        }`}
      >
        <div className="w-16 h-2 rounded-sm bg-[#b5ff6d] border-2 border-black dark:border-zinc-300 shadow-[2px_2px_0px_0px_#000]" />
        <div className="w-3 h-3 rounded-sm bg-[#00f0ff] border-2 border-black dark:border-zinc-300 shadow-[1px_1px_0px_0px_#000]" />
        <div className="w-16 h-2 rounded-sm bg-[#ff597b] border-2 border-black dark:border-zinc-300 shadow-[2px_2px_0px_0px_#000]" />
      </div>
    </motion.div>
  );
}
