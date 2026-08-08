"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
import { Loader2, Check } from "lucide-react";
import type { Category, CategoryPayload } from "@/types/category.type";
import { categoryService } from "@/services/category.service";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  mode: "add" | "edit";
  onSuccess?: () => void;
  token: string;
}

export default function CategoryDialog({
  open,
  onOpenChange,
  category,
  mode,
  onSuccess,
  token,
}: CategoryDialogProps) {
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && category) {
        setName(category.name || "");
        setSortOrder(category.sortOrder ?? 0);
        setIsPublished(Boolean(category.isPublished));
      } else {
        setName("");
        setSortOrder(0);
        setIsPublished(true);
      }
    }
  }, [open, mode, category]);

  const handleClose = () => {
    setName("");
    setSortOrder(0);
    setIsPublished(true);
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Category name is required");
      return;
    }

    setSaving(true);
    const toastId = toast.loading(
      mode === "add" ? "Creating category..." : "Updating category...",
    );

    try {
      const payload: CategoryPayload = {
        name: trimmed,
        sortOrder,
        isPublished,
      };

      if (mode === "add") {
        const { error } = await categoryService.createCategory(token, payload);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Category created successfully", { id: toastId });
      } else if (mode === "edit" && category?.id) {
        const { error } = await categoryService.updateCategory(
          token,
          category.id,
          payload,
        );
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Category updated successfully", { id: toastId });
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
      <DialogContent className="sm:max-w-md border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-2xl shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d]">
        <DialogHeader className="border-b-2 border-black pb-3">
          <DialogTitle className="font-clash font-black uppercase text-xl text-black dark:text-white">
            {isEdit ? "EDIT CATEGORY ★" : "ADD NEW CATEGORY ★"}
          </DialogTitle>
          <DialogDescription className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-0.5">
            {isEdit
              ? "Update category details and sorting."
              : "Create a new portfolio category or tag."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label
              htmlFor="name"
              className="text-xs font-black uppercase text-black dark:text-white"
            >
              NAME <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 h-10"
              placeholder="Enter category name"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="sortOrder"
              className="text-xs font-black uppercase text-black dark:text-white"
            >
              SORT ORDER
            </Label>
            <Input
              id="sortOrder"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 h-10"
              placeholder="0"
            />
          </div>

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
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
          </div>

          <DialogFooter className="gap-2 pt-2 border-t-2 border-black">
            <Button
              type="button"
              onClick={handleClose}
              disabled={saving}
              className="bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              CANCEL
            </Button>
            <Button type="submit" disabled={saving} className="bg-[#b5ff6d] text-black hover:bg-[#a2f059] border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer">
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "SAVE CHANGES ★" : "CREATE CATEGORY ★"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
