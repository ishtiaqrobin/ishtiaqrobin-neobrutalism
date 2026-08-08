"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ShimmerText from "../../shared/ShimmerText";
import { IFaq } from "@/types/faq.type";
import { faqService } from "@/services/faq.service";

export default function FaqSection() {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const { data } = await faqService.getFaqs();
        if (data) {
          const published = data.filter((f) => f.isPublished);
          setFaqs(published);
        }
      } catch {
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="container-custom py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
        <div className="lg:col-span-4">
          <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-4">
            ★ FREQUENTLY ASKED
          </div>

          <h2 className="text-4xl lg:text-6xl font-clash font-black uppercase tracking-tight text-black dark:text-white leading-tight">
            HAVE <br /> QUESTIONS?
          </h2>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-4">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-xl bg-white dark:bg-zinc-900 border-2 border-black animate-pulse"
                />
              ))}
            </div>
          ) : faqs.length === 0 ? null : (
            faqs.map((faq, idx) => {
              const isOpen = openId === faq.id;
              const num = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={faq.id}
                  onClick={() => toggle(faq.id)}
                  className="rounded-xl border-2 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 px-5 cursor-pointer shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between py-4 gap-4">
                    <span className="text-base font-black font-clash uppercase tracking-tight text-black dark:text-white flex items-center gap-3">
                      <span className="bg-[#b5ff6d] text-black border border-black px-2 py-0.5 rounded text-xs font-mono font-black shadow-[1px_1px_0px_0px_#000]">
                        {num}
                      </span>
                      {faq.question}
                    </span>

                    <span
                      className="w-7 h-7 rounded-md bg-[#00f0ff] text-black border border-black flex items-center justify-center shadow-[1px_1px_0px_0px_#000] shrink-0"
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

                  <motion.div
                    initial={false}
                    animate={
                      isOpen
                        ? { height: "auto", opacity: 1, paddingBottom: 16 }
                        : { height: 0, opacity: 0, paddingBottom: 0 }
                    }
                    transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-relaxed border-t-2 border-dashed border-black dark:border-zinc-700 pt-3">
                      {faq.answer}
                    </p>
                  </motion.div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
