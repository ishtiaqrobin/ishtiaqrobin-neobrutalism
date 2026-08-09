"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Briefcase } from "lucide-react";
import ShimmerText from "../../shared/ShimmerText";
import { IExperience } from "@/types";
import { experienceService } from "@/services/experience.service";

const INITIAL_COUNT = 4;

function ExpandableRows({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setHeight(el.scrollHeight);
    });
    observer.observe(el);
    setHeight(el.scrollHeight);

    return () => observer.disconnect();
  }, [children]);

  return (
    <div
      style={{
        height: show ? height : 0,
        overflow: "hidden",
        transition: "height 500ms cubic-bezier(0.25, 1, 0.5, 1)",
        willChange: "height",
      }}
      aria-hidden={!show}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export default function Experience() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data } = await experienceService.getExperiences();
        if (data) {
          const published = data.filter((e) => e.isPublished);
          setExperiences(published);
        }
      } catch {
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const initialRows = experiences.slice(0, INITIAL_COUNT);
  const extraRows = experiences.slice(INITIAL_COUNT);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const renderRow = (exp: IExperience) => {
    const isOpen = expandedRow === exp.id;

    return (
      <motion.div
        key={exp.id}
        layout="position"
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-300 rounded-2xl p-5 mb-5 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d] hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer transition-all"
        onClick={() => toggleRow(exp.id)}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#b5ff6d] border-2 border-black shadow-[2px_2px_0px_0px_#000] shrink-0 overflow-hidden">
              {exp.companyLogo ? (
                <Image
                  src={exp.companyLogo}
                  alt={exp.companyName}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Briefcase className="w-6 h-6 text-black" />
              )}
            </div>

            <div className="flex flex-col">
              <h4 className="text-base sm:text-lg font-black font-clash uppercase tracking-tight text-black dark:text-white">
                {exp.position}
              </h4>
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white underline decoration-2 decoration-[#00f0ff] inline-block"
                >
                  @{exp.companyName}
                </a>
              ) : (
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 inline-block">
                  @{exp.companyName}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Render only for large devices */}
            <span className="hidden sm:block bg-[#00f0ff] text-black font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md border border-black shadow-[1px_1px_0px_0px_#000] whitespace-nowrap">
              {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : "PRESENT"}
            </span>

            {/* Render only for small devices */}
            {/* <div className="block sm:hidden text-xs font-bold text-zinc-700 dark:text-zinc-300 inline-block">
              <span className="text-[#00f0ff]">▶</span> {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : "PRESENT"}
            </div> */}

            <span
              className="w-7 h-7 rounded-md bg-[#ff597b] text-black border border-black flex items-center justify-center shadow-[1px_1px_0px_0px_#000]"
              style={{
                transition: "transform 350ms ease",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={
            isOpen ? { height: "auto", opacity: 1, marginTop: 16 } : { height: 0, opacity: 0, marginTop: 0 }
          }
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div className="pt-3 border-t-2 border-dashed border-black dark:border-zinc-700">
            <ul className="space-y-2 text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {exp.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-[#ff597b] font-black text-base">▶</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="w-full container-custom py-16 sm:py-24 border-b-3 border-black dark:border-zinc-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        <div
          className={[
            "lg:col-span-5",
            "transition-all duration-500 ease-out",
            showAll ? "lg:sticky lg:top-24" : "relative",
          ].join(" ")}
        >
          <div className="inline-block bg-[#ff597b] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-4">
            ★ CAREER JOURNEY
          </div>

          <h2 className="text-4xl lg:text-6xl text-black dark:text-white font-clash font-black uppercase tracking-tight mb-4">
            EXPERIENCE
          </h2>
          <p className="text-zinc-800 dark:text-zinc-200 font-bold text-base max-w-sm leading-relaxed border-l-4 border-black dark:border-zinc-400 pl-3">
            I've built mission-critical web software with industry leaders to scale product performance.
          </p>
        </div>

        <div className="lg:col-span-7 flex flex-col w-full">
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl bg-white dark:bg-zinc-900 border-2 border-black animate-pulse"
                />
              ))}
            </div>
          ) : experiences.length === 0 ? null : (
            <>
              <div className="flex flex-col">
                {initialRows.map(renderRow)}

                <ExpandableRows show={showAll}>
                  {extraRows.map(renderRow)}
                </ExpandableRows>
              </div>

              {extraRows.length > 0 && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => {
                      if (showAll) {
                        setExpandedRow(null);
                      }
                      setShowAll((prev) => !prev);
                    }}
                    className="group inline-flex items-center gap-2 cursor-pointer px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#b5ff6d] text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    aria-expanded={showAll}
                  >
                    <span>{showAll ? "SHOW LESS ▲" : "SHOW MORE ▼"}</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
