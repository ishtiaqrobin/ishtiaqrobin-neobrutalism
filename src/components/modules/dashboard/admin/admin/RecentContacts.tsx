"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IContact, ContactStatus } from "@/types/contact.type";

const statusColor: Record<ContactStatus, string> = {
  UNREAD: "bg-red-100 text-red-700 hover:bg-red-200",
  READ: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  REPLIED: "bg-green-100 text-green-700 hover:bg-green-200",
  ARCHIVED: "bg-gray-100 text-gray-700 hover:bg-gray-200",
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const truncate = (str: string | null | undefined, max = 60) => {
  if (!str) return "";
  return str.length > max ? `${str.slice(0, max)}…` : str;
};

export function RecentContacts({ contacts }: { contacts: IContact[] }) {
  if (contacts.length === 0) return null;

  return (
    <Card className="overflow-hidden transition-all bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b-2 border-black dark:border-zinc-800 bg-[#FFFDF5] dark:bg-zinc-950">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-black dark:text-white stroke-[2.5]" />
          <CardTitle className="text-sm font-clash font-black uppercase text-black dark:text-white">
            UNREAD CONTACTS ★
          </CardTitle>
        </div>
        <Badge className="bg-[#ff597b] text-black border-2 border-black font-black text-xs shadow-[2px_2px_0px_0px_#000]">
          {contacts.length}
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y-2 divide-black/10 dark:divide-zinc-800">
          {contacts.slice(0, 5).map((contact) => (
            <div
              key={contact.id}
              className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-[#00f0ff]/10"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00f0ff] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                <MessageSquare className="h-4 w-4 text-black stroke-[2.5]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs font-black uppercase text-black dark:text-white">
                    {contact.name}
                  </p>
                  <span className="shrink-0 text-[10px] font-mono font-bold text-zinc-500">
                    {formatDate(contact.createdAt)}
                  </span>
                </div>
                <p className="truncate text-xs font-bold text-zinc-700 dark:text-zinc-300 mt-0.5">
                  {contact.subject}
                </p>
                <p className="mt-0.5 truncate text-[11px] font-bold text-zinc-500">
                  {truncate(contact.message)}
                </p>
              </div>
              <Badge
                className={cn(
                  "shrink-0 border-2 border-black font-mono font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000]",
                  statusColor[contact.status],
                )}
              >
                {contact.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
