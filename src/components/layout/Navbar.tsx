"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  // { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [prevScrolled, setPrevScrolled] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── scrolled বদলানোর সাথে সাথেই (render phase এ) isResizing true করা হচ্ছে,
  // যাতে nav resize শুরু হওয়ার আগেই Framer এর layoutId বন্ধ থাকে।
  // prevScrolled কে state (ref না) দিয়ে track করা হচ্ছে, কারণ render এর সময়
  // ref.current read/write করা React এ নিষিদ্ধ।
  if (scrolled !== prevScrolled) {
    setPrevScrolled(scrolled);
    setIsResizing(true);
  }

  // ─── nav এর CSS resize (duration-700) শেষ হওয়ার পর isResizing false করা,
  // যাতে motion.div + layoutId ফিরে আসে এবং route change এ normal spring
  // animation কাজ করে।
  useEffect(() => {
    if (!isResizing) return;

    const timeout = setTimeout(() => {
      setIsResizing(false);
    }, 750); // nav এর duration-700 (700ms) + সামান্য buffer

    return () => clearTimeout(timeout);
  }, [isResizing]);

  // const getDashboardUrl = () => {
  //   if (user?.role === "ADMIN") return "/admin-dashboard";
  //   return "/user-dashboard";
  // };

  return (
    <>
      <motion.header
        className={`fixed hidden sm:block top-3.5 left-0 right-0 z-50 transition-all duration-300 bg-transparent container-custom`}
        transition={{ duration: 0.7 }}
      >
        <nav
          className={`${scrolled
            ? "max-w-3xl mx-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl px-3 py-2 border-2 border-black dark:border-zinc-300 rounded-2xl shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d]"
            : "container-custom bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-2 border-black dark:border-zinc-700 px-3 py-2 rounded-2xl shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d]"
            } duration-300 transition-all flex items-center justify-between`}
        >
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-2 bg-[#b5ff6d] text-black border-2 border-black px-3 py-1 rounded-lg font-black font-clash text-lg shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform"
              whileTap={{ scale: 0.95 }}
            >
              <span className="tracking-tight">IR</span>
              <span className="text-xs bg-black text-white px-1.5 py-0.5 rounded font-mono font-bold">PRO</span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-extrabold uppercase tracking-wide rounded-lg transition-all border-2 ${isActive
                    ? "bg-[#00f0ff] text-black border-black shadow-[2px_2px_0px_0px_#000]"
                    : "border-transparent text-zinc-900 dark:text-zinc-100 hover:border-black dark:hover:border-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                >
                  {isActive && (
                    <div className="w-2 h-2 rounded-sm bg-black shrink-0" />
                  )}

                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Dashboard Button - ADMIN/USER */}
            {user?.role === "ADMIN" || user?.role === "USER" ? (
              <Link
                href="/admin-dashboard"
                className={`group relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-extrabold uppercase tracking-wide rounded-lg transition-all border-2 ${pathname === "/admin-dashboard"
                  ? "bg-[#ff597b] text-black border-black shadow-[2px_2px_0px_0px_#000]"
                  : "border-black bg-[#ff597b]/90 text-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  }`}
              >
                Dashboard
              </Link>
            ) : null}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-zinc-300 shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
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
                    <HiSun className="text-xl text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HiMoon className="text-xl text-black" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
