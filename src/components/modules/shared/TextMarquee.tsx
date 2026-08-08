"use client";

import React from "react";

// Custom text data set
const MARQUEE_TEXTS = [
  "Web Development",
  "Security",
  "Community",
  "Development",
  "Mentoring",
  "Design Systems",
];

export default function TextMarquee() {
  const doubledTexts = [...MARQUEE_TEXTS, ...MARQUEE_TEXTS, ...MARQUEE_TEXTS, ...MARQUEE_TEXTS];

  return (
    <div className="w-full py-4 bg-[#00f0ff] border-y-3 border-black overflow-hidden shadow-[0_4px_0_0_#000]">
      <div className="relative w-full flex overflow-hidden">
        <div className="animate-text-marquee flex flex-row items-center gap-6 whitespace-nowrap pr-6 will-change-transform">
          {doubledTexts.map((text, index) => (
            <div key={index} className="flex items-center gap-6">
              <span className="text-2xl font-black text-black">★</span>
              <span className="text-2xl sm:text-3xl font-clash font-black uppercase tracking-wider text-black">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
