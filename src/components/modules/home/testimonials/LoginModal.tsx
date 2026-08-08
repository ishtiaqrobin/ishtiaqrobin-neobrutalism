"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { GoogleAuthButton } from "@/components/modules/auth/GoogleAuthButton";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  callbackURL?: string;
}

export default function LoginModal({
  isOpen,
  onClose,
  callbackURL,
}: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[30vh] px-4 bg-black/60 backdrop-blur-xs transition-all">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full max-w-md bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d] overflow-hidden z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-black dark:border-zinc-700 bg-[#FFFDF5] dark:bg-zinc-950">
          <span className="font-clash font-black uppercase tracking-tight text-lg text-black dark:text-white">
            LOGIN TO SHARE FEEDBACK ★
          </span>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 bg-[#ff597b] text-black border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-center border-l-4 border-black pl-3 py-1">
            Please sign in to post your testimonial & feedback.
          </p>
          <GoogleAuthButton mode="login" callbackURL={callbackURL} />
        </div>
      </motion.div>
    </div>
  );
}
