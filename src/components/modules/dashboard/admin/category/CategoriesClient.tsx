"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, RefreshCw, Filter } from "lucide-react";
import type { Category } from "@/types/category.type";
import CategoryTable from "./CategoryTable";
import CategoryDialog from "./CategoryDialog";

const PAGE_SIZE = 10;

interface CategoriesClientProps {
  categories: Category[];
  token: string;
}

export default function CategoriesClient({
  categories,
  token,
}: CategoriesClientProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleReset = () => {
    setQuery("");
    setStatusFilter("ALL");
    setPage(1);
    router.refresh();
  };

  const handleSuccess = () => {
    router.refresh();
  };

  const handleAdd = () => {
    setDialogMode("add");
    setSelectedCategory(null);
    setDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    setDialogMode("edit");
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch =
        !query.trim() ||
        cat.name?.toLowerCase().includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "PUBLISHED" && cat.isPublished) ||
        (statusFilter === "DRAFT" && !cat.isPublished);
      return matchesSearch && matchesStatus;
    });
  }, [categories, query, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / PAGE_SIZE),
  );
  const safePage = useMemo(
    () => Math.min(page, totalPages),
    [page, totalPages],
  );
  const paginatedCategories = filteredCategories.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div className="mx-auto w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2">
            ★ CATEGORIES & TAGS
          </div>
          <h1 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white">
            CATEGORY MANAGEMENT
          </h1>
          <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
            Create and manage portfolio categories and project tags
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search categories..."
            className="w-full md:w-64 border-2 border-black font-bold text-xs bg-zinc-50 dark:bg-zinc-950 rounded-lg"
          />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Filter className="h-4 w-4 text-black dark:text-white stroke-[2.5] shrink-0" />
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
                <SelectTrigger className="w-36 rounded-lg border-2 border-black font-bold text-xs bg-zinc-50 dark:bg-zinc-950 h-10 shadow-[2px_2px_0px_0px_#000]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_#000]" position="popper">
                  <SelectItem value="ALL" className="font-bold text-xs uppercase cursor-pointer">ALL STATUS</SelectItem>
                  <SelectItem value="PUBLISHED" className="font-bold text-xs uppercase cursor-pointer">PUBLISHED</SelectItem>
                  <SelectItem value="DRAFT" className="font-bold text-xs uppercase cursor-pointer">DRAFT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleReset}
              className="bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              <RefreshCw size={16} className="mr-1.5 stroke-[2.5]" /> RESET
            </Button>
            <Button onClick={handleAdd} className="bg-[#b5ff6d] text-black hover:bg-[#a2f059] border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer">
              <Plus size={16} className="mr-1.5 stroke-[2.5]" /> ADD CATEGORY ★
            </Button>
          </div>
        </div>
      </div>

      <CategoryTable
        categories={paginatedCategories}
        searchQuery={query}
        onEdit={handleEdit}
        onDeleteSuccess={handleSuccess}
        page={safePage}
        totalPages={totalPages}
        total={filteredCategories.length}
        limit={PAGE_SIZE}
        onPageChange={setPage}
        token={token}
      />

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={selectedCategory}
        mode={dialogMode}
        onSuccess={handleSuccess}
        token={token}
      />
    </div>
  );
}
