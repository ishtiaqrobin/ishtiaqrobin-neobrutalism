"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { PERSONAL_INFO } from "@/utils/constants";
import Image from "next/image";
import { aboutService } from "@/services/about.service";
import CircularButton from "../shared/CircularButton";
import HoverButton from "../shared/HoverButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AboutSection() {
  const [aboutMeImg, setAboutMeImg] = useState<string | null>(null);

  const { ref } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [backendResumeUrl, setBackendResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    aboutService.getAbout().then(({ data }) => {
      const img = data?.aboutMeImg;
      if (img) setAboutMeImg(img);
      if (data?.resumeUrl) setBackendResumeUrl(data.resumeUrl);
    });
  }, []);

  const resumeUrl = backendResumeUrl || PERSONAL_INFO.resumeUrl;

  return (
    <section
      id="about"
      ref={ref}
      className="pt-28 pb-24 sm:pt-36 sm:pb-28 relative bg-white dark:bg-zinc-900 border-b-2 border-black dark:border-zinc-700 overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-16 items-center">
          {/* Left - Image with Brutalist Frame */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-[300px] sm:w-[360px] mx-auto">
              {/* Sticker Tag Overlay */}
              <div className="absolute -top-4 -left-4 z-20 bg-[#b5ff6d] text-black font-black text-xs uppercase tracking-wider px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#000] -rotate-3">
                ★ 5+ YEARS EXP
              </div>

              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border-3 border-black dark:border-zinc-300 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d]">
                <Image
                  src={aboutMeImg || PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  width={390}
                  height={520}
                  priority
                  className="w-full h-full aspect-3/4 object-cover"
                />
              </div>

              {/* Circular Button Badge */}
              <div className="absolute -bottom-5 -right-5 z-20">
                <CircularButton />
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 max-w-xl"
          >
            <div className="space-y-6 mb-8">
              <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                WHO I AM
              </div>
              <h2 className="text-black dark:text-white font-clash text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none">
                A <span className="inline-block bg-[#b5ff6d] text-black px-2 py-0.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] -rotate-1">CREATIVE DEVELOPER</span> & DIGITAL ARCHITECT
              </h2>
              <p className="text-zinc-800 dark:text-zinc-200 font-bold text-base sm:text-lg leading-relaxed border-l-4 border-black dark:border-zinc-400 pl-4">
                I collaborate with forward-thinking clients globally to design and engineer high-impact, mission-driven web applications that drive real growth and exceed expectations.
              </p>
            </div>

            {/* Resume Button */}
            <div>
              <Link href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#ff597b] text-black hover:bg-[#e04565]">
                  DOWNLOAD RESUME ★
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
