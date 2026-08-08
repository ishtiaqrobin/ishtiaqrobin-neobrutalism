"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useImageUpload } from "@/hooks/useImageUpload";
import { toast } from "sonner";
import Image from "next/image";

interface AvatarUploadProps {
    currentImage?: string | null;
    onUpdate: (file: File) => Promise<void>;
    name: string;
}

export function AvatarUpload({ currentImage, onUpdate, name }: AvatarUploadProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const {
        file,
        preview: previewUrl,
        isCompressing,
        handleFileChange,
        reset,
    } = useImageUpload({ maxSizeMB: 5 });

    const handleUpdate = async () => {
        if (!file) return;
        setIsUpdating(true);
        try {
            await onUpdate(file);
            setIsOpen(false);
            reset();
        } catch (error) {
            console.error("Avatar update error:", error);
            toast.error("Failed to update profile picture");
            reset();
        } finally {
            setIsUpdating(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) reset();
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative group">
                <Avatar className="h-32 w-32 border-3 border-black dark:border-zinc-300 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d]">
                    <AvatarImage src={previewUrl || currentImage || undefined} />
                    <AvatarFallback className="text-3xl font-black font-clash bg-[#00f0ff] text-black">
                        {name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                    <DialogTrigger asChild>
                        <button className="absolute bottom-0 right-0 p-2 bg-[#00f0ff] text-black border-2 border-black rounded-full shadow-[2px_2px_0px_0px_#000] hover:scale-110 transition-transform cursor-pointer">
                            <Camera className="h-5 w-5 stroke-[2.5]" />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[8px_8px_0px_0px_#000]">
                        <DialogHeader className="border-b-2 border-black pb-2">
                            <DialogTitle className="font-clash font-black uppercase text-xl text-black dark:text-white">
                                UPDATE AVATAR ★
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-black dark:text-white">SELECT IMAGE FILE</label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    disabled={isCompressing}
                                    className="border-2 border-black rounded-xl pt-2 font-bold cursor-pointer"
                                />
                                {isCompressing ? (
                                    <p className="text-xs font-bold text-[#00f0ff] flex items-center gap-1">
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        Compressing image…
                                    </p>
                                ) : (
                                    <p className="text-[11px] font-bold text-zinc-500">
                                        Max 5MB · Auto-compressed to WebP
                                    </p>
                                )}
                                {previewUrl && (
                                    <div className="mt-4 flex justify-center">
                                        <Image
                                            width={128}
                                            height={128}
                                            src={previewUrl}
                                            alt="Preview"
                                            className="h-32 w-32 rounded-full object-cover border-3 border-black shadow-[4px_4px_0px_0px_#000]"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2 border-t-2 border-black">
                            <Button
                                onClick={() => handleOpenChange(false)}
                                className="bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                            >
                                CANCEL
                            </Button>
                            <Button
                                onClick={handleUpdate}
                                disabled={isUpdating || isCompressing || !file}
                                className="bg-[#b5ff6d] text-black hover:bg-[#a2f059] font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] cursor-pointer"
                            >
                                {isUpdating ? "UPLOADING..." : "UPLOAD ★"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="text-center">
                <h3 className="font-black font-clash text-xl uppercase text-black dark:text-white">{name}</h3>
                <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">MEMBER ACCOUNT</p>
            </div>
        </div>
    );
}
