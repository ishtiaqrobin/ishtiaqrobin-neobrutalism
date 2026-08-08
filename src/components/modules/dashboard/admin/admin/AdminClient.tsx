"use client";

import { AdminStats } from "@/components/modules/dashboard/admin/admin/AdminStats";
import { RecentContacts } from "@/components/modules/dashboard/admin/admin/RecentContacts";
import { RefreshCcw } from "lucide-react";
import { AdminStats as AdminStatsType } from "@/types/admin.type";
import type { IContact } from "@/types/contact.type";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface AdminClientProps {
  stats: AdminStatsType | null;
  token: string;
  recentContacts: IContact[];
}

export function AdminClient({
  stats,
  token,
  recentContacts,
}: AdminClientProps) {
  const router = useRouter();

  return (
    <div className="space-y-8 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2">
            ★ DASHBOARD CONTROL
          </div>
          <h1 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white">
            ADMIN DASHBOARD
          </h1>
          <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
            Overall platform statistics and insights
          </p>
        </div>
        <Button
          onClick={() => router.refresh()}
          className="bg-[#00f0ff] text-black hover:bg-[#00d0df] border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
        >
          <RefreshCcw className="mr-2 h-4 w-4 stroke-[2.5]" />
          REFRESH ★
        </Button>
      </div>

      <AdminStats stats={stats} />

      <div className="grid gap-6 md:grid-cols-2">
        <RecentContacts contacts={recentContacts} />
      </div>
    </div>
  );
}
