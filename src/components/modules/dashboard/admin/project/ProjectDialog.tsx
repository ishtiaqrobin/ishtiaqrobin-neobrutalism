"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Loader2,
  Check,
  Star,
  Link as LinkIcon,
  Github,
  User,
  Briefcase,
  Laptop,
  Calendar,
  FileSliders,
  Tags,
} from "lucide-react";
import Image from "next/image";
import type { IProject, IProjectSection } from "@/types";
import {
  createProjectAction,
  updateProjectAction,
} from "@/actions/project.action";
import { useImageUpload } from "@/hooks/useImageUpload";
import ProjectSectionsEditor from "./ProjectSectionsEditor";
import { Category } from "@/types/category.type";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: IProject | null;
  categories: Category[];
  mode: "add" | "edit";
  onSuccess?: () => void;
  token: string;
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <Label
      htmlFor={htmlFor}
      className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
    >
      {children}
    </Label>
  );
}

export default function ProjectDialog({
  open,
  onOpenChange,
  project,
  categories,
  mode,
  onSuccess,
  token,
}: ProjectDialogProps) {
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugAuto, setSlugAuto] = useState(true);
  const [sections, setSections] = useState<IProjectSection[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const {
    file: thumbnailFile,
    isCompressing,
    handleFileChange: handleThumbnailChange,
    reset: resetThumbnail,
    inputRef: thumbnailRef,
  } = useImageUpload({ maxSizeMB: 5 });

  const {
    file: bannerImageFile,
    isCompressing: isBannerCompressing,
    handleFileChange: handleBannerImageChange,
    reset: resetBannerImage,
    inputRef: bannerImageRef,
  } = useImageUpload({ maxSizeMB: 5 });

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    if (open) {
      if (mode === "edit" && project) {
        setTitle(project.title || "");
        setSlug(project.slug || "");
        setSlugAuto(false);
        setSections(project.sections || []);
      } else {
        setTitle("");
        setSlug("");
        setSlugAuto(true);
        setSections([]);
      }
      resetThumbnail();
      resetBannerImage();
    }
  }, [open, mode, project]);

  const handleClose = () => {
    resetThumbnail();
    resetBannerImage();
    setSections([]);
    onOpenChange(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (slugAuto) {
      setSlug(slugify(val));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugAuto(false);
    setSlug(e.target.value);
  };

  const buildFormData = (): FormData => {
    const form = formRef.current;
    if (!form) return new FormData();

    const fd = new FormData(form);
    const out = new FormData();

    out.append("title", fd.get("title") as string);
    out.append("slug", fd.get("slug") as string);
    out.append("description", fd.get("description") as string);
    out.append("categoryId", fd.get("categoryId") as string);

    const liveUrl = fd.get("liveUrl") as string;
    const githubUrl = fd.get("githubUrl") as string;
    const sortOrder = fd.get("sortOrder") as string;
    const roles = fd.get("roles") as string;
    const client = fd.get("client") as string;
    const year = fd.get("year") as string;
    const bgColor = fd.get("bgColor") as string;
    if (liveUrl) out.append("liveUrl", liveUrl);
    if (githubUrl) out.append("githubUrl", githubUrl);
    if (sortOrder) out.append("sortOrder", sortOrder);
    if (roles) out.append("roles", roles);
    if (client) out.append("client", client);
    if (year) out.append("year", year);
    if (bgColor) out.append("bgColor", bgColor);

    const tagsRaw = fd.get("tags") as string;
    const tags = tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    out.append("tags", JSON.stringify(tags));

    const techStackRaw = fd.get("techStack") as string;
    const techStack = techStackRaw
      ? techStackRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];
    out.append("techStack", JSON.stringify(techStack));

    if (sections.length > 0) {
      out.append("sections", JSON.stringify(sections));
    }

    out.append("isFeatured", String(fd.get("isFeatured") === "on"));
    out.append("isPublished", String(fd.get("isPublished") === "on"));

    if (thumbnailFile) out.append("thumbnail", thumbnailFile);
    if (bannerImageFile) out.append("bannerImage", bannerImageFile);

    return out;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const toastId = toast.loading(
      mode === "add" ? "Creating project..." : "Updating project...",
    );

    try {
      const formData = buildFormData();

      if (mode === "add") {
        const result = await createProjectAction(formData, token);
        if (!result.success) {
          toast.error(result.message, { id: toastId });
          return;
        }
        toast.success(result.message, { id: toastId });
      } else if (mode === "edit" && project?.id) {
        const result = await updateProjectAction(project.id, formData, token);
        if (!result.success) {
          toast.error(result.message, { id: toastId });
          return;
        }
        toast.success(result.message, { id: toastId });
      }

      onSuccess?.();
      handleClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Operation failed", {
        id: toastId,
      });
    } finally {
      setSaving(false);
    }
  };

  const isEdit = mode === "edit";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl! max-h-[90vh] overflow-y-auto border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-2xl shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d]">
        <form ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader className="border-b-2 border-black pb-3">
            <DialogTitle className="font-clash font-black uppercase text-xl text-black dark:text-white">
              {isEdit ? "EDIT PROJECT ★" : "ADD NEW PROJECT ★"}
            </DialogTitle>
            <DialogDescription className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-0.5">
              {isEdit
                ? "Update details, sections, and images for your project."
                : "Add a new project case study to your portfolio."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-1 sm:col-span-2">
                <FieldLabel htmlFor="title">
                  PROJECT TITLE <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="e.g. E-Commerce Dashboard"
                  required
                  className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 h-10"
                />
              </div>

              {/* Slug */}
              <div className="space-y-1 sm:col-span-2">
                <FieldLabel htmlFor="slug">
                  SLUG <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <FileSliders className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black dark:text-white stroke-[2.5]" />
                  <Input
                    id="slug"
                    name="slug"
                    value={slug}
                    onChange={handleSlugChange}
                    placeholder="e.g. e-commerce-dashboard"
                    required
                    className="rounded-lg border-2 border-black font-mono font-bold text-xs bg-zinc-50 dark:bg-zinc-950 h-10 pl-8"
                  />
                </div>
                <p className="text-[10px] font-bold text-zinc-500 mt-0.5">
                  Auto-generated from title. Edit manually if needed.
                </p>
              </div>

              {/* Category */}
              <div className="space-y-1">
                <FieldLabel htmlFor="categoryId">
                  CATEGORY <span className="text-red-500">*</span>
                </FieldLabel>
                <Select
                  name="categoryId"
                  defaultValue={project?.categoryId || ""}
                >
                  <SelectTrigger id="categoryId" className="rounded-lg border-2 border-black font-bold text-xs bg-zinc-50 dark:bg-zinc-950 h-10 shadow-[2px_2px_0px_0px_#000]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_#000]" position="popper">
                    {categories.filter((cat) => cat.isPublished).map((cat) => (
                      <SelectItem key={cat.id} value={cat.id} className="font-bold text-xs uppercase cursor-pointer">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Order */}
              <div className="space-y-1">
                <FieldLabel htmlFor="sortOrder">SORT ORDER</FieldLabel>
                <Input
                  id="sortOrder"
                  type="number"
                  name="sortOrder"
                  defaultValue={project?.sortOrder ?? 0}
                  min={0}
                  className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 h-10"
                />
              </div>

              {/* Thumbnail */}
              <div className="space-y-1 sm:col-span-2">
                <FieldLabel htmlFor="thumbnail">THUMBNAIL IMAGE</FieldLabel>
                <Input
                  id="thumbnail"
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  ref={thumbnailRef}
                  onChange={handleThumbnailChange}
                  disabled={isCompressing}
                  className="rounded-lg border-2 border-black font-bold cursor-pointer"
                />
                {isCompressing ? (
                  <p className="text-xs font-bold text-black flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Compressing…
                  </p>
                ) : (
                  <p className="text-[11px] font-bold text-zinc-500">
                    Max 5MB · Auto-compressed to WebP
                  </p>
                )}
                {project?.thumbnail && (
                  <div className="flex items-center gap-2 mt-1">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      width={64}
                      height={40}
                      className="rounded-md border border-black object-cover shadow-[1px_1px_0px_0px_#000]"
                    />
                    <span className="text-[10px] font-mono font-bold text-zinc-500 truncate max-w-48">
                      {project.thumbnail.split("/").pop()}
                    </span>
                  </div>
                )}
              </div>

              {/* Banner Image */}
              <div className="space-y-1 sm:col-span-2">
                <FieldLabel htmlFor="bannerImage">BANNER IMAGE</FieldLabel>
                <Input
                  id="bannerImage"
                  type="file"
                  name="bannerImage"
                  accept="image/*"
                  ref={bannerImageRef}
                  onChange={handleBannerImageChange}
                  disabled={isBannerCompressing}
                  className="rounded-lg border-2 border-black font-bold cursor-pointer"
                />
                {isBannerCompressing ? (
                  <p className="text-xs font-bold text-black flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Compressing…
                  </p>
                ) : (
                  <p className="text-[11px] font-bold text-zinc-500">
                    Optional · Larger hero/banner image for project details page
                  </p>
                )}
                {project?.bannerImage && (
                  <div className="flex items-center gap-2 mt-1">
                    <Image
                      src={project.bannerImage}
                      alt={project.title}
                      width={96}
                      height={48}
                      className="rounded-md border border-black object-cover aspect-video shadow-[1px_1px_0px_0px_#000]"
                    />
                    <span className="text-[10px] font-mono font-bold text-zinc-500 truncate max-w-48">
                      {project.bannerImage.split("/").pop()}
                    </span>
                  </div>
                )}
              </div>

              {/* Year */}
              <div className="space-y-1">
                <FieldLabel htmlFor="year">PROJECT YEAR</FieldLabel>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black dark:text-white stroke-[2.5]" />
                  <Input
                    id="year"
                    name="year"
                    defaultValue={project?.year || ""}
                    placeholder="e.g. 2024"
                    className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 h-10 pl-8"
                  />
                </div>
              </div>

              {/* bgColor */}
              <div className="space-y-1">
                <FieldLabel htmlFor="bgColor">CARD BACKGROUND COLOR</FieldLabel>
                <div className="flex items-center gap-2">
                  <Input
                    id="bgColor"
                    name="bgColor"
                    defaultValue={project?.bgColor || ""}
                    placeholder="e.g. #fef08a"
                    className="rounded-lg border-2 border-black font-mono font-bold text-xs bg-zinc-50 dark:bg-zinc-950 h-10 flex-1"
                  />
                  {project?.bgColor && (
                    <div
                      className="h-10 w-10 rounded-lg border-2 border-black shrink-0 shadow-[1px_1px_0px_0px_#000]"
                      style={{ backgroundColor: project.bgColor }}
                    />
                  )}
                </div>
              </div>

              {/* Live URL */}
              <div className="space-y-1">
                <FieldLabel htmlFor="liveUrl">LIVE URL</FieldLabel>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black dark:text-white stroke-[2.5]" />
                  <Input
                    id="liveUrl"
                    name="liveUrl"
                    defaultValue={project?.liveUrl || ""}
                    placeholder="https://..."
                    className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 h-10 pl-8"
                  />
                </div>
              </div>

              {/* GitHub URL */}
              <div className="space-y-1">
                <FieldLabel htmlFor="githubUrl">GITHUB URL</FieldLabel>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black dark:text-white stroke-[2.5]" />
                  <Input
                    id="githubUrl"
                    name="githubUrl"
                    defaultValue={project?.githubUrl || ""}
                    placeholder="https://github.com/..."
                    className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 h-10 pl-8"
                  />
                </div>
              </div>

              {/* Roles */}
              <div className="space-y-1">
                <FieldLabel htmlFor="roles">ROLES</FieldLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black dark:text-white stroke-[2.5]" />
                  <Input
                    id="roles"
                    name="roles"
                    defaultValue={project?.roles || ""}
                    placeholder="e.g. Full-stack Developer"
                    className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 h-10 pl-8"
                  />
                </div>
              </div>

              {/* Client */}
              <div className="space-y-1">
                <FieldLabel htmlFor="client">CLIENT</FieldLabel>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black dark:text-white stroke-[2.5]" />
                  <Input
                    id="client"
                    name="client"
                    defaultValue={project?.client || ""}
                    placeholder="e.g. Personal Project, Company Name"
                    className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 h-10 pl-8"
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-1 sm:col-span-2">
                <FieldLabel htmlFor="techStack">
                  TECH STACK (COMMA SEPARATED) <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Laptop className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black dark:text-white stroke-[2.5]" />
                  <Input
                    id="techStack"
                    name="techStack"
                    defaultValue={(project?.techStack || []).join(", ") || ""}
                    placeholder="React, Next.js, TypeScript, Tailwind CSS"
                    className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 h-10 pl-8"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1 sm:col-span-2">
                <FieldLabel htmlFor="tags">
                  TAGS (COMMA SEPARATED) <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Tags className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black dark:text-white stroke-[2.5]" />
                  <Input
                    id="tags"
                    name="tags"
                    defaultValue={project?.tags.join(", ") || ""}
                    placeholder="React, Next.js, Tailwind CSS"
                    className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 h-10 pl-8"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1 sm:col-span-2">
                <FieldLabel htmlFor="description">
                  DESCRIPTION <span className="text-red-500">*</span>
                </FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={project?.description || ""}
                  placeholder="Describe the project..."
                  required
                  className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 resize-none"
                  rows={4}
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl border-2 border-black bg-zinc-50 dark:bg-zinc-950 shadow-[2px_2px_0px_0px_#000]">
                <Label
                  htmlFor="isFeatured"
                  className="flex items-center gap-2 cursor-pointer text-xs font-black uppercase text-black dark:text-white"
                >
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 stroke-[2.5]" />
                  FEATURED PROJECT ★
                </Label>
                <Switch
                  id="isFeatured"
                  name="isFeatured"
                  defaultChecked={project?.isFeatured || false}
                />
              </div>

              {/* Published toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl border-2 border-black bg-zinc-50 dark:bg-zinc-950 shadow-[2px_2px_0px_0px_#000]">
                <Label
                  htmlFor="isPublished"
                  className="flex items-center gap-2 cursor-pointer text-xs font-black uppercase text-black dark:text-white"
                >
                  <Check className="h-4 w-4 text-green-500 stroke-[2.5]" />
                  PUBLISHED STATUS
                </Label>
                <Switch
                  id="isPublished"
                  name="isPublished"
                  defaultChecked={project ? project.isPublished : true}
                />
              </div>

              {/* Sections */}
              <div className="sm:col-span-2">
                <ProjectSectionsEditor
                  sections={sections}
                  onChange={setSections}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 pt-4 border-t-2 border-black">
            <Button
              type="button"
              onClick={handleClose}
              disabled={saving}
              className="bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              disabled={saving || isCompressing || isBannerCompressing}
              className="bg-[#b5ff6d] text-black hover:bg-[#a2f059] border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "SAVE CHANGES ★" : "CREATE PROJECT ★"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
