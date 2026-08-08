"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminCardProps {
    title: string;
    subtitle?: string;
    description?: string;
    image?: string | null;
    icon?: React.ReactNode;
    badges?: React.ReactNode[];
    onEdit?: () => void;
    onDelete?: () => void;
    children?: React.ReactNode;
    imageClassName?: string;
    contentClassName?: string;
    overlayContent?: React.ReactNode;
    onClick?: () => void;
}

export function AdminCard({
    title,
    subtitle,
    description,
    image,
    icon,
    badges,
    onEdit,
    onDelete,
    children,
    imageClassName,
    contentClassName,
    overlayContent,
    onClick,
}: AdminCardProps) {
    return (
        <Card className="group overflow-hidden rounded-2xl border-3 border-black dark:border-zinc-300 shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#000] transition-all bg-white dark:bg-zinc-900 flex flex-col h-full">
            {/* Header/Media Section */}
            {(image || icon || overlayContent) && (
                <div
                    className={cn(
                        "relative aspect-video overflow-hidden bg-black flex items-center justify-center border-b-3 border-black dark:border-zinc-300",
                        onClick && "cursor-pointer",
                        imageClassName
                    )}
                    onClick={onClick}
                >
                    {image ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                        />
                    ) : icon ? (
                        <div className="text-white group-hover:text-[#00f0ff] transition-colors transform group-hover:scale-110 duration-300">
                            {icon}
                        </div>
                    ) : null}

                    {/* Overlays */}
                    {overlayContent}

                    {/* Status Badges */}
                    {badges && badges.length > 0 && (
                        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10 items-end">
                            {badges}
                        </div>
                    )}
                </div>
            )}

            {/* Content Section */}
            <CardContent className={cn("p-5 flex-1 flex flex-col space-y-3", contentClassName)}>
                <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-clash font-black uppercase text-lg truncate flex-1 text-black dark:text-white">{title}</h3>
                        {!image && !icon && (
                            <div className="flex gap-2 shrink-0">
                                {onEdit && (
                                    <Button
                                        size="sm"
                                        onClick={onEdit}
                                        className="h-8 w-8 rounded-lg bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#00d0df] cursor-pointer"
                                    >
                                        <Pencil className="h-4 w-4 stroke-[2.5]" />
                                    </Button>
                                )}
                                {onDelete && (
                                    <Button
                                        size="sm"
                                        onClick={onDelete}
                                        className="h-8 w-8 rounded-lg bg-[#ff597b] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#e04565] cursor-pointer"
                                    >
                                        <Trash2 className="h-4 w-4 stroke-[2.5]" />
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                    {subtitle && <span className="inline-block text-[11px] font-mono font-black uppercase bg-[#00f0ff] text-black px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">{subtitle}</span>}
                </div>

                {description && (
                    <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 line-clamp-2 flex-1">
                        {description}
                    </p>
                )}

                {children}

                {/* Footer Actions (if media exists) */}
                {(image || icon) && (
                    <div className="pt-4 mt-auto border-t-2 border-black dark:border-zinc-800 flex justify-end gap-2">
                        {onEdit && (
                            <Button
                                size="sm"
                                onClick={onEdit}
                                className="h-9 w-9 rounded-lg bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#00d0df] cursor-pointer"
                            >
                                <Pencil className="h-4 w-4 stroke-[2.5]" />
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                size="sm"
                                onClick={onDelete}
                                className="h-9 w-9 rounded-lg bg-[#ff597b] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#e04565] cursor-pointer"
                            >
                                <Trash2 className="h-4 w-4 stroke-[2.5]" />
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
