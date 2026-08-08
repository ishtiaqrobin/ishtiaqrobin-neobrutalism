"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  MoreHorizontal,
  Trash2,
  Pencil,
  Loader2,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Pin,
  PinOff,
  ShieldCheck,
  ShieldX,
  Eye,
  Check,
  Building2,
  Briefcase,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

import {
  createOrUpdateReviewAction,
  deleteReviewAction,
  approveReviewAction,
  pinReviewAction,
} from "@/actions/review.action";
import { IReview } from "@/types";

interface AdminReviewManagerProps {
  reviews: IReview[];
  token: string;
  onRefresh: () => void;
  isLoading?: boolean;
}

// ── Main Component ────────────────────────────────────────────────────────────
export function AdminReviewManager({
  reviews,
  token,
  onRefresh,
  isLoading = false,
}: AdminReviewManagerProps) {
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const [editDialog, setEditDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<IReview | null>(null);
  const [selectedItem, setSelectedItem] = useState<IReview | null>(null);
  const [commentValue, setCommentValue] = useState("");

  // ── Approve toggle ────────────────────────────────────────────────
  const handleApprove = async (item: IReview) => {
    setTogglingId(item.id + "-approve");
    const result = await approveReviewAction(item.id, token);
    if (result.success) {
      toast.success(result.message);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setTogglingId(null);
  };

  // ── Pin toggle ────────────────────────────────────────────────────
  const handlePin = async (item: IReview) => {
    setTogglingId(item.id + "-pin");
    const result = await pinReviewAction(item.id, token);
    if (result.success) {
      toast.success(result.message);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setTogglingId(null);
  };

  // ── Edit ──────────────────────────────────────────────────────────
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedItem) return;
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    const result = await createOrUpdateReviewAction(
      {
        position: fd.get("position") as string,
        companyName: fd.get("companyName") as string,
        comment: fd.get("comment") as string,
      },
      token,
      selectedItem.id,
    );
    if (result.success) {
      toast.success(result.message);
      setEditDialog(false);
      setSelectedItem(null);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  // ── Delete ────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setLoading(true);
    const result = await deleteReviewAction(deleteConfirm.id, token);
    if (result.success) {
      toast.success(result.message);
      setDeleteConfirm(null);
      onRefresh();
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  // ── Skeleton ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  const total = reviews.length;
  const approved = reviews.filter((r) => r.isApproved).length;
  const pinned = reviews.filter((r) => r.isPinned).length;
  const companies = new Set(reviews.map((r) => r.companyName)).size;

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* ── Summary cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Reviews",
            value: total,
            color: "text-black dark:text-white",
            icon: <Eye className="h-4 w-4 stroke-[2.5]" />,
            bg: "bg-[#00f0ff]",
          },
          {
            label: "Approved",
            value: approved,
            color: "text-black dark:text-white",
            icon: <Check className="h-4 w-4 stroke-[2.5]" />,
            bg: "bg-[#b5ff6d]",
          },
          {
            label: "Pinned",
            value: pinned,
            color: "text-black dark:text-white",
            icon: <Pin className="h-4 w-4 stroke-[2.5]" />,
            bg: "bg-[#facc15]",
          },
          {
            label: "Companies",
            value: companies,
            color: "text-black dark:text-white",
            icon: <Building2 className="h-4 w-4 stroke-[2.5]" />,
            bg: "bg-[#ff597b]",
          },
        ].map((stat) => (
          <Card key={stat.label} className="overflow-hidden bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d]">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`h-9 w-9 rounded-lg border-2 border-black ${stat.bg} text-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]`}>
                {stat.icon}
              </div>
              <div>
                <p className={`text-2xl font-clash font-black leading-none ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-[10px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mt-1">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Table card ────────────────────────────────────────────── */}
      <Card className="overflow-hidden bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d]">
        <CardHeader className="border-b-2 border-black dark:border-zinc-800 bg-[#FFFDF5] dark:bg-zinc-950 p-6">
          <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2 w-fit">
            ★ CLIENT FEEDBACK
          </div>
          <CardTitle className="font-clash font-black uppercase text-xl text-black dark:text-white">
            REVIEWS & TESTIMONIALS ★
          </CardTitle>
          <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
            {total} TOTAL · {approved} APPROVED · {pinned} PINNED
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#FFFDF5] dark:bg-zinc-950 border-b-2 border-black">
                <TableRow className="border-b-2 border-black">
                  <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">USER</TableHead>
                  <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">ROLE</TableHead>
                  <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">COMMENT</TableHead>
                  <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white text-center">APPROVED</TableHead>
                  <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white text-center">PINNED</TableHead>
                  <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">SUBMITTED</TableHead>
                  <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b transition-colors hover:bg-muted/40"
                  >
                    {/* User */}
                    <TableCell>
                      <div className="flex items-center gap-2.5 min-w-[140px]">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden border border-border shrink-0">
                          {item.user.image ? (
                            <Image
                              src={item.user.image}
                              alt={item.user.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                              {item.user.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate max-w-[110px]">
                            {item.user.name}
                          </p>
                          {item.isPinned && (
                            <Badge
                              variant="secondary"
                              className="text-[9px] h-4 px-1 mt-0.5"
                            >
                              Pinned
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Role (position @ company) */}
                    <TableCell>
                      <div className="flex flex-col gap-0.5 min-w-[120px] max-w-[160px]">
                        <span className="text-sm font-medium truncate flex items-center gap-1">
                          <Briefcase className="h-3 w-3 text-muted-foreground shrink-0" />
                          {item.position}
                        </span>
                        <span className="text-[11px] text-muted-foreground truncate">
                          {item.companyName}
                        </span>
                      </div>
                    </TableCell>

                    {/* Comment */}
                    <TableCell className="max-w-[220px]">
                      <p className="text-sm text-muted-foreground line-clamp-2 italic">
                        {item.comment ? (
                          `"${item.comment}"`
                        ) : (
                          <span className="not-italic text-muted-foreground/50 text-xs">
                            No comment
                          </span>
                        )}
                      </p>
                    </TableCell>

                    {/* Approve toggle */}
                    <TableCell className="text-center">
                      <button
                        onClick={() => handleApprove(item)}
                        disabled={togglingId === item.id + "-approve"}
                        className="inline-flex items-center justify-center cursor-pointer disabled:opacity-50"
                        title={
                          item.isApproved
                            ? "Click to unapprove"
                            : "Click to approve"
                        }
                      >
                        {togglingId === item.id + "-approve" ? (
                          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        ) : item.isApproved ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground/40 hover:text-green-500 transition-colors" />
                        )}
                      </button>
                    </TableCell>

                    {/* Pin toggle */}
                    <TableCell className="text-center">
                      <button
                        onClick={() => handlePin(item)}
                        disabled={togglingId === item.id + "-pin"}
                        className="inline-flex items-center justify-center cursor-pointer disabled:opacity-50"
                        title={
                          item.isPinned ? "Click to unpin" : "Click to pin"
                        }
                      >
                        {togglingId === item.id + "-pin" ? (
                          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        ) : item.isPinned ? (
                          <Pin className="h-5 w-5 text-blue-500 fill-blue-500" />
                        ) : (
                          <PinOff className="h-5 w-5 text-muted-foreground/40 hover:text-blue-500 transition-colors" />
                        )}
                      </button>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleApprove(item)}>
                            {item.isApproved ? (
                              <>
                                <ShieldX className="mr-2 h-4 w-4 text-amber-500" />
                                Unapprove
                              </>
                            ) : (
                              <>
                                <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
                                Approve
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePin(item)}>
                            {item.isPinned ? (
                              <>
                                <PinOff className="mr-2 h-4 w-4" />
                                Unpin
                              </>
                            ) : (
                              <>
                                <Pin className="mr-2 h-4 w-4" />
                                Pin to top
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedItem(item);
                              setCommentValue(item.comment || "");
                              setEditDialog(true);
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setDeleteConfirm(item)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {reviews.length === 0 && (
            <div className="text-center py-16">
              <MessageSquare className="h-14 w-14 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-medium text-muted-foreground">
                No reviews yet
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Reviews submitted by users will appear here
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Edit Dialog ───────────────────────────────────────────── */}
      <Dialog
        open={editDialog}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null);
          setEditDialog(open);
        }}
      >
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleEdit}>
            <DialogHeader>
              <DialogTitle>Edit Review</DialogTitle>
              <DialogDescription>
                Editing review by{" "}
                <span className="font-medium text-foreground">
                  {selectedItem?.user.name}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="position"
                    className="text-[11px] font-bold tracking-wider text-muted-foreground"
                  >
                    Position
                  </Label>
                  <Input
                    id="position"
                    name="position"
                    defaultValue={selectedItem?.position || ""}
                    placeholder="e.g. Software Engineer"
                    required
                    maxLength={50}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="companyName"
                    className="text-[11px] font-bold tracking-wider text-muted-foreground"
                  >
                    Company
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    defaultValue={selectedItem?.companyName || ""}
                    placeholder="e.g. Acme Inc."
                    required
                    maxLength={50}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="comment"
                  className="text-[11px] font-bold tracking-wider text-muted-foreground"
                >
                  Comment
                </Label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  placeholder="Update feedback..."
                  required
                  maxLength={500}
                  className="rounded-xl resize-none"
                  rows={4}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {commentValue.length} / 500
                  </span>
                  {commentValue.length > 0 && commentValue.length < 20 && (
                    <span className="text-xs text-red-500">
                      String must contain at least 20 character(s)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialog(false)}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm ────────────────────────────────────────── */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Permanently remove the review by{" "}
              <span className="font-semibold text-foreground">
                {deleteConfirm?.user.name}
              </span>
              ? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              disabled={loading}
              className="flex-1 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 cursor-pointer"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
