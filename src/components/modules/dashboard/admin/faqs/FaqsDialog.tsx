"use client";

import { useState } from "react";
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
import { toast } from "sonner";
import {
  Loader2,
  Check,
  HelpCircle,
  ArrowUpDown,
  MessageSquareText,
} from "lucide-react";

import type { IFaq } from "@/types/faq.type";
import {
  createFaqAction,
  updateFaqAction,
} from "@/actions/faq.action";

interface FaqsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faq?: IFaq | null;
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

export function FaqsDialog({
  open,
  onOpenChange,
  faq,
  mode,
  onSuccess,
  token,
}: FaqsDialogProps) {
  const [saving, setSaving] = useState(false);

  const handleClose = () => {
    onOpenChange(false);
  };

  const buildFormData = (): FormData => {
    const form = document.getElementById("faq-form") as HTMLFormElement;
    if (!form) return new FormData();

    const fd = new FormData(form);
    const out = new FormData();

    out.append("question", fd.get("question") as string);
    out.append("answer", fd.get("answer") as string);

    const sortOrder = fd.get("sortOrder") as string;
    if (sortOrder) out.append("sortOrder", sortOrder);

    out.append("isPublished", String(fd.get("isPublished") === "on"));

    return out;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const toastId = toast.loading(
      mode === "add" ? "Creating FAQ..." : "Updating FAQ...",
    );

    try {
      const formData = buildFormData();

      if (mode === "add") {
        const result = await createFaqAction(formData, token);
        if (!result.success) {
          toast.error(result.message, { id: toastId });
          return;
        }
        toast.success(result.message, { id: toastId });
      } else if (mode === "edit" && faq?.id) {
        const result = await updateFaqAction(
          faq.id,
          formData,
          token,
        );
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
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-2xl shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d]">
        <form id="faq-form" onSubmit={handleSubmit}>
          <DialogHeader className="border-b-2 border-black pb-3">
            <DialogTitle className="font-clash font-black uppercase text-xl text-black dark:text-white">
              {isEdit ? "EDIT FAQ ★" : "ADD FAQ ★"}
            </DialogTitle>
            <DialogDescription className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-0.5">
              {isEdit
                ? "Update this frequently asked question item."
                : "Add a new frequently asked question to your portfolio."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <FieldLabel htmlFor="question">
                  QUESTION <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <HelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black dark:text-white stroke-[2.5]" />
                  <Input
                    id="question"
                    name="question"
                    defaultValue={faq?.question || ""}
                    placeholder="e.g. What is your current role?"
                    required
                    className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 h-10 pl-8"
                  />
                </div>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <FieldLabel htmlFor="answer">
                  ANSWER <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <MessageSquareText className="absolute left-3 top-3 h-3.5 w-3.5 text-black dark:text-white stroke-[2.5]" />
                  <Textarea
                    id="answer"
                    name="answer"
                    defaultValue={faq?.answer || ""}
                    placeholder="Enter your answer here..."
                    required
                    className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 resize-none pl-8"
                    rows={5}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <FieldLabel htmlFor="sortOrder">SORT ORDER</FieldLabel>
                <div className="relative">
                  <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black dark:text-white stroke-[2.5]" />
                  <Input
                    id="sortOrder"
                    type="number"
                    name="sortOrder"
                    min={0}
                    defaultValue={faq?.sortOrder ?? 0}
                    className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 h-10 pl-8"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border-2 border-black bg-zinc-50 dark:bg-zinc-950 shadow-[2px_2px_0px_0px_#000] sm:col-span-2">
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
                  defaultChecked={faq ? faq.isPublished : true}
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
            <Button type="submit" disabled={saving} className="bg-[#b5ff6d] text-black hover:bg-[#a2f059] border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer">
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "SAVE CHANGES ★" : "CREATE FAQ ★"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
