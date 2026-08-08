"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Trash2,
  MoreHorizontal,
  Pencil,
  FolderKanban,
  Star,
  ArrowUpDown,
  Link as LinkIcon,
  Github,
  Check,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import type { IProject } from "@/types";
import { deleteProjectAction } from "@/actions/project.action";
import DeleteDialog from "@/components/modules/shared/DeleteDialog";
import TablePagination from "@/components/modules/shared/TablePagination";

interface ProjectTableProps {
  projects: IProject[];
  loading?: boolean;
  searchQuery?: string;
  onEdit: (project: IProject) => void;
  onDeleteSuccess?: () => void;
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  token: string;
}

export default function ProjectTable({
  projects,
  loading = false,
  searchQuery = "",
  onEdit,
  onDeleteSuccess,
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  token,
}: ProjectTableProps) {
  const [deleting, setDeleting] = useState<{
    open: boolean;
    projectId: string | null;
    title: string;
  }>({
    open: false,
    projectId: null,
    title: "",
  });

  const confirmDelete = (project: IProject) => {
    setDeleting({
      open: true,
      projectId: project.id,
      title: project.title || "this project",
    });
  };

  const cancelDelete = () => {
    setDeleting({ open: false, projectId: null, title: "" });
  };

  const doDelete = async () => {
    if (!deleting.projectId) return;
    try {
      const result = await deleteProjectAction(deleting.projectId, token);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      cancelDelete();
      onDeleteSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFDF5] dark:bg-zinc-950 border-b-2 border-black">
            <TableRow className="border-b-2 border-black">
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white w-16">THUMBNAIL</TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">TITLE</TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">CATEGORY</TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">LINKS</TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">SORT</TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">STATUS</TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white text-right">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y-2 divide-black/10 dark:divide-zinc-800">
            {loading ? (
              [...Array(6)].map((_, idx) => (
                <TableRow key={`skeleton-${idx}`} className="align-middle">
                  <TableCell>
                    <Skeleton className="h-10 w-16 rounded-lg border border-black" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32 border border-black" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 rounded-full border border-black" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12 border border-black" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8 border border-black" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 rounded-full border border-black" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-9 rounded-md ml-auto border border-black" />
                  </TableCell>
                </TableRow>
              ))
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 font-bold text-xs text-zinc-500"
                >
                  {searchQuery
                    ? "NO PROJECTS FOUND MATCHING YOUR SEARCH"
                    : "NO PROJECTS FOUND"}
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id} className="align-middle hover:bg-[#00f0ff]/10 transition-colors">
                  <TableCell>
                    <div className="relative h-10 w-16 rounded-md border-2 border-black overflow-hidden bg-muted shrink-0 shadow-[2px_2px_0px_0px_#000]">
                      {project.thumbnail ? (
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#00f0ff]">
                          <FolderKanban className="h-4 w-4 text-black stroke-[2.5]" />
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="font-black text-xs uppercase text-black dark:text-white truncate max-w-44">
                        {project.title}
                      </p>
                      {project.isFeatured && (
                        <Badge className="bg-[#facc15] text-black border border-black font-mono font-black text-[9px] uppercase shadow-[1px_1px_0px_0px_#000]">
                          <Star className="h-2.5 w-2.5 mr-1 fill-black stroke-[2.5]" />
                          FEATURED ★
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge className="bg-[#00f0ff] text-black border border-black font-mono font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000]">
                      {project.category?.name || "—"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-[#b5ff6d] border border-black text-black hover:scale-105 transition-transform shadow-[1px_1px_0px_0px_#000]"
                          title="Live Demo"
                        >
                          <LinkIcon className="h-3.5 w-3.5 stroke-[2.5]" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-[#00f0ff] border border-black text-black hover:scale-105 transition-transform shadow-[1px_1px_0px_0px_#000]"
                          title="GitHub Source"
                        >
                          <Github className="h-3.5 w-3.5 stroke-[2.5]" />
                        </a>
                      )}
                      {!project.liveUrl && !project.githubUrl && (
                        <span className="text-xs font-bold text-zinc-400">—</span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="text-xs font-mono font-bold text-black dark:text-white">
                      #{project.sortOrder ?? 0}
                    </span>
                  </TableCell>

                  <TableCell>
                    {project.isPublished ? (
                      <Badge className="bg-[#b5ff6d] text-black border-2 border-black font-mono font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000] inline-flex items-center gap-1">
                        <Check className="h-3 w-3 stroke-[2.5]" /> PUBLISHED ★
                      </Badge>
                    ) : (
                      <Badge className="bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-mono font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000] inline-flex items-center gap-1">
                        <X className="h-3 w-3 stroke-[2.5]" /> DRAFT
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 border-2 border-black rounded-lg shadow-[1px_1px_0px_0px_#000] cursor-pointer"
                        >
                          <MoreHorizontal className="h-4 w-4 stroke-[2.5]" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-xl shadow-[4px_4px_0px_0px_#000]">
                        <DropdownMenuItem onClick={() => onEdit(project)} className="font-black uppercase text-xs cursor-pointer">
                          <Pencil className="mr-2 h-4 w-4 stroke-[2.5]" />
                          EDIT
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-black/20" />
                        <DropdownMenuItem
                          onClick={() => confirmDelete(project)}
                          className="font-black uppercase text-xs text-red-600 focus:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="mr-2 h-4 w-4 stroke-[2.5]" />
                          DELETE
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          page={page}
          totalPages={totalPages}
          total={total}
          limit={limit}
          pageCount={projects.length}
          label="projects"
          onPageChange={onPageChange}
        />
      </div>

      <DeleteDialog
        isOpen={deleting.open}
        onClose={cancelDelete}
        onConfirm={doDelete}
        title="Delete Project?"
        description={
          <>
            This action cannot be undone. Are you sure you want to permanently
            delete{" "}
            <span className="font-semibold text-primary">
              &quot;{deleting.title}&quot;
            </span>
            ? Thumbnail and all gallery images will be permanently removed from
            storage.
          </>
        }
      />
    </>
  );
}
