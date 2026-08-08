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
import { Plus, RefreshCw } from "lucide-react";
import type { IAward } from "@/types/awards.type";
import { AwardsTable } from "./AwardsTable";
import { AwardsDialog } from "./AwardsDialog";

const PAGE_SIZE = 10;

interface AwardsClientProps {
  awards: IAward[];
  token: string;
}

export function AwardsClient({ awards, token }: AwardsClientProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [selectedAward, setSelectedAward] = useState<IAward | null>(null);

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
    setSelectedAward(null);
    setDialogOpen(true);
  };

  const handleEdit = (award: IAward) => {
    setDialogMode("edit");
    setSelectedAward(award);
    setDialogOpen(true);
  };

  const filteredAwards = useMemo(() => {
    return awards.filter((award) => {
      const matchesSearch =
        !query.trim() ||
        award.title?.toLowerCase().includes(query.toLowerCase()) ||
        award.subTitle?.toLowerCase().includes(query.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "PUBLISHED" && award.isPublished) ||
        (statusFilter === "DRAFT" && !award.isPublished);
      return matchesSearch && matchesStatus;
    });
  }, [awards, query, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAwards.length / PAGE_SIZE),
  );
  const safePage = useMemo(
    () => Math.min(page, totalPages),
    [page, totalPages],
  );
  const paginatedAwards = filteredAwards.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div className="mx-auto w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2">
            ★ HONORS & AWARDS
          </div>
          <h1 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white">
            AWARDS MANAGEMENT
          </h1>
          <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
            Manage your awards, certifications, and achievements
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search awards..."
            className="w-full md:w-64 border-2 border-black font-bold text-xs bg-zinc-50 dark:bg-zinc-950 rounded-lg"
          />
          <div className="flex items-center gap-2">
            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-36 rounded-lg border-2 border-black font-bold text-xs bg-zinc-50 dark:bg-zinc-950 h-10 shadow-[2px_2px_0px_0px_#000]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_#000]" position="popper">
                <SelectItem value="ALL" className="font-bold text-xs uppercase cursor-pointer">ALL STATUS</SelectItem>
                <SelectItem value="PUBLISHED" className="font-bold text-xs uppercase cursor-pointer">PUBLISHED</SelectItem>
                <SelectItem value="DRAFT" className="font-bold text-xs uppercase cursor-pointer">DRAFT</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleReset}
              className="bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              <RefreshCw size={16} className="mr-1.5 stroke-[2.5]" /> RESET
            </Button>
            <Button onClick={handleAdd} className="bg-[#b5ff6d] text-black hover:bg-[#a2f059] border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer">
              <Plus size={16} className="mr-1.5 stroke-[2.5]" /> ADD AWARD ★
            </Button>
          </div>
        </div>
      </div>

      <AwardsTable
        awards={paginatedAwards}
        searchQuery={query}
        onEdit={handleEdit}
        onDeleteSuccess={handleSuccess}
        page={safePage}
        totalPages={totalPages}
        total={filteredAwards.length}
        limit={PAGE_SIZE}
        onPageChange={setPage}
        token={token}
      />

      <AwardsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        award={selectedAward}
        mode={dialogMode}
        onSuccess={handleSuccess}
        token={token}
      />
    </div>
  );
}
