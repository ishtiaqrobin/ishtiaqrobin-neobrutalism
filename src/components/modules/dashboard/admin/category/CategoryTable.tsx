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
  BookOpen,
  Check,
  X,
} from "lucide-react";
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

import type { Category } from "@/types/category.type";
import { categoryService } from "@/services/category.service";
import DeleteDialog from "@/components/modules/shared/DeleteDialog";
import TablePagination from "@/components/modules/shared/TablePagination";

interface CategoryTableProps {
  categories: Category[];
  loading?: boolean;
  searchQuery?: string;
  onEdit: (category: Category) => void;
  onDeleteSuccess?: () => void;
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  token: string;
}

export default function CategoryTable({
  categories,
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
}: CategoryTableProps) {
  const [deleting, setDeleting] = useState<{
    open: boolean;
    categoryId: string | null;
    name: string;
  }>({
    open: false,
    categoryId: null,
    name: "",
  });

  const confirmDelete = (category: Category) => {
    setDeleting({
      open: true,
      categoryId: category.id,
      name: category.name || "this category",
    });
  };

  const cancelDelete = () => {
    setDeleting({ open: false, categoryId: null, name: "" });
  };

  const doDelete = async () => {
    if (!deleting.categoryId) return;
    try {
      const { error } = await categoryService.deleteCategory(
        token,
        deleting.categoryId,
      );
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Category deleted successfully");
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
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">NAME</TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">STATUS</TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">SORT ORDER</TableHead>
              <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white text-right">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y-2 divide-black/10 dark:divide-zinc-800">
            {loading ? (
              [...Array(6)].map((_, idx) => (
                <TableRow key={`skeleton-${idx}`} className="align-middle">
                  <TableCell>
                    <Skeleton className="h-4 w-32 border border-black" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 rounded-full border border-black" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12 border border-black" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-9 rounded-md ml-auto border border-black" />
                  </TableCell>
                </TableRow>
              ))
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 font-bold text-xs text-zinc-500"
                >
                  {searchQuery
                    ? "NO CATEGORIES MATCHING YOUR SEARCH"
                    : "NO CATEGORIES FOUND"}
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <TableRow key={category.id} className="align-middle hover:bg-[#00f0ff]/10 transition-colors">
                  <TableCell className="font-black text-xs uppercase text-black dark:text-white">
                    <span className="truncate max-w-52 block">
                      {category.name}
                    </span>
                  </TableCell>

                  <TableCell>
                    {category.isPublished ? (
                      <Badge className="bg-[#b5ff6d] text-black border-2 border-black font-mono font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000] inline-flex items-center gap-1">
                        <Check className="h-3 w-3 stroke-[2.5]" /> PUBLISHED ★
                      </Badge>
                    ) : (
                      <Badge className="bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-mono font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000] inline-flex items-center gap-1">
                        <X className="h-3 w-3 stroke-[2.5]" /> DRAFT
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <span className="text-xs font-mono font-bold text-black dark:text-white">
                      #{category.sortOrder}
                    </span>
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
                        <DropdownMenuItem onClick={() => onEdit(category)} className="font-black uppercase text-xs cursor-pointer">
                          <Pencil className="mr-2 h-4 w-4 stroke-[2.5]" />
                          EDIT
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-black/20" />
                        <DropdownMenuItem
                          onClick={() => confirmDelete(category)}
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
          pageCount={categories.length}
          label="categories"
          onPageChange={onPageChange}
        />
      </div>

      <DeleteDialog
        isOpen={deleting.open}
        onClose={cancelDelete}
        onConfirm={doDelete}
        title="Delete Category?"
        description={
          <>
            This action cannot be undone. Are you sure you want to permanently
            delete{" "}
            <span className="font-semibold text-primary">
              &quot;{deleting.name}&quot;
            </span>
            ?
          </>
        }
      />
    </>
  );
}
