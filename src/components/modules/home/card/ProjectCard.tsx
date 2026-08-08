"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ExternalLink, LayoutGrid, Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IProject } from "@/types";

interface ProjectCardProps {
  item: IProject;
}

export function ProjectCard({ item }: ProjectCardProps) {
  const router = useRouter();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="h-full"
    >
      <Card
        onClick={() => router.push(`/projects/${item.slug}`)}
        className="p-0 group relative h-full overflow-hidden rounded-2xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[5px_5px_0px_0px_#000] dark:shadow-[5px_5px_0px_0px_#b5ff6d] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 flex flex-col cursor-pointer gap-0"
      >
        {/* Image Frame */}
        <div
          className="relative aspect-video overflow-hidden border-b-3 border-black dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900"
          style={item.bgColor ? { backgroundColor: item.bgColor } : undefined}
        >
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <LayoutGrid className="h-12 w-12 text-zinc-400" />
            </div>
          )}

          {/* Category Sticker Tag */}
          <div className="absolute top-3 left-3 z-20">
            <span className="px-3 py-1 rounded-md bg-[#00f0ff] text-black border-2 border-black text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000]">
              {item.category?.name}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-10 backdrop-blur-xs">
            {item.liveUrl && (
              <Link
                href={item.liveUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="h-11 w-11 rounded-lg bg-[#b5ff6d] text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] hover:scale-110 transition-transform font-bold"
                title="Live Preview"
              >
                <ExternalLink className="h-5 w-5 stroke-[2.5]" />
              </Link>
            )}

            {item.githubUrl && (
              <Link
                href={item.githubUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="h-11 w-11 rounded-lg bg-white text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] hover:scale-110 transition-transform font-bold"
                title="GitHub Repository"
              >
                <Github className="h-5 w-5 stroke-[2.5]" />
              </Link>
            )}
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-5 flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="text-xl font-black font-clash uppercase tracking-tight mb-2 text-black dark:text-white flex items-center justify-between group-hover:text-[#30af5b] dark:group-hover:text-[#b5ff6d] transition-colors">
              <span>{item.title}</span>
              <ArrowUpRight className="h-5 w-5 stroke-[3] text-black dark:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
            </h3>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold line-clamp-3 mb-4 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-zinc-200 dark:border-zinc-800">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2.5 py-0.5 rounded-md bg-[#FFFDF5] dark:bg-zinc-800 text-black dark:text-white font-extrabold uppercase border border-black dark:border-zinc-600 shadow-[1px_1px_0px_0px_#000]"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
