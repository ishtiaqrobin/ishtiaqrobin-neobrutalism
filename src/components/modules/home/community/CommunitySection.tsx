"use client";

import React from "react";
import {
  FiMessageSquare,
  FiBriefcase,
  FiBookOpen,
  FiHeart,
} from "react-icons/fi";
import ShimmerText from "../../shared/ShimmerText";
import HoverButton from "../../shared/HoverButton";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="p-6 bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl flex flex-col items-start gap-4 shadow-[5px_5px_0px_0px_#000] dark:shadow-[5px_5px_0px_0px_#b5ff6d] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
    <div className="p-3 bg-[#ff597b] text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] text-xl font-bold shrink-0">
      {icon}
    </div>

    <div className="flex flex-col gap-1.5">
      <h3 className="text-lg font-black font-clash uppercase text-black dark:text-white">
        {title}
      </h3>
      <p className="text-xs font-bold leading-relaxed text-zinc-800 dark:text-zinc-200">
        {description}
      </p>
    </div>
  </div>
);

export default function CommunitySection() {
  return (
    <section className="container-custom py-16 sm:py-24 border-b-3 border-black dark:border-zinc-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Right Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left order-first lg:order-none">
          <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-4">
            ★ COMMUNITY LEADERSHIP
          </div>
          <h2 className="text-4xl lg:text-6xl text-black dark:text-white font-clash font-black uppercase tracking-tight mb-4">
            BUILDING A TECH <br /> COMMUNITY
          </h2>
          <p className="text-zinc-800 dark:text-zinc-200 font-bold leading-relaxed text-base border-l-4 border-black dark:border-zinc-400 pl-3">
            I founded a tech initiative connecting designers and engineers globally to learn, innovate, and grow together. We organize hackathons, portfolio reviews, and mentorship sessions.
          </p>

          {/* Stats Area */}
          <div className="flex flex-wrap items-center gap-4 my-8">
            <div className="flex flex-col bg-[#FFFDF5] dark:bg-zinc-800 border-2 border-black p-3.5 rounded-xl shadow-[3px_3px_0px_0px_#000]">
              <span className="text-3xl font-black font-clash text-black dark:text-white">
                5K+
              </span>
              <span className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300">
                MEMBERS
              </span>
            </div>

            <div className="flex flex-col bg-[#FFFDF5] dark:bg-zinc-800 border-2 border-black p-3.5 rounded-xl shadow-[3px_3px_0px_0px_#000]">
              <span className="text-3xl font-black font-clash text-black dark:text-white">
                25+
              </span>
              <span className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300">
                EVENTS
              </span>
            </div>

            <div className="flex flex-col bg-[#FFFDF5] dark:bg-zinc-800 border-2 border-black p-3.5 rounded-xl shadow-[3px_3px_0px_0px_#000]">
              <span className="text-3xl font-black font-clash text-black dark:text-white">
                5+
              </span>
              <span className="text-xs font-black uppercase text-zinc-700 dark:text-zinc-300">
                YEARS
              </span>
            </div>
          </div>

          <Link
            href="https://www.facebook.com/ishtiaqrobin.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-[#b5ff6d] text-black hover:bg-[#a2f059] shadow-[4px_4px_0px_0px_#000]">
              JOIN COMMUNITY NOW ★
            </Button>
          </Link>
        </div>

        {/* Left Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 order-last lg:order-first">
          <FeatureCard
            icon={<FiMessageSquare className="w-5 h-5" />}
            title="Mentoring"
            description="Get connected with mentors that will help you pave your career path."
          />
          <FeatureCard
            icon={<FiBriefcase className="w-5 h-5" />}
            title="Opportunities"
            description="Get Internship and Job opportunities to gain real-world experience."
          />
          <FeatureCard
            icon={<FiBookOpen className="w-5 h-5" />}
            title="Free Resources"
            description="Access open-source templates, design kits, and learning material."
          />
          <FeatureCard
            icon={<FiHeart className="w-5 h-5" />}
            title="Code Reviews"
            description="Get your portfolio and codebase reviewed by senior engineers."
          />
        </div>
      </div>
    </section>
  );
}
