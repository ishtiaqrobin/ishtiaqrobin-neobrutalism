"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProjectGridCard from "../card/ProjectGridCard";
import { projectService } from "@/services/project.service";
import { IProject } from "@/types";
import { Button } from "@/components/ui/button";

export default function SelectedProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await projectService.getProjects(undefined, true);
      if (data) setProjects(data);
    };
    fetchData();
  }, []);

  return (
    <section className="container-custom pt-16 sm:pt-24 pb-16 sm:pb-24 border-b-3 border-black dark:border-zinc-700">
      <div className="max-w-2xl mb-12">
        <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-4">
          ★ FEATURED SHOWCASE
        </div>
        <h2 className="text-4xl lg:text-6xl text-black dark:text-white font-clash font-black uppercase tracking-tight mb-3">
          SELECTED PROJECTS
        </h2>
        <p className="text-zinc-800 dark:text-zinc-200 font-bold leading-relaxed text-base border-l-4 border-black dark:border-zinc-400 pl-3">
          Here&apos;s a curated selection showcasing my architectural expertise, frontend artistry, and production-grade engineering.
        </p>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 items-start group/projects-grid"
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project, idx) => (
            <ProjectGridCard
              key={project.id}
              project={project}
              index={idx}
              showYear
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-center pt-16">
        <Link href="/projects">
          <Button size="lg" className="bg-[#b5ff6d] text-black hover:bg-[#a2f059] shadow-[4px_4px_0px_0px_#000]">
            VIEW ALL PROJECTS ★
          </Button>
        </Link>
      </div>
    </section>
  );
}
