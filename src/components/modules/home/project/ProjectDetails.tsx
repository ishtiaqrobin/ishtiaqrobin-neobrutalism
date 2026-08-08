"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiLinkedin,
  FiMail,
  FiShare2,
  FiTwitter,
  FiLink,
} from "react-icons/fi";
import { Home } from "lucide-react";
import { RiArrowRightSLine } from "react-icons/ri";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import OnThisPageMenu from "./OnThisPageMenu";
import type { IProject } from "@/types";
import HoverButton from "../../shared/HoverButton";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface ProjectDetailsProps {
  project: IProject;
  previousProject?: { slug: string; title: string } | null;
  nextProject?: { slug: string; title: string } | null;
}

const labelToHash = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";

export default function ProjectDetails({
  project,
  previousProject,
  nextProject,
}: ProjectDetailsProps) {
  const [showAllTech, setShowAllTech] = useState(false);

  const techStack = project.techStack || [];
  const sections = project.sections || [];

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  const handleShare = () => {
    const url = window.location.href;
    const shareText = [project.title, project.description, "", url].join("\n");

    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ text: shareText }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareText).catch(() => {});
    }
  };

  const renderRichContent = (html: string) => {
    if (!html) return null;
    return (
      <div
        className="prose prose-sm dark:prose-invert max-w-none
          [&_pre]:bg-zinc-950! [&_pre]:text-zinc-100! [&_pre]:border-2 [&_pre]:border-black [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:text-sm [&_pre]:font-mono [&_pre]:shadow-[3px_3px_0px_0px_#000] [&_pre]:my-4
          [&_code:not(pre_code)]:bg-[#00f0ff] [&_code:not(pre_code)]:text-black [&_code:not(pre_code)]:border [&_code:not(pre_code)]:border-black [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:text-xs [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:font-bold
          [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:bg-[#FFFDF5] [&_blockquote]:dark:bg-zinc-800 [&_blockquote]:pl-4 [&_blockquote]:py-3 [&_blockquote]:pr-3 [&_blockquote]:rounded-r-lg [&_blockquote]:font-bold [&_blockquote]:my-4 [&_blockquote]:shadow-[2px_2px_0px_0px_#000]
          [&_ul]:list-disc [&_ul]:list-outside [&_ul]:space-y-1.5 [&_ul]:pl-4 [&_ul]:font-bold
          [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:space-y-1.5 [&_ol]:pl-4 [&_ol]:font-bold
          [&_li]:leading-relaxed
          [&_h1]:text-3xl [&_h1]:font-clash [&_h1]:font-black [&_h1]:uppercase [&_h1]:tracking-tight [&_h1]:text-black [&_h1]:dark:text-white [&_h1]:mb-4
          [&_h2]:text-2xl [&_h2]:font-clash [&_h2]:font-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:text-black [&_h2]:dark:text-white [&_h2]:mb-3
          [&_h3]:text-xl [&_h3]:font-clash [&_h3]:font-black [&_h3]:uppercase [&_h3]:tracking-tight [&_h3]:text-black [&_h3]:dark:text-white [&_h3]:mb-2
          [&_p]:text-base [&_p]:leading-relaxed [&_p]:font-medium [&_p]:text-zinc-800 [&_p]:dark:text-zinc-200 [&_p]:mb-4
          [&_a]:text-black [&_a]:dark:text-white [&_a]:underline [&_a]:decoration-2 [&_a]:decoration-[#00f0ff] [&_a]:font-black
          [&_img]:rounded-xl [&_img]:border-2 [&_img]:border-black [&_img]:shadow-[4px_4px_0px_0px_#000] [&_img]:my-6 [&_img]:max-w-full
          [&_table]:w-full [&_table]:border-2 [&_table]:border-black [&_table]:my-4
          [&_td]:border-2 [&_td]:border-black [&_td]:p-3 [&_td]:font-medium
          [&_th]:border-2 [&_th]:border-black [&_th]:p-3 [&_th]:bg-[#b5ff6d] [&_th]:text-black [&_th]:font-black [&_th]:uppercase
          [&_hr]:my-8 [&_hr]:border-b-2 [&_hr]:border-black"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-16 text-zinc-900 dark:text-zinc-100 transition-colors">
        {/* BREADCRUMBS */}
        <div className="flex justify-between items-center mb-6">
          <nav className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider">
            <Link href="/" className="p-1.5 bg-white dark:bg-zinc-900 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] hover:bg-[#b5ff6d] transition-colors">
              <Home className="w-3.5 h-3.5 text-black dark:text-white" />
            </Link>
            <RiArrowRightSLine className="w-4 h-4 text-black dark:text-white" />
            <Link href="/projects" className="px-2 py-1 bg-white dark:bg-zinc-900 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] hover:bg-[#00f0ff] transition-colors">
              PROJECTS
            </Link>
            <RiArrowRightSLine className="w-4 h-4 text-black dark:text-white" />
            <span className="px-2.5 py-1 bg-[#b5ff6d] text-black border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] truncate max-w-[150px] sm:max-w-none">
              {project.title}
            </span>
          </nav>

          {/* PROJECT YEAR */}
          {project.year && (
            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#00f0ff] text-black text-xs font-mono font-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                {project.year}
              </span>
            </div>
          )}
        </div>

        {/* BANNER IMAGE */}
        {(project.bannerImage || project.thumbnail) && (
          <div className="w-full aspect-7/3 mb-10 relative rounded-2xl overflow-hidden border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d]">
            <Image
              src={project.bannerImage || project.thumbnail!}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* TITLE, DESCRIPTION, METADATA, TECH STACK */}
        <div className="space-y-6 pb-8 border-b-3 border-black dark:border-zinc-700">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <div>
              <h1 className="text-3xl sm:text-5xl font-clash font-black uppercase tracking-tight text-black dark:text-white leading-none">
                {project.title}
              </h1>
            </div>

            {(project.liveUrl || project.githubUrl) && (
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <Link href={project.liveUrl} target="_blank">
                    <Button size="lg" className="bg-[#b5ff6d] text-black hover:bg-[#a2f059] shadow-[3px_3px_0px_0px_#000]">
                      LIVE PREVIEW ★
                    </Button>
                  </Link>
                )}

                {project.githubUrl && (
                  <Link href={project.githubUrl} target="_blank">
                    <Button size="lg" className="bg-[#00f0ff] text-black hover:bg-[#00d0df] shadow-[3px_3px_0px_0px_#000]">
                      GITHUB CODE
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* DESCRIPTION & METADATA GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <p className="text-base sm:text-lg leading-relaxed text-zinc-900 dark:text-zinc-100 font-bold border-l-4 border-black dark:border-zinc-400 pl-3">
                {project.description}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-2 bg-[#FFFDF5] dark:bg-zinc-900 border-2 border-black dark:border-zinc-300 p-4 rounded-xl shadow-[4px_4px_0px_0px_#000]">
              {project.roles && (
                <div className="flex items-start gap-2">
                  <span className="font-black uppercase text-xs w-16 shrink-0 text-black dark:text-white">
                    ROLES:
                  </span>
                  <span className="text-xs font-bold leading-snug text-zinc-800 dark:text-zinc-200">{project.roles}</span>
                </div>
              )}
              {project.client && (
                <div className="flex items-start gap-2">
                  <span className="font-black uppercase text-xs w-16 shrink-0 text-black dark:text-white">
                    CLIENT:
                  </span>
                  <span className="text-xs font-bold leading-snug text-zinc-800 dark:text-zinc-200">{project.client}</span>
                </div>
              )}
            </div>
          </div>

          {/* TECH STACK */}
          {techStack.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {(showAllTech ? techStack : techStack.slice(0, 4)).map(
                (tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white dark:bg-zinc-800 border-2 border-black text-black dark:text-white font-black text-xs uppercase rounded-md shadow-[2px_2px_0px_0px_#000]"
                  >
                    {tech}
                  </span>
                ),
              )}
              {techStack.length > 4 && (
                <button
                  onClick={() => setShowAllTech(!showAllTech)}
                  className="px-3 py-1 bg-[#ff597b] text-black border-2 border-black font-black text-xs uppercase rounded-md shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                >
                  {showAllTech ? "SHOW LESS" : `+${techStack.length - 4} MORE`}
                </button>
              )}
            </div>
          )}
        </div>

        {/* 2 COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pt-10 items-start relative">
          {/* LEFT COLUMN - Section Content */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {sections.length > 0 ? (
              sections.map((section) => {
                const sectionHash = labelToHash(section.label);
                return (
                  <section
                    key={section.id}
                    id={sectionHash}
                    className="scroll-mt-24 bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d]"
                  >
                    <h3 className="text-2xl font-clash font-black uppercase tracking-tight text-black dark:text-white mb-4 border-b-2 border-black pb-2">
                      <a
                        href={`#${sectionHash}`}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.hash = sectionHash;
                        }}
                        className="inline-flex items-center gap-2 group"
                      >
                        {section.label}
                        <FiLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all text-black dark:text-white" />
                      </a>
                    </h3>
                    {renderRichContent(section.content)}
                  </section>
                );
              })
            ) : (
              <div className="text-center py-16 text-zinc-500">
                <p className="text-base font-bold">
                  No detailed sections available for this project.
                </p>
              </div>
            )}

            {/* PREVIOUS / NEXT NAVIGATION */}
            {(previousProject || nextProject) && (
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                {previousProject && (
                  <Link
                    href={`/projects/${previousProject.slug}`}
                    className={cn(
                      "group flex flex-col gap-1 items-start text-left p-4 border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-xl shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all",
                      nextProject ? "w-full sm:w-1/2" : "w-full",
                    )}
                  >
                    <span className="text-xs font-black uppercase tracking-wider text-black dark:text-white inline-flex items-center gap-1 bg-[#00f0ff] px-2 py-0.5 border border-black rounded shadow-[1px_1px_0px_0px_#000]">
                      <MdKeyboardArrowLeft className="w-4 h-4 stroke-[2]" /> PREVIOUS
                    </span>
                    <span className="text-base font-black font-clash uppercase text-black dark:text-white mt-1">
                      {previousProject.title}
                    </span>
                  </Link>
                )}

                {nextProject && (
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className={cn(
                      "group flex flex-col gap-1 items-end text-right p-4 border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-xl shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all",
                      previousProject ? "w-full sm:w-1/2" : "w-full",
                    )}
                  >
                    <span className="text-xs font-black uppercase tracking-wider text-black dark:text-white inline-flex items-center gap-1 bg-[#b5ff6d] text-black px-2 py-0.5 border border-black rounded shadow-[1px_1px_0px_0px_#000]">
                      NEXT <MdKeyboardArrowRight className="w-4 h-4 stroke-[2]" />
                    </span>
                    <span className="text-base font-black font-clash uppercase text-black dark:text-white mt-1">
                      {nextProject.title}
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          {sections.length > 0 && (
            <aside className="lg:col-span-4 lg:sticky lg:top-28 hidden lg:flex flex-col gap-6 self-start transition-all">
              <OnThisPageMenu sections={sections} />

              {/* SOCIALS SHARE */}
              <div className="flex flex-col p-4 bg-[#FFFDF5] dark:bg-zinc-900 border-2 border-black dark:border-zinc-300 rounded-xl shadow-[4px_4px_0px_0px_#000]">
                <div className="text-xs font-black uppercase tracking-wider text-black dark:text-white mb-3">
                  SHARE THIS PROJECT
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${typeof window !== "undefined" ? window.location.href : ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white dark:bg-zinc-800 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] hover:bg-[#00f0ff] transition-colors"
                  >
                    <FiTwitter className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== "undefined" ? window.location.href : ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white dark:bg-zinc-800 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] hover:bg-[#b5ff6d] transition-colors"
                  >
                    <FiLinkedin className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(project.title)}&body=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    className="p-2 bg-white dark:bg-zinc-800 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] hover:bg-[#ff597b] transition-colors"
                  >
                    <FiMail className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
                  </a>
                  <button
                    onClick={handleShare}
                    className="p-2 bg-white dark:bg-zinc-800 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] hover:bg-[#facc15] transition-colors cursor-pointer"
                  >
                    <FiShare2 className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
