"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, ImageUp } from "lucide-react";
import { IAbout } from "@/types/about.type";
import { useImageUpload } from "@/hooks/useImageUpload";
import { createAboutAction, updateAboutAction } from "@/actions/about.action";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface AboutManagerProps {
  about: IAbout | null;
  token: string;
  onRefresh: () => void;
}

export function AboutManager({ about, token, onRefresh }: AboutManagerProps) {
  const {
    file: aboutMeFile,
    preview: aboutMePreview,
    isCompressing: aboutMeCompressing,
    handleFileChange: handleAboutMeFileChange,
    reset: resetAboutMe,
    inputRef: aboutMeImgRef,
  } = useImageUpload({ maxSizeMB: 5 });

  const [generalLoading, setGeneralLoading] = useState(false);
  const isEditing = !!about;

  const handleSaveGeneral = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (aboutMeFile) formData.append("aboutMeImg", aboutMeFile);

    setGeneralLoading(true);
    try {
      const result = isEditing
        ? await updateAboutAction(formData, token)
        : await createAboutAction(formData, token);

      if (result.success) {
        toast.success(result.message);
        resetAboutMe();
        onRefresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("General about save error:", error);
      toast.error("An unexpected error occurred while saving.");
    } finally {
      setGeneralLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <Card className="overflow-hidden bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d]">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b-2 border-black dark:border-zinc-800 bg-[#FFFDF5] dark:bg-zinc-950 p-5">
            <div>
              <CardTitle className="font-clash font-black uppercase text-lg text-black dark:text-white">
                ABOUT SECTION SETTINGS ★
              </CardTitle>
              <CardDescription className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
                Configure the homepage about section text, image, and resume URL.
              </CardDescription>
            </div>
            <Badge className="border-2 border-black font-mono font-black text-xs uppercase bg-[#00f0ff] text-black shadow-[2px_2px_0px_0px_#000]">
              {isEditing ? "RECORD EXISTS" : "CREATE RECORD"}
            </Badge>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSaveGeneral} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs font-black uppercase text-black dark:text-white">TITLE</Label>
                  <Input
                    name="title"
                    defaultValue={about?.title ?? ""}
                    placeholder="Homepage about headline"
                    className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-black uppercase text-black dark:text-white">SUBTITLE</Label>
                  <Input
                    name="subtitle"
                    defaultValue={about?.subtitle ?? ""}
                    placeholder="Short subheading"
                    className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-black uppercase text-black dark:text-white">DESCRIPTION</Label>
                <Textarea
                  name="description"
                  defaultValue={about?.description ?? ""}
                  rows={6}
                  placeholder="Write the story you want visitors to read."
                  className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs font-black uppercase text-black dark:text-white">RESUME URL</Label>
                  <Input
                    name="resumeUrl"
                    defaultValue={about?.resumeUrl ?? ""}
                    placeholder="https://drive.google.com/..."
                    className="rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-black uppercase text-black dark:text-white">ABOUT IMAGE</Label>
                  <div className="space-y-2">
                    {aboutMePreview && (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                        <Image
                          src={aboutMePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      ref={aboutMeImgRef}
                      onChange={handleAboutMeFileChange}
                      disabled={aboutMeCompressing}
                      className="rounded-lg border-2 border-black font-bold cursor-pointer"
                    />
                    {aboutMeCompressing ? (
                      <p className="text-xs font-bold text-black flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Compressing image…
                      </p>
                    ) : about?.aboutMeImg && !aboutMeFile ? (
                      <p className="text-[11px] font-bold text-zinc-500 flex items-center gap-1">
                        <ImageUp className="h-3 w-3 stroke-[2.5]" />
                        Current image uploaded — select a new one to replace
                      </p>
                    ) : (
                      <p className="text-[11px] font-bold text-zinc-500">
                        Max 5MB · Auto-compressed to WebP
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
                <Button
                  type="submit"
                  disabled={generalLoading}
                  className="w-full bg-[#b5ff6d] text-black hover:bg-[#a2f059] border-2 border-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] cursor-pointer"
                >
                  {generalLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4 stroke-[2.5]" />
                  )}
                  SAVE ABOUT SETTINGS ★
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d]">
          <CardHeader className="border-b-2 border-black dark:border-zinc-800 bg-[#FFFDF5] dark:bg-zinc-950 p-5">
            <CardTitle className="font-clash font-black uppercase text-lg text-black dark:text-white">LIVE PREVIEW ★</CardTitle>
            <CardDescription className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
              A quick summary of the current About section configuration.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="grid gap-4">
              <div className="rounded-xl border-2 border-black bg-zinc-50 dark:bg-zinc-950 p-4 shadow-[2px_2px_0px_0px_#000]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-black uppercase text-zinc-500">HEADLINE</p>
                    <p className="text-sm font-black font-clash uppercase text-black dark:text-white">
                      {about?.title ?? "NOT CONFIGURED"}
                    </p>
                  </div>
                  <Badge className="bg-[#00f0ff] text-black border border-black font-black text-[10px] uppercase">
                    {about?.subtitle ? "CONFIGURED" : "MISSING"}
                  </Badge>
                </div>
              </div>
              <div className="rounded-xl border-2 border-black bg-zinc-50 dark:bg-zinc-950 p-4 shadow-[2px_2px_0px_0px_#000]">
                <p className="text-[11px] font-black uppercase text-zinc-500">DESCRIPTION</p>
                <p className="mt-1 text-xs font-bold text-black dark:text-zinc-300">
                  {about?.description ??
                    "Add a description to make the about section more compelling."}
                </p>
              </div>
              <div className="rounded-xl border-2 border-black bg-zinc-50 dark:bg-zinc-950 p-4 shadow-[2px_2px_0px_0px_#000]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase text-zinc-500">ASSETS</p>
                    <p className="mt-0.5 text-xs font-bold text-black dark:text-white">
                      About image:{" "}
                      {about?.aboutMeImg ? "UPLOADED ★" : "NOT UPLOADED"}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#b5ff6d] text-black border border-black px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-[1px_1px_0px_0px_#000]">
                    {about ? "LIVE ★" : "NEEDS SETUP"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
