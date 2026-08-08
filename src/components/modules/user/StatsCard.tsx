"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: number | string;
    description: string;
    icon: LucideIcon;
    color?: string;
    bg?: string;
}

export function StatsCard({
    title,
    value,
    description,
    icon: Icon,
}: StatsCardProps) {
    return (
        <Card className="overflow-hidden border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-2xl p-2 shadow-[5px_5px_0px_0px_#000] dark:shadow-[5px_5px_0px_0px_#b5ff6d] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-black uppercase tracking-wider text-black dark:text-white">{title}</CardTitle>
                <div className="bg-[#00f0ff] p-2 rounded-lg border-2 border-black text-black shadow-[1px_1px_0px_0px_#000]">
                    <Icon className="h-4 w-4 stroke-[2.5]" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-clash font-black uppercase text-black dark:text-white">{value}</div>
                <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">{description}</p>
            </CardContent>
        </Card>
    );
}
