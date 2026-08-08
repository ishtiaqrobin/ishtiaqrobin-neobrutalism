"use client";
import { useState, useCallback } from "react";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import type { IProjectSection } from "@/types";

const TiptapEditor = dynamic(
  () => import("@/components/modules/shared/TiptapEditor"),
  { ssr: false },
);

interface ProjectSectionsEditorProps {
  sections: IProjectSection[];
  onChange: (sections: IProjectSection[]) => void;
}

function SectionCard({
  section,
  index,
  total,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  section: IProjectSection;
  index: number;
  total: number;
  onUpdate: (id: string, data: Partial<IProjectSection>) => void;
  onRemove: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-2 border-black rounded-xl bg-zinc-50 dark:bg-zinc-950 overflow-hidden shadow-[2px_2px_0px_0px_#000]">
      <div className="flex items-center gap-2 p-3 bg-[#FFFDF5] dark:bg-zinc-900 border-b-2 border-black">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 flex-1 text-left cursor-pointer"
        >
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-black dark:text-white stroke-[2.5] shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 text-black dark:text-white stroke-[2.5] shrink-0" />
          )}
          <span className="text-xs font-mono font-black text-black dark:text-white uppercase tracking-wider w-6 shrink-0">
            #{index + 1}
          </span>
          <span className="text-xs font-black uppercase text-black dark:text-white truncate max-w-72">
            {section.label || "UNTITLED SECTION"}
          </span>
        </button>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={index === 0}
            onClick={() => onMoveUp(section.id)}
            className="h-7 w-7 border border-black rounded bg-white dark:bg-zinc-800 cursor-pointer shadow-[1px_1px_0px_0px_#000]"
            title="Move up"
          >
            <ChevronUp className="h-3.5 w-3.5 stroke-[2.5]" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={index === total - 1}
            onClick={() => onMoveDown(section.id)}
            className="h-7 w-7 border border-black rounded bg-white dark:bg-zinc-800 cursor-pointer shadow-[1px_1px_0px_0px_#000]"
            title="Move down"
          >
            <ChevronDown className="h-3.5 w-3.5 stroke-[2.5]" />
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onRemove(section.id)}
          className="h-7 w-7 shrink-0 border border-black rounded bg-red-500 text-white cursor-pointer shadow-[1px_1px_0px_0px_#000]"
        >
          <Trash2 className="h-3.5 w-3.5 stroke-[2.5]" />
        </Button>
      </div>

      {expanded && (
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <Label className="text-xs font-black uppercase text-black dark:text-white">
              SECTION LABEL *
            </Label>
            <Input
              value={section.label}
              onChange={(e) => onUpdate(section.id, { label: e.target.value })}
              placeholder="e.g. Features, Architecture, Build Steps"
              className="rounded-lg border-2 border-black font-bold text-sm bg-white dark:bg-zinc-900 h-9"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-black uppercase text-black dark:text-white">
              CONTENT
            </Label>
            <TiptapEditor
              content={section.content}
              onChange={(html) => onUpdate(section.id, { content: html })}
              placeholder="Write about this section..."
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectSectionsEditor({
  sections,
  onChange,
}: ProjectSectionsEditorProps) {
  const handleAdd = useCallback(() => {
    const newSection: IProjectSection = {
      id: `section-${Date.now()}`,
      label: "",
      content: "",
    };
    onChange([...sections, newSection]);
  }, [sections, onChange]);

  const handleUpdate = useCallback(
    (id: string, data: Partial<IProjectSection>) => {
      onChange(sections.map((s) => (s.id === id ? { ...s, ...data } : s)));
    },
    [sections, onChange],
  );

  const handleRemove = useCallback(
    (id: string) => {
      onChange(sections.filter((s) => s.id !== id));
    },
    [sections, onChange],
  );

  const handleMoveUp = useCallback(
    (id: string) => {
      const idx = sections.findIndex((s) => s.id === id);
      if (idx <= 0) return;
      const updated = [...sections];
      [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
      onChange(updated);
    },
    [sections, onChange],
  );

  const handleMoveDown = useCallback(
    (id: string) => {
      const idx = sections.findIndex((s) => s.id === id);
      if (idx === -1 || idx >= sections.length - 1) return;
      const updated = [...sections];
      [updated[idx], updated[idx + 1]] = [updated[idx + 1], updated[idx]];
      onChange(updated);
    },
    [sections, onChange],
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-black uppercase text-black dark:text-white">
          PROJECT SECTIONS (MENU & CONTENT)
        </Label>
        <Button
          type="button"
          onClick={handleAdd}
          className="h-8 bg-[#00f0ff] text-black hover:bg-[#00d0df] border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
        >
          <Plus className="mr-1 h-3.5 w-3.5 stroke-[2.5]" />
          ADD SECTION ★
        </Button>
      </div>

      {sections.length === 0 ? (
        <div className="text-center py-6 rounded-xl border-2 border-dashed border-black bg-zinc-50 dark:bg-zinc-950">
          <p className="text-xs font-bold text-zinc-500">
            No sections yet. Click &quot;ADD SECTION ★&quot; to start building your project details.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {sections.map((section, idx) => (
            <SectionCard
              key={section.id}
              section={section}
              index={idx}
              total={sections.length}
              onUpdate={handleUpdate}
              onRemove={handleRemove}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
            />
          ))}
        </div>
      )}

      <p className="text-[10px] font-bold text-zinc-500">
        Each section becomes a clickable menu item in OnThisPageMenu
      </p>
    </div>
  );
}
