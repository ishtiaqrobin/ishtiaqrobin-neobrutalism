"use client";

import { useEffect, useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import type { IProjectSection } from "@/types";

interface OnThisPageMenuProps {
  sections: IProjectSection[];
  className?: string;
}

const labelToHash = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";

export default function OnThisPageMenu({
  sections,
  className = "",
}: OnThisPageMenuProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!sections.length) return;

    const ids = sections.map((s) => labelToHash(s.label));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }

      if (ids.length > 0) {
        const firstEl = document.getElementById(ids[0]);
        if (firstEl && window.scrollY < firstEl.offsetTop) {
          setActiveSection("");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveSection(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (!sections.length) return null;

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="inline-flex items-center gap-2 bg-[#00f0ff] text-black font-black text-xs uppercase tracking-wider px-3 py-1.5 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] mb-3 w-fit">
        <RiMenu2Line className="w-4 h-4 stroke-[1]" />
        ON THIS PAGE
      </div>

      {/* Sidebar Navigation Links */}
      <div className="flex flex-col relative py-2 space-y-1">
        {sections.map((section) => {
          const isActive = activeSection === labelToHash(section.label);
          return (
            <a
              key={section.id}
              href={`#${labelToHash(section.label)}`}
              onClick={(e) => {
                e.preventDefault();
                const sectionHash = labelToHash(section.label);
                window.location.hash = sectionHash;
                setActiveSection(sectionHash);
              }}
              className={`relative py-1.5 px-3 text-xs font-black uppercase tracking-wider transition-all rounded-r-lg border-l-4 ${
                isActive
                  ? "bg-[#b5ff6d] text-black border-black shadow-[2px_2px_0px_0px_#000] -translate-x-0.5"
                  : "text-zinc-700 dark:text-zinc-300 border-zinc-400 dark:border-zinc-700 hover:text-black dark:hover:text-white hover:border-black"
              }`}
            >
              {section.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
