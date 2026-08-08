"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
}: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  //   1. When Model open then focus on input field and close on ESC
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden"; // Background scroll disable
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-xs transition-all">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d] overflow-hidden flex flex-col z-10"
      >
        {/* Top part: Input field */}
        <div className="flex items-center gap-3 p-4 border-b-2 border-black dark:border-zinc-700">
          <FiSearch className="text-black dark:text-white w-5 h-5 shrink-0 stroke-[3]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="SEARCH PROJECTS BY TITLE OR TECH..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full placeholder:text-zinc-500 bg-transparent font-black font-clash text-base uppercase text-black dark:text-white focus:outline-none"
          />
          {/* ESC Badge */}
          <span
            onClick={onClose}
            className="text-xs font-mono font-black text-black bg-[#ff597b] border-2 border-black px-2.5 py-1 rounded shadow-[2px_2px_0px_0px_#000] cursor-pointer shrink-0 uppercase"
          >
            ESC
          </span>
        </div>

        {/* Bottom part */}
        <div className="flex items-center justify-between p-3.5 bg-[#FFFDF5] dark:bg-zinc-950 border-t-2 border-black dark:border-zinc-700 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#00f0ff] text-black font-black uppercase text-xs border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] cursor-pointer">
              ALL
            </span>
            <span className="px-3 py-1 bg-white dark:bg-zinc-900 text-black dark:text-white font-black uppercase text-xs border-2 border-black rounded transition-colors cursor-pointer">
              PROJECTS
            </span>
          </div>

          <div className="flex items-center gap-2 font-black uppercase text-xs text-black dark:text-white">
            <HiArrowsUpDown className="w-4 h-4 stroke-[2]" /> NAVIGATE
          </div>
        </div>
      </motion.div>
    </div>
  );
}
