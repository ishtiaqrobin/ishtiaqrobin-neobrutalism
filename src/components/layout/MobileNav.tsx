"use client";

import { motion, AnimatePresence } from "motion/react";
import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiCalendarCheckFill } from "react-icons/pi";

export function MobileNav() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed sm:hidden block top-2 left-0 right-0 z-50 transition-all duration-300"
        transition={{ duration: 0.5 }}
      >
        <nav
          className="max-w-xs mx-auto bg-white/95 dark:bg-zinc-950/95 backdrop-blur px-3 py-1.5 border-3 border-black dark:border-zinc-300 rounded-full shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#b5ff6d] flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="text-base font-black font-clash uppercase bg-[#00f0ff] text-black border-2 border-black px-2.5 py-0.5 rounded-full shadow-[1.5px_1.5px_0px_0px_#000] cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              IR ★
            </motion.div>
          </Link>

          {/* Book a call button */}
          <Link href="https://cal.com/ishtiaqrobin">
            <div className="flex items-center gap-1 border-2 border-black px-2.5 py-0.5 rounded-full bg-[#b5ff6d] text-black font-black text-xs uppercase shadow-[1.5px_1.5px_0px_0px_#000] cursor-pointer">
              <PiCalendarCheckFill className="text-xs" />
              <span>BOOK CALL ★</span>
            </div>
          </Link>

          {/* Color mode toggle button */}
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-full bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] cursor-pointer"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiSun className="text-sm" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiMoon className="text-sm" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>
    </>
  );
}
