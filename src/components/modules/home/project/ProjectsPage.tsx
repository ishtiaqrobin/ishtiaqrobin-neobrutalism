"use client";

import React, { useOptimistic, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import ShimmerText from "../../shared/ShimmerText";
import SearchModal from "../../shared/SearchModal";
import ProjectGridCard from "../card/ProjectGridCard";
import type { IProject } from "@/types";

interface ProjectsPageProps {
  projects: IProject[];
  categories: { id: string; name: string }[];
}

export default function ProjectsPage({
  projects,
  categories,
}: ProjectsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categoryNames = ["All", ...categories.map((c) => c.name)];
  const categoryParam = searchParams.get("category");
  const selectedCategoryFromUrl =
    categoryParam && categoryNames.includes(categoryParam)
      ? categoryParam
      : "All";
  const [filters, setOptimisticFilters] = useOptimistic(
    {
      searchQuery: searchParams.get("q") || "",
      activeCategory: selectedCategoryFromUrl,
    },
    (_, nextFilters: { searchQuery: string; activeCategory: string }) =>
      nextFilters,
  );
  const { searchQuery, activeCategory } = filters;

  const updateUrlFilters = (nextQuery: string, nextCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextQuery.trim()) {
      params.set("q", nextQuery);
    } else {
      params.delete("q");
    }

    if (nextCategory !== "All") {
      params.set("category", nextCategory);
    } else {
      params.delete("category");
    }

    const queryString = params.toString();
    startTransition(() => {
      setOptimisticFilters({
        searchQuery: nextQuery,
        activeCategory: nextCategory,
      });
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  };

  const handleSearchChange = (nextQuery: string) => {
    updateUrlFilters(nextQuery, activeCategory);
  };

  const handleCategoryChange = (nextCategory: string) => {
    updateUrlFilters(searchQuery, nextCategory);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "All" ||
      (project.category && project.category.name === activeCategory);
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="container-custom pt-28 sm:pt-40 pb-16 min-h-screen border-b-3 border-black dark:border-zinc-700">
      <div className="mb-10 max-w-2xl">
        <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-4">
          ★ MY PROJECT PORTFOLIO
        </div>
        <h1 className="text-4xl lg:text-6xl text-black dark:text-white font-clash font-black uppercase tracking-tight leading-none">
          CREATING NEXT LEVEL DIGITAL PRODUCTS
        </h1>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div
          onClick={() => setIsSearchOpen(true)}
          className="relative group cursor-pointer w-full md:w-72"
        >
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black dark:text-white w-4 h-4 stroke-[3]" />
          <div className="w-full pl-11 pr-4 py-2.5 text-xs font-black uppercase tracking-wider bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-300 rounded-xl text-black dark:text-white shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#b5ff6d] flex items-center">
            {searchQuery || "SEARCH PROJECTS..."}
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              searchQuery={searchQuery}
              setSearchQuery={handleSearchChange}
            />
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categoryNames.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all border-2 border-black cursor-pointer ${
                  isSelected
                    ? "bg-[#b5ff6d] text-black shadow-[3px_3px_0px_0px_#000] -translate-x-0.5 -translate-y-0.5"
                    : "bg-white dark:bg-zinc-900 text-black dark:text-white shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        layout
        aria-busy={isPending}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 sm:gap-y-0 items-start"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <ProjectGridCard key={project.id} project={project} index={idx} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg text-text-primary/60">No projects found.</p>
        </div>
      )}
    </section>
  );
}
