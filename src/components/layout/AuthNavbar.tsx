"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "next-themes";
import Link from "next/link";
import { RiHome8Fill } from "react-icons/ri";

export function AuthNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

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
        className="fixed top-2 sm:top-3 left-0 right-0 z-50 transition-all duration-300 px-4"
        transition={{ duration: 0.5 }}
      >
        <nav
          className="max-w-xs sm:max-w-2xl mx-auto px-3 py-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-3 border-black dark:border-zinc-300 rounded-full shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#b5ff6d] sm:shadow-[4px_4px_0px_0px_#000] sm:dark:shadow-[4px_4px_0px_0px_#b5ff6d] flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="text-base sm:text-lg font-black font-clash uppercase bg-[#00f0ff] text-black border-2 border-black px-2.5 sm:px-3 py-0.5 rounded-full shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              IR ★
            </motion.div>
          </Link>

          {/* Back to Home button */}
          <Link href="/">
            <div className="flex items-center gap-1 sm:gap-1.5 border-2 border-black px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#b5ff6d] text-black font-black text-xs uppercase shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] cursor-pointer hover:bg-[#a2f059] transition-colors">
              <RiHome8Fill className="text-xs sm:text-sm" />
              <span>BACK TO HOME ★</span>
            </div>
          </Link>

          {/* Theme toggle */}
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 sm:p-2 rounded-full bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] cursor-pointer"
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
                  <HiSun className="sm:text-base text-sm" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiMoon className="sm:text-base text-sm" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>
    </>
  );
}
