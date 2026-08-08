"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import ShimmerText from "../../shared/ShimmerText";
import { IAward } from "@/types/awards.type";
import { awardService } from "@/services/award.service";

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

export default function AwardsSection() {
  const [awards, setAwards] = useState<IAward[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const { data } = await awardService.getAwards();
        if (data) {
          const published = data.filter((a) => a.isPublished);
          setAwards(published);
        }
      } catch {
        setAwards([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAwards();
  }, []);

  const initialRows = awards.slice(0, INITIAL_COUNT);
  const extraRows = awards.slice(INITIAL_COUNT);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const renderRow = (award: IAward) => {
    const isOpen = expandedRow === award.id;

    return (
      <motion.div
        key={award.id}
        layout="position"
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-300 rounded-xl p-5 mb-4 shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#b5ff6d] cursor-pointer group hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
        onClick={() => toggleRow(award.id)}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="text-lg font-black font-clash uppercase text-black dark:text-white">
              {award.title}
            </h4>
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              {award.subTitle}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono font-black text-black bg-[#00f0ff] px-2.5 py-0.5 border border-black rounded shadow-[1px_1px_0px_0px_#000] uppercase">
              {award.date}
            </span>

            <span
              className="p-1 bg-[#b5ff6d] text-black border border-black rounded shadow-[1px_1px_0px_0px_#000]"
              style={{
                display: "inline-block",
                transition: "transform 300ms cubic-bezier(0.25, 1, 0.5, 1)",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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
            isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div className="pt-4 border-t-2 border-black/10 dark:border-white/10 mt-3">
            <ul className="space-y-1.5 text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {award.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#ff597b] font-black">★</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="container-custom py-16 sm:py-24 border-b-3 border-black dark:border-zinc-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div
          className={[
            "lg:col-span-5",
            showAll ? "lg:sticky lg:top-24" : "relative",
          ].join(" ")}
        >
          <div className="inline-block bg-[#ff597b] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-4">
            ★ HONORS & MILESTONES
          </div>

          <h2 className="text-4xl lg:text-6xl text-black dark:text-white font-clash font-black uppercase tracking-tight mb-4">
            AWARDS & <br /> RECOGNITION
          </h2>
          <p className="text-zinc-800 dark:text-zinc-200 font-bold leading-relaxed text-base border-l-4 border-black dark:border-zinc-400 pl-3">
            A collection of milestones, hackathon wins, and community leadership awards earned across tech conferences and developer challenges.
          </p>
        </div>

        <div className="lg:col-span-7 flex flex-col w-full">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse border-2 border-black"
                />
              ))}
            </div>
          ) : awards.length === 0 ? null : (
            <>
              <div className="flex flex-col">
                {initialRows.map(renderRow)}

                <ExpandableRows show={showAll}>
                  {extraRows.map(renderRow)}
                </ExpandableRows>
              </div>

              {extraRows.length > 0 && (
                <div className="w-full flex justify-center mt-6">
                  <button
                    onClick={() => {
                      if (showAll) {
                        setExpandedRow(null);
                      }
                      setShowAll((prev) => !prev);
                    }}
                    className="px-6 py-2.5 bg-[#b5ff6d] text-black font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>{showAll ? "SHOW LESS" : "SHOW ALL AWARDS ★"}</span>
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
