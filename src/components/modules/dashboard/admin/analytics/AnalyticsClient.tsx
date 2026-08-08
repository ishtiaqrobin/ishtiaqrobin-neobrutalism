"use client";

import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalyticsManager } from "./AnalyticsManager";
import { useRouter } from "next/navigation";
import type { PageView, PageViewStat, ResumeDownloadLog } from "@/types/analytics.type";

interface AnalyticsClientProps {
  pageViews: PageView[];
  pageViewStats: PageViewStat[];
  resumeDownloadLogs: ResumeDownloadLog[];
  token: string;
}

export function AnalyticsClient({
  pageViews,
  pageViewStats,
  resumeDownloadLogs,
  token,
}: AnalyticsClientProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2">
            ★ TRAFFIC & METRICS
          </div>
          <h1 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white">
            ANALYTICS
          </h1>
          <p className="mt-1 text-xs font-bold text-zinc-600 dark:text-zinc-400">
            Page views, user engagements, and resume download tracking
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

      <AnalyticsManager
        pageViews={pageViews}
        pageViewStats={pageViewStats}
        resumeDownloadLogs={resumeDownloadLogs}
      />
    </div>
  );
}
