"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Activity, Download } from "lucide-react";
import type { PageView, PageViewStat, ResumeDownloadLog } from "@/types/analytics.type";

const numberFmt = new Intl.NumberFormat("en-US");
import { HeroCards } from "./HeroCards";
import { PageViewStatsList } from "./PageViewStatsList";
import { PageViewsTable } from "./PageViewsTable";
import { ResumeDownloadsTable } from "./ResumeDownloadsTable";

interface AnalyticsManagerProps {
  pageViews: PageView[];
  pageViewStats: PageViewStat[];
  resumeDownloadLogs: ResumeDownloadLog[];
  isLoading?: boolean;
}

export function AnalyticsManager({
  pageViews,
  pageViewStats,
  resumeDownloadLogs,
  isLoading,
}: AnalyticsManagerProps) {
  const totals = useMemo(() => {
    const totalViews = pageViewStats.reduce((a, s) => a + s.totalViews, 0);
    const uniquePages = pageViewStats.length;
    const uniqueVisitors = new Set(
      pageViews.map((v) => v.ipAddress).filter(Boolean) as string[],
    ).size;
    return { totalViews, uniquePages, uniqueVisitors };
  }, [pageViews, pageViewStats]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="h-32 animate-pulse border-border/60">
            <CardContent className="p-6">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="mt-3 h-8 w-20 rounded bg-muted" />
              <div className="mt-3 h-3 w-32 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <HeroCards
        totalViews={totals.totalViews}
        uniquePages={totals.uniquePages}
        uniqueVisitors={totals.uniqueVisitors}
      />

      <Tabs defaultValue="pages" className="space-y-4">
        <TabsList className="bg-white dark:bg-zinc-900 border-2 border-black p-1.5 rounded-xl shadow-[3px_3px_0px_0px_#000] h-auto flex-wrap gap-1">
          <TabsTrigger value="pages" className="gap-2 font-black uppercase text-xs rounded-lg data-[state=active]:bg-[#b5ff6d] data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black cursor-pointer">
            <BarChart3 className="h-4 w-4 stroke-[2.5]" />
            BY PAGE
          </TabsTrigger>
          <TabsTrigger value="views" className="gap-2 font-black uppercase text-xs rounded-lg data-[state=active]:bg-[#b5ff6d] data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black cursor-pointer">
            <Activity className="h-4 w-4 stroke-[2.5]" />
            PAGE VIEWS ({numberFmt.format(pageViews.length)})
          </TabsTrigger>
          <TabsTrigger value="downloads" className="gap-2 font-black uppercase text-xs rounded-lg data-[state=active]:bg-[#b5ff6d] data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black cursor-pointer">
            <Download className="h-4 w-4 stroke-[2.5]" />
            RESUME DOWNLOADS ({numberFmt.format(resumeDownloadLogs.length)})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <Card className="overflow-hidden bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d]">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between border-b-2 border-black dark:border-zinc-800 pb-3">
                <div>
                  <h3 className="text-base font-clash font-black uppercase text-black dark:text-white">
                    VIEWS GROUPED BY PAGE ★
                  </h3>
                  <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-0.5">
                    Most visited pages ranked by total views
                  </p>
                </div>
                <Badge className="bg-[#00f0ff] text-black border-2 border-black font-black text-xs shadow-[2px_2px_0px_0px_#000]">
                  {numberFmt.format(pageViewStats.length)} PAGES
                </Badge>
              </div>
              <PageViewStatsList stats={pageViewStats} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="views">
          <Card className="overflow-hidden bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d]">
            <CardContent className="p-6">
              <PageViewsTable rows={pageViews} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloads">
          <Card className="overflow-hidden bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d]">
            <CardContent className="p-6">
              <ResumeDownloadsTable rows={resumeDownloadLogs} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
