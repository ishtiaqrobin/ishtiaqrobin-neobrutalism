"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { IProject } from "@/types";

interface ProjectGridCardProps {
  project: IProject;
  index: number;
  showYear?: boolean;
}

export default function ProjectGridCard({
  project,
  index,
  showYear = false,
}: ProjectGridCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      className={`flex flex-col w-full group cursor-pointer ${
        index % 2 === 1 ? "md:mt-12" : ""
      }`}
    >
      <Link href={`/projects/${project.slug}`}>
        <div
          className="w-full p-6 sm:p-8 aspect-6/4 rounded-2xl flex items-center justify-center border-3 border-black dark:border-zinc-300 overflow-hidden relative shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d] bg-white dark:bg-zinc-900 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all"
          style={
            project.bgColor ? { backgroundColor: project.bgColor } : undefined
          }
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-transform duration-300 group-hover:scale-[1.02]">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                sizes="(max-w-7xl) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                <span className="text-sm font-bold uppercase">No Image</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col mt-4 mb-2 px-1">
          <h3 className="text-xl font-black font-clash uppercase tracking-tight text-black dark:text-white mb-2 group-hover:text-[#30af5b] dark:group-hover:text-[#b5ff6d] transition-colors">
            {project.title}
          </h3>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {project.tags.slice(0, 2).map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-0.5 bg-[#FFFDF5] dark:bg-zinc-800 border border-black dark:border-zinc-600 text-xs font-black uppercase text-black dark:text-white rounded-md shadow-[1px_1px_0px_0px_#000]"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 2 && (
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  +{project.tags.length - 2}
                </span>
              )}
            </div>

            {showYear
              ? project.year && (
                  <span className="text-xs font-mono font-bold text-black dark:text-white bg-[#00f0ff] px-2 py-0.5 border border-black rounded shadow-[1px_1px_0px_0px_#000]">
                    {project.year}
                  </span>
                )
              : project.category && (
                  <span className="text-xs font-black uppercase tracking-wider text-black bg-[#b5ff6d] px-2 py-0.5 border border-black rounded shadow-[1px_1px_0px_0px_#000]">
                    {project.category.name}
                  </span>
                )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
