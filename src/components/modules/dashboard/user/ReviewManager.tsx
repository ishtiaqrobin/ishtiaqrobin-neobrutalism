

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  Trash2,
  Loader2,
  MessageSquare,
  Quote,
  Pencil,
  Plus,
  Briefcase,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  createOrUpdateReviewAction,
  deleteReviewAction,
} from "@/actions/review.action";
import { reviewService } from "@/services/review.service";
import { IReview } from "@/types";

interface ReviewManagerProps {
  token: string;
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function ReviewManager({ token }: ReviewManagerProps) {
  const [review, setReview] = useState<IReview | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  // ── Fetch my review ───────────────────────────────────────────────
  const fetchMyReview = useCallback(async () => {
    const { data } = await reviewService.getMyReview(token);
    if (Array.isArray(data) && data.length > 0) {
      setReview(data[0]);
    } else if (data && !Array.isArray(data)) {
      setReview(data as unknown as IReview);
    } else {
      setReview(null);
    }
    setIsFetching(false);
  }, [token]);

  useEffect(() => {
    const load = async () => {
      await fetchMyReview();
    };
    load();
  }, [fetchMyReview]);

  const handleEditOpen = () => {
    setCommentValue(review?.comment || "");
    setIsEditOpen(true);
  };

  // ── Submit ────────────────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    const result = await createOrUpdateReviewAction(
      {
        position: fd.get("position") as string,
        companyName: fd.get("companyName") as string,
        comment: fd.get("comment") as string,
      },
      token,
      review?.id,
    );
    if (result.success) {
      toast.success(result.message);
      setIsEditOpen(false);
      const load = async () => {
        await fetchMyReview();
      };
      load();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  // ── Delete ────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!review?.id) return;
    setLoading(true);
    const result = await deleteReviewAction(review.id, token);
    if (result.success) {
      toast.success(result.message);
      setIsDeleteOpen(false);
      setReview(null);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  // ── Loading state ─────────────────────────────────────────────────
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2">
            ★ FEEDBACK & REVIEWS
          </div>
          <h2 className="text-2xl font-clash font-black uppercase tracking-tight text-black dark:text-white flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-black dark:text-white stroke-[2.5]" />
            MY REVIEW & FEEDBACK
          </h2>
        </div>
        {!review && (
          <Button onClick={handleEditOpen} size="lg" className="bg-[#b5ff6d] text-black hover:bg-[#a2f059] font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] cursor-pointer">
            <Plus className="mr-1.5 h-4 w-4 stroke-[3]" />
            WRITE A REVIEW ★
          </Button>
        )}
      </div>

      {review ? (
        /* ── Review card ────────────────────────────────────────── */
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl"
        >
          <Card className="overflow-hidden rounded-2xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d] p-6">
            <CardHeader className="p-0 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-black shrink-0 shadow-[2px_2px_0px_0px_#000]">
                    {review.user?.image ? (
                      <Image
                        src={review.user.image}
                        alt={review.user.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#00f0ff] flex items-center justify-center text-black font-black text-sm">
                        {review.user?.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base font-black font-clash uppercase text-black dark:text-white">
                      {review.user?.name || "You"}
                    </CardTitle>
                    <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      <Briefcase className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" />
                      <span>{review.position}</span>
                      <span className="text-zinc-500">at</span>
                      <span className="bg-[#FFFDF5] dark:bg-zinc-800 text-black dark:text-white px-1.5 py-0.5 rounded border border-black text-[11px] font-mono">{review.companyName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleEditOpen}
                    className="h-8 w-8 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#00f0ff] cursor-pointer"
                  >
                    <Pencil className="h-4 w-4 stroke-[2.5]" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsDeleteOpen(true)}
                    className="h-8 w-8 rounded-lg bg-[#ff597b] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#e04565] cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4 stroke-[2.5]" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Approval status */}
              <div className="mb-4">
                {review.isApproved ? (
                  <span className="text-xs font-black uppercase tracking-wider text-black bg-[#b5ff6d] px-2.5 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] inline-block">
                    ✓ APPROVED & LIVE ON PORTFOLIO
                  </span>
                ) : (
                  <span className="text-xs font-black uppercase tracking-wider text-black bg-[#facc15] px-2.5 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] inline-block">
                    ⏳ PENDING APPROVAL
                  </span>
                )}
              </div>

              <div className="relative bg-[#FFFDF5] dark:bg-zinc-950 border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_0px_#000]">
                <Quote className="absolute top-2 right-2 h-8 w-8 text-black/10 stroke-[2]" />
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 italic leading-relaxed relative z-10">
                  &quot;{review.comment || "No comment provided."}&quot;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-black text-[11px] font-mono font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Submitted on{" "}
                {new Date(review.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        /* ── Empty state ────────────────────────────────────────── */
        <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border-3 border-dashed border-black dark:border-zinc-300 p-8 shadow-[6px_6px_0px_0px_#000]">
          <MessageSquare className="h-12 w-12 text-black dark:text-white mx-auto mb-4 stroke-[2]" />
          <h3 className="text-xl font-clash font-black uppercase text-black dark:text-white">
            YOU HAVEN'T SHARED YOUR FEEDBACK YET
          </h3>
          <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1 mb-6 max-w-sm mx-auto">
            Your experience matters! Help others by sharing your story.
          </p>
          <Button onClick={handleEditOpen} size="lg" className="bg-[#b5ff6d] text-black hover:bg-[#a2f059] font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] cursor-pointer">
            SHARE YOUR EXPERIENCE ★
          </Button>
        </div>
      )}

      {/* ── Edit / Create Dialog ──────────────────────────────────── */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[8px_8px_0px_0px_#000]">
          <form onSubmit={handleSave}>
            <DialogHeader className="border-b-2 border-black pb-3">
              <DialogTitle className="font-clash font-black uppercase text-xl text-black dark:text-white">
                {review ? "UPDATE YOUR REVIEW ★" : "WRITE A REVIEW ★"}
              </DialogTitle>
              <DialogDescription className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                {review
                  ? "Update your position, company, and feedback below"
                  : "Share your experience working with Ishtiaq"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="position" className="text-xs font-black uppercase text-black dark:text-white">
                    POSITION
                  </Label>
                  <Input
                    id="position"
                    name="position"
                    defaultValue={review?.position || ""}
                    placeholder="e.g. Software Engineer"
                    required
                    maxLength={50}
                    className="border-2 border-black rounded-lg font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="companyName" className="text-xs font-black uppercase text-black dark:text-white">
                    COMPANY
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    defaultValue={review?.companyName || ""}
                    placeholder="e.g. Acme Inc."
                    required
                    maxLength={50}
                    className="border-2 border-black rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="comment" className="text-xs font-black uppercase text-black dark:text-white">
                  YOUR FEEDBACK
                </Label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder="Tell us about your experience..."
                  required
                  maxLength={500}
                  className="border-2 border-black rounded-lg font-bold resize-none"
                  rows={4}
                />
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono font-bold text-zinc-500">
                    {commentValue.length} / 500
                  </span>
                  {commentValue.length > 0 && commentValue.length < 20 && (
                    <span className="text-xs font-bold text-red-500">
                      Minimum 20 characters required
                    </span>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 pt-2 border-t-2 border-black">
              <Button
                type="button"
                onClick={() => setIsEditOpen(false)}
                disabled={loading}
                className="bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#b5ff6d] text-black hover:bg-[#a2f059] font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] cursor-pointer"
              >
                {loading && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
                {review ? "UPDATE REVIEW ★" : "SUBMIT REVIEW ★"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm ────────────────────────────────────────── */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-sm bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[8px_8px_0px_0px_#000]">
          <DialogHeader className="border-b-2 border-black pb-2">
            <DialogTitle className="font-clash font-black uppercase text-lg text-black dark:text-white">
              ⚠️ DELETE YOUR REVIEW
            </DialogTitle>
            <DialogDescription className="text-xs font-bold text-zinc-700 dark:text-zinc-300 pt-1">
              This will permanently remove your review from the portfolio.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-3">
            <Button
              onClick={() => setIsDeleteOpen(false)}
              disabled={loading}
              className="flex-1 bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              CANCEL
            </Button>
            <Button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 bg-[#ff597b] text-black hover:bg-[#e04565] border-2 border-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] cursor-pointer"
            >
              {loading && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
              DELETE ★
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
