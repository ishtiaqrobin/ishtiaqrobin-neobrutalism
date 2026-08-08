"use client";

import React from "react";
import Image from "next/image";
import { Pin } from "lucide-react";
import { IReview } from "@/types";

// ─── Constants ────────────────────────────────────────────────────────────────

// const SLIDE_DURATION_S = 0.42;

// ─── Circular Progress Ring ───────────────────────────────────────────────────

function CircularProgress({
  animKey,
  size = 80,
  strokeWidth = 2.5,
}: {
  animKey: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 -rotate-90"
      aria-hidden="true"
    >
      {/* Track ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-zinc-200 dark:text-zinc-700"
      />
      {/* Animated progress ring — re-keyed on each card change to restart */}
      <circle
        key={animKey}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        className="text-[#00f0ff] testimonial-ring-progress"
        // #b5ff6d, #00f0ff, #ff597b
        style={{ "--ring-circumference": circumference } as React.CSSProperties}
      />
    </svg>
  );
}

// ─── Card Component ───────────────────────────────────────────────────────────

export default function TestimonialCard({
  item,
  ringKey,
  isExpanded,
  previewCharLimit,
  onExpand,
  onCollapse,
}: {
  item: IReview;
  ringKey: number;
  isExpanded: boolean;
  previewCharLimit: number;
  onExpand: () => void;
  onCollapse: () => void;
}) {
  const needsTruncation = item.comment.length > previewCharLimit;
  const previewText = needsTruncation
    ? item.comment.slice(0, previewCharLimit).trimEnd()
    : item.comment;

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl p-6 sm:p-8 flex flex-col gap-5 shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Avatar + Ring */}
          <div className="relative w-20 h-20 shrink-0">
            <CircularProgress animKey={ringKey} size={80} strokeWidth={3} />
            <div className="absolute inset-[5px] rounded-full overflow-hidden bg-white dark:bg-zinc-900 border-2 border-black">
              <Image
                src={item.user?.image || ""}
                alt={item.user?.name || "Reviewer"}
                width={70}
                height={70}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Name & Role */}
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-black font-clash uppercase tracking-tight text-black dark:text-white">
              {item.user?.name}
            </h3>
            <span className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase px-2.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000] w-fit">
              {item.position}
              {item.companyName && item.companyName !== "Personal"
                ? ` @${item.companyName}`
                : ""}
            </span>
          </div>
        </div>

        {/* Featured Review Pin */}
        {item.isPinned && (
          <div className="bg-[#ff597b] p-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <Pin className="w-5 h-5 text-black fill-black" />
          </div>
        )}
      </div>

      {/* Review text */}
      <div
        className="testimonial-text-wrapper"
        style={
          {
            "--expanded-height": isExpanded ? "600px" : "5.5rem",
          } as React.CSSProperties
        }
      >
        <p className="text-sm sm:text-base leading-relaxed text-zinc-900 dark:text-zinc-100 font-bold border-l-3 border-black dark:border-zinc-400 pl-3">
          {isExpanded ? item.comment : previewText}
          {needsTruncation && !isExpanded && (
            <>
              {"... "}
              <button
                onClick={onExpand}
                className="text-black dark:text-white font-black underline uppercase hover:bg-[#b5ff6d] hover:text-black px-1 rounded transition-colors"
              >
                SEE MORE
              </button>
            </>
          )}
          {isExpanded && (
            <>
              {" "}
              <button
                onClick={onCollapse}
                className="text-black dark:text-white font-black underline uppercase hover:bg-[#ff597b] hover:text-black px-1 rounded transition-colors"
              >
                SHOW LESS
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
