"use client";

import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
  Mail,
  Trash2,
  RefreshCcw,
  Eye,
  MessageSquare,
  CheckCheck,
  Archive,
  Inbox,
  Loader2,
  Calendar,
  Search,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Copy,
  Pencil,
  MoreHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  updateContactAction,
  deleteContactAction,
} from "@/actions/contact.action";
import { contactService } from "@/services/contact.service";
import type {
  IContact,
  IContactStat,
  ContactStatus,
} from "@/types/contact.type";

// ── Types ─────────────────────────────────────────────────────
interface ContactManagerProps {
  initialContacts: IContact[];
  initialStats: IContactStat[];
  token: string;
}

type SortField = "name" | "email" | "subject" | "status" | "createdAt";
type SortDir = "asc" | "desc";

// ── Config ────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  ContactStatus,
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
    icon: LucideIcon;
    color: string;
  }
> = {
  UNREAD: {
    label: "Unread",
    variant: "destructive",
    icon: Inbox,
    color: "text-red-500",
  },
  READ: {
    label: "Read",
    variant: "secondary",
    icon: Eye,
    color: "text-blue-500",
  },
  REPLIED: {
    label: "Replied",
    variant: "default",
    icon: CheckCheck,
    color: "text-green-500",
  },
  ARCHIVED: {
    label: "Archived",
    variant: "outline",
    icon: Archive,
    color: "text-gray-400",
  },
};

const STAT_ICONS: Record<ContactStatus, LucideIcon> = {
  UNREAD: Inbox,
  READ: Eye,
  REPLIED: CheckCheck,
  ARCHIVED: Archive,
};

