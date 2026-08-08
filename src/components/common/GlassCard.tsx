import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, glowColor = "accent", hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { x: -2, y: -2 } : {}}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d] rounded-xl p-8 relative overflow-hidden group transition-all",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
