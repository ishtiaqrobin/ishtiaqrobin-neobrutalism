"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  MoreHorizontal,
  Pencil,
  ArrowUpDown,
  Trophy,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

import type { IAward } from "@/types/awards.type";
import { deleteAwardAction } from "@/actions/award.action";
import DeleteDialog from "@/components/modules/shared/DeleteDialog";
import TablePagination from "@/components/modules/shared/TablePagination";

interface AwardsTableProps {
  awards: IAward[];
  loading?: boolean;
  searchQuery?: string;
  onEdit: (award: IAward) => void;
  onDeleteSuccess?: () => void;
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  token: string;
}

export function AwardsTable({
  awards,
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
}: AwardsTableProps) {
  const [deleting, setDeleting] = useState<{
    open: boolean;
    awardId: string | null;
    title: string;
  }>({
    open: false,
    awardId: null,
    title: "",
  });

  const confirmDelete = (award: IAward) => {
    setDeleting({
      open: true,
      awardId: award.id,
      title: award.title || "this award",
    });
  };

  const cancelDelete = () => {
    setDeleting({ open: false, awardId: null, title: "" });
  };

  const doDelete = async () => {
    if (!deleting.awardId) return;
    try {
      const result = await deleteAwardAction(deleting.awardId, token);
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
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white w-10"></TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">TITLE</TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">SUBTITLE</TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">DATE</TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">SORT</TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">STATUS</TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y-2 divide-black/10 dark:divide-zinc-800">
            {loading ? (
              [...Array(6)].map((_, idx) => (
                <TableRow key={`skeleton-${idx}`} className="align-middle">
                  <TableCell>
                    <Skeleton className="h-9 w-9 rounded-full border border-black" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32 border border-black" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28 border border-black" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 border border-black" />
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
            ) : awards.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-12 font-bold text-xs text-zinc-500"
                >
                  {searchQuery
                    ? "NO AWARDS FOUND MATCHING YOUR SEARCH"
                    : "NO AWARD RECORDS YET. ADD YOUR FIRST AWARD."}
                </TableCell>
              </TableRow>
            ) : (
              awards.map((item) => (
                <TableRow key={item.id} className="align-middle hover:bg-[#00f0ff]/10 transition-colors">
                  <TableCell>
                    <div className="h-9 w-9 rounded-full border-2 border-black bg-[#facc15] flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_#000]">
                      <Trophy className="h-4 w-4 text-black stroke-[2.5]" />
                    </div>
                  </TableCell>

                  <TableCell className="font-black text-xs uppercase text-black dark:text-white max-w-[180px]">
                    <p className="truncate">{item.title}</p>
                  </TableCell>

                  <TableCell className="text-xs font-bold text-zinc-600 dark:text-zinc-400 max-w-[160px]">
                    <span className="truncate block">{item.subTitle}</span>
                  </TableCell>

                  <TableCell className="text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400">
                    {item.date}
                  </TableCell>

                  <TableCell>
                    <span className="text-xs font-mono font-bold text-black dark:text-white">
                      #{item.sortOrder ?? 0}
                    </span>
                  </TableCell>

                  <TableCell>
                    {item.isPublished ? (
                      <Badge className="bg-[#b5ff6d] text-black border-2 border-black font-mono font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000]">
                        PUBLISHED ★
                      </Badge>
                    ) : (
                      <Badge className="bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-mono font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000]">
                        DRAFT
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
                        <DropdownMenuItem onClick={() => onEdit(item)} className="font-black uppercase text-xs cursor-pointer">
                          <Pencil className="mr-2 h-4 w-4 stroke-[2.5]" />
                          EDIT
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-black/20" />
                        <DropdownMenuItem
                          onClick={() => confirmDelete(item)}
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
          pageCount={awards.length}
          label="awards"
          onPageChange={onPageChange}
        />
      </div>

      <DeleteDialog
        isOpen={deleting.open}
        onClose={cancelDelete}
        onConfirm={doDelete}
        title="Delete Award?"
        description={
          <>
            This action cannot be undone. Are you sure you want to permanently
            delete{" "}
            <span className="font-semibold text-primary">
              &quot;{deleting.title}&quot;
            </span>
            ?
          </>
        }
      />
    </>
  );
}