const STAT_COLORS: Record<ContactStatus, string> = {
  UNREAD: "bg-red-500/10 text-red-500 border-red-500/20",
  READ: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  REPLIED: "bg-green-500/10 text-green-500 border-green-500/20",
  ARCHIVED: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

// ── Helpers ───────────────────────────────────────────────────
function Avatar({ name }: { name: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-semibold text-xs uppercase">
      {name[0]}
    </div>
  );
}

function SortIcon({
  field,
  sortField,
  sortDir,
}: {
  field: SortField;
  sortField: SortField;
  sortDir: SortDir;
}) {
  if (field !== sortField)
    return <ArrowUpDown className="h-3 w-3 opacity-30" />;
  return sortDir === "asc" ? (
    <ArrowUp className="h-3 w-3 text-primary" />
  ) : (
    <ArrowDown className="h-3 w-3 text-primary" />
  );
}

// ─────────────────────────────────────────────────────────────
export function ContactManager({
  initialContacts,
  initialStats,
  token,
}: ContactManagerProps) {
  const [contacts, setContacts] = useState<IContact[]>(initialContacts);
  const [stats, setStats] = useState<IContactStat[]>(initialStats);
  const [statusFilter, setStatusFilter] = useState<ContactStatus | "ALL">(
    "ALL",
  );
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<IContact | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [noteLoading, setNoteLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<IContact | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  // ── Refresh ───────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    const [contactsRes, statsRes] = await Promise.all([
      contactService.getAllContacts(token, {
        status: statusFilter === "ALL" ? undefined : statusFilter,
      }),
      contactService.getContactStats(token),
    ]);
    if (contactsRes.error) toast.error(contactsRes.error.message);
    else setContacts(contactsRes.data ?? []);
    if (statsRes.data) setStats(statsRes.data);
    setIsLoading(false);
    setSelectedIds(new Set());
  }, [token, statusFilter]);

  // ── Open detail ───────────────────────────────────────────
  const handleOpen = async (contact: IContact) => {
    setSelected(contact);
    setAdminNote(contact.adminNote ?? "");
    if (contact.status === "UNREAD") {
      const result = await updateContactAction(
        contact.id,
        { status: "READ" },
        token,
      );
      if (result.success) {
        setContacts((prev) =>
          prev.map((c) => (c.id === contact.id ? { ...c, status: "READ" } : c)),
        );
        setSelected((prev) => (prev ? { ...prev, status: "READ" } : prev));
      }
    }
  };

  // ── Status change ─────────────────────────────────────────
  const handleStatusChange = async (id: string, status: ContactStatus) => {
    const result = await updateContactAction(id, { status }, token);
    if (result.success) {
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c)),
      );
      setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
      toast.success("Status updated");
      fetchAll();
    } else {
      toast.error(result.message);
    }
  };

  // ── Save admin note ───────────────────────────────────────
  const handleSaveNote = async () => {
    if (!selected) return;
    setNoteLoading(true);
    const result = await updateContactAction(selected.id, { adminNote }, token);
    if (result.success) {
      setContacts((prev) =>
        prev.map((c) => (c.id === selected.id ? { ...c, adminNote } : c)),
      );
      setSelected((prev) => (prev ? { ...prev, adminNote } : prev));
      toast.success("Note saved");
    } else {
      toast.error(result.message);
    }
    setNoteLoading(false);
  };

  // ── Delete single ─────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm.id;
    const result = await deleteContactAction(id, token);
    if (result.success) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setSelected(null);
      setSelectedIds((prev) => {
        const n = new Set(prev);
        n.delete(id);
        return n;
      });
      setDeleteConfirm(null);
      toast.success("Contact deleted");
      fetchAll();
    } else {
      toast.error(result.message);
    }
  };

  // ── Bulk delete ───────────────────────────────────────────
  const handleBulkDelete = async () => {
    setBulkDeleting(true);
    const ids = Array.from(selectedIds);
    const results = await Promise.all(
      ids.map((id) => deleteContactAction(id, token)),
    );
    const failed = results.filter((r) => !r.success).length;
    setContacts((prev) => prev.filter((c) => !selectedIds.has(c.id)));
    setSelectedIds(new Set());
    setBulkDeleteConfirm(false);
    if (failed > 0) toast.error(`${failed} deletion(s) failed`);
    else toast.success(`${ids.length} contact(s) deleted`);
    fetchAll();
    setBulkDeleting(false);
  };

  // ── Sorting ───────────────────────────────────────────────
  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  // ── Checkbox helpers ──────────────────────────────────────
  const toggleOne = (id: string) =>
    setSelectedIds((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  // ── Filtered + sorted data ────────────────────────────────
  const filtered = useMemo(() => {
    let list = contacts;
    if (statusFilter !== "ALL")
      list = list.filter((c) => c.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q) ||
          (c.message ?? "").toLowerCase().includes(q),
      );
    }
    return [...list].sort((a, b) => {
      let va: string | number = "";
      let vb: string | number = "";
      if (sortField === "createdAt") {
        va = new Date(a.createdAt).getTime();
        vb = new Date(b.createdAt).getTime();
      } else {
        va = (a[sortField] ?? "").toString().toLowerCase();
        vb = (b[sortField] ?? "").toString().toLowerCase();
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [contacts, statusFilter, search, sortField, sortDir]);

  const total = stats.reduce((sum, s) => sum + s.total, 0);
  const allPageSelected =
    filtered.length > 0 && filtered.every((c) => selectedIds.has(c.id));

  const toggleAll = () => {
    if (allPageSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((c) => c.id)));
  };

  // ─────────────────────────────────────────────────────────
  return (
    <TooltipProvider>
      <div className="space-y-5">
        {/* ── Stat Cards ─────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(["UNREAD", "READ", "REPLIED", "ARCHIVED"] as ContactStatus[]).map(
            (s) => {
              const count = stats.find((x) => x.status === s)?.total ?? 0;
              const Icon = STAT_ICONS[s];
              const isActive = statusFilter === s;
              const cardBg = s === "UNREAD" ? "bg-[#ff597b]" : s === "READ" ? "bg-[#00f0ff]" : s === "REPLIED" ? "bg-[#b5ff6d]" : "bg-[#facc15]";
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatusFilter(isActive ? "ALL" : s)}
                  className={`
                  group relative rounded-2xl border-3 border-black p-4 text-left transition-all duration-150 cursor-pointer
                  hover:translate-x-[2px] hover:translate-y-[2px]
                  ${
                    isActive
                      ? `${cardBg} text-black shadow-[2px_2px_0px_0px_#000]`
                      : "bg-white dark:bg-zinc-900 border-black dark:border-zinc-300 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d]"
                  }
                `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg border-2 border-black bg-white text-black flex items-center justify-center shadow-[1px_1px_0px_0px_#000]">
                      <Icon className="h-4 w-4 stroke-[2.5]" />
                    </div>
                    {isActive && <X className="h-4 w-4 stroke-[2.5]" />}
                  </div>
                  <p className="text-2xl font-clash font-black leading-none tabular-nums text-black dark:text-white">
                    {count}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-wider text-black dark:text-white mt-1">
                    {STATUS_CONFIG[s].label}
                  </p>
                </button>
              );
            },
          )}
        </div>

        {/* ── Toolbar ────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black dark:text-white stroke-[2.5] pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, subject…"
              className="pl-9 pr-9 h-10 border-2 border-black rounded-lg font-bold text-xs bg-zinc-50 dark:bg-zinc-950 shadow-[2px_2px_0px_0px_#000]"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black dark:text-white"
              >
                <X className="h-4 w-4 stroke-[2.5]" />
              </button>
            )}
          </div>

          {/* Status filter dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-black dark:text-white stroke-[2.5] flex-shrink-0" />
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as ContactStatus | "ALL")}
            >
              <SelectTrigger className="h-10 w-36 border-2 border-black rounded-lg font-black uppercase text-xs bg-zinc-50 dark:bg-zinc-950 shadow-[2px_2px_0px_0px_#000]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-xl shadow-[4px_4px_0px_0px_#000]">
                <SelectItem value="ALL" className="font-bold text-xs uppercase cursor-pointer">ALL ({total})</SelectItem>
                {(
                  ["UNREAD", "READ", "REPLIED", "ARCHIVED"] as ContactStatus[]
                ).map((s) => (
                  <SelectItem key={s} value={s} className="font-bold text-xs uppercase cursor-pointer">
                    {STATUS_CONFIG[s].label} (
                    {stats.find((x) => x.status === s)?.total ?? 0})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bulk delete */}
          {selectedIds.size > 0 && (
            <Button
              className="h-10 gap-2 flex-shrink-0 bg-red-500 text-white border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
              disabled={bulkDeleting}
              onClick={() => setBulkDeleteConfirm(true)}
            >
              {bulkDeleting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : null}
              DELETE ({selectedIds.size})
            </Button>
          )}

          {/* Refresh */}
          <Button
            onClick={fetchAll}
            disabled={isLoading}
            className="h-10 flex-shrink-0 bg-[#00f0ff] text-black border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
          >
            <RefreshCcw
              className={`mr-2 h-3.5 w-3.5 stroke-[2.5] ${isLoading ? "animate-spin" : ""}`}
            />
            REFRESH ★
          </Button>
        </div>

        {/* ── Result count ───────────────────────────────── */}
        <div className="flex items-center justify-between text-xs font-black uppercase text-zinc-600 dark:text-zinc-400">
          <span>
            SHOWING <span className="text-black dark:text-white font-mono">{filtered.length}</span> OF <span className="text-black dark:text-white font-mono">{contacts.length}</span> CONTACTS
          </span>
          {selectedIds.size > 0 && (
            <span className="text-black dark:text-white font-mono">
              {selectedIds.size} SELECTED
            </span>
          )}
        </div>

        {/* ── Table ──────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <Card className="border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-2xl shadow-[6px_6px_0px_0px_#000]">
            <CardContent className="py-20 flex flex-col items-center gap-3 text-zinc-500 font-bold text-xs">
              <div className="w-12 h-12 rounded-full border-2 border-black bg-[#00f0ff] text-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                <Mail className="h-5 w-5 stroke-[2.5]" />
              </div>
              <p>NO CONTACT MESSAGES FOUND</p>
              {(search || statusFilter !== "ALL") && (
                <Button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("ALL");
                  }}
                  className="text-xs font-black uppercase bg-zinc-200 text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] cursor-pointer mt-2"
                >
                  CLEAR FILTERS
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="rounded-2xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#FFFDF5] dark:bg-zinc-950 border-b-2 border-black">
                  <tr className="border-b-2 border-black">
                    {/* Select all */}
                    <th className="w-10 px-4 py-3">
                      <Checkbox
                        checked={allPageSelected}
                        onCheckedChange={toggleAll}
                        aria-label="Select all"
                      />
                    </th>

                    {/* Sortable columns */}
                    {(
                      [
                        { field: "name" as SortField, label: "SENDER" },
                        { field: "subject" as SortField, label: "SUBJECT" },
                        { field: "status" as SortField, label: "STATUS" },
                        { field: "createdAt" as SortField, label: "RECEIVED" },
                      ] as { field: SortField; label: string }[]
                    ).map(({ field, label }) => (
                      <th
                        key={label}
                        className="px-4 py-3 text-left font-clash font-black uppercase text-xs text-black dark:text-white"
                      >
                        <button
                          type="button"
                          onClick={() => toggleSort(field)}
                          className="inline-flex items-center gap-1.5 hover:text-[#00f0ff] transition-colors cursor-pointer"
                        >
                          {label}
                          <SortIcon
                            field={field}
                            sortField={sortField}
                            sortDir={sortDir}
                          />
                        </button>
                      </th>
                    ))}

                    {/* Actions */}
                    <th className="w-16 px-4 py-3 text-right font-clash font-black uppercase text-xs text-black dark:text-white">
                      ACTIONS
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y-2 divide-black/10 dark:divide-zinc-800">
                  {filtered.map((contact) => {
                    const cfg = STATUS_CONFIG[contact.status];
                    const isChecked = selectedIds.has(contact.id);
                    return (
                      <tr
                        key={contact.id}
                        className={`
                          group transition-colors hover:bg-[#00f0ff]/10
                          ${contact.status === "UNREAD" ? "bg-[#ff597b]/10 font-bold" : ""}
                          ${isChecked ? "bg-[#b5ff6d]/20" : ""}
                        `}
                      >
                        {/* Checkbox */}
                        <td
                          className="px-4 py-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => toggleOne(contact.id)}
                            aria-label={`Select ${contact.name}`}
                          />
                        </td>

                        {/* Sender */}
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => handleOpen(contact)}
                            className="flex items-center gap-3 text-left w-full cursor-pointer"
                          >
                            <div className="w-9 h-9 rounded-full border-2 border-black bg-[#00f0ff] text-black font-black text-xs uppercase flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_#000]">
                              {contact.name[0]}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="font-black text-xs uppercase text-black dark:text-white truncate">
                                  {contact.name}
                                </p>
                                {contact.status === "UNREAD" && (
                                  <span className="w-2 h-2 rounded-full bg-[#ff597b] border border-black flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-[11px] font-mono font-bold text-zinc-600 dark:text-zinc-400 truncate max-w-[160px]">
                                {contact.email}
                              </p>
                            </div>
                          </button>
                        </td>

                        {/* Subject */}
                        <td className="px-4 py-3 max-w-[240px]">
                          <button
                            type="button"
                            onClick={() => handleOpen(contact)}
                            className="text-left w-full cursor-pointer"
                          >
                            <p className="font-bold text-xs uppercase text-black dark:text-white truncate">
                              {contact.subject}
                            </p>
                            {contact.message && (
                              <p className="text-[11px] font-medium text-zinc-500 truncate mt-0.5">
                                {contact.message}
                              </p>
                            )}
                          </button>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <Select
                            value={contact.status}
                            onValueChange={(v) =>
                              handleStatusChange(contact.id, v as ContactStatus)
                            }
                          >
                            <SelectTrigger className="h-7 w-28 border-0 bg-transparent p-0 focus:ring-0 [&>svg]:hidden">
                              <Badge className={`border-2 border-black font-mono font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000] cursor-pointer ${contact.status === "UNREAD" ? "bg-[#ff597b] text-black" : contact.status === "READ" ? "bg-[#00f0ff] text-black" : contact.status === "REPLIED" ? "bg-[#b5ff6d] text-black" : "bg-zinc-300 text-black"}`}>
                                <cfg.icon className="h-2.5 w-2.5 mr-1 stroke-[2.5]" />
                                {cfg.label}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent className="border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-xl shadow-[4px_4px_0px_0px_#000]">
                              {(
                                [
                                  "UNREAD",
                                  "READ",
                                  "REPLIED",
                                  "ARCHIVED",
                                ] as ContactStatus[]
                              ).map((s) => (
                                <SelectItem
                                  key={s}
                                  value={s}
                                  className="font-bold text-xs uppercase cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    {(() => {
                                      const I = STATUS_CONFIG[s].icon;
                                      return <I className="h-3 w-3 stroke-[2.5]" />;
                                    })()}
                                    {STATUS_CONFIG[s].label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>

                        {/* Received */}
                        <td className="px-4 py-3 text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="flex items-center gap-1 cursor-default">
                                <Calendar className="h-3 w-3 stroke-[2.5]" />
                                {formatDistanceToNow(
                                  new Date(contact.createdAt),
                                  { addSuffix: true },
                                )}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="border-2 border-black font-mono font-bold text-xs bg-black text-white">
                              {new Date(contact.createdAt).toLocaleString()}
                            </TooltipContent>
                          </Tooltip>
                        </td>

                        {/* Row actions */}
                        <td className="px-4 py-3 text-right">
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
                              <DropdownMenuItem
                                onClick={() => handleOpen(contact)}
                                className="font-black uppercase text-xs cursor-pointer"
                              >
                                <Pencil className="mr-2 h-4 w-4 stroke-[2.5]" />
                                VIEW / EDIT
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-black/20" />
                              <DropdownMenuItem
                                onClick={() => setDeleteConfirm(contact)}
                                className="font-black uppercase text-xs text-red-600 focus:text-red-600 cursor-pointer"
                              >
                                <Trash2 className="mr-2 h-4 w-4 stroke-[2.5]" />
                                DELETE
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Detail Modal ────────────────────────────────── */}
        <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
          <DialogContent className="max-w-2xl w-full p-0 gap-0 overflow-hidden max-h-[92vh] flex flex-col border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-2xl shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d]">
            {selected &&
              (() => {
                const cfg = STATUS_CONFIG[selected.status];
                const selectedIndex = filtered.findIndex(
                  (c) => c.id === selected.id,
                );
                const hasPrev = selectedIndex > 0;
                const hasNext = selectedIndex < filtered.length - 1;
                const noteChanged = adminNote !== (selected.adminNote ?? "");

                return (
                  <>
                    {/* ── Modal Header ── */}
                    <div className="flex items-center justify-between px-5 py-3.5 border-b-2 border-black bg-[#FFFDF5] dark:bg-zinc-950 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-black dark:text-white stroke-[2.5]" />
                        <span className="font-clash font-black uppercase text-lg text-black dark:text-white">
                          CONTACT DETAIL ★
                        </span>
                        {selectedIndex >= 0 && (
                          <span className="text-xs font-mono font-bold text-zinc-500">
                            ({selectedIndex + 1} / {filtered.length})
                          </span>
                        )}
                      </div>

                      {/* Prev / Next navigation */}
                      <div className="flex items-center gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 border-2 border-black rounded-lg shadow-[1px_1px_0px_0px_#000] cursor-pointer"
                              disabled={!hasPrev}
                              onClick={() => {
                                handleOpen(filtered[selectedIndex - 1]);
                              }}
                            >
                              <ChevronUp className="h-4 w-4 stroke-[2.5]" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>PREVIOUS</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 border-2 border-black rounded-lg shadow-[1px_1px_0px_0px_#000] cursor-pointer"
                              disabled={!hasNext}
                              onClick={() => {
                                handleOpen(filtered[selectedIndex + 1]);
                              }}
                            >
                              <ChevronDown className="h-4 w-4 stroke-[2.5]" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>NEXT</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    {/* ── Scrollable body ── */}
                    <div className="overflow-y-auto flex-1">
                      {/* Sender hero */}
                      <div className="px-6 pt-5 pb-4 border-b-2 border-black bg-zinc-50 dark:bg-zinc-950">
                        <div className="flex items-start gap-4">
                          {/* Big avatar */}
                          <div className="w-12 h-12 rounded-full border-2 border-black bg-[#00f0ff] text-black flex items-center justify-center font-black text-lg uppercase flex-shrink-0 shadow-[2px_2px_0px_0px_#000]">
                            {selected.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-clash font-black text-lg uppercase text-black dark:text-white leading-tight">
                                {selected.name}
                              </h3>
                              <Badge className={`border-2 border-black font-mono font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000] ${selected.status === "UNREAD" ? "bg-[#ff597b] text-black" : selected.status === "READ" ? "bg-[#00f0ff] text-black" : selected.status === "REPLIED" ? "bg-[#b5ff6d] text-black" : "bg-zinc-300 text-black"}`}>
                                <cfg.icon className="h-2.5 w-2.5 mr-1 stroke-[2.5]" />
                                {cfg.label}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <a
                                href={`mailto:${selected.email}`}
                                className="text-xs font-mono font-bold text-black dark:text-white underline hover:text-[#00f0ff] flex items-center gap-1"
                              >
                                {selected.email}
                                <ExternalLink className="h-3 w-3 stroke-[2.5]" />
                              </a>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        selected.email,
                                      );
                                      toast.success("Email copied!");
                                    }}
                                    className="text-[10px] font-bold uppercase text-zinc-500 hover:text-black dark:hover:text-white flex items-center gap-1 cursor-pointer"
                                  >
                                    <Copy className="h-3 w-3 stroke-[2.5]" />
                                    COPY
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Copy email address
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <p className="text-xs font-mono font-bold text-zinc-500 mt-1.5 flex items-center gap-1">
                              <Calendar className="h-3 w-3 stroke-[2.5]" />
                              {new Date(selected.createdAt).toLocaleString(
                                "en-US",
                                {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 py-5 space-y-5">
                        {/* Subject */}
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            SUBJECT
                          </p>
                          <p className="text-base font-black uppercase text-black dark:text-white leading-snug">
                            {selected.subject}
                          </p>
                        </div>

                        {/* Message */}
                        {selected.message && (
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                              MESSAGE BODY
                            </p>
                            <div className="p-4 rounded-xl border-2 border-black bg-zinc-50 dark:bg-zinc-950 font-bold text-sm leading-relaxed whitespace-pre-wrap shadow-[2px_2px_0px_0px_#000]">
                              {selected.message}
                            </div>
                          </div>
                        )}

                        {/* Status change */}
                        <div className="flex items-center justify-between gap-4 p-3 rounded-xl border-2 border-black bg-zinc-50 dark:bg-zinc-950 shadow-[2px_2px_0px_0px_#000]">
                          <div>
                            <p className="text-[10px] font-black uppercase text-black dark:text-white">
                              UPDATE CONVERSATION STATUS
                            </p>
                          </div>
                          <Select
                            value={selected.status}
                            onValueChange={(v) =>
                              handleStatusChange(
                                selected.id,
                                v as ContactStatus,
                              )
                            }
                          >
                            <SelectTrigger className="h-8 w-36 border-2 border-black rounded-lg font-bold text-xs bg-white dark:bg-zinc-900 shadow-[1px_1px_0px_0px_#000]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent position="popper" className="border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-xl shadow-[4px_4px_0px_0px_#000]">
                              {(
                                [
                                  "UNREAD",
                                  "READ",
                                  "REPLIED",
                                  "ARCHIVED",
                                ] as ContactStatus[]
                              ).map((s) => (
                                <SelectItem
                                  key={s}
                                  value={s}
                                  className="font-bold text-xs uppercase cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    {(() => {
                                      const I = STATUS_CONFIG[s].icon;
                                      return <I className="h-3 w-3 stroke-[2.5]" />;
                                    })()}
                                    {STATUS_CONFIG[s].label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Admin note */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                PRIVATE ADMIN NOTE
                              </p>
                            </div>
                            {noteChanged && (
                              <span className="text-[10px] font-black uppercase text-amber-500">
                                ★ UNSAVED
                              </span>
                            )}
                          </div>
                          <Textarea
                            value={adminNote}
                            onChange={(e) => setAdminNote(e.target.value)}
                            placeholder="Add a private admin note…"
                            className="min-h-[90px] border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950 resize-none rounded-xl"
                          />
                          <Button
                            onClick={handleSaveNote}
                            disabled={noteLoading || !noteChanged}
                            className="w-full bg-[#00f0ff] text-black hover:bg-[#00d8e6] border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                          >
                            {noteLoading ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCheck className="mr-2 h-4 w-4 stroke-[2.5]" />
                            )}
                            {noteLoading ? "SAVING NOTE…" : "SAVE NOTE ★"}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* ── Sticky Footer Actions ── */}
                    <div className="flex items-center gap-2 px-6 py-4 border-t-2 border-black bg-white dark:bg-zinc-900 flex-shrink-0">
                      <Button
                        className="flex-1 bg-[#b5ff6d] text-black hover:bg-[#a2f059] border-2 border-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] cursor-pointer"
                        onClick={() =>
                          handleStatusChange(selected.id, "REPLIED")
                        }
                      >
                        <a
                          href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 w-full"
                        >
                          <Mail className="h-4 w-4 stroke-[2.5]" />
                          <span>REPLY VIA EMAIL ★</span>
                        </a>
                      </Button>
                    </div>
                  </>
                );
              })()}
          </DialogContent>
        </Dialog>
      </div>

      {/* ── Single Delete Confirm Dialog ─────────────────── */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent className="max-w-sm border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-2xl shadow-[8px_8px_0px_0px_#000]">
          <DialogHeader className="border-b-2 border-black pb-3">
            <DialogTitle className="font-clash font-black uppercase text-lg text-black dark:text-white">DELETE CONTACT ★</DialogTitle>
            <DialogDescription className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-0.5">
              Permanently delete message from{" "}
              <span className="font-black text-black dark:text-white">
                {deleteConfirm?.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 pt-3">
            <Button
              onClick={() => setDeleteConfirm(null)}
              className="flex-1 bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              CANCEL
            </Button>
            <Button
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white hover:bg-red-600 border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              CONFIRM DELETE
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Bulk Delete Confirm Dialog ───────────────────── */}
      <Dialog
        open={bulkDeleteConfirm}
        onOpenChange={(open) => !bulkDeleting && setBulkDeleteConfirm(open)}
      >
        <DialogContent className="max-w-sm border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-2xl shadow-[8px_8px_0px_0px_#000]">
          <DialogHeader className="border-b-2 border-black pb-3">
            <DialogTitle className="font-clash font-black uppercase text-lg text-black dark:text-white">DELETE {selectedIds.size} CONTACTS ★</DialogTitle>
            <DialogDescription className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-0.5">
              Permanently delete{" "}
              <span className="font-black text-black dark:text-white">
                {selectedIds.size} selected contacts
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 pt-3">
            <Button
              onClick={() => setBulkDeleteConfirm(false)}
              disabled={bulkDeleting}
              className="flex-1 bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              CANCEL
            </Button>
            <Button
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="flex-1 bg-red-500 text-white hover:bg-red-600 border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
            >
              {bulkDeleting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              DELETE ALL ★
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
