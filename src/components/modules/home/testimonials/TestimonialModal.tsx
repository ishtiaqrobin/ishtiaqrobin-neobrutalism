"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquareQuote, X } from "lucide-react";
import { toast } from "sonner";
import { IReview, IReviewForm } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  existingReview?: IReview | null;
  onSuccess?: () => void;
}

// ─── Validation helper ────────────────────────────────────────────────────────

function validate(form: IReviewForm): Partial<IReviewForm> {
  const errors: Partial<IReviewForm> = {};
  if (!form.position.trim()) errors.position = "Position is required.";
  else if (form.position.trim().length < 2)
    errors.position = "Position must be at least 2 characters.";

  if (!form.companyName.trim())
    errors.companyName = "Company name is required.";
  else if (form.companyName.trim().length < 2)
    errors.companyName = "Company name must be at least 2 characters.";

  if (!form.comment.trim()) errors.comment = "Comment is required.";
  else if (form.comment.trim().length < 20)
    errors.comment = "Comment must be at least 20 characters.";
  else if (form.comment.trim().length > 500)
    errors.comment = "Comment must be under 500 characters.";

  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

import { Button } from "@/components/ui/button";

export default function TestimonialModal({
  isOpen,
  onClose,
  token,
  existingReview,
  onSuccess,
}: TestimonialModalProps) {
  const isUpdate = !!existingReview;

  const [form, setForm] = useState<IReviewForm>({
    position: "",
    companyName: "Personal",
    comment: "",
  });
  const [errors, setErrors] = useState<Partial<IReviewForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (existingReview) {
        setForm({
          position: existingReview.position,
          companyName: existingReview.companyName,
          comment: existingReview.comment,
        });
      } else {
        setForm({ position: "", companyName: "Personal", comment: "" });
      }
      setErrors({});
      setServerError(null);

      setTimeout(() => firstInputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, existingReview, onClose]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof IReviewForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async () => {
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const { createOrUpdateReviewAction } =
        await import("@/actions/review.action");
      const result = await createOrUpdateReviewAction(
        form,
        token,
        existingReview?.id,
      );

      if (result.success) {
        toast.success(result.message);
        onSuccess?.();
        onClose();
      } else {
        setServerError(result.message || "Something went wrong.");
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-black/60 backdrop-blur-xs transition-all">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
        className="relative w-full max-w-xl bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d] overflow-hidden flex flex-col z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-black dark:border-zinc-700 bg-[#FFFDF5] dark:bg-zinc-950">
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="w-5 h-5 text-black dark:text-white stroke-[2.5]" />
            <span className="font-clash font-black uppercase tracking-tight text-lg text-black dark:text-white">
              {isUpdate ? "UPDATE FEEDBACK" : "WRITE A REVIEW ★"}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 bg-[#ff597b] text-black border-2 border-black rounded shadow-[2px_2px_0px_0px_#000] cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex flex-col gap-4 p-6">
          {serverError && (
            <p className="text-xs font-bold text-red-600 bg-red-100 border-2 border-black rounded-lg p-3">
              {serverError}
            </p>
          )}

          {/* Position */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
              YOUR ROLE / POSITION
            </label>
            <Input
              ref={firstInputRef}
              name="position"
              type="text"
              value={form.position}
              onChange={handleChange}
              placeholder="e.g. Senior Software Engineer"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-black h-10 rounded-lg text-sm font-bold pl-3 pr-3 transition-all focus:shadow-[3px_3px_0px_0px_#000]"
            />
            {errors.position && (
              <p className="text-xs text-red-500 font-bold">
                {errors.position}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
              COMPANY NAME (OR "PERSONAL")
            </label>
            <Input
              name="companyName"
              type="text"
              value={form.companyName}
              onChange={handleChange}
              placeholder="e.g. Google or Personal"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-black h-10 rounded-lg text-sm font-bold pl-3 pr-3 transition-all focus:shadow-[3px_3px_0px_0px_#000]"
            />
            {errors.companyName && (
              <p className="text-xs text-red-500 font-bold">
                {errors.companyName}
              </p>
            )}
          </div>

          {/* Comment */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
              YOUR FEEDBACK / REVIEW
            </label>
            <Textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Share your experience working with Ishtiaq..."
              rows={4}
              maxLength={500}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border-2 border-black rounded-lg text-sm font-bold p-3 transition-all focus:shadow-[3px_3px_0px_0px_#000] resize-none"
            />
            <div className="flex items-center justify-between">
              {errors.comment ? (
                <p className="text-xs text-red-500 font-bold">
                  {errors.comment}
                </p>
              ) : (
                <span />
              )}
              <span className="text-xs font-mono font-bold text-zinc-500 ml-auto">
                {form.comment.length} / 500
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 bg-[#FFFDF5] dark:bg-zinc-950 border-t-2 border-black dark:border-zinc-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-black uppercase tracking-wider text-black dark:text-white border-2 border-black rounded-lg bg-white dark:bg-zinc-800 shadow-[2px_2px_0px_0px_#000] cursor-pointer"
          >
            CANCEL
          </button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            size="lg"
            className="bg-[#b5ff6d] text-black hover:bg-[#a2f059] font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#000]"
          >
            {isSubmitting
              ? isUpdate
                ? "UPDATING..."
                : "SUBMITTING..."
              : isUpdate
                ? "UPDATE FEEDBACK ★"
                : "SUBMIT REVIEW ★"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
