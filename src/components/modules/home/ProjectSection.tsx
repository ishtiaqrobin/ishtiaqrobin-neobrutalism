/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { motion, AnimatePresence } from "motion/react";

import { projectService } from "@/services/project.service";
import { IProject } from "@/types";
import SectionTitle from "@/components/common/SectionTitle";
import { ProjectCard } from "./card/ProjectCard";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectSection() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const loadData = async () => {
      const [projRes, catRes] = await Promise.all([
        projectService.getProjects(),
        projectService.getCategories(),
      ]);

      if (projRes.data) setProjects(projRes.data.filter((p) => p.isPublished));
      if (catRes.data)
        setCategories([{ id: "all", name: "All Works" }, ...catRes.data]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.categoryId === activeCategory);

  if (!isLoading && projects.length === 0) return null;

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 relative overflow-hidden bg-transparent"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10" />

      {/* Engineering Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="absolute inset-0 dark:opacity-[0.1] opacity-[0.09]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 dark:bg-primary-500/15 blur-[120px] rounded-full" />
      </div>

      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="My Works"
          title="Featured Projects"
          description="A curated selection of my digital creations and technical solutions"
        />

        {/* Filter Tabs */}
        {!isLoading && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mt-12 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 border-black cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#b5ff6d] text-black shadow-[3px_3px_0px_0px_#000] -translate-x-0.5 -translate-y-0.5"
                    : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-16/11 w-full rounded-3xl" />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((item) => (
                <ProjectCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
