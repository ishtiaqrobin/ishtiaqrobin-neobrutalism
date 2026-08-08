"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, FileText, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const numberFmt = new Intl.NumberFormat("en-US");

type Kpi = {
  title: string;
  value: number;
  description: string;
  icon: typeof Eye;
  iconColor: string;
  iconBg: string;
};

export function HeroCards({
  totalViews,
  uniquePages,
  uniqueVisitors,
}: {
  totalViews: number;
  uniquePages: number;
  uniqueVisitors: number;
}) {
  const kpis: Kpi[] = [
    {
      title: "Total Page Views",
      value: totalViews,
      description: "All-time across every page",
      icon: Eye,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      title: "Unique Pages",
      value: uniquePages,
      description: "Distinct pages visited",
      icon: FileText,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      title: "Unique Visitors",
      value: uniqueVisitors,
      description: "By distinct IP address",
      icon: Globe,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map(({ title, value, description, icon: Icon, iconColor, iconBg }) => (
        <Card
          key={title}
          className="overflow-hidden transition-all bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d] p-4 hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-wider text-black dark:text-white">{title}</CardTitle>
            <div
              className={cn("flex p-2 items-center justify-center rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]", iconBg)}
            >
              <Icon className={cn("h-4 w-4 stroke-[2.5]", iconColor)} />
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="text-3xl font-clash font-black text-black dark:text-white">{numberFmt.format(value)}</div>
            <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 mt-1">{description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
